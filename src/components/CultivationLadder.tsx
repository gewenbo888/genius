"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { CULTIVATION } from "./content";
import type { Bi } from "./lang";

// ── colour graduation: leo → gold → feyn, one stop per rung ──────────────────
// Index 0 = rung 01 (bottom), index 7 = rung 08 (top).
// Kept mostly gold; leo tints the lower rungs, feyn tints the upper ones.
const RUNG_COLORS = [
  { text: "#c45a35", glow: "rgba(196,90,53,0.45)",  border: "rgba(196,90,53,0.30)" },  // 01 leo
  { text: "#cc7040", glow: "rgba(204,112,64,0.40)",  border: "rgba(204,112,64,0.26)" }, // 02
  { text: "#d6a23c", glow: "rgba(214,162,60,0.45)",  border: "rgba(214,162,60,0.30)" }, // 03 gold
  { text: "#e8bd5e", glow: "rgba(232,189,94,0.40)",  border: "rgba(232,189,94,0.28)" }, // 04
  { text: "#e8bd5e", glow: "rgba(232,189,94,0.42)",  border: "rgba(232,189,94,0.28)" }, // 05
  { text: "#a6d8de", glow: "rgba(111,208,221,0.38)", border: "rgba(111,208,221,0.24)" }, // 06
  { text: "#6fd0dd", glow: "rgba(63,180,196,0.42)",  border: "rgba(63,180,196,0.28)" },  // 07
  { text: "#3fb4c4", glow: "rgba(63,180,196,0.50)",  border: "rgba(63,180,196,0.35)" },  // 08 feyn
] as const;

// Summit bilingual caption for rung 08
const SUMMIT_CAPTION: Bi = {
  en: "The ladder ends not in triumph but in honesty — keep the engine, refuse the cruelty.",
  zh: "梯子终于诚实，而非凯旋——保留引擎；拒绝残忍。",
};

const EYEBROW: Bi = {
  en: "The climb · eight rungs",
  zh: "可攀爬的天才 · 八级",
};

// ── component ─────────────────────────────────────────────────────────────────

