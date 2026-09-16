# Design Delivery Report — RIEDEL Networks Kickoff-Deck

**Project:** `riedel-kickoff` · **Phase:** 5 (Design) · **Status:** Build complete, passed validation (Revision 3)

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
