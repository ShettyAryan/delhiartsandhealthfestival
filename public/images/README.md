# Images

## Status

**Homepage: done.** All 16 slots carry real photographs.
**About: done**, at 6 slots — up from the 1 originally scoped, borrowing the
homepage's approach of drawing on the same supplied set rather than waiting on
new photography.
**Programme: hero only**, 1 of 6 slots (the 5 per-day images are still
placeholders).
**Team: headshots done**, 16 of 21 people. Five still have no photo and fall
back to a monogram: Kunle Adewale, Prashant Das, Mehr Lungani, Chitra
Kalyani, Muskan — the same five named in "Still outstanding" below.
**Press: done**, 4 slots (hero + the 3-thumbnail media gallery).
**Contact: done**, 1 slot (hero) — this page had no photography or murals of
any kind before.
**Other pages: not yet wired** — Get Involved (3).

Originals live in `assets-source/home/` at the repo root — outside `public/`, so
they are preserved but never deployed. Nothing was deleted. 32 were supplied in
total; 16 went into the homepage mapping below. Of the remaining 16, 6 went to
About, 1 to Programme's hero, and 5 to Press/Contact — 4 are still sitting
there unused.

## What was done to the files

The 32 supplied files were normalised into the 16 the homepage uses:

- **EXIF rotation baked in.** Four files (`home5`, `home16`, `home17`, `home18`)
  carried an orientation flag. Browsers honour it; `sharp` does not always
  honour it when resizing, so those would have shipped sideways.
- **Capped at 2800px on the long edge, re-encoded at q82 progressive.** The
  largest display use is ~1312 CSS px, so 2800 is still 2× headroom at retina.
  One source was 8000×6000 / 16 MB.
- **Renamed** to lowercase slot names. The originals mixed `.JPG` / `.JPEG` /
  `.jpeg` / `.jpg` — Vercel's filesystem is case-sensitive and Windows is not,
  so a wrong-case path works locally and 404s in production. One file was also
  named `home20 (2).jpg`; spaces and parentheses in URLs are avoidable risk.

**88 MB → 7.9 MB**, with no visible quality loss.

## Homepage mapping

| Slot | File | Original | Photograph |
|---|---|---|---|
| Mosaic 1 | `hero-01-movement.jpg` | home2 | Group dancing, arms raised, string lights |
| Mosaic 2 | `hero-02-leaf-printing.jpg` | home28 | Children painting leaf prints on clay discs |
| Mosaic 3 | `hero-03-puppet.jpg` | home24 | Rooster puppet and paper sun on stage |
| Mosaic 4 | `hero-04-nature-elders.jpg` | home5 | Older hands printing with leaves and shells |
| Mosaic 5 | `hero-05-community-mural.jpg` | home18mural | Painting the mandala mural board |
| Mosaic 6 | `hero-06-classroom.jpg` | home6 | Children holding up their sketchbooks |
| Mosaic 7 | `hero-07-drawing.jpg` | home12 | A young participant absorbed in drawing |
| Mosaic 8 | `hero-08-group.jpg` | home4 | Large group at the close of a workshop |
| Reflect | `pathway-reflect.jpg` | home23 | Seated circle in the studio |
| Immerse | `pathway-immerse.jpg` | home14 | Hands finger-painting, paper-plate palette |
| Discover | `pathway-discover.jpg` | homemural19 | Street-art mural on a Delhi building |
| Energise | `pathway-energise.jpg` | home29 | Theatre ensemble mid-scene |
| Refresh | `pathway-refresh.jpg` | home16 | Candle beside a watercolour |
| What is Arts & Health | `arts-health-table.jpg` | home26 | Art table with henna-hand paintings |
| Why Delhi | `why-delhi.jpg` | home20 (2) | Participants with drawings at Lodhi Garden |
| Final CTA | `cta-hands.jpg` | home25 | Circle of joined hands |

Alt text is written **from the photograph in the slot**, not from the brief.
If you swap a file, update the `alt` in `lib/content.ts` to match.

## About mapping

Normalised the same way as the homepage set (EXIF baked in, capped at 2800px,
re-encoded, lowercase names) — `about-vision-2026.jpg`'s original carried an
orientation flag and would have shipped sideways otherwise.

| Slot | File | Original | Photograph |
|---|---|---|---|
| Opening question, hero-style | `about-hero-dance.jpg` | home13 | B&W studio silhouette, dancer with sheer fabric overhead |
| Reflective passage close | `about-workshop.jpg` | home3 | Adults seated on a studio floor, making art together |
| Beside "Our Vision" | `about-vision-2026.jpg` | home18 | A participant's own "Vision 2026" collage, held up at Lodhi Garden |
| Beside "Global momentum" (Why Now) | `about-body-map.jpg` | home15 | A body outline filled with hand-written words, from an arts-therapy session |
| Why Now, below the paragraphs (1 of 2) | `about-whynow-community.jpg` | home9 | Schoolchildren gathered around a large collaborative drawing |
| Why Now, below the paragraphs (2 of 2) | `about-whynow-unity.jpg` | home20 | A group reaching their hands up together outdoors |

The last two sit bottom-aligned with the body-map image beside them, filling
what was empty space under the (shorter) paragraph text in that column.

