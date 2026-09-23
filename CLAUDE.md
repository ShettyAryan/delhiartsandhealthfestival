@AGENTS.md

# Delhi Arts & Health Festival — Website Project

## About this document

This is the north-star document for building the DAHF website. Read this before every meaningful design or tech decision. Where this document and generic best practice disagree, this document wins. Two PDFs live in `../Info and Assets/`:

- `Delhi Arts & Health Festival Press Kit.pdf` — brand identity, logo, palette, typography, mural
- `Website content for DAHF.pdf` — all page copy, exactly as the client wrote it

A third file, `DAHF elements.pdf`, contains pastel geometric shapes that are **not** brand-palette colours. It is treated as a Canva export artifact and is not used.

---

## 0. Amendments — signed off 3 September 2026

These supersede the sections they name. They were agreed after reading the press kit artwork directly (rendered and pixel-sampled), which contradicts several details §3.3/§3.4 recorded from memory.

### 0.1 Stack — supersedes §5, §5.1, §5.2

`create-next-app@latest` now installs **Next 16 + React 19 + Tailwind v4**. Tailwind v4 has no `tailwind.config.ts` at all. The stack is:

| | Version |
|---|---|
| next | 16.3.4 |
| react / react-dom | 19.2.8 |
| tailwindcss | 4.x — **CSS-first `@theme`, no config file** |
| motion | 13.x — `framer-motion` is now a deprecated alias; import from `motion/react` |
| lenis | 1.x |
| Node | **22 LTS** (`.nvmrc`). Node 20 reached EOL in April 2026. |

The theme lives in [app/globals.css](app/globals.css) as an `@theme` block. `--color-*: initial` wipes the default palette completely, so `slate-800`, `gray-500`, `zinc-*`, `neutral-*`, `stone-*`, `emerald-*`, `sky-*` emit **no CSS whatsoever**. This is verified — the §5.1 rule is enforced by the compiler, not by convention.

Everything else in §5 stands: `useReducedMotion()` at the top of every animated component, six animation moments only, server components by default.

### 0.2 The logo — supersedes §3.4

§3.4 describes teal/pink/yellow circles with multiply blending. That is wrong. Sampled from the artwork:

| Region | Hex | Token |
|---|---|---|
| Top circle | `#ED2B75` | pink |
| Lower-left circle | `#ED3237` | red |
| Lower-right circle | `#EDBF09` | yellow |
| pink ∩ red | `#000066` | navy |
| pink ∩ yellow | `#4C8E9A` | slate |
| red ∩ yellow | `#7F3653` | maroon |
| all three | `#09A794` | **teal** |

**The seven-colour core palette *is* the Venn diagram.** Teal — the primary brand colour — is the centre where all three meet. This is the identity's central idea and should be treated as such.

Consequence: **never use `mix-blend-mode: multiply`.** Real multiply produces muddy browns, not `#000066` and `#09A794`. Every lens is an explicitly assigned token, drawn as a `clipPath`-derived arc path with a flat fill. This also renders identically everywhere and needs no blend-mode fallback.

The wordmark was traced by pixel-measuring the positive logo: total aspect **3.47:1** on a 100-unit cap height, stem weight 26, letter gaps ~10. The `H` is India Gate — a small finial stepping out through a **ziggurat cornice** to full width at 34% height, then two legs with a semicircular arch springing at 58% (apex 47%). It is *not* crenellated; that was a guess, and the measurement disagreed.

The wordmark is heavier and wider-stemmed than Antonio, so Antonio is an *echo*, not a match — the lockup wordmark is drawn as **paths, not live text**.

One implementation trap worth keeping: Framer writes its own `transform` **style**, and a CSS transform beats the SVG `transform` presentation attribute. Animating a positioned `<path>` directly collapses every letter onto x=0. Position with a plain `<g transform="…">`, animate an inner `motion.path`.

### 0.3 The mural — supersedes §3.3

| Motif | §3.3 said | Actually |
|---|---|---|
| Daisy | cream flower on **cream** | cream flower, red centre, on **purple `#804388`** |
| Stairs | cream wave over blue, red arch | correct — blue is `#626DD9`, **not a palette colour** |
| Star | **six**-pointed, deep green on pink | **eight**-pointed; green `#0D422E`, **not a palette colour** |
| Kalash | red goblet on yellow | correct |

