"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { MINDS, TIMELINE } from "./content";
import type { MindKey, Milestone } from "./content";

/* ------------------------------------------------------------------ */
/* Layout constants — all derived deterministically                     */
/* ------------------------------------------------------------------ */

const YEAR_START = 1450;
const YEAR_END   = 2030;
const YEAR_SPAN  = YEAR_END - YEAR_START;

// SVG coordinate system
const SVG_W  = 900;
const SVG_H  = 340;
const PAD_L  = 12;
const PAD_R  = 12;
const AXIS_Y = SVG_H - 42;   // bottom tick line y

// Three lane y-centres (one per mind, top-to-bottom: leo, feyn, musk)
const LANE: Record<MindKey, number> = {
  leo:  72,
  feyn: 152,
  musk: 232,
};
const BAND_H = 22; // height of the life-span bar

// Color values mirroring Tailwind tokens
const ACCENT: Record<MindKey, string> = {
  leo:  "#c45a35",
  feyn: "#3fb4c4",
  musk: "#6f8fd6",
};

const ACCENT_DIM: Record<MindKey, string> = {
  leo:  "#c45a3540",
  feyn: "#3fb4c440",
  musk: "#6f8fd640",
};

const LIFE_SPANS: Record<MindKey, [number, number]> = {
  leo:  [1452, 1519],
  feyn: [1918, 1988],
  musk: [1971, 2030],  // open; drawn to near-present
};

const CENTURY_TICKS = [1500, 1600, 1700, 1800, 1900, 2000];

function xOf(year: number): number {
  const usable = SVG_W - PAD_L - PAD_R;
  return PAD_L + ((year - YEAR_START) / YEAR_SPAN) * usable;
}

/* ------------------------------------------------------------------ */
/* Bilingual strings                                                    */
/* ------------------------------------------------------------------ */

const BI_EYEBROW = {
  en: "Five centuries · 五个世纪 · one machinery",
  zh: "五个世纪 · Five centuries · 同一台机器",
};

const BI_CAPTION = {
  en: "Four centuries separate Leonardo from Feynman; fifty years separate Feynman from Musk. The same traits — curiosity without a customer, reasoning from first principles, thinking on paper, visual proof — recur across every gap.",
  zh: "列奥纳多与费曼之间相隔四个世纪；费曼与马斯克之间相隔五十年。同样的特质——没有客户的好奇、从第一性原理推理、在纸上思考、以视觉为证明——在每一道间隙中反复出现。",
};

const BI_LEGEND_SPAN = { en: "Life span", zh: "生命跨度" };
const BI_LEGEND_MILE = { en: "Milestone", zh: "里程碑" };

/* ------------------------------------------------------------------ */
/* Tooltip state type                                                   */
/* ------------------------------------------------------------------ */

