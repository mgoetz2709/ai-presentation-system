# Storyline Blueprint — RIEDEL Networks Kickoff-Deck

## Reissue note (Slide-Index-Änderung nach Rückmeldung von Markus Goetz)

Nach Rückmeldung wurden zwei Änderungen am Deck angefordert: (1) Folie 3 (Fahrplan-Übersicht
Baustein 1) wird von einer Prozessgrafik auf eine tabellarische Darstellung (Was/Wer/Wann/
Ergebnis) umgestellt — reine Design-Änderung, kein neuer `slide_id`. (2) Eine neue Intro-Folie
wurde angefordert, die alle Projektphasen zeigt (Feasibility + Ramp-up parallel jetzt, Umsetzung
später) und klarstellt, dass die aktuelle Initialisierungsphase erst Setup/Klärung ist (wie wird
aufgesetzt, wer aus dem Unternehmen muss integriert werden). Diese neue Folie erhält `slide_id 2`
und wird direkt nach der Titelfolie eingefügt (erweitert die SCQA-Situation, bevor die
Complication/Governing-Thought-Folie kommt). **Alle nachfolgenden `slide_id`s verschieben sich um
+1** (alter Slide 2 → neuer Slide 3, alter Slide 3 → neuer Slide 4, usw., bis alter Slide 14 →
neuer Slide 15). Neue Gesamtlänge: 15 Folien (weiterhin innerhalb des freigegebenen 12–15-Rahmens).
Die MECE-Argumentgruppen (G1/G2/G3) bleiben inhaltlich unverändert, nur ihre Slide-Ranges
verschieben sich um +1.

## Governing Thought

> In fünf Monaten zu einer fundierten Fortsetzungsentscheidung: Zwei parallele Bausteine —
> eigenes LLM und KI-Automatisierung — laufen über klar abhängige Arbeitspakete auf einen
> gemeinsamen Checkpoint zu, der nur mit beidseitigen Commitments erreichbar ist.

## Framework

**Pyramid Principle.** Rationale: Das Publikum (Geschäftsführung + Axel Wehrle) braucht beim
Kickoff eine belastbare Entscheidungsgrundlage für einen bereits vereinbarten Fahrplan, keine
Verkaufsgeschichte und keinen inspirierenden Spannungsbogen — die richtige Bewegung ist
top-down: Kernaussage zuerst, dann die stützende Struktur (zwei Bausteine + Governance), dann die
Details je Baustein. Passt exakt zum Zweck des Decks: gemeinsames Verständnis + Commitments
herstellen, nicht überzeugen, etwas zu kaufen.

## MECE-Argumentgruppen

| Gruppe | Name | Slides | Logik-Typ | Zusammenfassung |
|---|---|---|---|---|
| G1 | Baustein 1 — Eigenes LLM (Machbarkeit) | 4–8 | Deduktiv | Kickoff-Rollen → Anforderungen/Leitplanken → Datenklassifizierung/Pilot-Use-Case → Vendor-Screening/Lizenzprüfung — jede Stufe hängt laut Quelldokument explizit von der vorherigen ab. |
| G2 | Baustein 2 — Ramp-up KI-Automatisierung (Discovery) | 9–11 | Deduktiv | Scope/Bereichsliste → Interviews/Prozessprüfung → Use-Case-Longlist — ebenfalls eine abhängige Kette, kein austauschbarer Reihenfolge. |
| G3 | Governance: Commitments, Risiko, Entscheidung | 12–14 | Induktiv | Drei eigenständige, nebeneinanderstehende Aussagen (wer liefert was / wo liegt das größte Terminrisiko / was genau wird am Checkpoint entschieden) — keine der drei folgt kausal aus einer anderen, alle drei stützen gemeinsam die Governing Thought. |

**MECE-Check:** G1 und G2 überschneiden sich nicht — sie sind die beiden im Quelldokument selbst
getrennt geführten Bausteine, mit expliziter Fußnote, dass die Setup-Arbeitspakete (Kickoff,
Anforderungserhebung, Risiko-Log) bereits einmalig in G1 behandelt und für beide Bausteine gültig
sind. G3 überschneidet sich nicht mit G1/G2, weil sie ausschließlich bausteinübergreifende
Governance-Fragen behandelt (Rollen/Commitments, Kapazität, Checkpoint-Entscheidung), nicht
fachliche Inhalte einzelner Bausteine. Vollständigkeit: G1+G2 decken den fachlichen Inhalt beider
Bausteine ab, G3 deckt die Steuerungsdimension ab, die für den Erfolg beider Bausteine
gleichermaßen entscheidend ist — keine erkennbare vierte Kategorie fehlt.

