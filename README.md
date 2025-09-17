# $stimothy — Stimothy Pumps landing

Stimothy Pumps ($stimothy) is a glitch-native experience from VeilCore, built to stream chaos live at [veilcore.us](https://veilcore.us). This repo ships a lightweight static site (HTML, CSS, vanilla JS) with glitch overlays, live-ready hooks, and responsive sections tuned for GitHub Pages.

## Project structure

```
├── index.html   # Semantic single-page layout (hero, about, live, token, links, footer)
├── styles.css   # Monochrome glitchcore system with overlays, marquee, and button utilities
├── script.js    # Smooth anchors, $stimothy clipboard toast, glitch pulses, live embed helper
├── 404.html     # Optional GitHub Pages fallback
├── assets/      # Static assets (add og.png / social cards here)
└── stimothy.png # Placeholder 1:1 coin artwork used in the hero/about art frames
```

## Customizing the brand

- **Wordmark:** Swap the `.wordmark` text in the header for your SVG or image while keeping the existing aria-label for screen readers.
- **Coin art:** Replace `stimothy.png` with final artwork. Keep the filename or update the `<img>` sources in `index.html`.
- **Copywriting:** Adjust hero, about, token, and links text directly in `index.html` to reflect new narratives.

## Live embed workflow

The client script exposes a helper that mounts the Pump.fun livestream. Update the constants at the top of `script.js` or call `setLive()` manually if you need to override the default URL.

```js
// script.js
const LIVE_URL = 'https://your-live-url.example';
const CONTRACT_ADDR = 'Coming soon';

// Immediately embed a different stream at runtime
window.setLive('https://pump.fun/your-stream');
```

A hero badge with the `id="live-badge"` is revealed automatically once the iframe mounts.

## Configuration

- `LIVE_URL` and `CONTRACT_ADDR` are defined at the top of `script.js`.
- The links grid lives in `index.html` under the `#links` section. Update URLs there.
- Deploy by pushing to `main`; GitHub Pages will rebuild and serve the latest files for [veilcore.us](https://veilcore.us).

## Deployment (GitHub Pages)

1. Commit and push to the `main` branch.
2. In **Settings → Pages**, select the `main` branch and the `/root` directory.
3. Set **veilcore.us** as the custom domain. Add the GitHub Pages A records with your registrar:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. (Optional) Add the IPv6 AAAA records for completeness.
5. Once DNS propagates, GitHub will issue HTTPS automatically. Confirm the lock icon at https://veilcore.us.

### Cache-busting tips

- Append query strings to CSS/JS references (e.g., `styles.css?v=build-20250101`) when you need a forced refresh.
- Rename large assets like social cards when replacing them so browsers fetch the new versions immediately.

## Local development

Open `index.html` directly in a browser or run any static server:

```bash
npx serve .
```

Refresh after editing `styles.css` or `script.js` to view updates.

## License

MIT — feel free to adapt, but update the license header if you need something different.
