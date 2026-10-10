# Phase 5: Art Direction & Design System Architecture

## 1. Evaluation of Three Visual Directions

| Concept | Mood & Inspiration | Typography Pairing | Color Focus | Signature Interaction | Verdict |
|---|---|---|---|---|---|
| **Concept 1: Modern Industrial Mill** | High-contrast, stark utilitarian, technical workshop | Space Grotesk + JetBrains Mono | Monochromatic grey + high-visibility yellow | Interactive spec sheet tabular hover | **REJECTED**: Too cold and mechanical; lacks tactile warmth and carpet allure. |
| **Concept 2: Organic Earthy Craft** | Raw dye wash, bohemian artisan, desert pottery | Ogg Serif + General Sans | Terracotta, sand, bleached linen, olive | Grain filter overlays and drifting cards | **REJECTED**: Ignores the machine-woven precision and teal brandmark equity. |
| **Concept 3: Architectural Loom (SELECTED)** | Prestigious European textile maison, architectural clarity, tactile softness | **Cormorant Garamond + Plus Jakarta Sans** | **Basalt Charcoal, Raw Wool Canvas, Brand Teal, Amber Ochre** | **Tactile weave magnification + Slide-out Specifier RFP Drawer** | **SELECTED**: Perfect balance of 15-year industrial capability and high-end residential luxury. |

### Rationale for Selecting Concept 3 ("Architectural Loom")
1. **Brandmark Fidelity**: Directly leverages the Teal (`#48ABB2`) and Golden Ochre (`#E69F24`) extracted from the official Rugessa logo.
2. **Editorial Gravitas**: `Cormorant Garamond` elevates Rugessa alongside premier European textile editors (e.g., Kvadrat, Pierre Frey, Interface).
3. **Ergonomic Precision**: `Plus Jakarta Sans` provides high-density legibility for technical specifications, SKU codes, and mobile form inputs.
4. **Lightness Budget Compliance**: Pure CSS transitions (transform and opacity only), zero heavy 3D canvas libraries, fast mobile rendering.

---

## 2. Typographic Scale & Rules

| Level | Desktop Size / Leading | Mobile Size / Leading | Weight | Usage |
|---|---|---|---|---|
| **Display Hero** | 56px (3.5rem) / 1.1 | 36px (2.25rem) / 1.15 | 300 / Light Serif | Value proposition, brand headline |
| **Section Title** | 36px (2.25rem) / 1.2 | 26px (1.625rem) / 1.25 | 400 / Regular Serif | Collection headings, guide titles |
| **Component Title** | 18px (1.125rem) / 1.3 | 16px (1.0rem) / 1.3 | 600 / SemiBold Sans | Card names, panel titles |
| **Body Narrative** | 16px (1.0rem) / 1.6 | 16px (1.0rem) / 1.6 | 400 / Regular Sans | Descriptions, corporate story (never &lt;16px on mobile) |
| **Technical Data** | 13px (0.8125rem) / 1.4 | 13px (0.8125rem) / 1.4 | 500 / Medium Sans | SKU badges, attribute rows |
| **Micro Labels** | 11px (0.6875rem) / 1.2 | 11px (0.6875rem) / 1.2 | 700 / Bold Sans | Category tags, status indicators |

---

## 3. Component Design Patterns (Gate G2 Compliance)

1. **Pattern A: Collection Showcase Tile (Image-Led)**
   - High-aspect ratio photograph with zoom on hover (`scale-103`).
   - Monospace SKU pill badge in corner.
   - Verbatim collection title, refined description cadence.
   - "Add to Quote" primary action.

2. **Pattern B: Interactive Spec & Dimension Calculator Panel**
   - Live square-meterage estimator (`width × length = m²`).
   - Direct button to inject custom dimensions into the active quote drawer.

3. **Pattern C: Multi-Item Specifier Drawer (Gate G4)**
   - Persistent slide-over drawer triggered from header and floating action bar.
   - Shows active items, allows adding custom notes/dimensions, and transitions into a 3-step quotation form.
   - Automatic local storage persistence with failover to WhatsApp and pre-filled email.

4. **Pattern D: Searchable Textile Stain Engine**
   - Instant live search bar filtering across all 33 verified stains.
   - Chemical reaction cards highlighting safe treatment vs prohibited actions.

---

## 4. Motion Principles (≤3 Signature Motions)
1. **Collection Reveal**: Subtle staggered opacity/translate fade (0.4s ease-out).
2. **Textile Zoom**: Tactile depth hover on carpet photos (`scale-103` transition 0.5s ease-out).
3. **Drawer Transition**: Slide-over drawer with backdrop blur (`backdrop-blur-sm`).
- **Strict Reduced Motion**: All animations disabled when `prefers-reduced-motion: reduce` is detected.
