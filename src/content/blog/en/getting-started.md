---
title: 'Getting started'
description: 'How posts are written and which Markdown features you can use: tables, lists, code, images, footnotes.'
date: 2026-10-24
tags: ['meta', 'markdown']
translationKey: 'baslarken'
cover: ../../../assets/kapak.png
coverAlt: 'An abstract gradient from dark blue to turquoise'
---

This blog is a static site: posts are Markdown files, the build output is plain HTML. No database, no server-side code, no cookies.

This page is a reference. When you forget how something works, look it up here.

## Adding a post

Put a file under `src/content/blog/`; the filename becomes the URL: `first-post.md` → `/en/first-post/`.

```bash
npm run dev     # while writing
npm run build   # produces dist/
```

To keep a post as a draft, add `draft: true` to the frontmatter. It only appears during `npm run dev`, with a "draft" badge; the build skips it entirely.

## Headings

The page title (`h1`) comes from `title` in the frontmatter. In the body you have two levels:

### Third-level heading

#### Fourth-level heading

## Text formatting

**Bold**, *italic*, ~~strikethrough~~, `inline code`, [a link](https://astro.build) and an autolink: <https://pele.run>.

You do not need two trailing spaces for line breaks; Markdown wraps paragraphs itself.

## Lists

- First item
- Second item
  - Nested item
  - Nested item

1. First
2. Second
3. Third

Task list:

- [x] Write the post
- [x] Check the draft
- [ ] Publish

## Tables

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | Page title and list label |
| `description` | Yes | One sentence in lists and search results |
| `date` | Yes | Ordering and date |
| `tags` | No | Tags under the post |
| `draft` | No | `true` keeps it out of the build |

Alignment is set with colons: `|:---|:---:|---:|` → left, center, right.

## Quotes

> A good essay leaves half the work to the reader; the reader finishes it in their head.

## Code

Inline: `npm run build`.

A block with a language (syntax highlighting via Shiki):

```ts
const posts = await getPosts({ lang: 'en' });

for (const post of posts) {
  console.log(post.data.title);
}
```

If you omit the language, you get plain text. There is no filename/title support on code fences; use a comment on the first line if you need it.

## Images

Put images in `src/assets/`; the build converts them to WebP and resizes them:

```markdown
![Alternative text](../../../assets/diyagram.png)
```

The cover image goes in the frontmatter: `cover` and `coverAlt` (one requires the other).

## Footnotes

Diagrams are rendered to SVG at build time,[^1] so readers do not download a diagram engine.

[^1]: This is a footnote. It is listed in its own section at the end of the text.

## Horizontal rule

Three dashes:

---

## Raw HTML

Where Markdown falls short, raw HTML works: <mark>highlight</mark>, <kbd>Ctrl</kbd>+<kbd>K</kbd>.

<details>
<summary>Collapsible section</summary>

Useful for keeping a long note closed by default. Inside it you write HTML, not Markdown.

</details>

## Frontmatter fields

| Field | Type | Note |
| --- | --- | --- |
| `title` | text | Required |
| `description` | text | Required, one sentence |
| `date` | date | Required, `2026-10-24` |
| `tags` | array | `['astro', 'note']` |
| `draft` | boolean | Defaults to `false` |
| `translationKey` | text | Pairs this post with its other-language version |
| `cover` | image | `../../../assets/file.png` |
| `coverAlt` | text | Required when `cover` is set |

## Limits

- Components require `.mdx`; regular posts are `.md`.
- Diagrams have their own guide (Turkish): [Yazı içinde diyagram](/yazilar/diyagramlar/).
- ASCII art has its own guide (Turkish): [Terminalden gelen manzara](/yazilar/ascii/).
- No code-fence filenames/titles; no block code inside table cells.

There is no regular publishing schedule.
