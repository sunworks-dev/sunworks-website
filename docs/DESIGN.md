---
name: sunworks
description: Creative technology expressed through cobalt stages, monumental type, and finite geometric interaction.
colors:
  blue: '#2546ec'
  paper: '#f4f5f0'
  ink: '#242622'
  orange: '#ff794f'
  citron: '#e8efaf'
  muted: '#62665e'
  blue-copy: '#e1e6ff'
  rule: '#bdc3b6'
typography:
  display:
    fontFamily: 'Bricolage Grotesque Variable, Noto Sans KR Variable, sans-serif'
    fontSize: 'clamp(58px, 6.8vw, 98px)'
    fontWeight: 550
    lineHeight: 1.04
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: 'clamp(35px, 3.9vw, 58px)'
    fontWeight: 650
    lineHeight: 1.42
    letterSpacing: '-0.04em'
  title:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '18px'
    fontWeight: 600
  body:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.9
  action:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '14px'
    fontWeight: 550
  label:
    fontFamily: 'Bricolage Grotesque Variable, Noto Sans KR Variable, sans-serif'
    fontSize: '12px'
    fontWeight: 400
  wordmark:
    fontFamily: 'Bricolage Grotesque Variable, Noto Sans KR Variable, sans-serif'
    fontSize: '32px'
    fontWeight: 750
    letterSpacing: '-0.035em'
rounded:
  tag: '4px'
  control: '6px'
  panel: '12px'
  pill: '99px'
  circle: '50%'
components:
  button-primary:
    backgroundColor: '{colors.blue}'
    textColor: '{colors.paper}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '15px 21px'
  button-primary-hover:
    backgroundColor: '{colors.ink}'
  button-dark:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '15px 21px'
  button-dark-hover:
    backgroundColor: '{colors.blue}'
  engine-state:
    backgroundColor: 'transparent'
    textColor: '{colors.blue-copy}'
    rounded: '{rounded.pill}'
    padding: '0 18px'
  engine-state-selected:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
  capability-tag:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.tag}'
    padding: '6px 10px'
  workbench:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.panel}'
    padding: '23px 26px 21px'
---

# Design System: sunworks

## Overview

**Creative North Star: "Ideas made real"**

sunworks expresses technology and creativity through a cobalt stage, sculptural geometry, and confident opening-title typography. Open paper sections make room for Korean explanations; precise controls reveal the making process. The company creates its own digital products, with education represented by one current product rather than the whole identity.

The system is expressive in its artwork and restrained in navigation, body copy, and controls. Product illustrations retain their own character inside the company palette. Interactive diagrams are authored illustrations, never evidence of a live AI service or invented business results.

**Key Characteristics:**

- Cobalt and paper stages, with solar orange and citron accents.
- Monumental Latin display type paired with readable Korean explanations.
- Open sections, native controls, and finite geometric state changes.
- Original sun geometry and attributable company-owned product artwork.

Extracted from the final code-led build (seed `dfadb90b`; no approved comp): [styles](../src/styles/global.css), [homepage](../src/pages/index.astro), [SolarEngine](../src/components/SolarEngine.astro), [engine behavior](../src/scripts/solar-engine.ts), [SunMark](../src/components/SunMark.astro), [Arrow](../src/components/Arrow.astro), and [Base](../src/layouts/Base.astro). Product truth: [PRODUCT.md](PRODUCT.md). Surface composition: [surfaces/home.md](surfaces/home.md). Final reference captures: `.impeccable/review/{desktop,mobile,compact,tablet,user-1428}.png`, with engine and workbench state captures alongside them.

## Colors

The frontmatter records the stable UI palette. Sculpture materials and product illustration tints remain local to their artwork.

### Primary

- **Cobalt (`blue`):** opening stage, emphasized display words, open disclosure text, and primary actions.

### Secondary

- **Solar orange (`orange`):** closing stage, opening punctuation, selection highlight, and diagram accents.
- **Citron (`citron`):** discipline strip, product ground, and luminous workbench nodes.

### Neutral

