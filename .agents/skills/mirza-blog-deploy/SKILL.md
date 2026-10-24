---
name: mirza-blog-deploy
description: Ship and verify the mirza-blog site on Cloudflare Workers (static assets) at ymirzaaltay.com — pre-flight checks, push-triggered deploys, and the live verification matrix for routes, redirects, headers, caching and analytics. Use when asked whether the site is live/working, after a push, or when domain, DNS, redirect or deploy behaviour is in question.
---

# mirza-blog deploy and live verification

Deployment facts and boundaries live in `AGENTS.md`; content work is covered by the
`mirza-blog-content` skill. This skill is only about shipping and proving the result.

## Pipeline

```
git push origin main
  -> GitHub -> Cloudflare Workers Builds
  -> npm run build  (Node 22 via .nvmrc, output dist/)
  -> npx wrangler deploy  (wrangler.toml [assets])
  -> Worker "mirza-blog"  ->  ymirzaaltay.com  +  www (301 -> apex)
```

There is no separate server and no upload step: only a push deploys. A build takes
roughly 30-60 seconds before the live site changes.

## Pre-flight (local, cheap)

```bash
npm run check                 # 0 errors expected
npm run build                 # drafts excluded by design
npx wrangler deploy --dry-run # reads dist/, needs no credentials
```

`--dry-run` is the offline proof that `wrangler.toml` still describes a deployable
asset worker. Run it after touching that file.

## Live verification matrix

```bash
# redirects: expect 301 + the https/apex target, query string preserved
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' http://ymirzaaltay.com/
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://www.ymirzaaltay.com/yazilar/x/?a=1

# routes
for p in "" en/ hakkinda/ en/about/ rss.xml robots.txt sitemap-index.xml; do
  printf '%-20s %s\n' "/$p" "$(curl -s -o /dev/null -w '%{http_code}' "https://ymirzaaltay.com/$p")"
done

# a draft route must be 404 in production
curl -s -o /dev/null -w '%{http_code}\n' https://ymirzaaltay.com/yazilar/baslarken/

# headers: _headers must be applied, HTML must NOT carry x-robots-tag
curl -sI https://ymirzaaltay.com/ | grep -iE 'cache-control|x-content-type|referrer-policy|x-robots'
curl -sI https://ymirzaaltay.com/<asset-from-dist>.css | grep -i cache-control  # immutable
```

Canonical and feeds are produced from `src/config.ts`; spot-check one post's
`<link rel="canonical">` and the absolute links in `rss.xml`.

## Analytics quirk (cost real time once)

Cloudflare injects the Web Analytics beacon at the edge **only for browser-like
requests**. A default `curl` sees clean HTML with no beacon, which is not a failure.

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
curl -s -A "$UA" -H 'Accept: text/html' https://ymirzaaltay.com/ | grep -c cloudflareinsights
```

Never add `Cache-Control: public, no-transform` to `_headers`; it disables that
injection.

## Failure triage

| Symptom | Cause |
| --- | --- |
| `Missing entry-point to Worker script or to assets directory` | `wrangler.toml` lost its `[assets]` block (or kept only the Pages key `pages_build_output_dir`) |
| `Hostname ... already has externally managed DNS records` | an old apex/`www` record still exists in the zone; delete it before adding the custom domain |
| Unknown path returns 200 | `not_found_handling = "404-page"` was removed from `[assets]` |
| Page missing from the deploy | `draft: true` in its frontmatter (intended for the reference posts) |
| `.mdx` pages disappear | `mdx({ extendMarkdownConfig: true })` dropped from `astro.config.mjs` |
| `x-robots-tag: noindex` on the live site | you are looking at a preview deployment, not production |

## Boundaries

- Deploy only through a pushed commit; never run `wrangler deploy` against the real
  account on your own initiative (no token is configured, and pushes need approval).
- DNS, redirect rules, TLS and analytics live in the Cloudflare dashboard and are the
  owner's to change. Report the click path instead of attempting it.
- Preview deployments are not production evidence.
