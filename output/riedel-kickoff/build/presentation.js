// RIEDEL Networks Kickoff-Deck — PptxGenJS build script.
// Generates output/riedel-kickoff/riedel-kickoff.pptx from the Content Package
// (output/riedel-kickoff/docs/03-content-package.md), 15 slides, C-Level tone, MGIM CI.

const path = require('path');
const pptxgen = require('pptxgenjs');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const { C, addHeaderBar, addFooter, addCard, addAccentBar, addSlashDivider, addInsightBox } =
  require(path.join(REPO_ROOT, 'lib', 'pptx-helpers'));

const pres = new pptxgen();
pres.defineLayout({ name: 'LAYOUT_WIDE', width: 13.33, height: 7.5 });
pres.layout = 'LAYOUT_WIDE';

const ShapeType = pres.ShapeType;

// ---- Shared layout grid ----
const MARGIN_X = 0.5;
const CONTENT_X = MARGIN_X;
const CONTENT_W = 12.33;
const HEADLINE_Y = 0.62;
const HEADLINE_H = 0.75;
const CONTENT_TOP = 1.55;
const GAP_GROUP = 0.3;
const EDGE_MARGIN_X = 1.3;

const COL2_W = (CONTENT_W - 0.4) / 2;
const COL2_X = [CONTENT_X, CONTENT_X + COL2_W + 0.4];

const COL3_W = (CONTENT_W - 0.6) / 3;
const COL3_X = [CONTENT_X, CONTENT_X + COL3_W + 0.3, CONTENT_X + 2 * (COL3_W + 0.3)];

// ---- Project-local helpers ----

function addHeadline(slide, text, opts) {
  const o = opts || {};
  slide.addText(text, {
    x: CONTENT_X, y: HEADLINE_Y, w: CONTENT_W, h: HEADLINE_H,
    fontSize: o.fontSize || 26, bold: true, color: o.color || C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
  });
}

function addSourceLine(slide, text, x, y, w) {
  slide.addText(text, {
    x, y, w: w || CONTENT_W, h: 0.3, fontSize: 9, italic: true, color: C.midgrey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
  });
}

// Bulleted text block, MECE list rendering — used for CONTENT-type slides.
function addBulletBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  const bullets = items.map((t) => ({
    text: t,
    options: { bullet: { code: '2022', indent: 18 }, color: C.blue, bold: true },
  }));
  slide.addText(
    items.map((t) => ({ text: t, options: { color: C.black, bullet: { code: '2022' } } })),
    {
      x, y, w, h, fontSize: o.fontSize || 14, color: C.black, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.25,
      bullet: { code: '2022', indent: 16 },
    }
  );
}

// Single process box with label + date range, used for PROCESS timelines.
function addProcessBox(slide, x, y, w, h, title, dateRange) {
  addCard(slide, ShapeType, x, y, w, h, C.blue, C.blue, 0.08);
  slide.addText(title, {
    x: x + 0.08, y: y + 0.08, w: w - 0.16, h: h - 0.4, fontSize: 10.5, bold: true,
    color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText(dateRange, {
    x: x + 0.08, y: y + h - 0.32, w: w - 0.16, h: 0.28, fontSize: 8.5,
    color: C.white, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });
}

function addConnector(slide, x, y, w) {
  slide.addShape(ShapeType.rect, { x, y, w, h: 0.03, fill: { color: C.midgrey }, line: { color: C.midgrey } });
}

// Straight line between two arbitrary points — pptxgenjs draws a line shape along one of the two
// diagonals of its (x,y,w,h) bounding box; flipV picks which diagonal. Used for hub-and-spoke
// connectors, where every spoke sits at a different angle.
function addRadialLine(slide, x1, y1, x2, y2, color, width) {
  const sameSign = (x1 <= x2) === (y1 <= y2);
  slide.addShape(ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color, width }, flipV: !sameSign,
  });
}

// Hub-and-spoke diagram: one center node, N satellite nodes evenly spaced on a circle around it,
// connected by radial lines. Used where several independent, parallel building blocks all feed
// one central decision (no sequence implied — see brand-guide "Grey anchors, Blue activates").
function addHubAndSpoke(slide, cx, cy, hubR, spokeR, orbitR, hubLabel, spokes) {
  const n = spokes.length;
  const startAngleDeg = 90;
  const points = spokes.map((label, i) => {
    const angleDeg = startAngleDeg - i * (360 / n);
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad), dy = -Math.sin(rad);
    return { label, dx, dy, x: cx + dx * orbitR, y: cy + dy * orbitR };
  });

  points.forEach((p) => {
    const startX = cx + p.dx * hubR, startY = cy + p.dy * hubR;
    const endX = cx + p.dx * (orbitR - spokeR), endY = cy + p.dy * (orbitR - spokeR);
    addRadialLine(slide, startX, startY, endX, endY, C.midgrey, 1.5);
  });

  slide.addShape(ShapeType.ellipse, {
    x: cx - hubR, y: cy - hubR, w: hubR * 2, h: hubR * 2,
    fill: { color: C.blue }, line: { color: C.blue },
  });
  slide.addText(hubLabel, {
    x: cx - hubR, y: cy - hubR, w: hubR * 2, h: hubR * 2, fontSize: 13, bold: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.1,
  });

  points.forEach((p) => {
    slide.addShape(ShapeType.ellipse, {
      x: p.x - spokeR, y: p.y - spokeR, w: spokeR * 2, h: spokeR * 2,
      fill: { color: C.white }, line: { color: C.blue, width: 2 },
    });
    slide.addText(p.label, {
      x: p.x - spokeR, y: p.y - spokeR, w: spokeR * 2, h: spokeR * 2, fontSize: 10.5, bold: true,
      color: C.grey, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05,
    });
  });
}

const NOTES_PREFIX = '';

