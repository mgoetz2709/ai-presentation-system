"""Slide 13 — Kapazitätsrisiko.

Swimlane-Diagramm: vier zeitkritische Arbeitsstränge, die bei einem Einzelberater in der Woche
6.10.-24.10.2026 gleichzeitig laufen (zwei aus Baustein 1, zwei aus Baustein 2), plus ein Marker
für die Budget-Zwischenlieferung am 20.10. Zeigt die Kollision im Kontext des gesamten
Initialisierungs-Zeitraums (21.9.-13.11.), nicht isoliert.

Quelle: MGIM, Detailplanung Initialisierungsphase RIEDEL Networks, Stand 16.9.2026 (interne
Primärquelle, Kapazitätshinweis-Abschnitt).
"""

import os
import sys
from datetime import date

import matplotlib.dates as mdates
import matplotlib.pyplot as plt

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "lib"))

from chart_style import MGIM_COLORS, LANDSCAPE_FIGSIZE, DPI, apply_mgim_style, save_chart

plt.rcParams["font.family"] = "DejaVu Sans"

fig, ax = plt.subplots(figsize=LANDSCAPE_FIGSIZE, dpi=DPI)

phase_start = date(2026, 9, 21)
phase_end = date(2026, 11, 13)
crit_start = date(2026, 10, 6)
crit_end = date(2026, 10, 24)
budget_date = date(2026, 10, 20)

lanes = [
    ("Datenklassifizierung (B1)", date(2026, 10, 6), date(2026, 10, 24), MGIM_COLORS["blue"]),
    ("Pilot-Use-Case-Auswahl (B1)", date(2026, 10, 6), date(2026, 10, 24), MGIM_COLORS["deepbl"]),
    ("Interviews (B2)", date(2026, 10, 6), date(2026, 10, 24), MGIM_COLORS["blue"]),
    ("Prozessdoku-Prüfung (B2)", date(2026, 10, 6), date(2026, 10, 24), MGIM_COLORS["deepbl"]),
]

# Shaded band marking the critical overlap week across all four lanes.
ax.axvspan(crit_start, crit_end, color=MGIM_COLORS["ltgrey"], zorder=0)

for i, (label, start, end, color) in enumerate(lanes):
    y = len(lanes) - i
    ax.barh(y, (end - start).days, left=start, height=0.5, color=color, zorder=3,
            edgecolor="white", linewidth=1.5)

ax.axvline(budget_date, color=MGIM_COLORS["grey"], linestyle="--", linewidth=1.2, zorder=4)
ax.text(budget_date, len(lanes) + 0.55, "Budget-\nZwischenlieferung\n20.10.", ha="center",
        va="bottom", fontsize=8.5, color=MGIM_COLORS["grey"], fontweight="bold")

ax.set_yticks([len(lanes) - i for i in range(len(lanes))])
ax.set_yticklabels([lbl for lbl, *_ in lanes], fontsize=10, color=MGIM_COLORS["black"])
ax.set_ylim(0.3, len(lanes) + 1.1)

ax.set_xlim(phase_start, phase_end)
ax.xaxis.set_major_locator(mdates.WeekdayLocator(byweekday=0, interval=1))
ax.xaxis.set_major_formatter(mdates.DateFormatter("%d.%m."))
plt.setp(ax.get_xticklabels(), rotation=0, fontsize=9)

apply_mgim_style(ax)
ax.yaxis.grid(False)
ax.xaxis.grid(True, linestyle="--", linewidth=0.6, color=MGIM_COLORS["ltgrey"])

fig.text(
    0.01, 0.01,
    "Quelle: MGIM, Detailplanung Initialisierungsphase RIEDEL Networks, Stand 16.9.2026.",
    fontsize=7, color=MGIM_COLORS["midgrey"],
)

out_path = os.path.join(REPO_ROOT, "output", "riedel-kickoff", "charts", "slide_13_chart.png")
save_chart(fig, out_path)
