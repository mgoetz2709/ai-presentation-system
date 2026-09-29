"""Slide 4 — Priorisierungs-Matrix der fuenf KI-Bausteine.

Bubble chart: x = Umsetzbarkeit, y = Umsatzwirkung (beides qualitativ Niedrig/Mittel/Hoch aus der
Prioritaeten-Matrix, Konzeptdokument Abschnitt 4), Bubble-Farbe/-Groesse = Dringlichkeit. Zwei
Bausteine (Lead-Analyse, Kalkulationen) teilen sich dieselbe Kategorie (Hoch/Hoch) - deren Punkte
werden minimal auseinandergezogen, nur damit die Labels lesbar bleiben; die zugrunde liegende
Kategorie bleibt fuer beide identisch (Hoch/Hoch/Hoch).
"""

import os
import sys

import matplotlib.pyplot as plt

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "lib"))
from chart_style import MGIM_COLORS, LANDSCAPE_FIGSIZE, DPI, apply_mgim_style, save_chart

LEVEL = {"Niedrig": 1, "Mittel": 2, "Hoch": 3}

# name, Umsatzwirkung, Umsetzbarkeit, Dringlichkeit, Empfehlung, manual label offset (dx, dy)
DATA = [
    ("Lead-Analyse", "Hoch", "Hoch", "Hoch", "Pilot", (-0.16, 0.14)),
    ("Kalkulationen", "Hoch", "Hoch", "Hoch", "Quick Win", (0.16, -0.16)),
    ("Listenmanagement", "Mittel", "Hoch", "Mittel", "Quick Win", (0.0, 0.16)),
    ("Bid Management", "Hoch", "Mittel", "Hoch", "Phase 2", (0.0, 0.16)),
    ("Vertragsmanagement", "Mittel", "Mittel", "Mittel", "Phase 2", (0.0, -0.18)),
]

URGENCY_COLOR = {"Hoch": MGIM_COLORS["blue"], "Mittel": MGIM_COLORS["midgrey"], "Niedrig": MGIM_COLORS["ltgrey"]}
URGENCY_SIZE = {"Hoch": 2600, "Mittel": 1700, "Niedrig": 1000}

fig, ax = plt.subplots(figsize=LANDSCAPE_FIGSIZE, dpi=DPI)

for name, umsatz, umsetzbar, dringlichkeit, empfehlung, (dx, dy) in DATA:
    x, y = LEVEL[umsetzbar], LEVEL[umsatz]
    ax.scatter(
        x, y,
        s=URGENCY_SIZE[dringlichkeit],
        color=URGENCY_COLOR[dringlichkeit],
        edgecolors=MGIM_COLORS["white"],
        linewidths=1.5,
        zorder=3,
    )
    ax.annotate(
        f"{name}\n({empfehlung})",
        xy=(x, y),
        xytext=(x + dx, y + dy),
        fontsize=10,
        color=MGIM_COLORS["black"],
        ha="center",
        va="center",
        fontweight="bold",
        zorder=4,
    )

ax.set_xlim(0.5, 3.5)
ax.set_ylim(0.5, 3.5)
ax.set_xticks([1, 2, 3])
ax.set_xticklabels(["Niedrig", "Mittel", "Hoch"])
ax.set_yticks([1, 2, 3])
ax.set_yticklabels(["Niedrig", "Mittel", "Hoch"])
ax.set_xlabel("Umsetzbarkeit", fontsize=11, color=MGIM_COLORS["black"])
ax.set_ylabel("Umsatzwirkung", fontsize=11, color=MGIM_COLORS["black"])

apply_mgim_style(ax)
ax.xaxis.grid(True, linestyle="--", linewidth=0.6, color=MGIM_COLORS["ltgrey"])

# Manual legend for Dringlichkeit (bubble color), placed outside the plot area.
for label, color in [("Dringlichkeit: Hoch", MGIM_COLORS["blue"]), ("Dringlichkeit: Mittel", MGIM_COLORS["midgrey"])]:
    ax.scatter([], [], s=260, color=color, edgecolors=MGIM_COLORS["white"], linewidths=1.2, label=label)
ax.legend(loc="lower right", frameon=False, fontsize=9, labelcolor=MGIM_COLORS["black"])

out_path = os.path.join(REPO_ROOT, "output", "riedel-sales-ai-transformation", "charts", "slide_04_chart.png")
save_chart(fig, out_path)
