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
// Each item needs its own breakLine, otherwise pptxgenjs treats the whole array as one paragraph
// (one bullet glyph, all items run together with no line break) — this bit for real on several
// slides before it was caught.
function addBulletBlock(slide, items, x, y, w, h, opts) {
  const o = opts || {};
  slide.addText(
    items.map((t, i) => ({ text: t, options: { color: C.black, bullet: { code: '2022' }, breakLine: i < items.length - 1 } })),
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
  slide.addText('Fünf Bausteine, die gemeinsam die Architekturentscheidung tragen:', {
    x: legendX, y: CONTENT_TOP + 0.05, w: legendW, h: 0.4, fontSize: 11, bold: true, color: C.grey,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });

  const legendRows = [
    ['Baustein', 'Nutzen'],
    ['Datenklassifizierung/-räume\n(Was darf wohin?)', 'Verhindert Compliance-Nacharbeit später'],
    ['Zugriff / Rollen\n(Wer darf worauf zu?)', 'Kontrollierter Zugriff ab Tag 1, kein Berechtigungschaos'],
    ['Audit / Logging\n(Wer hat was gemacht?)', 'Nachvollziehbarkeit im Ernstfall, Audit-fähig'],
    ['Verfügbarkeit / Latenz\n(Wie schnell, wie stabil?)', 'Realistische SLAs statt späterer Betriebsüberraschungen'],
    ['Human-in-the-Loop\n(Wo entscheidet der Mensch?)', 'Vertrauen der Mitarbeitenden, klare Haftungsgrenzen'],
  ];
  const legendTableRows = legendRows.map((r, ri) => r.map((cell) => ({
    text: cell,
    options: {
      bold: ri === 0, color: ri === 0 ? C.white : C.black, fill: { color: ri === 0 ? C.grey : (ri % 2 === 0 ? C.white : C.offwht) },
      fontSize: ri === 0 ? 10 : 9, align: 'left', valign: 'middle', fontFace: 'Arial',
    },
  })));
  slide.addTable(legendTableRows, {
    x: legendX, y: CONTENT_TOP + 0.5, w: legendW, h: 4.25,
    colW: [1.95, legendW - 1.95],
    border: { type: 'solid', color: C.ltgrey, pt: 1 },
    autoPage: false,
  });

  addSourceLine(slide, 'Entwurf bis 6.10., CISO/DSB-Kommentierung bis 10.10. Risiko-/Abhängigkeitslog läuft ab 3.10. parallel und laufend.', legendX, CONTENT_TOP + 4.9, legendW);

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
// Slide 11 — PROCESS/Framework (Opportunity Scoring: rating scale + labeled
// illustrative example, not a bare formula — for C-level legibility)
// ============================================================
(function buildSlide11() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Opportunity Scoring nach Wirkung, Automatisierbarkeit und\nDatenverfügbarkeit macht die Fokusauswahl objektiv', { fontSize: 21 });

  const scaleRows = [
    ['Dimension', '1 — gering', '2 — mittel', '3 — hoch'],
    ['Wirkung', 'Geringe Zeit-/Kostenersparnis', 'Spürbare Verbesserung', 'Signifikanter Hebel bei Zeit, Kosten oder Qualität'],
    ['Automatisierbarkeit', 'Viele Ausnahmen, stark manuell', 'Teilweise regelbasiert', 'Klar regelbasiert, wenig Ausnahmen'],
    ['Datenverfügbarkeit', 'Daten verstreut oder unvollständig', 'Teilweise strukturiert vorhanden', 'Strukturiert & zugänglich vorhanden'],
  ];
  const scaleTableRows = scaleRows.map((r, ri) => r.map((cell, ci) => ({
    text: cell,
    options: {
      bold: ri === 0 || ci === 0, color: ri === 0 ? C.white : C.black,
      fill: { color: ri === 0 ? C.grey : (ri % 2 === 0 ? C.offwht : C.white) },
      fontSize: ri === 0 ? 11 : 10, align: 'left', valign: 'middle', fontFace: 'Arial',
    },
  })));
  const tableY = CONTENT_TOP + 0.1;
  slide.addTable(scaleTableRows, {
    x: CONTENT_X, y: tableY, w: CONTENT_W, h: 2.5,
    colW: [2.4, 3.31, 3.31, 3.31],
    border: { type: 'solid', color: C.ltgrey, pt: 1 },
    autoPage: false,
  });

  const formulaY = tableY + 2.7;
  slide.addText(
    [
      { text: 'Score = Wirkung × Automatisierbarkeit × Datenverfügbarkeit  ', options: { bold: true, color: C.grey } },
      { text: '(max. 27 — höchster Score = höchste Priorität)', options: { italic: true, color: C.midgrey } },
    ],
    {
      x: CONTENT_X, y: formulaY, w: CONTENT_W, h: 0.4, fontSize: 14, fontFace: 'Arial',
      align: 'center', valign: 'middle', margin: 0,
    }
  );

  const exampleY = formulaY + 0.55;
  addCard(slide, ShapeType, CONTENT_X, exampleY, CONTENT_W, 1.35, C.offwht, C.blue, 0.1);
  slide.addText('BEISPIELHAFTE ILLUSTRATION — keine reale Bewertung, keine echten Daten', {
    x: CONTENT_X + 0.25, y: exampleY + 0.12, w: CONTENT_W - 0.5, h: 0.3, fontSize: 9.5, bold: true,
    color: C.blue, fontFace: 'Arial', align: 'left', margin: 0,
  });
  slide.addText(
    [
      { text: 'Angenommener Use-Case "Rechnungsprüfung automatisieren": ', options: { color: C.black } },
      { text: 'Wirkung 3 × Automatisierbarkeit 2 × Datenverfügbarkeit 3 = Score 18 → hohe Priorität für die Fokusbereich-Auswahl.', options: { bold: true, color: C.grey } },
    ],
    {
      x: CONTENT_X + 0.25, y: exampleY + 0.48, w: CONTENT_W - 0.5, h: 0.8, fontSize: 12.5,
      fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
    }
  );

  addSourceLine(slide, 'Longlist über alle Unternehmensbereiche, MGIM liefert bis 7.11. Konkrete Scores entstehen erst aus den Interviews und der Prozessprüfung im Oktober — hier gezeigt wird nur das Bewertungsraster.', CONTENT_X, exampleY + 1.5, CONTENT_W);

  addFooter(slide);
  slide.addNotes('Damit die Auswahl des Fokusbereichs am Checkpoint nicht auf Bauchgefühl beruht, bewerten wir jede Idee aus der Longlist nach demselben Raster, mit einer einfachen Skala von 1 bis 3 je Dimension: Wirkung, Automatisierbarkeit und Datenverfügbarkeit. Multipliziert ergibt das einen Score von maximal 27 — je höher, desto höher die Priorität. Zur Veranschaulichung ein rein angenommenes Beispiel, keine echte Bewertung: Ein Use-Case mit hoher Wirkung, mittlerer Automatisierbarkeit und hoher Datenverfügbarkeit käme auf einen Score von 18. Die tatsächlichen Scores entstehen erst aus den Interviews und der Prozessprüfung im Oktober — was ich Ihnen heute zeige, ist das Raster, nach dem wir bewerten werden.');
})();

// ============================================================
// Slide 12 — TABLE (Commitments MGIM vs RIEDEL, with a blank "Verantwortlich"
// column for Axel Wehrle to name a name live in the room)
// ============================================================
(function buildSlide12() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Der Fahrplan funktioniert nur mit klar verteilten Commitments\nauf beiden Seiten — nicht nur MGIM liefert', { fontSize: 21 });

  const rows = [
    ['Arbeitspaket', 'MGIM liefert', 'RIEDEL liefert', 'Verantwortlich (RIEDEL)'],
    ['Kickoff & Rollen', 'Kickoff-Agenda', 'Ansprechpartner CISO/DSB/Legal/Fachbereiche', ''],
    ['Anforderungen & Leitplanken', 'Anforderungsaufnahme, Leitplanken-Entwurf', 'Systemübersicht, Kommentierung der Leitplanken', ''],
    ['Datenklassifizierung & Pilot-Use-Case', 'Klassifizierungslogik, Vorschlagsliste Use-Cases', 'Dateninventar-Input, Entscheidung Pilot-Use-Case', ''],
    ['Discovery (Baustein 2)', 'Interview-Leitfaden & -Durchführung', 'Bereichsliste, Ansprechpartner, Interview-Teilnahme, Prozessdokumentation', ''],
    ['Longlist & Checkpoint', 'Longlist + Scoring, Checkpoint-Vorlage', 'Entscheidung Fokusbereich am Checkpoint', ''],
  ];
  const tableRows = rows.map((r, ri) => r.map((cell, ci) => ({
    text: cell || (ri === 0 ? '' : '_______________'),
    options: {
      bold: ri === 0, color: ri === 0 ? C.white : (ci === 3 ? C.midgrey : C.black),
      fill: { color: ri === 0 ? C.grey : (ri % 2 === 0 ? C.offwht : C.white) },
      fontSize: ri === 0 ? 11 : 10, align: 'left', valign: 'middle', fontFace: 'Arial',
    },
  })));
  slide.addTable(tableRows, {
    x: CONTENT_X, y: CONTENT_TOP + 0.1, w: CONTENT_W, h: 3.9,
    colW: [2.3, 3.5, 4.33, 2.2],
    border: { type: 'solid', color: C.ltgrey, pt: 1 },
    autoPage: false,
  });

  addInsightBox(slide, ShapeType, 'Beide Seiten laufend: Mitwirkung am Risiko- und Abhängigkeitslog. Fehlt ein Beitrag, verschiebt sich die gesamte nachgelagerte Kette — nicht nur ein Arbeitspaket. Die letzte Spalte tragen wir gern direkt gemeinsam ein.', CONTENT_X, CONTENT_TOP + 4.15, CONTENT_W, 0.75);

  addFooter(slide);
  slide.addNotes('Dieser Fahrplan ist explizit keine Einbahnstraße. Für jedes Arbeitspaket, das ich liefere, gibt es eine Gegenleistung von Ihrer Seite — einen Ansprechpartner, eine Entscheidung, ein Dokument, eine Teilnahme. Das ist kein Misstrauensvotum, sondern die ehrliche Konsequenz aus der Abhängigkeitskette, die wir gerade durchgegangen sind. Die letzte Spalte lassen wir bewusst offen: Wenn Sie mögen, tragen wir jetzt gemeinsam ein, wer bei Ihnen für welches Arbeitspaket verantwortlich zeichnet — dann verlässt niemand den Raum mit einer offenen Zuordnung. Wenn eine Seite ihren Beitrag nicht rechtzeitig liefert, verschiebt sich nicht nur ein Arbeitspaket, sondern die gesamte nachgelagerte Kette bis zum Checkpoint.');
})();

