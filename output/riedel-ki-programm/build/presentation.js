// RIEDEL Networks — KI-Programm — PptxGenJS build script.
// 5 Folien: Folie 1 (Projektorganisation, bereits abgestimmt) + 4 Folien adaptiert aus dem
// Kunden-Rohentwurf "RN_KI_Programm.pptx" (dortige Folien 2-5; Folie 1 des Rohentwurfs entfällt).
// Auftrag: MGIM-CI, Formensprache der Projektorganisation-Folie (Karten mit Headerbar, gestrichelte
// Klammer-Wrapper, Status-Badges, Insight-Box) wird auf die vier neuen Folien übertragen -
// nicht umgekehrt. Inhalte aus dem Rohentwurf 1:1 übernommen, nur Darstellung/Struktur verbessert.

const path = require('path');
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const pptxgen = require(path.join(REPO_ROOT, 'node_modules', 'pptxgenjs'));
const { C, addHeaderBar, addFooter, addCard, addInsightBox } =
  require(path.join(REPO_ROOT, 'lib', 'pptx-helpers'));

const pres = new pptxgen();
pres.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
pres.layout = 'LAYOUT_WIDE';
const ShapeType = pres.ShapeType;

const CONTENT_X = 0.5;
const CONTENT_W = 12.33;

// ---- Shared helpers (Formensprache der Projektorganisation-Folie) ----

function addHeadline(slide, text, opts) {
  const o = opts || {};
  slide.addText(text, {
    x: CONTENT_X, y: 0.58, w: CONTENT_W, h: o.h || 0.8, fontSize: o.fontSize || 24, bold: true,
    color: C.grey, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    lineSpacingMultiple: 1.1, isTextBox: true,
  });
}

function addSubtitle(slide, text, y) {
  slide.addText(text, {
    x: CONTENT_X, y: y, w: CONTENT_W, h: 0.4, fontSize: 12.5, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
  });
}

// Small pill badge — status/phase tag, reused from the Sales-AI-Transformation deck's pattern.
function addBadge(slide, x, y, w, h, text, bg, textColor) {
  slide.addShape(ShapeType.roundRect, {
    x, y, w, h, fill: { color: bg }, line: { color: bg }, rectRadius: h / 2,
  });
  slide.addText(text, {
    x, y, w, h, fontSize: 10.5, bold: true, color: textColor || C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, isTextBox: true,
  });
}

// Card with colored header bar — the Block-1/2/3 pattern from the Projektorganisation slide.
function addHeaderCard(slide, x, y, w, h, headerColor, headerText, headerTextColor) {
  addCard(slide, ShapeType, x, y, w, h, C.white, C.midgrey, 0.08);
  slide.addShape(ShapeType.rect, { x, y, w, h: 0.5, fill: { color: headerColor }, line: { color: headerColor } });
  slide.addText(headerText, {
    x: x + 0.15, y, w: w - 0.3, h: 0.5, fontSize: 12, bold: true, color: headerTextColor || C.ltgrey,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, isTextBox: true,
  });
}

function addBulletBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(
    items.map((t, i) => ({ text: t, options: { color: o.color || C.black, bullet: { code: '2022' }, breakLine: i < items.length - 1 } })),
    {
      x, y, w, h, fontSize: o.fontSize || 12.5, color: o.color || C.black, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.25,
      bullet: { code: '2022', indent: 14 },
    }
  );
}

function addChecklistBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(
    items.map((t, i) => ({ text: `☐  ${t}`, options: { color: o.color || C.black, breakLine: i < items.length - 1 } })),
    {
      x, y, w, h, fontSize: o.fontSize || 11.5, color: o.color || C.black, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.3,
    }
  );
}

function addVArrow(slide, cx, y, h) {
  slide.addShape(ShapeType.rect, { x: cx - 0.015, y, w: 0.03, h, fill: { color: C.midgrey }, line: { color: C.midgrey } });
  slide.addShape(ShapeType.triangle, {
    x: cx - 0.09, y: y + h - 0.02, w: 0.18, h: 0.14, fill: { color: C.midgrey }, line: { color: C.midgrey }, flipV: true,
  });
}