## SCQA-Opening (Slides 1–3)

- **Situation, Teil 1** (Slide 1): RIEDEL startet mit MGIM die Initialisierungsphase — zwei
  parallele Bausteine, Kickoff 21.–22.9., Checkpoint 1 Mitte November.
- **Situation, Teil 2 — Big Picture** (Slide 2, neu): Das Gesamtprojekt hat drei Phasen —
  Feasibility (Baustein 1) und Ramp-up (Baustein 2) laufen jetzt parallel in der
  Initialisierungsphase, Umsetzung folgt als eigene, spätere Phase erst nach der
  Checkpoint-1-Entscheidung. Die Initialisierungsphase klärt bewusst nur Setup und Beteiligte —
  wie wird aufgesetzt, wer aus dem Unternehmen muss integriert werden — nicht bereits die
  Umsetzung selbst. Diese Einordnung verhindert die Fehlerwartung, der Kickoff sei bereits der
  Start der Umsetzung.
- **Complication** (Slide 3, erster Teil): Beide Bausteine sind technisch und operativ anspruchsvoll,
  laufen parallel und hängen an klaren gegenseitigen Commitments — bei einem Einzelberater
  entsteht dadurch reales Termin- und Kapazitätsrisiko, nicht nur ein Ressourcen-Nice-to-have.
- **Question** (Slide 3, zweiter Teil): Wie stellen wir sicher, dass der Checkpoint am 13.11. eine
  fundierte Entscheidung ermöglicht statt eines vagen Zwischenstands?
- **Answer** (Slide 3, dritter Teil): Die Governing Thought — feste Abhängigkeitskette je Baustein,
  beidseitig fixierte Commitments, ein einziger klar definierter Checkpoint als Ziel der gesamten
  Phase.

## Vertikale Konsistenzprüfung

- Opening: Slide 2 beweist die "Big Picture"-Aussage direkt mit der im Quelldokument selbst
  angelegten Baustein-Struktur und der dort explizit genannten Kickoff-Kernfrage (Rollen/Scope).
- G1: Jede Slide (4–8) behandelt genau eine Stufe der im Quelldokument selbst benannten
  Abhängigkeitskette für Baustein 1 — geprüft gegen die "Abhängigkeit"-Spalte der Detailplanung.
- G2: Jede Slide (9–11) behandelt genau eine Stufe der Discovery-Kette für Baustein 2 — ebenfalls
  gegen die "Abhängigkeit"-Spalte geprüft.
- G3: Slide 12 beweist die Commitment-Aussage mit den tatsächlichen Liefergegenständen beider
  Seiten aus dem Quelldokument; Slide 13 beweist die Risiko-Aussage mit dem im Quelldokument
  selbst benannten Kapazitätshinweis (Woche 6.10.–24.10., vier parallele Stränge) plus den drei
  dort bereits genannten Entzerrungsoptionen; Slide 14 beweist die Entscheidungs-Aussage mit den im
  Quelldokument benannten Checkpoint-1-Kriterien für beide Bausteine.

## Slide Index

| slide_id | working headline | slide role in arc | type (Phase 5) |
|---|---|---|---|
| 1 | RIEDEL startet mit MGIM die Initialisierungsphase für eigenes LLM und KI-Automatisierung | Opening — SCQA Situation | |
| 2 | Die Initialisierungsphase klärt Setup und Beteiligte — Umsetzung startet erst nach der Checkpoint-1-Entscheidung | Opening — SCQA Situation (Big Picture / 3 Projektphasen) | |
| 3 | Nur mit festen Commitments auf beiden Seiten liefert der Checkpoint am 13.11. eine fundierte Entscheidung | Opening — SCQA Complication/Question/Answer | |
| 4 | Baustein 1 führt in sechs abhängigen Schritten vom Kickoff zur ersten Modell- und Lizenzentscheidung | G1 — Fahrplan-Übersicht (Was/Wer/Wann/Ergebnis) | |
| 5 | "Eigenes LLM" heißt Open-Weight-Modell plus RAG und Fine-Tuning — kein Training from Scratch | G1 — Begriffsklärung | |
| 6 | Erst eine gemeinsame Fakten- und Leitplankenbasis macht spätere Architekturentscheidungen belastbar | G1 — Anforderungen & Leitplanken | |
| 7 | Datenklassifizierung und Pilot-Use-Case-Wahl entscheiden parallel, was technisch überhaupt zulässig und sinnvoll ist | G1 — Datenklassifizierung & Pilot-Use-Case | |
| 8 | Modellwahl und Lizenzprüfung laufen bewusst getrennt von der Technologiebegeisterung — Screening vor Festlegung | G1 — Vendor-Screening & Lizenzprüfung | |
| 9 | Baustein 2 macht die Discovery in drei abhängigen Schritten von der Bereichsliste bis zur Use-Case-Longlist steuerbar | G2 — Fahrplan-Übersicht | |
| 10 | Strukturierte Interviews mit Prozessverantwortlichen holen Pain Points direkt an der Quelle statt aus Annahmen | G2 — Interviews & Prozessprüfung | |
| 11 | Opportunity Scoring nach Wirkung, Automatisierbarkeit und Datenverfügbarkeit macht die Fokusauswahl objektiv | G2 — Use-Case-Longlist & Scoring-Framework | |
| 12 | Der Fahrplan funktioniert nur mit klar verteilten Commitments auf beiden Seiten — nicht nur MGIM liefert | G3 — Rollen & Commitments | |
| 13 | Ihre Interviews kollidieren mit zwei kritischen Baustein-1-Arbeiten — das entschärfen wir jetzt gemeinsam, nicht erst im Oktober | G3 — Kapazitätsrisiko | |
| 14 | Checkpoint 1 Mitte November ist der einzige Punkt, an dem gemeinsam über Fortsetzung, Anpassung oder Abbruch entschieden wird | G3 — Checkpoint als Entscheidungspunkt | |
| 15 | Der Kickoff selbst ist der erste Commitment-Moment — Rollen und Ansprechpartner müssen bis Kickoff-Ende stehen | Closing — Call to Action | |

