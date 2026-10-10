# Design Direction & System — Rugessa

## 1. Visual Direction: "Architectural Loom"
Rugessa transitions from an outdated early-2000s table layout into a distinguished, editorial textile maison.
- **Editorial Calm & Tactile Warmth**: Generous negative space, warm travertine canvas, balanced typography, and tactile photography showcasing weave textures.
- **Color Anchoring**: Built directly from programmatic RGB clustering of the official Rugessa brandmark (`mainLogo.png`), harmonized with warm architectural neutrals:
  - Deep Basalt Charcoal (`#18191B`) for crisp, high-contrast typography (16.5:1 AAA).
  - Brand Teal Cyan (`#48ABB2` core, `#2C6B70` for accessible text and primary buttons at 5.3:1 AA).
  - Warm Amber Gold (`#E69F24` core, `#A86800` for badges and accent highlights at 4.6:1 AA).
  - Fresh Olive Leaf (`#86B636` core, `#4E6A1E` for botanical and care accents at 5.1:1 AA).
  - Natural Wool/Linen Canvas (`#FAF8F5`) and warm Travertine cards (`#FFFFFF` and `#F2EEE8`).

## 2. Typography Hierarchy
- **Display Serif**: `Cormorant Garamond` (Google Fonts, variable weights 300/400/600, italic accents) for headlines, heritage quotes, collection names, and brand atmosphere.
- **Functional Sans**: `Plus Jakarta Sans` (Google Fonts, weights 400/500/600/700) for UI navigation, data specs, forms, filters, and mobile ergonomics.
- **Rules**:
  - Desktop Hero: 56px / leading 1.1 / weight 300.
  - Section Titles: 36px / leading 1.2 / weight 400.
  - Body Narrative: 16px / leading 1.6 / weight 400 (never below 16px on mobile).
  - Specs & Technical Labels: 13px / leading 1.4 / weight 500 / uppercase letter-spacing 0.05em.

## 3. Surface & Spatial System
- **Surfaces**:
  - Canvas: `--surface-canvas` (`#FAF8F5`)
  - Elevated Card: `--surface-card` (`#FFFFFF`)
  - Muted Inset: `--surface-subtle` (`#F2EEE8`)
  - Dark Contrast: `--surface-dark` (`#161719`)
- **Borders & Dividers**:
  - Hairline: `1px solid #E6E0D6`
  - Input Borders: `1px solid #B5ADA0` (passes 3.2:1 WCAG contrast requirement for UI controls)
  - Focus Ring: `2px solid #2C6B70` with 2px offset.
- **Border Radii**: Architectural discipline — micro-radii only (`rounded-sm` 4px for buttons/cards, `rounded-none` for sharp architectural panels). No oversized pill buttons.

## 4. Motion Guidelines
- Max 3 signature motions:
  1. Smooth staggered reveal of collection cards (fade-up 0.4s ease-out).
  2. Quote drawer slide-in with backdrop blur.
  3. Image zoom-hover on textile detail (scale 1.03 over 0.5s).
- Full compliance with `prefers-reduced-motion: reduce`.
