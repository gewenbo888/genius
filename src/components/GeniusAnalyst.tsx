"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { ANALYST_ROLES, ANALYST_TOPICS } from "./content";
import type { Bi } from "./lang";

// ── static bilingual strings ─────────────────────────────────────────────────

const EYEBROW: Bi = {
  en: "Five lenses · 五个视角",
  zh: "Five lenses · 五个视角",
};

const INTRO: Bi = {
  en: "Where the lenses agree, the ground is solid. Where they diverge, the books leave the verdict open.",
  zh: "五个视角相互印证之处，是坚实的地基；它们相互分歧之处，是这些书留下的开放裁决。",
};

const PANEL_LABEL: Bi = {
  en: "The panel",
  zh: "评论席",
};

const QUESTIONS_LABEL: Bi = {
  en: "Questions",
  zh: "问题",
};

// ── LensChip: small pill for each role in the legend row ─────────────────────

function LensChip({ roleKey }: { roleKey: string }) {
  const role = ANALYST_ROLES.find((r) => r.key === roleKey);
  if (!role) return null;
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-2 h-2 rounded-full shrink-0"
        style={{ background: role.accent }}
      />
      <span className="text-[0.7rem] font-mono" style={{ color: role.accent }}>
        <T v={role.role} />
      </span>
      <span className="text-ghost-300/50 text-[0.65rem] font-mono hidden sm:inline">
        — <T v={role.blurb} />
      </span>
    </div>
  );
}

// ── ViewCard: one lens's answer for the active topic ─────────────────────────

function ViewCard({
  lens,
  text,
}: {
  lens: string;
  text: Bi;
}) {
  const role = ANALYST_ROLES.find((r) => r.key === lens);
  if (!role) return null;

  return (
    <article
      className="rise-in relative pl-4 py-4 pr-4 rounded-r-lg border-l-2 bg-ink-950/60 border border-ghost-300/8"
      style={{ borderLeftColor: role.accent, borderLeftWidth: "2px" }}
    >
      {/* role header */}
      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
        {/* accent dot */}
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0 mt-0.5"
          style={{ background: role.accent }}
        />
        <span
          className="label-mono text-[0.72rem] tracking-wider font-semibold"
          style={{ color: role.accent }}
        >
          <T v={role.role} />
        </span>
        <span className="text-ghost-300/45 text-[0.65rem] font-mono italic">
          <T v={role.blurb} />
        </span>
      </header>

      {/* view text */}
      <p className="display text-ghost-100/85 text-sm leading-relaxed">
        <T v={text} />
      </p>
    </article>
  );
}

// ── QuestionRow: selectable question in the left panel ───────────────────────

function QuestionRow({
  q,
  active,
  onClick,
}: {
  q: Bi;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 text-sm leading-snug",
        active
          ? "border-gold-500/40 bg-gold-500/8 text-ghost-100"
          : "border-ghost-300/10 bg-transparent text-ghost-300/65 hover:text-ghost-100/80 hover:border-ghost-300/20",
      ].join(" ")}
      aria-pressed={active}
    >
      {active && (
        <span
          className="block w-1 h-1 rounded-full bg-gold-400 mb-1.5"
          aria-hidden
        />
      )}
      <T v={q} />
    </button>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function GeniusAnalyst() {
  const { lang } = useLang();
  const [activeKey, setActiveKey] = useState<string>(ANALYST_TOPICS[0].key);

  const activeTopic = ANALYST_TOPICS.find((t) => t.key === activeKey) ?? ANALYST_TOPICS[0];

  return (
    <section className="holo rounded-2xl p-6 md:p-8 grid-fine paper-grain">
      {/* ── eyebrow + intro ── */}
      <div className="mb-6 text-center">
        <p className="label-mono text-gold-300/70 mb-2 tracking-widest select-none">
          {EYEBROW[lang]}
        </p>
        <p className="text-ghost-300/60 text-xs italic max-w-xl mx-auto leading-relaxed">
          <T v={INTRO} />
        </p>
      </div>

      {/* ── legend row: all 5 lenses ── */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-6 px-1 pb-5 border-b border-ghost-300/10">
        <span className="label-mono text-ghost-300/40 text-[0.65rem] tracking-widest self-center mr-1">
          <T v={PANEL_LABEL} />
        </span>
        {ANALYST_ROLES.map((role) => (
          <LensChip key={role.key} roleKey={role.key} />
        ))}
      </div>

      {/* ── two-column layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* left: question list */}
        <div className="flex flex-col gap-y-1">
          <p className="label-mono text-ghost-300/40 text-[0.65rem] tracking-widest mb-2 px-1">
            <T v={QUESTIONS_LABEL} />
          </p>
          {ANALYST_TOPICS.map((topic) => (
            <QuestionRow
              key={topic.key}
              q={topic.q}
              active={topic.key === activeKey}
              onClick={() => setActiveKey(topic.key)}
            />
          ))}
        </div>

        {/* right: stacked view cards — key forces remount + re-animation */}
        <div key={activeTopic.key} className="flex flex-col gap-4">
          {activeTopic.views.map((view) => (
            <ViewCard key={view.lens} lens={view.lens} text={view.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
