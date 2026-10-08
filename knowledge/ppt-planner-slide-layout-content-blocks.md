# PPT Planner — Slide Layout & Content-Block Reference

Source: uploaded by Markus Goetz, "PPT-Planner-Slide-Layout-and-Content-Blocks.pdf" — the
operating reference behind the "Paul the PPT Planner" agent persona. Adopted into the MGIM
pipeline because its layout rules, block vocabulary, and anti-pattern checklist are a precise,
field-tested complement to `minto-pyramid-prinzip.md`: Minto governs the *argument* (Governing
Thought, MECE groups, headline test), this file governs *what goes where on a single slide* once
the argument is settled. Read it in Phase 4 (Content) and Phase 5 (Design), and again in the
Visual Quality Gate.

Scope: slide breakdown and per-slide content-block design only. It does not choose KPIs, does
not write the narrative argument, and does not make audience-altitude or source-evidence calls —
those stay Phase 2/3's job.

## 1. Five Layout Rules That Govern Every Slide

Universal — apply to every slide in every deck this pipeline produces, not only stakeholder-
reporting decks. Check these before placing any content block:

1. **One idea per slide.** Each slide carries exactly one assertion. A slide that needs two
   messages gets split into two slides — this is a Phase 3 call (reissue the `slide_id` index),
   not something to resolve by cramming both onto one.
2. **Assertion-evidence layout.** Every slide = a full-sentence conclusion headline (top) + one
   supporting visual/evidence block (body). The headline states the takeaway ("Churn fiel auf 4%,
   nachdem die Onboarding-Fixes griffen"), never a label ("Churn"). This is the headline test
   again, restated at the layout level.
3. **≤4 content blocks per slide** (cap distinct visual elements at ~4–6, and *genuinely novel*
   blocks at ~4 — the working-memory limit). More than that → chunk into labeled groups, or move
   the excess to a new slide or the appendix.
4. **One focal point.** Make the single most important element visually dominant (largest,
   top-left, the one accent color). Everything else stays muted. If everything is emphasized,
   nothing is — this is the same principle as the brand guide's "Grey anchors, Blue activates."
5. **Slides are cues, not documents.** Body blocks hold visuals and short labels, not the spoken
   script. Never fill a block with a paragraph that duplicates the speaker notes. A slide that
   reads fine with no narration is a pre-read, not a presentation slide — thin it down.

Reading-order default: top → bottom, left → right. Place the most important block top-left. Keep
the same block positions in the same slide types across a recurring deck's periods (monthly/
quarterly reporting) so the audience learns where to look and doesn't have to re-orient every
cycle.

## 2. The Standard Slide Skeleton — Monthly/Periodic Stakeholder Reporting

A recurring stakeholder deck splits into a **narrative layer** (≤10–15 slides, actually
presented) and an **appendix layer** (referenced on demand, no slide-count ceiling). Build the
narrative layer from this fixed skeleton; route everything that doesn't carry its own weight in
the live conversation to the appendix instead of inflating the narrative layer.

| # | Slide | One per deck? | Splits into more slides when… |
|---|---|---|---|
| 0 | Cover + meeting context | Yes | — |
| 1 | Executive summary (headline + the 1–3 things that matter + any ask) | Yes | **Never split** — must stay one slide |
| 2 | What changed / why now (optional; fold into §1 for routine months) | Optional | — |
| 3 | Key metrics scorecard (KPIs vs. target/trend) | Yes | >9 metrics → one summary slide + per-cluster detail slides |
| 4 | Progress against goals / OKRs / initiatives | Yes | One slide per initiative if 3–5 are material |
| 5 | Wins / highlights | Optional | — |
| 6 | Risks & issues (with mitigation + owner) | Yes | One slide per major risk if board-critical |
| 7 | Decision / ask | One per decision | One slide per distinct decision — never stack two decisions on one slide |
| 8 | Financials (summarized) | Yes | Split P&L / cash / forecast only if material |
| 9 | Outlook / next period | Yes | — |
| 10 | Appendix divider + backup detail | Yes | As many as needed; not presented |

Split/merge rules:
- Merge §2 into §1 for routine status months; keep §2 separate only when there's a real "why now"
  change worth its own slide.
