// MGIM Presentation Pipeline — "AI Transformation Partner" / AI Impact Sprint Pitch-Deck
// Re-run after the subagent architecture was dissolved; built directly by the
// presentation-orchestrator skill in one continuous pass (no delegated Design phase).
// C-Level / formal-exekutiv tonality. Requires the canonical pptx-helpers — never redefine
// color tokens or primitives inline.

const path = require('path');
const pptxgen = require('pptxgenjs');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const {
  C, addHeaderBar, addFooter, addCard, addAccentBar, addSlashDivider, addInsightBox,
} = require(path.join(REPO_ROOT, 'lib', 'pptx-helpers'));

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5in
const ShapeType = pres.ShapeType;
const FONT = 'Arial';

// ---------------------------------------------------------------------------------------------
// Shared layout grid — one set of constants every slide draws from.
// ---------------------------------------------------------------------------------------------
const MARGIN_X = 0.5;
const CONTENT_X = MARGIN_X;
const CONTENT_W = 13.33 - 2 * MARGIN_X; // 12.33
const HEADLINE_Y = 0.62;
const HEADLINE_H = 0.75;
const CONTENT_TOP = 1.55;
const GAP_GROUP = 0.3;
const GAP_CAPTION = 0.15;

const EDGE_MARGIN_X = 1.3;
const EDGE_CONTENT_W = 13.33 - 2 * EDGE_MARGIN_X; // 10.73
const EDGE_COL2_X = [EDGE_MARGIN_X, 13.33 - EDGE_MARGIN_X - 5.2];

const COL2_GAP = 0.33;
const COL2_W = (CONTENT_W - COL2_GAP) / 2; // 6.00
const COL2_X = [CONTENT_X, CONTENT_X + COL2_W + COL2_GAP];

const COL3_GAP = 0.27;
const COL3_W = (CONTENT_W - COL3_GAP * 2) / 3; // 3.93
const COL3_X = [CONTENT_X, CONTENT_X + COL3_W + COL3_GAP, CONTENT_X + 2 * (COL3_W + COL3_GAP)];

function addHeadline(slide, text, opts) {
  const o = opts || {};
  slide.addText(text, {
    x: CONTENT_X, y: HEADLINE_Y, w: CONTENT_W, h: HEADLINE_H,
    fontSize: o.fontSize || 26, bold: true, color: o.color || C.grey, fontFace: FONT,
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.02,
  });
}

function addSourceLine(slide, x, y, w, text) {
  slide.addText(text, {
    x, y, w, h: 0.3, fontSize: 9, italic: true, color: C.midgrey, fontFace: FONT,
    align: 'left', valign: 'top', margin: 0,
  });
}

// Card + big number + label, top-anchored, consistent vertical rhythm across all STAT slides.
function addStatCard(slide, x, y, w, h, number, label, opts) {
  const o = opts || {};
  const pad = 0.18;
  addCard(slide, ShapeType, x, y, w, h, o.bg || C.offwht, o.border || C.midgrey, 0.08);
  slide.addText(number, {
    x: x + pad, y: y + pad, w: w - 2 * pad, h: h * 0.55,
    fontSize: o.numberSize || 40, bold: true, color: o.numberColor || C.blue, fontFace: FONT,
    align: 'left', valign: 'top', margin: 0,
  });
  slide.addText(label, {
    x: x + pad, y: y + h * 0.55 + pad * 0.5, w: w - 2 * pad, h: h * 0.4 - pad,
    fontSize: o.labelSize || 12, color: C.black, fontFace: FONT,
    align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.05,
  });
}

// Freestanding hero number without a card — for the single dominant stat per slide.
function addHeroNumber(slide, x, y, w, number, label, opts) {
  const o = opts || {};
  const numberH = o.numberH || 1.8;
  const labelH = o.labelH || 0.7;
  slide.addText(number, {
    x, y, w, h: numberH, fontSize: o.numberSize || 96, bold: true, color: o.numberColor || C.blue,
    fontFace: FONT, align: o.align || 'left', valign: 'middle', margin: 0,
  });
  slide.addText(label, {
    x, y: y + numberH, w, h: labelH, fontSize: o.labelSize || 14, color: o.labelColor || C.black,
    fontFace: FONT, align: o.align || 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.05,
  });
}

