# Per-Slide Handoff Schema

Every phase in the pipeline (Storyline → Content → Design → Quality) works on the *same* slide
sequence. In the original Langdock design, each phase produced independent free-form Markdown,
with only a shared understanding — no enforced identifier — connecting "slide 4" across three
different documents. On a 20+ slide deck that is exactly where slides silently swap content,
get skipped, or get double-counted. This schema fixes that with one rule: **`slide_id` is
assigned once, in the Storyline phase, and never changes downstream.**

## The rule

1. **`slide_id`s are assigned in Phase 3 (Storyline)** (1, 2, 3, … in final presentation order)
   when the Storyline Blueprint is written. This is the only point where slide count is decided.
2. **Every downstream document — Content Package, Design classification, Quality Report — uses
   the identical `slide_id` set**, in the identical order. No later phase adds, drops, splits, or
   reorders slides silently.
3. If a later phase reveals that a slide should be added, split, or removed (e.g. Content finds a
   slide needs 8 lines and must become two slides), go back to Phase 3 yourself and reissue the
   index with an explicit note of what changed and why — don't fork it by quietly renumbering in
   a downstream document.
4. Every per-slide Markdown section, in every phase, starts with the exact header
   `## Slide {slide_id}: {working headline}` — identical `slide_id`, so any later phase (or a
   human) can `grep '^## Slide '` and get a 1:1 join across all four documents.

## Required Slide Index table

Every per-slide deliverable (Storyline Blueprint, Content Package, Design classification,
Quality Report) opens with this table before the per-slide detail sections:

```markdown
| slide_id | working headline | slide role in arc | type (assigned in Phase 5, blank before then) |
|---|---|---|---|
| 1 | Der Markt wächst 18% p.a. | Opening hook | TITLE |
| 2 | ... | Problem definition | STAT |
```

## Minimum fields per phase, per `slide_id`

| Phase | Adds |
|---|---|
| **Storyline** | `working_headline`, `core_message`, `role_in_arc`, `argument_group`, `framework` + `governing_thought` + MECE argument-group list (deck-level, not per-slide — see `knowledge/minto-pyramid-prinzip.md`) |
| **Content** | `final_headline` (assertion, may refine the working headline), `bullets[]` (≤5), `speaker_notes`, `visual_spec` (what data/diagram this slide needs), `alt_text` |
| **Design** | `slide_type` (TITLE/CONTENT/STAT/CHART/PROCESS/COMPARISON/TIMELINE/CLOSING), `chart_script_ref` (if CHART), `layout_notes` |
| **Quality** | `dimension_findings[]` (dimension, severity, description, correction, responsible phase) |

## Why Markdown, not JSON

Deliverables stay human-readable Markdown (Markus Goetz reads these directly), not JSON — this
matches the original design intent and Langdock convention. The Slide Index table is what makes
it machine-joinable without giving up readability: it's both the first thing a human scans and
the exact key later phases match on.

## Where this lives in a project

As the presentation-orchestrator skill runs a project, the documents (Research Brief, Storyline
Blueprint, Content Package, Design delivery note, Quality Report) are saved to
`output/<project-slug>/docs/` phase by phase, so the `slide_id` join is inspectable at any
point — not just held in the session's working context, and recoverable even if the session
restarts partway through:

```
output/<project-slug>/docs/01-research-brief.md
output/<project-slug>/docs/02-storyline-blueprint.md
output/<project-slug>/docs/03-content-package.md
output/<project-slug>/docs/04-design-delivery-report.md
output/<project-slug>/docs/05-quality-report.md
output/<project-slug>/charts/slide_NN_chart.png
output/<project-slug>/charts/slide_NN_chart.py
output/<project-slug>/build/presentation.js
output/<project-slug>/<project-slug>.pptx
```