- **Paper (`paper`):** main ground, text over cobalt/ink, selected engine controls, and illustration tiles.
- **Ink (`ink`):** main text, dark actions, and workbench ground.
- **Muted (`muted`):** supporting copy on light grounds.
- **Blue copy (`blue-copy`):** supporting text and inactive controls on cobalt.
- **Rule (`rule`):** capability dividers and quiet workbench labels.

**The Stage Contrast Rule.** Keep paper text on cobalt and ink stages, and ink text on paper, citron, and orange stages. Engine state changes affect the sculpture, not the page palette.

## Typography

**Display Font:** Bricolage Grotesque Variable, with Noto Sans KR Variable and sans-serif fallbacks. **Body Font:** Noto Sans KR Variable, with sans-serif fallback. Both are self-hosted through Fontsource; OFL licenses are in `public/assets/font-licenses/`.

The frontmatter captures recurring desktop roles. English displays use tight tracking and compact leading; Korean explanations use generous leading. Capability names use Bricolage at `clamp(28px, 3.1vw, 44px)` and weight (550). Body copy commonly uses (14–16px); small supporting labels use (11–13px). Capability copy stops at (42ch), and the mobile hero introduction at (41ch). Headings balance their wrapping; paragraphs use pretty wrapping.

The opening title is an artwork exception: `clamp(94px, 10.6vw, 163px)`, weight (600), leading (0.96), tracking (-0.04em). It becomes (11vw) at the compact breakpoint, `clamp(70px, 14vw, 106px)` with (0.95) leading on mobile, and (18vw) at the smallest breakpoint. The decorative closing wordmark is similarly oversized.

Mobile section headings become `clamp(49px, 10vw, 74px)`, Korean manifesto text `clamp(28px, 5.2vw, 39px)` with (1.5) leading, and capability names (31px). At the smallest breakpoint, section headings become (45px) and manifesto text (26px).

**The Opening Title Rule.** Reserve monumental type for expressive opening titles and brand artwork. Keep the readable hierarchy beneath it, and start sections with their actual headline rather than a decorative eyebrow.

## Layout

The desktop wrapper is `min(100% - 96px, 1440px)`: (48px) side gutters until the cap applies. Gutters become (32px) up to (1100px), (20px) up to (760px), and (16px) up to (380px). No global spacing scale is declared.

Desktop composition alternates a layered opening, offset manifesto, open two-column capabilities, and a two-column product feature. The engine occupies the opening's right side; explanation and action sit at lower left. Section padding generally spans (100–150px) on desktop and (65–83px) on mobile.

- **Up to (1100px):** header height contracts from (108px) to (90px), columns tighten, manifesto paragraphs stack, and forced desktop copy breaks disappear.
- **Up to (760px):** header becomes (80px); engine enters normal flow below the title; major columns stack. Capabilities precede their diagram, product copy precedes artwork, and prominent actions fill available width. Both navigation links remain visible; the extra header shortcut is hidden.
- **Up to (380px):** type, navigation gaps, diagram padding, and artwork tighten together.
- **From (1650px):** opening minimum height becomes (835px), from desktop (766px). Compact desktop uses (690px); mobile uses content height.

## Elevation & Depth

Sections and controls are flat. Color fields, fine rules, overlapping illustration, and the physically lit 3D sculpture provide depth. Only floating Hanja illustration tiles use a CSS shadow: `0 7px 15px rgb(36 38 34 / 8%), 0 25px 48px rgb(36 38 34 / 6%)`.

**The Artwork Depth Rule.** Put depth in the sculpture and product artwork; keep navigation, disclosure rows, and ordinary action surfaces flat.

## Shapes

SunMark uses eight rectangular rays at (45-degree) intervals around a central circle. Arrow icons share an inline SVG source, rounded stroke ends/joins, and (1.6) stroke width. Ordinary action arrows are (22px), diagram arrows (18px), footer arrows (15px).

Outlined circles and status dots echo the sun; engine controls use pills. Tags, actions, and panels use the extracted radius roles. The product feature has a local (14px) radius. Straight rules organize disclosures; diagram nodes use modest rounded corners.

