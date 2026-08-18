"""MGIM presentation pipeline — shared matplotlib chart style.

Single canonical copy. Veronika's generated chart scripts import this instead of redefining the
CI colors and axis styling inline each time. Keep MGIM_COLORS in sync with
brand-guide/mgim-brand-guide.md if the CI ever changes.

Usage from a project chart script (output/<slug>/charts/slide_NN_chart.py):

    import sys, os
    sys.path.insert(0, os.path.join(REPO_ROOT, "lib"))
    from chart_style import MGIM_COLORS, apply_mgim_style, save_chart

    fig, ax = plt.subplots(figsize=(10, 5), dpi=150)
    ...
    apply_mgim_style(ax)
    save_chart(fig, "/absolute/path/to/output/<slug>/charts/slide_03_chart.png")
"""

import matplotlib.pyplot as plt

MGIM_COLORS = {
    "grey": "#6D6E71",
    "blue": "#3A9AC9",
    "black": "#231F20",
    "white": "#FFFFFF",
    "ltgrey": "#E8E8E9",
    "midgrey": "#A8A9AD",
    "deepbl": "#1F6A9A",
    "offwht": "#F5F5F5",
}

# Pie/donut charts: never use ltgrey as a segment — insufficient contrast against white.
PIE_SEGMENT_ORDER = ["blue", "grey", "midgrey", "deepbl", "offwht"]

LANDSCAPE_FIGSIZE = (10, 5)
SQUARE_FIGSIZE = (6, 6)
DPI = 150


def apply_mgim_style(ax):
    """Strip chart borders except bottom/left axes, add dashed light-grey gridlines on the
    value axis only, and set label colors/sizes per the CI typographic scale."""
    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)
    for spine in ("bottom", "left"):
        ax.spines[spine].set_color(MGIM_COLORS["midgrey"])

    ax.yaxis.grid(True, linestyle="--", linewidth=0.6, color=MGIM_COLORS["ltgrey"])
    ax.xaxis.grid(False)
    ax.set_axisbelow(True)

    ax.tick_params(axis="x", colors=MGIM_COLORS["black"], labelsize=10)
    ax.tick_params(axis="y", colors=MGIM_COLORS["black"], labelsize=10)
    ax.set_title("")  # headline lives on the slide, never as a chart title


def save_chart(fig, path):
    """Save with the CI-standard export settings and print the confirmation line Maximilian
    checks for before proceeding to the next chart."""
    fig.savefig(path, dpi=DPI, bbox_inches="tight", transparent=False)
    plt.close(fig)
    print(f"Chart saved: {path}")
