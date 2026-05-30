"use client";

import { useState, useCallback } from "react";
import { T, useLang } from "./lang";
import { MINDS, RADAR_AXES, RADAR_SCORES } from "./content";
import type { MindKey } from "./content";

// ── geometry helpers ──────────────────────────────────────────────────────────

const CX = 220;          // SVG centre x
const CY = 220;          // SVG centre y
const R  = 160;          // outer radius (100 score)
const LABEL_OFFSET = 24; // extra gap between R edge and label centroid

/** Convert polar radar coords to Cartesian.
 *  angle 0 = top; clockwise. score 0–100. */
function radarPoint(axisIndex: number, score: number, total: number): [number, number] {
  const angle = (2 * Math.PI * axisIndex) / total - Math.PI / 2;
  const r = (score / 100) * R;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

/** Build the SVG polygon "points" string from a score array. */
function buildPolygon(scores: number[]): string {
  return scores
    .map((s, i) => radarPoint(i, s, scores.length).join(","))
    .join(" ");
}

/** Concentric octagon at a given fraction (0–1) of R. */
function concentricOctagon(fraction: number, n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const r = fraction * R;
    return `${CX + r * Math.cos(angle)},${CY + r * Math.sin(angle)}`;
  }).join(" ");
}

type SvgAnchor   = "start" | "end" | "middle";
type SvgBaseline = "hanging" | "auto" | "middle";

/** Label anchor position: outward from centre. */
function labelAnchor(
  axisIndex: number,
  total: number,
): { x: number; y: number; anchor: SvgAnchor; baseline: SvgBaseline } {
  const angle = (2 * Math.PI * axisIndex) / total - Math.PI / 2;
  const r = R + LABEL_OFFSET;
  const x = CX + r * Math.cos(angle);
  const y = CY + r * Math.sin(angle);

  // horizontal anchor
  const eps = 0.08;
  const anchor: SvgAnchor =
    Math.cos(angle) > eps  ? "start"  :
    Math.cos(angle) < -eps ? "end"    : "middle";

  // vertical baseline
  const baseline: SvgBaseline =
    Math.sin(angle) > eps  ? "hanging"     :
    Math.sin(angle) < -eps ? "auto"        : "middle";

  return { x, y, anchor, baseline };
}

// ── constants ─────────────────────────────────────────────────────────────────

const N = RADAR_AXES.length; // 8
const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];
const GRID_LABELS = ["25", "50", "75", "100"];

const CAPTION: { en: string; zh: string } = {
  en: "Scores are interpretive, not measured — each value is argued in the section text.",
  zh: "各项分值为解释性判断，并非实测数据——每一数字均在章节正文中有所论证。",
};

const EYEBROW: { en: string; zh: string } = {
  en: "Eight traits · three minds · eight axes",
  zh: "八项特质 · 三种心灵 · 八个维度",
};

// ── sub-components ────────────────────────────────────────────────────────────

/** One toggle chip per mind. */
function MindChip({
  mind,
  focused,
  onClick,
}: {
  mind: (typeof MINDS)[number];
  focused: MindKey | null;
  onClick: () => void;
}) {
  const active = focused === null || focused === mind.key;
  return (
    <button
      onClick={onClick}
      aria-pressed={focused === mind.key}
      className={[
        "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200",
        active
          ? "border-current opacity-100"
          : "border-ghost-300/20 opacity-35 hover:opacity-60",
      ].join(" ")}
      style={{ color: mind.accent, borderColor: active ? mind.accent + "70" : undefined }}
    >
      {/* accent swatch */}
      <span
        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: mind.accent, boxShadow: active ? `0 0 6px ${mind.accent}80` : "none" }}
      />
      <span style={{ color: active ? mind.accent : "#9c9176" }}>
        <T v={mind.name} />
      </span>
      <span className="text-ghost-300/50 text-[0.65rem]">{mind.dates}</span>
    </button>
  );
}

