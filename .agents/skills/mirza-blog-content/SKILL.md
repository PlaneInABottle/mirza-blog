---
name: mirza-blog-content
description: Author or edit posts, mermaid diagrams, and ascii.rest pieces in the mirza-blog Astro repository, then verify the static build. Use for content changes in this repo; not for generic Astro work outside it.
---

# mirza-blog content

Task guidance for changing content in this repository. Commands, constraints and
ownership boundaries live in `AGENTS.md`; read it first.

## Decide the file type

- Default `.md`. Markdown only.
- Use `.mdx` only when the post imports a component (`ascii.rest` is the only case today).
- Filename is the URL slug: lowercase ASCII, hyphens, no Turkish characters.

## Add or edit a post

1. Create or edit `src/content/blog/<slug>.md` (or `.mdx`).
2. Frontmatter: `title`, `description`, `date` are required. Add `tags` freely.
   Add `cover` only together with `coverAlt`.
3. While drafting, set `draft: true`. The post appears in `npm run dev` with a
   badge and `noindex`; `npm run build` and RSS exclude it.
4. Preview in the browser at `/yazilar/<slug>/`, then remove `draft` to publish.

Do not add listing logic in the page: use `getPosts()` from `src/lib/posts.ts`.

## Diagrams

- Fence ` ```mermaid `, put `accTitle:` (and optionally `accDescr:`) on the line
  after the diagram type. Types that ignore it (`block`, `C4Context`, `kanban`,
  `mindmap`) need `title="…"` in the fence meta. Without a name the build warns.
- Keep the source narrow enough for a 632px column; over 700px the diagram scrolls
  horizontally and the build warns unless the fence meta includes `wide`.
- Use the verified types: flowchart, sequence, class, state, ER, pie, gitGraph,
  timeline, journey, quadrant, xychart, block, sankey, architecture, radar,
  treemap, requirement, C4, kanban, mindmap, gantt, packet.
- Do not hand-write SVG; the remark adapter handles rendering and the wide/narrow pair.

## ascii.rest pieces

- `.mdx` only. `import Ascii from 'ascii.rest/astro';` at the top of the body.
- `mono` for text pieces (server-rendered `<pre>`, works without JS, keep under
  ~80 columns). Colored pieces scale to the column but are empty without JS.
- Always set `label`. Size via `class` plus a global `<style is:global>`; never set height.
- List pieces with `npx ascii.rest list`; do not invent names or counts.

## Languages

- Turkish posts live in `src/content/blog/` (`/yazilar/<slug>/`). English posts live
  in `src/content/blog/en/` (`/en/<slug>/`).
- Language is derived from the path; never add a `lang` field.
- Pair translations with the same `translationKey`. Missing translations are fine.
- Build post URLs with `postUrl()`; pass `lang` to `BaseLayout` and use `ui` from
  `src/i18n.ts` for labels.

## Verify before reporting

```bash
npm run check   # 0 errors expected
npm run build   # must include the new page; drafts must be absent
```

- Visual proof: `npm run build && npm run preview`, then screenshot the preview.
  Dev screenshots include the Astro dev toolbar and are not valid visual evidence.
- Diagram a11y: each render has `<title id="pele-...">` or an `aria-label`.
- ASCII: check `ascii-art pre` computed `line-height` is `1.2`; `.prose pre` (1.6)
  otherwise stretches the art vertically.

## Pitfalls that have already cost time

- MDX inherits the markdown processor, so mermaid works in `.mdx`. Do not document
  or assume otherwise.
- `npm run build` omits drafts; never debug a draft route against build output.
- The dev toolbar overlay is not a page bug.
- Do not state library facts (piece counts, supported types) from memory; verify.
- Code fences do not support `title="..."` in this setup.

## Boundaries

- Content and code changes only; no commits, pushes or PRs unless asked.
- Preserve the zero-JS default and the existing design tokens.
- Site URL in `src/config.ts` is a placeholder owned by the user.
