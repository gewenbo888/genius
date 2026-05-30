"use client";

import { useState, useEffect } from "react";
import { T, useLang } from "./lang";
import { MINDS, FP_CASES, FPCase, Mind } from "./content";

/* ---- helper: get Mind by key ---- */
function getMind(key: string): Mind {
  return MINDS.find((m) => m.key === key) ?? MINDS[0];
}

/* ---- X-mark rendered in SVG (no emoji) ---- */
function CrossMark({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="inline-block shrink-0 mt-[2px]">
      <line x1="2" y1="2" x2="12" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="2" x2="2" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---- Blueprint connector line (SVG, dashed, animated via .flow) ---- */
function ConnectorLine({ color }: { color: string }) {
  return (
    <div className="flex justify-center py-0.5" aria-hidden="true">
      <svg width="2" height="24" viewBox="0 0 2 24">
        <line
          x1="1" y1="0" x2="1" y2="24"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          className="flow"
          style={{ strokeOpacity: 0.55 }}
        />
      </svg>
    </div>
  );
}

/* ---- Stage label chip ---- */
function StageLabel({ n, text }: { n: string; text: string }) {
  return (
    <span className="label-mono text-[0.6rem] tracking-widest text-ghost-300/60 mr-2 select-none">
      {n} / {text}
    </span>
  );
}

/* ---- Atom specimen card ---- */
function AtomCard({
  atom,
  accentColor,
  visible,
  index,
}: {
  atom: import("./lang").Bi;
  accentColor: string;
  visible: boolean;
  index: number;
}) {
  return (
    <div
      className="rise-in border rounded-sm px-3 py-2 text-sm text-ghost-100 grid-fine"
      style={{
        borderColor: `${accentColor}33`,
        background: `${accentColor}09`,
        opacity: visible ? 1 : 0,
        transition: `opacity 300ms ease ${index * 140}ms, transform 300ms ease ${index * 140}ms`,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      <span className="label-mono text-[0.58rem] tracking-widest mr-2 select-none" style={{ color: `${accentColor}88` }}>
        {String(index + 1).padStart(2, "0")} —
      </span>
      <T v={atom} />
    </div>
  );
}

export default function FirstPrinciplesLab() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const [atomsVisible, setAtomsVisible] = useState(false);
  const [decomposed, setDecomposed] = useState(false);

  const activeCase: FPCase = FP_CASES[activeIdx];
  const mind: Mind = getMind(activeCase.mind);
  const accent = mind.accent;

  /* reset + stagger reveal whenever active case changes */
  useEffect(() => {
    setAtomsVisible(false);
    setDecomposed(false);
    const t1 = setTimeout(() => setAtomsVisible(true), 120);
    const t2 = setTimeout(() => setDecomposed(true), 120 + activeCase.atoms.length * 140 + 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIdx, activeCase.atoms.length]);

  return (
    <section className="relative rounded-sm border border-ghost-300/10 bg-ink-950 overflow-hidden paper-grain">
      {/* ---- eyebrow ---- */}
      <div className="px-5 pt-5 pb-3 border-b border-ghost-300/8">
        <p className="label-mono text-[0.62rem] tracking-widest text-ghost-300/50 uppercase">
          Reason from the thing itself&nbsp;&middot;&nbsp;从事物本身推理
        </p>
        <h2 className="display text-xl mt-1" style={{ color: accent }}>
          {lang === "en" ? "First Principles Lab" : "第一性原理工坊"}
        </h2>
      </div>

      {/* ---- case selector chips ---- */}
      <div className="flex gap-2 px-5 pt-4 pb-3 flex-wrap">
        {FP_CASES.map((c, i) => {
          const m = getMind(c.mind);
          const isActive = i === activeIdx;
          return (
            <button
              key={c.mind}
              onClick={() => setActiveIdx(i)}
              aria-pressed={isActive}
              className={[
                "label-mono text-[0.68rem] tracking-wider px-3 py-1.5 rounded-sm border transition-all duration-200",
                isActive
                  ? "text-ink-950 border-transparent"
                  : "text-ghost-300/60 border-ghost-300/15 hover:border-ghost-300/30 hover:text-ghost-100",
              ].join(" ")}
              style={
                isActive
                  ? { background: m.accent, borderColor: m.accent }
                  : {}
              }
            >
              <T v={m.name} />
            </button>
          );
        })}
      </div>

      {/* ---- pipeline ---- */}
      <div className="px-5 pb-5 flex flex-col gap-0">

        {/* STAGE 1 — PROBLEM */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0">
            <StageLabel n="01" text={lang === "en" ? "PROBLEM" : "问题"} />
          </div>
          <div
            className="rounded-sm border px-4 py-2.5 text-sm text-ghost-100 leading-relaxed"
            style={{ borderColor: `${accent}40`, background: `${accent}0d` }}
          >
            <T v={activeCase.problem} />
          </div>
        </div>

        <ConnectorLine color={accent} />

        {/* STAGE 2 — CONVENTION (rejected) */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <StageLabel n="02" text={lang === "en" ? "CONVENTION" : "惯例"} />
            <CrossMark color="#a07040" />
            <span className="label-mono text-[0.58rem] tracking-widest text-ghost-300/35 ml-1">
              {lang === "en" ? "discarded" : "弃置"}
            </span>
          </div>
          <div
            className="rounded-sm border px-4 py-2.5 text-sm text-ghost-300/40 leading-relaxed"
            style={{ borderColor: "#a0704030", background: "#a0704008" }}
          >
            <span className="line-through decoration-ghost-300/30">
              <T v={activeCase.convention} />
            </span>
          </div>
        </div>

        <ConnectorLine color={accent} />

        {/* STAGE 3 — ATOMS */}
        <div className="flex flex-col gap-1">
          <StageLabel n="03" text={lang === "en" ? "ATOMS" : "原子"} />
          <div className="flex flex-col gap-1.5">
            {activeCase.atoms.map((atom, i) => (
              <AtomCard
                key={i}
                atom={atom}
                accentColor={accent}
                visible={atomsVisible}
                index={i}
              />
            ))}
          </div>
        </div>

        <ConnectorLine color={accent} />

        {/* STAGE 4 — REBUILD */}
        <div className="flex flex-col gap-1">
          <StageLabel n="04" text={lang === "en" ? "REBUILD" : "重建"} />
          <div
            className="rounded-sm border px-4 py-3 text-sm leading-relaxed font-medium transition-all duration-500"
            style={{
              borderColor: `${accent}66`,
              background: `${accent}18`,
              color: accent,
              opacity: decomposed ? 1 : 0,
              transform: decomposed ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <T v={activeCase.rebuild} />
          </div>
        </div>

      </div>

      {/* ---- INSIGHT footer ---- */}
      <div
        className="holo border-t px-5 py-4"
        style={{ borderColor: `${accent}22` }}
      >
        <p className="label-mono text-[0.6rem] tracking-widest mb-1.5 uppercase" style={{ color: `${accent}88` }}>
          {lang === "en" ? "Meta-insight" : "元洞见"}
        </p>
        <p
          className="text-sm italic leading-relaxed"
          style={{ color: "#f3d692cc" }}
        >
          <T v={activeCase.insight} />
        </p>
        {/* gold accent rule */}
        <div
          className="mt-3 h-px shimmer"
          style={{ background: `linear-gradient(90deg, ${accent}00, ${accent}66, ${accent}00)` }}
        />
      </div>

      {/* ---- blueprint corner marks ---- */}
      {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map((pos, i) => (
        <svg
          key={i}
          width="10" height="10" viewBox="0 0 10 10"
          className={`absolute ${pos} pointer-events-none`}
          aria-hidden="true"
        >
          <path
            d={
              pos.includes("left-0") && pos.includes("top-0") ? "M0 6 L0 0 L6 0" :
              pos.includes("right-0") && pos.includes("top-0") ? "M4 0 L10 0 L10 6" :
              pos.includes("left-0") ? "M0 4 L0 10 L6 10" :
              "M4 10 L10 10 L10 4"
            }
            stroke={`${accent}44`}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      ))}
    </section>
  );
}
