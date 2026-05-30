"use client";

import { T, useLang } from "./lang";
import { MINDS } from "./content";
import type { Mind } from "./content";

// ── emblem SVGs (geometric monograms, line-art only, no likenesses) ──────────

function LeoEmblem({ accent }: { accent: string }) {
  // Vitruvian motif: outer circle, inner square on the diagonal, compass arms,
  // faint cross-proportion lines — Renaissance measurement vocabulary.
  return (
    <svg viewBox="0 0 140 140" className="w-full h-full" aria-label="Leonardo da Vinci emblem — Vitruvian proportion circle">
      {/* outer circle — the sphere of natural philosophy */}
      <circle cx="70" cy="70" r="58" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
      {/* inscribed square, rotated 45° — proportion and geometry */}
      <rect
        x="29" y="29" width="82" height="82"
        fill="none"
        stroke={accent} strokeWidth="0.8" strokeOpacity="0.35"
        transform="rotate(45,70,70)"
      />
      {/* upright inner square — Vitruvian man frame */}
      <rect x="38" y="38" width="44" height="44" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.5" />
      {/* compass arms — measurement instrument */}
      <line x1="70" y1="30" x2="70" y2="12" stroke={accent} strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="70" y1="110" x2="70" y2="128" stroke={accent} strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />
      {/* compass pivot */}
      <circle cx="70" cy="30" r="3.5" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.6" />
      {/* central human figure suggestion — just a vertical + horizontal axis */}
      <line x1="70" y1="42" x2="70" y2="96" stroke={accent} strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 3" />
      <line x1="44" y1="62" x2="96" y2="62" stroke={accent} strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 3" />
      {/* head circle — crown of the figure */}
      <circle cx="70" cy="52" r="7" fill="none" stroke={accent} strokeWidth="0.9" strokeOpacity="0.55" />
      {/* outstretched arms */}
      <line x1="44" y1="62" x2="57" y2="56" stroke={accent} strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="96" y1="62" x2="83" y2="56" stroke={accent} strokeWidth="0.8" strokeOpacity="0.45" />
      {/* phi proportion marks on outer circle */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 70 + 54 * Math.cos(rad);
        const y1 = 70 + 54 * Math.sin(rad);
        const x2 = 70 + 62 * Math.cos(rad);
        const y2 = 70 + 62 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />;
      })}
      {/* mirror-script "L" — the left-handed mark */}
      <text
        x="70" y="90"
        textAnchor="middle"
        fontSize="18"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fill={accent}
        fillOpacity="0.65"
        transform="scale(-1,1) translate(-140,0)"
      >
        L
      </text>
    </svg>
  );
}

function FeynEmblem({ accent }: { accent: string }) {
  // Feynman diagram: one vertex, two straight fermion lines (arrows), one wavy
  // photon line — the canonical QED diagram, pure physics notation.
  return (
    <svg viewBox="0 0 140 140" className="w-full h-full" aria-label="Feynman diagram emblem — quantum electrodynamics vertex">
      {/* background grid: the blackboard */}
      <line x1="12" y1="70" x2="128" y2="70" stroke={accent} strokeWidth="0.4" strokeOpacity="0.1" />
      <line x1="70" y1="12" x2="70" y2="128" stroke={accent} strokeWidth="0.4" strokeOpacity="0.1" />
      {/* vertex point */}
      <circle cx="70" cy="70" r="4" fill={accent} fillOpacity="0.85" />
      {/* incoming fermion line — particle comes from lower-left */}
      <line x1="22" y1="108" x2="70" y2="70" stroke={accent} strokeWidth="1.5" strokeOpacity="0.85" strokeLinecap="round" />
      {/* fermion arrow head at vertex */}
      <polygon
        points="70,70 61,73 63,65"
        fill={accent} fillOpacity="0.85"
      />
      {/* outgoing fermion line — particle exits to lower-right */}
      <line x1="70" y1="70" x2="118" y2="108" stroke={accent} strokeWidth="1.5" strokeOpacity="0.85" strokeLinecap="round" />
      {/* outgoing arrow head */}
      <polygon
        points="118,108 109,103 114,97"
        fill={accent} fillOpacity="0.85"
      />
      {/* photon line — wavy upward, emitted at vertex */}
      {/* hand-drawn wavy line via path */}
      <path
        d="M 70 70 C 77 60, 63 50, 70 40 C 77 30, 63 20, 70 12"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />
      {/* photon wiggles emphasis arcs */}
      <path
        d="M 70 70 C 74 64, 66 57, 70 50 C 74 43, 66 36, 70 30 C 74 24, 66 17, 70 12"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      {/* label: γ photon */}
      <text x="82" y="36" fontFamily="Georgia, serif" fontStyle="italic" fontSize="14" fill={accent} fillOpacity="0.7">γ</text>
      {/* label: e⁻ fermion labels */}
      <text x="14" y="108" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill={accent} fillOpacity="0.55">e⁻</text>
      <text x="116" y="108" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fill={accent} fillOpacity="0.55">e⁻</text>
      {/* outer decorative ring, like a blackboard circle */}
      <circle cx="70" cy="70" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="4 6" />
      {/* small wobble-plate reference: concentric arcs in a corner */}
      <path d="M 108 28 A 10 10 0 0 1 120 28" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <path d="M 104 24 A 16 16 0 0 1 124 24" fill="none" stroke={accent} strokeWidth="0.7" strokeOpacity="0.28" strokeLinecap="round" />
    </svg>
  );
}

