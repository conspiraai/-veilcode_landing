# VeilCore Landing — Stimothy Pumps ($stimothy)

Glitchcore single-page site for **VeilCore** promoting **Stimothy Pumps ($stimothy)** — a grungy, black-and-white, stream-friendly landing with micro-glitch motion.

## Project structure

├── index.html      # Landing markup + accessible section structure  
├── styles.css      # Monochrome glitchcore theme, layout system, utilities  
├── script.js       # Smooth scroll, clipboard toast, live embed helpers, glitch pulses  
├── stimothy.png    # Temporary 1:1 coin artwork placeholder  
└── assets/         # Reserved for future imagery (kept empty intentionally)

## Brand & coin context

- **VeilCore** is the creator-first collective behind the site and all visual branding.  
- **Stimothy Pumps ($stimothy)** is the featured token; copy and actions use the `$stimothy` ticker by default.  
- **veilcore.us** is the canonical domain; all deployment steps and meta tags should reference VeilCore.

## Links

- Telegram: https://t.me/stimothypumps  
- X / Twitter community: https://x.com/majorleague_dev/status/1968142661879206385?s=61  
- ConspiraAI: https://conspiraai.com

## Replacing visuals

### Wordmark placeholder
- In `index.html`, find the `.wordmark` placeholder.
- Swap the text for your final VeilCore SVG or an `<img>` (e.g., `/assets/veilcore-wordmark.svg`).
- If inlining SVG, keep an accessible label (e.g., `aria-label="VeilCore"`).

### Coin artwork
- The site currently references `stimothy.png` for square art in hero/about.
- Replace it by dropping a new 1:1 asset into `/assets` and updating the `<img src>` in `index.html`.
- Provide descriptive `alt` text to match the new artwork.

## Configuring the live embed

The Live section lazy-loads when it enters the viewport. To wire a stream URL:

// Inside script.js (already exported)
setLive('YOUR_EMBED_URL');
// Example: setLive('https://your-embed.example');
// Reveals the NOW LIVE badge and swaps the placeholder with an <iframe>

Call `setLive` once you know the live embed URL (e.g., Pump.fun stream). The helper stores the URL, reveals the NOW LIVE badge, and swaps the placeholder as soon as the section is visible. Remove or replace the placeholder note below the embed card if the stream should appear immediately on load.

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

## License

Add licensing information once Stimothy Pumps distribution terms are finalized.
