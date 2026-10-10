# Phase 4: Brand Strategy & Information Architecture

## 1. Brand Positioning & Message House
- **One-Sentence Positioning**:
  > Rugessa is a dedicated carpet house combining over 15 years of machine-weaving mastery with tactile design and contract-ready reliability for residential spaces and commercial specifiers. `[R]`

### Message House
- **Foundation / Proven Heritage `[R]`**: Over 15 years of continuous production experience in machine-made carpets; strict principles of quality in production and service, on-time delivery, and affordable value.
- **Core Product Pillar `[R]`**: 10 curated collections spanning resilient high-pile shaggies (Polyester, 3D Microfiber, Frieze), dense heatsets, classic motifs, and delicate chenille and viscose weaves.
- **Service & Knowledge Authority `[R]`**: Real, proven carpet maintenance guidelines (12 foundational recommendations) and 33 specific stain-removal protocols.
- **Commercial Conversion Engine `[A]`**: Frictionless multi-item specification quotation and area estimation for residential homeowners, interior designers, and hospitality project buyers.

---

## 2. Audience Personas & Jobs-to-Be-Done (JTBD)

### Stream A: Residential Homeowner & Private Decorator
- **Profile**: Seeking aesthetic warmth, tactile softness, durable floor accents for living rooms, bedrooms, and dining spaces.
- **Core Need**: "Help me understand which weave (Shaggy vs Heatset vs Viscose) matches my room, calculate my required dimensions, and request a prompt quote."
- **Primary CTA**: **"Browse Collections"** &rarr; **"Add to Quote"** / **"Calculate Area"**.

### Stream B: Architect, Interior Designer & Hospitality Specifier
- **Profile**: Specifying flooring for boutique hotels, restaurants, executive suites, and corporate reception areas.
- **Core Need**: "I need dependable machine-woven carpets with high pile retention, stain cleanability, clear SKU references, and multi-line volume quotes."
- **Primary CTA**: **"Contract & Trade RFP"** &rarr; **"Multi-Item Specification Drawer"**.

---

## 3. Sitemap & Route Hierarchy (≤6 Top-Level Items)

```
/ (Home: Brand narrative, 10 collections visual index, featured SKUs, care preview)
├── /collections (Full Catalogue: 10 collections, 33 verified models, filter by weave)
│   ├── /collections/polyester-shaggy (PS-001, PS-002, PS-003)
│   ├── /collections/3d-microfiber-shaggy (3D-001)
│   ├── /collections/heatset (HT-001 to HT-008)
│   ├── /collections/lurex-heatset (LH-001 to LH-004)
│   ├── /collections/classic (CL-001, CL-002)
│   ├── /collections/frieze (FR-001, FZ-002 to FZ-007)
│   ├── /collections/frieze-shaggy (FS-001 to FS-003)
│   ├── /collections/chenille (CH-001, CH-002)
│   ├── /collections/bcf (BCF-001)
│   └── /collections/viscose (VS-001, VS-002)
├── /contract-trade (Architect & hospitality specification, volume quote, room area estimator)
├── /care-guide (12-rule maintenance guide + searchable 33-recipe stain removal engine)
├── /about (Corporate history verbatim, 15+ years experience, values)
└── /contact (Official email info@rugessa.com, verified inquiry form, interactive quote drawer)
```

---

## 4. Old-to-New 301 Redirect Mapping
Preserves 100% of legacy crawl equity and prevents broken links:

| Legacy URL `[R]` | Target New Route | Purpose |
|---|---|---|
| `/index.html` | `/` | Canonical homepage |
| `/corporate.html` | `/about` | Corporate heritage & values |
| `/contacts.html` | `/contact` | Official contact & quote |
| `/Carpet-care-guide,cleaning_guide,4.html` | `/care-guide#maintenance` | 12-point carpet maintenance guide |
| `/Guide-of-removal-of-stain,cleaning_guide,5.html` | `/care-guide#stains` | Interactive stain removal engine |
| `/Polyster-Shaggy,collection,1.html` | `/collections/polyester-shaggy` | Collection 1 |
| `/3D-Microfiber-Shagy,collection,2.html` | `/collections/3d-microfiber-shaggy` | Collection 2 |
| `/Heatset,collection,3.html` | `/collections/heatset` | Collection 3 |
| `/Lurex-Heatset,collection,4.html` | `/collections/lurex-heatset` | Collection 4 |
| `/Classic,collection,5.html` | `/collections/classic` | Collection 5 |
| `/Frieze,collection,6.html` | `/collections/frieze` | Collection 6 |
| `/Frieze-Shaggy,collection,7.html` | `/collections/frieze-shaggy` | Collection 7 |
| `/Chenille,collection,8.html` | `/collections/chenille` | Collection 8 |
| `/Bcf,collection,9.html` | `/collections/bcf` | Collection 9 |
| `/Viscose,collection,10.html` | `/collections/viscose` | Collection 10 |

---

## 5. Conversion Journeys & Event Tracking Contracts

1. **Journey 1: Quick Room Quotation (Residential)**
   - Entry &rarr; Collection Tile &rarr; "Add to Quote" &rarr; Drawer Opens &rarr; Optional Area m² &rarr; Submit Contact Info &rarr; Reference ID Generated &rarr; Failover to Mailto/WhatsApp.
   - Event Hook: `dataLayer.push({ event: 'quote_submit', type: 'residential', items_count: N })`

2. **Journey 2: Specifier Trade RFP (Contract / Hospitality)**
   - Entry &rarr; Contract Tab &rarr; Multi-line SKU Selection &rarr; Space Type (Hotel, Office, Restaurant) &rarr; Surface Area (m²) &rarr; Submit RFP &rarr; Event Hook: `dataLayer.push({ event: 'quote_submit', type: 'contract' })`.

3. **Journey 3: Care Consultation**
   - Visitor enters with stained carpet &rarr; Searches "Coffee" or "Ink" &rarr; Exact recipe displayed instantly &rarr; CTA to contact specialist or request care advice.
