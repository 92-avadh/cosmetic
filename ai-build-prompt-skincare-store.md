# Master build prompt — K-beauty e-commerce storefront

Copy everything in the fenced block below into your AI coding tool (Claude Code, Cursor, v0, etc.) as the initial project prompt. Sections marked `⚠ VERIFY` contain my best-match values — pull the real hex codes and font-family names from the reference site's DevTools (right-click → Inspect → Computed) and swap them in before you run this, for true 90-95% fidelity.

---

```
ROLE
You are a senior frontend engineer + designer. Build a premium Korean-skincare
e-commerce storefront: minimal, editorial, confident. Off-white background,
ultra-legible sans typography, restrained motion that feels expensive rather
than flashy. Think boutique DTC skincare brand, not a generic Shopify template.

TECH STACK & DEPENDENCIES
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS (custom theme, no default indigo/gray defaults left in place)
- GSAP 3 + ScrollTrigger — pinned scroll sections, parallax, scroll-linked reveals
- Lenis — smooth/inertia scroll wrapper for the whole page
- Framer Motion — cart drawer, mobile nav overlay, modal enter/exit transitions
- Embla Carousel — product row on mobile (snap scrolling)
- Zustand — cart + UI state (drawer open/close, currency)
- next/font/google — font loading, no FOUT
- Sharp / next/image — image optimization
- Optional backend: Shopify Storefront API (if headless commerce) OR a
  simple JSON/CMS-driven product catalog if this is a portfolio build

npm install gsap lenis framer-motion embla-carousel-react zustand

DESIGN TOKENS

Color palette ⚠ VERIFY exact hex via DevTools, this is a close starting point:
  --bg:        #F6F4EE   (warm off-white page background)
  --ink:       #121212   (near-black, primary text)
  --muted:     #6B6A63   (secondary/supporting text)
  --accent:    #C97A5E   (muted terracotta/skin-tone accent — used sparingly:
                          links on hover, small labels, active states)
  --line:      rgba(18,18,18,0.12)   (hairline borders/dividers)
  --card-bg:   #EDE9DF   (product card / panel background, slightly darker than page)
  Keep saturation low across the whole palette. No pure black (#000), no pure
  white (#fff) — always the off-black/off-white above. Accent color is used
  at under 5% of total pixel area: small text, underlines, active dots. Never
  as a large fill.

Typography ⚠ VERIFY exact family via DevTools:
  Display/headline face: a bold, slightly condensed grotesk — e.g. "Neue
  Montreal", "General Sans", or (open-source substitute) "Archivo" or
  "Space Grotesk" at weight 600-700. Used for hero headline, section titles,
  the big step counter.
  Body face: a clean neutral sans — e.g. "Inter" or "Suisse Intl" substitute
  "Inter" at weight 400-500. Used for paragraphs, nav, buttons.
  Type scale: hero headline clamp(40px,6vw,96px)/1.0, section h2 clamp(28px,4vw,48px)/1.05,
  body 15-16px/1.6, eyebrow labels 12-13px/uppercase/letter-spacing 0.08-0.12em.
  Weight discipline: only 2 weights per face (e.g. 400 + 600). No default
  browser bold. All-caps only for eyebrow labels and buttons, never for
  headlines or body.

LAYOUT — SECTIONS IN ORDER

1. Sticky nav — logo centered or left, 3-4 text links, cart + account icons
   right. Background transparent over hero, solidifies to --bg on scroll
   (toggle a class when window.scrollY > threshold). Mobile: hamburger opens
   full-screen overlay nav (Framer Motion fade + stagger link reveal).

2. Hero — full-bleed background <video autoPlay muted loop playsInline>,
   dark gradient overlay at ~15-20% opacity for text legibility, large
   headline center or lower-left, single CTA button. Headline animates in
   with a clipped reveal (mask/clip-path) on page load, staggered by word.

3. Product collection row — 4 product cards horizontal (grid on desktop,
   Embla snap-scroll on mobile). Each card: two stacked <Image> (base +
   alt/lifestyle shot), crossfade opacity 0→1 on hover (300ms ease), name,
   price, small "select" label that fades in on hover.

4. Philosophy/brand statement section — large statement heading, 3 short
   value props in a row, one CTA link with animated underline (width 0→100%
   on hover, transform-origin left). Two background image layers (bg1, bg2)
   each translateY at a different scroll-scrubbed rate via GSAP
   ScrollTrigger (scrub: true) for subtle parallax depth.

5. Pinned "system" scroll section — 4 numbered steps, one visible at a time,
   pinned via GSAP ScrollTrigger while ~400vh of scroll passes underneath.
   Big counter (1/2/3/4) updates in sync. Progress bar per step fills as
   its portion of scroll completes. [Reuse the working pattern from the
   pinned-steps-demo.html already built — same ScrollTrigger onUpdate logic
   mapping scroll progress to step index.]

6. Footer — logo, nav list, newsletter email input, country/currency
   select dropdown, legal links. Newsletter input has a focus-state
   underline animation matching the rest of the site's link style.

7. Cart drawer — slides in from the right (Framer Motion, transform
   translateX 100%→0, spring or 400-500ms ease, backdrop fades in behind
   it). Contains line items, quantity steppers, an upsell row using the
   same product card component at a smaller scale, subtotal, checkout CTA.

8. Currency/geo modal — small centered dialog on first visit, "shopping
   from [detected country]?" with confirm/change options, dismissible,
   stores choice in localStorage so it doesn't reappear.

GLOBAL INTERACTIONS

- Custom cursor: a small solid circle (~10px) that follows the pointer via
  GSAP quickTo() for smooth lag, scales up (~2.5x) and/or inverts color
  (mix-blend-mode: difference) when hovering any link, button, or product
  card. Hide the native cursor (cursor: none) on desktop only — never
  disable native cursor on touch devices.
- Smooth scroll: wrap the app in Lenis, sync its scroll events to GSAP's
  ScrollTrigger via lenis.on('scroll', ScrollTrigger.update) and drive
  Lenis with gsap.ticker so all scroll-based animation and native scroll
  stay in lockstep.
- Page-load sequence: brief (600-900ms) logo or wordmark reveal before
  hero content fades/slides in — keep it short, this is a boutique feel
  not a splash screen.
- Buttons/links: underline-reveal or subtle letter-spacing shift on hover,
  150-250ms ease-out. No bounce, no overshoot easing anywhere on this site
  — every transition should read as calm and controlled, not playful.
- Respect prefers-reduced-motion: disable Lenis smoothing, cursor scaling,
  and parallax scrub when the media query matches; keep opacity fades only.

COMPONENT LIST TO SCAFFOLD
Nav, MobileNavOverlay, Hero, ProductCard, ProductRow, PhilosophySection,
PinnedStepsSection, Footer, CartDrawer, CurrencyModal, CustomCursor,
SmoothScrollProvider (Lenis wrapper), Button, EyebrowLabel

BUILD ORDER
1. Tailwind theme config with tokens above + next/font setup
2. SmoothScrollProvider + CustomCursor (global, wrap root layout)
3. Nav + MobileNavOverlay
4. Hero with video + text reveal
5. ProductCard + ProductRow (this is reused in cart drawer later)
6. PhilosophySection with parallax bg layers
7. PinnedStepsSection (hardest — build and test in isolation first)
8. Footer
9. CartDrawer + Zustand cart store
10. CurrencyModal
11. Pass: responsive audit at 375px/768px/1024px, reduced-motion audit,
    Lighthouse performance pass (video hero + GSAP are the usual culprits —
    lazy-load below-fold sections, compress video, poster frame for LCP)

CONTENT / COPY RULE
Write all headline, body, and microcopy content originally — do not copy
source-site wording verbatim. Use the section descriptions above as a
structural brief only; invent brand name, product names, and copy that fit
a Korean-skincare "skin fitness" positioning in your own words.

ACCESSIBILITY
Keyboard focus visible on all interactive elements (custom cursor must not
remove focus rings), semantic heading order, alt text on all product
images, cart drawer trapped focus while open, modal dismissible via Escape.
```

---

**Once you have real values from DevTools**, replace the `⚠ VERIFY` blocks with:
- Exact hex codes (Inspect any text/background element → Computed → color/background-color)
- Exact font-family names (Computed → font-family; check if it's a paid font served from the store's own CDN — if so, pick the closest Google Fonts match instead, since you can't legally pull their licensed font files)

If you want, I can also generate the **hover-swap product card** and **layered parallax bg1/bg2** components next, same way as the pinned-steps demo — working code you drop straight in.
