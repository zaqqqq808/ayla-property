import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '@/config';

// Built from the page files and published journal posts, so new pages are
// picked up automatically. Dynamic routes are covered by the collection below.
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

function pathFromFile(file: string): string | null {
  if (file.includes('[') || file.includes('/zz-')) return null;
  const route = file
    .replace(/^\./, '')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '');
  return `${route}/`;
}

export const GET: APIRoute = async () => {
  const pages = pageFiles
    .map(pathFromFile)
    .filter((p): p is string => p !== null)
    .map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: undefined as string | undefined }));

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).map((post) => ({
    loc: `${SITE_URL}/journal/${post.slug}/`,
    lastmod: post.data.publishDate.toISOString().slice(0, 10),
  }));

  const urls = [...pages, ...posts]
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map(({ loc, lastmod }) =>
      `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