function addHArrow(slide, x, cy, w) {
  slide.addShape(ShapeType.rect, { x, y: cy - 0.015, w, h: 0.03, fill: { color: C.blue }, line: { color: C.blue } });
  slide.addShape(ShapeType.triangle, {
    x: x + w - 0.02, y: cy - 0.09, w: 0.14, h: 0.18, fill: { color: C.blue }, line: { color: C.blue }, flipH: false,
  });
}

// ============================================================
// Folie 1 — Projektorganisation (bereits abgestimmt, unverändert übernommen)
// ============================================================
(function slide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Vier Umsetzungs-Streams: Drei Blöcke unter gemeinsamer Governance-Klammer,\nBlock 4 organisatorisch unabhängig');

  const bx = CONTENT_X, by = 1.55, bw = 8.5, bh = 4.55;
  slide.addShape(ShapeType.roundRect, {
    x: bx, y: by, w: bw, h: bh, fill: { color: C.offwht },
    line: { color: C.blue, width: 1.75, dashType: 'dash' }, rectRadius: 0.1,
  });
  const bannerH = 0.95;
  slide.addShape(ShapeType.roundRect, {
    x: bx + 0.2, y: by + 0.2, w: bw - 0.4, h: bannerH, fill: { color: C.blue }, line: { color: C.blue }, rectRadius: 0.08,
  });
  slide.addText(
    [
      { text: 'GOVERNANCE-KLAMMER  ·  Markus Götz\n', options: { bold: true, breakLine: true } },
      { text: 'Struktur · Planung · Fortschritt · orchestriertes Zusammenspiel der drei Blöcke', options: { bold: false } },
    ],
    {
      x: bx + 0.4, y: by + 0.2, w: bw - 0.8, h: bannerH, fontSize: 12.5, color: C.white,
      fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.2, isTextBox: true,
    }
  );

  const blocks = [
    { n: 1, name: 'Hardware', lead: 'Johannes' },
    { n: 2, name: 'Automatisierung', lead: 'Dirk' },
    { n: 3, name: 'AI as a Service', lead: 'Markus Götz' },
  ];
  const cardGap = 0.25;
  const cardY = by + bannerH + 0.4;
  const cardH = bh - bannerH - 0.6;
  const cardW = (bw - 0.4 - 2 * cardGap) / 3;
  blocks.forEach((b, i) => {
    const x = bx + 0.2 + i * (cardW + cardGap);
    addHeaderCard(slide, x, cardY, cardW, cardH, C.grey, `Block ${b.n}`);
    slide.addText(b.name, {
      x: x + 0.15, y: cardY + 0.65, w: cardW - 0.3, h: 0.65, fontSize: 15, bold: true, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1, isTextBox: true,
    });
    slide.addText(
      [{ text: 'Lead: ', options: { bold: true, color: C.grey, breakLine: false } }, { text: b.lead, options: { color: C.black } }],
      { x: x + 0.15, y: cardY + cardH - 0.55, w: cardW - 0.3, h: 0.4, fontSize: 12, fontFace: 'Arial', align: 'left', valign: 'bottom', margin: 0, isTextBox: true }
    );
  });

  const ix = bx + bw + 0.35, iw = CONTENT_X + CONTENT_W - ix;
  addCard(slide, ShapeType, ix, by, iw, bh, C.white, C.deepbl, 0.1);
  slide.addShape(ShapeType.rect, { x: ix, y: by, w: iw, h: 0.75, fill: { color: C.deepbl }, line: { color: C.deepbl } });
  slide.addText('Block 4', { x: ix + 0.2, y: by, w: iw - 0.4, h: 0.75, fontSize: 13, bold: true, color: C.ltgrey, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, isTextBox: true });
  slide.addText('Agentic AI', { x: ix + 0.2, y: by + 0.9, w: iw - 0.4, h: 0.55, fontSize: 18, bold: true, color: C.black, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true });
  slide.addText(
    [{ text: 'Lead / Governance: ', options: { bold: true, color: C.grey, breakLine: false } }, { text: 'Markus Götz', options: { color: C.black } }],
    { x: ix + 0.2, y: by + 1.55, w: iw - 0.4, h: 0.4, fontSize: 12.5, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true }
  );
  slide.addText('Organisatorisch unabhängig von Block 1–3', { x: ix + 0.2, y: by + 2.0, w: iw - 0.4, h: 0.4, fontSize: 11, italic: true, color: C.midgrey, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true });
  slide.addShape(ShapeType.rect, { x: ix + 0.2, y: by + 2.6, w: iw - 0.4, h: 0.02, fill: { color: C.ltgrey }, line: { color: C.ltgrey } });
  slide.addText('Erste Kunden:', { x: ix + 0.2, y: by + 2.75, w: iw - 0.4, h: 0.35, fontSize: 11.5, bold: true, color: C.grey, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true });
  slide.addText(
    [
      { text: 'David Hofacker', options: { bold: true, breakLine: true } },
      { text: 'Sales\n', options: { color: C.midgrey, fontSize: 10.5, breakLine: true } },
      { text: 'Mario Druschba', options: { bold: true, breakLine: true } },
      { text: 'NOC', options: { color: C.midgrey, fontSize: 10.5 } },
    ],
    { x: ix + 0.2, y: by + 3.15, w: iw - 0.4, h: bh - 3.3, fontSize: 13, color: C.black, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.25, isTextBox: true }
  );

  addInsightBox(slide, ShapeType,
    'Markus Götz verantwortet die Governance über alle vier Blöcke — Block 4 bleibt dabei bewusst organisatorisch unabhängig von der Klammer über Block 1–3.',
    CONTENT_X, by + bh + 0.2, CONTENT_W, 0.55);

  addFooter(slide);
  slide.addNotes('Vier Umsetzungs-Streams: Block 1-3 clustern unter einer gemeinsamen Governance-Klammer (Markus Götz: Struktur, Planung, Fortschritt, orchestriertes Zusammenspiel). Block 4 (Agentic AI) liegt ebenfalls in Markus Götz Governance, ist aber organisatorisch unabhängig.');
})();

