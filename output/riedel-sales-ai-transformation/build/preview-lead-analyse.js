// RIEDEL Networks — AI Sales Transformation Plan — Slide: KI-gestützte Lead-Analyse.
// Revision 2 (per Markus Goetz): dropped the orchestration/multi-agent-system framing —
// the CEO doesn't care how the agents are wired together. Replaced with a sales-facing
// explanation of what each of the four analysis agents does and what it saves/improves.
// Keeps the user's own direct edits to the Ziel/Vorgehen/Entscheidung cards (headers renamed,
// David Hofacker named as Business Owner, wording tightened).
// Content grounded in docs/00-source-lead-analyse-konzept.md.

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
const CONTENT_TOP = 1.55;

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

const slide = pres.addSlide();
slide.background = { color: C.white };
addHeaderBar(slide, ShapeType);

addHeadline(slide, 'Pilot: Vier KI-Agenten entlasten die Lead-Vorbereitung im Sales —\nkeine automatisierte Kundenansprache', { fontSize: 22 });

// ---- Four agent cards: what each does for Sales, and what it saves/improves ----
// (Orchestrator and Dokument-Flow deliberately left out — plumbing, not a sales-facing capability.)
const agents = [
  {
    name: 'Lead Research Agent',
    task: 'Erstellt automatisch ein Unternehmensprofil aus geprüften öffentlichen Quellen.',
    benefit: 'Keine manuelle Recherche mehr vor dem Erstgespräch — sofort einsatzbereiter Kontext.',
  },
  {
    name: 'Pain Analysis Agent',
    task: 'Leitet die drei wahrscheinlichsten Kundenherausforderungen ab.',
    benefit: 'Vertrieb geht mit einer fundierten These statt Standardfragen ins Gespräch.',
  },
  {
    name: 'Business Window Agent',
    task: 'Verknüpft die Kundenherausforderungen mit passendem RIEDEL-Leistungswissen.',
    benefit: 'Passgenaue Positionierung statt generischem Pitch — höhere Glaubwürdigkeit.',
  },
  {
    name: 'Conversation Preparation Agent',
    task: 'Erstellt einen fertigen Gesprächsleitfaden mit Fragen, Positionierung und Proof Cases.',
    benefit: 'Strukturiert und selbstbewusst ins Gespräch statt improvisiert.',
  },
];
const agentGap = 0.2;
const agentW = (CONTENT_W - 3 * agentGap) / 4;
const agentY = CONTENT_TOP, agentH = 2.2;
agents.forEach((a, i) => {
  const x = CONTENT_X + i * (agentW + agentGap);
  slide.addShape(ShapeType.rect, { x, y: agentY, w: agentW, h: agentH, fill: { color: C.offwht }, line: { color: C.ltgrey, width: 1 } });
  slide.addShape(ShapeType.rect, { x, y: agentY, w: agentW, h: 0.55, fill: { color: C.blue }, line: { color: C.blue } });
  slide.addText(a.name, {
    x: x + 0.12, y: agentY, w: agentW - 0.24, h: 0.55, fontSize: 11, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.0,
  });
  slide.addText(
    [
      { text: 'Aufgabe: ', options: { bold: true, color: C.grey, breakLine: false } },
      { text: a.task, options: { color: C.black, breakLine: true } },
      { text: '\n', options: { breakLine: true } },
      { text: 'Nutzen: ', options: { bold: true, color: C.grey, breakLine: false } },
      { text: a.benefit, options: { color: C.black } },
    ],
    {
      x: x + 0.14, y: agentY + 0.68, w: agentW - 0.28, h: agentH - 0.8, fontSize: 9.5, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    }
  );
});

// ---- Three cards: Ziel / Vorgehen / Entscheidung (as edited by Markus Goetz) ----
const colGap = 0.25;
const colW = (CONTENT_W - 2 * colGap) / 3;
const colX = [CONTENT_X, CONTENT_X + colW + colGap, CONTENT_X + 2 * (colW + colGap)];
const cardY = agentY + agentH + 0.25, headerH = 0.45, cardH = 2.15;