type ActiveMs = {
  index: number;
  svgX: number; // x centre in SVG coords
  svgY: number; // y centre in SVG coords
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export default function GeniusTimeline() {
  const { lang } = useLang();
  const [active, setActive] = useState<ActiveMs | null>(null);

  // Detect the active milestone object
  const activeMs: Milestone | null =
    active !== null ? TIMELINE[active.index] : null;

  function handleDotEnter(index: number, ms: Milestone) {
    const svgX = xOf(ms.year);
    const svgY = LANE[ms.mind] - BAND_H / 2 - 16;
    setActive({ index, svgX, svgY });
  }

  function handleDotLeave() {
    setActive(null);
  }

  // Tooltip clamping so it doesn't overflow left/right
  function tooltipLeft(svgX: number): number {
    // convert SVG x → percent of viewBox, then clamp
    const pct = svgX / SVG_W;
    return Math.min(Math.max(pct * 100, 6), 94);
  }

  return (
    <section className="w-full py-10 px-4 md:px-8 paper-grain">
      {/* Eyebrow */}
      <p className="label-mono text-center mb-2 text-ghost-300/70 tracking-widest text-xs uppercase">
        {BI_EYEBROW[lang]}
      </p>

      {/* Heading */}
      <h2 className="display text-center gold-text text-2xl md:text-3xl mb-1">
        <T v={{ en: "Five Centuries", zh: "五个世纪" }} />
      </h2>
      <p className="text-center text-ghost-300 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
        <T v={BI_CAPTION} />
      </p>

      {/* SVG Timeline */}
      <div className="relative w-full max-w-4xl mx-auto" style={{ minHeight: 0 }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ height: "auto", display: "block" }}
          role="img"
          aria-label={lang === "en" ? "Timeline spanning five centuries" : "跨越五个世纪的时间轴"}
        >
          {/* ---- fine grid lines at centuries ---- */}
          {CENTURY_TICKS.map((yr) => (
            <line
              key={yr}
              x1={xOf(yr)}
              y1={18}
              x2={xOf(yr)}
              y2={AXIS_Y}
              stroke="#9c917622"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          {/* ---- life-span bands ---- */}
          {MINDS.map((m) => {
            const [yStart, yEnd] = LIFE_SPANS[m.key];
            const x1 = xOf(yStart);
            const x2 = xOf(yEnd);
            const ly = LANE[m.key];

            // dashed right edge for musk (open-ended)
            const isMusk = m.key === "musk";

            return (
              <g key={m.key}>
                {/* background glow */}
                <rect
                  x={x1}
                  y={ly - BAND_H / 2}
                  width={x2 - x1}
                  height={BAND_H}
                  rx={4}
                  fill={ACCENT_DIM[m.key]}
                />
                {/* solid band */}
                <rect
                  x={x1}
                  y={ly - BAND_H / 2}
                  width={x2 - x1}
                  height={BAND_H}
                  rx={4}
                  fill="none"
                  stroke={ACCENT[m.key]}
                  strokeWidth="1.5"
                  strokeDasharray={isMusk ? "6 3" : "none"}
                  opacity="0.85"
                />

                {/* Lane label — name left of bar, dates below */}
                <text
                  x={x1 - 4}
                  y={ly - 1}
                  textAnchor="end"
                  fontSize="11"
                  fill={ACCENT[m.key]}
                  fontFamily="'Space Grotesk', 'IBM Plex Mono', monospace"
                  fontWeight="600"
                  opacity="0.9"
                >
                  {m.name[lang]}
                </text>
                <text
                  x={x1 - 4}
                  y={ly + 11}
                  textAnchor="end"
                  fontSize="9"
                  fill="#9c9176"
                  fontFamily="'IBM Plex Mono', monospace"
                >
                  {m.dates}
                </text>
              </g>
            );
          })}

          {/* ---- milestone dots ---- */}
          {TIMELINE.map((ms, i) => {
            const cx = xOf(ms.year);
            const cy = LANE[ms.mind];
            const isActive = active?.index === i;
            const color = ACCENT[ms.mind];

            return (
              <g
                key={i}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleDotEnter(i, ms)}
                onMouseLeave={handleDotLeave}
                onFocus={() => handleDotEnter(i, ms)}
                onBlur={handleDotLeave}
                role="button"
                tabIndex={0}
                aria-label={`${ms.year}: ${ms.label[lang]}`}
              >
                {/* invisible hit-area */}
                <circle cx={cx} cy={cy} r={14} fill="transparent" />
                {/* outer ring on active */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                )}
                {/* dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 5 : 4}
                  fill={isActive ? color : "#0c0a07"}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ transition: "r 0.15s, fill 0.15s" }}
                />
              </g>
            );
          })}

          {/* ---- horizontal axis ---- */}
          <line
            x1={PAD_L}
            y1={AXIS_Y}
            x2={SVG_W - PAD_R}
            y2={AXIS_Y}
            stroke="#9c917644"
            strokeWidth="1"
          />

          {/* ---- century tick labels ---- */}
          {CENTURY_TICKS.map((yr) => (
            <g key={yr}>
              <line
                x1={xOf(yr)}
                y1={AXIS_Y}
                x2={xOf(yr)}
                y2={AXIS_Y + 6}
                stroke="#9c917666"
                strokeWidth="1"
              />
              <text
                x={xOf(yr)}
                y={AXIS_Y + 18}
                textAnchor="middle"
                fontSize="9"
                fill="#9c9176"
                fontFamily="'IBM Plex Mono', monospace"
                letterSpacing="0.5"
              >
                {yr}
              </text>
            </g>
          ))}

          {/* ---- year ticks at start of each life ---- */}
          {([1452, 1918, 1971] as const).map((yr) => (
            <g key={`lt-${yr}`}>
              <line
                x1={xOf(yr)}
                y1={AXIS_Y}
                x2={xOf(yr)}
                y2={AXIS_Y + 6}
                stroke="#9c917644"
                strokeWidth="1"
              />
              <text
                x={xOf(yr)}
                y={AXIS_Y + 18}
                textAnchor="middle"
                fontSize="8.5"
                fill="#9c917688"
                fontFamily="'IBM Plex Mono', monospace"
              >
                {yr}
              </text>
            </g>
          ))}

          {/* ---- gap annotations — emphasise the empty centuries ---- */}
          {/* Gap 1: ~1520 – ~1917 */}
          <g>
            <text
              x={xOf(1720)}
              y={LANE["feyn"] - 8}
              textAnchor="middle"
              fontSize="8"
              fill="#9c917640"
              fontFamily="'IBM Plex Mono', monospace"
              letterSpacing="1"
            >
              {lang === "en" ? "· · · 399 years · · ·" : "· · · 399 年 · · ·"}
            </text>
          </g>
          {/* Gap 2: 1988 – 1971 (overlap, no gap label needed) */}
        </svg>

        {/* ---- HTML tooltip — positioned relative to container ---- */}
        {activeMs && active && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: `${tooltipLeft(active.svgX)}%`,
              top: `${(active.svgY / SVG_H) * 100}%`,
              transform: "translate(-50%, -100%)",
              paddingBottom: "8px",
            }}
          >
            <div
              className="rounded border px-3 py-2 text-left"
              style={{
                background: "#0c0a07ee",
                borderColor: `${ACCENT[activeMs.mind]}55`,
                minWidth: "180px",
                maxWidth: "240px",
                boxShadow: `0 4px 24px ${ACCENT[activeMs.mind]}22`,
              }}
            >
              <p
                className="label-mono mb-1"
                style={{ color: ACCENT[activeMs.mind], fontSize: "10px", letterSpacing: "0.12em" }}
              >
                {activeMs.year}
              </p>
              <p
                className="text-ghost-100 leading-snug"
                style={{ fontSize: "12px" }}
              >
                {activeMs.label[lang]}
              </p>
            </div>
            {/* pointer triangle */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: 0,
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `6px solid ${ACCENT[activeMs.mind]}55`,
              }}
            />
          </div>
        )}
      </div>

      {/* ---- Legend ---- */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
        {MINDS.map((m) => (
          <div key={m.key} className="flex items-center gap-2">
            <span
              className="inline-block rounded"
              style={{
                width: 20,
                height: 8,
                background: ACCENT_DIM[m.key],
                border: `1.5px solid ${ACCENT[m.key]}`,
              }}
            />
            <span
              className="label-mono"
              style={{ color: ACCENT[m.key], fontSize: "10px" }}
            >
              <T v={m.name} />
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span
            className="inline-block rounded-full border"
            style={{
              width: 8,
              height: 8,
              background: "#0c0a07",
              borderColor: "#9c9176",
              borderWidth: "1.5px",
            }}
          />
          <span className="label-mono text-ghost-300/60" style={{ fontSize: "10px" }}>
            <T v={BI_LEGEND_MILE} />
          </span>
        </div>
      </div>

      {/* ---- Rule ---- */}
      <div className="rule-signal w-16 mx-auto mt-8 mb-0" />
    </section>
  );
}
