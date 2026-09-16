# Design Delivery Report — RIEDEL Networks Kickoff-Deck

**Project:** `riedel-kickoff` · **Phase:** 5 (Design) · **Status:** Build complete, passed validation (Revision 5)

## Revision 5 (nach Rückmeldung von Markus Goetz)

**Bug fix (affects multiple slides):** `addBulletBlock()` — the shared bullet-list helper — was
missing `breakLine` between items, so pptxgenjs rendered every bullet list as one run-on paragraph
with a single bullet glyph (visible on slides 11, 12, and 14 in the reviewed export). Fixed once
in the helper; every slide using it is corrected automatically. Also fixed the same missing-
`breakLine` pattern in slide 15's closing list.

Six content/design fixes from this review round:

1. **Slide 6** — the right-hand legend merely repeated the diagram's labels/questions as text.
   Replaced with a **table** adding a "Nutzen" (benefit) column — what RIEDEL concretely gets from
   each of the five building blocks, not just its leading question restated.
2. **Slide 11 (Opportunity Scoring)** — the bare formula ("Wirkung × Automatisierbarkeit ×
   Datenverfügbarkeit") was too abstract for a C-level read. Replaced with a 1–3 rating-scale
   table (one row per dimension, one-line definition per rating) plus a card labeled
   **"Beispielhafte Illustration — keine reale Bewertung"** with a worked, clearly-hypothetical
   example calculation (Score 18) — makes the mechanism concrete without presenting invented data
   as real.
3. **Slide 12 (Commitments)** — converted from two parallel text columns into a genuine **table**,
   one row per work package with MGIM's and RIEDEL's contribution side by side, plus a fourth,
   intentionally blank **"Verantwortlich (RIEDEL)"** column so Axel Wehrle can name or write in
   responsible people live in the room.
4. **Slide 13 (Kapazitätsrisiko)** — previously read as MGIM's own internal scheduling problem
   with no clear reason for RIEDEL to care. Reframed: headline and insight box now state upfront
   that the collision affects RIEDEL's own Fachbereiche directly (needed for interviews AND the
   Pilot-Use-Case decision in the same week), and the slide now closes with an explicit
   decision-ask ("welche Option passt am besten — bitte heute entscheiden") instead of just an FYI.
