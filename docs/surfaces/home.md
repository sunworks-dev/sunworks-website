# Homepage

Persuade + Experience. Korean-first website for a company making its own apps and web services. The October 7 owner brief replaces the cobalt/3D world with the supplied Korean logo’s yellow–orange gradient, a slight vintage tone, and more human writing. Preserve verified product facts and links. Code-led preference remains.

## Direction contract

THESIS: Useful daydreams become things people use. A maker’s print edition, with human hands and frank Korean writing instead of abstract technology theatre.

OWN-WORLD: Warm stock, carbon ink, vermilion, orange and golden yellow; generous poster lettering (Gasoek One for Korean with opened 0.03em tracking, condensed Archivo for English), inked rules, tactile print controls. Preserve the supplied Korean logo; it stays the heaviest mark on the page.

STORY: Meet the people-minded approach, explore the real first product, take away a small spark.

FIRST VIEWPORT: A full-width, silent, 16-second looping brand film incorporates the large title and a solid sun disc. A paper fold lifts the sun, an iris leads into ink, a paper ribbon turns over and unthreads as SUN/WORK typography changes, oversized type registers and passes through a circular mask, and die-cut pages fold back to the opening. No rays, spokes, sunbursts or end-logo card. The responsive poster carries the title before playback and whenever motion/data preferences prevent autoplay. The introduction and product action remain readable immediately below the film. A warm gradient strip closes the hero. The later “딴생각 인쇄소” changes and exports illustrated idea cards with finite print motion.

FORM: Small printshop proof-making ritual, grounded position 6, seed 6ba4fd1d; logo-pinned palette. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implementation boundaries

- Both logos are owner-supplied artwork: the Korean 썬웍스! logo on `/`, the English SunWorks! logo (2026-10-07) on `/en/`. Never redraw them or invent another mark.
- Ideas in the print interaction are explicitly exploratory questions, not announced products. No backend AI claim.
- Product: 어흥!한자, web beta; formal release preparing. Primary product action opens the product site https://hanja-app.sunw.kr/; the web beta is the secondary link. No invented customers, metrics, team history or contact details; the footer shows only the company facts from the business registration certificate and support@sunworks.kr.
- Two languages, one surface: `/` (Korean, canonical) and `/en/` (English) render the same component from `src/i18n.ts`, linked by a header language switch and `hreflang`. English copy is written for English readers, not translated line by line.
- Human language leads; AI appears as a tool inside a concrete account of making.
- Native links/buttons, strong focus, reduced motion, readable static no-JS content; 320px through wide desktop.
- Display artwork can exceed the general 6rem floor; body copy and navigation remain readable.
- User explicitly supplied the brand direction and requested implementation. The reference overrides contradictory catalog materials; no new approval requirement introduced.

## Brand film — revised 2026-10-08

- The owner requested a more sophisticated revision, removed the end-logo requirement, prohibited radiating sunburst patterns, and allowed a longer film. The revised master is 16 seconds at 30 fps, silent, with a seamless return to the opening.
- Desktop master/delivery: 1920 × 960 (2:1). Mobile: separately composed 1080 × 1440 (3:4), not a center crop. Exactly 480 frames per film, no audio streams. The final 0.5 seconds match the first frame.
- Korean keeps “쓸모 있는 딴생각.” and “딴생각도 빛을 봐야지.”; English keeps “Useful daydreams.” and “DAYDREAMS DESERVE DAYLIGHT.” The existing “LET THE SUN IN. PUT THE WORK IN.” connects Sun and Works without inventing a company origin story. Original logos remain in the site's header; the film invents no new mark.
- `MotionHero.astro` renders the responsive poster, semantic heading, description, controls and existing introduction. `hero-film.ts` assigns one video URL after page load/visibility, selecting current language, viewport and supported codec. Measured H.264 MP4 files are smaller for this master and load first, with VP9 WebM fallback where supported.
- Reduced motion, data-saving and 2G connections start with the poster and explicit play. JavaScript failure leaves the poster and product link usable. The cached film loops, pauses offscreen/when the tab is hidden, and respects manual pause. A media failure restores the poster.
- The deterministic source is `scripts/motion/renderer.js`; delivery files and measured sizes are in `public/assets/motion/manifest.json`. Production workflow and validation: [motion production](../motion-production.md).