// ============================================================
// Folie 2 — Drei Säulen (aus Rohentwurf Folie 2 "Main Pillars")
// ============================================================
(function slide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Drei Säulen tragen das KI-Programm — unterschiedliches Tempo, ein gemeinsames Ziel');
  addSubtitle(slide, 'Jede Säule startet mit einer Feasibility in Q4 2026 — Umsetzungstempo und Zielbild unterscheiden sich bewusst.', 1.4);

  const pillars = [
    {
      name: 'Agentic AI Copilot',
      items: ['Entwicklung individuell zugeschnittener KI-Agenten als Assistenten für unsere Mitarbeitenden'],
      badge: 'Schnell — erste Rollouts in Q4 2026',
      badgeColor: C.blue,
    },
    {
      name: 'Ringfenced LLM on Premise',
      items: ['Individueller On-Premise-Chatbot', 'Automatische Workflow-Unterstützung', 'Analysekapazität für große Datenmengen, z. B. komplexe Verträge'],
      badge: 'Mittelfristig — Feasibility Q4, bei positivem Ergebnis erste Resultate Q2 2027',
      badgeColor: C.midgrey,
    },
    {
      name: 'AI as a Service für Kunden',
      items: ['Verkauf von AI as a Service in einem mehrstufigen Angebot an mittelständische Unternehmen'],
      badge: 'Mittel- bis langfristig — Feasibility Q4, Lernphase Q1–Q3 2027, Vertriebsstart ab Q4 2027',
      badgeColor: C.deepbl,
    },
  ];

  const gap = 0.3;
  const cardY = 2.1, cardH = 4.3;
  const cardW = (CONTENT_W - 2 * gap) / 3;
  pillars.forEach((p, i) => {
    const x = CONTENT_X + i * (cardW + gap);
    addHeaderCard(slide, x, cardY, cardW, cardH, C.grey, `Säule ${i + 1}`);
    slide.addText(p.name, {
      x: x + 0.18, y: cardY + 0.65, w: cardW - 0.36, h: 0.85, fontSize: 15.5, bold: true, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1, isTextBox: true,
    });
    addBulletBlock(slide, p.items, x + 0.18, cardY + 1.55, cardW - 0.36, cardH - 2.3, { fontSize: 12 });
    addBadge(slide, x + 0.18, cardY + cardH - 0.65, cardW - 0.36, 0.5, p.badge, p.badgeColor);
  });

  addFooter(slide);
  slide.addNotes('Drei Säulen, drei unterschiedliche Geschwindigkeiten: Agentic AI Copilot ist am schnellsten umsetzbar und startet bereits in Q4 mit ersten Rollouts. Ringfenced LLM on Premise ist mittelfristig angelegt — Feasibility ab Q4, bei positivem Ergebnis erste Resultate im Q2 2027. AI as a Service für Kunden ist die am längsten laufende Säule: Feasibility ab Q4, Lernphase bis Q3 2027, Vertriebsstart ab Q4 2027.');
})();

