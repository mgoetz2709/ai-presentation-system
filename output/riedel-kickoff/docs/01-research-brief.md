# Research Brief — RIEDEL Networks Kickoff-Deck (Detailplanung Initialisierungsphase)

## Executive Summary

RIEDEL Networks startet mit MGIM eine fünfmonatige Initialisierungsphase (21.9.–Mitte November 2026,
Checkpoint 1) mit zwei parallelen Bausteinen: (1) Machbarkeitsprüfung eines eigenen LLM
(Open-Weight + RAG + Fine-Tuning/LoRA) und (2) eine Ramp-up-Phase zur Discovery von
KI-Automatisierungspotenzialen über alle Unternehmensbereiche [1]. Der externe Marktkontext
stützt beide Stoßrichtungen: Datensouveränität ist 2026 für 89% der Unternehmen ein wichtiges
Thema [2], und der Markt bewegt sich sichtbar in Richtung On-Premise/EU-gehostete
LLM-Architekturen statt reiner Abhängigkeit von US-Public-Cloud-Modellen [3]. Gleichzeitig ist die
Lizenzlage bei Open-Weight-Modellen uneinheitlich genug, dass eine dedizierte Prüfung vor
Investitionsentscheidung sachlich begründet ist, nicht nur Vorsicht um der Vorsicht willen [4].

## Market Context

- Data Sovereignty ist von einem Nischenthema zu einer Mehrheitsagenda geworden: 89% der
  Unternehmen stufen es 2026 als wichtig ein, gegenüber deutlich geringeren Werten in
  Vorjahren [2].
- Technische Hürden bei der Umsetzung von Datensouveränität sind messbar gestiegen — von 26% auf
  43% der befragten Unternehmen binnen eines Jahres [2]. Das stützt die Notwendigkeit einer
  eigenen Machbarkeitsphase statt eines schnellen Tool-Kaufs.
- 62% der Unternehmen nennen den Einsatz von Daten und KI in Kernprozessen als zentralen Treiber
  für Datensouveränität [2] — deckt sich mit RIEDELs Doppelansatz (eigenes LLM + operative
  Automatisierung).
- 2026 gilt in der Marktbeobachtung als Jahr des "Re-Platforming": versteckte Kosten und
  Abhängigkeiten von öffentlichen LLM-Angeboten werden sichtbar, was Unternehmen — besonders im
  deutschen Mittelstand und in regulierten Branchen — Richtung eigener/privater bzw. hybrider
  Modellarchitekturen treibt [3].

## Key Data Points

- Marktkonstellation Modellwahl 2026: Mistral (EU-souverän, günstiger, sehr gute
  Sprachqualität Deutsch) als Arbeitspferd, OpenAI für Top-Anwendungsfälle, Aleph Alpha
  (Heidelberg, on-premise-fähig über "Pharia") für sensible/regulierte Anwendungen [5].
  OpenGPT-X als deutsches Konsortialprojekt ist im Markt sichtbar, hat aber gegenüber den
  genannten Anbietern an Boden verloren [5] — relevant für die Vendor-Screening-Realitätsprüfung
  im Zeitraum 3.–14.11.
- Lizenzrisiko ist real und modellabhängig: Open-Weight bedeutet nicht automatisch lizenzfreie
  Nutzung. Beispiel Llama 3: kommerzielle Nutzung erlaubt, aber Ausschlussklausel für Anbieter mit
  über 700 Mio. monatlich aktiven Nutzern. Andere Modelle (u.a. unter Apache 2.0/MIT) erlauben
  kommerzielle Nutzung ohne Umsatz- oder Nutzergrenze [4]. Lizenzbedingungen sind
  versionsabhängig und müssen bei jedem Versionswechsel neu geprüft werden [4] — begründet direkt
  das Arbeitspaket "Lizenzrechtliche Prüfung — Screening-Start" (3.–14.11.) als Checkpoint-Kriterium,
  nicht als Formalie.
- RIEDEL Networks (Teil der RIEDEL-Communications-Gruppe, Wuppertal/Butzbach) ist ein global
  tätiger Anbieter für Managed Network- und IT-Security-Lösungen für den Broadcast- und
  Event-Sektor, mit über 1.000 Mitarbeitenden an rund 30 Standorten weltweit [6]. Das
  Firmenprofil — sicherheitskritische, latenzsensitive Netzwerkinfrastruktur mit eigenem NOC-Betrieb
  (im Quelldokument referenziert als "NOC-Ablaufpläne") — erklärt, warum Human-in-the-Loop,
  Audit/Logging und Verfügbarkeit/Latenz explizit als Leitplanken-Dimensionen im
  Arbeitspaket "KI-Leitplanken & Betriebsanforderungen" geführt werden [1].

## Competitive / Comparative Landscape

Für die Modellwahl (Baustein 1) sind vier Kandidaten im Screening-Scope des Quelldokuments [1]:

| Anbieter | Positionierung | Relevanz für RIEDEL |
|---|---|---|
| Mistral | EU-souverän, kosteneffizient, starke Sprachqualität Deutsch [5] | Wahrscheinliches Arbeitspferd für breitere Anwendungsfälle |
| Aleph Alpha | Deutsch (Heidelberg), on-premise-fähig, Fokus regulierte Branchen [5] | Passt zu sicherheitskritischem NOC-/Netzwerkbetrieb |
| Meta Llama | Kommerziell nutzbar mit Nutzerzahl-Ausschlussklausel [4] | Lizenzprüfung zwingend vor Festlegung |
| OpenGPT-X | Deutsches Konsortium, im Marktvergleich zuletzt zurückgefallen [5] | Als Souveränitäts-Option zu prüfen, aber mit realistischer Erwartungshaltung |

