# La Terrazza — a sun-warmed Mediterranean wedding invitation

A terrace above the sea: an arch invitation sealed with hand-painted
majolica, bougainvillea leaning into the frame, lemons on the vine and
golden-hour suns over deep evening water. Fully customisable in the
browser with a guided, auto-saving visual editor — then published live
with one click on Cloudflare.

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

- **Palette** — alabaster paper, terracotta clay, majolica blue,
  lemon gold and olive. Four moods ship with the editor:
  *Terracotta sun* (default), *Majolica sea*, *Lemon grove* and
  *Olive terrace*. Every colour role can be fine-tuned live.
- **Type** — Prata for display, Crimson Pro for prose, Tangerine for
  the couple's names, Homemade Apple for ink notes, Karla for labels.
  Six curated pairings are one click away in the editor.
- **Decorative art** — the watercolour lemons, bougainvillea, majolica
  seals and the Amalfi coast scene are static WebP images in
  `assets/art/` (transparent backgrounds). No guest uploads are used
  anywhere in the template, so it hosts cleanly on Cloudflare.
- **Shapes** — the recurring arch, the majolica-tile palette swatches
  and the string of lemons are drawn in CSS/SVG, so every theme
  preset recolours them automatically.

Sample content (names, venue, copy) lives in `js/config.js` and is
marked `SAMPLE`/`EDIT` — or simply change everything in the editor.