// ============================================================
// Folie 3 — On-Premise-LLM-Plattform: Strategische Wachstumsoption
// (aus Rohentwurf Folie 3, von reinem Fließtext zu Struktur)
// ============================================================
(function slide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'On-Premise-LLM-Plattform: strategische Wachstumsoption');

  slide.addShape(ShapeType.roundRect, {
    x: CONTENT_X + CONTENT_W - 2.1, y: 0.62, w: 2.1, h: 0.4, fill: { color: C.black }, line: { color: C.black }, rectRadius: 0.06,
  });
  slide.addText('VERTRAULICH', {
    x: CONTENT_X + CONTENT_W - 2.1, y: 0.62, w: 2.1, h: 0.4, fontSize: 11, bold: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, charSpacing: 1, isTextBox: true,
  });

  const colY = 1.65, colGap = 0.3;
  const leftW = 5.6, rightW = CONTENT_W - leftW - colGap;
  const leftX = CONTENT_X, rightX = CONTENT_X + leftW + colGap;

  addHeaderCard(slide, leftX, colY, leftW, 2.5, C.grey, 'WARUM JETZT');
  addBulletBlock(slide, [
    'Wachsende Nachfrage nach souveränen, datengeschützten KI-Lösungen',
    'Natürliche Erweiterung unserer Infrastruktur und des weiteren Konzern-Ökosystems (inkl. tal.de)',
    'Potenzial für margenstarke, wiederkehrende Managed-Service-Umsätze',
  ], leftX + 0.2, colY + 0.65, leftW - 0.4, 1.75, { fontSize: 12.5 });

  addHeaderCard(slide, leftX, colY + 2.75, leftW, 1.8, C.grey, 'ZU VALIDIEREN');
  addChecklistBlock(slide, [
    'Marktnachfrage',
    'Zielkunden',
    'Betriebsmodell',
    'Capex / Opex',
  ], leftX + 0.2, colY + 2.75 + 0.6, leftW - 0.4, 1.1, { fontSize: 12 });

  addCard(slide, ShapeType, rightX, colY, rightW, 4.55, C.white, C.deepbl, 0.1);
  slide.addShape(ShapeType.rect, { x: rightX, y: colY, w: rightW, h: 0.55, fill: { color: C.deepbl }, line: { color: C.deepbl } });
  slide.addText('EMPFEHLUNG', {
    x: rightX + 0.2, y: colY, w: rightW - 0.4, h: 0.55, fontSize: 12.5, bold: true, color: C.ltgrey,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, isTextBox: true,
  });
  slide.addText('Feasibility-Studie und Business Case bis Q4 2026', {
    x: rightX + 0.25, y: colY + 0.75, w: rightW - 0.5, h: 0.9, fontSize: 15, bold: true, color: C.black,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2, isTextBox: true,
  });
  slide.addText('~80K €', {
    x: rightX + 0.25, y: colY + 1.85, w: rightW - 0.5, h: 0.95, fontSize: 40, bold: true, color: C.deepbl,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
  });
  slide.addText('Indikatives Validierungsbudget für externes Knowhow (AI-Expertin/-Experte zur Unterstützung der Feasibility)', {
    x: rightX + 0.25, y: colY + 2.85, w: rightW - 0.5, h: 1.1, fontSize: 11.5, color: C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2, isTextBox: true,
  });

  addFooter(slide);
  slide.addNotes('Die On-Premise-LLM-Plattform ist eine strategische Wachstumsoption, kein reines Infrastrukturprojekt. Drei Gründe sprechen dafür: wachsende Nachfrage nach souveränen Lösungen, die natürliche Nähe zu unserer bestehenden Infrastruktur und zum weiteren Konzern-Ökosystem inklusive tal.de, und das Potenzial für margenstarke, wiederkehrende Managed-Service-Umsätze. Vier Dinge müssen wir vor einer Entscheidung validieren: Marktnachfrage, Zielkunden, Betriebsmodell und Capex/Opex. Unsere Empfehlung: eine Feasibility-Studie und Business Case bis Q4 2026, mit einem indikativen Budget von rund 80.000 Euro für externes Knowhow. Diese Folie ist vertraulich.');
})();

