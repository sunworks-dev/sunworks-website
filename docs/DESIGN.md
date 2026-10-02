---
name: sunworks
description: Korean-first daylight palette with a parametric sun identity.
colors:
  surface: '#eef1fa'
  paper: '#fafbfe'
  ink: '#22324e'
  muted: '#536078'
  accent: '#343f81'
  sun-color: '#f58d43'
  product-ground: '#f8e7c5'
  product-ink: '#493624'
  product-muted: '#72583e'
  line: '#d4dae7'
  white: '#fff'
typography:
  display:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: 'clamp(3.25rem, 6.7vw, 6rem)'
    fontWeight: 760
    lineHeight: 1.17
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: 'clamp(2rem, 3.4vw, 3rem)'
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: '-0.035em'
  title:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '21px'
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: '-0.025em'
  body:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.95
  action:
    fontFamily: 'Noto Sans KR Variable, sans-serif'
    fontSize: '14px'
    fontWeight: 600
    lineHeight: 1.5
  wordmark:
    fontFamily: 'Outfit Variable, sans-serif'
    fontSize: '35px'
    fontWeight: 650
    lineHeight: 1
    letterSpacing: '-0.04em'
rounded:
  button: '8px'
  app-icon: '12px'
  range-track: '2px'
  circle: '50%'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.white}'
    typography: '{typography.action}'
    rounded: '{rounded.button}'
    padding: '17px 24px'
  button-dark:
    backgroundColor: '{colors.product-ink}'
    textColor: '{colors.white}'
    typography: '{typography.action}'
    rounded: '{rounded.button}'
    padding: '17px 24px'
  button-dark-hover:
    backgroundColor: '#33251a'
  button-light:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.accent}'
    typography: '{typography.action}'
    rounded: '{rounded.button}'
    padding: '17px 24px'
---

# Design System: sunworks

## Overview

**Creative North Star: "Soft blue daylight"**

Open, Korean-first layouts pair indigo text and cool daylight surfaces with an orange geometric sun. The identity is expressive through its responsive geometry; navigation, text, and product actions remain quiet and direct.

**Key Characteristics:**

- Large Korean headings with restrained Latin wordmarks.
- Open sections, fine horizontal rules, and limited control shadows.
- One reusable sun silhouette with a coordinated, adjustable palette.

This records the implemented system in [global.css](../src/styles/global.css), [index.astro](../src/pages/index.astro), and [SunMark.astro](../src/components/SunMark.astro). Product context lives in [PRODUCT.md](PRODUCT.md); homepage composition lives in [surfaces/home.md](surfaces/home.md). Local review captures are kept in the gitignored `docs/review/` directory: `desktop.png`, `desktop-hero.png`, and `mobile.png`.

## Colors

The frontmatter records CSS declaration defaults. Runtime color changes remain governed by the root custom properties; these are not fixed screenshot colors.

- **Primary:** `accent` supplies actions, the wordmark dot, controls, focus rings, and the closing section. `sun-color` supplies every sun mark and text selection.
- **Neutral:** `surface` is the page ground; `paper` is the light closing-section foreground and button fill. `ink` carries main text, `muted` supporting text, and `line` thin separators and the range track.
- **Product:** `product-ground`, `product-ink`, and `product-muted` form the warm cream-and-brown product section. This local palette stays stable during sun interaction.
- **Action text:** `white` is used on the primary and dark buttons.

**The Coordinated Color Rule.** Bind affected elements to `--accent`, `--sun-color`, and `--surface`; the slider updates all three together.

With JavaScript active, slider value `v` runs from 0 to 100 and `a = v / 100`:

| Root property | Runtime value                  |
| ------------- | ------------------------------ |
| `--sun-color` | `hsl(round(14 + 33a) 89% 59%)` |
| `--accent`    | `hsl((225 + 24a) 49% 34%)`     |
| `--surface`   | `hsl((221 + 22a) 53% 96%)`     |

Initialization applies the default slider value (35). Without JavaScript, declaration defaults and the static mark remain visible; the inactive slider stays hidden.

## Typography

Noto Sans KR Variable carries Korean headings, prose, and actions. Outfit Variable carries the wordmark, decorative orbit text, step numbers, and Latin footer text. Both are bundled through Fontsource; the fallback is `sans-serif`.