## Per-Slide Detail

## Slide 1: RIEDEL startet mit MGIM die Initialisierungsphase für eigenes LLM und KI-Automatisierung
- **core_message:** Der Kickoff markiert den offiziellen Start einer fünfmonatigen, in zwei
  Bausteine gegliederten Initialisierungsphase mit einem festen Zieltermin (Checkpoint 1).
- **role_in_arc:** Opening hook / SCQA Situation.
- **argument_group:** opening.

## Slide 2: Die Initialisierungsphase klärt Setup und Beteiligte — Umsetzung startet erst nach der Checkpoint-1-Entscheidung
- **core_message:** Das Gesamtprojekt hat drei Phasen (Feasibility, Ramp-up, Umsetzung); Feasibility
  und Ramp-up laufen jetzt parallel und klären ausschließlich Setup/Rollen — die eigentliche
  Umsetzung ist eine eigene, spätere Phase, deren Scope erst am Checkpoint 1 feststeht.
- **role_in_arc:** SCQA Situation, Teil 2 — Big-Picture-Einordnung vor der Complication.
- **argument_group:** opening.

## Slide 3: Nur mit festen Commitments auf beiden Seiten liefert der Checkpoint am 13.11. eine fundierte Entscheidung
- **core_message:** Beide Bausteine sind anspruchsvoll und parallel — die Governing Thought ist
  die Antwort darauf, wie die Phase trotzdem zu einer belastbaren Entscheidung führt.
- **role_in_arc:** SCQA Complication → Question → Answer; trägt die Governing Thought.
- **argument_group:** opening.

## Slide 4: Baustein 1 führt in sechs abhängigen Schritten vom Kickoff zur ersten Modell- und Lizenzentscheidung
- **core_message:** Baustein 1 ist keine offene Explorationsphase, sondern eine feste
  Abhängigkeitskette mit einem klaren Endpunkt am Checkpoint.
- **role_in_arc:** G1 — Übersicht/Landkarte für die folgenden Detail-Slides.
- **argument_group:** G1.
- **Design-Hinweis (nach Rückmeldung):** tabellarisch als Was/Wer/Wann/Ergebnis, nicht als
  Prozessgrafik — siehe Content Package.

## Slide 5: "Eigenes LLM" heißt Open-Weight-Modell plus RAG und Fine-Tuning — kein Training from Scratch
- **core_message:** Der Scope-Begriff wird früh geklärt, um Erwartungen an Umfang, Kosten und
  Zeitrahmen bereits beim Kickoff realistisch zu setzen.
- **role_in_arc:** G1 — definitorische Brücke vor der eigentlichen Ablaufdetail-Sequenz.
- **argument_group:** G1.

## Slide 6: Erst eine gemeinsame Fakten- und Leitplankenbasis macht spätere Architekturentscheidungen belastbar
- **core_message:** Anforderungserhebung und KI-Leitplanken-Entwurf sind die Voraussetzung für
  jede spätere technische Entscheidung — nicht optionale Nebenschritte.
- **role_in_arc:** G1 — Schritt 2 der Abhängigkeitskette.
- **argument_group:** G1.

