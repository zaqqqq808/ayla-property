/**
 * patch-runtime.mjs
 * Run after `astro build` to rewrite nodejs18.x → nodejs20.x in
 * Vercel function configs. Required because @astrojs/vercel v7 still
 * emits nodejs18.x which Vercel no longer accepts (EOL Apr 2025).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const entry of entries) {
    const full = join(dir, entry);
    try {
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry === '.vc-config.json') {
        const src = readFileSync(full, 'utf8');
        const patched = src.replaceAll('nodejs18.x', 'nodejs20.x');
        if (src !== patched) {
          writeFileSync(full, patched);
          console.log('[patch-runtime] Patched:', full);
        }
      }
    } catch {}
  }
}

walk('.vercel/output/functions');
console.log('[patch-runtime] Done.');
