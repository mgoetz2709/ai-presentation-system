# MGIM Presentation Pipeline

A Claude Code implementation of Markus Goetz Interim Management's multi-agent presentation
system (originally prototyped in Langdock). Say what you need and the pipeline runs intake →
research → storyline → content → design/generation → quality review → delivery, producing a
real `.pptx` at the end — not just prompts describing one.

## How it works

| Agent | Role | File |
|---|---|---|
| **Orchestrator** | Intake, sequencing, code execution, Visual Quality Gate, delivery | `.claude/skills/presentation-orchestrator/SKILL.md` |
| **Research** | Sourced Markdown Research Brief | `.claude/agents/research.md` |
| **Storyline** | Narrative framework, slide arc, assigns `slide_id` | `.claude/agents/storyline.md` |
| **Content** | Headlines, bullets, speaker notes, alt-text | `.claude/agents/content.md` |
| **Design** | Writes (never executes) chart + PptxGenJS scripts | `.claude/agents/design.md` |
| **Quality** | Five-dimension review, binding release decision | `.claude/agents/quality.md` |

Just ask for a presentation and the `presentation-orchestrator` skill takes it from there.

## Shared resources (single source of truth — don't duplicate these into agent prompts)

- `brand-guide/mgim-brand-guide.md` — the MGIM CI. Every agent reads this file directly instead
  of carrying its own copy, so a brand update only has to happen once.
- `docs/slide-schema.md` — the `slide_id` contract that keeps the Storyline/Content/Design/
  Quality Agents' documents joinable across a whole project, replacing the free-form-Markdown
  handoff from the original Langdock design.
- `lib/pptx-helpers.js` / `lib/chart_style.py` — canonical color tokens and layout/chart
  primitives that the Design Agent's generated scripts `require`/`import` rather than
  redefining.

## What changed vs. the original Langdock design

- **Brand guide deduplicated** — was pasted identically into the Orchestrator's, the Design
  Agent's, and the skill's prompts (3 copies to keep in sync); now lives in one file.
- **`slide_id` contract added** — the original relied on all five agents implicitly agreeing on
  "slide 4"; see `docs/slide-schema.md` for why that's now explicit.
- **Real code execution** — Langdock's `/mnt/data/` paths assumed a specific sandbox; this
  version runs on Claude Code's actual filesystem/Bash/Node, under `output/<slug>/`.
- **One documented, deliberate CI override**: Claude Code's built-in `pptx` skill generally
  advises against decorative accent bars/stripes (a common AI-slop tell). MGIM's CI uses them on
  purpose as part of its "slash /" signature system — see the brand guide's final section for
  why that override is intentional and should not be "fixed" by a future session.
- **Agents are role-named, not persona-named** — the original Langdock prototype gave each agent
  a human first name (Maximilian, Finn, Nova, Luca, Veronika, Jürgen). This version refers to
  each by its function (Orchestrator, Research, Storyline, Content, Design, Quality) instead.

## Requirements

`pptxgenjs` (npm) and `matplotlib`/`numpy` (pip) aren't preinstalled in every environment this
runs in — the orchestrator skill installs them on first use if a `require`/`import` fails.
