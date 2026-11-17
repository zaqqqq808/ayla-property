/**
 * Site-wide constants — single source of truth.
 * Import from here rather than hardcoding values across files.
 */

export const SITE_URL      = 'https://www.aylaproperty.com';
export const CALENDLY_URL  = 'https://calendly.com/ayla-teamoperations/30min';
export const INSTAGRAM_URL = 'https://www.instagram.com/aylaproperty/';

/**
 * Ayla's own WhatsApp Business number (Indonesia). Shared by Zaq and the
 * Bali team through WhatsApp companion devices.
 * Digits only, country code first, no "+" (that's the format wa.me needs).
 */
export const WHATSAPP_NUMBER = '6281997329257';
export const WHATSAPP_DISPLAY = '+62 819 9732 9257';
export const whatsappUrl = (text = "Hi Ayla, I'm interested in property in Bali.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
