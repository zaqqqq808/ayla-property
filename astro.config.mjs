import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.aylaproperty.com',
  integrations: [tailwind()],
  adapter: vercel(),
  // hybrid: pages are pre-rendered by default; API routes opt out with `prerender = false`
  output: 'hybrid',
  trailingSlash: 'always',
});
