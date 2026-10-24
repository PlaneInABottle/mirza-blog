import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkPele from './src/lib/remark-pele.mjs';

export default defineConfig({
  // extendMarkdownConfig: .mdx, markdown.processor'ı devralsın (mermaid → SVG).
  integrations: [mdx({ extendMarkdownConfig: true })],
  markdown: {
    // ```mermaid bloklarını build sırasında SVG'ye çevirir (istemciye JS gitmez).
    // Astro 7'nin varsayılan markdown motoru (Sätteri) eklenti almıyor, bu yüzden
    // unified işlemcisini açıkça kullanıyoruz.
    processor: unified({
      remarkPlugins: [remarkPele],
    }),
    // Kod blokları sayfanın temasını takip etsin (açık/koyu iki palet).
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
