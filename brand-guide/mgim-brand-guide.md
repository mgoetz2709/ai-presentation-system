# Markus Goetz Interim Management — Corporate Identity Guide (v1.0, Mai 2026)

This file is the **single source of truth** for MGIM's design standard. Every phase of the
presentation pipeline (Design, Quality, and beyond) reads this file directly — nobody inlines a
copy of it into a phase's own instructions. If the CI changes, it changes here, once.

## Brand Essence

> "Ich übernehme Verantwortung dort, wo es darauf ankommt — und liefere."
> Operative Exzellenz. Keine leeren Versprechen. Echte Ergebnisse.

## Color System

| Token | Hex | Usage |
|---|---|---|
| `grey` (MG Grey) | `6D6E71` | Headlines, structure, logo — always present |
| `blue` (MG Blue) | `3A9AC9` | Accent, CTAs, dividers, key data — always present, never dominant |
| `black` (Near Black) | `231F20` | Body text, wordmark |
| `white` (White) | `FFFFFF` | Background, negative space |
| `ltgrey` (Light Grey) | `E8E8E9` | Backgrounds, table rows, dividers — **never text, never a pie/donut segment** (fails WCAG AA against white) |
| `midgrey` (Mid Grey) | `A8A9AD` | Subheadings, captions, secondary text, footer |
| `deepbl` (Deep Blue) | `1F6A9A` | Dark MG Blue variant, hover states, depth |
| `offwht` (Off White) | `F5F5F5` | Slide and document backgrounds |

**Color rules (non-negotiable):**
- MG Grey and MG Blue must both appear on every branded slide.
- MG Blue is accent only — never dominant in a layout.
- Maximum 3 palette colors per single layout element.
- No gradients, ever, without explicit approval from Markus Goetz.
- No colors outside this palette — ever.
- WCAG AA contrast compliance for every text-on-background combination.

## Typography

- **Primary (Headlines):** Barlow Bold / SemiBold — fallback Arial Bold / Helvetica Neue Bold.
- **Secondary (Body & UI):** Inter Regular / Bold — fallback Arial / Calibri.
- Maximum 2 typefaces per document.
- Body text always left-aligned — never centered.
- Letter spacing +0.02em for all-caps labels and subheadings.

| Element | Size | Weight | Line-height | Color |
|---|---|---|---|---|
| H1 | 32–40px | Bold | 1.2× | `grey` |
| H2 | 24–28px | SemiBold | 1.2× | `black` |
| H3 | 18–20px | SemiBold | 1.3× | `grey` |
| Body | 15–16px | Regular | 1.5× | `black` |
| Caption | 12–13px | Regular | 1.4× | `midgrey` |
| CTA / Highlight | 15–16px | Bold | 1.5× | `blue` |
| Label / Tag | 11–12px | SemiBold | 1.2× | `midgrey` |

## Logo & Signature Element

The diagonal blue slash (`/`) from the logo is the central signature element. Use it sparingly
as a divider, bullet accent, or decorative element in headers and slide titles — never overload
a slide with it.

## Design Principles

- Structure before decoration — grid-based, clear layouts; white space is a design tool.
- Grey anchors, Blue activates — grey provides the structural base, blue directs attention to
  the one key element per slide.
- No visual noise — no drop shadows, clip art, stock-photo clichés.
- Photography: professional, architectural, or executive in nature; no staged stock images.

## Presentation-Specific Rules (PPTX)

- Slide background: White `FFFFFF` or Off White `F5F5F5`.
- Title slide: MG Grey dominant, MG Blue accent on the key word or the slash element.
- Maximum 6 text lines per content slide — no exceptions. If content needs more, it is two
  slides, not one.
- Data slides: MG Blue for the key data point, all supporting data in grey.
- Slide footer on every slide: `Markus Goetz Interim Management | www.markusgoetz.com`,
  Mid Grey, 9pt, left-aligned.
- No animations, unless explicitly requested by Markus Goetz.

## Tone of Voice

- Active, confident language — no passive voice without reason.
- Concrete numbers and results wherever possible.
- No buzzwords without substance.
- Short sentences — concise over elaborate.
- German: formal "Sie" in client-facing materials.
- Guiding question for every piece of communication: *"Klingt das nach einem erfahrenen
  Interim Manager — oder nach einem Chatbot?"*

## Deliberate deviation from the generic `pptx` skill defaults

Claude Code's built-in `pptx` skill (`/mnt/skills/public/pptx/SKILL.md`) advises **against**
decorative color bars, header/footer stripes, and single-side accent borders — its house style
treats those as a tell of generic AI-generated decks. **For MGIM's CI, that generic advice is
overridden on purpose.** The top blue bar, the left blue bar on title/closing slides, and the
blue accent bar beside insight boxes are a *deliberate, specified brand element* (the "slash /
signature system"), not accidental filler. Use them exactly as specified in this guide. Do not "fix" this by removing the bars — that would be undoing an explicit
client CI decision. Everything else in the generic skill's Design Ideas / Avoid list (no
gradients, no cream backgrounds, safe fonts, spacing discipline, QA process) still applies and
reinforces this guide.

## Color Token Reference (for implementers)

```
const C = {
  grey:    '6D6E71',
  blue:    '3A9AC9',
  black:   '231F20',
  white:   'FFFFFF',
  ltgrey:  'E8E8E9',
  midgrey: 'A8A9AD',
  deepbl:  '1F6A9A',
  offwht:  'F5F5F5',
};
```

Never define these tokens again elsewhere. `lib/pptx-helpers.js` and `lib/chart_style.py`
import/require their values from here conceptually — keep any literal copies in those files in
sync with this table if the CI ever changes.