The frontmatter captures the desktop hierarchy. Supporting copy uses relaxed leading; introductory body columns stop at (440px), product descriptions at (380px), and process descriptions at (385px). Headings use balanced wrapping, paragraphs use pretty wrapping, and Korean words use `keep-all`.

At widths up to (720px), the hero heading becomes `clamp(3.4rem, 13.5vw, 5rem)` with (1.2) leading, section headings become (31px/1.45), process titles become (18px), actions become (13px), and the header wordmark becomes (28px). Product titles retain their stronger (760) weight and become (43px). The larger closing wordmark uses Outfit at (550).

## Layout

The desktop content wrapper is `min(1280px, calc(100% - 112px))`. Hero, introduction, and product layouts share a slightly asymmetric two-column grid (`1.06fr 1fr`). Section spacing is deliberately generous: introduction (128px/136px), product (96px), and approach (120px/140px) vertical padding. There is no declared global spacing scale.

- Up to (1050px): wrapper gutters shrink to (36px) per side; navigation, art, and process columns tighten.
- Up to (720px): gutters become (20px); hero, introduction, and product stack into one column. Process descriptions move below their titles, preserving the number column. Section padding contracts, the footer wraps, and the closing mark shifts below the text.
- From (1600px): hero minimum height increases from (665px) to (740px). The intermediate desktop rule uses (610px).
- Page minimum width is (320px). The mobile header retains both text navigation links; the separate product shortcut and preview-strip trailing prompt are hidden. There is no hamburger menu.

## Elevation & Depth

Sections stay flat. Tonal changes, fine rules, and overlapping artwork create depth. Shadow use is limited to the range thumb (`0 3px 6px rgb(34 50 78 / 14%)`) and primary-button hover (`0 8px 20px rgb(34 50 78 / 14%)`). Neither becomes a general card-shadow system.

## Shapes

Buttons use softly rounded corners; product app icons use a slightly larger radius, reduced to (10px) on mobile. Circular slider thumbs and status dots echo the sun's radial structure. Product preview and process rows use straight horizontal borders. The sun comprises (24) elliptical rays placed at (15-degree) intervals; the closing section crops the enlarged silhouette at its boundary.

## Components

- **Buttons:** Three filled link variants: accent primary, brown product action, and paper closing action. Desktop minimum height is (56px), mobile (54px); mobile padding is (16px 20px). Arrow icons shift (3px) on hover and the whole action scales to (0.96) while pressed. The dark variant darkens on hover; the primary adds its documented shadow.
- **Navigation:** Inline text links have a minimum (44px) height and underline on hover. The desktop product shortcut uses a diagonal SVG arrow that shifts (2px, -2px). All interactive links, buttons, and inputs receive a (3px) focus outline with (6px) offset; the closing section uses the sun color for visibility.
- **Product preview:** A full-width linked strip uses top and bottom rules, a rounded app icon, title, subtitle, and launch status. Hover adds translucent white (`rgb(255 255 255 / 35%)`). The featured product's launch status sits below its title; it is content, not a decorative heading label.
- **Process rows:** Number, title, and description share a ruled grid. Tabular Outfit numerals align the sequence without enclosing cards.
- **Sun control:** A native range input uses a (44px) interaction height, (3px) track, and (18px) circular thumb. At mobile widths the control remains visible, capped at (255px), beneath a sun stage capped at (350px). Slider input changes ray width, length, offset, rotation, and the shared page palette directly.
- **Sun motion:** The hero has a single (1100ms) clip-path arrival reveal using `cubic-bezier(0.16, 1, 0.3, 1)`. Button and arrow transitions use (220ms); preview hover uses (200ms). There is no continuous idle animation.

**The Direct Interaction Rule.** Under `prefers-reduced-motion: reduce`, disable smooth scrolling, the sun arrival animation, and the documented transitions. Keep the native slider and its immediate geometry/color updates functional. Hover and pressed states remain immediate.

## Do's and Don'ts

- **Do** reuse the root palette variables so the identity stays coordinated during interaction.
- **Do** preserve Korean word grouping, visible keyboard focus, and the existing mobile navigation access.
- **Do** keep the sun as reusable SVG geometry and preserve reduced-motion behavior.
- **Don't** treat the slider's current colors as permanent replacements for the root token definitions.
- **Don't** extend the local product palette or small control shadows into unrelated page surfaces by default.
- **Don't** infer a card, text-input, modal, or dark-mode system from this landing page; none is implemented here.
