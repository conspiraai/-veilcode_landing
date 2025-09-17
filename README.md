# Square Surge Landing Skeleton

This repository contains a static landing page scaffold for **Square Surge ($SQRG)** under the Veilcode banner. It uses plain HTML, CSS, and JavaScript to deliver a GlitchCore, neon-soaked Times Square vibe.

## Files

- `index.html` — Page structure with hero, about, live, links, and footer sections.
- `styles.css` — Theme variables, glitch effects, neon buttons, and responsive layout.
- `script.js` — Smooth scrolling navigation, ticker copy-to-clipboard, and toast handling.
- `stimothy.png` — Temporary 1:1 placeholder image reused for hero/coin art.

## Local Preview

1. Clone the repository:
   ```bash
   git clone https://github.com/veilcode/veilcode_landing.git
   cd veilcode_landing
   ```
2. Open `index.html` directly in your browser, or serve locally with any static file server:
   ```bash
   python3 -m http.server
   ```
   Navigate to `http://localhost:8000`.

## Customization

- **Veilcode Wordmark:** Replace the placeholder text inside the `<div class="wordmark">` element in `index.html` with the official SVG once available.
- **Ticker:** Update the `data-copy` value on the `.copy-btn` in `index.html` if the ticker changes.
- **Placeholder Image:** Swap `stimothy.png` with the final Square Surge visual. Keep dimensions square for the best results.
- **Links:** Edit URLs in the Links section to the official Pump.fun, Telegram, and GitHub destinations.

## Deploying to GitHub Pages

1. Commit your changes and push to the `main` branch of the public repository.
2. In GitHub, navigate to **Settings → Pages**.
3. Under **Source**, choose `Deploy from a branch` and select the `main` branch with the `/ (root)` folder.
4. Save the settings. GitHub Pages will provision a site, typically available at `https://veilcode.github.io/veilcode_landing/`.
5. Configure your DNS for `veilcode.us` to point to GitHub Pages:
   - Create A records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Add a `CNAME` record for `www` pointing to `veilcode.github.io`.
6. In GitHub Pages settings, add `veilcode.us` as the custom domain and enforce HTTPS.

After DNS propagates, your Square Surge landing site will be live at **https://veilcode.us**.