Three mural-scoped tokens are therefore added to the theme — `mural-blue`, `mural-green`, `mural-cream` (`#FDE4BA`, warmer than `--cream`). The §5.1 rule holds: every colour still resolves through the theme, and no arbitrary hex appears in JSX. These three are for `<Motif>` only.

Motifs render **flat**. The source artwork carries a grain texture and soft radial gradients; both are deliberately dropped — §2 rules out gradient washes as decoration, and a per-tile `feTurbulence` filter would cost more against the §9 Lighthouse budget than it returns.

### 0.4 The hero — supersedes §8 (Home, item 1)

**Superseded by §0.10.** This section recorded an interim resolution — typographic hero with the eight images as a static mosaic beneath it. The client subsequently asked for the rotating carousel directly; §0.10 is the current design.

### 0.5 Contrast overrides — supersedes §7 and part of §3.1

§3.1 says to adjust text on colour to `--cream` or `--white` and verify AA. On **pink** and **red** neither reaches it: cream on pink measures **3.3:1** and white only **4.0:1**, so body copy fails at any size. Measured and resolved:

| Surface | Text | Ratio |
|---|---|---|
| pink `#ED2B75` | **black** | 5.2:1 |
| red `#ED3237` | **black** | 5.1:1 |
| navy | cream | 14.4:1 |
| teal / yellow / lime / slate | black | 5.7–19:1 |
| purple | cream | 5.6:1 |
| maroon | cream | 6.8:1 |

Consequences, all deliberate:
- **`CTAButton` primary is pink fill with BLACK text**, not cream as §7 states. A third variant, `invert` (cream fill, navy text), exists for CTAs sitting on pink or red, where a navy outline would only reach 4.4:1.
- **Header nav active/hover is `maroon`**, not pink — pink on cream is 3.3:1 at body size.
- **The "Care" column accent is `maroon`**, not teal. Teal on cream is 2.47:1, failing even the 3:1 large-text threshold. Teal is still used for the "Global Connections" pillar, which sits on navy (5.8:1).
- **No opacity dimming on text over colour.** 80% black on pink lands at 4.4:1 and 80% cream on purple at 4.2:1 — both just under AA.

### 0.6 Mural rendering

The mural strip is one SVG `<pattern>` tiled by the renderer, not a row of individual `<Motif>` elements. Emitting the tiles individually cost ~250 DOM nodes per band; the pattern is ~15 for the same picture, and it cut homepage HTML from 121kB to 74kB.

Parallax is homepage-only, per §4 ("Section separators (homepage)"). Every other page uses `MuralBandStatic`, a server component — which also keeps the animation runtime out of those pages' bundles entirely. `MobileMenu` is loaded through `next/dynamic` and prefetched on first pointer/focus contact with the trigger, for the same reason.

### 0.7 Images — homepage filled, 28 slots to go

The homepage's 16 slots carry real photographs. Everything else still renders an **on-brand placeholder** instead of a grey box: a whole folk-motif tile centred on `cream-2` for `<Figure>`, and initials set in Antonio on a brand colour for `<Portrait>`. The pages read as finished today and photos drop in with **no layout work**.

| Slot | Count | Ratio |
|---|---|---|
| `HERO_STRIP` — homepage mosaic | 8 | 3:4 |
| `PATHWAYS` — experience blocks | 5 | 3:2 |
| `DAYS` — programme, one per day | 5 | 3:2 |
| `GET_INVOLVED` — three paths | 3 | 3:2 |
| `ABOUT_IMAGE` | 1 | 16:9 |
| `PRESS_IMAGES` | 3 | 1:1 |
| Team headshots (`Person.photo`) | 19 | 4:5 |

Adding a photo is one line in [lib/content.ts](lib/content.ts); [public/images/README.md](public/images/README.md) carries the full mapping, the normalisation that was applied, and what is still missing.