// ---------------------------------------------------------------------------------------------
// Slide 1 — TITLE
// ---------------------------------------------------------------------------------------------
(function buildSlide1() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.75, 1.2);

  slide.addText('Der deutsche Mittelstand investiert 2026 so stark in AI wie nie zuvor', {
    x: EDGE_MARGIN_X, y: 1.35, w: EDGE_CONTENT_W, h: 1.7,
    fontSize: 36, bold: true, color: C.white, fontFace: FONT, align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.08,
  });
  slide.addText('AI Transformation Partner für den Mittelstand — Telekommunikation, Medien, Versicherung', {
    x: EDGE_MARGIN_X, y: 3.05, w: EDGE_CONTENT_W, h: 0.5,
    fontSize: 16, color: C.blue, fontFace: FONT, align: 'left', margin: 0,
  });

  addHeroNumber(slide, EDGE_COL2_X[0], 4.05, 5.2, '41%', 'der deutschen Unternehmen setzen AI aktiv ein', {
    numberSize: 72, numberColor: C.blue, labelColor: C.white, numberH: 1.3, labelH: 0.6,
  });
  addHeroNumber(slide, EDGE_COL2_X[1], 4.05, 5.2, '17%', 'Vorjahreswert — mehr als verdoppelt', {
    numberSize: 72, numberColor: C.midgrey, labelColor: C.white, numberH: 1.3, labelH: 0.6,
  });
  addSourceLine(slide, EDGE_MARGIN_X, 6.1, 10, 'Quelle: Bitkom, KI-Studie 2026 (Befragung von 604 Unternehmen ab 20 Beschäftigten)');

  addFooter(slide);
  slide.addNotes('Guten Tag und herzlich willkommen. Bevor wir über Lösungen sprechen, ein Blick auf die Ausgangslage: AI-Investition ist in Deutschland 2026 keine Ausnahme mehr, sondern Mehrheitsverhalten. 41 Prozent der deutschen Unternehmen setzen AI bereits aktiv ein — im Vorjahr waren es 17 Prozent. Das ist mehr als eine Verdopplung binnen zwölf Monaten. Weitere 48 Prozent planen oder diskutieren den Einsatz. Sie sind also mit dieser Frage nicht allein — die Mehrheit des Marktes bewegt sich gerade in dieselbe Richtung wie Sie.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 2 — STAT (SCQA Complication -> Answer / Governing Thought)
// ---------------------------------------------------------------------------------------------
(function buildSlide2() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Nur 27% amortisieren ihre AI-Investition in 12–24 Monaten — die Frage ist nicht ob, sondern wie Sie die Lücke schließen');

  addStatCard(slide, COL2_X[0], CONTENT_TOP, COL2_W, 1.9, '27%', 'erreichen volle Amortisation ihrer AI-Investition binnen 12–24 Monaten', { numberSize: 56, labelSize: 13 });
  addSourceLine(slide, COL2_X[0], CONTENT_TOP + 1.9 + GAP_CAPTION, COL2_W, 'Quelle: Deloitte, "The ROI of AI – German Cut", Februar 2026');

  addStatCard(slide, COL2_X[1], CONTENT_TOP, COL2_W, 1.9, '25%', 'AI-Nutzung im deutschen Mittelstand — deutlicher Rückstand zum Gesamtmarkt', { numberSize: 56, labelSize: 13 });
  addSourceLine(slide, COL2_X[1], CONTENT_TOP + 1.9 + GAP_CAPTION, COL2_W, 'Quelle: Bitkom, KI-Barometer 2026');

  const calloutY = CONTENT_TOP + 1.9 + GAP_CAPTION + 0.35 + GAP_GROUP;
  addInsightBox(slide, ShapeType,
    'Die Antwort: Mitarbeiter, Prozesse und Führung gezielt befähigen — erprobt in einem geführten 10-Tage-Sprint mit Festpreis, bevor Sie größer skalieren.',
    CONTENT_X, calloutY, CONTENT_W, 1.1);

  addFooter(slide);
  slide.addNotes('Doch Investition ist nicht gleich Wirkung. Laut Deloitte erreichen nur 27 Prozent der deutschen Unternehmen innerhalb von ein bis zwei Jahren eine volle Amortisation ihrer AI-Investition. Im Mittelstand ist die Lücke noch größer: Hier liegt die aktive Nutzung bei nur 25 Prozent — deutlich hinter dem Gesamtmarkt. Das ist die eigentliche Frage, vor der Sie heute stehen: nicht ob Sie in AI investieren, sondern wie Sie aus dieser Investition tatsächlich Wirkung machen, schnell und risikoarm überprüfbar. Unsere Antwort darauf, die ich Ihnen in den nächsten Minuten zeige: Mitarbeiter, Prozesse und Führung gezielt befähigen, erprobt in einem geführten 10-Tage-Sprint mit Festpreis, bevor Sie größer skalieren.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 3 — STAT (three independent evidence strands, induktiv)
// ---------------------------------------------------------------------------------------------
(function buildSlide3() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Das "KI-Paradox" ist in Deutschland empirisch belegt, nicht gefühlt');

  const cardH = 2.5;
  addStatCard(slide, COL3_X[0], CONTENT_TOP, COL3_W, cardH, '0,2% → 47%', 'der Unternehmen erzeugen 47% des gesamten AI-Produktivitätsgewinns 2019–2023', { numberSize: 30, labelSize: 12, bg: C.white });
  addSourceLine(slide, COL3_X[0], CONTENT_TOP + cardH + GAP_CAPTION, COL3_W, 'Quelle: McKinsey, 2026');

  addStatCard(slide, COL3_X[1], CONTENT_TOP, COL3_W, cardH, '95%', 'der GenAI-Pilotprojekte zeigen keinen messbaren Effekt auf Umsatz oder Kosten', { numberSize: 40, labelSize: 12, bg: C.white });
  addSourceLine(slide, COL3_X[1], CONTENT_TOP + cardH + GAP_CAPTION, COL3_W, 'Quelle: MIT Project NANDA, 2025');

  addStatCard(slide, COL3_X[2], CONTENT_TOP, COL3_W, cardH, '2% vs. 10%', 'verorten die AI-Agenda beim CEO — Deutschland vs. international', { numberSize: 30, labelSize: 12, bg: C.white });
  addSourceLine(slide, COL3_X[2], CONTENT_TOP + cardH + GAP_CAPTION, COL3_W, 'Quelle: Deloitte, 2026');

  addFooter(slide);
  slide.addNotes('Vier unabhängige Studien zeigen dasselbe Muster, nicht nur eine Einzelmeinung. McKinsey hat 16.200 deutsche Unternehmen analysiert: Gerade einmal 29 Unternehmen — 0,2 Prozent der Stichprobe — erzeugten fast die Hälfte des gesamten Produktivitätswachstums zwischen 2019 und 2023. Das MIT bestätigt das international: 95 Prozent der GenAI-Pilotprojekte zeigen trotz Milliardeninvestitionen keinen messbaren Effekt auf Gewinn oder Verlust — der sogenannte GenAI Divide. Und Deloitte liefert den entscheidenden Hinweis, warum: In Deutschland verorten nur 2 Prozent der Unternehmen die AI-Agenda überhaupt beim CEO, international sind es immerhin 10 Prozent.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 4 — STAT/COMPARISON (three industry ist-vs-soll pairs)
// ---------------------------------------------------------------------------------------------
(function buildSlide4() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Im Mittelstand ist die Lücke am größten — genau dort, wo Ihr Unternehmen steht');

  const cardH = 2.7;
  const branches = [
    { title: 'Versicherung', a: '66%', aLabel: 'individuelle Nutzung', b: '22%', bLabel: 'produktiver Unternehmenseinsatz', src: 'Quelle: GDV, 2026' },
    { title: 'Medien', a: '91%', aLabel: 'mit AI-Strategie', b: '77%', bLabel: 'setzen sie in großem Umfang um', src: 'Quelle: KPMG, 2025' },
    { title: 'Telekommunikation', a: '75%', aLabel: 'Effizienzgewinn (Höchstwert)', b: 'Top-Engpass', bLabel: 'Mitarbeiterqualifikation', src: 'Quelle: Trend-Studie Contact Center, 2026' },
  ];
  branches.forEach((br, i) => {
    const x = COL3_X[i];
    slide.addText(br.title.toUpperCase(), {
      x, y: CONTENT_TOP, w: COL3_W, h: 0.3, fontSize: 12, bold: true, color: C.grey, fontFace: FONT, align: 'left', margin: 0, charSpacing: 1,
    });
    addStatCard(slide, x, CONTENT_TOP + 0.35, COL3_W, 1.05, br.a, br.aLabel, { numberSize: 26, labelSize: 11 });
    addStatCard(slide, x, CONTENT_TOP + 0.35 + 1.05 + 0.12, COL3_W, 1.05, br.b, br.bLabel, { numberSize: 26, labelSize: 11, numberColor: C.grey });
    addSourceLine(slide, x, CONTENT_TOP + 0.35 + 2 * 1.05 + 0.12 + GAP_CAPTION, COL3_W, br.src);
  });

  slide.addText('Branchenweiter Trend, keine mittelstandsexklusive Erhebung (100–1.000 MA).', {
    x: CONTENT_X, y: CONTENT_TOP + 0.35 + 2 * 1.05 + 0.12 + 0.4, w: CONTENT_W, h: 0.3,
    fontSize: 9, italic: true, color: C.midgrey, fontFace: FONT, align: 'left', margin: 0,
  });

  addFooter(slide);
  slide.addNotes('Und diese Lücke zeigt sich in Ihren drei Branchen besonders deutlich. In der Versicherungswirtschaft nutzen laut GDV bereits zwei von drei Mitarbeitenden AI im Alltag — aber nur bei 22 Prozent der Unternehmen ist das produktiv verankert. In der Medienbranche haben laut KPMG 91 Prozent der Unternehmen eine AI-Strategie entwickelt, aber nur 77 Prozent setzen sie tatsächlich in großem Umfang um. In der Telekommunikation erreichen die Effizienzgewinne einen Höchstwert von 75 Prozent — der größte Engpass ist die Qualifikation der Mitarbeitenden. Wichtiger Hinweis: Diese Zahlen bilden branchenweite Trends ab, nicht speziell den Mittelstand — dafür gibt es aktuell keine gesonderte Erhebung.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 5 — STAT (hero + two secondary — Schatten-AI risk)
// ---------------------------------------------------------------------------------------------
(function buildSlide5() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, '77% der deutschen Fachkräfte nutzen längst eigene AI-Tools ohne Freigabe');

  addHeroNumber(slide, COL2_X[0], CONTENT_TOP, COL2_W, '77%', 'deutsche MINT-Fachkräfte nutzen KI-Tools wie ChatGPT ohne Freigabe durch IT oder Management', { numberSize: 88, numberH: 1.9, labelH: 1.0, labelSize: 14 });
  addSourceLine(slide, COL2_X[0], CONTENT_TOP + 1.9 + 1.0, COL2_W, 'Quelle: dpa/CSO Online');

  const cardH = 1.35;
  addStatCard(slide, COL2_X[1], CONTENT_TOP, COL2_W, cardH, '670.000 $', 'durchschnittliche Mehrkosten pro Schatten-AI-Datenschutzverletzung', { numberSize: 32, labelSize: 12 });
  addSourceLine(slide, COL2_X[1], CONTENT_TOP + cardH + GAP_CAPTION, COL2_W, 'Quelle: Verizon DBIR, 2026');

  addStatCard(slide, COL2_X[1], CONTENT_TOP + cardH + GAP_CAPTION + 0.35 + GAP_GROUP, COL2_W, cardH, '75%', 'der Nutzer geben zu, dabei potenziell sensible Daten eingegeben zu haben', { numberSize: 32, labelSize: 12, numberColor: C.deepbl });
  addSourceLine(slide, COL2_X[1], CONTENT_TOP + 2 * cardH + GAP_CAPTION + 0.35 + GAP_GROUP + GAP_CAPTION, COL2_W, 'Quelle: UpGuard/Verizon DBIR, 2026');

  addFooter(slide);
  slide.addNotes('Diese Lücke wächst zusätzlich durch ein Risiko, das schon heute in Ihrem Unternehmen passiert. Drei von vier deutschen MINT-Fachkräften nutzen laut dpa und CSO Online KI-Tools bei der Arbeit, ohne dass IT-Abteilung oder Management davon wissen. Der Verizon Data Breach Investigations Report zeigt, was das kosten kann: Datenschutzverletzungen mit Ursprung in Schatten-AI verursachen im Schnitt 670.000 US-Dollar Mehrkosten. Und drei von vier Nutzern geben zu, dabei potenziell sensible Kunden- oder Mitarbeiterdaten eingegeben zu haben. Das eigentliche Risiko liegt dabei nicht bei den Mitarbeitenden — es liegt in der Organisation selbst, die diese Nutzung nicht steuert. Die gute Nachricht: Die Ursache ist nicht die Technologie, sondern drei konkret angehbare Stellen.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 6 — PROCESS (3-step training program, Hebel 1)
// ---------------------------------------------------------------------------------------------
(function buildSlide6() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Ohne befähigte Mitarbeiter bleibt jedes AI-Tool ungenutzt — strukturiertes Training macht AI-Nutzung messbar produktiv');

  const steps = [
    { label: 'Tag 1\nPrompting\n(ACTION-Framework)', out: 'Strukturiertes Prompting an echten Projekten der Mitarbeiter' },
    { label: 'Tag 2\nAgenten-Bau', out: 'Eigene AI-Agenten bauen — hands-on statt Trainingsbeispiel' },
    { label: 'Tag 3\nKPI-Steuerung', out: 'Steuerung über klare KPIs + qualitätsgesicherte Prompt Library' },
  ];
  const gap = 0.3;
  const boxW = (CONTENT_W - gap * 2) / 3;
  const boxH = 1.3;
  steps.forEach((s, i) => {
    const x = CONTENT_X + i * (boxW + gap);
    addCard(slide, ShapeType, x, CONTENT_TOP, boxW, boxH, C.blue, C.blue, 0.1);
    slide.addText(s.label, {
      x: x + 0.15, y: CONTENT_TOP, w: boxW - 0.3, h: boxH,
      fontSize: 15, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05,
    });
    slide.addText(s.out, {
      x, y: CONTENT_TOP + boxH + GAP_CAPTION, w: boxW, h: 1.2,
      fontSize: 12, color: C.black, fontFace: FONT, align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
    });
    if (i < steps.length - 1) {
      slide.addShape(ShapeType.rect, {
        x: x + boxW + 0.02, y: CONTENT_TOP + boxH / 2 - 0.025, w: gap - 0.04, h: 0.05,
        fill: { color: C.midgrey }, line: { color: C.midgrey },
      });
    }
  });

  slide.addText('Ergebnis: Mitarbeiter arbeiten produktiv mit AI — messbar schneller, präziser, selbstständiger.', {
    x: CONTENT_X, y: CONTENT_TOP + boxH + GAP_CAPTION + 1.25, w: CONTENT_W, h: 0.4,
    fontSize: 13, bold: true, color: C.deepbl, fontFace: FONT, align: 'left', margin: 0,
  });

  addFooter(slide);
  slide.addNotes('Die Ursache der Lücke liegt an drei Stellen — Mensch, Prozess, Führung — und lässt sich an allen dreien gezielt schließen. Der erste Hebel setzt bei den Menschen an, die AI täglich nutzen sollen. Unser 3-Tages-Programm vermittelt strukturiertes Prompting nach dem ACTION-Framework, den Bau eigener AI-Agenten und die Steuerung über klare KPIs — und zwar an den eigenen, echten Projekten der Mitarbeiter. Am Ende steht eine Prompt Library mit sofort einsetzbaren, qualitätsgesicherten Prompts für den Arbeitsalltag.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 7 — CHART (Hebel 2, Prozessanalyse)
// ---------------------------------------------------------------------------------------------
(function buildSlide7() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Prozesse werden erst effizient, wenn AI passgenau auf echte Schmerzpunkte trifft — nicht wenn Tools gekauft werden');

  slide.addImage({
    path: path.join(REPO_ROOT, 'output', 'ai-transformation-partner', 'charts', 'slide_07_chart.png'),
    x: 0.5, y: 1.6, w: 8.2, h: 4.6,
  });
  addInsightBox(slide, ShapeType,
    'End-to-End-Prozessanalyse vor Tool-Auswahl: Priorisierung nach Impact, Automatisierbarkeit und Datenverfügbarkeit — maßgeschneidertes Solution Design statt Tool-Kauf auf Verdacht.',
    9.0, 1.8, 3.9, 3.6);

  addFooter(slide);
  slide.addNotes('Der zweite Hebel dreht die übliche Reihenfolge um: Wir analysieren zuerst den End-to-End-Prozess — wo verpufft Zeit, wo entstehen Fehler, wo gibt es Medienbrüche — und wählen erst danach das passende Tool. Ein Beispiel aus der Versicherungsbranche zur Einordnung: Die automatisierte Schadenbearbeitung lässt sich von aktuell 25 Prozent auf bis zu 70 bis 85 Prozent steigern, wenn Prozess und Technologie richtig zusammenspielen.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 8 — STAT (single hero, Hebel 3 — Führung)
// ---------------------------------------------------------------------------------------------
(function buildSlide8() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Klare Führungskommunikation macht Transformationen bis zu 8x erfolgreicher — Führung, nicht Technologie, entscheidet');

  const numberH = 2.1;
  const labelH = 0.7;
  const startY = CONTENT_TOP + (7.5 - CONTENT_TOP - 0.6 - numberH - labelH) / 2;
  addHeroNumber(slide, CONTENT_X, startY, CONTENT_W, '8x', 'wahrscheinlicher erfolgreich bei klarer Führungskommunikation', { numberSize: 130, numberH, labelH, labelSize: 18, align: 'center' });
  addSourceLine(slide, CONTENT_X, startY + numberH + labelH, CONTENT_W, 'Quelle: McKinsey, "Successful transformations"');

  addFooter(slide);
  slide.addNotes('Der dritte Hebel ist der, der in der Praxis am häufigsten unterschätzt wird — und der laut McKinsey den größten Unterschied macht. Organisationen, deren Führung Rollen und Verantwortlichkeiten klar definiert und den Fortschritt aktiv kommuniziert, sind bis zu achtmal wahrscheinlicher erfolgreich. Das bedeutet konkret: Ängste vor Jobverlust oder Kontrollverlust ernst nehmen, statt sie wegzumoderieren, und ein Multiplikatoren-Programm aufbauen, das interne AI Champions als Vertrauensanker verankert.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 9 — PROCESS (7-Phasen-Playbook, zwei Zeilengruppen für Lesbarkeit)
// ---------------------------------------------------------------------------------------------
(function buildSlide9() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Ein bewährtes 7-Phasen-Playbook macht die drei Hebel in fester Reihenfolge operativ');

  const gap = 0.15;
  const totalW = CONTENT_W;
  const startX = CONTENT_X;
  const perRow = 4;
  const boxW = (totalW - gap * (perRow - 1)) / perRow;
  const boxH = 0.9;
  const outH = 0.55;
  const rowLabelH = 0.26;

  const row1Y = CONTENT_TOP;
  const row1OutY = row1Y + boxH + 0.08;
  const row2LabelY = row1OutY + outH + 0.16;
  const row2Y = row2LabelY + rowLabelH + 0.06;
  const row2OutY = row2Y + boxH + 0.08;

  function xFor(i) { return startX + i * (boxW + gap); }
  function addRowLabel(y, text) {
    slide.addText(text.toUpperCase(), {
      x: startX, y, w: totalW, h: rowLabelH, fontSize: 11, bold: true, color: C.midgrey,
      fontFace: FONT, align: 'left', valign: 'bottom', margin: 0, charSpacing: 1,
    });
  }
  function addStation(i, y, outY, label, out) {
    const x = xFor(i);
    addCard(slide, ShapeType, x, y, boxW, boxH, C.blue, C.blue, 0.08);
    slide.addText(label, {
      x: x + 0.06, y, w: boxW - 0.12, h: boxH, fontSize: 12, bold: true, color: C.white,
      fontFace: FONT, align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 1.0,
    });
    slide.addText(out, {
      x, y: outY, w: boxW, h: outH, fontSize: 9, color: C.black, fontFace: FONT,
      align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.0,
    });
  }
  function addConnectors(y) {
    for (let i = 0; i < perRow - 1; i += 1) {
      const cx = xFor(i) + boxW;
      slide.addShape(ShapeType.rect, {
        x: cx + 0.01, y: y + boxH / 2 - 0.025, w: gap - 0.02, h: 0.05,
        fill: { color: C.midgrey }, line: { color: C.midgrey },
      });
    }
  }

  addRowLabel(row1Y - rowLabelH - 0.05, 'Vorbereitung');
  addStation(0, row1Y, row1OutY, 'P0\nAlignment & Scoping', 'Business Case — sichert Leadership-Commitment (McKinsey: 8x)');
  addStation(1, row1Y, row1OutY, 'P1\nProzessanalyse', 'Prozesslandkarte');
  addStation(2, row1Y, row1OutY, 'P2\nPriorisierung', 'AI-Impact-Matrix');
  addStation(3, row1Y, row1OutY, 'P3\nSolution Design', 'Blueprint');
  addConnectors(row1Y);

  addRowLabel(row2LabelY, 'Umsetzung & Verankerung');
  const x4 = xFor(0);
  const subH = (boxH - 0.06) / 2;
  addCard(slide, ShapeType, x4, row2Y, boxW, subH, C.deepbl, C.deepbl, 0.06);
  slide.addText('4a Prompt Engineering', {
    x: x4 + 0.04, y: row2Y, w: boxW - 0.08, h: subH, fontSize: 9, bold: true, color: C.white,
    fontFace: FONT, align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 0.95,
  });
  addCard(slide, ShapeType, x4, row2Y + subH + 0.06, boxW, subH, C.deepbl, C.deepbl, 0.06);
  slide.addText('4b Change Mgmt & Befähigung', {
    x: x4 + 0.04, y: row2Y + subH + 0.06, w: boxW - 0.08, h: subH, fontSize: 9, bold: true, color: C.white,
    fontFace: FONT, align: 'center', valign: 'middle', margin: 0, lineSpacingMultiple: 0.95,
  });
  slide.addText('Prompt Library; Schulung + Champions', {
    x: x4, y: row2OutY, w: boxW, h: outH, fontSize: 9, color: C.black, fontFace: FONT,
    align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.0,
  });

  addStation(1, row2Y, row2OutY, 'P5\nAgenten-Integration', 'Agent Playbook');
  addStation(2, row2Y, row2OutY, 'P6\nAutomatisierung', 'Automatisierungs-\narchitektur');
  addStation(3, row2Y, row2OutY, 'P7\nGovernance & Messung', 'Governance-Handbuch,\nKPI-Report');
  addConnectors(row2Y);

  const contX = xFor(perRow - 1) + boxW - 0.05;
  slide.addShape(ShapeType.rect, {
    x: contX, y: row1Y + boxH / 2, w: 0.05, h: (row2Y + boxH / 2) - (row1Y + boxH / 2),
    fill: { color: C.midgrey }, line: { color: C.midgrey },
  });

  addFooter(slide);
  slide.addNotes('Diese drei Hebel entfalten Wirkung nur in der richtigen Reihenfolge — dafür gibt es unser bewährtes Playbook. Es beginnt mit Alignment und Scoping, hier entsteht der Business Case und wird das Leadership-Commitment gesichert, das laut McKinsey Erfolg bis zu achtmal wahrscheinlicher macht. Es folgen Prozessanalyse, Priorisierung, Solution Design, Prompt Engineering und Change-Vorbereitung parallel, dann die technische Integration und Automatisierung. Am Ende steht Governance und Messung, damit das Ergebnis dauerhaft trägt.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 10 — TIMELINE (AI Impact Sprint, 4 Stufen)
// ---------------------------------------------------------------------------------------------
(function buildSlide10() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'In 10 Arbeitstagen zu Ihrem ersten messbaren AI-ROI: der AI Impact Sprint');

  const stages = [
    { day: 'Tag 1–2', title: 'AI Readiness Scan', out: 'Prozessanalyse, Schatten-AI-Check, Quick-Win-Identifikation' },
    { day: 'Tag 3–4', title: 'AI Solution Design', out: 'Maßgeschneiderte Agenten und Prompts für 1–2 Prozesse' },
    { day: 'Tag 5–8', title: 'Umsetzung & Training', out: 'Implementierung plus Mitarbeiter-Befähigung' },
    { day: 'Tag 9–10', title: 'Ergebnis-Präsentation', out: 'Messbarer Impact, ROI-Rechnung, Roadmap für Roll-out' },
  ];
  const lineY = 3.0;
  slide.addShape(ShapeType.rect, { x: CONTENT_X, y: lineY, w: CONTENT_W, h: 0.04, fill: { color: C.midgrey }, line: { color: C.midgrey } });

  const gap = 0.3;
  const boxW = (CONTENT_W - gap * 3) / 4;
  stages.forEach((s, i) => {
    const x = CONTENT_X + i * (boxW + gap);
    const cx = x + boxW / 2;
    slide.addShape(ShapeType.ellipse, { x: cx - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18, fill: { color: C.blue }, line: { color: C.white, width: 1.5 } });
    slide.addText(s.day, {
      x, y: lineY - 0.75, w: boxW, h: 0.4, fontSize: 15, bold: true, color: C.grey, fontFace: FONT, align: 'center', margin: 0,
    });
    slide.addText(s.title, {
      x, y: lineY + 0.25, w: boxW, h: 0.4, fontSize: 13, bold: true, color: C.blue, fontFace: FONT, align: 'center', margin: 0,
    });
    slide.addText(s.out, {
      x, y: lineY + 0.65, w: boxW, h: 1.3, fontSize: 10.5, color: C.black, fontFace: FONT, align: 'center', valign: 'top', margin: 0, lineSpacingMultiple: 1.1,
    });
  });

  addFooter(slide);
  slide.addNotes('Genau dieses Vorgehen bieten wir Ihnen jetzt in kompakter, buchbarer Form an: der AI Impact Sprint. In 10 Arbeitstagen zeigen wir Ihnen, wo AI in Ihrem Unternehmen sofort Zeit und Geld spart — und wir setzen es direkt um. Tag 1 und 2: Prozessanalyse, Schatten-AI-Check und Quick-Wins. Tag 3 und 4: Solution Design. Tag 5 bis 8: Implementierung und Training. Tag 9 und 10: Ergebnis-Präsentation mit ROI-Rechnung und Roadmap.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 11 — STAT (Preis hero + Produktleiter)
// ---------------------------------------------------------------------------------------------
(function buildSlide11() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, '9.500 € Flat Fee, keine Stundensätze, kein Risiko — mit fertiger Prompt Library, funktionierenden Agenten und ROI-Report als Ergebnis');

  addHeroNumber(slide, CONTENT_X, CONTENT_TOP, 5.5, '9.500 €', 'Flat Fee — kein Stundensatz, kein Overhead, kein Risiko', { numberSize: 60, numberH: 1.2, labelH: 0.7, labelSize: 13 });
  addInsightBox(slide, ShapeType,
    'Deliverables: fertige Prompt Library, 1–2 funktionierende Agenten, Schulungsunterlagen, ROI-Report mit konkreten Zahlen.',
    CONTENT_X, CONTENT_TOP + 1.2 + 0.75, 5.5, 1.3);

  const ladderY = CONTENT_TOP;
  const ladderX = COL2_X[1];
  const tiers = [
    { name: 'AI Readiness Radar', price: '1.500 €', detail: '1 Tag · Einstieg & Leadmagnet' },
    { name: 'AI Impact Sprint', price: '9.500 €', detail: '10 Tage · Signature Offering', highlight: true },
    { name: 'AI Rollout Companion', price: 'ab 4.500 €/Monat', detail: 'laufend · Verankerung & Skalierung' },
  ];
  const tierH = 0.85;
  const tierGap = 0.12;
  tiers.forEach((t, i) => {
    const y = ladderY + i * (tierH + tierGap);
    addCard(slide, ShapeType, ladderX, y, COL2_W, tierH, t.highlight ? C.blue : C.offwht, t.highlight ? C.blue : C.midgrey, 0.08);
    slide.addText(t.name, {
      x: ladderX + 0.15, y: y + 0.08, w: COL2_W - 1.9, h: 0.35, fontSize: 12, bold: true,
      color: t.highlight ? C.white : C.black, fontFace: FONT, align: 'left', margin: 0,
    });
    slide.addText(t.detail, {
      x: ladderX + 0.15, y: y + 0.42, w: COL2_W - 1.9, h: 0.35, fontSize: 9.5,
      color: t.highlight ? C.white : C.midgrey, fontFace: FONT, align: 'left', margin: 0,
    });
    slide.addText(t.price, {
      x: ladderX + COL2_W - 1.85, y: y, w: 1.75, h: tierH, fontSize: 14, bold: true,
      color: t.highlight ? C.white : C.blue, fontFace: FONT, align: 'right', valign: 'middle', margin: 0,
    });
  });
  addSourceLine(slide, ladderX, ladderY + 3 * (tierH + tierGap) + 0.05, COL2_W, 'Quelle: interne Preisliste (MGIM Positioning Paper)');

  addFooter(slide);
  slide.addNotes('Der Preis: 9.500 Euro Flat Fee — kein Stundensatz, kein versteckter Overhead, kein Risiko einer offenen Rechnung für Sie. Am Ende stehen konkrete, mitnehmbare Ergebnisse: eine fertige Prompt Library, ein bis zwei funktionierende Agenten, Schulungsunterlagen und ein ROI-Report mit echten Zahlen. Wenn Sie zunächst eine kleinere Standortbestimmung wollen, starten Sie mit dem AI Readiness Radar für 1.500 Euro. Und wenn Sie die Ergebnisse anschließend ausrollen wollen, begleiten wir Sie im AI Rollout Companion als monatlichen Retainer ab 4.500 Euro.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 12 — CONTENT (Referenzkarte Siemens Erlangen)
// ---------------------------------------------------------------------------------------------
(function buildSlide12() {
  const slide = pres.addSlide();
  slide.background = { color: C.offwht };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Bei Siemens Erlangen bereits bewiesen: Aus 3 Tagen Training wurden einsatzfähige AI-Agenten im Innovationsprozess');

  const cardH = 3.6;
  addCard(slide, ShapeType, CONTENT_X, CONTENT_TOP, CONTENT_W, cardH, C.white, C.midgrey, 0.1);
  slide.addText('Referenz: Siemens Erlangen, 2025', {
    x: CONTENT_X + 0.4, y: CONTENT_TOP + 0.3, w: CONTENT_W - 0.8, h: 0.45,
    fontSize: 18, bold: true, color: C.grey, fontFace: FONT, align: 'left', margin: 0,
  });
  const points = [
    { text: 'Teilnehmer: Innovationsmanager und Entwickler', options: { bullet: { code: '2022' }, color: C.black, breakLine: true } },
    { text: 'Format: 3-Tage-Training nach dem ACTION-Framework', options: { bullet: { code: '2022' }, color: C.black, breakLine: true } },
    { text: 'Ergebnis: strukturierte Prompts und funktionsfähige AI-Agenten im Innovationsprozess', options: { bullet: { code: '2022' }, color: C.black, breakLine: true } },
    { text: 'Gesteuerte AI-Integration statt isolierter Einzelanwendung', options: { bullet: { code: '2022' }, color: C.black } },
  ];
  slide.addText(points, {
    x: CONTENT_X + 0.4, y: CONTENT_TOP + 0.9, w: CONTENT_W - 0.8, h: 2.0,
    fontSize: 14, fontFace: FONT, align: 'left', valign: 'top', margin: 0, paraSpaceAfter: 10,
  });
  addSourceLine(slide, CONTENT_X + 0.4, CONTENT_TOP + cardH - 0.4, CONTENT_W - 0.8, 'Quelle: interne Referenz, Markus Goetz. Konkrete ROI-Kennzahlen liegen noch nicht vollständig vor und werden bewusst nicht geschätzt.');

  addFooter(slide);
  slide.addNotes('Dass diese Methodik funktioniert, zeigt sich nicht nur in der Theorie. Genau dieses Trainingskonzept haben wir bereits bei einem namhaften Industriekunden umgesetzt: Siemens Erlangen. In einem 3-tägigen Training haben Innovationsmanager und Entwickler nach dem ACTION-Framework Prompting gelernt, eigene AI-Agenten gebaut und diese über KPIs gesteuert. Das Ergebnis waren keine Trainingsübungen, sondern einsatzfähige AI-Agenten, die tatsächlich im Innovationsprozess arbeiten.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 13 — COMPARISON (Differenzierung)
// ---------------------------------------------------------------------------------------------
(function buildSlide13() {
  const slide = pres.addSlide();
  slide.background = { color: C.white };
  addHeaderBar(slide, ShapeType);
  addHeadline(slide, 'Wir sind Umsetzer mit Unternehmer-DNA, nicht Berater mit Foliensätzen');

  const colH = 3.9;
  addCard(slide, ShapeType, COL2_X[0], CONTENT_TOP, COL2_W, 0.5, C.grey, C.grey, 0.08);
  slide.addText('WAS ANDERE BERATER MACHEN', { x: COL2_X[0], y: CONTENT_TOP, w: COL2_W, h: 0.5, fontSize: 12, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
  addCard(slide, ShapeType, COL2_X[1], CONTENT_TOP, COL2_W, 0.5, C.blue, C.blue, 0.08);
  slide.addText('WAS WIR ANDERS MACHEN', { x: COL2_X[1], y: CONTENT_TOP, w: COL2_W, h: 0.5, fontSize: 12, bold: true, color: C.white, fontFace: FONT, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });

  const rows = [
    ['Konzepte liefern und verschwinden', 'Hands-on-Begleitung bis zum messbaren Ergebnis'],
    ['Junior-Berater im Einsatz', 'Erfahrene Business Manager mit C-Level-Hintergrund'],
    ['Tool-Verkauf ohne Prozessverständnis', 'Prozessanalyse first, dann passgenaue Lösung'],
    ['Generalisten-Ansatz', 'Branchenfokus Telekommunikation, Medien, Versicherung'],
  ];
  const rowH = (colH - 0.5 - GAP_CAPTION) / rows.length;
  rows.forEach((r, i) => {
    const y = CONTENT_TOP + 0.5 + GAP_CAPTION + i * rowH;
    slide.addText(r[0], { x: COL2_X[0] + 0.1, y, w: COL2_W - 0.2, h: rowH, fontSize: 12, color: C.black, fontFace: FONT, align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05 });
    slide.addText(r[1], { x: COL2_X[1] + 0.1, y, w: COL2_W - 0.2, h: rowH, fontSize: 12, bold: true, color: C.black, fontFace: FONT, align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 1.05 });
  });
  slide.addShape(ShapeType.rect, {
    x: COL2_X[1] - COL2_GAP / 2 - 0.01, y: CONTENT_TOP, w: 0.02, h: colH,
    fill: { color: C.ltgrey }, line: { color: C.ltgrey },
  });

  addFooter(slide);
  slide.addNotes('Zum Abschluss eine kurze Einordnung, warum wir der richtige Partner für genau diesen Weg sind. Wir sind keine klassische Unternehmensberatung. Wir sind erfahrene Business Manager und Serial Entrepreneurs mit eigener C-Level-Erfahrung. Wir liefern kein Konzeptpapier und verschwinden dann, wir bleiben, bis das Ergebnis messbar ist. Und während große Beratungen sich überwiegend auf Konzerne konzentrieren, fokussieren wir uns bewusst auf Telekommunikation, Medien und Versicherung im Mittelstand.');
})();

// ---------------------------------------------------------------------------------------------
// Slide 14 — CLOSING
// ---------------------------------------------------------------------------------------------
(function buildSlide14() {
  const slide = pres.addSlide();
  slide.background = { color: C.grey };
  addAccentBar(slide, ShapeType, 0, 0, 7.5);
  addSlashDivider(slide, EDGE_MARGIN_X, 0.6, 1.2);

  slide.addText('Die Lücke zwischen AI-Investition und AI-Wirkung schließt sich nicht von allein — vereinbaren Sie jetzt Ihr Erstgespräch', {
    x: EDGE_MARGIN_X, y: 1.15, w: EDGE_CONTENT_W, h: 1.3,
    fontSize: 28, bold: true, color: C.white, fontFace: FONT, align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 1.08,
  });

  addHeroNumber(slide, EDGE_COL2_X[0], 2.75, 5.2, '60 Min.', 'Unverbindliches Erstgespräch', { numberSize: 56, numberColor: C.blue, labelColor: C.white, numberH: 1.1, labelH: 0.5 });
  addHeroNumber(slide, EDGE_COL2_X[1], 2.75, 5.2, '10 Tage', 'Dauer des AI Impact Sprint', { numberSize: 56, numberColor: C.midgrey, labelColor: C.white, numberH: 1.1, labelH: 0.5 });

  const bullets = [
    { text: 'Unverbindliches Erstgespräch: 60 Minuten, keine Kosten, keine Verpflichtung', options: { bullet: { code: '2022' }, breakLine: true } },
    { text: 'Alternativer Einstieg: AI Readiness Radar für 1.500 € — Score und Empfehlungen in einem Tag', options: { bullet: { code: '2022' } } },
  ];
  slide.addText(bullets, {
    x: EDGE_MARGIN_X, y: 4.5, w: EDGE_CONTENT_W, h: 1.0,
    fontSize: 14, color: C.white, fontFace: FONT, align: 'left', valign: 'top', margin: 0, paraSpaceAfter: 8,
  });

  slide.addText('Termin vereinbaren', {
    x: EDGE_MARGIN_X, y: 5.7, w: 3.0, h: 0.5, fontSize: 14, bold: true, color: C.white, fontFace: FONT,
    align: 'center', valign: 'middle', margin: 0, fill: { color: C.blue },
  });
  slide.addText('Kontakt: [Ansprechpartner/Terminlink ergänzen]', {
    x: EDGE_MARGIN_X, y: 6.35, w: EDGE_CONTENT_W, h: 0.35, fontSize: 11, italic: true, color: C.midgrey, fontFace: FONT, align: 'left', margin: 0,
  });

  addFooter(slide);
  slide.addNotes('Ich habe Ihnen heute gezeigt, wo die Lücke zwischen AI-Investition und AI-Wirkung entsteht, warum sie in Ihrer Branche besonders spürbar ist, und wie wir sie mit drei Hebeln und einem klaren Playbook schließen. Der nächste Schritt ist bewusst klein gehalten: ein unverbindliches Erstgespräch von 60 Minuten, ohne Kosten und ohne Verpflichtung. Lassen Sie uns diesen Termin jetzt vereinbaren.');
})();

const outPath = path.join(REPO_ROOT, 'output', 'ai-transformation-partner', 'ai-transformation-partner.pptx');
pres.writeFile({ fileName: outPath })
  .then(() => console.log('Presentation saved:', outPath))
  .catch((err) => { console.error(err); process.exit(1); });
