// MGIM presentation pipeline — shared PptxGenJS helpers.
//
// Single canonical copy. Veronika's generated presentation scripts require this file instead of
// redefining the color tokens and layout primitives inline each time — that redefinition was how
// the CI drifted between phases in the Langdock version. If the brand guide changes, it changes
// in brand-guide/mgim-brand-guide.md AND here (this file's `C` must always match that table).
//
// require this from a project build script with:
//   const { C, addHeaderBar, addFooter, addCard, addAccentBar, addSlashDivider,
//           addHeroStat, addInsightBox, addProgressBar, addIconBlock } = require(path.join(REPO_ROOT, 'lib/pptx-helpers'));
//
// pptxgenjs gotchas this file already respects (see /mnt/skills/public/pptx/SKILL.md):
// hex colors never carry '#' or an alpha channel; every add*() call below builds a fresh
// options object (pptxgenjs mutates option objects in place, so never share one across calls);
// rectRadius only applies to ROUNDED_RECTANGLE shapes; speaker notes go through slide.addNotes(),
// never a text box.

const C = {
  grey: '6D6E71', // MG Grey — headlines, structure
  blue: '3A9AC9', // MG Blue — accent, key data (never dominant)
  black: '231F20', // Near Black — body text
  white: 'FFFFFF', // White — backgrounds
  ltgrey: 'E8E8E9', // Light Grey — backgrounds/dividers only, never text, never a pie segment
  midgrey: 'A8A9AD', // Mid Grey — captions, footer
  deepbl: '1F6A9A', // Deep Blue — depth, accent variant
  offwht: 'F5F5F5', // Off White — alternate slide background
};

const FOOTER_TEXT = 'Markus Goetz Interim Management  |  www.markusgoetz.com';

function addHeaderBar(slide, ShapeType) {
  slide.addShape(ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.45, fill: { color: C.grey }, line: { color: C.grey } });
  slide.addShape(ShapeType.rect, { x: 0, y: 0.45, w: 13.33, h: 0.06, fill: { color: C.blue }, line: { color: C.blue } });
}

function addFooter(slide, txt) {
  slide.addText(txt || FOOTER_TEXT, {
    x: 0.4, y: 6.9, w: 12, h: 0.25, fontSize: 9, color: C.midgrey, fontFace: 'Arial', align: 'left', margin: 0,
  });
}

function addCard(slide, ShapeType, x, y, w, h, bg, border, radius) {
  slide.addShape(ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: bg || C.offwht },
    line: { color: border || C.midgrey, width: 1.5 },
    rectRadius: radius || 0.1,
  });
}

function addAccentBar(slide, ShapeType, x, y, h) {
  slide.addShape(ShapeType.rect, {
    x, y: y + 0.08, w: 0.08, h: h - 0.16,
    fill: { color: C.blue }, line: { color: C.blue },
  });
}

function addSlashDivider(slide, x, y, w) {
  slide.addText('/', { x, y, w, h: 0.4, fontSize: 28, bold: true, color: C.blue, fontFace: 'Arial', align: 'center' });
}

// Large display number — hero stats and KPI dominance.
// `opts.labelColor` defaults to white (only legible on a dark/grey background — the original
// full-bleed dark-slide use case). Pass `labelColor: C.black` or `C.grey` when placing this on
// `offwht`/white backgrounds, or WCAG AA fails silently. `opts.w` overrides the default full-slide
// width of 12in for multi-stat layouts placed side by side.
function addHeroStat(slide, number, label, sublabel, x, y, opts) {
  const o = opts || {};
  const w = o.w || 12;
  const labelColor = o.labelColor || C.white;
  slide.addText(number, { x, y, w, h: 2.2, fontSize: 120, bold: true, color: C.blue, fontFace: 'Arial', align: 'center', valign: 'middle' });
  slide.addText(label, { x, y: y + 2.2, w, h: 0.7, fontSize: 24, color: labelColor, fontFace: 'Arial', align: 'center' });
  if (sublabel) {
    slide.addText(sublabel, { x, y: y + 2.9, w, h: 0.5, fontSize: 16, italic: true, color: C.midgrey, fontFace: 'Arial', align: 'center' });
  }
}

// Insight box — pull quote / key takeaway, typically placed right of a chart.
function addInsightBox(slide, ShapeType, text, x, y, w, h) {
  slide.addShape(ShapeType.rect, { x, y, w: 0.06, h, fill: { color: C.blue }, line: { color: C.blue } });
  slide.addText(text, { x: x + 0.2, y, w: w - 0.2, h, fontSize: 14, color: C.black, fontFace: 'Arial', align: 'left', valign: 'top', margin: 0 });
}

// Horizontal fill bar for a single metric (0-100).
// The label sits ABOVE the bar in C.black, not overlaid on the fill — a fixed white-on-fill
// label read wrong at low `pct` (mostly sat on the pale `ltgrey` track, failing WCAG AA). Placing
// it above makes the contrast independent of `pct`, so this is now safe at any value.
function addProgressBar(slide, ShapeType, x, y, w, h, pct, label) {
  slide.addText(`${label} — ${pct}%`, { x, y: y - 0.32, w, h: 0.3, fontSize: 12, bold: true, color: C.black, fontFace: 'Arial', align: 'left', valign: 'bottom', margin: 0 });
  slide.addShape(ShapeType.rect, { x, y, w, h, fill: { color: C.ltgrey }, line: { color: C.midgrey } });
  slide.addShape(ShapeType.rect, { x, y, w: w * (pct / 100), h, fill: { color: C.blue }, line: { color: C.blue } });
}

// Square icon box with label below — icon-driven / icon-grid slides.
function addIconBlock(slide, ShapeType, label, sublabel, x, y) {
  slide.addShape(ShapeType.roundRect, { x, y, w: 1.1, h: 1.1, fill: { color: C.blue }, line: { color: C.blue }, rectRadius: 0.15 });
  slide.addText(label, { x: x - 0.3, y: y + 1.2, w: 1.7, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: 'Arial', align: 'center' });
  if (sublabel) {
    slide.addText(sublabel, { x: x - 0.3, y: y + 1.6, w: 1.7, h: 0.35, fontSize: 10, color: C.midgrey, fontFace: 'Arial', align: 'center' });
  }
}

module.exports = {
  C,
  FOOTER_TEXT,
  addHeaderBar,
  addFooter,
  addCard,
  addAccentBar,
  addSlashDivider,
  addHeroStat,
  addInsightBox,
  addProgressBar,
  addIconBlock,
};
