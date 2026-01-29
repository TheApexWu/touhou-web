# Touhou Web

Unified frontend for Touhou music analysis projects. Hosts the interactive explorer, style classifier, and game-by-game breakdowns.

**Live**: [touhou-web.vercel.app](https://touhou-web.vercel.app)

## Pages

- **`/`** — Landing page
- **`/explorer`** — Audio feature explorer (110+ features across 379 tracks, 19 games)
- **`/classifier`** — Arrangement style classifier (identifies doujin circles from audio)
- **`/games`** — Per-game analysis and opinions

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Deployed on Vercel

## Related Repos

- [touhou-composition-analysis](https://github.com/TheApexWu/touhou-composition-analysis) — Feature extraction pipeline and musicology analysis
- [touhou-style-classifier](https://github.com/TheApexWu/touhou-style-classifier) — ML classifier for doujin circle identification

## Development

```bash
npm install
npm run dev
```