// ============================================================
// Slide 1 — TITLE
// ============================================================
(function buildSlide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.7, 0.6);

  slide.addText('RIEDEL startet mit MGIM die Initialisierungsphase\nfür eigenes LLM und KI-Automatisierung', {
    x: EDGE_MARGIN_X, y: 1.3, w: 10.7, h: 1.9, fontSize: 34, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
  });
  slide.addText('Feasibility & Ramp-up: Eigenes LLM & KI-Automatisierung — Kickoff-Deck', {
    x: EDGE_MARGIN_X, y: 3.25, w: 10.7, h: 0.5, fontSize: 16, color: C.blue, fontFace: 'Arial',
    align: 'left', margin: 0,
  });

  const facts = [
    ['Kickoff', '21.–22.9.2026\n(2 Tage vor Ort)'],
    ['Checkpoint 1', 'Woche 9.–13.11.2026'],
    ['Struktur', '2 Bausteine parallel'],
  ];
  const cardW = 3.4, cardGap = 0.35, cardY = 4.3, cardH = 1.5;
  facts.forEach((f, i) => {
    const x = EDGE_MARGIN_X + i * (cardW + cardGap);
    addCard(slide, ShapeType, x, cardY, cardW, cardH, C.white, C.blue, 0.08);
    slide.addText(f[0], {
      x: x + 0.2, y: cardY + 0.15, w: cardW - 0.4, h: 0.35, fontSize: 12, bold: true,
      color: C.blue, fontFace: 'Arial', align: 'left', margin: 0,
    });
    slide.addText(f[1], {
      x: x + 0.2, y: cardY + 0.5, w: cardW - 0.4, h: 0.9, fontSize: 13, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
    });
  });

  addFooter(slide);
  slide.addNotes('Guten Tag und herzlich willkommen zum Kickoff. In den nächsten Minuten stelle ich Ihnen vor, wie wir die Initialisierungsphase gemeinsam angehen: fünf Monate, zwei parallele Bausteine, ein klarer Zieltermin am Checkpoint Mitte November. Ziel dieses Kickoffs ist, dass wir am Ende des heutigen Tages mit denselben Rollen, demselben Rhythmus und denselben Erwartungen aus dem Raum gehen.');
})();

// ============================================================
// Slide 2 — PROCESS/TIMELINE (3-Phasen-Übersicht: Feasibility + Ramp-up parallel, Umsetzung später)
// ============================================================
(function buildSlide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Die Initialisierungsphase klärt Setup und Beteiligte —\nUmsetzung startet erst nach der Checkpoint-1-Entscheidung', { fontSize: 21 });

  const laneY0 = CONTENT_TOP + 0.5, laneH = 0.85, laneGap = 0.25;
  const nowW = 7.6, laterW = 4.0, laterGap = 0.5;
  const nowX = CONTENT_X;
  const laterX = nowX + nowW + laterGap;

  // "Jetzt" bracket label
  slide.addText('PHASE 1 — INITIALISIERUNG: SETUP & KLÄRUNG (21.9.–13.11.2026)', {
    x: nowX, y: laneY0 - 0.35, w: nowW, h: 0.3, fontSize: 10.5, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', margin: 0,
  });
  slide.addShape(ShapeType.rect, { x: nowX, y: laneY0 - 0.05, w: nowW, h: 0.02, fill: { color: C.grey }, line: { color: C.grey } });

  const lanesNow = [
    ['Feasibility (Baustein 1)', 'Machbarkeit "eigenes LLM"', C.blue],
    ['Ramp-up (Baustein 2)', 'Discovery KI-Automatisierung', C.deepbl],
  ];
  lanesNow.forEach((l, i) => {
    const y = laneY0 + i * (laneH + laneGap);
    addCard(slide, ShapeType, nowX, y, nowW, laneH, l[2], l[2], 0.08);
    slide.addText(l[0], {
      x: nowX + 0.2, y: y + 0.08, w: nowW - 0.4, h: 0.4, fontSize: 13.5, bold: true, color: C.white,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    });
    slide.addText(l[1], {
      x: nowX + 0.2, y: y + 0.46, w: nowW - 0.4, h: 0.35, fontSize: 10.5, color: C.white,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    });
  });

  // Arrow connecting "Jetzt" to "Später"
  slide.addShape(ShapeType.rightArrow, {
    x: nowX + nowW + 0.05, y: laneY0 + (2 * laneH + laneGap) / 2 - 0.15, w: laterGap - 0.1, h: 0.3,
    fill: { color: C.midgrey }, line: { color: C.midgrey },
  });

  // "Später" bracket label + lane
  slide.addText('PHASE 2 — UMSETZUNG (SPÄTER)', {
    x: laterX, y: laneY0 - 0.35, w: laterW, h: 0.3, fontSize: 10.5, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', margin: 0,
  });
  slide.addShape(ShapeType.rect, { x: laterX, y: laneY0 - 0.05, w: laterW, h: 0.02, fill: { color: C.grey }, line: { color: C.grey } });
  const laterH = 2 * laneH + laneGap;
  slide.addShape(ShapeType.roundRect, {
    x: laterX, y: laneY0, w: laterW, h: laterH,
    fill: { color: C.white }, line: { color: C.midgrey, width: 1.5, dashType: 'dash' }, rectRadius: 0.08,
  });
  slide.addText('Umsetzung', {
    x: laterX + 0.2, y: laneY0 + 0.25, w: laterW - 0.4, h: 0.4, fontSize: 13.5, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', margin: 0,
  });
  slide.addText('Scope & Termin folgen aus der Checkpoint-1-Entscheidung', {
    x: laterX + 0.2, y: laneY0 + 0.7, w: laterW - 0.4, h: laterH - 0.9, fontSize: 10.5, italic: true,
    color: C.midgrey, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
  });

  const kernfrage = [
    'Kernfrage der Initialisierungsphase: Wie setzen wir das Ganze auf?',
    'Wer aus dem Unternehmen muss integriert werden?',
  ];
  addBulletBlock(slide, kernfrage, CONTENT_X, laneY0 + laterH + 0.45, CONTENT_W, 0.8, { fontSize: 13.5 });

  addFooter(slide);
  slide.addNotes('Bevor wir ins Detail gehen, kurz der große Rahmen: Dieses Projekt hat insgesamt drei Phasen. Feasibility und Ramp-up laufen jetzt gleichzeitig — das ist genau das, was wir heute besprechen. Beide klären in erster Linie zwei Fragen: Wie setzen wir das Ganze technisch und organisatorisch auf, und wer aus Ihrem Unternehmen muss dafür eingebunden werden. Die eigentliche Umsetzung — also das produktive Ausrollen von eigenem LLM und Automatisierung — ist bewusst eine eigene, spätere Phase. Ihr Umfang steht heute noch nicht fest, sondern wird erst am Checkpoint 1 auf Basis dessen festgelegt, was wir bis dahin gemeinsam erarbeitet haben. Diese Unterscheidung ist wichtig, damit heute niemand erwartet, dass der Kickoff bereits der Start der Umsetzung ist.');
})();

