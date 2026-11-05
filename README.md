# Rosalind — a rose-garden wedding invitation

An invitation that feels like a fine engraved wedding suite: a folded
letter sealed in gold wax that opens on arrival, a ring crest crowning
a framed announcement in Bodoni and copperplate script, a letterpress
wording card with engraved corners, a two-chapter love story with a
keepsake posy, a calling card with a fine double rule, three engraved
plates for the particulars, palette swatches, the order of the day
strung along a gold thread, a watercolour Orangery, slim gold countdown
dials, a reply card ready for the post — and a farewell beneath the
wax seal on espresso ground. Fully customisable in the browser with a
guided, auto-saving visual editor — then published live with one click
on Cloudflare.

**Live template pieces**

| Piece | Where |
| --- | --- |
| Guest invitation (opening + ten scenes + RSVP) | `index.html` |
| Visual editor ("Invitation Atelier") | `customize.html` |
| Guest submissions page | `replies.html` |
| Static assets + D1 API | `worker.js`, `functions/` |
| Sample content & copy | `js/config.js` |

## Stack

- **Cloudflare Workers** — static assets (`dist/`) + a small JSON API
- **Cloudflare D1** — stores published invitations and guest replies
- **No build framework** — vanilla HTML/CSS/JS; `scripts/build.mjs`
  copies source into `dist/` and cache-busts asset URLs with content
  hashes, and stamps every page with the build version
- GSAP (CDN) for the opening choreography — everything degrades
  gracefully without it

## Quick start (local)

```bash
npm install
npx wrangler d1 migrations apply terrazza-invitations --local
npm run dev          # http://localhost:8788
```

## Deploy to Cloudflare

See **[DEPLOY.md](DEPLOY.md)** — two paths: dashboard + GitHub
(recommended, no terminal) or the CLI.

## Editing your invitation

1. Open `/customize`
2. Walk the seven steps — everything autosaves
3. Press **Publish invitation** — you get a live guest link
4. Guest replies appear in the editor and at `/replies`

## Design notes

- **Palette** — porcelain ivory, antique gold, quiet sage, champagne
  and espresso. Four moods ship with the editor: *Blush garden*,
  *Porcelain ivory* (default), *Sage meadow* and *Powder blue*. Every
  colour role can be fine-tuned live.
- **Type** — Bodoni Moda for the couple's names, Cormorant Garamond
  for display and prose, Pinyon Script for the calligraphic voice,
  La Belle Aurore for ink notes, Jost for letterspaced labels. Six
  curated pairings are one click away in the editor.
- **Decorative art** — the white-rose corner sprays, the posy, the
  gold wreath, the gold wax seal, the garland swags and the Orangery
  painting are static WebP images in `assets/art/` (transparent
  backgrounds). No guest uploads are used anywhere, so the template
  is fully static-hosting friendly.
- **The opening** — a folded letter sealed in gold wax, with a GSAP
  choreography (the seal cracks, the cover folds open) and a pure-CSS
  fallback; always skippable, reduced-motion aware.
- **Accessibility** — every scene is keyboard-reachable, the RSVP form
  is fully labelled with inline errors, reveals respect
  `prefers-reduced-motion`, and nothing essential depends on JS.
