# $stimothy — Stimothy Pumps ($stimothy)

$stimothy is a glitch-native, creator-first experience built around the Stimothy Pumps coin. This single-page site leans into a monochrome glitchcore aesthetic, is hosted at [https://VeilCore.us](https://VeilCore.us), and is built by VeilCore for live streams, drops, and on-chain chaos.

## Overview
- **Brand:** $stimothy  
- **Coin:** Stimothy Pumps  
- **Ticker:** `$stimothy` (used by the copy button)
- **Canonical domain:** https://VeilCore.us  
- **Credit:** built by VeilCore

The stack is intentionally lightweight: semantic HTML, modern CSS, and vanilla JavaScript only. Accessibility features include a skip link, focus-visible outlines, aria-live toast messaging, and reduced-motion preferences for glitch animations.

## Project Structure
```
/
├── index.html        # Landing layout and content sections
├── styles.css        # Glitchcore / monochrome design system
├── script.js         # Smooth scroll, clipboard toast, glitch pulses, live embed helper
├── assets/
│   └── social-card.png  # 1200×630 placeholder for social sharing
├── stimothy.png      # Placeholder coin artwork used in the hero
└── README.md         # Documentation (this file)
```

### Brand & Content Notes
- The wordmark, headings, and ticker all reference $stimothy and Stimothy Pumps.
- The hero artwork uses `stimothy.png` as a placeholder; swap it once new art is available.
- The footer includes the canonical domain reference and “built by VeilCore” credit.

## Customising Assets
- **Wordmark:** Replace the text wordmark in `index.html` with your SVG or image, keeping the aria-label as `$stimothy` for screen readers.
- **Coin artwork:** Swap `stimothy.png` with your own 1:1 artwork (keep the filename or update the `<img>` reference).
- **Social card:** Update `assets/social-card.png` to match your campaign while maintaining 1200×630 dimensions for optimal sharing previews.

## Live Embed Usage
The site lazily mounts a live iframe when the `setLive` helper receives a URL.

```html
<script>
  setLive('https://your-embed-url.example');
</script>
```

- When a valid URL is provided, the NOW LIVE badge is revealed and the iframe replaces the placeholder.
- IntersectionObserver is used to defer loading until the live section scrolls into view, with a timeout fallback if the API is unavailable.

## Local Development
1. Clone the repository and `cd` into it.
2. Open `index.html` directly in a browser or serve the folder locally (any static server works, e.g. `python -m http.server`).
3. Edit HTML/CSS/JS files and refresh. No build step is required.

## Deployment to GitHub Pages (VeilCore.us)
1. Commit and push the latest changes to the `main` branch.
2. In the GitHub repository, open **Settings → Pages**.
3. Choose the `main` branch with the `/root` directory and save.
4. In your DNS provider, configure the VeilCore.us domain:
   - Set the **A records** to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Add a **CNAME** record pointing `www` to `<username>.github.io` (replace with your GitHub username).
5. Back in GitHub Pages settings, set the **Custom domain** to `VeilCore.us` and enforce HTTPS.

## Cache Busting Tips
- Append version query strings when updating assets (e.g. `styles.css?v=2`).
- Replace the filename entirely for larger updates (e.g. `social-card-v2.png`) and update references in HTML.
- For CDN caches, purge after deployment or rely on GitHub Pages’ automatic invalidation when files change.

## Links
- Telegram: https://t.me/stimothypumps
- X / Twitter community: https://x.com/majorleague_dev/status/1968142661879206385?s=61
- ConspiraAI: https://conspiraai.com

## License
Placeholder — add your preferred license text here.