## Slide 7: Datenklassifizierung und Pilot-Use-Case-Wahl entscheiden parallel, was technisch überhaupt zulässig und sinnvoll ist
- **core_message:** Diese beiden parallel laufenden Arbeitspakete verhindern eine abstrakte
  Technologiediskussion ohne Datenbasis oder greifbaren Anwendungsfall.
- **role_in_arc:** G1 — Schritt 3 der Abhängigkeitskette.
- **argument_group:** G1.

## Slide 8: Modellwahl und Lizenzprüfung laufen bewusst getrennt von der Technologiebegeisterung — Screening vor Festlegung
- **core_message:** Markt-/Vendor-Screening und die lizenzrechtliche Prüfung sind Checkpoint-Kriterium,
  weil Open-Weight nicht automatisch lizenzfreie Nutzung bedeutet.
- **role_in_arc:** G1 — Schritt 4/Abschluss der Abhängigkeitskette, mündet in Checkpoint 1.
- **argument_group:** G1.

## Slide 9: Baustein 2 macht die Discovery in drei abhängigen Schritten von der Bereichsliste bis zur Use-Case-Longlist steuerbar
- **core_message:** Auch die Ramp-up-Phase ist eine feste Kette, kein offener Discovery-Prozess
  ohne Endpunkt.
- **role_in_arc:** G2 — Übersicht/Landkarte für die folgenden Detail-Slides.
- **argument_group:** G2.

## Slide 10: Strukturierte Interviews mit Prozessverantwortlichen holen Pain Points direkt an der Quelle statt aus Annahmen
- **core_message:** Interview-Vorbereitung und -Durchführung sichern eine belastbare, vergleichbare
  Faktenbasis statt Ad-hoc-Eindrücken.
- **role_in_arc:** G2 — Schritt 2 der Abhängigkeitskette.
- **argument_group:** G2.

## Slide 11: Opportunity Scoring nach Wirkung, Automatisierbarkeit und Datenverfügbarkeit macht die Fokusauswahl objektiv
- **core_message:** Die Use-Case-Longlist wird nach einem festen, dreidimensionalen Kriterienraster
  bewertet, bevor am Checkpoint ein Fokusbereich ausgewählt wird — noch ohne konkrete Scores, da
  diese erst im Projektverlauf entstehen.
- **role_in_arc:** G2 — Schritt 3/Abschluss der Abhängigkeitskette, mündet in Checkpoint 1.
- **argument_group:** G2.

## Slide 12: Der Fahrplan funktioniert nur mit klar verteilten Commitments auf beiden Seiten — nicht nur MGIM liefert
- **core_message:** Jedes Arbeitspaket hat eine Gegenleistung von RIEDEL-Seite (Ansprechpartner,
  Dokumentation, Entscheidungen, Teilnahme) — der Fahrplan ist eine gemeinsame Verpflichtung.
- **role_in_arc:** G3 — erste unabhängige Governance-Aussage.
- **argument_group:** G3.

## Slide 13: Ihre Interviews kollidieren mit zwei kritischen Baustein-1-Arbeiten — das entschärfen wir jetzt gemeinsam, nicht erst im Oktober
- **core_message:** Das Kapazitätsrisiko in der Woche 6.10.–24.10. betrifft RIEDELs eigene
  Fachbereiche direkt und ist bereits jetzt mit drei Entzerrungsoptionen aktiv gemanagt, nicht
  erst nachträglich entdeckt.
- **role_in_arc:** G3 — zweite unabhängige Governance-Aussage.
- **argument_group:** G3.

## Slide 14: Mehrere laufende Entscheidungen bündeln sich am Checkpoint 1 zu einer gemeinsamen Fortsetzungsentscheidung
- **core_message:** Checkpoint 1 bündelt mehrere bereits im Fahrplan laufende Entscheidungspunkte
  beider Bausteine zu einer einzigen, gut vorbereiteten Fortsetzungsentscheidung — das eigentliche
  Ziel der gesamten Phase, nicht das einzige Governance-Ereignis der Phase.
- **role_in_arc:** G3 — dritte unabhängige Governance-Aussage, Kulmination der Argumentation.
- **argument_group:** G3.

## Slide 15: Der Kickoff gelingt am besten mit Ihrer Einschätzung, wer aus dem Unternehmen eingebunden werden sollte
- **core_message:** Der unmittelbare nächste Schritt ist konkret und terminiert, formuliert als
  Bitte um Mitwirkung statt als Vorgabe, und schließt mit einer offenen Frage nach der Expertise
  des CTO.
- **role_in_arc:** Closing / Call to Action.
- **argument_group:** closing.