function MuskEmblem({ accent }: { accent: string }) {
  // Rising rocket with orbit arc + first-principles atom decomposition:
  // a simplified rocket silhouette ascending a parabolic trajectory,
  // with decomposition brackets showing the material stack.
  return (
    <svg viewBox="0 0 140 140" className="w-full h-full" aria-label="Elon Musk emblem — rising rocket and first principles decomposition">
      {/* orbital ellipse — the destination orbit */}
      <ellipse cx="70" cy="85" rx="52" ry="22" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 5" />
      {/* ascent trajectory — parabolic arc from lower-left to upper-right */}
      <path
        d="M 30 118 Q 55 55, 98 16"
        fill="none"
        stroke={accent}
        strokeWidth="0.9"
        strokeOpacity="0.35"
        strokeDasharray="3 4"
      />
      {/* rocket body — tapered rect */}
      <g transform="translate(70,55) rotate(-42)">
        {/* fuselage */}
        <rect x="-7" y="-28" width="14" height="38" rx="3" fill="none" stroke={accent} strokeWidth="1.4" strokeOpacity="0.85" />
        {/* nose cone */}
        <path d="M -7 -28 L 0 -42 L 7 -28 Z" fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.85" />
        {/* fins — left and right */}
        <path d="M -7 8 L -14 18 L -7 10 Z" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.7" />
        <path d="M 7 8 L 14 18 L 7 10 Z" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.7" />
        {/* engine bell */}
        <path d="M -5 10 L -8 18 L 8 18 L 5 10 Z" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.65" />
        {/* exhaust flame plume */}
        <path d="M -3 18 Q 0 30, 3 18" fill="none" stroke={accent} strokeWidth="1.3" strokeOpacity="0.5" />
        <path d="M -1 18 Q 0 26, 1 18" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.35" />
        {/* window */}
        <circle cx="0" cy="-14" r="3" fill="none" stroke={accent} strokeWidth="0.9" strokeOpacity="0.6" />
      </g>
      {/* first-principles decomposition stack — right side */}
      {/* bracket */}
      <path d="M 98 72 L 104 72 L 104 118 L 98 118" fill="none" stroke={accent} strokeWidth="0.9" strokeOpacity="0.45" strokeLinecap="round" />
      {/* material layers */}
      {[
        { y: 79, label: "Al" },
        { y: 90, label: "Ti" },
        { y: 101, label: "Cu" },
        { y: 112, label: "C·f" },
      ].map(({ y, label }) => (
        <g key={label}>
          <line x1="98" y1={y} x2="104" y2={y} stroke={accent} strokeWidth="0.7" strokeOpacity="0.4" />
          <text x="110" y={y + 3.5} fontSize="7" fontFamily="JetBrains Mono, monospace" fill={accent} fillOpacity="0.6">
            {label}
          </text>
        </g>
      ))}
      {/* ≈ 2% callout */}
      <text x="14" y="128" fontSize="8" fontFamily="JetBrains Mono, monospace" fill={accent} fillOpacity="0.5">≈ 2 %</text>
      {/* outer circle */}
      <circle cx="70" cy="70" r="56" fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="3 7" />
      {/* stars — three fixed points, no random */}
      <circle cx="24" cy="28" r="1.2" fill={accent} fillOpacity="0.5" />
      <circle cx="110" cy="20" r="1.5" fill={accent} fillOpacity="0.4" />
      <circle cx="120" cy="48" r="1" fill={accent} fillOpacity="0.35" />
    </svg>
  );
}

