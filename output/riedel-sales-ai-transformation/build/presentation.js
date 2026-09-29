// RIEDEL Networks — AI Sales Transformation — PptxGenJS build script.
// Generates output/riedel-sales-ai-transformation/riedel-sales-ai-transformation.pptx from the
// Content Package (docs/03-content-package.md), 14 slides, C-Level tone, MGIM CI.
// Slide 5 reuses the client-approved layout/content from build/preview-lead-analyse.js verbatim.

const path = require('path');
const pptxgen = require('pptxgenjs');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const { C, addHeaderBar, addFooter, addCard, addAccentBar, addSlashDivider, addInsightBox, addIconBlock } =
  require(path.join(REPO_ROOT, 'lib', 'pptx-helpers'));

const pres = new pptxgen();
pres.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
pres.layout = 'LAYOUT_WIDE';
const ShapeType = pres.ShapeType;

// ---- Shared layout grid ----
const CONTENT_X = 0.5;
const CONTENT_W = 12.33;
const HEADLINE_Y = 0.6;
const HEADLINE_H = 0.85;
const CONTENT_TOP = 1.55;
const EDGE_MARGIN_X = 1.3;

const CHART_DIR = path.join(REPO_ROOT, 'output', 'riedel-sales-ai-transformation', 'charts');

// ---- Project-local helpers ----

function addHeadline(slide, text, opts) {
  const o = opts || {};
  slide.addText(text, {
    x: CONTENT_X, y: HEADLINE_Y, w: CONTENT_W, h: o.h || HEADLINE_H,
    fontSize: o.fontSize || 22, bold: true, color: o.color || C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
  });
}

function addSourceLine(slide, text, x, y, w) {
  slide.addText(text, {
    x, y, w: w || CONTENT_W, h: 0.3, fontSize: 9, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
  });
}

// MECE bullet list — each item needs its own breakLine, otherwise pptxgenjs merges the whole
// array into one paragraph with a single bullet glyph (a real bug found earlier in this pipeline).
function addBulletBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(
    items.map((t, i) => ({ text: t, options: { color: o.color || C.black, bullet: { code: '2022' }, breakLine: i < items.length - 1 } })),
    {
      x, y, w, h, fontSize: o.fontSize || 14, color: o.color || C.black, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.25,
      bullet: { code: '2022', indent: 16 },
    }
  );
}

function addConnector(slide, x, y, w) {
  slide.addShape(ShapeType.rect, { x, y, w, h: 0.03, fill: { color: C.midgrey }, line: { color: C.midgrey } });
}

function addRadialLine(slide, x1, y1, x2, y2, color, width) {
  const sameSign = (x1 <= x2) === (y1 <= y2);
  slide.addShape(ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color, width }, flipV: !sameSign,
  });
}

// Single KPI card — big number + label, used on STAT slides.
function addKpiCard(slide, x, y, w, h, number, label) {
  addCard(slide, ShapeType, x, y, w, h, C.offwht, C.ltgrey, 0.08);
  slide.addText(number, {
    x, y: y + 0.15, w, h: h - 0.75, fontSize: 34, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText(label, {
    x: x + 0.1, y: y + h - 0.6, w: w - 0.2, h: 0.55, fontSize: 11, color: C.grey,
    fontFace: 'Arial', align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.05,
  });
}

// Process box with title — used for PROCESS input/hub/output nodes.
function addProcessBox(slide, x, y, w, h, title, opts) {
  const o = opts || {};
  const fill = o.fill || C.blue;
  addCard(slide, ShapeType, x, y, w, h, fill, fill, 0.08);
  slide.addText(title, {
    x: x + 0.1, y: y + 0.08, w: w - 0.2, h: h - 0.16, fontSize: o.fontSize || 11, bold: true,
    color: o.color || C.white, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.1,
  });
}

// Numbered action card — used on the CLOSING slide.
function addNumberedCard(slide, x, y, w, h, n, title) {
  addCard(slide, ShapeType, x, y, w, h, C.grey, C.midgrey, 0.08);
  slide.addShape(ShapeType.ellipse, {
    x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4, fill: { color: C.blue }, line: { color: C.blue },
  });
  slide.addText(String(n), {
    x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText(title, {
    x: x + 0.15, y: y + 0.65, w: w - 0.3, h: h - 0.8, fontSize: 10, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });
}

// ============================================================
// Slide 1 — TITLE
// ============================================================
(function buildSlide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.7, 0.6);

  slide.addText('RIEDEL Networks startet die AI Sales Transformation —\nfünf priorisierte KI-Bausteine für den Vertrieb', {
    x: EDGE_MARGIN_X, y: 1.5, w: 10.7, h: 2.0, fontSize: 32, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });
  slide.addText('Entscheidungsvorlage für die Geschäftsführung RIEDEL Networks —\nPiloten und Quick Wins freigeben, kein Rollout-Beschluss', {
    x: EDGE_MARGIN_X, y: 3.65, w: 10.7, h: 0.9, fontSize: 16, color: C.blue, fontFace: 'Arial',
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
  });
  slide.addText('Vorgelegt von Markus Goetz Interim Management  |  Stand 29. September 2026', {
    x: EDGE_MARGIN_X, y: 6.5, w: 10.7, h: 0.4, fontSize: 12, color: C.midgrey, fontFace: 'Arial',
    align: 'left', valign: 'top', margin: 0,
  });

  slide.addNotes('Wir stellen Ihnen heute keinen fertigen Technologie-Rollout vor, sondern einen priorisierten, stufenweisen Plan: fünf KI-Bausteine für den Vertrieb, von denen drei bereits jetzt als Pilot oder Quick Win startbereit sind. Die heutige Entscheidung betrifft diese Piloten und ihre Owner — nicht die vollständige Ausrollung.');
})();

// ============================================================
// Slide 2 — STAT (Ausgangslage)
// ============================================================
(function buildSlide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'RIEDELs Vertrieb arbeitet mit komplexen, langen Verkaufszyklen auf einem\nmanuell gepflegten Microsoft-Toolset ohne zentrales CRM');

  const cards = [
    ['75+', 'Länder mit Kunden für Managed Telekommunikations-, Netzwerk- und IT-Security-Lösungen'],
    ['100%', 'Tochter der RIEDEL Communications Gruppe'],
    ['6', 'Microsoft-Standardtools im täglichen Einsatz (Excel, SharePoint, Outlook, Teams, PowerPoint, Word)'],
    ['0', 'zentrales CRM-System im Einsatz'],
  ];
  const gap = 0.25;
  const cardW = (CONTENT_W - 3 * gap) / 4;
  const cardY = CONTENT_TOP, cardH = 2.1;
  cards.forEach((c, i) => {
    const x = CONTENT_X + i * (cardW + gap);
    addKpiCard(slide, x, cardY, cardW, cardH, c[0], c[1]);
  });

  addBulletBlock(slide, [
    'Mehrstufige, komplexe Verkaufszyklen mit IT-/C-Level-Ansprechpartnern und kundenindividuellen Kalkulationen',
    'Vertriebslisten, Kalkulationen und Verträge werden überwiegend manuell in Excel/Word gepflegt',
  ], CONTENT_X, cardY + cardH + 0.3, CONTENT_W, 1.2, { fontSize: 13 });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 2.', CONTENT_X, cardY + cardH + 1.55, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Bevor wir über KI sprechen, ein kurzer Blick auf die Ausgangslage: RIEDEL verkauft komplexe, erklärungsbedürftige Managed Services in über 75 Länder — das sind lange, mehrstufige Verkaufszyklen mit anspruchsvollen Ansprechpartnern. Und das auf einem Toolset, das komplett auf Microsoft-Standardprogrammen beruht, ohne ein zentrales CRM. Das ist der Nährboden für die Schmerzpunkte, die wir gleich zeigen — nicht weil im Vertrieb etwas falsch läuft, sondern weil die Werkzeuge für diese Komplexität nicht gebaut sind.');
})();

