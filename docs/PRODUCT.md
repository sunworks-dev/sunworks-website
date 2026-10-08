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
- First product: 어흥!한자, currently preparing for launch. User explicitly supplied the app directory. The web beta (the app itself) runs at https://hanja-app.sunw.kr/ (owner update 2026-10-08; it was https://bryannamd.github.io/hanja-web/ before).
- 어흥!한자 has its own introduction site at https://hanja.sunw.kr/ (repo `sunworks-dev/hanja-study-site`; owner update 2026-10-08, it was hanja-app.sunw.kr before). On 2026-10-07 the owner asked the product section to link there; the web beta stays as a secondary link. The app has no official English name; English copy keeps 어흥!한자 and adds the reading “Eoheung! Hanja”.
- The app source describes a Korean Hanja learning app with characters and spaced review. Existing artwork may be reused for its product introduction.
- Product facts the company site uses, as published on the introduction site hanja.sunw.kr (checked 2026-10-08): a dad (the product site signs it “어흥!한자를 만드는 아빠 썬웍스”) built the app to teach his middle-school son Hanja and kept fixing it from the son’s feedback; it covers 3,500 characters for test levels 8급–1급; a skill counts as learned only after a correct recall 12+ hours later. The app keeps study records on the device without a server account (app PRODUCT.md) and its UI is Korean only (app `flutter_app/lib/main.dart` sets `supportedLocales` to `ko` alone). Keep these lines in sync with the product site; do not add its price to this site. The owner approved the dad-and-son story for this site on 2026-10-08, scoped to 어흥!한자 only: use it in the product section, never as SunWorks' founding story or company-wide identity.
- Company identity (한글 사업자등록증, corrected and issued 2026-10-08, and 영문 사업자등록증명, issued 2026-10-08; owner-supplied): 상호 썬웍스 (registered English name: Sunworks), representative 남선 (certificate English spelling: SUN NAM), business registration no. 463-11-02942, business start 2026-06-12, sole proprietorship (일반과세자), public address 서울특별시 송파구 위례광장로 199(장지동, 성희프라자). English public address follows the English certificate, excluding the private unit number: 199 Wiryegwangjang-ro, Songpa-gu, Seoul, Republic of Korea. Company information uses the certificate's English name and representative spelling; brand copy and the supplied logo retain SunWorks. The unit number stays private (owner decision, 2026-10-07). The owner asked to show founding date, representative, contact, address, and a verification link on the site (2026-10-07). Never publish the resident registration number, date of birth, or the certificate file.
- Contact: support@sunworks.kr (the same address the 어흥!한자 site lists; sunworks.kr mail runs on Google Workspace). Company phone 010-5173-5351 (owner-supplied, 2026-10-07). The phone printed on the certificate belongs to the tax office; never use it.
- Verification: Hometax 사업자상태 조회 by registration number works without login. No 통신판매업 registration is confirmed, so do not add an FTC lookup link until it exists.
- No confirmed customers, metrics, testimonials, or pricing for this company website. Do not fabricate them.
- Mailing, a board, and social sign-in must remain possible through a separately hosted API.

## Brand Commitments

- Company name: 썬웍스 (SunWorks in English, matching the English logo). AI is part of its working method, not part of the company name.
- The owner asks for an innovative, immediately understandable website.
- Domain: www.sunworks.kr.
- October 7 brand reference: the owner-supplied Korean 썬웍스 logo, yellow-to-orange gradient, slight vintage print character. The owner supplied the English “SunWorks!” logo on 2026-10-07; the English home uses it, and English copy writes the name as SunWorks.
- Favor creative, recognizably human writing over generic AI-company language.
- Apply Impeccable, UI UX Pro Max, and make-interfaces-feel-better principles.

## Evidence on Hand

The owner supplied the business description, company name, registered domain, and the 어흥!한자 app at `../../apps/hanja-study-app`. Product art comes from that app; source locations are recorded in `public/assets/README.md`. The repository has moved to `sunworks-dev/sunworks-website`, and GitHub Pages serves the verified custom domain with enforced HTTPS. The owner confirmed the live site and requested a much more creative responsive redesign, led by technical capability. Future education products may span all ages, but the company itself is not positioned as education-only.

## Product Principles

- Make the company and its purpose understandable in seconds.
- Show the passage from an idea to something usable.
- Keep claims specific and grounded in confirmed facts.
- Keep the first site lightweight and easy to extend.