function card(x, title, headerColor, items, footnote) {
  slide.addShape(ShapeType.rect, { x, y: cardY, w: colW, h: cardH, fill: { color: C.offwht }, line: { color: C.ltgrey, width: 1 } });
  slide.addShape(ShapeType.rect, { x, y: cardY, w: colW, h: headerH, fill: { color: headerColor }, line: { color: headerColor } });
  slide.addText(title, {
    x: x + 0.15, y: cardY, w: colW - 0.3, h: headerH, fontSize: 12.5, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
  });
  addBulletBlock(slide, items, x + 0.2, cardY + headerH + 0.1, colW - 0.4, cardH - headerH - (footnote ? 0.5 : 0.15), { fontSize: 9.5 });
  if (footnote) {
    slide.addText(footnote, {
      x: x + 0.2, y: cardY + cardH - 0.38, w: colW - 0.4, h: 0.32, fontSize: 8, italic: true, color: C.midgrey,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    });
  }
}

card(colX[0], 'Ziel', C.grey, [
  'Weniger manuelle Recherche vor Kundengesprächen',
  'Konsistentere, quellenbasierte Vorbereitung',
  'Bessere Relevanz durch Verknüpfung mit freigegebenem Leistungswissen',
  'Wiederverwendbares, strukturiertes Vertriebswissen',
], 'Zu testende Hypothesen — keine belegten Produktivitäts- oder Umsatzeffekte.');

card(colX[1], 'Vorgehen', C.grey, [
  'Jede Phase liefert Status (SUCCESS/PARTIAL/FAILED) — Stopp bei kritischem Fehler',
  'Quellen, Confidence und Lücken sichtbar',
  'Aussagen & Proof Cases nur aus freigegebener Wissensbasis',
  'Nutzer gibt jede Analyse vor Start frei — Kundenkontakt bleibt beim Menschen',
]);

card(colX[2], 'Entscheidung', C.blue, [
  'Use Case als begrenzten Pilot in den AI Sales Transformation Plan aufnehmen',
  'Business Owner (Sales) ist David Hofacker',
  'Validierungsphase freigeben',
  'Kein Rollout, keine CRM Integration vor dem Pilot Abschluss',
]);

// ---- Closing goal banner ----
addInsightBox(slide, ShapeType,
  'Weniger Zeit für Recherche, höhere Qualität im Kundenansatz — Ziel: mehr Abschlüsse mit weniger Aufwand.',
  CONTENT_X, cardY + cardH + 0.15, CONTENT_W, 0.45);

addFooter(slide);
slide.addNotes('Vier Agenten übernehmen die Vorbereitung, nicht das Kundengespräch selbst. Der Lead Research Agent erstellt automatisch ein Unternehmensprofil aus geprüften öffentlichen Quellen — die manuelle Recherche vor dem Erstgespräch entfällt. Der Pain Analysis Agent leitet daraus die drei wahrscheinlichsten Kundenherausforderungen ab, sodass der Vertrieb mit einer fundierten These statt Standardfragen ins Gespräch geht. Der Business Window Agent verknüpft diese Herausforderungen mit unserem freigegebenen Leistungswissen für eine passgenaue statt generische Positionierung. Und der Conversation Preparation Agent baut daraus einen fertigen Gesprächsleitfaden mit Fragen, Positionierung und passenden Referenzen. In Summe: weniger Zeit für Recherche, höhere Qualität im Kundenansatz, und das Ziel dahinter ist klar — mehr Abschlüsse mit weniger Aufwand. Das sind zunächst zu testende Hypothesen, keine belegten Effekte; deshalb schlagen wir einen begrenzten, sauber gemessenen Pilot vor, mit David Hofacker als Business Owner auf Sales-Seite, und ohne Rollout oder CRM-Integration vor dem Pilot-Abschluss. Quelle: Konzeptbaustein "KI-gestützte Lead-Analyse und Gesprächsvorbereitung" (Lead-Analyse-Multi-Agent-System, Microsoft Copilot Studio, v1.0), Stand 29.9.2026.');

const outPath = path.join(REPO_ROOT, 'output', 'riedel-sales-ai-transformation', 'preview-lead-analyse.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
