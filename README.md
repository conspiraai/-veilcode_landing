# VeilCore Landing — Stimothy Pumps ($stimothy)

Glitchcore single-page site for **VeilCore** promoting the **Stimothy Pumps ($stimothy)** coin. The page ships as semantic HTML, modern CSS, and vanilla JavaScript with motion-aware glitch effects that power the hero, live embed, and resource sections.

## Project structure

```
├── index.html      # Landing page markup and accessible section structure
├── styles.css      # Glitchcore theme, layout system, neon utilities
├── script.js       # Smooth scroll, clipboard toast, live embed helpers
├── stimothy.png    # Temporary 1:1 coin artwork placeholder
└── assets/         # Reserved for future imagery (kept empty intentionally)
```

## Brand & coin context

- **VeilCore** is the creator-first collective behind the site and all visual branding.
- **Stimothy Pumps ($stimothy)** is the featured token; copy throughout the page references the ticker and coin lore.
- The hero, live badge, and clipboard actions all use `$stimothy` by default—update the copy if the ticker changes.
- VeilCore.us is the canonical domain; all deployment steps and meta tags reference the VeilCore home base.

## Replacing visuals

### Wordmark placeholder
- Locate the `TODO` comment inside the `.wordmark` element in `index.html`.
- Swap the placeholder text with the final VeilCore SVG or `<img>` tag once the asset is ready.
- If using an inline SVG, keep the `aria-label` so screen readers still announce "VeilCore".

### Coin artwork
- The site currently references `stimothy.png` for square art in the hero and about sections.
- Replace the image by dropping a new 1:1 asset into `/assets` and updating the `<img>` `src` attributes in `index.html`.
- Provide descriptive `alt` text that matches the new artwork for accessibility.

## Configuring the live embed

The live section defers loading until it enters the viewport. To wire up a stream URL:

```js
// Inside script.js or an inline module
setLive('YOUR_EMBED_URL');
```

- Call `setLive` once you know the live embed URL (e.g., Pump.fun stream), either in `script.js` or via an inline script after the page loads (`window.setLive('https://example.com/embed')`).
- The helper stores the URL, reveals the **NOW LIVE** badge, and swaps the placeholder for an `<iframe>` as soon as the section is visible.
- `setLive` is exported from `script.js`, so you can import it in other modules or trigger it from the console while testing embeds.
- Remove or replace the placeholder note below the embed card if the stream should appear immediately on load.

## Local development

1. Clone the repository and switch into the project folder.
2. Open `index.html` directly in a browser or run a lightweight server (`python -m http.server` or `npx serve`).
3. Edit copy, links, and styles; refresh to preview updates.

## Deploying to GitHub Pages (veilcore.us)

1. Commit and push changes to the `main` branch.
2. In GitHub, navigate to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and the root (`/`) folder.
4. After the first deploy, set the custom domain to **veilcore.us** in the same Pages settings panel.
5. Update DNS so `veilcore.us` points to GitHub Pages (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a `CNAME` to `<username>.github.io`).
6. Wait for GitHub to issue the TLS certificate; confirm HTTPS works before promoting the link.

### Cache-busting tips

- When you ship updates, append a version query to static assets in `index.html`, e.g. `styles.css?v=2024-05-17`.
- Alternatively, rename files (`styles.v2.css`, `script.v2.js`) so GitHub Pages serves the latest bundle without relying on stale browser caches.

## Links

- Telegram: https://t.me/stimothypumps
- X/Twitter community: https://x.com/majorleague_dev/status/1968142661879206385?s=61
- ConspiraAI: https://conspiraai.com

## License

Document licensing once VeilCore finalizes distribution terms for Stimothy Pumps content.
