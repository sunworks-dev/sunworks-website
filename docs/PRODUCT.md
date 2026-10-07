# sunworks

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + TypeScript and GitHub Pages are the deployed stack. The owner asked how Astro works and confirmed code-first design. A separate API can support future mailing, community, and social sign-in features; these are not part of the initial launch.

## Product Purpose

sunworks is a company that creates and launches its own apps and web services using AI-assisted vibe coding. The live company website is https://www.sunworks.kr. Its website emphasizes original digital products, curiosity, human judgment, and practical engineering. AI assists the work; it is not the lead personality of the company. The owner explicitly clarified that education is not the primary business; educational apps are one application of the company’s work.

## Users

Assumption: Korean-speaking people discovering the company and its products, including potential users and collaborators. English readers get a parallel English home at `/en/` (owner request, 2026-10-07).

## Capabilities and Constraints

- Public repository: https://github.com/sunworks-dev/sunworks-website, owned by the sunworks-dev organization.
- Company-owned products, not a client development agency (explicitly confirmed).
- Korean-first, responsive company introduction site with an English version at `/en/`. Both languages share one layout; copy lives in `src/i18n.ts`.
- Interactive demonstrations may be authored, but must be clearly identified as demonstrations.
- First product: 어흥!한자, currently preparing for launch. User explicitly supplied the app directory and beta URL https://bryannamd.github.io/hanja-web/.
- 어흥!한자 has its own introduction site at https://hanja-app.sunw.kr/ (repo `sunworks-dev/hanja-study-site`). On 2026-10-07 the owner asked the product section to link there; the web beta stays as a secondary link. The app has no official English name; English copy keeps 어흥!한자 and adds the reading “Eoheung! Hanja”.
- The app source describes a Korean Hanja learning app with characters and spaced review. Existing artwork may be reused for its product introduction.
- No confirmed company contact email, customers, metrics, testimonials, or pricing for this company website. Do not fabricate them.
- Mailing, a board, and social sign-in must remain possible through a separately hosted API.

## Brand Commitments

- Company name: sunworks. AI is part of its working method, not part of the company name.
- The owner asks for an innovative, immediately understandable website.
- Domain: www.sunworks.kr.
- October 7 brand reference: the owner-supplied Korean 썬웍스 logo, yellow-to-orange gradient, slight vintage print character. English logo remains in development.
- Favor creative, recognizably human writing over generic AI-company language.
- Apply Impeccable, UI UX Pro Max, and make-interfaces-feel-better principles.

## Evidence on Hand

The owner supplied the business description, company name, registered domain, and the 어흥!한자 app at `../../apps/hanja-study-app`. Product art comes from that app; source locations are recorded in `public/assets/README.md`. The repository has moved to `sunworks-dev/sunworks-website`, and GitHub Pages serves the verified custom domain with enforced HTTPS. The owner confirmed the live site and requested a much more creative responsive redesign, led by technical capability. Future education products may span all ages, but the company itself is not positioned as education-only.

## Product Principles

- Make the company and its purpose understandable in seconds.
- Show the passage from an idea to something usable.
- Keep claims specific and grounded in confirmed facts.
- Keep the first site lightweight and easy to extend.