// ============================================================
// Slide 3 — STAT / Insight (SCQA Answer / Governing Thought)
// ============================================================
(function buildSlide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Nur mit festen Commitments auf beiden Seiten liefert der\nCheckpoint am 13.11. eine fundierte Entscheidung', { fontSize: 24 });

  addCard(slide, ShapeType, CONTENT_X, CONTENT_TOP, CONTENT_W, 1.7, C.white, C.blue, 0.1);
  addAccentBar(slide, ShapeType, CONTENT_X, CONTENT_TOP, 1.7);
  slide.addText(
    'Feste Abhängigkeitskette je Baustein, klar verteilte Commitments, ein einziger definierter Checkpoint als Ziel der gesamten Phase.',
    {
      x: CONTENT_X + 0.35, y: CONTENT_TOP + 0.15, w: CONTENT_W - 0.6, h: 1.4, fontSize: 18,
      bold: true, italic: true, color: C.grey, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
    }
  );

  const items = [
    ['Anspruchsvoll & parallel', 'Beide Bausteine sind technisch/operativ anspruchsvoll und laufen von Beginn an nebeneinander.'],
    ['Ein Einzelberater', 'Ohne saubere Taktung entsteht reales Terminrisiko (siehe Folie 13).'],
    ['Eine Antwort', 'Abhängigkeitskette + Commitments + ein Checkpoint tragen die gesamte Struktur dieses Decks.'],
  ];
  const y2 = CONTENT_TOP + 2.0;
  items.forEach((it, i) => {
    const x = COL3_X[i];
    addCard(slide, ShapeType, x, y2, COL3_W, 2.7, C.white, C.midgrey, 0.08);
    slide.addText(it[0], {
      x: x + 0.2, y: y2 + 0.2, w: COL3_W - 0.4, h: 0.5, fontSize: 13, bold: true, color: C.blue,
      fontFace: 'Arial', align: 'left', margin: 0,
    });
    slide.addText(it[1], {
      x: x + 0.2, y: y2 + 0.75, w: COL3_W - 0.4, h: 1.8, fontSize: 11.5, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  addFooter(slide);
  slide.addNotes('Beide Bausteine sind anspruchsvoll, und sie laufen von Anfang an nebeneinander — nicht nacheinander. Bei einem Einzelberater ist das kein Detail, sondern die zentrale Frage dieser Phase: Wie stellen wir sicher, dass der Checkpoint am 13.11. eine wirklich fundierte Entscheidung liefert und nicht nur einen vagen Zwischenstand? Die Antwort, die ich Ihnen heute zeige: eine feste Abhängigkeitskette in jedem Baustein, klar verteilte Commitments auf beiden Seiten, und ein einziger, klar definierter Checkpoint als gemeinsames Ziel.');
})();

// ============================================================
// Slide 4 — CONTENT/TABLE (Baustein 1 Fahrplan: Was/Wer/Wann/Ergebnis)
// ============================================================
(function buildSlide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Baustein 1 führt in sechs abhängigen Schritten vom Kickoff\nzur ersten Modell- und Lizenzentscheidung', { fontSize: 22 });

  const rows = [
    ['Was', 'Wer', 'Wann', 'Ergebnis'],
    ['Kickoff & Rollen', 'MGIM (Agenda) + Axel Wehrle (Ansprechpartner)', '21.–22.9.', 'Rollen, Scope, Kommunikationsrhythmus fixiert'],
    ['Anforderungen & Leitplanken-Entwurf', 'Client-IT + MGIM; CISO/DSB kommentieren', '23.9.–10.10.', 'Gemeinsame Faktenbasis + kommentierte Leitplanken'],
    ['Datenklassifizierung & Pilot-Use-Case', 'MGIM (Logik/Vorschläge) + Fachbereiche/Axel Wehrle (Entscheidung)', '6.10.–24.10.', 'Klassifizierung fixiert, Pilot-Use-Case gewählt'],
    ['Anforderungsworkshop & techn. Definition', 'MGIM (Moderation) + Fachbereichsleiter (Teilnahme)', '27.10.–7.11.', 'Dokumentierte Anforderungen, gemeinsames Scope-Verständnis'],
    ['Vendor-Screening & Lizenzprüfung', 'MGIM', '3.–14.11.', 'Modell-Tendenz + geklärte Lizenzrisiken'],
    ['Checkpoint-1-Vorlage', 'MGIM (Vorlage) + Axel Wehrle/GF (Entscheidung)', 'Woche 9.–13.11.', 'Fortsetzungs-/Anpassungs-/Abbruchentscheidung'],
  ];
  const tableRows = rows.map((r, ri) => r.map((cell, ci) => ({
    text: cell,
    options: {
      bold: ri === 0 || ci === 0,
      color: ri === 0 ? C.white : (ci === 3 ? C.deepbl : C.black),
      fill: { color: ri === 0 ? C.grey : (ri % 2 === 0 ? C.offwht : C.white) },
      fontSize: ri === 0 ? 11.5 : 10,
      align: 'left', valign: 'middle', fontFace: 'Arial',
    },
  })));
  slide.addTable(tableRows, {
    x: CONTENT_X, y: CONTENT_TOP, w: CONTENT_W, h: 4.7,
    colW: [2.6, 3.6, 1.7, 4.43],
    border: { type: 'solid', color: C.ltgrey, pt: 1 },
    autoPage: false,
  });

  addSourceLine(slide, 'Risiko- & Abhängigkeitslog läuft ab 3.10. parallel und laufend über die gesamte Phase — macht Verzögerungen früh sichtbar.', CONTENT_X, CONTENT_TOP + 4.85, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Baustein 1 ist keine offene Explorationsphase, sondern eine feste Kette von sechs Schritten, bei der jeder Schritt auf dem vorherigen aufbaut. Diese Tabelle zeigt für jeden Schritt drei Dinge auf einen Blick: wer liefert, bis wann, und was am Ende dabei herauskommt. Wir beginnen mit dem Kickoff selbst, gehen über Anforderungen und Leitplanken in die Datenklassifizierung und Pilot-Use-Case-Auswahl, validieren das in einem Workshop, screenen dann den Markt und die Lizenzlage, und bündeln alles in der Checkpoint-1-Vorlage. Das Risiko- und Abhängigkeitslog läuft die ganze Zeit parallel mit und macht Verzögerungen früh sichtbar, statt sie erst am Checkpoint zu entdecken.');
})();

// ============================================================
// Slide 5 — CONTENT (Begriffsklärung, 3-part icon block)
// ============================================================
(function buildSlide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, '"Eigenes LLM" heißt Open-Weight-Modell plus RAG und\nFine-Tuning — kein Training from Scratch', { fontSize: 24 });

  const parts = [
    ['Open-Weight-Basismodell', 'Mistral, Aleph Alpha, Llama, OpenGPT-X — statt ein Modell "from Scratch" zu trainieren.'],
    ['+  RAG', 'Bindet unternehmenseigene Daten kontrolliert ein, ohne sie ins Modell einzutrainieren.'],
    ['+  Fine-Tuning / LoRA', 'Passt das Modell gezielt an RIEDEL-spezifische Aufgaben an — mit überschaubarem Aufwand.'],
  ];
  const y = CONTENT_TOP + 0.2;
  parts.forEach((p, i) => {
    const x = COL3_X[i];
    addCard(slide, ShapeType, x, y, COL3_W, 2.6, C.offwht, C.blue, 0.1);
    slide.addText(p[0], {
      x: x + 0.2, y: y + 0.2, w: COL3_W - 0.4, h: 0.6, fontSize: 14, bold: true, color: C.blue,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0,
    });
    slide.addText(p[1], {
      x: x + 0.2, y: y + 0.85, w: COL3_W - 0.4, h: 1.6, fontSize: 11.5, color: C.black,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  addInsightBox(slide, ShapeType, 'Der genaue Umfang wird im Arbeitspaket "Technische Definition" (27.10.–7.11.) gemeinsam verbindlich festgelegt — Ziel: realistische Erwartungen an Umfang und Kosten von Anfang an.', CONTENT_X, y + 2.85, CONTENT_W, 0.7);

  addFooter(slide);
  slide.addNotes('Bevor wir tiefer einsteigen, kurz eine Erwartungsklärung: "Eigenes LLM" bedeutet nicht, dass wir ein Sprachmodell von null trainieren — das wäre für ein Unternehmen in dieser Größenordnung weder sinnvoll noch wirtschaftlich. Es bedeutet: ein bestehendes Open-Weight-Modell als Basis, RAG für den kontrollierten Zugriff auf Ihre eigenen Daten, und Fine-Tuning beziehungsweise LoRA für die gezielte Anpassung an Ihre Aufgaben. Diese drei Bausteine zusammen ergeben "Ihr eigenes LLM" — mit einem überschaubaren, kalkulierbaren Aufwand statt einer technologischen Wundertüte. Der genaue Zuschnitt wird im Oktober/November gemeinsam verbindlich festgelegt.');
})();

// ============================================================
// Slide 6 — PROCESS/Framework (Anforderungen & Leitplanken, hub-and-spoke)
// ============================================================
(function buildSlide6() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Erst eine gemeinsame Fakten- und Leitplankenbasis macht\nspätere Architekturentscheidungen belastbar', { fontSize: 22 });

  const diagCx = CONTENT_X + 3.9, diagCy = CONTENT_TOP + 2.6;
  addHubAndSpoke(slide, diagCx, diagCy, 0.75, 0.65, 1.75, 'Architektur-\nentscheidung', [
    'Datenklassi-\nfizierung/-räume',
    'Zugriff /\nRollen',
    'Audit /\nLogging',
    'Verfügbarkeit /\nLatenz',
    'Human-in-\nthe-Loop',
  ]);

  const legendX = CONTENT_X + 8.1, legendW = CONTENT_X + CONTENT_W - legendX;
  slide.addText('KI-Leitplanken & Betriebsanforderungen — fünf Bausteine, die gemeinsam die Architekturentscheidung tragen:', {
    x: legendX, y: CONTENT_TOP + 0.05, w: legendW, h: 0.55, fontSize: 11, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });

  const legendItems = [
    ['Datenklassifizierung/-räume', 'Was darf wohin (RAG/Fine-Tuning ja/nein)?'],
    ['Zugriff / Rollen', 'Wer darf worauf zugreifen?'],
    ['Audit / Logging', 'Wer hat wann was gemacht?'],
    ['Verfügbarkeit / Latenz', 'Wie schnell und wie stabil muss es laufen?'],
    ['Human-in-the-Loop', 'Wo entscheidet zwingend ein Mensch mit?'],
  ];
  let legendY = CONTENT_TOP + 0.65;
  legendItems.forEach((item) => {
    slide.addShape(ShapeType.rect, { x: legendX, y: legendY + 0.05, w: 0.12, h: 0.12, fill: { color: C.blue }, line: { color: C.blue } });
    slide.addText(
      [
        { text: item[0], options: { bold: true, color: C.grey, breakLine: true } },
        { text: item[1], options: { color: C.midgrey } },
      ],
      {
        x: legendX + 0.25, y: legendY - 0.08, w: legendW - 0.25, h: 0.6, fontSize: 10.5,
        fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
      }
    );
    legendY += 0.72;
  });

  slide.addShape(ShapeType.rect, { x: legendX, y: legendY + 0.05, w: legendW, h: 0.02, fill: { color: C.ltgrey }, line: { color: C.ltgrey } });
  addSourceLine(slide, 'Entwurf bis 6.10., CISO/DSB-Kommentierung bis 10.10. Risiko-/Abhängigkeitslog läuft ab 3.10. parallel und laufend.', legendX, legendY + 0.2, legendW);

  addFooter(slide);
  slide.addNotes('Jede spätere technische Entscheidung wird an diesen Leitplanken gemessen — deshalb kommen sie so früh in der Phase. Fünf Bausteine müssen dafür erarbeitet werden, und sie stehen bewusst gleichberechtigt nebeneinander, nicht in einer Reihenfolge: Datenklassifizierung, Zugriff und Rollen, Audit und Logging, Verfügbarkeit und Latenz, und Human-in-the-Loop. Erst wenn alle fünf stehen, ist die Architekturentscheidung wirklich belastbar. CISO und Datenschutzbeauftragter kommentieren den Entwurf, bevor er verbindlich wird. Und ab dem 3.10. läuft das Risiko-Log mit — damit wir Verzögerungen sehen, bevor sie zum Problem werden, nicht erst danach.');
})();

// ============================================================
// Slide 7 — CONTENT (Datenklassifizierung & Pilot-Use-Case, 2 parallel blocks)
// ============================================================
(function buildSlide7() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Datenklassifizierung und Pilot-Use-Case-Wahl entscheiden\nparallel, was technisch überhaupt zulässig und sinnvoll ist', { fontSize: 22 });

  slide.addShape(ShapeType.rect, { x: CONTENT_X, y: CONTENT_TOP, w: CONTENT_W, h: 0.35, fill: { color: C.ltgrey }, line: { color: C.ltgrey } });
  slide.addText('Gemeinsames Zeitfenster: 6.10.–24.10.2026', {
    x: CONTENT_X + 0.15, y: CONTENT_TOP, w: CONTENT_W - 0.3, h: 0.35, fontSize: 11, bold: true,
    color: C.grey, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
  });

  const blocks = [
    ['Datenklassifizierung', [
      'MGIM liefert Klassifizierungslogik + Ergebnis bis 24.10.',
      'Fachbereiche liefern Dateninventar-Input bis 13.10.',
      'Klärt verbindlich: was darf in RAG/Fine-Tuning einfließen, was nie',
    ]],
    ['Pilot-Use-Case-Auswahl', [
      'MGIM liefert 2–3 Kandidaten bis 17.10.',
      'Fachbereiche + Axel Wehrle entscheiden bis 24.10.',
      'Verhindert eine abstrakte Technologiediskussion ohne greifbaren Anwendungsfall',
    ]],
  ];
  blocks.forEach((b, i) => {
    const x = COL2_X[i];
    addCard(slide, ShapeType, x, CONTENT_TOP + 0.55, COL2_W, 3.6, C.offwht, C.midgrey, 0.1);
    slide.addText(b[0], {
      x: x + 0.25, y: CONTENT_TOP + 0.75, w: COL2_W - 0.5, h: 0.4, fontSize: 15, bold: true,
      color: C.blue, fontFace: 'Arial', align: 'left', margin: 0,
    });
    addBulletBlock(slide, b[1], x + 0.25, CONTENT_TOP + 1.25, COL2_W - 0.5, 2.7, { fontSize: 12.5 });
  });

  addFooter(slide);
  slide.addNotes('Diese beiden Arbeitspakete laufen bewusst gleichzeitig, weil sie sich gegenseitig schärfen: Die Datenklassifizierung legt fest, was überhaupt in RAG oder Fine-Tuning einfließen darf — und was nie. Die Pilot-Use-Case-Auswahl sorgt dafür, dass wir nicht abstrakt über Technologie diskutieren, sondern an einem oder zwei konkreten, aus Ihren Fachbereichen ausgewählten Fällen arbeiten. Beides zusammen verhindert, dass wir im November mit einer technisch sauberen, aber praktisch irrelevanten Lösung dastehen.');
})();

// ============================================================
// Slide 8 — COMPARISON (Vendor screening table)
// ============================================================
(function buildSlide8() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Modellwahl und Lizenzprüfung laufen bewusst getrennt von der\nTechnologiebegeisterung — Screening vor Festlegung', { fontSize: 21 });

  const rows = [
    ['Anbieter', 'Positionierung', 'Relevanz für RIEDEL'],
    ['Mistral', 'EU-souverän, kosteneffizient, starke Sprachqualität Deutsch', 'Wahrscheinliches Arbeitspferd für breitere Anwendungsfälle'],
    ['Aleph Alpha', 'Heidelberg, on-premise-fähig, Fokus regulierte Branchen', 'Passt zu sicherheitskritischem NOC-/Netzwerkbetrieb'],
    ['Meta Llama', 'Kommerziell nutzbar mit Nutzerzahl-Ausschlussklausel', 'Lizenzprüfung zwingend vor Festlegung'],
    ['OpenGPT-X', 'Deutsches Konsortium, im Marktvergleich zuletzt zurückgefallen', 'Souveränitäts-Option, mit realistischer Erwartungshaltung prüfen'],
  ];
  const tableRows = rows.map((r, ri) => r.map((cell) => ({
    text: cell,
    options: {
      bold: ri === 0, color: ri === 0 ? C.white : C.black, fill: { color: ri === 0 ? C.grey : (ri % 2 === 0 ? C.offwht : C.white) },
      fontSize: ri === 0 ? 12 : 11, align: 'left', valign: 'middle', fontFace: 'Arial',
    },
  })));
  slide.addTable(tableRows, {
    x: CONTENT_X, y: CONTENT_TOP, w: CONTENT_W, h: 3.3,
    colW: [1.8, 5.0, 5.53],
    border: { type: 'solid', color: C.ltgrey, pt: 1 },
    autoPage: false,
  });

  addInsightBox(slide, ShapeType, 'Lizenzrechtliche Prüfung startet parallel (bis 7.11.) — Open-Weight bedeutet nicht automatisch lizenzfreie Nutzung. Nutzungsbeschränkungen variieren je Modell/Version und müssen bei jedem Versionswechsel neu geprüft werden. Beides ist explizites Checkpoint-1-Kriterium.', CONTENT_X, CONTENT_TOP + 3.55, CONTENT_W, 1.05);
  addSourceLine(slide, 'Quelle Anbieter-Positionierung: ki-beratung-unternehmen.de, LLM-Vergleich DACH, 2026. Quelle Lizenzrisiko: Skillbyte Insights, 2026.', CONTENT_X, CONTENT_TOP + 4.65, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Vier Kandidaten stehen im Screening: Mistral als europäisch-souveränes, kosteneffizientes Arbeitspferd, Aleph Alpha aus Heidelberg mit Fokus auf On-Premise und regulierte Branchen, Meta Llama als kommerziell nutzbar, aber mit einer Nutzerzahl-Ausschlussklausel, und OpenGPT-X als deutsches Konsortialprojekt, das im Marktvergleich zuletzt etwas zurückgefallen ist. Wichtig: Open Weight heißt nicht automatisch lizenzfrei nutzbar. Deshalb läuft parallel zum Markt-Screening eine eigene lizenzrechtliche Prüfung — und genau das ist ein explizites Kriterium für den Checkpoint, nicht nur eine Randnotiz.');
})();

// ============================================================
// Slide 9 — PROCESS (Baustein 2 Fahrplan: 3 chevron phases, each with its
// underlying work packages listed in a card beneath it — deduktiv, so the
// arrow shape reinforces the fixed sequence, unlike Folie 6's hub-and-spoke)
// ============================================================
(function buildSlide9() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Baustein 2 macht die Discovery in drei abhängigen Schritten\nvon der Bereichsliste bis zur Use-Case-Longlist steuerbar', { fontSize: 21 });

  addSourceLine(slide, 'Die übergreifenden Setup-Arbeitspakete (Kickoff, Anforderungserhebung, Risiko-Log) sind bereits in Baustein 1 abgedeckt und gelten für beide Bausteine gemeinsam.', CONTENT_X, CONTENT_TOP, CONTENT_W);

  const phases = [
    {
      title: 'Scope &\nVorbereitung', date: '21.9.–3.10.',
      items: ['Scope-Bestätigung (Teil Kickoff): Bereichsliste + Ansprechpartner bestätigt', 'Interview-Vorbereitung (23.9.–3.10.): Leitfaden + Terminplanung'],
    },
    {
      title: 'Interviews &\nProzessprüfung', date: '6.10.–24.10.',
      items: ['Interviews mit Prozessverantwortlichen, exemplarisch je Bereich', 'Parallel: Auswertung Ist-Prozessdokumentation & Tool-Umgebung inkl. NOC-Ablaufpläne'],
    },
    {
      title: 'Use-Case-Longlist\n& Scoring', date: '27.10.–7.11.',
      items: ['Longlist über alle Bereiche + Opportunity Scoring (Wirkung × Automatisierbarkeit × Datenverfügbarkeit)', 'Ergebnis fließt in die gemeinsame Fokusbereich-Auswahl am Checkpoint 1'],
    },
  ];

  const gap = 0.3;
  const chevW = (CONTENT_W - 2 * gap) / 3;
  const chevY = CONTENT_TOP + 0.45, chevH = 0.9;
  const cardY = chevY + chevH + 0.2, cardH = 2.5;

  phases.forEach((p, i) => {
    const x = CONTENT_X + i * (chevW + gap);
    slide.addShape(ShapeType.chevron, {
      x, y: chevY, w: chevW, h: chevH, fill: { color: C.blue }, line: { color: C.blue },
    });
    slide.addText(p.title, {
      x: x + 0.15, y: chevY + 0.08, w: chevW - 0.3, h: 0.55, fontSize: 12.5, bold: true, color: C.white,
      fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05,
    });
    slide.addText(p.date, {
      x: x + 0.15, y: chevY + chevH - 0.32, w: chevW - 0.3, h: 0.28, fontSize: 9.5, color: C.white,
      fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
    });

    addCard(slide, ShapeType, x, cardY, chevW, cardH, C.offwht, C.midgrey, 0.08);
    addBulletBlock(slide, p.items, x + 0.2, cardY + 0.2, chevW - 0.4, cardH - 0.4, { fontSize: 10.5 });
  });

  addInsightBox(slide, ShapeType,
    'Am Checkpoint 1 (Woche 9.–13.11.) entscheiden Axel Wehrle/GF gemeinsam mit MGIM anhand dieser Longlist über den Fokusbereich für den Umsetzungsstart — siehe Folie 14.',
    CONTENT_X, cardY + cardH + 0.2, CONTENT_W, 0.6);

  addFooter(slide);
  slide.addNotes('Auch Baustein 2 ist kein offener Suchprozess, sondern eine feste Kette von drei Schritten. Wir starten direkt beim Kickoff mit der Bestätigung der Bereichsliste und der Interview-Vorbereitung, führen dann die Interviews durch und werten parallel die vorhandene Prozessdokumentation aus, und bauen daraus eine Longlist mit Opportunity Scoring. Das Ergebnis dieser drei Schritte ist die Grundlage für die gemeinsame Fokusbereich-Auswahl, die dann am Checkpoint mit Axel Wehrle und der Geschäftsführung getroffen wird — das ist bewusst kein vierter Schritt von Baustein 2 selbst, sondern der gemeinsame Entscheidungspunkt, den wir auf der Checkpoint-Folie noch einmal im Detail zeigen.');
})();

// ============================================================
// Slide 10 — CONTENT (Interviews & Prozessprüfung, 2 blocks)
// ============================================================
(function buildSlide10() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Strukturierte Interviews mit Prozessverantwortlichen holen\nPain Points direkt an der Quelle statt aus Annahmen', { fontSize: 22 });

  slide.addShape(ShapeType.rect, { x: CONTENT_X, y: CONTENT_TOP, w: CONTENT_W, h: 0.35, fill: { color: C.ltgrey }, line: { color: C.ltgrey } });
  slide.addText('Gemeinsames Zeitfenster: 6.10.–24.10.2026 — parallel zu Folie 7 (Baustein 1)', {
    x: CONTENT_X + 0.15, y: CONTENT_TOP, w: CONTENT_W - 0.3, h: 0.35, fontSize: 11, bold: true,
    color: C.grey, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0,
  });

  const blocks = [
    ['Interviews', [
      'Leitfrage: "Was kostet täglich Zeit?" — Leitfaden bis 26.9.',
      'Interviewtermine je Bereich bis 3.10. bestätigt',
      'Exemplarisch je Bereich, Durchführung bis 24.10.',
    ]],
    ['Prozessdokumentation', [
      'Auswertung vorhandener Ist-Prozesslandschaft & Tool-Umgebung',
      'Inklusive NOC-Ablaufpläne',
      'Kein zusätzlicher Client-Termin nötig, bis 24.10.',
    ]],
  ];
  blocks.forEach((b, i) => {
    const x = COL2_X[i];
    addCard(slide, ShapeType, x, CONTENT_TOP + 0.55, COL2_W, 3.3, C.white, C.midgrey, 0.1);
    slide.addText(b[0], {
      x: x + 0.25, y: CONTENT_TOP + 0.75, w: COL2_W - 0.5, h: 0.4, fontSize: 15, bold: true,
      color: C.blue, fontFace: 'Arial', align: 'left', margin: 0,
    });
    addBulletBlock(slide, b[1], x + 0.25, CONTENT_TOP + 1.25, COL2_W - 0.5, 2.4, { fontSize: 12.5 });
  });

  addFooter(slide);
  slide.addNotes('Der Interview-Leitfaden stellt bewusst eine einfache, konkrete Frage in den Mittelpunkt: Was kostet im Arbeitsalltag täglich Zeit? Das liefert vergleichbare, verwertbare Antworten statt allgemeiner Aussagen zu "KI-Potenzial". Parallel werten wir vorhandene Prozessdokumentation aus, einschließlich Ihrer NOC-Ablaufpläne, ohne dass dafür ein zusätzlicher Termin mit Ihnen nötig ist. Wichtig für die Erwartungshaltung: Diese Interviews laufen im selben Zeitfenster wie zwei zeitkritische Arbeitspakete aus Baustein 1 — dazu gleich mehr auf der Kapazitäts-Folie.');
})();

// ============================================================
// Slide 11 — PROCESS/Framework (Opportunity Scoring, 3-axis, no fabricated data)
// ============================================================
(function buildSlide11() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Opportunity Scoring nach Wirkung, Automatisierbarkeit und\nDatenverfügbarkeit macht die Fokusauswahl objektiv', { fontSize: 21 });

  const axes = ['Wirkung', 'Automatisierbarkeit', 'Datenverfügbarkeit'];
  const y10 = CONTENT_TOP + 0.3;
  axes.forEach((a, i) => {
    const x = COL3_X[i];
    addCard(slide, ShapeType, x, y10, COL3_W, 1.5, C.blue, C.blue, 0.1);
    slide.addText(a, {
      x: x + 0.1, y: y10, w: COL3_W - 0.2, h: 1.5, fontSize: 15, bold: true, color: C.white,
      fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
    });
    if (i < axes.length - 1) {
      slide.addText('×', { x: x + COL3_W, y: y10, w: 0.3, h: 1.5, fontSize: 20, bold: true, color: C.grey, fontFace: 'Arial', align: 'center', valign: 'middle' });
    }
  });
  slide.addShape(ShapeType.rect, { x: CONTENT_X, y: y10 + 1.65, w: CONTENT_W, h: 0.03, fill: { color: C.midgrey }, line: { color: C.midgrey } });
  slide.addText('= Opportunity Score je Use-Case', {
    x: CONTENT_X, y: y10 + 1.8, w: CONTENT_W, h: 0.4, fontSize: 13, bold: true, italic: true,
    color: C.grey, fontFace: 'Arial', align: 'center', margin: 0,
  });

  const bullets = [
    'Longlist über alle Unternehmensbereiche, MGIM liefert bis 7.11.',
    'Ergebnis ist vergleichbar, nicht Einzelmeinung — Grundlage für die Fokusbereich-Entscheidung am Checkpoint',
    'Konkrete Scores entstehen erst im Projektverlauf aus den Interviews — diese Folie zeigt das Bewertungsraster, keine vorweggenommenen Ergebnisse',
  ];
  addBulletBlock(slide, bullets, CONTENT_X, y10 + 2.4, CONTENT_W, 1.3, { fontSize: 13 });

  addFooter(slide);
  slide.addNotes('Damit die Auswahl des Fokusbereichs am Checkpoint nicht auf Bauchgefühl beruht, bewerten wir jede Idee aus der Longlist nach demselben Raster: Wirkung, Automatisierbarkeit und Datenverfügbarkeit. Das macht unterschiedliche Bereiche — Netzwerkbetrieb, Kundenservice, Projektabwicklung — überhaupt erst vergleichbar. Zur Einordnung: Die konkreten Scores existieren heute noch nicht, sie entstehen aus den Interviews und der Prozessprüfung im Oktober. Was ich Ihnen heute zeige, ist das Raster, nach dem wir bewerten werden.');
})();

