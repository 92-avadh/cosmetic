# Phase-by-phase implementation plan — skincare storefront clone

Each phase has a goal, tasks, and a "checkpoint" — a concrete way to verify you actually hit 90-95% accuracy before moving on, instead of discovering drift at the end. Don't skip checkpoints; they're what keeps this from becoming "close enough" by phase 12.

---

## Phase 0 — Reference audit (do this before writing any code)

**Goal:** turn the reference site into a spec you can build from, not something you eyeball from memory.

Tasks:
- Open the reference site in Chrome DevTools. For every distinct text style (hero headline, nav link, body paragraph, eyebrow label, button), click the element → Computed tab → note `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`.
- Same pass for colors: background, text, borders, accent — record exact hex/rgb from Computed → `color`/`background-color`.
- Screenshot every section at 3 breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop). Use DevTools device toolbar, not a resized browser window.
- Screen-record the pinned scroll section and the cart drawer opening — you'll need to see easing/timing, not just start/end states.
- Install a pixel-overlay tool now so it's ready for later phases — **PerfectPixel** (Chrome extension) lets you overlay a reference screenshot at set opacity over your live localhost build.
- List every custom font actually loaded (Network tab → filter "Font") — note if any are paid/licensed. If so, pick the closest Google Fonts substitute now rather than mid-build.

**Checkpoint:** you have a folder of annotated screenshots + a token list (colors, type scale) with real values — not the placeholder ones from the earlier prompt.

---

## Phase 1 — Project scaffold & design system

**Goal:** the design tokens exist in code before any UI is built, so every later component pulls from one source of truth.

Tasks:
- `npx create-next-app@latest` (App Router, TypeScript, Tailwind).
- Install core deps: `gsap lenis framer-motion embla-carousel-react zustand`.
- Set up `next/font/google` (or local font files if self-hosting a licensed alternative) for display + body faces from Phase 0.
- Extend `tailwind.config.ts` with your real color tokens, font families, and type scale — no default Tailwind gray/indigo left reachable.
- Build a bare `/style-guide` route rendering every color swatch, type style, and button state. This becomes your visual reference page for the rest of the build.

**Checkpoint:** `/style-guide` page next to a Phase-0 screenshot — colors and type should already look like the same family, even with zero layout yet.

---

## Phase 2 — Static layout, all sections, zero animation

**Goal:** get structure, spacing, and content right first. Animation on top of wrong layout just makes wrong layout move.

Tasks:
- Build each section as inert markup + Tailwind layout: Nav, Hero (static poster image instead of video for now), ProductRow, PhilosophySection, PinnedStepsSection (render all 4 steps stacked, no pinning yet), Footer.
- Use real (your own, non-copied) placeholder copy so text length/wrapping behavior matches — Lorem ipsum will hide layout bugs that real copy-length text reveals.
- Match spacing/padding by eye against Phase-0 screenshots at all 3 breakpoints.

**Checkpoint:** PerfectPixel overlay at 50% opacity, desktop and mobile, for every section. Fix any block that's off by more than ~8px before continuing — this is the cheapest phase to fix drift in.

---

## Phase 3 — Interactive components (no motion library yet)

**Goal:** all clickable/hoverable pieces work functionally with plain CSS transitions, before GSAP/Framer Motion enter the picture.

Tasks:
- ProductCard: base + hover image, swapped with a plain CSS `opacity` transition (`transition: opacity 300ms ease`) — confirms the two-image-stack approach works before animating it further.
- Nav: sticky behavior (`position: sticky` + scroll-listener class toggle for background solidify).
- Button/link underline-reveal via CSS `::after` + `transform: scaleX()` on hover — no JS yet.
- Newsletter input, currency `<select>`, quantity steppers — functional, unstyled-motion versions.

**Checkpoint:** tab through the whole page with keyboard only — every interactive element should be reachable and show a visible focus state. Fix this now; it's much harder to retrofit after GSAP/Framer Motion wrap things in `<div>`s with their own focus quirks.

---

## Phase 4 — Smooth scroll infrastructure

**Goal:** get Lenis + GSAP ScrollTrigger talking to each other correctly — this underlies every animation in Phase 5-7, so isolate and confirm it first.

Tasks:
- Add `SmoothScrollProvider` wrapping the root layout: instantiate Lenis, drive it off `gsap.ticker`, sync `lenis.on('scroll', ScrollTrigger.update)`.
- Confirm native scroll (mouse wheel, trackpad, scrollbar drag, keyboard Page Down) all still work smoothly.
- Add the `prefers-reduced-motion` check here: if matched, skip Lenis instantiation entirely and fall back to native scroll.

**Checkpoint:** scroll the whole page top to bottom — it should feel like one continuous inertia curve, no stutter where sections change. If it stutters, fix here before adding pinned sections on top — pinning bugs are much harder to debug with a broken scroll foundation underneath.

---

## Phase 5 — Scroll-triggered animation: parallax + reveals

**Goal:** the "ambient" motion — background parallax layers, headline reveals, section fade-ins.

