import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://aylaproperty.com',
  integrations: [tailwind()],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
});