// ============================================================
// Slide 12 — COMPARISON (Commitments MGIM vs RIEDEL)
// ============================================================
(function buildSlide12() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Der Fahrplan funktioniert nur mit klar verteilten Commitments\nauf beiden Seiten — nicht nur MGIM liefert', { fontSize: 21 });

  const colY = CONTENT_TOP + 0.1, colH = 3.5;
  // Left: MGIM (grey header)
  slide.addShape(ShapeType.rect, { x: COL2_X[0], y: colY, w: COL2_W, h: 0.5, fill: { color: C.grey }, line: { color: C.grey } });
  slide.addText('MGIM liefert', { x: COL2_X[0] + 0.15, y: colY, w: COL2_W - 0.3, h: 0.5, fontSize: 14, bold: true, color: C.white, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0 });
  addBulletBlock(slide, [
    'Kickoff-Agenda, strukturierte Anforderungsaufnahme',
    'Leitplanken-Entwurf, Klassifizierungslogik',
    'Vorschlagslisten (Pilot-Use-Cases, Vendoren)',
    'Interview-Leitfaden & -Durchführung',
    'Longlist + Scoring, Checkpoint-Vorlage',
  ], COL2_X[0] + 0.15, colY + 0.65, COL2_W - 0.3, colH - 0.7, { fontSize: 12.5 });

  // Right: RIEDEL (blue header)
  slide.addShape(ShapeType.rect, { x: COL2_X[1], y: colY, w: COL2_W, h: 0.5, fill: { color: C.blue }, line: { color: C.blue } });
  slide.addText('RIEDEL / Axel Wehrle liefert', { x: COL2_X[1] + 0.15, y: colY, w: COL2_W - 0.3, h: 0.5, fontSize: 14, bold: true, color: C.white, fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0 });
  addBulletBlock(slide, [
    'Ansprechpartner (CISO/DSB/Legal/Fachbereiche)',
    'Systemübersicht, Kommentierung der Leitplanken',
    'Dateninventar-Input, Entscheidung Pilot-Use-Cases',
    'Teilnahme an Interviews',
    'Vorhandene Prozessdokumentation',
  ], COL2_X[1] + 0.15, colY + 0.65, COL2_W - 0.3, colH - 0.7, { fontSize: 12.5 });

  // Thin divider
  slide.addShape(ShapeType.rect, { x: CONTENT_X + COL2_W + 0.2, y: colY, w: 0.02, h: colH, fill: { color: C.ltgrey }, line: { color: C.ltgrey } });

  addInsightBox(slide, ShapeType, 'Beide Seiten laufend: Mitwirkung am Risiko- und Abhängigkeitslog. Fehlt ein Beitrag, verschiebt sich die gesamte nachgelagerte Kette — nicht nur ein Arbeitspaket.', CONTENT_X, colY + colH + 0.15, CONTENT_W, 0.8);

  addFooter(slide);
  slide.addNotes('Dieser Fahrplan ist explizit keine Einbahnstraße. Für jedes Arbeitspaket, das ich liefere, gibt es eine Gegenleistung von Ihrer Seite — einen Ansprechpartner, eine Entscheidung, ein Dokument, eine Teilnahme. Das ist kein Misstrauensvotum, sondern die ehrliche Konsequenz aus der Abhängigkeitskette, die wir gerade durchgegangen sind: Wenn eine Seite ihren Beitrag nicht rechtzeitig liefert, verschiebt sich nicht nur ein Arbeitspaket, sondern die gesamte nachgelagerte Kette bis zum Checkpoint.');
})();