/** Legend row: name + one-line. */
function LegendRow({ mind }: { mind: (typeof MINDS)[number] }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <span
          className="text-sm font-semibold tracking-wide"
          style={{ color: mind.accent }}
        >
          <T v={mind.name} />
        </span>
        <span className="text-ghost-300/50 text-[0.7rem] font-mono">{mind.dates}</span>
      </div>
      <p className="text-ghost-300/70 text-xs leading-snug" style={{ fontStyle: "italic" }}>
        <T v={mind.oneLine} />
      </p>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function GeniusRadar() {
  const { lang } = useLang();

  // null = all equal; a MindKey = that mind is focused (others dimmed)
  const [focused, setFocused] = useState<MindKey | null>(null);

  const handleChip = useCallback(
    (key: MindKey) => setFocused((prev) => (prev === key ? null : key)),
    []
  );

  // Polygon fill / stroke opacity per mind
  const polyOpacity = (key: MindKey) =>
    focused === null   ? { fill: 0.12, stroke: 0.75 } :
    focused === key    ? { fill: 0.22, stroke: 1.0  } :
                         { fill: 0.03, stroke: 0.2  };

  return (
    <section className="holo rounded-2xl p-6 md:p-8 grid-fine paper-grain">
      {/* eyebrow */}
      <p className="label-mono text-gold-300/70 mb-5 tracking-widest text-center select-none">
        {EYEBROW[lang]}
      </p>

      {/* toggle chips row */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {MINDS.map((m) => (
          <MindChip key={m.key} mind={m} focused={focused} onClick={() => handleChip(m.key)} />
        ))}
      </div>

      {/* radar SVG — responsive via viewBox */}
      <div className="flex justify-center mb-6">
        <svg
          viewBox="-72 0 584 440"
          className="w-full max-w-[480px] h-auto"
          role="img"
          aria-label={lang === "en" ? "Radar chart comparing three genius minds across eight traits" : "八项特质雷达图：三位天才对比"}
        >
          {/* ── grid: concentric octagons ── */}
          {GRID_LEVELS.map((frac, gi) => (
            <polygon
              key={gi}
              points={concentricOctagon(frac, N)}
              fill="none"
              stroke={frac === 1.0 ? "#d6a23c30" : "#ece4d410"}
              strokeWidth={frac === 1.0 ? 1.2 : 0.8}
              strokeDasharray={frac === 1.0 ? undefined : "3 4"}
            />
          ))}

          {/* grid level micro-labels (right side) */}
          {GRID_LEVELS.map((frac, gi) => {
            const [lx, ly] = radarPoint(0, frac * 100, N);
            return (
              <text
                key={gi}
                x={lx + 4}
                y={ly}
                fontSize={8}
                fill="#9c917640"
                dominantBaseline="middle"
                fontFamily="var(--font-mono, monospace)"
              >
                {GRID_LABELS[gi]}
              </text>
            );
          })}

          {/* ── spokes ── */}
          {RADAR_AXES.map((_, i) => {
            const [px, py] = radarPoint(i, 100, N);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={px}
                y2={py}
                stroke="#ece4d415"
                strokeWidth={0.8}
              />
            );
          })}

          {/* ── axis labels ── */}
          {RADAR_AXES.map((axis, i) => {
            const { x, y, anchor, baseline } = labelAnchor(i, N);
            const enLabel = axis.label.en;
            const zhLabel = axis.label.zh;
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline={baseline}
                fontSize={10}
                fontFamily="var(--font-mono, monospace)"
                fill="#ece4d490"
                className="select-none"
              >
                <tspan>{lang === "en" ? enLabel : zhLabel}</tspan>
              </text>
            );
          })}

          {/* ── polygons (back to front: unfocused first, focused last) ── */}
          {[...MINDS]
            .sort((a, b) => {
              // draw focused mind on top
              if (focused === null) return 0;
              if (a.key === focused) return 1;
              if (b.key === focused) return -1;
              return 0;
            })
            .map((m) => {
              const scores = RADAR_SCORES[m.key];
              const op = polyOpacity(m.key);
              return (
                <g key={m.key}>
                  <polygon
                    points={buildPolygon(scores)}
                    fill={m.accent}
                    fillOpacity={op.fill}
                    stroke={m.accent}
                    strokeOpacity={op.stroke}
                    strokeWidth={focused === m.key ? 2 : 1.5}
                    strokeLinejoin="round"
                    style={{ transition: "fill-opacity 0.25s, stroke-opacity 0.25s, stroke-width 0.25s" }}
                  />
                  {/* vertex dots */}
                  {scores.map((s, i) => {
                    const [vx, vy] = radarPoint(i, s, N);
                    return (
                      <circle
                        key={i}
                        cx={vx}
                        cy={vy}
                        r={focused === m.key ? 3.5 : 2.5}
                        fill={m.accent}
                        fillOpacity={op.stroke}
                        style={{ transition: "fill-opacity 0.25s, r 0.25s" }}
                      />
                    );
                  })}
                </g>
              );
            })}

          {/* centre dot */}
          <circle cx={CX} cy={CY} r={2} fill="#d6a23c60" />
        </svg>
      </div>

      {/* ── legend ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 border-t border-ghost-300/10 pt-5">
        {MINDS.map((m) => (
          <LegendRow key={m.key} mind={m} />
        ))}
      </div>

      {/* ── caption ── */}
      <p className="text-center text-ghost-300/50 text-[0.7rem] font-mono italic leading-relaxed">
        <T v={CAPTION} />
      </p>
    </section>
  );
}
