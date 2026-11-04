# Evermore — a romantic garden-rose wedding invitation

An invitation that feels like wedding stationery in the hand: a blush
envelope sealed with a rose in wax, an arched invitation card framed in
fine gold, watercolour garden roses leaning into every corner, a
manuscript story with pressed-rose keepsakes, silk-ribbon palette
swatches, a reply card with ruled lines — and a velvet-rose finale.
Fully customisable in the browser with a guided, auto-saving visual
editor — then published live with one click on Cloudflare.

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

- **Palette** — porcelain paper, blush rose, dusty rose, champagne
  gold and whisper sage. Four moods ship with the editor:
  *Blush garden* (default), *Porcelain ivory*, *Sage meadow* and
  *Powder blue*. Every colour role can be fine-tuned live.
- **Type** — Cormorant Garamond for display, EB Garamond for prose,
  Parisienne for the couple's names, La Belle Aurore for ink notes,
  Jost for letterspaced labels. Six curated pairings are one click
  away in the editor.
- **Decorative art** — the watercolour garden roses, the bouquet, the
  rose wreath, the rose wax seal and the orangery scene are static
  WebP images in `assets/art/` (transparent backgrounds). No guest
  uploads are used anywhere, so the template is fully static-hosting
  friendly.
- **The opening** — a sealed envelope scene with a GSAP choreography
  (vellum band slides away, the card is lifted from the table) and a
  pure-CSS fallback; always skippable, reduced-motion aware.
- **Accessibility** — every scene is keyboard-reachable, the RSVP form
  is fully labelled with inline errors, reveals respect
  `prefers-reduced-motion`, and nothing essential depends on JS.