// ============================================================
// Slide 13 — CHART (Kapazitätsrisiko swimlane)
// ============================================================
(function buildSlide13() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Eine Woche mit vier parallelen kritischen Strängen ist das\ngrößte Terminrisiko der Phase', { fontSize: 22 });

  const chartPath = path.join(REPO_ROOT, 'output', 'riedel-kickoff', 'charts', 'slide_13_chart.png');
  slide.addImage({ path: chartPath, x: 0.5, y: 1.2, w: 8.5, h: 4.8 });

  addInsightBox(slide, ShapeType,
    'Drei Entzerrungsoptionen — bereits heute geplant:\n\n1. Interviews auf 2 statt 3 Wochen verdichten\n\n2. Budget-Zwischenlieferung auf Screening-Basis halten\n\n3. Pilot-Use-Case-Auswahl (B1) eine Woche vorziehen',
    9.2, 1.5, 3.8, 4.5);

  addSourceLine(slide, 'Quelle: MGIM, Detailplanung Initialisierungsphase RIEDEL Networks, Stand 16.9.2026.', 0.5, 6.05, 8.5);
  addFooter(slide);
  slide.addNotes('Ich zeige Ihnen dieses Risiko bewusst offen und heute, nicht erst wenn es eintritt. In der Woche vom 6. bis 24. Oktober laufen bei mir als Einzelberater vier zeitkritische Stränge gleichzeitig: zwei aus Baustein 1, zwei aus Baustein 2, plus die Budget-Zwischenlieferung mitten in dieser Phase. Das ist die höchste Belastungsspitze der gesamten Initialisierungsphase. Ich habe dafür bereits drei konkrete Entzerrungsoptionen vorbereitet, die wir heute gemeinsam entscheiden sollten, statt sie im Oktober unter Zeitdruck zu improvisieren.');
})();

