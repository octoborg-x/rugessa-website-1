# Rugessa — Official Redesign Platform

Award-grade digital brand house, interactive catalogue, and B2B specification hub for **Rugessa** machine-made carpets and contract textiles.

## Quick Start
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Type-check and lint
npm run lint

# Production build
npm run build
```

## Content Verification (Gate G1)
Run the automated inventory check to verify zero missing and zero invented products:
```bash
python3 scripts/verify-content.py
```

## Architecture & Structure
- `/src/pages/`:
  - `HomePage.tsx` — 7 purpose-built sections, visual index of the 10 collections, featured SKUs, corporate history.
  - `CollectionsPage.tsx` — Full 33-item catalogue with search, collection pills, and detail modal.
  - `ContractTradePage.tsx` — Architectural & Hospitality portal with 4 space applications.
  - `CareGuidePage.tsx` — 12 factory maintenance points & searchable 33-item stain removal engine.
  - `AboutPage.tsx` — 15+ years corporate history verbatim and 4 company principles.
  - `ContactPage.tsx` — Direct communication with `info@rugessa.com` and quotation review.
- `/src/components/`:
  - `RugessaLogo.tsx` — Crisp vector & image logo rendering.
  - `Header.tsx` & `MobileMenu.tsx` — Dual-stream audience switcher and navigation shell.
  - `QuoteDrawer.tsx` — Multi-item specification RFP drawer with WhatsApp and email failover.
  - `RugCalculator.tsx` — Parametric room dimension & m² estimator.
  - `BottomActionBar.tsx` — Persistent mobile action dock.
  - `Footer.tsx` — Global sitemap and verified contacts.
- `/data/`:
  - `products.json` — 33 verified product objects mapped to Gate G1 schema.
  - `site.json` — Corporate statements, 12 care rules, and 33 stain recipes verbatim.
- `/public/assets/`:
  - `products/` — 33 genuine crawled carpet photographs.
  - `PROVENANCE.csv` — Full asset source audit trail.

## Connecting Form Endpoints in Production
The quotation drawer and contact forms include built-in mailto and WhatsApp failovers. To connect an external backend:
1. Set `VITE_FORM_ENDPOINT="https://your-api-endpoint.com/quotes"` in your environment variables.
2. Form submissions will POST JSON payloads containing item lists, dimensions, and client details.
