# Fermor homepage

A new homepage for [Fermor](https://fermor.in), built with **React 18 + Vite** and plain CSS (custom properties, no UI kit, no Tailwind).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Node 18+ is required.

## Deploy

**Vercel**: import the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`).
**Netlify**: build command `npm run build`, publish directory `dist`.

## What I was trying to say

Fermor's own tagline is *Understand. Act. Grow.* and its strongest asset is that it shows the arithmetic behind money decisions. So the page does not describe that, it lets you do it.

- **The hero is a working forecast.** Three sliders drive a SIP projection you can scrub, with an "in today's money" switch (6% inflation) because nominal numbers flatter. It is the one memorable element; everything else stays quiet around it.
- **Understand / Act / Grow is the spine.** One tabbed section, each tab with its own small interactive demo: a spending breakdown that explains what changed month to month, a SIP builder, and a goal tracker that tells you *when* you would get there as you move the monthly amount.
- **"Everything in the app"** is a plain five-item index (Market, Portfolio, ACT, Ask, For Kids) so the product surface is clear without five more cards.
- **Ask** is a sample conversation whose answers are computed from the same sample data used above, so the numbers agree across the page.
- **Calculators** are a filterable index linking to the real tools on fermor.in, because that is where most visitors begin.
- **Built for India** explains the audience by showing it: a field that groups digits the Indian way (`9,87,65,432`) and says `9.88 crore`.
- **Analysis**, **FAQ** and a **waitlist** close the page. The waitlist is the only conversion goal, since the app is on a waitlist.

## Design decisions

| | |
|---|---|
| Palette | Cool paper `#F2F5F0`, deep green ink `#10231C`, Fermor green `#75FB90` (kept from the brand), moss `#1D6847` for text accents, marigold `#F2B33D` as the secondary data colour. |
| Type | **Bricolage Grotesque** (display, set slightly condensed with its width axis) and **Hanken Grotesk** (body). Both self-hosted through `@fontsource-variable`, so there is no third-party font request. |
| Layout | Left-aligned and asymmetric. Hairlines and indices instead of rounded card grids. Radii vary by role (pill for controls, 16px inputs, 28px panels). |
| Motion | One orchestrated moment: the forecast chart draws in on load. Everything else animates only in response to an action. `prefers-reduced-motion` is respected. |
| Colour use | Brand green is a signal (results, selected states, the closing block), not wallpaper. |

## Copy and honesty

- Spending, goals and chat answers are clearly tagged **Sample data**, **Example** or **Sample conversation**.
- Every projection states that the return is an assumption.
- The footer keeps the educational / not-SEBI-registered disclaimer from the current site.
- Calculator and article links point to real fermor.in URLs. Article summaries are my own wording.

## Responsive and accessible

- Fluid type and spacing with `clamp()`; checked at 320, 360, 390, 414, 600, 768, 1024, 1280, 1440 and 1920px with no horizontal overflow.
- Tabs follow the ARIA tablist pattern (arrow keys, Home, End). The chart is a keyboard-operable slider. The FAQ is a proper disclosure pattern. The mobile menu closes on Escape.
- Visible focus rings, skip link, labelled form controls, `aria-live` on computed results.

## Waitlist

There is no backend in this assignment. `src/lib/waitlist.js` validates the email and stores it in `localStorage`. To go live, replace the body of `joinWaitlist()` with a `fetch()` to your endpoint; the UI already handles loading, error and success states.

## Structure

```
src/
  lib/          format.js (Indian grouping, lakh/crore), finance.js (SIP, goal maths), waitlist.js
  components/   one file + one CSS file per section
    chapters/   Understand, Act, Grow demos
  styles/base.css   tokens, reset, shared controls
```

## Trade-offs

- Plain CSS over Tailwind to keep the design tokens in one place and the bundle small (about 80 kB gzipped JS, 9 kB CSS).
- No router or state library: the page is a single view and local `useState` is enough.
- No real market data. A live feed would need a licensed source, which is out of scope for a homepage exercise.
- I did not use the existing site's video or screenshots; the product is shown with live components instead.
