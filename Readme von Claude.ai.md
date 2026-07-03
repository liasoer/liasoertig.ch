# Lias Oertig — Design System

Lias Oertig is a photographer and videographer. The brand is clean and minimalist with a
playful edge — expressed through a bold geometric logomark, warm natural-light imagery, and
one confident accent color against black-and-white type.

**Sources provided for this system:** three logo exports uploaded directly to this project —
`Logo & Name Black.png` (full lockup), `Logo Black.png` (mark only, black), `Logo White.png`
(mark only, white) — see `assets/logo/`. No codebase, Figma file, brand guideline doc, or
existing product screens were provided. Everything else in this system (colors, type, spacing,
components, and the portfolio-website UI kit) was designed from scratch to fit the brand
description and the logo's visual language, then confirmed against the user's answers on
palette, typography, imagery and tone (see below).

## Products

One product surface was scoped for this pass:

- **Portfolio website** — the photographer's public site: homepage, work gallery (filterable),
  a project detail page, and a contact/booking form. See `ui_kits/portfolio-website/`.

Other surfaces (e.g. a private client gallery delivery page, Instagram templates) were discussed
but not built yet — see the closing note in chat for what to add next.

## Content fundamentals

Tone is **warm and personal, first-person** — Lias speaking directly to the visitor ("I shoot…",
"Hi, I'm Lias…"), not a studio or agency voice. Copy is short and conversational, never
corporate. Sentence case throughout (no ALL CAPS body copy); uppercase is reserved for small
tracked-out labels (eyebrows, tags) as a typographic accent, not a shouting device.

Examples used in this system:
- Hero: *"I photograph people the way I like to remember them."*
- Body: *"Hi, I'm Lias — a photographer and videographer based in Zürich. I shoot weddings,
  portraits and brand film with warm light and a little bit of play."*
- CTA labels: *"Book a session"*, *"See the work"* — verbs, not nouns ("Book", not "Bookings").
- Form copy: *"Let's talk about your day."* — invitational, not transactional ("Submit a request").

No emoji in UI copy — playfulness comes from motion and the accent color, not emoji or
exclamation-heavy writing. Avoid photography clichés and superlative marketing language
("award-winning", "best-in-class") — the brand undersells rather than oversells.

## Visual foundations

- **Color:** near-black ink (`--ink-900`) and warm paper white (`--paper-50`) carry ~95% of the
  UI. One bold accent — flash orange (`--accent-500 #ff5a1f`) — is used sparingly: primary
  buttons, active states, focus rings, and small availability badges. No gradients as brand
  surfaces (gradients only stand in as photo placeholders, see Imagery below).
- **Type:** a bold geometric grotesk for display/headlines paired with a neutral grotesk for
  body copy (see Typography note — both are substitutes, real brand fonts not supplied). All
  display headings are set in caps (`text-transform: uppercase`, `tracking-normal`, near-1.0
  line-height) for a bold, poster-like impact; body copy stays sentence case and loose
  (1.55 line-height) for warmth and readability.
- **Spacing:** 4px base scale (4 → 128). Page sections breathe generously (64–96px vertical
  rhythm); component-internal spacing stays tight (8–16px).
- **Backgrounds:** flat warm paper or solid ink — no textures, no patterns, no decorative
  illustration. Photography itself is the texture. Full-bleed hero photography is expected once
  real images are supplied.
- **Imagery:** warm color, natural available light (golden hour, skin tones, film-like warmth) —
  no desaturated/cool grade, no heavy filter looks. This system uses warm gradient placeholder
  blocks (`PhotoBlock` component) standing in for real photos/video stills — **replace before
  shipping**.
- **Animation:** subtle and fast. 150ms for hover/press feedback, 250–400ms for larger
  transitions. Standard easing (`cubic-bezier(0.4,0,0.2,1)`) for UI, a softer ease-out for
  entrances. No bounce, no spring, no looping decorative motion.
- **Hover states:** color shifts one step darker (accent → accent-hover, ink → ink-700), or a
  card lifts 4px with a growing soft shadow. No opacity-fade hovers.
- **Press states:** scale down to 0.97 plus the darkest tone step (e.g. accent-press). Quick,
  tactile, no color desaturation.