// ============================================================
// Slide 13 — CHART (Kapazitätsrisiko swimlane)
// ============================================================
(function buildSlide13() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Ihre Interviews kollidieren mit zwei kritischen Baustein-1-Arbeiten —\ndas entschärfen wir jetzt gemeinsam, nicht erst im Oktober', { fontSize: 19 });

  const chartPath = path.join(REPO_ROOT, 'output', 'riedel-kickoff', 'charts', 'slide_13_chart.png');
  slide.addImage({ path: chartPath, x: 0.5, y: 1.2, w: 8.5, h: 4.8 });

  addInsightBox(slide, ShapeType,
    'Betrifft Sie direkt: Ihre Fachbereiche stehen in derselben Woche für Interviews UND für die Pilot-Use-Case-Entscheidung bereit.\n\nWelche Option passt am besten — bitte heute entscheiden:\n\n1. Interviews auf 2 statt 3 Wochen verdichten\n\n2. Budget-Zwischenlieferung auf Screening-Basis halten\n\n3. Pilot-Use-Case-Auswahl (B1) eine Woche vorziehen',
    9.2, 1.15, 3.8, 4.85);

  addSourceLine(slide, 'Quelle: MGIM, Detailplanung Initialisierungsphase RIEDEL Networks, Stand 16.9.2026.', 0.5, 6.05, 8.5);
  addFooter(slide);
  slide.addNotes('Ich zeige Ihnen dieses Risiko bewusst offen und heute, nicht erst wenn es eintritt — und es betrifft Sie direkt, nicht nur mich als Berater: In derselben Woche brauche ich Ihre Fachbereiche sowohl für die Interviews als auch für die Pilot-Use-Case-Entscheidung in Baustein 1. Ich habe dafür drei konkrete Entzerrungsoptionen vorbereitet. Lassen Sie uns jetzt gemeinsam entscheiden, welche für Sie am besten passt, statt das im Oktober unter Zeitdruck zu improvisieren.');
})();

