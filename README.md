# VeilCore Landing Page

A glitch-forward, neon landing page skeleton for **VeilCore** under [veilcore.us](https://veilcore.us). Built with semantic HTML, modern CSS, and vanilla JavaScript to showcase live transmissions, brand story, and community links.

## Project structure

```
├── index.html      # Landing page markup
├── styles.css      # Glitchcore visual system + responsive layout
├── script.js       # Smooth scroll & ticker copy interactions
├── stimothy.png    # Temporary square placeholder image
└── assets/         # Reserved for future VeilCore imagery and media (currently empty)
```

## Getting started

1. **Clone** the repository and change into the project directory.
2. Open `index.html` directly in a browser, or serve the folder locally (for example with `npx serve` or `python -m http.server`).
3. Customize copy, links, and assets to match the latest VeilCore campaign.

## Customization guide

- **Brand wordmark**: Replace the TODO comment inside the `.wordmark` container in `index.html` with the official VeilCore SVG.
- **Ticker symbol**: Update the ticker text and `data-copy` value in the hero ticker group if the symbol changes.
- **Hero imagery**: Swap gradients or add a background video by editing the `.hero::before` styles in `styles.css`.
- **Placeholder image**: Replace `stimothy.png` with a final VeilCore coin or glitch asset; store the new asset inside `/assets` and update the `<img>` path in the About section.
- **Link cards**: Update URLs and copy within the Links section to point to live destinations.

## Accessibility & motion

- Navigation and skip links support keyboard users and smooth scrolling respects `prefers-reduced-motion` settings.
- Toast announcements use `aria-live="polite"` for assistive technologies.
- Glitch animations are disabled for reduced-motion preferences.

## Deploying to GitHub Pages

1. Push the latest changes to the `main` branch of the public repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. After GitHub finishes building, point the custom domain **veilcore.us** to GitHub Pages by updating DNS (add `A` records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `CNAME` to `<username>.github.io`).
6. Set the custom domain to `veilcore.us` in the Pages configuration so GitHub manages HTTPS.

## License

Specify licensing information here once the VeilCore team finalizes distribution terms.
