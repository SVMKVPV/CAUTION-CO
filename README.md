# CAUTION CO. — Streetwear storefront

Standalone static ecommerce *concept* for the CAUTION CO. workwear-inspired collection. Uses the 20 supplied editorial images, a responsive product collection, category filtering, product detail modal, size selection, persistent local shopping bag, scroll parallax, 3D-style tilt/motion, ticker, and motion accessibility support.

## Launch

Open `index.html` with a static web server or deploy the folder to Netlify. E.g. `python -m http.server 8000` and visit http://localhost:8000.

## Production prerequisites

- The 20 photos are design reference visuals, not proof of stocked products or regulatory workwear certification.
- Confirm product names, SKUs, prices in AUD, sizes, inventory, shipping, refund/privacy/terms, actual business contact details.
- Checkout is **disabled**; no payments are collected. Connect a verified commerce backend or Stripe **server-side** checkout with webhook fulfillment; never put API secrets in frontend code.
- Newsletter is a placeholder and does not store personal information. Connect a consent-based email provider before activating.
- Avoid claiming AS/NZS compliant hi-vis safety gear without testing and certification.
- Replace the demo contact address before launch.

## Deployment and BLVCK OAK integration

Create a separate GitHub repository named `CAUTION-CO` and import this folder including `/assets`. Deploy that repository on Netlify. Once the live URL exists, add a `CAUTION CO.` business-directory listing to BLVCK OAK `marketplace.js` with its verified deployed URL and real photos. Keep the website-template marketplace section distinct from the business-directory products.
