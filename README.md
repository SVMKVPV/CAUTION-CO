# CAUTION CO. — THE VOID EXPERIENCE

An interactive five-chapter, cinematic streetwear storefront built from the existing CAUTION CO. collection artwork.

## Experience chapters

1. **The void awaits.** Glitch typography, neon logo atmosphere, reveal choreography, editorial hero.
2. **Materialized from mist.** Lazy-loaded Three.js fashion-object viewer with folded segmented photo geometry, 3 look presets, drag-to-rotate, and 3D rain.
3. **Into the neon rain.** Cityscape layers, responsive 20-look product grid, category filters, 3D pointer hover.
4. **Worn by the night.** Large-format detail photography, reactive spotlight, and scroll-controlled composition.
5. **The mark remains.** Brand lockup, collection lineup and final shop CTA.

## Stack and deployment

- **HTML + Tailwind CSS 4**. Tailwind is compiled at build time with `@tailwindcss/cli`; the output is `tailwind.css`. A separate custom visual layer is in `void.css`.
- **GSAP + ScrollTrigger 3.13** for directional clip-path transitions and scroll-linked motion.
- **Three.js 0.180** lazily imported when its stage approaches the viewport, capped pixel ratio and point counts, WebGL fallback to editorial photography.
- **Netlify** uses `npm run build` and publishes the repo root.
- **App state** is handled by the existing `app.js`: a searchable-by-category 20-product catalogue, product detail preview, size selection and a persistent local shopping bag.

### Running

```bash
npm install
npm run build
npx serve .
```

Or use any simple local server after building the CSS. The WebGL canvas is an optional progressive enhancement and gracefully falls back to its image.

## Commerce disclosure

**This is a concept storefront, not a live payment store.** Prices, inventory, actual product attributes, email contact and merchant payment details have not been supplied or verified. The final UI labels products as enquiry only. The styled checkout-preview produces **copy-ready enquiry text**; it does not submit an order, send an email, charge a card, capture payments or create a real Stripe checkout.

Before genuine transactions, a store owner must provide a verified catalogue (SKUs, stock and AUD prices), business contact details, shipping and returns policies, and connect/test a production payment processor.

## Motion and accessibility

The scene supports mouse drag, arrow-key look selection, reduced-motion preference, and a manual motion toggle. The page includes a skip link, responsive layout, labelled controls, keyboard-accessible product cards and a WebGL-disabled fallback. Large apparel images are lazy loaded except the hero.

## Asset limitations

The experience uses the **existing editorial `assets/look-01.webp` through `assets/look-20.webp`**. The Three.js scene applies those photographs to segmented 3D surfaces for depth and rotation; it is not a physically accurate 360-degree garment scan. Real volumetric 3D clothing would require optimized GLB models, separate materials/texture maps, and garment geometry.

## Four-step workflow

1. **Concept & Art Direction** — Define five chapters, visual tone, typography, motion language and product hierarchy.
2. **3D Asset Creation** — Build garment GLBs from approved product files; create compressed textures, custom lights and particles.
3. **Frontend Development with Three.js** — Implement responsive scenes, GSAP/ScrollTrigger interactions and real commerce integration once prices and account details are ready.
4. **Performance Optimization & Deployment** — Compile Tailwind, compress assets, test WebGL/mobile/reduced motion/checkout, verify Netlify preview, then publish.