The vision-board and body-map photos were picked over the generic workshop
shots in the same batch because they say something specific rather than
just "people at an event" — one names itself "Vision 2026," the other is a
literal picture of creativity-as-health-practice, which is Why Now's whole
argument.

## Programme mapping

| Slot | File | Original | Photograph |
|---|---|---|---|
| Hero, top of page | `programme-hero.jpg` | home19 | Art supplies, a small drum, and cups spread across a workshop table |

The source was a very tall 2268×4032 phone shot (0.56:1) going into a 4:5
`portrait` slot — a real crop, not a near-miss like most of the other slots.
`object-cover` centres it, trimming roughly the top and bottom quarters and
keeping the table itself, which is where all the content is.

## Press mapping

| Slot | File | Original | Photograph |
|---|---|---|---|
| Hero, top of page | `press-hero.jpg` | home7 | Performers linking hands mid-scene on a rooftop stage |
| Media gallery (1 of 3) | `press-media-1.jpg` | home1 (top third) | Participants reaching toward each other in a movement workshop |
| Media gallery (2 of 3) | `press-media-2.jpg` | home22 | Participants tossing balloons in a bright studio room |
| Media gallery (3 of 3) | `press-media-3.jpg` | home27 | A facilitator engaging costumed children in a colourful room |

`home1` was itself a vertical triptych — three stacked photos in one file, a
contact-sheet-style composite, not one image. Rather than treat that as
unusable, the top third was cropped out as its own standalone photo; the
other two thirds are still sitting in `assets-source/home/` if a future slot
wants them.

`home21` was the obvious first choice for the media gallery — it's the same
rooftop scene as `press-hero.jpg`, one beat later — but using it right next
to the hero would have read as the same photo twice. Skipped in favour of
the `home1` crop instead.

The original `PRESS_IMAGES` alt text described an exhibition and a public
performance; the photos that actually exist in the supplied set are neither.
Rewritten to match what's really there, per the rule at the top of this file.

## Contact mapping

| Slot | File | Original | Photograph |
|---|---|---|---|
| Hero, top of page | `contact-hero.jpg` | home8 | Participants tossing coloured balloons together in a dance studio |

This page had zero photography and zero murals before — just a heading, the
email list, and a social strip. Picked for warmth over documentary value:
Contact is the one page whose job is to feel human and easy to write to,
not to show festival programming.

## Team mapping (public/images/team/)

The 17 supplied files were 40 MB of PNG, one JPG, named after first names
only, with three carrying an "(Advisory Board)" suffix. Normalised the same
way as every other batch (EXIF baked in — `Dr. Vipul (Advisory Board).JPG`
carried a rotation flag — capped at 1600px since a headshot never renders
larger than a few hundred px, re-encoded, renamed to `firstname-lastname.jpg`
matching each person's `Person.name` in `lib/content.ts`) and set as `photo`
on the matching entry in `LEADERSHIP`, `COMMITTEE`, `ADVISORY_BOARD`, or
`CONSULTANTS`. **40 MB → 2.6 MB.**

Originals archived to `assets-source/team/` under their original filenames —
same preserve-outside-public/ pattern as `assets-source/home/`.

`Nidhi.png` is left as-is in `public/images/team/`, untouched and unwired: no
one named Nidhi appears anywhere in the content PDF's team roster, so there's
no `Person` entry to point it at. Worth asking the client who this is before
either wiring it to someone or deleting it — see also "Still outstanding"
below, which already flagged this file before headshots were normalised.

## Adding or swapping an image

1. Put the file in this folder.
2. Set `src` on the matching slot in `lib/content.ts` and check the `alt`.

`resolveSrc()` in `components/figure.tsx` checks the file exists at build time —
a missing file falls back to the motif placeholder rather than shipping a broken
image, so a typo degrades gracefully instead of going live. Team headshots are
the one exception: `<Portrait>` now renders inside the team page's card/modal
client components (CLAUDE.md's card-based redesign), and `resolveSrc`'s
`node:fs` check cannot be bundled for the browser at all — see the comment in
`components/portrait.tsx`. Its `src` is trusted directly instead, which is
safe exactly because `lib/content.ts` only ever sets a `photo` path once the
file is actually sitting in this folder.

## Still outstanding

- **No hospital / clinical arts photograph.** The content PDF names it as one of
  the eight hero subjects, and "Arts in Healthcare" is one of the eleven
  thematic areas — but nothing in the set shows arts inside a care setting.
  Slot 7 uses a portrait of someone drawing in its place. Worth requesting.
- **Five people still have no headshot:** Kunle Adewale, Prashant Das, Mehr
  Lungani, Chitra Kalyani, Muskan — none were among the 17 files supplied.
  They fall back to the initials monogram <Portrait> already draws for
  anyone without a photo.

## Performance

Homepage mobile Lighthouse moved 95 → **92** when the real photographs went in;
desktop stays **100**. Accessibility, best practices and SEO are **100** on both.

The LCP element is now the first mosaic tile, which sits at y=602 in an 823px
mobile viewport — genuinely above the fold, so it keeps `priority` and loads
eagerly. The other seven lazy-load. `next/image` serves it at ~360px on a phone,
so the delivered bytes are already right-sized; the remaining cost is real image
weight, not a code defect.