// ============================================================
// Folie 4 — KI an der Datendrehscheibe (aus Rohentwurf Folie 4, Look & Feel verbessert)
// ============================================================
(function slide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'KI an der Datendrehscheibe');
  addSubtitle(slide, 'Die KI läuft im eigenen Netz und hängt an genau einer Stelle an der Automatisierung, die wir ohnehin bauen.', 1.35);

  // Vertical budget: content area runs from y=1.85 (below subtitle) to y=6.75 (above footer at
  // 6.9) — every block below is sized to fit inside that 4.9in without crossing either edge.
  const layerX = CONTENT_X, layerW = 3.55;
  const layerGap = 0.2, layerH = 1.0;
  const layerY0 = 1.95;
  addBadge(slide, layerX, layerY0 - 0.38, layerW, 0.3, 'KI-PLATTFORM — PLANUNG', C.deepbl);

  const layers = [
    { roman: 'I', name: 'Dialog für alle', time: 'SEKUNDEN', detail: 'Fragen im Browser · Rollen nach Abteilungen · Chat-Oberfläche' },
    { roman: 'II', name: 'Agenten & Workflows', time: 'LAUFEND', detail: 'Arbeiten im Prozess mit, nicht auf Zuruf · n8n Business-Automation' },
    { roman: 'III', name: 'Schwere Modelle', time: 'MINUTEN', detail: 'Große Analysen, Massenverarbeitung · eigene GPU-Hardware im Haus' },
  ];
  layers.forEach((l, i) => {
    const y = layerY0 + i * (layerH + layerGap);
    addHeaderCard(slide, layerX, y, layerW, layerH, C.grey, `${l.roman}  ·  ${l.time}`);
    slide.addText(
      [
        { text: l.name, options: { bold: true, fontSize: 12.5, color: C.black, breakLine: true } },
        { text: l.detail, options: { fontSize: 8.5, color: C.midgrey } },
      ],
      {
        x: layerX + 0.15, y: y + 0.56, w: layerW - 0.3, h: layerH - 0.62, fontFace: 'Arial',
        align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15, isTextBox: true,
      }
    );
    if (i < layers.length - 1) addVArrow(slide, layerX + layerW / 2, y + layerH + 0.02, layerGap - 0.04);
  });
  const layerBottom = layerY0 + 3 * layerH + 2 * layerGap; // = 1.95 + 3.4 = 5.35

  // Hub + Fachsysteme column, vertically centered on Layer II (the only transition point).
  const hubX = layerX + layerW + 0.8, hubW = 2.7;
  const layerIICenterY = layerY0 + layerH + layerGap + layerH / 2; // 3.65
  const hubH = 1.2, hubY = layerIICenterY - hubH / 2;
  addBadge(slide, hubX, layerY0 - 0.38, CONTENT_X + CONTENT_W - hubX, 0.3, 'AUTOMATION — AUFBAU', C.blue);

  addHArrow(slide, layerX + layerW + 0.08, layerIICenterY, 0.5);
  slide.addText('der einzige\nÜbergang', {
    x: layerX + layerW + 0.05, y: layerIICenterY - 0.42, w: 0.75, h: 0.4, fontSize: 7.5, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'center', valign: 'bottom', margin: 0, lineSpacingMultiple: 1.05, isTextBox: true,
  });
  addHeaderCard(slide, hubX, hubY, hubW, hubH, C.blue, 'Integrationsplattform', C.white);
  slide.addText('Camel K auf Kubernetes', {
    x: hubX + 0.15, y: hubY + 0.58, w: hubW - 0.3, h: 0.28, fontSize: 10.5, bold: true, color: C.black,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
  });
  slide.addText('Eine Drehscheibe statt vieler Direktverbindungen', {
    x: hubX + 0.15, y: hubY + 0.86, w: hubW - 0.3, h: 0.3, fontSize: 8.5, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.05, isTextBox: true,
  });

  const fsX = hubX + hubW + 0.65, fsW = CONTENT_X + CONTENT_W - fsX;
  addHArrow(slide, hubX + hubW + 0.08, hubY + hubH / 2, 0.5);
  slide.addText('liest ·\nschreibt', {
    x: hubX + hubW + 0.03, y: hubY + hubH / 2 - 0.42, w: 0.6, h: 0.4, fontSize: 7.5, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'center', valign: 'bottom', margin: 0, lineSpacingMultiple: 1.05, isTextBox: true,
  });
  addHeaderCard(slide, fsX, hubY, fsW, hubH, C.deepbl, 'Unsere Fachsysteme', C.white);
  slide.addText('Stammdaten · Vertrieb · Netzdokumentation\nTickets · Monitoring', {
    x: fsX + 0.15, y: hubY + 0.58, w: fsW - 0.3, h: 0.58, fontSize: 10, color: C.black,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2, isTextBox: true,
  });
  const hubBottom = hubY + hubH; // 3.65 - 0.6 + 1.2 = 4.25

  // Benefits sit to the right, below the hub/Fachsysteme row — never below the full layer
  // stack, which is what pushed this block past the footer before.
  const benY = hubBottom + 0.2, benH = layerBottom - benY; // ends level with the layer stack
  addCard(slide, ShapeType, hubX, benY, fsX + fsW - hubX, benH, C.offwht, C.ltgrey, 0.08);
  slide.addText('WAS DAS BRINGT', {
    x: hubX + 0.2, y: benY + 0.12, w: fsX + fsW - hubX - 0.4, h: 0.28, fontSize: 10, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, charSpacing: 1, isTextBox: true,
  });
  addBulletBlock(slide, [
    'Daten bleiben im Haus — Kundendaten und Netzpläne verlassen das Netz nicht',
    'Kosten sind planbar — keine Abrechnung je Anfrage',
    'Zugriffe bleiben getrennt — kein Arbeitsplatz erreicht die Modelle',
  ], hubX + 0.2, benY + 0.42, fsX + fsW - hubX - 0.4, benH - 0.45, { fontSize: 9.5 });

  addFooter(slide);
  slide.addNotes('Kernaussage: Die KI bekommt keine eigenen Zugänge zu den Fachsystemen. Sie greift über Layer II auf die Integrationsplattform zu — denselben Weg, den jede andere Automatisierung nimmt. Fällt die KI aus, läuft die Integration weiter. Die drei Schichten können einzeln entstehen; Layer I ist der kleinste sinnvolle Anfang. Offen: ob n8n eine Instanz für KI und Integration bleibt oder zwei werden.');
})();