// ============================================================
// Slide 3 — CONTENT (Schmerzpunkte + externe Validierung)
// ============================================================
(function buildSlide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Vier Schmerzpunkte binden Vertriebszeit, die für Kundengespräche fehlt —\nein branchenweites, kein RIEDEL-spezifisches Muster');

  const pains = [
    ['Gesprächsvorbereitung', 'Hoher manueller Rechercheaufwand vor jedem Kundentermin'],
    ['Kalkulationen', 'Drei getrennte Formulare ohne automatisierten Abgleich'],
    ['Vertragswesen', 'Manuelle Vertragserstellung, zeitaufwändige Prüfung von Kundenkommentaren'],
    ['Listenpflege', 'Dezentrale Pflege von Deals-, Kunden- und Bedarfslisten mit Inkonsistenzrisiko'],
  ];
  const gap = 0.25;
  const cardW = (CONTENT_W - 3 * gap) / 4;
  const cardY = CONTENT_TOP, headerH = 0.5, cardH = 2.3;
  pains.forEach((p, i) => {
    const x = CONTENT_X + i * (cardW + gap);
    addCard(slide, ShapeType, x, cardY, cardW, cardH, C.offwht, C.ltgrey, 0.08);
    slide.addShape(ShapeType.rect, { x, y: cardY, w: cardW, h: headerH, fill: { color: C.grey }, line: { color: C.grey } });
    slide.addText(p[0], {
      x: x + 0.1, y: cardY, w: cardW - 0.2, h: headerH, fontSize: 11.5, bold: true, color: C.white,
      fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
    });
    slide.addText(p[1], {
      x: x + 0.12, y: cardY + headerH + 0.12, w: cardW - 0.24, h: cardH - headerH - 0.24, fontSize: 10,
      color: C.black, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  // External-validation stat inset, visually separated (offwht card + blue accent) from the RIEDEL-specific cards above.
  const statY = cardY + cardH + 0.3, statH = 1.15;
  addCard(slide, ShapeType, CONTENT_X, statY, CONTENT_W, statH, C.offwht, C.blue, 0.08);
  slide.addText('~2 Tage/Woche', {
    x: CONTENT_X + 0.3, y: statY, w: 3.0, h: statH, fontSize: 26, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
  });
  slide.addText('Branchenweiter administrativer Zeitaufwand im B2B-Vertrieb statt aktiver Verkaufstätigkeit — kein RIEDEL-Sonderfall.\nQuelle: Forrester Activity Study via Salesfully, 2026 (3.031 erfasste Vertriebsmitarbeitende); als Größenordnung verwendet, nicht als RIEDEL-eigene Zahl.', {
    x: CONTENT_X + 3.5, y: statY + 0.12, w: CONTENT_W - 3.8, h: statH - 0.24, fontSize: 10, italic: true,
    color: C.grey, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.15,
  });

  addFooter(slide);
  slide.addNotes('Vier Schmerzpunkte ziehen sich durch den RIEDEL-Vertrieb — und das Entscheidende vorweg: das ist kein RIEDEL-spezifisches Problem. Die Forrester Activity Study, eine Erhebung über 3.031 Vertriebsmitarbeitende, zeigt, dass B2B-Vertrieb branchenweit fast zwei volle Arbeitstage pro Woche mit administrativen statt verkaufsaktiven Tätigkeiten verbringt. Das erhöht die Glaubwürdigkeit dessen, was wir hier sehen — es ist ein strukturelles, kein individuelles Problem. Die Frage, die sich daraus ergibt: Wie schafft RIEDEL echte Entlastung, ohne die Kundenbeziehung an KI zu delegieren oder unkontrolliert zu automatisieren? Unsere Antwort: fünf priorisierte KI-Bausteine, von denen drei bereits jetzt als Pilot oder Quick Win starten — kontrolliert durch klare Entscheidungstore statt eines großen Wurfs.');
})();

// ============================================================
// Slide 4 — CHART (Priorisierungs-Matrix)
// ============================================================
(function buildSlide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Fünf KI-Bausteine sind nach Umsatzwirkung, Umsetzbarkeit und Dringlichkeit\npriorisiert — drei starten sofort, zwei folgen in Phase 2');

  slide.addImage({ path: path.join(CHART_DIR, 'slide_04_chart.png'), x: 0.5, y: 1.55, w: 8.3, h: 4.6, sizing: { type: 'contain', w: 8.3, h: 4.6 } });

  addInsightBox(slide, ShapeType,
    'Priorisierung nach Umsatzwirkung, Umsetzbarkeit und Dringlichkeit — qualitative Einschätzung aus der gemeinsamen Projektarbeit, keine externe Kennzahl und keine Kostenschätzung.',
    9.1, 1.8, 3.7, 4.0);

  addSourceLine(slide, 'Quelle: Priorisierte Use-Case-Matrix, Konzeptdokument Abschnitt 4.', 0.5, 6.35, 8.3);

  addFooter(slide);
  slide.addNotes('Diese Folie ist die Landkarte für alles, was danach kommt. Wir haben alle fünf Bausteine entlang drei Dimensionen bewertet: Wie stark wirkt sich das auf Umsatz aus, wie leicht lässt es sich umsetzen, und wie dringend ist es. Wichtig: das ist eine qualitative Einschätzung aus unserer gemeinsamen Projektarbeit, keine externe Marktkennzahl und keine Kostenschätzung — die Lizenzfrage ist bewusst als offene Abhängigkeit ausgewiesen und kommt am Ende der Präsentation. Drei Bausteine landen oben rechts in der Matrix und starten deshalb jetzt: Lead-Analyse als Pilot, Kalkulationen und Listenmanagement als Quick Wins. Zwei weitere — Bid Management und Vertragsmanagement — sind genauso durchdacht, aber wir schlagen vor, sie erst in Phase 2 anzugehen, wenn die ersten drei Learnings geliefert haben.');
})();

// ============================================================
// Slide 5 — PROCESS (Lead-Analyse) — client-approved layout reused verbatim
// ============================================================
(function buildSlide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);

  addHeadline(slide, 'Pilot: Vier KI-Agenten entlasten die Lead-Vorbereitung im Sales —\nkeine automatisierte Kundenansprache', { fontSize: 22 });

  const agents = [
    { name: 'Lead Research Agent', task: 'Erstellt automatisch ein Unternehmensprofil aus geprüften öffentlichen Quellen.', benefit: 'Keine manuelle Recherche mehr vor dem Erstgespräch — sofort einsatzbereiter Kontext.' },
    { name: 'Pain Analysis Agent', task: 'Leitet die drei wahrscheinlichsten Kundenherausforderungen ab.', benefit: 'Vertrieb geht mit einer fundierten These statt Standardfragen ins Gespräch.' },
    { name: 'Business Window Agent', task: 'Verknüpft die Kundenherausforderungen mit passendem RIEDEL-Leistungswissen.', benefit: 'Passgenaue Positionierung statt generischem Pitch — höhere Glaubwürdigkeit.' },
    { name: 'Conversation Preparation Agent', task: 'Erstellt einen fertigen Gesprächsleitfaden mit Fragen, Positionierung und Proof Cases.', benefit: 'Strukturiert und selbstbewusst ins Gespräch statt improvisiert.' },
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

  addInsightBox(slide, ShapeType,
    'Weniger Zeit für Recherche, höhere Qualität im Kundenansatz — Ziel: mehr Abschlüsse mit weniger Aufwand.',
    CONTENT_X, cardY + cardH + 0.15, CONTENT_W, 0.45);

  addFooter(slide);
  slide.addNotes('Vier Agenten übernehmen die Vorbereitung, nicht das Kundengespräch selbst. Der Lead Research Agent erstellt automatisch ein Unternehmensprofil aus geprüften öffentlichen Quellen — die manuelle Recherche vor dem Erstgespräch entfällt. Der Pain Analysis Agent leitet daraus die drei wahrscheinlichsten Kundenherausforderungen ab, sodass der Vertrieb mit einer fundierten These statt Standardfragen ins Gespräch geht. Der Business Window Agent verknüpft diese Herausforderungen mit unserem freigegebenen Leistungswissen für eine passgenaue statt generische Positionierung. Und der Conversation Preparation Agent baut daraus einen fertigen Gesprächsleitfaden mit Fragen, Positionierung und passenden Referenzen. In Summe: weniger Zeit für Recherche, höhere Qualität im Kundenansatz, und das Ziel dahinter ist klar — mehr Abschlüsse mit weniger Aufwand. Das sind zunächst zu testende Hypothesen, keine belegten Effekte; deshalb schlagen wir einen begrenzten, sauber gemessenen Pilot vor, mit David Hofacker als Business Owner auf Sales-Seite, und ohne Rollout oder CRM-Integration vor dem Pilot-Abschluss.');
})();

// ============================================================
// Slide 6 — PROCESS (Kalkulationen)
// ============================================================
(function buildSlide6() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'KI gleicht drei bisher getrennte Kalkulationsformulare automatisch ab und\nschneidet manuelle Übertragungsfehler heraus');

  const inputs = ['Bid Sheet\n(EK-Preise)', 'Angebotssheet\n(Kundenpreise/Konditionen)', 'Kundenbedarfsliste\n(Kundenanforderungen)'];
  const inW = 2.6, inH = 0.85, inX = CONTENT_X, inGap = 0.25;
  const inStartY = CONTENT_TOP + 0.3;
  inputs.forEach((label, i) => {
    const y = inStartY + i * (inH + inGap);
    addProcessBox(slide, inX, y, inW, inH, label, { fill: C.grey, fontSize: 10.5 });
    const midY = y + inH / 2;
    addRadialLine(slide, inX + inW, midY, inX + inW + 0.9, CONTENT_TOP + 1.55, C.midgrey, 1.5);
  });

  const hubX = inX + inW + 0.9, hubW = 3.0, hubH = 1.5, hubY = CONTENT_TOP + 0.8;
  addProcessBox(slide, hubX, hubY, hubW, hubH, 'KI-Abgleich', { fill: C.blue, fontSize: 15 });

  const outputs = ['Automatische Margenberechnung', 'Plausibilitätsprüfung je Angebot', 'Abweichungserkennung zwischen den drei Dokumenten', 'Produktzuordnungsvorschläge'];
  const outX = hubX + hubW + 0.9;
  addRadialLine(slide, hubX + hubW, hubY + hubH / 2, outX, hubY + hubH / 2, C.midgrey, 1.5);
  addBulletBlock(slide, outputs, outX, CONTENT_TOP + 0.15, CONTENT_X + CONTENT_W - outX, 2.8, { fontSize: 12 });

  slide.addText('Quick Win · Prototyp Q4 2026–Q1 2027', {
    x: outX, y: CONTENT_TOP + 3.0, w: CONTENT_X + CONTENT_W - outX, h: 0.35, fontSize: 10.5, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
  });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 3.2.', CONTENT_X, 6.5, CONTENT_W);
  addFooter(slide);
  slide.addNotes('Heute hantiert der Vertrieb mit drei getrennten Tabellen, die niemand automatisch gegeneinander prüft: dem Bid-Sheet mit den Einkaufspreisen, dem Angebotssheet mit den Kundenkonditionen, und der Bedarfsliste des Kunden. Jeder Abgleich ist manuell — und jede manuelle Übertragung ist eine potenzielle Fehlerquelle, gerade bei komplexen, individuellen Angeboten. Die KI übernimmt genau diesen Abgleich: sie rechnet automatisch die Marge, prüft die Plausibilität, erkennt Abweichungen zwischen den drei Dokumenten und schlägt passende Produktzuordnungen vor. Das ist noch Konzeptphase, aber als Quick Win eingestuft — wir schlagen vor, den Ist-Prozess jetzt zu dokumentieren und einen Prototyp in Phase 1 zu bauen.');
})();

