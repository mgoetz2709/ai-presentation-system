# Design & Delivery Report — RIEDEL Networks AI Sales Transformation

## Output

- **PPTX:** `output/riedel-sales-ai-transformation/riedel-sales-ai-transformation.pptx`
- **Build script:** `output/riedel-sales-ai-transformation/build/presentation.js`
- **Slide count:** 14 (matches Content Package `slide_id` index exactly — no slides added, split, or dropped in Phase 5)
- **Tone/design variant:** C-Level (formal, executive, pyramidal) — MGIM CI throughout (this is an MGIM-authored client deliverable, not a RIEDEL-branded document)

## Slide type breakdown

| slide_id | Headline (short) | Type |
|---|---|---|
| 1 | Titel: AI Sales Transformation startet | TITLE |
| 2 | Ausgangslage: komplexe Zyklen, kein CRM | STAT |
| 3 | Vier Schmerzpunkte + Forrester-Validierung | CONTENT |
| 4 | Priorisierungs-Matrix (5 Bausteine) | CHART |
| 5 | Lead-Analyse-Pilot (4 Agenten) | PROCESS |
| 6 | Kalkulationen-Abgleich | PROCESS |
| 7 | Listenmanagement | CONTENT |
| 8 | Vertragsmanagement + Bid Management (Phase 2) | COMPARISON |
| 9 | Ausblick Phase 3 | CONTENT |
| 10 | Roadmap mit Entscheidungstoren | TIMELINE |
| 11 | Governance-Grundprinzipien | CONTENT |
| 12 | Rollen & Verantwortlichkeiten | CONTENT |
| 13 | Offene Abhängigkeiten | CONTENT |
| 14 | Nächste Schritte / CEO Ask | CLOSING |

Type distribution: 1 TITLE, 1 CLOSING, 1 CHART, 1 TIMELINE, 1 COMPARISON, 2 PROCESS, 1 STAT,
6 CONTENT. Advanced-visualization requirement met by Slide 4's bubble/scatter chart (qualitative
priority matrix rendered as a two-axis bubble chart with urgency-coded color/size, rather than a
bare bar chart or plain table).

## Chart assets

- `output/riedel-sales-ai-transformation/charts/slide_04_chart.py` →
  `output/riedel-sales-ai-transformation/charts/slide_04_chart.png` (executed, confirmed present).
  Bubble chart of the 5 core use cases plotted by Umsatzwirkung (y) × Umsetzbarkeit (x), bubble
  color/size = Dringlichkeit. Data is the qualitative Hoch/Mittel/Niedrig rating from the
  Priorisierte Use-Case-Matrix (Konzeptdokument Abschnitt 4) — no numeric values were invented;
  two overlapping categories (Lead-Analyse, Kalkulationen both Hoch/Hoch/Hoch) have their labels
  nudged apart purely for legibility, the underlying category is identical and stated as such in
  the script's docstring.
- Slide 10 (Roadmap) uses the pptxgenjs-native TIMELINE layout (line + circle/diamond markers),
  not a matplotlib chart, per the slide-type spec — no separate PNG needed.

## Reused content (client-approved, not redesigned)

Slide 5 (Lead-Analyse) reuses `build/preview-lead-analyse.js` verbatim, including the user's own
direct pptx edits from the earlier standalone round (card titles Ziel/Vorgehen/Entscheidung,
David Hofacker named as Business Owner, exact wording of the Entscheidung bullets). No new design
work was applied to this slide beyond integrating it as slide_id 5 in the master deck.

## CI compliance

- All colors drawn from `lib/pptx-helpers.js`'s `C` token table — no off-palette colors used.
- `addHeaderBar`/`addFooter`/`addCard`/`addAccentBar`/`addSlashDivider`/`addInsightBox`/
  `addIconBlock` used from the shared library; no shared token or primitive redefined inline.
- Chart colors drawn from `lib/chart_style.py`'s `MGIM_COLORS`; `apply_mgim_style()` applied;
  `ltgrey` not used as a plotted data color (bubble fills are `blue`/`midgrey` only).
- Every slide has `addHeaderBar` (or the TITLE/CLOSING grey-background variant), `addFooter`, and
  `slide.addNotes()` with the full spoken narrative from the Content Package.
- Max 5 bullets respected on every bulleted slide (Slide 13 visually groups the sixth
  sub-dependency into the fifth bullet's text, as planned and flagged in the Content Package —
  no information dropped, only grouped for the 5-bullet cap).
- Every slide from 2–13 carries an explicit 9pt Mid Grey "Quelle:" citation to either the
  Konzeptdokument (with section number) or the external Forrester study — added in a second pass
  after the initial build, per Visual Quality Gate criterion 5 (source citations present).

## Warnings / conflicts

None. No content-vs-CI conflicts encountered; no slide required more than the 6-text-line
guidance in a way that forced a content cut. The one deliberate adaptation — Slide 8 relabels the
COMPARISON template's default "Vorher/Nachher" headers to "Vertragsmanagement/Bid Management"
(two Phase-2 bausteine instead of a before/after pair) — preserves the template's visual grammar
(grey/blue headers, divider, two bullet columns) without misrepresenting the content as a
before/after comparison.

## Visual Quality Gate

1. **No plain-text slides** — Pass. Every slide has a designed layout element (KPI cards, pain-
   point/agent/role/principle cards, process diagram, bubble chart, timeline, comparison columns,
   numbered closing cards). Slide 13 is the leanest (accent-bar list) but still carries a
   deliberate visual hierarchy (first row in blue/bold), consistent with its intentionally
   understated role (transparency slide, not an argument slide).
2. **Assertion headlines throughout** — Pass. All 14 final headlines are unchanged from the
   Content Package, each already checked against the Minto headline test in Phase 4.
3. **Data is visualized, not listed** — Pass. RIEDEL scale facts (Slide 2) and the Forrester
   benchmark (Slide 3) are KPI/hero-stat cards; the priority ratings (Slide 4) are a bubble chart;
   the roadmap (Slide 10) is a timeline, not bullet dates.
4. **Clear visual hierarchy** — Pass. One dominant element per slide (agent-card row, chart,
   diamond-gated timeline, etc.); headline + footer are the only constants.
5. **Source citations present** — Pass (see CI-compliance note above; added in a second pass).
6. **C-Level readiness** — Pass. Decision boundary ("Piloten, nicht Rollout") is stated explicitly
   on Slides 1, 5, 8, 9, 14; asymmetric detail (more on Slides 4–7, less on 8–9) matches decision
   proximity per the Storyline's vertical consistency check; no invented numbers presented as fact
   anywhere in the deck.

All six gates passed. Ready to present to Markus Goetz for approval before Phase 6 (Quality
Review) — approval is the only valid trigger for that next phase.

## Validation status

- `node build/presentation.js` — succeeded, `riedel-sales-ai-transformation.pptx` written.
- `python /mnt/skills/public/pptx/scripts/office/validate.py` — **All validations PASSED.**
- `markitdown` — all 14 slides present with correct headline, bullets, footer, and speaker notes;
  chart image embedded on Slide 4; no placeholder text found.
- Visual/thumbnail rendering (`soffice`) — **not available in this sandbox** ("source file could
  not be loaded"), consistent with the same limitation documented on the RIEDEL kickoff deck.
  QA therefore relies on `validate.py` (structural/XML correctness) and `markitdown` (full text
  extraction, manually cross-checked slide-by-slide against the Content Package above) rather
  than a rendered visual pass.