// ============================================================
// Folie 5 — Architektur-Referenzdiagramm (aus Rohentwurf Folie 5, Farben/Aufbau überarbeitet)
// ============================================================
(function slide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Architektur-Referenzdiagramm: drei Schichten, eine Datendrehscheibe', { fontSize: 22 });

  // Vertical budget (same discipline as Folie 4): content from y=1.55 to y=6.75, footer at 6.9.
  const topX = CONTENT_X + 0.3, topY = 1.55, topW = 2.8, topH = 0.5;
  slide.addShape(ShapeType.ellipse, { x: topX, y: topY, w: topW, h: topH, fill: { color: C.offwht }, line: { color: C.midgrey, width: 1.25 } });
  slide.addText('Mitarbeitende im Browser', {
    x: topX, y: topY, w: topW, h: topH, fontSize: 11, bold: true, color: C.black,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, isTextBox: true,
  });
  addVArrow(slide, topX + topW / 2, topY + topH + 0.03, 0.27);

  const layerX = CONTENT_X, layerW = 3.7, layerGap = 0.3, layerH = 1.0;
  const layerY0 = topY + topH + 0.35; // = 2.45
  const layers = [
    { roman: 'I', name: 'Dialog für alle', time: 'SEKUNDEN', detail: 'Fragen im Browser · Rollen: NOC · BID · SOC', connLabel: 'reicht\nweiter' },
    { roman: 'II', name: 'Agenten & Workflows', time: 'LAUFEND', detail: 'Arbeiten im Prozess mit, nicht auf Zuruf', connLabel: 'beauftragt' },
    { roman: 'III', name: 'Schwere Modelle', time: 'MINUTEN', detail: 'Große Analysen, Massenarbeit · gründlich statt schnell', connLabel: null },
  ];
  layers.forEach((l, i) => {
    const y = layerY0 + i * (layerH + layerGap);
    addHeaderCard(slide, layerX, y, layerW, layerH, C.grey, `${l.roman}  ·  ${l.time}`);
    slide.addText(
      [
        { text: l.name, options: { bold: true, fontSize: 12.5, color: C.black, breakLine: true } },
        { text: l.detail, options: { fontSize: 8.5, color: C.midgrey } },
      ],
      {
        x: layerX + 0.15, y: y + 0.56, w: layerW - 0.3, h: layerH - 0.62, fontFace: 'Arial',
        align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15, isTextBox: true,
      }
    );
    if (i < layers.length - 1) {
      addVArrow(slide, layerX + layerW / 2, y + layerH + 0.02, layerGap - 0.04);
      const lblH = 0.26, lblY = y + layerH + (layerGap - lblH) / 2;
      slide.addShape(ShapeType.roundRect, {
        x: layerX + layerW / 2 + 0.12, y: lblY, w: 1.1, h: lblH,
        fill: { color: C.offwht }, line: { color: C.ltgrey, width: 1 }, rectRadius: 0.05,
      });
      slide.addText(l.connLabel, {
        x: layerX + layerW / 2 + 0.12, y: lblY, w: 1.1, h: lblH, fontSize: 8.5, italic: true, color: C.grey,
        fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 0.95, isTextBox: true,
      });
    }
  });
  const layerBottom = layerY0 + 3 * layerH + 2 * layerGap; // 2.45 + 3.0 + 0.6 = 6.05

  const layerIICenterY = layerY0 + layerH + layerGap + layerH / 2; // 2.45 + 1.3 + 0.5 = 4.25
  const hubX = layerX + layerW + 0.9, hubW = 2.6, hubH = 1.2, hubY = layerIICenterY - hubH / 2;

  addHArrow(slide, layerX + layerW + 0.06, layerIICenterY, 0.78);
  slide.addText('der einzige\nÜbergang', {
    x: layerX + layerW + 0.05, y: layerIICenterY - 0.4, w: 0.8, h: 0.37, fontSize: 7.5, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'center', valign: 'bottom', margin: 0, lineSpacingMultiple: 1.0, isTextBox: true,
  });

  addHeaderCard(slide, hubX, hubY, hubW, hubH, C.blue, 'Integrationsplattform', C.white);
  slide.addText('Eine Drehscheibe für alle Systeme', {
    x: hubX + 0.15, y: hubY + 0.58, w: hubW - 0.3, h: 0.28, fontSize: 10, bold: true, color: C.black,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
  });
  slide.addText('Keine Punkt-zu-Punkt-Verbindungen', {
    x: hubX + 0.15, y: hubY + 0.86, w: hubW - 0.3, h: 0.3, fontSize: 8.5, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
  });

  const fsX = hubX + hubW + 0.7, fsW = CONTENT_X + CONTENT_W - fsX;
  const fsTopY = layerY0;
  addHArrow(slide, hubX + hubW + 0.06, hubY + hubH / 2, 0.58);
  slide.addText('liest ·\nschreibt', {
    x: hubX + hubW + 0.04, y: hubY + hubH / 2 - 0.4, w: 0.6, h: 0.37, fontSize: 7.5, italic: true, color: C.grey,
    fontFace: 'Arial', align: 'center', valign: 'bottom', margin: 0, lineSpacingMultiple: 1.0, isTextBox: true,
  });

  const fachsysteme = [
    ['Stammdaten', 'Kunden · Verträge · Standorte'],
    ['Vertrieb', 'Angebote · Kontakte'],
    ['Netzdokumentation', 'IP-Adressen · Geräte · Racks'],
    ['Service & Tickets', 'Störungen · Changes'],
    ['Monitoring', 'Alarme · Verfügbarkeit'],
  ];
  const fsRowH = 0.58, fsRowGap = 0.1;
  fachsysteme.forEach((f, i) => {
    const y = fsTopY + i * (fsRowH + fsRowGap);
    addCard(slide, ShapeType, fsX, y, fsW, fsRowH, C.offwht, C.ltgrey, 0.06);
    slide.addText(f[0], {
      x: fsX + 0.15, y: y + 0.05, w: fsW - 0.3, h: 0.26, fontSize: 10.5, bold: true, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
    });
    slide.addText(f[1], {
      x: fsX + 0.15, y: y + 0.31, w: fsW - 0.3, h: 0.24, fontSize: 8.5, color: C.midgrey,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, isTextBox: true,
    });
  });
  const fsBottom = fsTopY + 5 * fsRowH + 4 * fsRowGap; // 2.45 + 2.9 + 0.4 = 5.75
  slide.addText('UNSERE FACHSYSTEME — BESTEHEN', {
    x: fsX, y: fsTopY - 0.32, w: fsW, h: 0.26, fontSize: 9.5, bold: true, color: C.deepbl,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, charSpacing: 1, isTextBox: true,
  });

  // Sanity margins confirmed at build time: layerBottom ≈ 6.05, fsBottom ≈ 5.75 — both well
  // clear of the footer at y=6.9.
  void layerBottom; void fsBottom;

  addFooter(slide);
  slide.addNotes('Dieses Diagramm zeigt denselben Aufbau wie zuvor, mit zusätzlichem Detail: Layer I bedient konkret die Rollen NOC, BID und SOC. Der Übergang von Layer II in die Integrationsplattform ist der einzige Weg in die Fachsysteme — und die Fachsysteme sind hier einzeln aufgeschlüsselt: Stammdaten, Vertrieb, Netzdokumentation, Service & Tickets, Monitoring.');
})();

const outPath = path.join(REPO_ROOT, 'output', 'riedel-ki-programm', 'riedel-ki-programm.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
