/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Calendly — override the default URL defined in src/config.ts
  readonly PUBLIC_CALENDLY_URL?: string;

  // Resend email API (server-side only)
  readonly RESEND_API_KEY?: string;

  // Contact form routing
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;

  // Instagram Graph API token (used by /api/instagram)
  readonly INSTAGRAM_ACCESS_TOKEN?: string;
  readonly INSTAGRAM_USER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