// ============================================================
// Slide 14 — PROCESS/TIMELINE (Checkpoint 1: several running decision points
// converge into one consolidated continuation decision — not "the only
// point," which read as a single-gate, high-risk governance model)
// ============================================================
(function buildSlide14() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Mehrere laufende Entscheidungen bündeln sich am Checkpoint 1\nzu einer gemeinsamen Fortsetzungsentscheidung', { fontSize: 21 });

  const milestones = [
    ['Kickoff:\nRollen & Scope', '21.–22.9.'],
    ['Leitplanken\nkommentiert', 'bis 10.10.'],
    ['Pilot-Use-Case\nentschieden', 'bis 24.10.'],
    ['Longlist\nbewertet', 'bis 7.11.'],
  ];
  const msGap = 0.25;
  const msW = (CONTENT_W - 3 * msGap) / 4;
  const msY = CONTENT_TOP + 0.1, msH = 1.05;
  milestones.forEach((m, i) => {
    const x = CONTENT_X + i * (msW + msGap);
    if (i > 0) addConnector(slide, x - msGap, msY + msH / 2, msGap);
    addProcessBox(slide, x, msY, msW, msH, m[0], m[1]);
  });

  slide.addText('bündelt sich zu', {
    x: CONTENT_X, y: msY + msH + 0.08, w: CONTENT_W, h: 0.3, fontSize: 11, italic: true,
    color: C.midgrey, fontFace: 'Arial', align: 'center', margin: 0,
  });

  const cpY = msY + msH + 0.45, cpW = 6.0, cpX = CONTENT_X + (CONTENT_W - cpW) / 2;
  addCard(slide, ShapeType, cpX, cpY, cpW, 0.85, C.blue, C.blue, 0.1);
  slide.addText('Checkpoint 1 — Woche 9.–13.11.2026', {
    x: cpX, y: cpY, w: cpW, h: 0.85, fontSize: 15, bold: true, color: C.white,
    fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  });

  const decisions = ['Fortsetzung', 'Anpassung', 'Bewusster Abbruch'];
  const dY = cpY + 0.85 + 0.35;
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
  slide.addNotes('Governance in dieser Phase heißt nicht: fünf Monate arbeiten und erst am Ende erfahren, ob es funktioniert hat. Es gibt laufend Entscheidungspunkte — die Kickoff-Rollen, die Kommentierung der Leitplanken durch CISO und Datenschutz, die Pilot-Use-Case-Entscheidung, die bewertete Longlist. All das bündelt sich am Checkpoint in der Woche vom 9. bis 13. November zu einer gemeinsamen, gut vorbereiteten Fortsetzungsentscheidung — mit voller Fortsetzung, mit Anpassungen, oder, falls die Faktenlage es nahelegt, auch mit einem bewussten Stopp.');
})();