export default function CultivationLadder() {
  const { lang } = useLang();
  const [active, setActive] = useState<number>(-1);

  // Rungs rendered bottom-to-top visually: index 7 at top, index 0 at bottom.
  // We reverse the display order so 01 sits at the bottom.
  const displayRungs = [...CULTIVATION].reverse(); // index 0 in displayRungs = rung 08

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-3xl mx-auto">
      {/* eyebrow */}
      <p className="label-mono mb-8 text-ghost-300 tracking-widest uppercase text-xs">
        {lang === "zh"
          ? EYEBROW.zh
          : EYEBROW.en}
      </p>

      {/* title */}
      <h2 className="display text-2xl md:text-3xl gold-text mb-2">
        {lang === "zh" ? "可攀爬的天才" : "The Cultivation Ladder"}
      </h2>
      <p className="text-ghost-300 text-sm mb-12 max-w-md">
        {lang === "zh"
          ? "天才是一系列可习得的习惯，而非一份不可转让的禀赋。"
          : "Genius as a set of learnable habits, not an untransferable endowment."}
      </p>

      {/* ladder container — gold vertical spine + rungs */}
      <div className="relative">

        {/* vertical spine — gilt rail running the full height */}
        <div
          className="absolute left-[2.25rem] md:left-[2.75rem] top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to top, #c45a35 0%, #d6a23c 40%, #e8bd5e 60%, #3fb4c4 100%)",
            opacity: 0.55,
          }}
          aria-hidden
        />

        {/* rungs — displayed top to bottom in DOM, but visually reversed via flex-col */}
        <ol className="flex flex-col gap-3 list-none m-0 p-0">
          {displayRungs.map((rung, displayIdx) => {
            // displayIdx 0 = rung 08 (top of visual stack, first in DOM)
            // contentIdx: rung's original index in CULTIVATION (0 = rung 01)
            const contentIdx = CULTIVATION.length - 1 - displayIdx;
            const color = RUNG_COLORS[contentIdx];
            const isSummit = rung.n === "08";
            const isActive = active === contentIdx;

            return (
              <li key={rung.n}>
                <button
                  type="button"
                  onClick={() => setActive(isActive ? -1 : contentIdx)}
                  className="w-full text-left group focus:outline-none"
                  aria-expanded={isActive}
                >
                  <div
                    className="relative flex items-start gap-4 md:gap-6 rounded-lg px-4 py-4 md:py-5 transition-all duration-300"
                    style={{
                      background: isActive
                        ? `radial-gradient(ellipse at left, ${color.glow} 0%, transparent 70%), rgba(28,24,19,0.85)`
                        : "rgba(19,16,11,0.70)",
                      border: `1px solid ${isActive ? color.border : "rgba(214,162,60,0.08)"}`,
                      boxShadow: isActive
                        ? `0 0 32px -8px ${color.glow}, inset 0 1px 0 rgba(243,214,146,0.06)`
                        : "inset 0 1px 0 rgba(243,214,146,0.04)",
                      transform: isActive ? "translateX(6px) scale(1.012)" : "none",
                    }}
                  >
                    {/* rung node — sits over the spine */}
                    <div
                      className="absolute"
                      style={{ left: "calc(2.25rem - 5px)", top: "1.4rem" }}
                      aria-hidden
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full border"
                        style={{
                          background: color.text,
                          borderColor: color.text,
                          boxShadow: isActive ? `0 0 10px 2px ${color.glow}` : "none",
                          opacity: isActive ? 1 : 0.65,
                          transition: "all 0.25s",
                        }}
                      />
                    </div>

                    {/* rung number */}
                    <span
                      className="display text-3xl md:text-4xl leading-none shrink-0 w-10 md:w-14 select-none"
                      style={{
                        color: isActive ? color.text : "rgba(214,162,60,0.38)",
                        transition: "color 0.25s",
                        fontVariantNumeric: "tabular-nums",
                        // indent so number clears the spine
                        paddingLeft: "2.25rem",
                      }}
                    >
                      {rung.n}
                    </span>

                    {/* content */}
                    <div className="flex-1 min-w-0">
                      {/* summit badge */}
                      {isSummit && (
                        <span
                          className="label-mono text-[0.6rem] tracking-widest uppercase mb-1 block"
                          style={{ color: color.text, opacity: 0.9 }}
                        >
                          {lang === "zh" ? "顶点" : "Summit"}
                        </span>
                      )}

                      {/* trait name */}
                      <p
                        className="display text-lg md:text-xl leading-snug transition-colors duration-200"
                        style={{ color: isActive ? color.text : "#ece4d4" }}
                      >
                        <T v={rung.trait} />
                      </p>

                      {/* practice — always visible but expands emphasis when active */}
                      <p
                        className={`text-sm md:text-base mt-2 leading-relaxed transition-all duration-300 ${
                          isActive
                            ? "text-ghost-100 opacity-100"
                            : "text-ghost-300 opacity-70"
                        } ${lang === "zh" ? "zh" : ""}`}
                      >
                        <T v={rung.practice} />
                      </p>

                      {/* summit caption — shown only on rung 08 when active */}
                      {isSummit && isActive && (
                        <p
                          className="mt-3 text-xs leading-relaxed italic border-t pt-3"
                          style={{
                            color: color.text,
                            borderColor: `${color.border}`,
                            opacity: 0.85,
                          }}
                        >
                          <T v={SUMMIT_CAPTION} />
                        </p>
                      )}
                    </div>

                    {/* expand indicator */}
                    <div
                      className="shrink-0 self-center w-4 h-4 flex items-center justify-center transition-all duration-300"
                      style={{
                        color: isActive ? color.text : "rgba(156,145,118,0.4)",
                        transform: isActive ? "rotate(180deg)" : "none",
                      }}
                      aria-hidden
                    >
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path
                          d="M2 4.5L6 8L10 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* mobile-md note under spine */}
        <div className="rule-signal mt-10 pt-6">
          <p className="text-ghost-300 text-xs leading-relaxed max-w-sm">
            {lang === "zh"
              ? "每级皆可独立习得；它们共同构成一套工作方式，而非一个人物。"
              : "Each rung is learnable on its own. Together they form a way of working, not a personality."}
          </p>
        </div>
      </div>
    </section>
  );
}