// ============================================================
// Slide 7 — CONTENT (Listenmanagement) — deliberately compact
// ============================================================
(function buildSlide7() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Eine KI-überwachte Deals-Liste ersetzt dezentrale Listenpflege durch eine\nverlässliche, einheitliche Datenbasis');

  const lists = ['Deals-Liste', 'Kundenlisten', 'Bedarfslisten', 'Preislisten', 'Statusübersichten'];
  const rowY = CONTENT_TOP + 0.5;
  const spacing = CONTENT_W / lists.length;
  lists.forEach((label, i) => {
    const cx = CONTENT_X + spacing * i + spacing / 2;
    addIconBlock(slide, ShapeType, label, i === 0 ? 'Pilotstart' : null, cx - 0.55, rowY);
  });

  const hubY = rowY + 1.9, hubX = CONTENT_X + CONTENT_W / 2 - 1.75, hubW = 3.5, hubH = 0.9;
  lists.forEach((label, i) => {
    const cx = CONTENT_X + spacing * i + spacing / 2;
    addRadialLine(slide, cx, rowY + 1.1, hubX + hubW / 2, hubY, C.midgrey, 1.2);
  });
  addProcessBox(slide, hubX, hubY, hubW, hubH, 'KI-überwachte Datenbasis', { fill: C.blue, fontSize: 13 });

  addBulletBlock(slide, [
    'Automatische Dublettenprüfung und Listenabgleich zwischen den Listen',
    'Intelligente Status-Updates und Anomalie-Erkennung bei Dateninkonsistenzen',
    'Pilot startet mit der Deals-Liste, weitere Listen folgen nach Piloterfolg',
  ], CONTENT_X, hubY + hubH + 0.35, CONTENT_W, 1.4, { fontSize: 12 });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 3.5.', CONTENT_X, 6.6, CONTENT_W);
  addFooter(slide);
  slide.addNotes('Der dritte Baustein, der jetzt startet, ist kleiner im Umfang, aber genauso relevant für die Datenqualität im Vertrieb: eine zentrale, KI-überwachte Listenverwaltung. Statt fünf Listen, die dezentral in Excel gepflegt werden und leicht auseinanderlaufen, prüft die KI automatisch auf Dubletten, gleicht die Listen gegeneinander ab und erkennt Anomalien — etwa wenn ein Deal-Status nicht zu den verknüpften Bedarfs- oder Preisdaten passt. Wir schlagen vor, mit der Deals-Liste zu starten, weil sie die höchste Sichtbarkeit hat, und die übrigen Listen nach Piloterfolg schrittweise zu ergänzen. Laut Priorisierungsmatrix ist die Umsatzwirkung hier moderat — deshalb behandeln wir diesen Baustein bewusst knapper als Lead-Analyse und Kalkulationen.');
})();

