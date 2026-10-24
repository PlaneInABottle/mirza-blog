import { render } from 'pele';
import { visit } from 'unist-util-visit';

const escapeAttr = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/**
 * ```mermaid kod bloklarını build sırasında pele ile SVG'ye çevirir.
 *
 * Remark aşamasında (Shiki renklendirmesinden önce) çalışır, çünkü Astro'nun
 * rehype aşamasına verdiğimiz eklentiler kod blokları çoktan <pre
 * class="astro-code"> hâline geldikten sonra çalışıyor.
 *
 * Her diyagram iki kez çizilir: geniş (doğal boyut) ve dar (maxWidth ile dikey
 * yerleşime geçebilen). CSS hangisinin görüneceğine karar verir, böylece
 * mobilde küçülen diyagram yerine yeniden düzenlenmiş hâli görünür.
 *
 * Blok meta bilgisi:
 *   ```mermaid title="Zaman çizgisi"   → accTitle üretmeyen tipler için erişilebilir ad
 *   ```mermaid wide                    → kolona sığmayan genişlik uyarısını sustur
 */
export default function remarkPele(options = {}) {
  const narrowWidth = options.narrowWidth ?? 320;
  const wideLimit = options.wideLimit ?? 700;

  return (tree, file) => {
    let diagram = 0;

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid' || !parent || typeof index !== 'number') return;

      const source = (node.value ?? '').trim();
      if (!source) return;

      const metaTitle = node.meta?.match(/title="([^"]*)"/)?.[1];
      const acceptsWide = /\bwide\b/.test(node.meta ?? '');

      // accTitle'ı desteklemeyen tiplerde (mindmap, block, C4, kanban) meta
      // başlığını aria-label olarak SVG'ye ekliyoruz.
      const withLabel = (svg) =>
        /<title[^>]*>[^<]/.test(svg) || !metaTitle
          ? svg
          : svg.replace('<svg ', `<svg aria-label="${escapeAttr(metaTitle)}" `);

      try {
        const wideDiagram = render(source, { idPrefix: `pele-${diagram}-w` });
        const wide = withLabel(wideDiagram.svg);

        if (!/<title[^>]*>[^<]/.test(wide) && !metaTitle) {
          console.warn(
            `[remark-pele] ${file?.path ?? 'yazı'}: diyagramın erişilebilir adı yok ` +
              `(accTitle veya title="…" ekle; bazı tipler desteklemez).`,
          );
        }

        const narrow = withLabel(
          render(source, { idPrefix: `pele-${diagram}-n`, maxWidth: narrowWidth }).svg,
        );
        diagram += 1;

        const isWide = wideDiagram.width > wideLimit;
        if (isWide && !acceptsWide) {
          console.warn(
            `[remark-pele] ${file?.path ?? 'yazı'}: diyagram ${wideDiagram.width}px geniş ` +
              `(kolon ~632px); yatay kaydırılacak. Kısaltmak için etiketleri kısalt ` +
              `veya 'flowchart TD' dene; kabul ediyorsan bloğa 'wide' ekle.`,
          );
        }

        // Kaydırılabilir kutu klavyeyle de kaydırılabilsin diye odaklanabilir olmalı.
        const wideLabel =
          wide.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim() || metaTitle;
        const wideAttrs = isWide
          ? ` tabindex="0" role="region"` +
            (wideLabel ? ` aria-label="${escapeAttr(wideLabel)}"` : '')
          : '';

        parent.children[index] = {
          type: 'html',
          value:
            `<figure class="diagram${isWide ? ' diagram--scroll' : ''}">` +
            `<div class="diagram-wide"${wideAttrs}>${wide}</div>` +
            `<div class="diagram-narrow">${narrow}</div>` +
            `</figure>`,
        };
      } catch (error) {
        const where = file?.path ? ` — ${file.path}` : '';
        throw new Error(
          `Mermaid diyagramı çizilemedi${where}: ${error?.message ?? String(error)}`,
          { cause: error },
        );
      }
    });
  };
}
