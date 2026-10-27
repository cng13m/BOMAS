# BOMAS Atelier

Buildless website with responsive layouts, scroll reveals, layered parallax, navigation overlay, and dedicated Collection, Original Paintings, and Art Prints pages. No checkout or real inventory is connected.

Pages: `index.html`, `collection.html`, `original-paintings.html`, and `art-prints.html`. To regenerate collection pages after updating the homepage's shared navigation or category cards, run `node scripts/generate-pages.mjs`. Generated HTML is committed; deployment needs no build step.

Scroll choreography lives in `dist/motion.js` and `dist/motion.css`: a pinned homepage artwork sequence, opposing title movement, rotating details, staggered gallery cards, and artwork parallax across all pages. Native scrolling is preserved, motion stops when idle, and reduced-motion preferences switch to a static layout. `node scripts/add-motion.mjs` maintains the homepage scene before regenerating pages.

Source repository: https://github.com/cng13m/BOMAS

The website is hand-authored in `dist/index.html`, `dist/style.css`, and `dist/app.js`; `dist/` is source and is intentionally committed. Images live in `dist/assets/`. No dependency installation or build step is required. GitHub source hosting does not automatically publish the website.

Serve `dist` with a static HTTP server. Publish using the Sites manifest in `.openai/hosting.json`.

For Vercel, import this repository with Root Directory set to the repository root (leave it blank). The committed `vercel.json` selects the Other framework preset, skips install/build commands, and publishes `dist/`. Pushes to `main` can deploy automatically when the Git integration is enabled. Do not set Root Directory to `dist` while using this root-level configuration.

`dist/assets/botanical-study.png` is illustrative AI concept artwork generated with the built-in ImageGen tool; replace with authorized BOMAS artwork before a public storefront launch.

Image prompt: A single expressive abstract botanical still life painting, edge-to-edge, no frame or wall. Cut-paper-like organic shapes of deep cobalt blue, muted olive foliage, pale butter yellow vase and burnt orange petals on warm ivory. Intuitive brushwork, imperfect edges, layered thick gouache, visible linen paper grain. Asymmetrical contemporary gallery composition, no text or signature.