## Components

### Actions and navigation

Filled links have a (54px) minimum height and the frontmatter padding/radius. Primary actions use cobalt; product actions use ink. Fine-pointer hover swaps these fills; press scales to (0.96). Circular-arrow links use outlined (52px) circles, becoming (45px) on mobile; hover reverses circle fill/text. The opening arrow rotates the shared horizontal SVG downward.

Navigation links have a (44px) minimum height and underline on hover. Interactive elements receive a (3px) `currentColor` focus outline with (5px) offset. Filled buttons override the outline to ink so focus stays visible on paper and citron. Engine buttons explicitly use paper outlines with (4px) offset, preserving visibility in both selection states. A keyboard-visible skip link reaches main content; external product links announce the new window.

### Engine experiment

The visible, accessible caption is “제품 제작 과정을 담은 인터랙티브 실험”. Native Imagine, Build, and Launch buttons form a labelled group; `aria-pressed` exposes selection and a polite live description explains it. Canvas and fallback art are decorative. Controls appear only after successful WebGL initialization.

The engine contains (120) rounded ribs: an orange torus knot, pale structured lattice, and citron radial ring. Selection interpolates position, rotation, scale, and material color over (850ms), using quartic ease-out. Interruptions begin from the current pose. Opening perspective settles over (1800ms); fine-pointer tilt eases to rest. There is no continuous idle loop.

Rendering pauses offscreen or while the document is hidden; pixel ratio caps at (1.6) for fine pointers and (1.25) otherwise. Reduced motion makes state selection immediate, removes opening motion and pointer tilt, disables CSS transitions/smooth scrolling, and preserves controls. No JavaScript, failed WebGL, or context loss retains static artwork and its experiment caption; inactive controls stay hidden.

**The Finite Motion Rule.** Animate a user-requested change, settle, and stop. Preserve immediate state selection under reduced motion and pause rendering when the experience is not visible.

### Capability disclosures and workbench

Native `details`/`summary` elements share a named group, with the first initially open. Fine rules, generous row spacing, and CSS-drawn plus/minus controls organize the list. Open and hovered summaries use cobalt. Outlined discipline tags are descriptive, not interactive.

An opened disclosure selects the AI, engineering, or design diagram and caption. The ink workbench is an illustrative, `aria-hidden` companion to readable text. Its “What if...” motif is not a real input or AI prompt. Without JavaScript, native disclosures work and the initial diagram remains visible.

### Product feature and assets

The citron product container combines real product copy, an ink action, explicit beta/pre-launch status, and company-owned artwork. The app icon beside its name is decorative; the tiger has descriptive alternative text. Floating Hanja tiles remain decorative.

- `public/assets/hanja-icon.webp` and `public/assets/horang.webp`: owner-supplied app assets, resized/converted without generative editing.
- `public/assets/solar-engine.webp`: original Three.js framebuffer render of the same mathematical sculpture; static fallback.
- `public/social-card.png`: original browser-rendered typography, geometric logo, and sculpture composition.

Every shipping raster has adjacent `.json` provenance. Source paths and font licenses are recorded in [public/assets/README.md](../public/assets/README.md). Logo and directional icons remain authored SVG geometry.

## Do's and Don'ts

### Do:

- **Do** reuse the stable root palette and self-hosted font pairing.
- **Do** preserve visible keyboard focus, native disclosures, and mobile access to both navigation links.
- **Do** keep the 3D experiment explicitly illustrative, with finite motion, reduced-motion parity, and a static fallback.
- **Do** reuse SunMark and Arrow SVGs and retain provenance for every raster.
- **Do** present 어흥!한자 as one company-owned product with its actual beta/pre-launch status.

### Don't:

- **Don't** turn education artwork into the company identity or add invented customers, metrics, testimonials, or live-AI claims.
- **Don't** add decorative heading eyebrows or substitute Unicode glyphs for shared SVG icons.
- **Don't** extend opening-title sizes to ordinary interface type or artwork shadows to general cards.
- **Don't** infer forms, a real AI prompt, dark mode, or further product states from the illustrative workbench.