- **Borders:** thin (1–1.5px), low-contrast (`--border-subtle` / `--border-default`), used to
  separate sunken form fields and card outlines — never a heavy or colored border.
- **Shadows:** soft and low-opacity only (`--shadow-sm/md/lg`, black at 6–10% opacity). No inner
  shadows, no colored/glow shadows.
- **Corner radii:** generous and consistent with the rounded-square logomark — 8px small
  controls, 14px inputs, 22px cards, 32px large media blocks, full-pill buttons/tags.
- **Transparency & blur:** used once, intentionally — the sticky header is a translucent
  frosted paper (`rgba(250,249,246,0.88)` + `backdrop-filter: blur(8px)`) so photography can
  scroll underneath it. Not used elsewhere.
- **Cards:** white/paper surface, 22px radius, 1px subtle border, soft shadow; clickable cards
  (`hoverLift`) lift and deepen their shadow on hover rather than changing color.
- **Layout:** centered content column (`--content-max: 1200px`) with fluid outer padding; header
  is sticky, footer is a full-bleed inverse (dark) block to bookend the page.

## Iconography

No icon system, icon font, or SVG set was supplied. This system uses inline SVG matching
**Lucide's** stroke style (2px stroke, rounded caps, 24px grid) as the nearest open, CDN-available
match to the logo's geometric-but-friendly feel — **flagged substitution**. For production, load
Lucide from CDN (`https://unpkg.com/lucide@latest`) or swap in a supplied icon set. Emoji and
unicode glyphs are not used as icons anywhere in this system.

## Typography — flagged substitution

No brand font files were supplied. **Space Grotesk** (display) and **Archivo** (body) were
chosen as the nearest Google Fonts match to the logo's bold geometric letterforms — loaded via
`@import` in `tokens/typography.css`. **Please share the real brand font files (or names) and
we'll swap these in** — the type tokens (`--font-display`, `--font-body`) are the only place
that needs to change.

## Intentional additions

No component source was provided, so this system authors a standard set sized to a photography
portfolio's needs: `Button`, `IconButton`, `Tag`, `Badge`, `Card` (core), `Input`, `Textarea`,
`Select`, `Checkbox` (forms), `Tabs` (navigation). Every one is a deliberate, minimal choice —
nothing speculative like Toast/Dialog/Tooltip was added since the portfolio site doesn't need them.

## Index

```
styles.css                      → root stylesheet (imports only)
tokens/
  colors.css                    → ink/paper neutrals, accent, semantic aliases
  typography.css                → font tokens + type scale (Space Grotesk / Archivo, flagged)
  spacing.css                   → 4px spacing scale + content width
  radius.css                    → corner radius scale
  shadow.css                    → shadows + motion (easing/duration) tokens
assets/logo/                    → lockup-black.png, mark-black.png, mark-white.png
guidelines/                     → foundation specimen cards (Colors, Type, Spacing, Brand)
components/
  core/                         → Button, IconButton, Tag, Badge, Card
  forms/                        → Input, Textarea, Select, Checkbox
  navigation/                   → Tabs
ui_kits/portfolio-website/      → Header, Footer, PhotoBlock, Homepage, Gallery,
                                   ProjectPage, Contact + index.html (click-through demo)
SKILL.md                        → Claude Code / Agent Skills-compatible skill file
```

## Caveats & what to do next

- **No real assets** were provided beyond the three logo files — every photo you see is a warm
  gradient placeholder. This is the single biggest gap: send real photography/video stills and
  we'll drop them in.
- **Fonts are substituted** (Space Grotesk / Archivo). If Lias has real brand fonts, share the
  files and we'll relink the type tokens.
- **Icons are a Lucide-style substitution** — no icon set was supplied.
- Only the portfolio website was built. If there's a client-gallery delivery page, an Instagram
  template set, or a booking-confirmation flow, we can add UI kits for those next.

**Ask:** please review the accent orange, the Space Grotesk/Archivo pairing, and the portfolio
site flow (`ui_kits/portfolio-website/index.html`) — tell us what to push further and we'll
iterate until it feels exactly right.
