import { render } from 'pele';
import { visit } from 'unist-util-visit';

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

      try {
        const wideDiagram = render(source, { idPrefix: `pele-${diagram}-w` });
        const narrow = render(source, {
          idPrefix: `pele-${diagram}-n`,
          maxWidth: narrowWidth,
        }).svg;
        diagram += 1;

        // Geniş diyagramlar içerik kolonuna sığmayınca küçülür ve okunmaz hâle gelir.
        if (wideDiagram.width > wideLimit) {
          console.warn(
            `[remark-pele] ${file?.path ?? 'yazı'}: diyagram ${wideDiagram.width}px geniş ` +
              `(kolon ~656px). Etiketleri kısalt veya 'flowchart TD' dene.`,
          );
        }

        const wide = wideDiagram.svg;

        parent.children[index] = {
          type: 'html',
          value:
            `<figure class="diagram">` +
            `<div class="diagram-wide">${wide}</div>` +
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
