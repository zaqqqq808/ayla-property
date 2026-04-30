import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://aylaproperty.com',
  integrations: [tailwind(), sitemap()],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
});
