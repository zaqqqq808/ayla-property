/**
 * Site-wide constants — single source of truth.
 * Import from here rather than hardcoding values across files.
 */

export const SITE_URL      = 'https://www.aylaproperty.com';
export const CALENDLY_URL  = 'https://calendly.com/ayla-teamoperations/30min';
export const INSTAGRAM_URL = 'https://www.instagram.com/aylaproperty/';

/**
 * WhatsApp is shared with Zaq's other businesses (one number, one neutral
 * profile), so every link pre-types an opening line naming Ayla. That way the
 * first message in the chat says which business it's about.
 */
export const WHATSAPP_NUMBER = '447928668478';
export const whatsappUrl = (text = "Hi Ayla, I'm interested in property in Bali.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
