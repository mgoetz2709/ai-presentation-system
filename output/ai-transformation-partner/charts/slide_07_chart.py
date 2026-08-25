"""Slide 7 — Prozessanalyse vor Tool-Auswahl.

Vorher/Nachher-Balkendiagramm: automatisierte Schadenbearbeitung ("Dunkelverarbeitung") in der
Versicherungsbranche. Status quo 25% (grey) vs. AI-gestützte Automatisierung als Spannbreite
70-85% (blue), dargestellt als schwebender Bereichsbalken statt Einzelpunkt, um die Bandbreite
nicht zu verfälschen. Annotation-Pfeil und Delta-Callout heben die Verbesserung explizit hervor.

Quelle: Branchenanalyse Versicherung 2026 (Fachpresse/Pexon Consulting). Branchenweites
Illustrationsbeispiel, kein MGIM-eigenes Kundenergebnis.
"""

import os
import sys

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "lib"))

from chart_style import MGIM_COLORS, LANDSCAPE_FIGSIZE, DPI, apply_mgim_style, save_chart

plt.rcParams["font.family"] = "DejaVu Sans"

fig, ax = plt.subplots(figsize=LANDSCAPE_FIGSIZE, dpi=DPI)

categories = ["Status quo\n(heute)", "Mit AI-gestützter\nAutomatisierung"]
x = [0, 1]
bar_width = 0.5

# Bar 1: Status quo — solid grey bar from 0 to 25.
ax.bar(x[0], 25, width=bar_width, bottom=0, color=MGIM_COLORS["grey"], zorder=3,
       edgecolor="white", linewidth=2)
ax.text(x[0], 25 + 2, "25%", ha="center", va="bottom", fontsize=11, fontweight="bold",
        color=MGIM_COLORS["black"])

# Bar 2: AI-Automatisierung — floating blue bar spanning the 70-85% range.
low, high = 70, 85
ax.bar(x[1], high - low, width=bar_width, bottom=low, color=MGIM_COLORS["blue"], zorder=3,
       edgecolor="white", linewidth=2)
ax.text(x[1], high + 2, "70–85%", ha="center", va="bottom", fontsize=11, fontweight="bold",
        color=MGIM_COLORS["black"])

# Dashed reference line at 25% across the full chart width.
ax.axhline(y=25, color=MGIM_COLORS["midgrey"], linestyle="--", linewidth=0.8, zorder=1)

# Curved annotation arrow from the top of the status-quo bar into the AI range.
arrow = FancyArrowPatch(
    (x[0] + bar_width / 2 + 0.02, 27), (x[1] - bar_width / 2 - 0.02, 68),
    connectionstyle="arc3,rad=-0.25", arrowstyle="-|>", mutation_scale=16,
    color=MGIM_COLORS["deepbl"], linewidth=1.6, zorder=4,
)
ax.add_patch(arrow)

# Delta callout badge.
ax.text(
    0.5, 50, "+45 bis +60\nProzentpunkte",
    ha="center", va="center", fontsize=11, fontweight="bold", color=MGIM_COLORS["blue"],
    bbox=dict(boxstyle="round,pad=0.4", facecolor=MGIM_COLORS["offwht"],
              edgecolor=MGIM_COLORS["blue"], linewidth=1.2),
    zorder=5,
)

ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=10, color=MGIM_COLORS["black"])
ax.set_xlim(-0.6, 1.6)
ax.set_ylim(0, 100)
ax.set_ylabel("Automatisierte Dunkelverarbeitung (%)", fontsize=10, color=MGIM_COLORS["black"])

apply_mgim_style(ax)

fig.text(
    0.01, 0.01,
    "Quelle: Branchenanalyse Versicherung 2026 (Fachpresse/Pexon Consulting) — branchenweites Illustrationsbeispiel, kein MGIM-Kundenergebnis.",
    fontsize=7, color=MGIM_COLORS["midgrey"],
)

out_path = os.path.join(REPO_ROOT, "output", "ai-transformation-partner", "charts", "slide_07_chart.png")
save_chart(fig, out_path)