// ============================================================
// Slide 8 — COMPARISON (Phase 2: Vertragsmanagement / Bid Management)
// ============================================================
(function buildSlide8() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Vertragsmanagement und Bid Management folgen in Phase 2 — vorbereitet,\naber noch nicht Teil der heutigen Pilot-Entscheidung');

  slide.addShape(ShapeType.roundRect, {
    x: CONTENT_X + CONTENT_W / 2 - 1.3, y: CONTENT_TOP - 0.05, w: 2.6, h: 0.4,
    fill: { color: C.midgrey }, line: { color: C.midgrey }, rectRadius: 0.2,
  });
  slide.addText('Phase 2 · Q2–Q3 2027', {
    x: CONTENT_X + CONTENT_W / 2 - 1.3, y: CONTENT_TOP - 0.05, w: 2.6, h: 0.4, fontSize: 11, bold: true,
    color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });

  const colY = CONTENT_TOP + 0.55, headerH = 0.5, colH = 3.3;
  const colW = (CONTENT_W - 0.4) / 2;
  const colX = [CONTENT_X, CONTENT_X + colW + 0.4];

  slide.addShape(ShapeType.rect, { x: colX[0], y: colY, w: colW, h: headerH, fill: { color: C.grey }, line: { color: C.grey } });
  slide.addText('Vertragsmanagement', { x: colX[0] + 0.15, y: colY, w: colW - 0.3, h: headerH, fontSize: 14, bold: true, color: C.white, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0 });
  addBulletBlock(slide, [
    'Automatisierte Vertragserstellung aus Standardvorlagen',
    'KI-Prüfung von Kundenkommentaren: akzeptabel / verhandelbar / kritisch',
    'Standardisierte Proof-of-Concept-Vereinbarungen',
  ], colX[0], colY + headerH + 0.2, colW, colH - headerH - 0.2, { fontSize: 12.5 });

  slide.addShape(ShapeType.rect, { x: colX[1], y: colY, w: colW, h: headerH, fill: { color: C.blue }, line: { color: C.blue } });
  slide.addText('Bid Management', { x: colX[1] + 0.15, y: colY, w: colW - 0.3, h: headerH, fontSize: 14, bold: true, color: C.white, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0 });
  addBulletBlock(slide, [
    'Strukturierte Bedarfsanalyse aus Gesprächsnotizen',
    'Abgleich mit historischen Angeboten zur Erfolgseinschätzung',
    'Statusverfolgung mit Follow-up-Empfehlungen',
  ], colX[1], colY + headerH + 0.2, colW, colH - headerH - 0.2, { fontSize: 12.5 });

  slide.addShape(ShapeType.line, {
    x: CONTENT_X + colW + 0.2, y: colY, w: 0, h: colH, line: { color: C.ltgrey, width: 1 },
  });

  addSourceLine(slide, 'Beide Bausteine sind konzeptionell ausgearbeitet, aber bewusst noch nicht Teil der heutigen Pilot-Entscheidung. Quelle: Konzeptdokument, Abschnitt 3.3–3.4.', CONTENT_X, colY + colH + 0.2, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Zwei weitere Bausteine sind gedanklich genauso weit wie die drei, die gerade starten — wir schlagen nur vor, sie erst in Phase 2 anzugehen. Vertragsmanagement deckt drei Bereiche ab: automatisierte Vertragserstellung, die Prüfung von Kundenkommentaren und Redlines mit einer klaren Einstufung akzeptabel/verhandelbar/kritisch, und standardisierte Proof-of-Concept-Vereinbarungen. Bid Management unterstützt die strukturierte Bedarfsanalyse aus Gesprächsnotizen und vergleicht neue Angebote automatisch mit historischen, gewonnenen und verlorenen Angeboten, um die Erfolgswahrscheinlichkeit realistischer einzuschätzen. Beide sind laut Priorisierungsmatrix als Phase 2 eingestuft — wir bringen sie heute nur zur Vollständigkeit, nicht zur Entscheidung.');
})();

