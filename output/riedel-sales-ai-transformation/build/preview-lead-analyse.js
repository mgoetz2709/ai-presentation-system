// RIEDEL Networks — AI Sales Transformation Plan — Slide: KI-gestützte Lead-Analyse.
// Standalone single-slide preview (per Markus Goetz: "nur diese eine Slide bauen"),
// not yet part of a full Storyline/Content Package for this project.
// Content grounded in docs/00-source-lead-analyse-konzept.md (Section 8 "Handoff für die
// separate CEO-Folie" of the uploaded concept document).

const path = require('path');
const pptxgen = require('pptxgenjs');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const { C, addHeaderBar, addFooter, addCard, addInsightBox } =
  require(path.join(REPO_ROOT, 'lib', 'pptx-helpers'));

const pres = new pptxgen();
pres.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
pres.layout = 'LAYOUT_WIDE';
const ShapeType = pres.ShapeType;

const CONTENT_X = 0.5;
const CONTENT_W = 12.33;
const HEADLINE_Y = 0.6;
const HEADLINE_H = 0.85;
const CONTENT_TOP = 1.6;

function addHeadline(slide, text, opts) {
  const o = opts || {};
  slide.addText(text, {
    x: CONTENT_X, y: HEADLINE_Y, w: CONTENT_W, h: HEADLINE_H,
    fontSize: o.fontSize || 22, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
  });
}

function addBulletBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(
    items.map((t, i) => ({ text: t, options: { color: o.color || C.black, bullet: { code: '2022' }, breakLine: i < items.length - 1 } })),
    {
      x, y, w, h, fontSize: o.fontSize || 11, color: o.color || C.black, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
      bullet: { code: '2022', indent: 14 },
    }
  );
}

function addConnector(slide, x, y, w) {
  slide.addShape(ShapeType.rect, { x, y, w, h: 0.025, fill: { color: C.midgrey }, line: { color: C.midgrey } });
}

const slide = pres.addSlide();
slide.background = { color: C.white };
addHeaderBar(slide, ShapeType);

addHeadline(slide, 'KI-gestützte Lead-Analyse bereitet Kundengespräche in sechs kontrollierten\nSchritten vor — als Pilot, nicht als automatisierte Kundenansprache', { fontSize: 21 });

slide.addText('Multi-Agenten-Ablauf in Microsoft Copilot Studio — ein Orchestrator führt vier fachliche Analyse-Agenten in fester Reihenfolge, ein Dokument-Flow liefert das Ergebnis', {
  x: CONTENT_X, y: CONTENT_TOP - 0.05, w: CONTENT_W, h: 0.3, fontSize: 10.5, italic: true, color: C.midgrey,
  fontFace: 'Arial', align: 'left', margin: 0,
});

// ---- Process flow: 6 steps, each labeled with its responsible agent ----
const steps = [
  ['Eingabe &\nFreigabe', 'Orchestrator'],
  ['Lead\nResearch', 'Research Agent'],
  ['Pain\nAnalysis', 'Pain Analysis Agent'],
  ['Business\nWindow', 'Business Window Agent'],
  ['Conversation\nPreparation', 'Conv.-Prep. Agent'],
  ['Dokument &\nAblage', 'Dokument-Flow'],
];
const stepGap = 0.18;
const stepW = (CONTENT_W - 5 * stepGap) / 6;
const stepY = CONTENT_TOP + 0.3, stepH = 1.15;
steps.forEach((s, i) => {
  const x = CONTENT_X + i * (stepW + stepGap);
  if (i > 0) addConnector(slide, x - stepGap, stepY + stepH / 2, stepGap);
  addCard(slide, ShapeType, x, stepY, stepW, stepH, C.blue, C.blue, 0.08);
  slide.addText(s[0], {
    x: x + 0.06, y: stepY + 0.1, w: stepW - 0.12, h: 0.7, fontSize: 10.5, bold: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05,
  });
  slide.addText(s[1], {
    x: x + 0.06, y: stepY + stepH - 0.38, w: stepW - 0.12, h: 0.32, fontSize: 8, italic: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });
});

// ---- Three cards: Wertversprechen (Hypothesen) / Kontrollen / CEO Ask ----
const colGap = 0.25;
const colW = (CONTENT_W - 2 * colGap) / 3;
const colX = [CONTENT_X, CONTENT_X + colW + colGap, CONTENT_X + 2 * (colW + colGap)];
const cardY = stepY + stepH + 0.3, headerH = 0.45, cardH = 2.5;

