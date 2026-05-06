import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://www.aylaproperty.com',
  integrations: [tailwind()],
  adapter: vercel(),
  output: 'static',
  trailingSlash: 'always',
});