// ============================================================
// Slide 15 — CLOSING
// ============================================================
(function buildSlide15() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.7, 0.6);

  slide.addText('Der Kickoff gelingt am besten mit Ihrer Einschätzung, wer aus\ndem Unternehmen eingebunden werden sollte', {
    x: EDGE_MARGIN_X, y: 1.25, w: 10.7, h: 1.5, fontSize: 25, bold: true, color: C.white,
    fontFace: 'Arial', align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.15,
  });
  slide.addShape(ShapeType.rect, { x: EDGE_MARGIN_X, y: 2.85, w: 3.5, h: 0.03, fill: { color: C.blue }, line: { color: C.blue } });

  const asks = [
    'Wir würden Sie bitten, uns bis Kickoff-Ende die Ansprechpartner für CISO, Datenschutz, Legal und die Fachbereiche zu nennen',
    'Ihre Sicht ist gefragt: Passt die vorgeschlagene Bereichsliste für die Discovery, oder sehen Sie das anders?',
    'MGIM liefert die Kickoff-Agenda vorab bis 19.9.',
  ];
  slide.addText(
    asks.map((t, i) => ({ text: t, options: { color: C.white, bullet: { code: '2022' }, breakLine: i < asks.length - 1 } })),
    {
      x: EDGE_MARGIN_X, y: 3.15, w: 10.7, h: 1.5, fontSize: 14, color: C.white, fontFace: 'Arial',
      align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.3, bullet: { code: '2022', indent: 18 },
    }
  );

  addCard(slide, ShapeType, EDGE_MARGIN_X, 4.85, 10.3, 1.0, C.deepbl, C.blue, 0.1);
  slide.addText(
    [
      { text: 'Eine Frage an Sie: ', options: { bold: true, color: C.white } },
      { text: 'Wie würden Sie selbst an die Einbindung der Fachbereiche herangehen? Ihre Erfahrung ist hier der wichtigste Kompass für diesen Fahrplan.', options: { color: C.white, italic: true } },
    ],
    {
      x: EDGE_MARGIN_X + 0.25, y: 4.85, w: 9.8, h: 1.0, fontSize: 13.5, fontFace: 'Arial',
      align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.2,
    }
  );

  slide.addText('Nächster fixer Termin: Checkpoint 1 — Woche 9.–13.11.2026', {
    x: EDGE_MARGIN_X, y: 6.1, w: 10.7, h: 0.4, fontSize: 14, bold: true, color: C.blue,
    fontFace: 'Arial', align: 'left', margin: 0,
  });

  addFooter(slide, 'Markus Goetz Interim Management  |  www.markusgoetz.com');
  slide.addNotes('Bevor wir auseinandergehen, drei Bitten statt Vorgaben von meiner Seite: Könnten Sie uns bis Kickoff-Ende die Ansprechpartner aus CISO, Datenschutz, Legal und den Fachbereichen nennen? Und wie sehen Sie die vorgeschlagene Bereichsliste für die Discovery — passt die aus Ihrer Sicht, oder würden Sie etwas anders schneiden? Von unserer Seite liegt die Kickoff-Agenda bereits vor. Und weil Sie hier deutlich tiefer im Unternehmen stecken als ich: Wie würden Sie selbst an die Einbindung der Fachbereiche herangehen? Das ist keine rhetorische Frage — Ihre Erfahrung soll diesen Fahrplan mitprägen, nicht nur bestätigen. Der nächste fixe Termin, auf den ab heute alles hinarbeitet, ist der Checkpoint in der Woche vom 9. bis 13. November.');
})();

const outPath = path.join(REPO_ROOT, 'output', 'riedel-kickoff', 'riedel-kickoff.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Presentation saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