Tasks:
- PhilosophySection bg1/bg2 layers: GSAP `ScrollTrigger` with `scrub: true`, different `yPercent` multipliers per layer.
- Hero headline: clip-path or masked reveal on page load (not scroll-triggered — this one fires once on mount).
- Generic "fade up on scroll into view" utility for section headings — reuse across sections rather than writing bespoke ScrollTrigger code per section.

**Checkpoint:** record your build's scroll alongside the Phase-0 screen recording, side by side, same playback speed. Parallax rate and reveal timing should feel like the same "weight" — if yours feels snappier or slower, adjust `scrub` value and easing before moving on.

---

## Phase 6 — Pinned steps section (highest-risk phase, isolate it)

**Goal:** the numbered-step pinned scroll section — build and test this in total isolation from the rest of the page first.

Tasks:
- Reuse the working `pinned-steps-demo.html` pattern already built: `ScrollTrigger.create` with `pin: true`, `onUpdate` mapping progress → step index, fade/translate transitions per step, synced counter and progress bars.
- Build it on a blank test route first (`/test/pinned-steps`) — confirm it works with nothing else on the page.
- Only after it's solid in isolation, move it into the real page layout and re-test — pinned sections are the most likely thing to break when combined with Lenis smooth scroll or nested layout shifts.

**Checkpoint:** resize the browser window while mid-scroll through the pinned section — it shouldn't jump, double-fire transitions, or unpin unexpectedly. Test at all 3 breakpoints separately, since pin start/end points are height-dependent.

---

## Phase 7 — Custom cursor

**Goal:** cursor follow + hover states, added last among the animation work since it touches every interactive element built in earlier phases.

Tasks:
- GSAP `quickTo()` for smooth follow lag on a fixed-position circle element.
- Hover-state scale/blend-mode change triggered on `:hover` of links, buttons, product cards (all built in Phase 3).
- `cursor: none` on desktop pointer devices only — detect via `(pointer: fine)` media query, never disable native cursor on touch.

**Checkpoint:** confirm keyboard focus rings (from Phase 3) still render correctly with the custom cursor active — this is the most common regression at this stage.

---

## Phase 8 — Cart drawer & modals (state + motion)

**Goal:** wire up Zustand cart state and layer Framer Motion transitions on top of functional Phase-3 components.

Tasks:
- Zustand store: cart items, drawer open/closed, currency selection.
- CartDrawer: Framer Motion `AnimatePresence`, slide `translateX` + backdrop fade.
- CurrencyModal: centered dialog, first-visit trigger, `localStorage` persistence so it doesn't reappear.
- Focus trap inside open drawer/modal; `Escape` key closes; focus returns to the triggering element on close.

**Checkpoint:** open cart → tab through it → confirm focus never escapes to page content behind the backdrop → close with Escape → confirm focus lands back on the cart icon button.

---

## Phase 9 — Cross-cutting polish pass

**Goal:** catch the things that only show up once everything is running together.

Tasks:
- Full `prefers-reduced-motion` audit: every GSAP/Framer Motion animation should have a reduced-motion fallback, not just Lenis.
- Real hero video in (compressed, `poster` frame set for LCP), replacing the Phase-2 static image.
- Replace all placeholder copy with your final, originally-written content.
- Full responsive pass at 375/768/1024/1440px for every section, not just the ones you checked earlier — later phases (drawer, cursor) sometimes break earlier layout.

**Checkpoint:** full click/scroll-through at each breakpoint, plus a `prefers-reduced-motion: reduce` pass in DevTools rendering emulation.

---

## Phase 10 — Performance & final accuracy pass

**Goal:** confirm it's fast as well as accurate — video hero + GSAP + Lenis are the usual Lighthouse killers.

Tasks:
- Lighthouse run (mobile + desktop) — target LCP under ~2.5s. Lazy-load below-fold sections (`dynamic()` import for PinnedStepsSection, PhilosophySection).
- Compress/re-encode hero video (target under ~2-3MB for a short loop), confirm `poster` attribute is set.
- Final PerfectPixel overlay pass across all sections and breakpoints — this is your actual "90-95%" measurement, not a guess.
- Cross-browser check: Safari specifically, since `backdrop-filter`, `mix-blend-mode`, and smooth-scroll libraries are the most common Safari-divergence points.

**Checkpoint:** Lighthouse performance score, PerfectPixel screenshots, and a Safari pass — keep all three as your "done" evidence rather than eyeballing it in Chrome alone.

---

## Suggested pacing

If you're working solo alongside your day job: Phases 0-2 (~1 weekend), Phase 3-4 (~2-3 evenings), Phase 5-6 (~1 weekend — Phase 6 especially deserves its own uninterrupted session), Phase 7-8 (~2-3 evenings), Phase 9-10 (~1 weekend). Pinned-steps (Phase 6) and the performance pass (Phase 10) are the two phases most likely to eat more time than expected — budget slack there rather than in the earlier structural phases.
