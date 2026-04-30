import type { APIRoute } from 'astro';

// Vercel Edge function — runs on POST /api/contact
export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot field — bots fill this in, humans don't see it
  website?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Spam honeypot — silently accept and discard
  if (data.website && data.website.length > 0) {
    return json({ success: true }, 200);
  }

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const message = (data.message ?? '').trim();

  if (!name || !email || !message) {
    return json({ error: 'Missing required fields' }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  if (message.length > 5000) {
    return json({ error: 'Message too long' }, 400);
  }

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  const TO_EMAIL = import.meta.env.CONTACT_TO_EMAIL ?? 'zaq@aylaproperty.com';
  const FROM_EMAIL = import.meta.env.CONTACT_FROM_EMAIL ?? 'noreply@aylaproperty.com';

  if (!RESEND_API_KEY) {
    // Without Resend configured we just log to Vercel logs.
    // Calendly bookings still work — the form just won't email you.
    console.warn('[contact] RESEND_API_KEY not set — enquiry logged but not emailed', {
      name,
      email,
      message,
    });
    return json({ success: true, warning: 'logged-only' }, 200);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Ayla Property Website <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from aylaproperty.com contact form`,
    }),
  });

  if (!res.ok) {
    const error = await res.text().catch(() => 'unknown');
    console.error('[contact] Resend error:', res.status, error);
    return json({ error: 'Failed to send' }, 500);
  }

  return json({ success: true }, 200);
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 254;
}
