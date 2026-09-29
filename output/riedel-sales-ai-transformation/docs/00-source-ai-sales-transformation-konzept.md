# Quelle: RIEDEL_AI_Sales_Transformation_Konzept.docx (hochgeladen von Markus Goetz, 29.9.2026)

Vollständiges Konzeptdokument "RIEDEL Networks — AI Sales Transformation, Konzept und Roadmap",
Entscheidungsvorlage für die CEO RIEDEL Networks, Version 1.0, erstellt von MGIM. Neun Abschnitte:
Executive Summary, Ausgangslage, KI-Use-Cases im RIEDEL-Vertrieb (5 Bausteine), Priorisierte
Use-Case-Matrix, Roadmap (3 Phasen), Angrenzende Bereiche/Ausblick, Governance und Leitplanken,
Offene Fragen und Abhängigkeiten, Nächste Schritte.

Dieses Dokument ist die zweite, übergeordnete Quelle neben `00-source-lead-analyse-konzept.md`
(die Lead-Analyse ist Baustein 3.1 dieses Gesamtkonzepts und liegt dort bereits im Detail vor).

## Fünf KI-Bausteine (Abschnitt 3)

1. **Lead-Analyse und Gesprächsvorbereitung** — Status: Pilotkonzept ausgearbeitet. Multi-Agent-
   System (Orchestrator + Lead Research/Pain Analysis/Business Window/Conversation Preparation
   Agent) in Microsoft Copilot Studio. Nutzen: weniger Recherchezeit, konsistentere Vorbereitung,
   bessere Nutzung freigegebenen Vertriebswissens.
2. **Sales-Kalkulationen** — Status: Konzeptphase. Drei Formulare heute ohne automatisierten
   Abgleich: Bid Sheet (EK-Preise vom Bid Management), Angebotssheet (Kundenpreise/Konditionen),
   Kundenbedarfsliste (Kundenanforderungen). KI-Ansatz: intelligenter Abgleich aller drei
   Dokumente, automatische Margenberechnung, Plausibilitätsprüfung, Produktzuordnungsvorschläge,
   Abweichungserkennung. Nutzen: drastisch weniger manuelle Abgleicharbeit, weniger
   Preisübertragungsfehler, schnellere Angebotserstellung.
3. **Vertragsmanagement** — Status: Konzeptphase. Drei Teilbereiche: (a) Vertragsausarbeitung/
   -bearbeitung aus Standardvorlagen mit automatischer Befüllung und Versionsverwaltung, (b)
   KI-gestützte Prüfung von Kundenkommentaren/Redlines (akzeptabel/verhandelbar/kritisch,
   Eskalationsempfehlung), (c) Proof-of-Concept-Vereinbarungen (standardisierte Vorlagen,
   Vollständigkeits-/Konsistenzprüfung). Nutzen: schnellere Vertragserstellung,
   Risikominimierung, konsistentere Vertragsqualität.
4. **Bid Management** — Status: Konzeptphase. Strukturierte Bedarfsanalyse aus Gesprächsnotizen,
   automatische Angebotsvorlagen-Befüllung, Vergleich mit historischen Angeboten (gewonnen/
   verloren) für Erfolgswahrscheinlichkeit, Statusverfolgung mit Follow-up-Empfehlungen. Nutzen:
   kürzere Durchlaufzeiten, bessere Nachverfolgung, Lernen aus vergangenen Ergebnissen.
5. **Sales-Listenmanagement** — Status: Konzeptphase. Zentrale KI-überwachte Listenverwaltung
   (Deals-Liste, Kundenlisten, Bedarfslisten, Preislisten, Statusübersichten) mit
   Dublettenprüfung, intelligenten Status-Updates, Listenabgleich, Anomalie-Erkennung. Nutzen:
   zuverlässigere Datenbasis, weniger Pflegeaufwand, einheitliche Sicht auf den Vertriebsstatus.

## Priorisierte Use-Case-Matrix (Abschnitt 4)

| Use Case | Umsatzwirkung | Umsetzbarkeit | Dringlichkeit | Empfehlung |
|---|---|---|---|---|
| Lead-Analyse | Hoch | Hoch | Hoch | Pilot (Konzept liegt vor) |
| Kalkulationen | Hoch | Hoch | Hoch | Quick Win |
| Listenmanagement | Mittel | Hoch | Mittel | Quick Win |
| Bid Management | Hoch | Mittel | Hoch | Phase 2 |
| Vertragsmanagement | Mittel | Mittel | Mittel | Phase 2 |
| Pre-Sales | Mittel | Hoch | Niedrig | Ausblick |
| Customer Success | Hoch | Niedrig* | Niedrig | Ausblick |
| Sales Reporting | Niedrig | Hoch | Niedrig | Ausblick |