5. **Slide 14 (Checkpoint)** — the old headline ("...ist der einzige Punkt, an dem entschieden
   wird") read as a single-gate governance model, which comes across as weak structure for a
   five-month engagement. Reframed, without inventing new milestones: the plan already contains
   four running decision points (Kickoff-Rollen, Leitplanken-Kommentierung, Pilot-Use-Case-
   Entscheidung, Longlist-Bewertung); the slide now shows them as a mini-timeline that *bündelt
   sich* into Checkpoint 1, rather than presenting Checkpoint 1 as the sole point of engagement.
6. **Slide 15 (Closing)** — tone was directive ("...müssen bis Kickoff-Ende stehen"), which reads
   as demanding for a CTO whose expertise MGIM wants to draw on, not just direct. Reworded asks as
   requests ("Wir würden Sie bitten..."), and added an explicit open question inviting his own
   view on how to approach Fachbereich-integration — his experience should shape the plan, not
   just confirm it.

**Resolved:** Markus Goetz confirmed the "what we need from you / what's your view" moment stays
at the close, not the front — fits the classic kickoff arc (build context and plan first, ask for
input at the end). No Storyline change needed.

## Revision 4 (nach Rückmeldung von Markus Goetz)

Folie 9 hatte einen echten Inhaltsfehler, nicht nur ein Layout-Problem: die Headline kündigte
"drei abhängigen Schritten" an, das Diagramm zeigte aber fünf optisch gleichrangige Prozessboxen.
Ursache: die Content-Package-Bullets hatten 1:1 die fünf Arbeitspakete aus dem Quelldokument
übernommen, statt sie auf die drei in der Storyline definierten Makro-Schritte zu verdichten.

Korrektur: drei **Chevron-Phasen** (Scope & Vorbereitung / Interviews & Prozessprüfung /
Use-Case-Longlist & Scoring), jede mit ihren 1–2 zugehörigen Arbeitspaketen als Unterpunkte in
einer Karte darunter — Muster "Chevron-Prozess mit Aktivitäts-Detail je Phase", bestätigt durch
Kurzrecherche zu Chevron-Diagrammen (Quelle: PresentationGo/SlideModel Chevron-Templates: Pfeile
transportieren die feste Reihenfolge, eine Aktivitäts-Matrix direkt unter jeder Phase verknüpft
Aufgaben eindeutig mit ihrer Phase). Passend zur Storyline, da G2 (Baustein 2) als **deduktiv**
getaggt ist — anders als Folie 6 (induktiv/parallel, daher Hub-and-Spoke ohne Pfeile).

Die "Gemeinsame Fokusbereich-Auswahl" ist jetzt kein vierter Schritt mehr auf dieser Folie,
sondern ein Ergebnis-Hinweis, der auf den gemeinsamen Checkpoint (Folie 14) verweist — deckungsgleich
mit der Storyline, in der G2 exakt die `slide_id`s 9–11 umfasst und die Checkpoint-Entscheidung zu
G3 gehört.

## Revision 3 (nach Rückmeldung von Markus Goetz)

Folie 6 von einem 5-Kacheln-Raster auf ein **Hub-and-Spoke-Diagramm** umgestellt: ein zentraler
Kreis "Architekturentscheidung" (MG Blue), umgeben von fünf gleichberechtigten, radial verbundenen
Bausteinen (Datenklassifizierung/-räume, Zugriff/Rollen, Audit/Logging, Verfügbarkeit/Latenz,
Human-in-the-Loop). Rechts daneben eine Legende mit einer Kurzerläuterung je Baustein.

Kurzrecherche zu Hub-and-Spoke-/Radialdiagrammen (Quellen: Bricks, "How to Create a Hub and Spoke
Diagram in PowerPoint"; PresentationGo Radial-Diagram-Templates) bestätigt die hier gewählte
Umsetzung:
- 3–6 Spokes gelten als optimal, um die Grafik nicht zu überladen — hier exakt 5.
- Kurze, prägnante Labels gehören in die Kreise; ausführlichere Erklärungen gehören nach außen,
  wenn sie nicht in den Kreis passen — hier als Legende rechts statt radial verteilter Callouts
  gelöst, da bei 5 Spokes und begrenzter Folienhöhe außen liegende Radial-Callouts zu eng am
  Folienrand geraten wären.
- Farbdifferenzierung zwischen Zentrum und Satelliten macht die Struktur lesbar — hier
  CI-konform umgesetzt: Zentrum (das eine Element, auf das der Blick fällt) in MG Blue, die fünf
  Bausteine in Grau/Weiß mit blauer Kontur ("Grey anchors, Blue activates").
- Ein Hub-and-Spoke-Layout impliziert bewusst **keine** Reihenfolge — passend, weil die fünf
  Leitplanken-Bausteine tatsächlich parallel erarbeitet werden, nicht sequenziell.

Neuer Helper `addHubAndSpoke()` (plus `addRadialLine()` für die winkelgenauen Verbindungslinien)
in `build/presentation.js` — projektlokal, da dieses Layout bislang nicht in
`lib/pptx-helpers.js` vorhanden war; bei Bedarf für ein künftiges Projekt in die gemeinsame
Bibliothek heben.

## Revision 2 (nach Rückmeldung von Markus Goetz)

Zwei Änderungen umgesetzt, siehe `02-storyline-blueprint.md` Abschnitt "Reissue note" für die
vollständige Begründung des neuen Slide-Index:

1. **Neue Folie 2** — Drei-Phasen-Übersicht (Feasibility + Ramp-up laufen jetzt parallel als
   Initialisierungsphase; Umsetzung ist eine eigene, spätere Phase, deren Scope erst am
   Checkpoint 1 feststeht). Macht explizit: die aktuelle Phase klärt nur Setup und Beteiligte.
2. **Folie 4** (vormals Folie 3) — von Prozessgrafik auf tabellarische Darstellung umgestellt:
   Was / Wer / Wann / Ergebnis, sechs Zeilen für die sechs Arbeitspakete von Baustein 1.

Alle `slide_id`s ab 2 haben sich um +1 verschoben (Chart-Datei entsprechend von
`slide_12_chart` auf `slide_13_chart` umbenannt). Neue Gesamtlänge: **15 Folien**.

## What was built

- `output/riedel-kickoff/charts/slide_13_chart.py` → `charts/slide_13_chart.png`
  Swimlane-Diagramm der vier parallel laufenden kritischen Arbeitsstränge in der Woche
  6.10.–24.10.2026, eingebettet in den Gesamtzeitraum 21.9.–13.11.2026, mit Marker für die
  Budget-Zwischenlieferung am 20.10. Executed successfully.
- `output/riedel-kickoff/build/presentation.js` → `riedel-kickoff.pptx`
  15-Folien-Build auf dem gemeinsamen Layout-Raster, unter Verwendung von `lib/pptx-helpers.js`
  (`addHeaderBar`, `addFooter`, `addCard`, `addAccentBar`, `addSlashDivider`, `addInsightBox`)
  plus projektlokalen Helfern (`addHeadline`, `addSourceLine`, `addBulletBlock`, `addProcessBox`,
  `addConnector`). Executed successfully.

## Slide-Typ-Verteilung

| Typ | Folien |
|---|---|
| TITLE | 1 |
| PROCESS/TIMELINE | 2, 4 (Tabelle), 9 |
| STAT/Insight | 3, 14 |
| CONTENT | 5, 6, 7, 10 |
| COMPARISON | 8, 12 |
| PROCESS/Framework | 11 |
| CHART | 13 |
| CLOSING | 15 |

Fortgeschrittene Visualisierung: das Swimlane-/Gantt-Diagramm auf Folie 13 (annotierte
Zeitleiste mit Überlappungsband) erfüllt das Non-Negotiable "mindestens eine fortgeschrittene
Visualisierung pro Deck".

## Validation performed

1. `node output/riedel-kickoff/build/presentation.js` — completed without errors.
2. `python /mnt/skills/public/pptx/scripts/office/validate.py riedel-kickoff.pptx` —
   **All validations PASSED.**
3. `markitdown riedel-kickoff.pptx` — vollständiger Textauszug slide-für-slide geprüft.
4. Visuelles Rendering (soffice → PDF → Bild) in dieser Sandbox erneut getestet und erneut
   fehlgeschlagen (`Error: source file could not be loaded`) — bestätigte Umgebungseinschränkung,
   kein Deck-Defekt. QA stützt sich auf `validate.py` + vollständigen Text-Dump.

## Visual Quality Gate — 6 checks

| # | Check | Result |
|---|---|---|
| 1 | No plain-text/bullet-only slides | **Pass** — jede Folie trägt Prozessboxen, Karten, Tabelle, Chart oder Vergleichsspalten |
| 2 | Headlines pass the assertion test | **Pass** — z. B. Folie 8 "Modellwahl und Lizenzprüfung laufen bewusst getrennt von der Technologiebegeisterung — Screening vor Festlegung" |
| 3 | Data is visualized, not listed | **Pass** — Prozess-Zeitleisten (2, 4, 9), Swimlane-Chart (13), Vergleichstabelle (8), Zwei-Spalten-Commitments (12) |
| 4 | Clear visual hierarchy | **Pass by construction** — einheitliches Raster (`CONTENT_TOP`, Spaltenbreiten) über alle Folien |
| 5 | Source citations present where data is cited | **Pass** — interne Primärquelle (Detailplanung RIEDEL) durchgehend implizit als Projektgrundlage; externe Marktaussagen auf Folie 8 jetzt mit expliziter Quellenzeile ergänzt (ki-beratung-unternehmen.de, Skillbyte Insights) |
| 6 | C-Level readiness | **Pass** — formal, präzise, jede Kernaussage in der Headline selbst, Sprechernotizen tragen die Erläuterung |

## Bewusste Sourcing-Entscheidung — Folie 11

Folie 11 (Opportunity Scoring) zeigt bewusst nur das Bewertungsraster (Wirkung ×
Automatisierbarkeit × Datenverfügbarkeit), keine Beispiel-Scores oder Platzhalterzahlen — die
tatsächlichen Werte entstehen erst aus den Interviews im Oktober und lagen zum Zeitpunkt der
Deck-Erstellung nicht vor. Das ist keine Design-Lücke, sondern eine explizite Entscheidung gegen
erfundene Daten (siehe Research Brief, Open Questions/Gaps).

## Offene Punkte

Keine. Im Gegensatz zum vorherigen Projekt (AI Transformation Partner) enthält dieses interne
Kickoff-Deck keinen offenen Kontakt-Platzhalter — der Präsentierende ist Markus Goetz selbst,
live im Raum.

## Next step

Freigabe durch Markus Goetz einholen, dann Phase 6 (Quality Review).