// ── per-card emblem switcher ─────────────────────────────────────────────────

function Emblem({ mind }: { mind: Mind }) {
  if (mind.key === "leo")  return <LeoEmblem  accent={mind.accent} />;
  if (mind.key === "feyn") return <FeynEmblem accent={mind.accent} />;
  return <MuskEmblem accent={mind.accent} />;
}

// ── stagger delays: deterministic, index-based ────────────────────────────────

const STAGGER_DELAYS = ["0.05s", "0.22s", "0.40s"] as const;

// ── card ─────────────────────────────────────────────────────────────────────

function MindCard({ mind, idx }: { mind: Mind; idx: number }) {
  const accentColor = mind.accent;

  return (
    <article
      className="holo rounded-2xl paper-grain flex flex-col gap-0 overflow-hidden
                 hover:-translate-y-1 transition-transform duration-300 ease-out rise-in"
      style={{ animationDelay: STAGGER_DELAYS[idx] }}
    >
      {/* top accent rule */}
      <div
        className="h-[3px] w-full shrink-0"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}cc, ${accentColor}66, transparent)` }}
      />

      {/* emblem area */}
      <div className="flex justify-center items-center py-8 px-8">
        <div
          className="relative w-32 h-32 shrink-0 shimmer rounded-full overflow-hidden"
          style={{
            background: `radial-gradient(circle, ${accentColor}14 0%, transparent 70%)`,
            border: `1px solid ${accentColor}28`,
          }}
        >
          <Emblem mind={mind} />
        </div>
      </div>

      {/* text content */}
      <div className="flex flex-col gap-3 px-7 pb-8">
        {/* full name */}
        <h3
          className={`display text-2xl md:text-[1.65rem] leading-tight ${mind.accentClass}-text`}
        >
          <T v={mind.full} />
        </h3>

        {/* dates + where */}
        <div className="flex flex-col gap-1">
          <span className="label-mono text-ghost-300/60 tracking-widest text-[0.58rem]">
            {mind.dates}
          </span>
          <span className="mono text-[0.68rem] text-ghost-300/55 leading-snug">
            <T v={mind.where} />
          </span>
        </div>

        {/* divider */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />

        {/* one-line characterization */}
        <p className="display text-[0.95rem] leading-relaxed text-ghost-100/90 italic">
          <T v={mind.oneLine} />
        </p>

        {/* source footnote with left accent bar */}
        <div
          className="pl-3 border-l-2 mt-1"
          style={{ borderColor: `${accentColor}55` }}
        >
          <p className="text-ghost-300/50 text-[0.65rem] font-mono leading-snug italic">
            <T v={mind.source} />
          </p>
        </div>
      </div>
    </article>
  );
}

// ── main component ───────────────────────────────────────────────────────────

const EYEBROW = { en: "The cast · 三种心灵 · across five centuries", zh: "三种心灵 · The cast · 跨越五个世纪" } as const;

export default function MindsPortrait() {
  const { lang } = useLang();

  return (
    <section className="w-full">
      {/* section eyebrow */}
      <p className="label-mono text-gold-300/70 mb-7 text-center tracking-widest select-none">
        {EYEBROW[lang]}
      </p>

      {/* three-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {MINDS.map((mind, idx) => (
          <MindCard key={mind.key} mind={mind} idx={idx} />
        ))}
      </div>
    </section>
  );
}