*Customer Success: CRM-Abhängigkeit — erst nach CRM-Klärung vollständig umsetzbar.

## Roadmap (Abschnitt 5)

- **Phase 1 — Quick Wins & Piloten (Q4 2026–Q1 2027):** Lead-Analyse-Pilot (Stufenmodell 0–2,
  Go/No-Go), Kalkulationen-Prototyp (Ist-Prozess dokumentieren, KI-Abgleich prototypisieren),
  Listenmanagement-Pilot (Deals-Liste zuerst). Querschnittsaufgaben: CRM-Entscheidung vorbereiten/
  treffen, interne Sales-Wissensbasis aufbauen, Datenschutz-/Governance-Rahmen definieren,
  Microsoft-Tenant/Lizenzen klären.
- **Phase 2 — Ausbau & Integration (Q2–Q3 2027):** Bid Management aufbauen, Vertragsmanagement
  implementieren, Kalkulationen-Prototyp in Produktion überführen, Lead-Analyse bei Erfolg
  skalieren + CRM-Anbindung prüfen, CRM-Integration für alle Use Cases vorbereiten.
- **Phase 3 — Strategische Erweiterung (ab Q4 2027):** Pre-Sales (Lösungsvorschläge,
  Wettbewerbsanalysen), Customer Success (Upsell, Renewal), Sales Reporting (Pipeline-/Forecast-
  Automatisierung), durchgängige CRM-Integration.

## Governance und Leitplanken (Abschnitt 7)

Fünf Grundprinzipien: Mensch bleibt verantwortlich (KI unterstützt, entscheidet nicht);
Transparenz (Quellen/Unsicherheiten/Annahmen sichtbar); stufenweise Einführung (Pilot vor
Rollout, Messung vor Skalierung); Datenschutz by Design; keine Preis-/Vertragszusagen durch KI
ohne menschliche Freigabe.

Fünf Rollen: Business Owner (Sales) — Priorisierung/Prozess/Abnahme/Nutzenbewertung; AI/IT-
Verantwortung — Plattform/Lizenzen/Konnektoren/Monitoring/Kosten; Sales-Knowledge Owner —
Freigabe/Aktualität von Vertriebswissen; Security/Datenschutz — Datenzugriff/Zweckbindung/DLP/
Compliance; Pilotnutzer/Sales — Prüfung/Feedback/Fehlermeldung/Kundennutzungs-Entscheidung.

## Offene Fragen und Abhängigkeiten (Abschnitt 8)

CRM-System (welches, wann — betrifft Lead Mgmt/Customer Success/Reporting); Microsoft-Lizenzen
(Copilot Studio/Power Automate/SharePoint-Berechtigungen — technische Voraussetzung für alle Use
Cases); Datenschutz/DSFA (welche Daten, Rechtsgrundlage — Freigabevoraussetzung je Pilot);
Sales-Wissensbasis (existiert kuratierte, aktuelle Basis? — bestimmt KI-Output-Qualität direkt);
Deals-Liste/Kalkulationen (Detailstruktur der drei Formulare, EK-Preis-Datenquellen — bestimmt
Architektur); Vertragsvorlagen (welche existieren, wer gibt frei — bestimmt Scope).

## Nächste Schritte (Abschnitt 9)

1. Lead-Analyse-Pilot freigeben: Business Owner + technischen Co-Owner benennen, Validierungsphase
   starten.
2. Kalkulationsprozess dokumentieren: Ist-Ablauf der drei Formulare aufnehmen, KI-Prototyp planen.
3. CRM-Entscheidung vorantreiben: Anforderungen aus den Use Cases als Input nutzen.
4. Governance-Rahmen definieren: Datenschutz, Rollen, Freigabeprozesse für KI im Vertrieb.
5. Sales-Wissensbasis aufbauen: freigegebene Positionierung, Leistungen, Proof Cases kuratieren.

*Grundlage/Annahmen laut Dokument: basiert auf der Projektarbeit mit RIEDEL Networks (Stand
September 2026); alle Use Cases, Priorisierungen und Zeitangaben sind Empfehlungen, die der
Abstimmung/Freigabe durch die RIEDEL-Geschäftsführung bedürfen.*