## Audience-Relevant Insights

- Publikum (Geschäftsführung + Axel Wehrle) trägt in der Detailplanung selbst bereits konkrete
  Commitments (Ansprechpartner benennen, Systemübersicht liefern, Fachbereiche zur Teilnahme
  verpflichten) [1] — das Kickoff-Deck muss diese Gegenleistungen genauso klar transportieren wie
  MGIMs eigene Liefertermine, sonst wirkt der Fahrplan einseitig.
- Der Begriff "eigenes LLM" ist erklärungsbedürftig für eine Entscheiderrunde ohne tiefes
  KI-Fachwissen — das Quelldokument selbst sieht dafür ein eigenes Arbeitspaket
  ("Technische Definition") erst in der zweiten Phasenhälfte vor [1]; das Deck sollte den Begriff
  (Open-Weight + RAG + Fine-Tuning/LoRA) bereits beim Kickoff einmal einfach erklären, um
  Erwartungen an Umfang/Kosten von Anfang an realistisch zu halten.
- Das Kapazitätsrisiko in der Woche 6.10.–24.10. (vier zeitkritische Stränge parallel bei einem
  Einzelberater) ist im Quelldokument bereits mit drei konkreten Entzerrungsoptionen hinterlegt [1]
  — das gehört sichtbar auf eine eigene Folie, nicht in eine Fußnote, weil es sonst als
  nachträglich entdecktes Risiko statt als von Anfang an gemanagtes Risiko wirkt.
- Checkpoint 1 (Woche 9.–13.11.) ist der einzige im Dokument benannte Entscheidungspunkt für
  Fortsetzung/Anpassung/Abbruch [1] — das Kickoff-Deck sollte genau diesen Punkt als klares Ziel
  der gesamten Phase framen, nicht als eines von vielen Arbeitspaketen.

## Open Questions / Gaps

- Keine RIEDEL-spezifischen (statt marktweiten) Zahlen zu aktueller Schatten-KI-Nutzung oder
  KI-Reifegrad im Unternehmen selbst verfügbar — im Quelldokument nicht enthalten und extern nicht
  auffindbar (nicht öffentlich berichtet). Das Deck arbeitet daher mit dem Ist-Zustand laut
  Detailplanung selbst, nicht mit einer externen RIEDEL-KI-Reifegradstudie. Bewusste
  Sourcing-Entscheidung, um keine unbelegte Zahl zu erfinden.
- Keine belastbare externe Quelle zu branchenspezifischen KI-Automatisierungspotenzialen exakt für
  Broadcast-Netzwerkbetrieb/NOC gefunden; das Deck verzichtet bewusst auf eine generische
  branchenfremde Vergleichszahl und bleibt bei den im Quelldokument selbst angelegten
  Bewertungsdimensionen (Wirkung × Automatisierbarkeit × Datenverfügbarkeit) [1].

## Sources

1. MGIM, "Detailplanung Initialisierungsphase — RIEDEL Networks: Feasibility & Ramp-up: Eigenes
   LLM & KI-Automatisierung", Entwurf zur internen Abstimmung, Stand 16.9.2026. Primärquelle,
   intern, hohe Verlässlichkeit für alle Termine/Commitments/Status.
2. BARC, "Data Sovereignty 2026: Reality, Relevance, Roadmap", Befragung von 320
   Entscheidungsträgern, Feb./März 2026. https://barc.com/de/research/data-sovereignty-2026/ —
   aktuell, spezifisch zu Datensouveränität, methodisch benannt (n=320).
3. Digitaltank, "Custom LLMs & Datensouveränität: Warum On-Premise KI 2026 den Markt dominiert",
   2026. https://digitaltank.de/custom-llms-datensouveraenitaet-warum-on-premise-ki-2026-den-markt-dominiert/
   — Branchenbeobachtung/Trendeinschätzung, nicht primärstatistisch; als Kontext, nicht als
   Zahlenquelle verwendet.
4. Skillbyte Insights, "Open-Source-KI-Modelle: vier Lizenzklauseln vor dem Einsatz", 2026.
   https://www.skillbyte.de/wissen/open-source-ki-modelle-lizenz-pruefen — aktuell, fachlich
   spezifisch zu Lizenzrisiken bei Open-Weight-Modellen.
5. ki-beratung-unternehmen.de, "OpenAI vs. Mistral vs. Aleph Alpha — LLM-Vergleich für
   DACH-Unternehmen", 2026. https://www.ki-beratung-unternehmen.de/vergleich/openai-vs-mistral-vs-aleph-alpha
   — Anbietervergleich, redaktionell, keine Primärstudie; als Orientierung zur Marktlandschaft
   verwendet, nicht als harte Kennzahl.
6. RIEDEL Networks / RIEDEL Communications, Unternehmensangaben. https://riedel-networks.net/en/about-us/company
   und https://www.riedel.net/de/unternehmen/ueber-uns — Unternehmensprofil (Größe, Standorte,
   Geschäftsfelder), Stand der öffentlich zugänglichen Unternehmensdarstellung 2026.