function card(x, title, headerColor, items, footnote) {
  slide.addShape(ShapeType.rect, { x, y: cardY, w: colW, h: cardH, fill: { color: C.offwht }, line: { color: C.ltgrey, width: 1 } });
  slide.addShape(ShapeType.rect, { x, y: cardY, w: colW, h: headerH, fill: { color: headerColor }, line: { color: headerColor } });
  slide.addText(title, {
    x: x + 0.15, y: cardY, w: colW - 0.3, h: headerH, fontSize: 12.5, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
  });
  addBulletBlock(slide, items, x + 0.2, cardY + headerH + 0.12, colW - 0.4, cardH - headerH - (footnote ? 0.55 : 0.2), { fontSize: 10 });
  if (footnote) {
    slide.addText(footnote, {
      x: x + 0.2, y: cardY + cardH - 0.4, w: colW - 0.4, h: 0.35, fontSize: 8.5, italic: true, color: C.midgrey,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    });
  }
}

card(colX[0], 'Wertversprechen', C.grey, [
  'Weniger manuelle Recherche vor Kundengesprächen',
  'Konsistentere, quellenbasierte Vorbereitung',
  'Bessere Relevanz durch Verknüpfung mit freigegebenem Leistungswissen',
  'Wiederverwendbares, strukturiertes Vertriebswissen',
], 'Zu testende Hypothesen — keine belegten Produktivitäts- oder Umsatzeffekte.');

card(colX[1], 'Kontrollen', C.grey, [
  'Jede Phase liefert Status (SUCCESS/PARTIAL/FAILED) — Stopp bei kritischem Fehler',
  'Quellen, Confidence und Lücken sichtbar',
  'Aussagen & Proof Cases nur aus freigegebener Wissensbasis',
  'Nutzer gibt jede Analyse vor Start frei — Kundenkontakt bleibt beim Menschen',
]);

card(colX[2], 'CEO Ask', C.blue, [
  'Use Case als begrenzten Pilot in den AI Sales Transformation Plan aufnehmen',
  'Business Owner (Sales) + technischen Co-Owner benennen',
  'Validierungsphase freigeben (Baseline, Datenquellen, Tenant/Lizenzen, Datenschutz)',
  'Kein Rollout, kein CRM-Rückschreiben vor dem Pilot-Gate',
]);

// ---- Measurement footnote bar ----
addInsightBox(slide, ShapeType,
  'Messung vor Rollout: Zeit, Nutzung/Adoption, Qualität, Prozessrobustheit, Kosten — keine ROI-/Umsatzkennzahlen vor Pilotmessung.',
  CONTENT_X, cardY + cardH + 0.15, CONTENT_W, 0.45);

slide.addText('Quelle: Konzeptbaustein "KI-gestützte Lead-Analyse und Gesprächsvorbereitung" (Lead-Analyse-Multi-Agent-System, Microsoft Copilot Studio, v1.0), Stand 29.9.2026.', {
  x: CONTENT_X, y: cardY + cardH + 0.65, w: CONTENT_W, h: 0.25, fontSize: 8, italic: true, color: C.midgrey,
  fontFace: 'Arial', align: 'left', margin: 0,
});

addFooter(slide);
slide.addNotes('Dieser Baustein ist der erste Use Case im AI Sales Transformation Plan: eine KI-gestützte Lead-Analyse und Gesprächsvorbereitung, umgesetzt als orchestrierter Multi-Agenten-Ablauf in Microsoft Copilot Studio. Ein Orchestrator nimmt die Lead-Daten entgegen und lässt den Nutzer sie vor jeder Recherche bestätigen. Vier fachliche Agenten arbeiten dann in fester Reihenfolge: Lead Research erstellt ein Unternehmensprofil aus zugelassenen Quellen, Pain Analysis leitet daraus mögliche Kundenherausforderungen als Hypothesen ab, Business Window verknüpft das mit unserem freigegebenen Leistungswissen, und Conversation Preparation baut daraus einen konkreten Gesprächsleitfaden. Ein Dokument-Flow legt das Ergebnis als Word-Dokument in SharePoint ab. Wichtig für die Einordnung: Das sind zu testende Nutzenhypothesen, keine belegten Effekte, und es gibt eingebaute Kontrollen — Status je Phase, Stopp bei kritischem Fehler, sichtbare Quellen und Lücken, und der Mensch bleibt für Kundenkontakt und finale Freigabe verantwortlich. Was ich von Ihnen heute brauche, ist keine Rollout-Entscheidung, sondern die Freigabe für einen begrenzten, sauber gemessenen Pilotversuch: ein Business Owner aus Sales, ein technischer Co-Owner, und die Freigabe der Validierungsphase. Ausdrücklich keine Freigabe für automatisches CRM-Rückschreiben oder flächendeckenden Rollout an dieser Stelle.');

const outPath = path.join(REPO_ROOT, 'output', 'riedel-sales-ai-transformation', 'preview-lead-analyse.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
