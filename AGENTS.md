# Website Design and Delivery Rules — Rugessa Redesign

## Source of Truth
- `PRODUCT.md` defines the product, audience, value proposition, content facts and constraints.
- `DESIGN.md` defines the approved visual direction, typography, colors, spacing, components and motion principles.
- Do not introduce a second design system or replace tokens without explaining why and getting approval.

## Rugessa Truth Rules & Mandate
- Never invent products, collections, SKUs, brands, certifications, prices, statistics, client names, testimonials, awards, years, addresses, phone numbers, delivery times or guarantees.
- Every real category and collection from `http://www.rugessa.com` exists on the new site (10 collections, 33 products, 2 care guides, verified corporate history).
- Origin conflict rule: metadata mentions Gaziantep/Turkey, third-party directory cites Mohammedia/Morocco. Neither location is published until the client formally confirms (`[?]`).
- Product names and descriptions stay verbatim in data; display copy is polished for clarity and cadence in a separate field.
- No webshop or checkout: commercial model is quotation, sample request, and enquiry.
- Hospitality is a target market, not a false product claim: only truthful capabilities and real carpet collections are staged.
- Ground all facts with evidence tags: `[R]` Rugessa source · `[C]` competitor observation · `[A]` assumption · `[?]` client confirmation required.

## Release Gates (G1–G5)
- **G1 Product Integrity**: 33 verified crawled products in `data/products.json`. 0 invented, 0 missing. Reachable within 3 clicks.
- **G2 Non-Generic Composition**: Purpose-built component patterns. No 3-equal-card templates.
- **G3 Mobile Navigation**: Full app-shell experience tested at 360px and 390px viewports. Persistent action bar.
- **G4 Working Quote & Contact Journey**: Multi-step quote flow, drawer, local storage persistence, honeypot, failover to mailto/WhatsApp.
- **G5 Lightness**: Mobile performance budget, zero heavy bloat, responsive imagery, crisp typography.

## Skill Stack Harmony
- UI/UX Pro Max rules: intentional palette, ergonomic spacing, accessible contrast, semantic hierarchy.
- Impeccable rules: craft polish, deterministic anti-pattern elimination, strict focus indicators, keyboard traps prevented.
- Taste-Skill rules: tactile material close-ups, editorial typography (Cormorant Garamond + Plus Jakarta Sans), no generic SaaS card tropes.
