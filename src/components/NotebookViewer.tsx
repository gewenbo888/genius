"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { MINDS, NOTEBOOK, type MindKey, type Mind, type NotebookPage } from "./content";

/* ------------------------------------------------------------------ */
/* helpers                                                              */
/* ------------------------------------------------------------------ */

const EYEBROW: { en: string; zh: string } = {
  en: "The working page",
  zh: "工作的纸页",
};

/** Subtle vellum tint per mind — very low opacity */
const WASH: Record<MindKey, string> = {
  leo: "rgba(196,90,53,0.06)",
  feyn: "rgba(63,180,196,0.06)",
  musk: "rgba(111,143,214,0.07)",
};

/** Active-tab accent ring + bg per mind */
const TAB_ACTIVE: Record<MindKey, string> = {
  leo:  "border-leo-500 bg-leo-900/30 text-leo-300",
  feyn: "border-feyn-500 bg-feyn-900/30 text-feyn-300",
  musk: "border-musk-500 bg-musk-900/30 text-musk-300",
};

const TAB_IDLE =
  "border-transparent bg-transparent text-ghost-400 hover:text-ghost-200 hover:border-ghost-500/30";

/** Left-border footnote accent per mind */
const FOOTNOTE_BORDER: Record<MindKey, string> = {
  leo:  "border-leo-500",
  feyn: "border-feyn-500",
  musk: "border-musk-500",
};

/* ------------------------------------------------------------------ */
/* sub-components                                                       */
/* ------------------------------------------------------------------ */

function MindSwatch({ mind }: { mind: Mind }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: mind.accent }}
    />
  );
}

interface LeoLineProps {
  text: string;
  mirrored: boolean;
}

function LeoLine({ text, mirrored }: LeoLineProps) {
  return (
    <span
      className="block w-full"
      style={{
        direction: mirrored ? "rtl" : "ltr",
        textAlign: mirrored ? "right" : "left",
        transform: mirrored ? "scaleX(-1)" : "none",
        display: "block",
        fontStyle: "italic",
        letterSpacing: "0.01em",
      }}
    >
      {text}
    </span>
  );
}

interface NotebookLeafProps {
  page: NotebookPage;
  mind: Mind;
  mirrored: boolean;
  onToggleMirror: () => void;
}

function NotebookLeaf({ page, mind, mirrored, onToggleMirror }: NotebookLeafProps) {
  const { lang } = useLang();
  const isLeo = page.mind === "leo";

  return (
    <div
      className="relative rounded-sm overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(160deg, #f7f0e2 0%, #ede4cd 40%, #e8dcc0 100%)`,
        backgroundImage: [
          `linear-gradient(160deg, #f7f0e2 0%, #ede4cd 40%, #e8dcc0 100%)`,
        ].join(", "),
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(120,90,40,0.15), 2px 2px 0 0 rgba(120,90,40,0.08)",
      }}
    >
      {/* Wash tint layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: WASH[mind.key], mixBlendMode: "multiply" }}
      />

      {/* Ruled-line background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(140,110,60,0.13) 28px)",
          backgroundPosition: "0 52px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-7 pt-8 pb-7">
        {/* Mirror toggle — only for Leo */}
        {isLeo && (
          <div className="flex justify-end mb-3">
            <button
              onClick={onToggleMirror}
              className="label-mono text-[0.62rem] px-2 py-0.5 rounded border transition"
              style={{
                borderColor: `${mind.accent}60`,
                color: mind.accent,
                background: `${mind.accent}10`,
              }}
            >
              {mirrored
                ? lang === "zh"
                  ? "解镜 →"
                  : "un-mirror →"
                : lang === "zh"
                ? "← 还镜"
                : "← mirror"}
            </button>
          </div>
        )}

        {/* Heading */}
        <h3
          className="display text-[1.05rem] leading-snug mb-5 font-semibold"
          style={{ color: "#3d2b0e" }}
        >
          <T v={page.heading} />
        </h3>

        {/* Lines */}
        <ul className="space-y-3">
          {page.lines.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {/* ink-dot bullet */}
              <span
                className="mt-[0.35em] flex-shrink-0 w-1 h-1 rounded-full"
                style={{ background: mind.accent, opacity: 0.7 }}
              />
              <span
                className="font-serif text-[0.9rem] leading-relaxed"
                style={{ color: "#2a1d06", flex: 1 }}
              >
                {isLeo ? (
                  <LeoLine text={line[lang]} mirrored={mirrored} />
                ) : (
                  <span className={lang === "zh" ? "zh" : ""}>{line[lang]}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Caption / footnote */}
      <div
        className={`relative z-10 mx-6 mb-6 pl-3 border-l-2 ${FOOTNOTE_BORDER[mind.key]}`}
        style={{ borderLeftColor: mind.accent }}
      >
        <p
          className="label-mono text-[0.68rem] leading-relaxed"
          style={{ color: "#6b5230" }}
        >
          <T v={page.caption} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* main export                                                           */
/* ------------------------------------------------------------------ */

export default function NotebookViewer() {
  const { lang } = useLang();

  // Default to Leonardo (first mind)
  const [activeKey, setActiveKey] = useState<MindKey>("leo");
  // Mirror-script toggle — only relevant for Leo, default ON (mirrored)
  const [mirrored, setMirrored] = useState<boolean>(true);

  const activePage = NOTEBOOK.find((p) => p.mind === activeKey)!;
  const activeMind = MINDS.find((m) => m.key === activeKey)!;

  return (
    <section className="holo py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p className="label-mono text-[0.68rem] tracking-widest mb-5 text-ghost-400">
          {lang === "zh"
            ? `${EYEBROW.en}  ·  ${EYEBROW.zh}`
            : `${EYEBROW.en}  ·  ${EYEBROW.zh}`}
        </p>

        {/* Tab strip */}
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {MINDS.map((m) => {
            const page = NOTEBOOK.find((p) => p.mind === m.key);
            if (!page) return null;
            const isActive = m.key === activeKey;
            return (
              <button
                key={m.key}
                onClick={() => {
                  setActiveKey(m.key);
                  // Reset mirror when switching to Leo; don't disturb otherwise
                  if (m.key === "leo") setMirrored(true);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-[0.78rem] font-medium transition-all duration-200 label-mono ${
                  isActive ? TAB_ACTIVE[m.key] : TAB_IDLE
                }`}
              >
                <MindSwatch mind={m} />
                <T v={m.name} />
              </button>
            );
          })}
        </div>

        {/* Notebook leaf */}
        <div
          className="lang-fade"
          style={{ minHeight: "420px", maxWidth: "640px", margin: "0 auto" }}
        >
          <NotebookLeaf
            page={activePage}
            mind={activeMind}
            mirrored={mirrored}
            onToggleMirror={() => setMirrored((v) => !v)}
          />
        </div>

        {/* Mind accent rule */}
        <div
          className="rule-signal mt-6 mb-0 h-px w-24 mx-auto opacity-40"
          style={{ background: activeMind.accent }}
        />
      </div>
    </section>
  );
}