// ============================================================
// Slide 14 — STAT/TIMELINE (Checkpoint 1 als Entscheidungspunkt)
// ============================================================
(function buildSlide14() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Checkpoint 1 Mitte November ist der einzige Punkt, an dem\ngemeinsam über Fortsetzung, Anpassung oder Abbruch entschieden wird', { fontSize: 20 });

  const streams = [
    ['Baustein 1 liefert', ['Fixierte Leitplanken', 'White-Label-Zielbild', 'Geklärte Lizenzrisiken', 'Initiale Vendor-Shortlist']],
    ['Baustein 2 liefert', ['Use-Case-Longlist + Scoring', 'Gemeinsame Fokusbereich-Auswahl']],
  ];
  streams.forEach((s, i) => {
    const x = COL2_X[i];
    addCard(slide, ShapeType, x, CONTENT_TOP + 0.1, COL2_W, 2.0, C.white, C.blue, 0.1);
    slide.addText(s[0], {
      x: x + 0.2, y: CONTENT_TOP + 0.25, w: COL2_W - 0.4, h: 0.4, fontSize: 14, bold: true,
      color: C.blue, fontFace: 'Arial', align: 'left', margin: 0,
    });
    addBulletBlock(slide, s[1], x + 0.2, CONTENT_TOP + 0.7, COL2_W - 0.4, 1.3, { fontSize: 12 });
  });

  slide.addText('▼  Checkpoint 1 — Woche 9.–13.11.2026', {
    x: CONTENT_X, y: CONTENT_TOP + 2.25, w: CONTENT_W, h: 0.45, fontSize: 15, bold: true,
    color: C.grey, fontFace: 'Arial', align: 'center', margin: 0,
  });

  const decisions = ['Fortsetzung', 'Anpassung', 'Bewusster Abbruch'];
  const dY = CONTENT_TOP + 2.85;
  decisions.forEach((d, i) => {
    const x = COL3_X[i];
    addCard(slide, ShapeType, x, dY, COL3_W, 0.8, C.grey, C.grey, 0.08);
    slide.addText(d, {
      x: x, y: dY, w: COL3_W, h: 0.8, fontSize: 13, bold: true, color: C.white, fontFace: 'Arial',
      align: 'center', valign: 'middle', margin: 0,
    });
  });
  addSourceLine(slide, 'Entscheidungsvorlage: MGIM. Auf Faktenbasis, nicht auf Bauchgefühl.', CONTENT_X, dY + 0.95, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Alles, was wir heute besprechen, läuft auf einen einzigen Punkt zu: den Checkpoint in der Woche vom 9. bis 13. November. Dort bringen wir die Ergebnisse aus beiden Bausteinen zusammen — fixierte Leitplanken, geklärte Lizenzfragen und eine erste Vendor-Tendenz aus Baustein 1, sowie die bewertete Use-Case-Longlist und eine gemeinsame Fokusbereich-Entscheidung aus Baustein 2. Am Checkpoint entscheiden Sie dann auf einer klaren Faktenbasis, wie es weitergeht — mit voller Fortsetzung, mit Anpassungen, oder, falls die Faktenlage es nahelegt, auch mit einem bewussten Stopp.');
})();