// ============================================================
// Slide 9 — CONTENT (Ausblick Phase 3) — lightest slide in the deck
// ============================================================
(function buildSlide9() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Pre-Sales, Customer Success und Sales Reporting folgen ab Phase 3 —\ngrößtenteils abhängig von der noch offenen CRM-Entscheidung');

  const items = [
    ['Pre-Sales', 'KI-gestützte Lösungsvorschläge und Wettbewerbsanalysen'],
    ['Customer Success', 'KI-Unterstützung bei Upsell- und Renewal-Prozessen'],
    ['Sales Reporting', 'Automatisierte Pipeline- und Forecast-Erstellung'],
  ];
  const gap = 0.5;
  const iconW = 1.1;
  const totalW = items.length * iconW + (items.length - 1) * gap;
  const startX = CONTENT_X + (CONTENT_W - totalW) / 2;
  items.forEach((it, i) => {
    const x = startX + i * (iconW + gap);
    addIconBlock(slide, ShapeType, it[0], it[1], x, CONTENT_TOP + 0.6);
  });

  slide.addShape(ShapeType.roundRect, {
    x: CONTENT_X + CONTENT_W / 2 - 2.2, y: CONTENT_TOP + 2.8, w: 4.4, h: 0.5,
    fill: { color: C.offwht }, line: { color: C.midgrey, width: 1 }, rectRadius: 0.2,
  });
  slide.addText('CRM-Entscheidung ausstehend — Voraussetzung für die Skalierung', {
    x: CONTENT_X + CONTENT_W / 2 - 2.2, y: CONTENT_TOP + 2.8, w: 4.4, h: 0.5, fontSize: 10, bold: true,
    color: C.grey, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });

  addSourceLine(slide, 'Ausblick ab Phase 3 (ab Q4 2027) — keine Entscheidung heute erforderlich. Quelle: Konzeptdokument, Abschnitt 6.', CONTENT_X, CONTENT_TOP + 3.6, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Zum Abschluss der Bausteinübersicht ein kurzer Ausblick, nicht mehr: drei angrenzende Bereiche, die wir für vollständig sinnvoll halten, aber bewusst erst ab Phase 3 einordnen. Pre-Sales könnte KI für Lösungsvorschläge und Wettbewerbsanalysen nutzen, Customer Success für Upsell- und Renewal-Prozesse, Sales Reporting für automatisierte Pipeline- und Forecast-Erstellung. Der rote Faden bei allen dreien: sie hängen größtenteils an der CRM-Entscheidung, die wir gleich als offene Abhängigkeit benennen. Hierzu erwarten wir heute keine Entscheidung — das ist reine Transparenz über die Vollständigkeit des Gesamtplans.');
})();

