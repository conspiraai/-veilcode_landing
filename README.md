# Square Surge ($SQRG) Landing

A glitchcore landing page skeleton for **Square Surge ($SQRG)** under [veilcode.us](https://veilcode.us). The site ships as
semantic HTML, modern CSS, and vanilla JavaScript with accessibility-minded patterns and glitch-flavored visual texture.

## Project structure

```
├── index.html      # Landing page markup and sections
├── styles.css      # Monochrome glitchcore system, layout, and utilities
├── script.js       # Smooth scroll, ticker copy, mobile navigation, current year
├── stimothy.png    # Temporary 1:1 placeholder artwork
└── assets/         # Reserved for future images, video, or downloads (kept empty on purpose)
```

## Getting started

1. Clone the repository and change into the folder.
2. Open `index.html` in your browser (double-click or serve via `npx serve` / `python -m http.server`).
3. Edit copy, links, and imagery to suit the latest Square Surge campaign.

## Customization guide

- **Veilcode wordmark**: Replace the TODO comment inside `.wordmark` in `index.html` with the final SVG logotype.
- **Ticker**: Update the hero ticker text and the `data-copy` attribute if the symbol changes from `$SQRG`.
- **Images**: Swap `stimothy.png` with new square art stored in `/assets`, then update the `<img>` sources in the Hero and About
  sections.
- **Links**: Replace placeholder URLs in the Links grid with the live Pump.fun, Telegram, GitHub (or other) destinations.
- **Token stats**: Populate the Token section list items and CTA once contract launch timing, supply, and liquidity figures are
  confirmed.
- **Styling**: Adjust variables in `:root` within `styles.css` to shift the palette, or extend the utility classes to add more
glitch behaviors.

## Accessibility & motion

- Skip link, keyboard-friendly navigation, and aria-live toasts improve inclusive access.
- Smooth scrolling and glitch animations automatically disable when `prefers-reduced-motion` is set.
- Buttons use high-contrast monochrome styling with pill-green focus indicators for clarity.

## Deploying to GitHub Pages

1. Commit and push to the `main` branch of the public repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** with `main` and the root (`/`) folder.
4. Wait for the deployment to finish, then configure DNS for **veilcode.us** to point at GitHub Pages (A records for
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a `CNAME` targeting `<username>.github.io`).
5. Set the custom domain in the Pages settings to `veilcode.us` so GitHub provisions HTTPS.

## License

Add licensing information once Square Surge distribution terms are confirmed.