// ============================================================
// Slide 15 — CLOSING
// ============================================================
(function buildSlide15() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.7, 0.6);

  slide.addText('Der Kickoff selbst ist der erste Commitment-Moment —\nRollen und Ansprechpartner müssen bis Kickoff-Ende stehen', {
    x: EDGE_MARGIN_X, y: 1.4, w: 10.7, h: 1.7, fontSize: 27, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });
  slide.addShape(ShapeType.rect, { x: EDGE_MARGIN_X, y: 3.15, w: 3.5, h: 0.03, fill: { color: C.blue }, line: { color: C.blue } });

  const todos = [
    'Bis Kickoff-Ende (22.9.): Axel Wehrle benennt Ansprechpartner CISO/DSB/Legal/Fachbereiche',
    'Bis Kickoff-Ende: Bestätigung/Ergänzung der Bereichsliste für Baustein 2 (Discovery)',
    'MGIM liefert die Kickoff-Agenda vorab bis 19.9.',
  ];
  slide.addText(
    todos.map((t) => ({ text: t, options: { color: C.white, bullet: { code: '2022' } } })),
    {
      x: EDGE_MARGIN_X, y: 3.5, w: 10.7, h: 1.8, fontSize: 15, color: C.white, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.3, bullet: { code: '2022', indent: 18 },
    }
  );

  slide.addText('Nächster fixer Termin: Checkpoint 1 — Woche 9.–13.11.2026', {
    x: EDGE_MARGIN_X, y: 5.5, w: 10.7, h: 0.5, fontSize: 15, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'left', margin: 0,
  });

  addFooter(slide, 'Markus Goetz Interim Management  |  www.markusgoetz.com');
  slide.addNotes('Damit schließt sich der Kreis zum Anfang dieser Präsentation: Der Kickoff selbst ist bereits der erste Commitment-Moment im Fahrplan. Bevor wir heute auseinandergehen, brauchen wir von Ihnen die Ansprechpartner aus CISO, Datenschutz, Legal und den Fachbereichen sowie die bestätigte Bereichsliste für die Discovery. Von unserer Seite liegt die Kickoff-Agenda bereits vor. Der nächste fixe Termin, auf den ab heute alles hinarbeitet, ist der Checkpoint in der Woche vom 9. bis 13. November.');
})();

const outPath = path.join(REPO_ROOT, 'output', 'riedel-kickoff', 'riedel-kickoff.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Presentation saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
