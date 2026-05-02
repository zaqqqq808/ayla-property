// Vercel Serverless Function — proxies Instagram Graph API
// Keeps your access token server-side (never exposed to the browser).
// Deploy env var: INSTAGRAM_ACCESS_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(503).json({ error: 'INSTAGRAM_ACCESS_TOKEN not configured', fallback: true });
  }

  try {
    const igRes = await fetch(
      `https://graph.instagram.com/me/media` +
      `?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp` +
      `&limit=6` +
      `&access_token=${token}`,
      { headers: { Accept: 'application/json' } }
    );

    if (!igRes.ok) {
      const err = await igRes.json().catch(() => ({}));
      return res.status(502).json({
        error: err?.error?.message || `Instagram returned ${igRes.status}`,
        fallback: true
      });
    }

    const data = await igRes.json();

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Access-Control-Allow-Origin', 'https://www.aylaproperty.com');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message, fallback: true });
  }
}