- Split §3 (scorecard) once more than ~9 KPIs are needed: one chunked summary scorecard + drill-
  down slides per metric cluster.
- One ask = one slide (§7), always — this is the single most commonly violated rule and the one
  worth checking for explicitly in the Visual Quality Gate.
- Promote the ask into the executive summary (§1) for decision-driven months; keep it at §7 alone
  for routine status months.
- Anything that "doesn't move a decision forward" → appendix, not the narrative layer.

## 3. Per-Slide Content-Block Templates

Positions use three simple regions: **Header bar**, **Body** (with splits like left 60%/right
40%, or an N-column band), **Footer strip**.

- **0 — Cover + meeting context.** Header: deck title + reporting period. Body (center):
  presenter/owner, date, audience. Footer: document status tag (For Noting / For Discussion /
  For Approval).
- **1 — Executive Summary** (the most important slide — never split). Header: one-sentence
  headline = the period's bottom line. Body, 3-block band: "the 1–3 things that matter," each a
  short labeled block (what it is · status (RAG) · one-line so-what). Body, ask callout (decision
  months only): one highlighted block (decision needed + one-sentence recommendation). Footer
  (optional): RAG status legend. Rule: a reader seeing *only* this slide should know the state of
  the business and any decision required.
- **2 — What changed / why now.** Header: assertion naming the change. Body left 60%: the
  change/tension (2–3 bullets max, or one visual). Body right 40%: why it matters now/implication.