Supplied files are normalised before use — EXIF rotation baked in (sharp does not always honour the flag when resizing), capped at 2800px, re-encoded, and renamed to lowercase slot names (Vercel's filesystem is case-sensitive; Windows is not, so a wrong-case path passes locally and 404s in production). That took the homepage set from 88MB to 7.9MB. Originals are kept in `assets-source/` at the repo root, outside `public/`, so they are preserved but never deployed.

Two rules that matter:

- **`alt` is already written**, from the subject the client specified — so it describes the *intended* photograph. Confirm each one matches what actually lands. A wrong alt is worse than a late one.
- **Placeholders are `aria-hidden`.** Announcing alt text for a photo that is not there would describe something no one can see. The alt travels with the slot regardless and becomes live the moment `src` appears.

Layout decisions worth keeping:
- The content PDF asks for a **rotating carousel** in the hero. Built as a gapless full-bleed **mosaic** instead: §4 rules out hero parallax and caps the site at six animation moments, all already spent — and a mosaic shows all eight at once rather than hiding seven behind a timer. It reflows 8 → 4 → 2 columns so tiles never become slivers.
- Pathway and programme-day images **alternate sides** down their stacks, so neither reads as one template repeated (§2).
- Motif geometry is emitted **once per document** via `<MotifDefs>` in the root layout and referenced with `<use>`. The homepage shows thirteen motifs; inlining each one's ~10 shape nodes was measurably expensive.

### 0.10 The hero — supersedes §0.4, and extends §4's six moments

Redesigned on client direction (4 September 2026). The hero now carries the
headline, subheading, dates, the full intro paragraph, the CTAs, and a **rotating
image carousel**.

**The carousel is a seventh animation moment.** §4 caps the site at six and §0.4
resolved the same request into a static mosaic. The client asked for the carousel
directly a second time, so it is built — recorded here rather than left as silent
drift. It is a cross-fade, not the hero parallax §4 rules out.

Three things it has to keep doing:

- **A pause control (WCAG 2.2.2).** Anything auto-updating for more than five
  seconds needs one. Without it the page fails accessibility outright — the
  homepage measured 96 before the dots and pause were sized and wired properly.
- **24px targets (WCAG 2.5.8).** The dot is 10px; the button around it is 24px.
  A bare 10px dot fails `target-size`.
- **Two images in flight, never eight.** Only the visible slide and the next are
  mounted. No `priority`: measured, the carousel starts at y=958 on a 375×812
  phone, so preloading it would put a below-fold image on the critical path.

Under reduced motion the carousel does not auto-advance and the pause button is
not rendered at all — a control that stops nothing is worse than no control. The
dots still navigate, so every image stays reachable.

Consequences elsewhere:
- The homepage mosaic is **gone**; the carousel carries the same eight images and
  showing them twice would be repetition.
- `FESTIVAL.intro` moved out of the section below the marquee, which now carries
  the GSAH/GAIMF copy alone.
- The `<h1>` is the real headline: an sr-only "Delhi Arts & Health Festival",
  with the DELHI wordmark and "Arts & Health Festival" as its visible lockup.
- **Donate** replaces "Stay Informed" as the hero's primary CTA. The payment link
  is still to come; `DONATE_HREF` points at the funding address from the client's
  own contact list, because a `#` ships a dead button.

### 0.11 Hero — supersedes §0.10's layout, keeps its animation rules

Rebuilt again on client direction (4 September 2026), from a reference screenshot: a compact two-column composition (headline/copy/CTAs left, one photo right) rather than §0.10's centred single-column stack. §0.10's three rules (carousel as a seventh animation moment, its pause control, its weight budget) all stand unchanged — only the surrounding layout moved.

Two things in the reference conflicted with the brand system, resolved as follows:

- **Soft organic blob shapes behind the photo.** §2 rules out decoration with no brand meaning. Replaced with flat circles in brand pink and yellow — `rounded-chip` (999px), same token as pill buttons — which read as an extension of the Venn's own circle language rather than arbitrary shapes. They live inside `<HeroCarousel>`, scoped to a wrapper around just the photo box, not the whole component — early versions bled into the pause button and caption below before that scoping was added.
- **A headline sized to share a row with a photo**, not the full-bleed monumental treatment §2 names as the site's one deliberately bold moment. Treated as an explicit override for this composition, not a quiet drift: the wordmark is still the real traced paths with the same letter-by-letter stamp, just resized to `0.82em` inline instead of `width:100%`.

**The Venn mark now doubles as the headline's terminal punctuation** — the client's "the i to have the three circle dot like the logo," read as the dot after FESTIVAL rather than a literal lowercase i (the headline has none). At ~0.5em, three circles flying in from off-canvas would be imperceptible, so the entrance condenses to one spring scale-in, landing last as a flourish after the wordmark stamps and the rest of the headline fades in.

**Accessible name:** only "DELHI" is an SVG now (the rest — "Arts & Health Festival" — is real text), so only "Delhi" is supplied via `sr-only`; the rest is read from the actual DOM text. The full name still resolves to "Delhi Arts & Health Festival" with a single space, not two — an early pass left a stray text node between the sr-only span and the SVG that doubled the gap.

**Contrast:** pink is used directly on the headline (not maroon, its usual on-cream substitute per §0.5) because at heading scale — well above the 24px/18.66px-bold large-text threshold — it measures ~3.3:1 against cream, clearing the 3:1 large-text AA minimum. That pairing is scoped to this headline only; maroon still stands wherever pink would appear at body or small-label size, per §0.5.

**Font honesty:** the italicised subheading uses a browser-synthesised oblique, not a real italic cut — Libre Franklin is loaded at 400/500 only (§0.1), and adding an italic style for one line wasn't judged worth the extra font-weight fetch against the mobile performance budget.

Re-measured after the rebuild: mobile Lighthouse performance is a wash (median 91 vs the prior 92, well within the 91–96 single-run spread already on record) — the smaller headline didn't meaningfully change the LCP paragraph's render-delay story from §0.8. Accessibility, best practices and SEO hold at 100 on both profiles.

### 0.12 Known gap — mobile performance

Desktop is **100 on all four categories across all seven routes**. Mobile is **100 on accessibility, best practices and SEO across all seven**; performance runs **92–97**, against the §9 bar of 95+. The homepage sits at **92** (median of five runs; single runs range 91–96, so judge it on the median).

The cause is LCP (~3.4s) under Lighthouse's *simulated* slow-4G model. The LCP element is the hero intro paragraph — **TTFB 454ms, load delay 0, load time 0, render delay ~3.0s**. It is a text element with no blocking resource — the estimate is driven by the React 19 + Next 16 runtime (~206kB of JS, a framework floor) plus document size. Unaffected by font strategy: variable faces and explicit weights produce identical scores.

Measured again once the homepage photography landed: it cost three points, the honest price of real images. Two hypotheses were tested against the hero redesign and **both were wrong** — worth recording so they are not retried:

- *The hero fade gates the LCP text.* Removing it entirely moved the median not at all (91 vs 92).
- *The carousel image is the LCP.* It is not; the LCP is a paragraph, and the carousel is below the fold on a phone.

What remains is the document + CSS + JS transfer cost under simulated throttling, which is the framework floor. `next/image` already serves the LCP tile at ~360px on a phone, so the delivered bytes are right-sized. The remaining pages will shift again as their images go in.

Levers already taken: SVG-pattern mural, `<use>`-referenced motif defs, lazy menu, static bands off-home, Libre Franklin 700 dropped, Special Elite de-preloaded, only the first mosaic tile marked `priority`. Remaining options all trade something real — `display: "optional"` on the body font would likely clear the bar but risks shipping the fallback face on slow connections.

### 0.13 Open questions with the client

- **"Stay Informed" has no destination.** Two registration forms exist (Pre-Festival Activations, Festival Week) and neither is labelled "Stay Informed."
- **A number contradicts itself in the client's own copy.** Home says "150+ Experiences"; the Press FAQ says "over 50 events." Not ours to rewrite — flagged for the client.
- **Photography has not been supplied.** The PDF's closing note says "Pictures — Added to the drive," but no drive was shared.
- **§10's placeholder note is stale.** It says Mehr Lungani and Chitra Kalyani are "Bio to follow," but the PDF carries a full bio for Mehr and a short one for Chitra. Use what is written; invent nothing.

---

## 1. Project snapshot

- **Client:** Delhi Arts & Health Festival (DAHF)
- **Festival dates:** 2–6 December 2026
- **Tagline:** Reimagining Delhi as the Capital of Care
- **Site goal:** Introduce the festival, capture audience registrations, communicate programme depth, showcase the team and partners, invite involvement.
- **Audience:** Mixed — artists, healthcare practitioners, researchers, cultural workers, policymakers, funders, and interested public. The site must feel legible to a doctor and beautiful to a curator at the same time.

---

## 2. Design philosophy

### The direction, in one line
Contemporary editorial layered with Indian folk-art / block-print sensibility — a festival zine, not a wellness app.

### Why this direction
The brand refuses two obvious defaults:

- **Not clinical wellness minimalism** (soft pastels, thin sans-serif, calming space). The DAHF palette is saturated and joyful.
- **Not sanitised art-gallery minimalism** (all-black, ultra-thin serif, empty white space). The DAHF mural is warm and handmade.

The mural pattern, the Antonio-style condensed display type, and the vibrant Venn logo all point toward something warmer and specifically Indian: contemporary editorial layered with folk-art / block-print traditions.

### Design principles
1. **Warmth over slickness.** Every choice should feel handmade before it feels engineered.
2. **Color is content.** Sections use full-bleed color blocks to signal shifts in mood and topic — the site is a festival, not a monotone.
3. **Typography is the loudest voice.** Big, confident Antonio headlines carry the personality of the page.
4. **Mural motifs are structural, not decorative.** Use them as section markers, page dividers, and specific moments of joy — never sprinkled across every card.
5. **Restraint everywhere except the one place we chose to be bold.** The hero DELHI wordmark is the memorable moment. Everything else supports it.

### What to explicitly avoid
These are AI-designer defaults that will make the site look like every other generated page. Do not use them here:

- Cream background + terracotta accent + serif display (the current AI-designer cliché)
- Every section wrapped in a rounded card with the same soft shadow
- ALL-CAPS eyebrow labels above every heading
- `→` appended to every button or link
- `01 / 02 / 03` numbered markers where the content is not actually a sequence
- Middle-dot meta strings (`Date · Location · Type`)
- Fade-and-slide-up on every section as it enters the viewport
- Gradient washes used as decoration
- Same border-radius on every element regardless of hierarchy
- Tinted near-black (`#0B0B0B`, `#111`) standing in for black — this brand's black is `#000000`

---

## 3. Brand tokens

### 3.1 Color system

Every color used in the site must be a token from this list. Do not invent hex values.

```css
:root {
  /* Primary — from brand press kit */
  --teal:     #09A794;
  --navy:     #000066;
  --pink:     #ED2B75;

  /* Secondary — from brand press kit */
  --red:      #ED3237;
  --yellow:   #EDBF09;
  --purple:   #804388;
  --lime:     #C1FF72;

  /* Neutrals — from brand press kit */
  --white:    #FFFFFF;
  --black:    #000000;
  --maroon:   #7F3653;
  --slate:    #4C8E9A;

  /* Extended — derived, use sparingly */
  --cream:    #F2E7DA;   /* primary background canvas */
  --cream-2:  #EAE0D0;   /* alternate warm surface */
  --ink:      #1A1A1A;   /* body text on cream */

  /* Mural-only — see §0.3 */
  --mural-blue:  #626DD9;
  --mural-green: #0D422E;
  --mural-cream: #FDE4BA;
}
```

**Section-color logic for the homepage (rough map — refine as you build):**
- Hero → cream with full-palette accents
- What is Arts & Health → cream
- Why Delhi → navy background, cream text
- Festival at a Glance → teal background
- Experience Pathways → pink / yellow / red / lime / purple blocks (one per pathway)
- Thematic Areas → cream + navy tags
- Final CTA → pink background

Never place body text on the raw brand colors without checking contrast. Where a color background is used, adjust the text to `--cream` or `--white` and verify WCAG AA at minimum.

### 3.2 Typography

Load from Google Fonts:
- **Antonio** — weights 400, 600, 700 — display and headlines. Condensed, tall; echoes the DELHI wordmark in the logo.
- **Libre Franklin** — weights 400, 500, 700 — body copy, UI, labels.
- **Special Elite** — weight 400 — typewriter accent for dates, small metadata, and specific poster moments. Use sparingly. This is the modern substitute for the "True Typewriter" listing in the brand assets.

**Type scale — fluid, `clamp()`-based:**

```css
--f-display: clamp(4rem, 12vw, 12rem);        /* hero DELHI moment */
--f-h1:      clamp(2.5rem, 6vw, 5rem);        /* page headlines */
--f-h2:      clamp(2rem, 4vw, 3.5rem);        /* section headlines */
--f-h3:      clamp(1.5rem, 2.5vw, 2rem);      /* subsections */
--f-lead:    clamp(1.25rem, 1.6vw, 1.5rem);   /* intro paragraphs */
--f-body:    1.0625rem;                       /* body */
--f-small:   0.875rem;                        /* small */
--f-mono:    0.8125rem;                       /* Special Elite metadata */
```

**Reading rules:**
- Cap body line length at ~65ch.
- Libre Franklin body copy: line-height 1.6.
- Antonio headlines: line-height 0.95 for display sizes, 1.05 for h2/h3.
- Don't italicise or bold a single word in a headline for emphasis — that's a generic tell.

### 3.3 Visual language — the mural

**See §0.3 for corrected motif descriptions.** The brand mural is a repeating strip of four folk-art motifs: daisy, wavy staircase, eight-pointed star, kalash / goblet.

**Rebuild these as SVG.** Do not use raster images from the PDF. They should be crisp at any size and tintable via CSS if we later want variations.

**Where to use the mural strip:**
- As a horizontal band separating major sections on the homepage (once or twice at most)
- In the footer as a full-width band
- As part of a color-wipe transition on menu open (optional, advanced)

**Where not to use it:**
- As a repeating background pattern behind text (too busy)
- Inside every section (loses its punch)

### 3.4 Logo

**See §0.2 for the corrected colour map — it supersedes this section's description.**

The logo is three overlapping circles in a Venn arrangement, with the DELHI wordmark below and "Arts & Health Festival" under that. The `H` in DELHI is stylised as an arched doorway echoing India Gate.

**Rebuild the entire lockup in SVG.** Both positive (cream / white background) and negative (teal background) variants exist.

---

## 4. Animation & interaction principles

Animations should feel handmade and celebratory, not slick and corporate. Every animation must earn its place. Motion is expensive attention — spend it where the brand is loudest, not on every element.

### The animations we specifically want

**Hero moment — page load, once:**
- The three brand circles enter from off-canvas and settle into the Venn arrangement with a slight overshoot bounce (~700ms).
- The DELHI wordmark builds letter-by-letter (~500ms total) using a "cut-in" or "stamp-in" effect — think block-printing hitting paper — not a fade. Letters land with a subtle jitter to feel handmade.
- Subheading and dates fade in only after the wordmark completes.

**Marquee band (homepage):**
- Continuous horizontal scroll of festival themes: `creativity · care · community · healing · movement · story · celebration · practice · belonging · joy`. (Use middle dots *here* — it's a marquee, sequence is meaningful.)
- Slow, hypnotic, never stopping. Pauses on hover.
- Direction: right-to-left.

**Five-day journey — Programme page:**
- Each day name (Pehchaan, Bayaan, Armaan, Karwaan, Muskaan) stamps in letter-by-letter as it scrolls into view — same block-print stamp as the hero DELHI.
- Each day sits on a different full-viewport color block. Transitions between days feel like turning pages.

**Section separators (homepage):**
- The mural strip scrolls horizontally as the page scrolls vertically (parallax at ~0.3 rate). Creates a subtle "conveyor belt of joy" between sections.

**Menu:**
- Full-screen overlay in navy or pink. Giant Antonio nav items, one per line, each in a slightly different color from the palette.
- Opens with a color-block wipe (from the menu-icon corner outward) — not a fade.
- Nav items reveal in staggered order (~80ms between each).

**Stats section (Festival at a Glance):**
- Numbers count up when scrolled into view. Once per session, not every visit.
- The `+` symbol on `150+` etc. appears after the number finishes counting — a small punctuation.

**Cursor accent (desktop only, optional):**
- A small colored dot follows the cursor with slight lag. Its color shifts to match the current section's dominant color. Subtle enough that most users won't consciously notice.

### The animations we explicitly do not want

- Fade-and-slide-up on every card or every section as it enters the viewport (this is the single strongest AI-designer tell)
- Hover-tilt-and-shadow on every card
- Parallax on hero images
- Gradient sweeps
- Bouncing arrows to indicate "scroll for more"
- Typewriter effect on body copy (only on the specific stamp-in moments above)

### Motion accessibility

- Honor `prefers-reduced-motion: reduce`:
  - Hero circles and DELHI wordmark appear in their final state instantly
  - Marquee stops (or crawls very slowly, ~60s per loop)
  - Day-name stamp-in replaced with instant appearance
  - Parallax disabled
  - Menu wipe replaced with a fast fade
  - Counters show final numbers immediately

---

## 5. Tech stack

**See §0.1 — it supersedes the versions below.** Next 16 / React 19 / Tailwind v4 / motion / lenis / next/font. Deploy: Vercel.

### 5.1 Tailwind is configured, not defaulted

**Tailwind's default palette is one of the strongest AI-designer tells** — `bg-slate-800`, `text-gray-500`, `bg-neutral-100`. It must not appear in this codebase.

Under Tailwind v4 this is enforced in [app/globals.css](app/globals.css) via `@theme { --color-*: initial; ... }`. Verified: default palette classes emit no CSS.

**Rules for using Tailwind on this project:**

- **Never** use a default Tailwind color name (`slate`, `gray`, `zinc`, `neutral`, `stone`, `emerald`, `sky`, etc.). They will not resolve.
- **Never** use an arbitrary color value in JSX (`bg-[#333]`, `text-[#f4f4f4]`). Every color goes through the theme.
- **Do** use the fluid text tokens (`text-display`, `text-h1`, `text-lead`) instead of `text-6xl` etc. — the fluid scale is part of the design.
- **Do** use `space-x` and `space-y` classes freely; use `py-section-y` / `px-section-x` for section rhythm.
- Prefer semantic class ordering: layout → box → typography → color → state.
- **No `@apply` for anything reused more than twice** — that's what components are for. `@apply` is fine inside the base layer for element resets.

### 5.2 Fonts via next/font

Antonio (400/600/700), Libre Franklin (400/500/700), Special Elite (400), wired as `--font-antonio`, `--font-libre-franklin`, `--font-special-elite` on `<html>` in [app/layout.tsx](app/layout.tsx). Tailwind's `font-display`, `font-body`, `font-mono` pick them up.

### 5.3 Motion — usage rules

- Import from `motion/react` only inside client components (`'use client'`).
- Keep animation logic co-located with the component using it — no global "animations" file.
- Use `useReducedMotion()` at the top of every animated component and short-circuit to a static state when true. **This is not optional.**
- The hero circles, DELHI stamp-in, day-name stamps, marquee, mural parallax, and menu wipe are the *only* motion moments in the codebase. If you find yourself adding a `<motion.div>` for a section entrance, delete it.

### 5.4 Lenis setup

- Wrap the app in a client-only `<SmoothScroll>` that initialises Lenis in `useEffect`.
- Sync Lenis with motion's `useScroll` where parallax is needed (mural strip).
- Disable Lenis when `prefers-reduced-motion: reduce` is set — fall back to native scroll.

### 5.5 What not to install

- **Heavy UI libraries** (MUI, Chakra, Ant) — they will fight the folk aesthetic.
- **shadcn/ui as-is** — the defaults look like every other current site.
- **Icon libraries** (Lucide, Heroicons, Feather, Tabler) — build custom SVGs.
- **`@tailwindcss/typography`** — the type scale is already defined; `prose` will override it with the wrong values.
- **CSS-in-JS runtimes** (styled-components, emotion) — Tailwind is the styling layer.

### 5.6 Project structure

```
app/
  layout.tsx              // fonts, <SmoothScroll>, <SiteHeader>, <SiteFooter>
  page.tsx                // homepage
  about/page.tsx
  programme/page.tsx
  team/page.tsx
  get-involved/page.tsx
  press/page.tsx
  contact/page.tsx
  globals.css             // Tailwind import + @theme + tiny base resets
components/
  site-header.tsx         // client — scroll state
  mobile-menu.tsx         // client
  site-footer.tsx
  smooth-scroll.tsx       // client — Lenis wrapper
  marquee.tsx             // client
  mural-band.tsx          // client — scroll parallax
  motif.tsx               // variant: daisy | stairs | star | kalash
  color-section.tsx
  stat-block.tsx          // client — count-up
  pathway-card.tsx
  theme-chip.tsx
  person-card.tsx
  cta-button.tsx
  logo.tsx                // the Venn + DELHI wordmark, SVG
  hero.tsx                // client — load animation
lib/
  content.ts              // typed content constants from PDF copy
```

---

## 6. Site architecture

```
/                → Home
/about           → About DAHF
/programme       → Programme (five-day journey)
/festival-team   → Festival Leadership + committees + Consultants (split out of the old /team)
/advisory-board  → Advisory Board (own page; /team redirects to /festival-team)
/get-involved    → Volunteer, Partner, Bring your practice
/press           → Press & Media
/contact         → Contact
```

Global elements:
- **Header:** logo left, nav center or right, "Stay Informed" primary CTA. Cream background; becomes a subtle translucent cream on scroll. Height ~72px desktop, ~64px mobile.
- **Footer:** full-width mural band above; then contact emails grouped by purpose, social links, small copyright line.
- **Marquee band:** on Home only.

---

## 7. Component inventory

Server components by default. `'use client'` only where marked in §5.6.

`SiteHeader`, `MobileMenu`, `SiteFooter`, `SmoothScroll`, `Hero`, `Marquee`, `MuralBand`, `Motif`, `Logo`, `ColorSection`, `StatBlock`, `PathwayCard`, `ThemeChip`, `PersonCard`, `CTAButton` (variants: `primary` pink fill / cream text, `secondary` navy outline / navy text).

---

## 8. Page-by-page notes

### Home
Highest visual density. Establishes the design system every other page inherits. Order:

1. Hero — monumental DELHI wordmark, dates, subheading, two CTAs (**see §0.4** — plus an empty photo band beneath)
2. Marquee band
3. Intro paragraph — "The Delhi Arts & Health Festival (DAHF) is a city-wide initiative..."
4. Global ecosystem paragraph — GSAH / GAIMF connection, other festivals
5. What is Arts & Health — one full paragraph, editorial two-column
6. Why Arts, Health & Community — three columns (Creativity / Care / Community), each with its own color accent
7. Why Delhi — four pillars in an editorial layout (not a 4-up card grid)
8. Mural band separator
9. Festival at a Glance — 5 large stats on teal background
10. Experience Pathways — 5 color blocks stacked, one per pathway
11. Thematic Areas — 11 chips on cream
12. Final CTA — pink background, big Antonio type: "Help Shape Delhi's First Arts & Health Festival"
13. Footer

### About
More text-forward, editorial. Long-form.
- Opening question ("What would it look like if we placed care at the centre of city life?") as a full-width poster moment.
- The reflective paragraph that follows set at a wider column with generous leading.
- Vision and Mission as two adjacent color blocks (teal / navy).
- Why Now with the three research callouts (900+ studies, Social prescribing, India's NHP 2017) styled as pull-quotes.
- GSAH section as an inset framed box.
- "What we hope to achieve" as an editorial list, not bullets — each item with a small display number and a paragraph.

### Programme
- Each day gets a full-viewport section with a dominant color: Pehchaan (navy), Bayaan (pink), Armaan (purple), Karwaan (teal), Muskaan (yellow).
- Day name huge in Antonio, English translation below in Special Elite, description in Libre Franklin.
- "Ways to experience the festival" (Reflect / Immerse / Discover / Energise / Refresh) as a horizontal band below the days.
- "What the festival explores" as a compact chip grid.
- "How the programme unfolds" timeline at the bottom — horizontal, not a vertical checklist.

### Team
- Festival Leadership (Kunle Adewale, Anvesha Vijay, Pragyan Behera, Jyotsna Ramachandran) as full editorial cards with generous space for their bios.
- Committee heads and Shilka Agarwal as a compact 2-up or 3-up grid.
- Advisory Board with a thematic tag ("Creative Arts Therapies", "Public Art", "Legal & Policy") prominent alongside the name.
- Consultants as an inset section at the bottom with a different background color (cream-2 or slate).

### Get Involved
Three full color blocks stacked: Join the team (pink), Partner with us (teal), Bring your practice (yellow). Each with a paragraph and a large CTA button.

### Press
About the festival intro; Quick facts inline (not a card grid); Press FAQs as an accordion (questions in Antonio, answers in Libre Franklin); Media resources block with contact; social follow strip.

### Contact
Each contact email as a large Antonio email address with its role as a Special Elite label above it. Social links below.

---

## 9. Quality bar — definition of done

- [ ] Lighthouse: 95+ on Performance, Accessibility, Best Practices, SEO across all pages (mobile and desktop)
- [ ] Works cleanly from 375px up to 4K
- [ ] All animations respect `prefers-reduced-motion: reduce` via `useReducedMotion()`
- [ ] Fully keyboard-navigable with visible custom focus states (never the browser default outline)
- [ ] Color contrast passes WCAG AA everywhere text sits on colored backgrounds
- [ ] No CLS from font loading
- [ ] Client JS on any page under 150kb
- [ ] Server components wherever possible; `'use client'` is a deliberate choice
- [ ] Next.js `metadata` API on every page for title, description, OG image, Twitter card
- [ ] OG image uses the DELHI wordmark on cream
- [ ] Every external link opens in a new tab with `rel="noopener noreferrer"`
- [ ] Every `<Image />` has meaningful alt text (never the filename)
- [ ] `npm run build` completes with zero warnings
- [ ] TypeScript strict mode on, no `any` in committed code
- [ ] Site is readable with JavaScript disabled — animations degrade to static end states

---

## 10. Content handoff

All copy lives in `../Info and Assets/Website content for DAHF.pdf`.

**Do not rewrite the copy.** The client has written it carefully — the voice matters. Small typography-driven edits (line breaks for rhythm, choosing what to bold) are welcome; wording changes are not.

**Non-negotiable content:**
- The five-day names (Pehchaan, Bayaan, Armaan, Karwaan, Muskaan) with their English translations, exactly as given.
- Every person's name, role, pronouns, and bio, exactly as written.
- All email addresses and Google Form links.

See **§0.9** for open content questions with the client.