// ============================================================
// Slide 10 — TIMELINE (Roadmap mit Entscheidungstoren)
// ============================================================
(function buildSlide10() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Drei Phasen mit festen Entscheidungstoren führen von ersten Piloten zur\nstrategischen Erweiterung');

  const lineY = 3.9;
  slide.addShape(ShapeType.rect, { x: CONTENT_X, y: lineY, w: CONTENT_W, h: 0.03, fill: { color: C.midgrey }, line: { color: C.midgrey } });

  const phases = [
    { x: CONTENT_X + CONTENT_W * 0.14, label: 'Phase 1', date: 'Q4 2026–Q1 2027', items: 'Lead-Analyse-Pilot\nKalkulations-Prototyp\nListenmanagement-Pilot\n+ CRM-Entscheidung, Wissensbasis, Datenschutzrahmen' },
    { x: CONTENT_X + CONTENT_W * 0.5, label: 'Phase 2', date: 'Q2–Q3 2027', items: 'Bid Management aufbauen\nVertragsmanagement implementieren\nSkalierung Kalkulationen/Lead-Analyse\nCRM-Integration vorbereiten' },
    { x: CONTENT_X + CONTENT_W * 0.86, label: 'Phase 3', date: 'ab Q4 2027', items: 'Pre-Sales\nCustomer Success\nSales Reporting\nDurchgängige CRM-Integration' },
  ];
  phases.forEach((p) => {
    slide.addShape(ShapeType.ellipse, { x: p.x - 0.12, y: lineY - 0.12, w: 0.27, h: 0.27, fill: { color: C.blue }, line: { color: C.blue } });
    slide.addText(`${p.label}\n${p.date}`, {
      x: p.x - 1.25, y: lineY - 1.15, w: 2.5, h: 0.9, fontSize: 13, bold: true, color: C.black,
      fontFace: 'Arial', align: 'center', valign: 'bottom', margin: 0, lineSpacingMultiple: 1.1,
    });
    slide.addText(p.items, {
      x: p.x - 1.4, y: lineY + 0.3, w: 2.8, h: 1.9, fontSize: 10, color: C.midgrey,
      fontFace: 'Arial', align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  const gates = [
    { x: CONTENT_X + CONTENT_W * 0.32, label: 'Entscheidungstor 1', req: 'Piloterfolg + CRM-Entscheidung' },
    { x: CONTENT_X + CONTENT_W * 0.68, label: 'Entscheidungstor 2', req: 'Durchgängige CRM-Integration' },
  ];
  gates.forEach((g) => {
    slide.addShape(ShapeType.diamond, { x: g.x - 0.14, y: lineY - 0.14, w: 0.3, h: 0.3, fill: { color: C.grey }, line: { color: C.grey } });
    slide.addText(g.label, {
      x: g.x - 1.1, y: lineY + 0.32, w: 2.2, h: 0.3, fontSize: 10, bold: true, color: C.grey,
      fontFace: 'Arial', align: 'center', valign: 'top', margin: 0,
    });
    slide.addText(g.req, {
      x: g.x - 1.1, y: lineY + 0.6, w: 2.2, h: 0.5, fontSize: 8.5, italic: true, color: C.midgrey,
      fontFace: 'Arial', align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
    });
  });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 5.', CONTENT_X, 6.4, CONTENT_W);
  addFooter(slide);
  slide.addNotes('Diese Roadmap ist keine reine Zeitleiste, sondern eine bewusste Risikokontrolle: jede Phase erfordert eine eigene Fortsetzungsentscheidung, nichts läuft automatisch weiter. Phase 1, von diesem Quartal bis Anfang 2027, bringt die drei Piloten und Quick Wins, die wir gerade gezeigt haben, plus die Querschnittsaufgaben — vor allem die CRM-Entscheidung und den Aufbau einer kuratierten Sales-Wissensbasis. Erst wenn diese Piloten erfolgreich sind und die CRM-Frage geklärt ist, öffnet sich das erste Entscheidungstor zu Phase 2: Ausbau und Integration, mit Bid Management, Vertragsmanagement und der Skalierung der bewährten Bausteine. Das zweite Tor erfordert eine durchgängige CRM-Integration, bevor wir in Phase 3 strategisch erweitern — Pre-Sales, Customer Success, Sales Reporting.');
})();

// ============================================================
// Slide 11 — CONTENT (Governance-Grundprinzipien)
// ============================================================
(function buildSlide11() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Fünf Grundprinzipien stellen sicher, dass der Mensch verantwortlich bleibt\nund KI nie unautorisiert Preise oder Verträge zusagt');

  const principles = [
    ['Mensch verantwortlich', 'KI unterstützt Entscheidungen, trifft sie nicht'],
    ['Keine Zusagen', 'Keine Preis-/Vertragszusagen durch KI ohne menschliche Freigabe'],
    ['Stufenweise', 'Pilot vor Rollout, Messung vor Skalierung'],
    ['Transparenz', 'Quellen, Unsicherheiten und Annahmen immer sichtbar'],
    ['Datenschutz by Design', 'Von Anfang an mitgedacht, nicht nachträglich aufgesetzt'],
  ];
  const gap = 0.35;
  const iconW = 1.1;
  const totalW = principles.length * iconW + (principles.length - 1) * gap;
  const startX = CONTENT_X + (CONTENT_W - totalW) / 2;
  principles.forEach((p, i) => {
    const x = startX + i * (iconW + gap);
    addIconBlock(slide, ShapeType, p[0], p[1], x, CONTENT_TOP + 0.7);
  });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 7.', CONTENT_X, 6.4, CONTENT_W);
  addFooter(slide);
  slide.addNotes('Bevor wir zu den nächsten Schritten kommen, ein wichtiger Punkt zur Kontrolle: fünf Grundprinzipien gelten für jeden der fünf Bausteine, ohne Ausnahme. Das Wichtigste zuerst: der Mensch bleibt verantwortlich, KI unterstützt, entscheidet aber nicht. Direkt daraus folgt das für Sie vermutlich relevanteste Prinzip: KI sagt niemals Preise oder Vertragskonditionen ohne menschliche Freigabe zu — das bleibt in jedem Baustein, auch bei Kalkulationen und Vertragsmanagement, explizit ausgeschlossen. Wir führen grundsätzlich stufenweise ein, Pilot vor Rollout, Messung vor Skalierung. Jede KI-Ausgabe zeigt ihre Quellen, Unsicherheiten und Annahmen transparent. Und Datenschutz ist von Anfang an mitgedacht, nicht nachträglich aufgesetzt.');
})();

// ============================================================
// Slide 12 — CONTENT (Rollen & Verantwortlichkeiten)
// ============================================================
(function buildSlide12() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Fünf klar getrennte Rollen tragen die AI Sales Transformation — von der\nfachlichen Abnahme bis zum Datenschutz');

  const roles = [
    ['Business Owner (Sales)', 'Priorisierung, Prozess, Abnahme, Nutzenbewertung'],
    ['AI/IT-Verantwortung', 'Plattform, Lizenzen, Konnektoren, Monitoring, Kosten'],
    ['Sales-Knowledge Owner', 'Freigabe und Aktualität des Vertriebswissens'],
    ['Security/Datenschutz', 'Datenzugriff, Zweckbindung, DLP, Compliance'],
    ['Pilotnutzer/Sales', 'Prüfung, Feedback, Fehlermeldung, Kundennutzungs-Entscheidung'],
  ];
  const gap = 0.35;
  const iconW = 1.1;
  const totalW = roles.length * iconW + (roles.length - 1) * gap;
  const startX = CONTENT_X + (CONTENT_W - totalW) / 2;
  roles.forEach((r, i) => {
    const x = startX + i * (iconW + gap);
    addIconBlock(slide, ShapeType, r[0], r[1], x, CONTENT_TOP + 0.7);
  });

  addSourceLine(slide, 'Für den Lead-Analyse-Piloten ist die Rolle Business Owner (Sales) bereits besetzt: David Hofacker. Quelle: Konzeptdokument, Abschnitt 7.', CONTENT_X, CONTENT_TOP + 3.4, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Die fünf Grundprinzipien von eben werden erst dadurch belastbar, dass sie an konkrete Rollen geknüpft sind — nicht an eine einzelne Person oder Abteilung. Der Business Owner auf Sales-Seite verantwortet Priorisierung, Prozess und die fachliche Abnahme jedes Bausteins. Die AI/IT-Verantwortung kümmert sich um Plattform, Lizenzen, Konnektoren, Monitoring und Kosten. Der Sales-Knowledge Owner gibt das Vertriebswissen frei, das die Agenten nutzen dürfen, und hält es aktuell. Security/Datenschutz verantwortet Datenzugriff, Zweckbindung und Compliance. Und die Pilotnutzer im Vertrieb selbst prüfen täglich, geben Feedback, melden Fehler — und entscheiden am Ende, ob ein KI-Ergebnis beim Kunden verwendet wird. Für den Lead-Analyse-Piloten ist diese Rolle bereits besetzt: David Hofacker.');
})();

// ============================================================
// Slide 13 — CONTENT (Offene Abhängigkeiten)
// ============================================================
(function buildSlide13() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Sechs offene Abhängigkeiten — allen voran die CRM-Entscheidung —\nbestimmen Tempo und Umfang der Umsetzung');

  const deps = [
    'CRM-Systementscheidung — welches System, wann (betrifft Lead-Analyse-Skalierung, Customer Success, Sales Reporting)',
    'Microsoft-Lizenzen (Copilot Studio, Power Automate, SharePoint-Berechtigungen) — technische Voraussetzung für alle Bausteine',
    'Datenschutz/DSFA-Klärung — Freigabevoraussetzung für jeden einzelnen Piloten',
    'Kuratierte Sales-Wissensbasis — bestimmt direkt die Qualität aller KI-Ergebnisse',
    'Dokumentationslücken bei den drei Kalkulationsformularen und bestehenden Vertragsvorlagen — bestimmen Architektur und Scope',
  ];
  const rowH = 0.62, listY = CONTENT_TOP + 0.2;
  deps.forEach((d, i) => {
    const y = listY + i * rowH;
    const isFirst = i === 0;
    slide.addShape(ShapeType.rect, { x: CONTENT_X, y, w: 0.08, h: rowH - 0.12, fill: { color: isFirst ? C.blue : C.ltgrey }, line: { color: isFirst ? C.blue : C.ltgrey } });
    slide.addText(d, {
      x: CONTENT_X + 0.25, y, w: CONTENT_W - 0.25, h: rowH - 0.12, fontSize: isFirst ? 13.5 : 12.5,
      bold: isFirst, color: isFirst ? C.black : C.grey, fontFace: 'Arial', align: 'left', valign: 'middle',
      margin: 0, lineSpacingMultiple: 1.1,
    });
  });

  addSourceLine(slide, 'Quelle: Konzeptdokument RIEDEL AI Sales Transformation, Abschnitt 8.', CONTENT_X, 6.4, CONTENT_W);
  addFooter(slide);
  slide.addNotes('Bevor wir zur eigentlichen Entscheidung kommen, wollen wir offen über das sprechen, was wir noch nicht wissen — das erhöht die Belastbarkeit dieser Vorlage, statt sie zu schwächen. An erster Stelle steht die CRM-Entscheidung: welches System, wann, denn sie betrifft direkt die Skalierung der Lead-Analyse und später Customer Success und Sales Reporting. Dazu kommen die Microsoft-Lizenzfragen für Copilot Studio, Power Automate und SharePoint-Berechtigungen — eine technische Voraussetzung für jeden einzelnen Baustein. Die Datenschutz- und DSFA-Klärung ist Voraussetzung für jeden Piloten einzeln. Ob eine kuratierte, aktuelle Sales-Wissensbasis existiert, bestimmt direkt, wie gut die KI-Ergebnisse überhaupt sein können. Und schließlich fehlen uns noch die Detailstrukturen der drei Kalkulationsformulare und die existierenden Vertragsvorlagen — beides bestimmt, wie die jeweiligen Bausteine konkret gebaut werden.');
})();

// ============================================================
// Slide 14 — CLOSING (Nächste Schritte / CEO Ask)
// ============================================================
(function buildSlide14() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.55, 0.5);

  slide.addText('Fünf konkrete Maßnahmen starten die AI Sales Transformation — die\nEntscheidung heute betrifft Piloten, nicht Rollout', {
    x: EDGE_MARGIN_X, y: 1.05, w: 10.7, h: 1.3, fontSize: 26, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });
  slide.addShape(ShapeType.rect, { x: EDGE_MARGIN_X, y: 2.35, w: 10.7, h: 0.03, fill: { color: C.blue }, line: { color: C.blue } });

  const measures = [
    'Lead-Analyse-Pilot freigeben: Business Owner (David Hofacker) und technischen Co-Owner benennen, Validierungsphase starten',
    'Kalkulationsprozess dokumentieren: Ist-Ablauf der drei Formulare aufnehmen, KI-Prototyp planen',
    'CRM-Entscheidung vorantreiben: Anforderungen aus den Use Cases als Input nutzen',
    'Governance-Rahmen definieren: Datenschutz, Rollen, Freigabeprozesse für KI im Vertrieb',
    'Sales-Wissensbasis aufbauen: freigegebene Positionierung, Leistungen und Proof Cases kuratieren',
  ];
  const gap = 0.2;
  const cardW = (10.7 - 4 * gap) / 5;
  const cardY = 2.65, cardH = 2.1;
  measures.forEach((m, i) => {
    const x = EDGE_MARGIN_X + i * (cardW + gap);
    addNumberedCard(slide, x, cardY, cardW, cardH, i + 1, m);
  });

  addCard(slide, ShapeType, EDGE_MARGIN_X, cardY + cardH + 0.3, 10.7, 0.85, C.deepbl, C.blue, 0.08);
  slide.addText('Heutige Entscheidung: fünf Piloten/Quick Wins und ihre Owner freigeben — kein Rollout-Beschluss.', {
    x: EDGE_MARGIN_X + 0.25, y: cardY + cardH + 0.3, w: 10.2, h: 0.85, fontSize: 14, bold: true,
    color: C.white, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.15,
  });

  addFooter(slide, undefined);
  slide.addNotes('Damit kommen wir zur eigentlichen Entscheidung, und die ist bewusst begrenzt: fünf konkrete nächste Schritte, keine Freigabe für einen vollständigen Rollout. Erstens, den Lead-Analyse-Piloten freigeben — David Hofacker als Business Owner ist bereits benannt, wir brauchen noch einen technischen Co-Owner, dann startet die Validierungsphase. Zweitens, den Kalkulationsprozess dokumentieren, um den KI-Prototyp konkret planen zu können. Drittens, die CRM-Entscheidung aktiv vorantreiben — mit den Anforderungen aus diesen Use Cases als Input. Viertens, den Governance-Rahmen für Datenschutz, Rollen und Freigabeprozesse verbindlich festlegen. Und fünftens, die Sales-Wissensbasis aufbauen, die alle Bausteine braucht. Unsere Bitte an Sie heute: diese fünf Schritte freigeben und die genannten Piloten starten lassen — nicht mehr, aber auch nicht weniger.');
})();

const outPath = path.join(REPO_ROOT, 'output', 'riedel-sales-ai-transformation', 'riedel-sales-ai-transformation.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
