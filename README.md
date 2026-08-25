# MGIM Presentation Pipeline

A Claude Code implementation of Markus Goetz Interim Management's presentation production
system (originally prototyped in Langdock as a multi-agent design, then consolidated — see
below). Say what you need and one continuous skill run walks intake → research → storyline →
content → design/generation → quality review → delivery, producing a real `.pptx` at the end —
not just prompts describing one.

## How it works

A single skill, `.claude/skills/presentation-orchestrator/SKILL.md`, performs every phase
itself in sequence — it doesn't delegate to separate subagents. The phase names below are still
the right vocabulary for what each step does and which working style it calls for, but they're
steps within one run, not separate invoked entities:

| Phase | What it produces |
|---|---|
| **Intake** | Confirmed briefing (topic, audience, purpose, slide count, tone, branding) |
| **Research** | Sourced Markdown Research Brief |
| **Storyline** | Governing Thought, MECE argument groups, narrative framework, slide arc, `slide_id` index |
| **Content** | Headlines, bullets, speaker notes, alt-text |
| **Design** | Chart + PptxGenJS scripts, then their execution into a validated `.pptx` |
| **Quality** | Five-dimension review, binding release decision |

Just ask for a presentation and the `presentation-orchestrator` skill takes it from there.

## Shared resources (single source of truth — don't duplicate these into the skill's own text)

- `brand-guide/mgim-brand-guide.md` — the MGIM CI. Every phase reads this file directly instead
  of carrying its own copy, so a brand update only has to happen once.
- `docs/slide-schema.md` — the `slide_id` contract that keeps the Storyline/Content/Design/
  Quality phases' documents joinable across a whole project, replacing the free-form-Markdown
  handoff from the original Langdock design.
- `lib/pptx-helpers.js` / `lib/chart_style.py` — canonical color tokens and layout/chart
  primitives that the Design phase's generated scripts `require`/`import` rather than
  redefining.
- `knowledge/` — sourced knowledge bases the Storyline, Content, and Quality phases apply
  directly rather than having summarized into the skill's own text. Currently:
  `minto-pyramid-prinzip.md` (Barbara Minto's Pyramid Principle — governing thought, MECE
  argument groups, SCQA openings, the headline test) drives the Storyline phase's arc-building,
  the Content phase's bullet discipline, and the Quality phase's Narrative Consistency /
  Content Quality checks.

## What changed vs. the original Langdock design

- **Brand guide deduplicated** — was pasted identically into multiple agents' prompts (3 copies
  to keep in sync); now lives in one file.
- **`slide_id` contract added** — the original relied on every phase implicitly agreeing on
  "slide 4"; see `docs/slide-schema.md` for why that's now explicit.
- **Real code execution** — Langdock's `/mnt/data/` paths assumed a specific sandbox; this
  version runs on Claude Code's actual filesystem/Bash/Node, under `output/<slug>/`.
- **One documented, deliberate CI override**: Claude Code's built-in `pptx` skill generally
  advises against decorative accent bars/stripes (a common AI-slop tell). MGIM's CI uses them on
  purpose as part of its "slash /" signature system — see the brand guide's final section for
  why that override is intentional and should not be "fixed" by a future session.
- **Phases are role-named, not persona-named** — the original Langdock prototype gave each phase
  a human first name (Maximilian, Finn, Nova, Luca, Veronika, Jürgen). This version names each
  by its function instead (Research, Storyline, Content, Design, Quality).
- **Subagent delegation dropped in favor of one sequential run.** An intermediate version of
  this system (still visible in git history) split Research/Storyline/Content/Design/Quality
  across five separate Claude Code subagents, invoked via the `Agent` tool. That depended on
  custom subagent types being discoverable from `.claude/agents/`, which only works reliably
  when this skill runs from the exact directory those definitions live in — it silently breaks
  the moment the skill is invoked from a different project or a differently-rooted session. The
  current design performs every phase directly in the same continuous run instead: no subagent
  discovery dependency, and every phase's output is still written to
  `output/<slug>/docs/` as it completes, so a phase's work survives even if the session is
  interrupted before the whole project finishes.

## Requirements

`pptxgenjs` (npm) and `matplotlib`/`numpy` (pip) aren't preinstalled in every environment this
runs in — the orchestrator skill installs them on first use if a `require`/`import` fails.