- **3 — Key Metrics Scorecard.** Header: assertion stating the headline metric story ("Im Plan;
  Churn ist der Beobachtungspunkt"). Body: clustered KPI grid, metrics grouped into ≤4–5 labeled
  clusters (e.g. Growth · Efficiency · Customer · Team), each cluster holding 3–4 KPI tiles
  (§4.1). Visual emphasis: the single most important KPI rendered largest/top-left as a BAN
  (Big Ass Number). Footer: RAG legend, reporting period, units note. Must pass the 5-second
  test: business status readable at a glance.
- **4 — Initiative/OKR Progress.** Header: assertion on overall progress. Body: one row per
  initiative (≤5 rows) — name · status (RAG + %) · trend vs. last period · one-line update. If
  split into one slide per initiative: header = that initiative's own assertion, body left =
  progress visual, body right = blockers/next step.
- **5 — Wins/Highlights.** Header: assertion summarizing the win. Body: 2–3 evidence blocks, each
  = win · the metric/outcome it moved · optional proof point/quote.
- **6 — Risks & Issues.** Header: assertion on the risk posture. Body: risk table (≤3–4 rows),
  each row a Risk Block (§4.4). Place each risk next to the decision it affects where possible —
  don't hide risk in an annex.
- **7 — Decision/Ask** (one per decision). Header: the decision framed as a question or
  recommendation. Body: an Ask Block (§4.3) in full.
- **8 — Financials (summarized).** Header: assertion on financial health ("Runway auf 16 Monate
  verlängert"). Body left: 3–4 summary KPI tiles (revenue, burn, cash, runway) with vs. plan +
  trend. Body right: one supporting chart (pacing line or budget-vs-actual bar). Detail tables →
  appendix.
- **9 — Outlook/Next Period.** Header: assertion on what to expect. Body, 2-block split: updated
  forecast/what to expect | what to watch (leading indicators/risks).
- **10 — Appendix divider + backup.** Divider slide: simple "Appendix" marker. Backup slides:
  full tables, models, deep dives — referenced on demand, not presented; no layout constraints
  beyond legibility.

## 4. Reusable Content-Block Components

The building blocks placed inside the templates above. Name these explicitly in Phase 4's Visual
Spec whenever a slide needs more than one visual element.

**4.1 KPI Tile** (the atomic metric block) — never a bare number. Every KPI tile contains:
*Actual value* (largest element; render as a BAN if it's the slide's headline number) · *vs.
Target* → variance (absolute + %) · *Trend* → MoM and/or YoY (sparkline or ▲/▼) · *RAG status* →
icon **and** label, never color alone (~8% of men are red-green colorblind) · *Driver
annotation* → one line, only if off-plan.

**4.2 Metric Cluster Block** — a labeled group of 3–4 KPI tiles under one theme header.
Whitespace separates clusters (proximity = grouping). ≤4–5 clusters per scorecard.

**4.3 Ask Block** (decision template) — every field required:

| Field | Content |
|---|---|
| Decision needed | Mode: Approve / Align / Advise / Decide |
| Recommendation | One sentence — the specific action proposed |
| Options considered | 2–3 alternatives with trade-offs |
| Cost of inaction | One line — what changes if we don't act |
| Risks + mitigations | ≤3 bullets, each with owner + residual risk |
| Resource implications | Money / people / attention / roadmap capacity |
| Timing | Decision deadline / which meeting |

**4.4 Risk Block** — risk statement · likelihood-impact or RAG · mitigation · owner · residual
risk. One row per risk, ≤3–4 rows per slide.

**4.5 Chart Block** — assertion title stating the takeaway (not "Revenue" but "Umsatz stieg um
23%, getrieben durch Expansion"). One chart, one message. On-graphic data labels, not a distant
legend. One annotation marking the driver/inflection point if relevant.

## 5. Choosing the Visual for a Content Block

When a block holds a chart, pick the encoding highest on the perception ranking — position/
length beats angle/area beats color:

| The block's message | Use | Avoid |
|---|---|---|
| One number that matters most | BAN / big number + small delta | Burying it in a table |
| Trend over time (MoM/YoY) | Line (or sparkline in a tile) | Many bars; pie |
| Compare values across categories | Sorted bar (horizontal/vertical) | Pie, radar |
| Actual vs. target | Bullet graph, or bar + target marker | Gauges/speedometers |
| Part-to-whole (≤5 parts, sums to 100%) | Single stacked bar, or pie with ≤5 slices | Pie >5 slices, 3D pie |
| Exact values / many metrics | Table with conditional formatting / sparklines | Forcing a chart |
| Status across many KPIs | Scorecard table with RAG + sparkline | Wall of gauges |

Always: bars start at zero · flat 2D only · consistent scales across comparable charts · round
numbers for humans · one accent color reserved for the focal point. This refines (never
contradicts) the chart-type specifics in Phase 5C and `lib/chart_style.py`.

## 6. Slide-Level Anti-Patterns — Reject Before Finalizing

Check every content-block-structured slide against this list before it ships (in addition to,
not instead of, the Visual Quality Gate in Phase 5):

- ☐ **Wall of text** — paragraphs or tiny font crammed in → replace with assertion + visual.
- ☐ **Topic headline** ("Financial Update") → rewrite as a conclusion.
- ☐ **Too many blocks** (>1 idea, >~6 elements, >~4 novel chunks) → split or chunk.
- ☐ **Slide works as a handout** (reads fine with zero narration) → it's a pre-read; thin it to
  cues.
- ☐ **No focal point** — every block equally weighted → emphasize one.
- ☐ **Bare number** — a metric with no target/trend/status → promote it to a full KPI Tile.
- ☐ **Misleading chart** — truncated axis, 3D, pie with >5 slices, dual-axis → fix per §5.
- ☐ **Color-only status** — RAG shown by color with no icon/label → add shape + text.
- ☐ **Chartjunk** — gridlines, borders, shadows, clip-art → strip non-data ink.
- ☐ **Inconsistent layout vs. the previous period** — keep block positions stable across a
  recurring deck's cycles.
- ☐ **Two decisions on one ask slide** — always one ask per slide.

## 7. Slide-Plan Output Schema

This is the exact per-slide block the Copilot-ready Slide Plan (Phase 4, `03b-copilot-slide-
plan.md`) emits — see Phase 4 for the full non-negotiables around that file:

```
Slide N — [slide type]
  Headline:       <full-sentence assertion / takeaway>
  Layout:         <region structure, e.g. "Header bar + 4-tile clustered grid + footer legend">
  Content blocks:
    - <block name> — <what it shows> — <data needed> — <visual type>
    - ...
  Focal point:    <the one dominant element>
  Data inputs:    <metrics / sources this slide requires>
  Layer:          narrative | appendix | optional
  Notes:          <split/merge decisions, RAG legend, etc.>
  Bullet points:
    - ...
  Speaker notes:
    - ...
```

`Bullet points` and `Speaker notes` extend the source reference's schema (which stops at `Notes`)
— carried over from the Content Package so the plan is self-contained and directly usable without
cross-referencing a second document.
