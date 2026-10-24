# AGENTS.md

Project instructions for AI agents working in this repository.

## What this is

Astro 7 static personal blog, Turkish content. No database, no server code, no cookies.
Client JavaScript exists only where `ascii.rest` is used: the homepage hero and the
ASCII post.

## Requirements

- Node.js >= 22.23.4 (`engines` in `package.json`; verified against `astro@7`).
- npm.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on `http://localhost:4321` (HMR) |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | `astro check` (TypeScript + Astro) |
| `npx astro dev status` / `stop` / `logs` | Astro 7 runs `dev` as a daemon |

## Content model

- Posts live in `src/content/blog/`. Default `.md`; use `.mdx` only when the post needs a component.
- Schema: `src/content.config.ts`. Required: `title`, `description`, `date`. Optional: `tags`, `draft`, `cover`, `coverAlt`.
- `cover` requires `coverAlt` (schema `refine`).
- Filename becomes the URL slug (`ilk-yazim.md` -> `/yazilar/ilk-yazim/`). Use lowercase ASCII and hyphens.
- Drafts: `draft: true` is visible only in `npm run dev` (badge on the index, `noindex` on the page). Build and RSS exclude drafts.
- The listing/draft rule lives in one place: `src/lib/posts.ts` (`getPosts`). Reuse it; do not duplicate filters.

## Diagrams

- ` ```mermaid ` blocks are rendered to SVG at build time by `pele`, through the remark adapter `src/lib/remark-pele.mjs` (it came with the scaffold, not from a library integration).
- Every diagram needs an accessible name. Use `accTitle` (and optional `accDescr`) inside the block. Types that ignore `accTitle` (`block`, `C4Context`, `kanban`, `mindmap`) need `title="…"` in the fence meta; the adapter injects it as `aria-label`. The build warns when the rendered SVG has no `<title>`.
- Diagrams wider than 700px get `.diagram--scroll` and scroll horizontally instead of shrinking. Add `wide` to the fence meta to silence the width warning.
- The scroll container gets `tabindex="0" role="region"` plus the diagram title as its label, so it can be scrolled by keyboard.
- Each diagram is rendered twice (wide + narrow). The switch is `max-width: 672px`.
- Text column: `42rem` (672px outer, 632px inner, ~70 characters).
- Arrow flow is CSS-only (`stroke-dashoffset`), respects `prefers-reduced-motion`, and skips pele's own dashed edges.

## ASCII art (`ascii.rest`)

- Only in `.mdx`; import `Ascii` at the top of the body.
- `mono` renders a server-side `<pre>` (works without JS, uses theme color, fixed character width).
- Colored pieces render into `<canvas>`: empty box without JS, but scale to the column width.
- Props: `piece`, `mono`, `label`, `fps`, `options` (including `motion: true`), `class`.
- Styling must be global (`<style is:global>`); set `font-size`/`max-width` on `ascii-art`, never height.
- Build emits one JS chunk per piece (~217 pieces, ~1.3 MB in `dist`); browsers load only the pieces a page uses.
- `.prose ascii-art pre` must keep `line-height: 1.2`; `.prose pre` sets 1.6 and stretches the art vertically.
- The component also injects `@font-face` for a font hosted on `ascii.rest`. It is a last-resort fallback (system monos come first) and is limited to box-drawing/braille ranges, so ASCII art does not request it; the homepage makes no third-party requests.

## Languages

- Turkish posts: `src/content/blog/*.md` -> `/yazilar/<slug>/`
- English posts: `src/content/blog/en/*.md` -> `/en/<slug>/`
- Language comes from the path, never from frontmatter. Do not add a `lang` field.
- `translationKey` pairs two files. It is optional; missing translations are valid.
- Use `postUrl()` from `src/lib/posts.ts`; never hand-build post URLs.
- UI strings live in `src/i18n.ts`; routes and layouts pass `lang` down.
- `BaseLayout` renders `<html lang>` and `hreflang` alternates from `alternates`.
- Feeds: `/rss.xml` (TR) and `/en/rss.xml` (EN).
- On an untranslated post, the header language link goes to the other locale home.

## Verification

- `npm run check` and `npm run build` must pass (0 errors).
- Visual checks: `npm run build && npm run preview`. Do not trust `npm run dev` screenshots for visuals: the Astro dev toolbar overlays the page.
- Draft verification: dev page returns 200 with `<meta name="robots" content="noindex">`; the build must not emit the page and the RSS item must be absent.
- Diagram a11y verification: count `<title id="pele-...">` in the built HTML.

## Known pitfalls (learned)

- `@astrojs/mdx` inherits `markdown.processor` by default (`extendMarkdownConfig: true`), so mermaid works in `.mdx` too. It is declared explicitly in `astro.config.mjs` to freeze that behavior.
- The Astro dev toolbar appears in screenshots and looks like a page bug; it is dev-only.
- Do not hardcode library counts (e.g. ascii.rest pieces); verify against `node_modules` or the package README.
- `src/lib/remark-pele.mjs` is `.mjs`; `astro check` does not type-check it.
- Editing that adapter does not invalidate the content cache: the build keeps the old rendered diagrams. Delete `.astro` and `node_modules/.astro` before rebuilding.
- `npm run build` excludes drafts; never test draft routes against build output.
- `src/config.ts` still uses `https://example.com`; domain wiring is owned by the user, not by agents.
- No code-fence title/filename support (Shiki default). Do not document it as available.

## Boundaries

- Do not commit, push, or open PRs unless asked.
- Keep the zero-JS default; adding client JavaScript needs a concrete reason.
- Reuse existing patterns: the remark adapter, CSS variables, single `getPosts`.
- Defer navigation work (sidebar, archive, tags pages) until the post count justifies it (roughly 15-20 posts).
