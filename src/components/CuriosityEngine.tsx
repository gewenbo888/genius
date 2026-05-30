"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { T, useLang } from "./lang";
import { MINDS, CURIOSITY } from "./content";
import type { MindKey } from "./content";

// ── deterministic helpers ─────────────────────────────────────────────────────

/** Cheap integer hash — deterministic, no Math.random. */
function seededFloat(seed: number): number {
  let h = seed ^ 0xdeadbeef;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 0xffffffff;
}

// ── layout constants ──────────────────────────────────────────────────────────

// SVG viewport: 600 × 480
const VW = 600;
const VH = 480;

// Seed node sits at (80, 60); branches radiate right-and-down
const SEED_X = 80;
const SEED_Y = 60;

// Four branch positions: spread vertically, offset to the right
const BRANCH_POSITIONS: [number, number][] = [
  [340, 60],
  [340, 170],
  [340, 280],
  [340, 390],
];

// Bezier control point horizontal offsets
const CP1_DX = 120;
const CP2_DX = -100;

// ── SVG path helpers ──────────────────────────────────────────────────────────

function makePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const cx1 = x1 + CP1_DX;
  const cy1 = y1;
  const cx2 = x2 + CP2_DX;
  const cy2 = y2;
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}

// ── accent lookup ─────────────────────────────────────────────────────────────

const ACCENT: Record<MindKey, string> = {
  leo: "#c45a35",
  feyn: "#3fb4c4",
  musk: "#6f8fd6",
};

const ACCENT_GLOW: Record<MindKey, string> = {
  leo: "rgba(196,90,53,0.35)",
  feyn: "rgba(63,180,196,0.35)",
  musk: "rgba(111,143,214,0.35)",
};

// ── ambient canvas particles ──────────────────────────────────────────────────

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
};

const PARTICLE_COLORS = ["#c45a35", "#3fb4c4", "#6f8fd6"];
const PARTICLE_COUNT = 28;

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const s0 = seededFloat(i * 7919);
    const s1 = seededFloat(i * 3571 + 1);
    const s2 = seededFloat(i * 2311 + 2);
    const s3 = seededFloat(i * 1423 + 3);
    const s4 = seededFloat(i * 5003 + 4);
    const colorIdx = Math.floor(seededFloat(i * 997 + 5) * 3);
    return {
      x: s0 * w,
      y: s1 * h,
      vx: (s2 - 0.5) * 0.4,
      vy: (s3 - 0.5) * 0.3,
      r: 1 + s4 * 2,
      alpha: 0.08 + seededFloat(i * 631 + 6) * 0.12,
      color: PARTICLE_COLORS[colorIdx],
    };
  });
}

function AmbientCanvas({ active }: { active: MindKey }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth || 600;
    const H = canvas.offsetHeight || 480;
    canvas.width = W;
    canvas.height = H;

    particlesRef.current = initParticles(W, H);

    function tick() {
      const ps = particlesRef.current;
      ctx!.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

// ── animated path (drawn line) ────────────────────────────────────────────────

function AnimatedPath({
  d,
  color,
  visible,
}: {
  d: string;
  color: string;
  visible: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  // We measure the total length once the element is mounted
  const [len, setLen] = useState(400);
  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength();
      if (l > 0) setLen(l);
    }
  }, [d]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray={`${len}`}
      strokeDashoffset={visible ? 0 : len}
      opacity={visible ? 0.8 : 0}
      style={{
        transition: visible
          ? "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease"
          : "none",
      }}
    />
  );
}

// ── branch node ───────────────────────────────────────────────────────────────

function BranchNode({
  text,
  x,
  y,
  color,
  glow,
  visible,
  lang,
  isFinal,
}: {
  text: { en: string; zh: string };
  x: number;
  y: number;
  color: string;
  glow: string;
  visible: boolean;
  lang: "en" | "zh";
  isFinal: boolean;
}) {
  const nodeW = 220;
  const nodeH = isFinal ? 48 : 42;
  const rx = x - nodeW / 2;
  const ry = y - nodeH / 2;

  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.88)",
        transformOrigin: `${x}px ${y}px`,
        transition: visible
          ? "opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s"
          : "none",
      }}
    >
      {/* glow behind */}
      {isFinal && (
        <rect
          x={rx - 3}
          y={ry - 3}
          width={nodeW + 6}
          height={nodeH + 6}
          rx={8}
          fill={glow}
          filter="url(#glow)"
        />
      )}
      <rect
        x={rx}
        y={ry}
        width={nodeW}
        height={nodeH}
        rx={6}
        fill="#13100c"
        stroke={color}
        strokeWidth={isFinal ? 1.5 : 1}
        opacity={isFinal ? 1 : 0.85}
      />
      <foreignObject x={rx + 8} y={ry + 6} width={nodeW - 16} height={nodeH - 10}>
        <div
          // @ts-expect-error xmlns required for foreignObject
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontSize: lang === "zh" ? "11px" : "10.5px",
            lineHeight: 1.35,
            color: isFinal ? color : "#c9b98a",
            fontFamily: lang === "zh" ? "Noto Serif SC, serif" : "Fraunces, serif",
            fontWeight: isFinal ? 600 : 400,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text[lang]}
        </div>
      </foreignObject>
    </g>
  );
}

// ── seed node ─────────────────────────────────────────────────────────────────

function SeedNode({
  text,
  color,
  glow,
  lang,
}: {
  text: { en: string; zh: string };
  color: string;
  glow: string;
  lang: "en" | "zh";
}) {
  const w = 150;
  const h = 60;
  const x = SEED_X - w / 2;
  const y = SEED_Y - h / 2;

  return (
    <g>
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={12} fill={glow} filter="url(#glow)" />
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#1a1208" stroke={color} strokeWidth={2} />
      <foreignObject x={x + 8} y={y + 8} width={w - 16} height={h - 14}>
        <div
          // @ts-expect-error xmlns required for foreignObject
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontSize: lang === "zh" ? "12px" : "11.5px",
            lineHeight: 1.4,
            color: color,
            fontFamily: lang === "zh" ? "Noto Serif SC, serif" : "Fraunces, serif",
            fontWeight: 700,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text[lang]}
        </div>
      </foreignObject>
    </g>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const CAPTION = {
  en: "Each seed question generates more questions. Curiosity is not consumed — it compounds.",
  zh: "每一颗种子问题生出更多问题。好奇心不被消耗——它复利。",
};

const EYEBROW = {
  en: "Curiosity propagates",
  zh: "好奇心的传播",
};

export default function CuriosityEngine() {
  const { lang } = useLang();

  const [activeKey, setActiveKey] = useState<MindKey>("leo");
  const [revealedCount, setRevealedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeMind = MINDS.find((m) => m.key === activeKey)!;
  const activeChain = CURIOSITY.find((c) => c.mind === activeKey)!;
  const color = ACCENT[activeKey];
  const glow = ACCENT_GLOW[activeKey];

  const startReveal = useCallback(() => {
    // clear any pending timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setRevealedCount(0);

    const delays = [300, 700, 1150, 1650];
    delays.forEach((delay, i) => {
      const t = setTimeout(() => {
        setRevealedCount(i + 1);
      }, delay);
      timerRef.current.push(t);
    });
  }, []);

  // Re-run reveal whenever the active mind changes
  useEffect(() => {
    startReveal();
    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [activeKey, startReveal]);

  const branches = activeChain.branches;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gold-700/20 bg-ink-950">
      {/* ambient canvas layer */}
      <div className="absolute inset-0 pointer-events-none">
        <AmbientCanvas active={activeKey} />
      </div>

      {/* fine grid overlay */}
      <div className="absolute inset-0 grid-fine pointer-events-none opacity-30" />

      {/* content */}
      <div className="relative z-10 px-6 pt-6 pb-5">

        {/* eyebrow */}
        <p className="label-mono mb-3 text-ghost-300/60">
          {EYEBROW.en} · {EYEBROW.zh}
        </p>

        {/* mind selector chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {MINDS.map((m) => {
            const acc = ACCENT[m.key];
            const isActive = m.key === activeKey;
            return (
              <button
                key={m.key}
                onClick={() => setActiveKey(m.key)}
                style={{
                  borderColor: isActive ? acc : "rgba(214,162,60,0.18)",
                  color: isActive ? acc : "#9c9176",
                  background: isActive ? `${acc}18` : "transparent",
                  boxShadow: isActive ? `0 0 14px 2px ${acc}28` : "none",
                }}
                className="label-mono rounded-full border px-4 py-1.5 text-xs transition-all duration-300 hover:opacity-90"
              >
                <T v={m.name} />
              </button>
            );
          })}
        </div>

        {/* SVG cascade diagram */}
        <div className="w-full" style={{ minHeight: "480px" }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            height="480"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* connecting paths — drawn before nodes so nodes render on top */}
            {branches.map((_, i) => {
              const [bx, by] = BRANCH_POSITIONS[i];
              const d = makePath(SEED_X + 75, SEED_Y, bx - 110, by);
              return (
                <AnimatedPath
                  key={`${activeKey}-path-${i}`}
                  d={d}
                  color={color}
                  visible={revealedCount > i}
                />
              );
            })}

            {/* seed node */}
            <SeedNode
              text={activeChain.seed}
              color={color}
              glow={glow}
              lang={lang}
            />

            {/* branch nodes */}
            {branches.map((branch, i) => {
              const [bx, by] = BRANCH_POSITIONS[i];
              return (
                <BranchNode
                  key={`${activeKey}-branch-${i}`}
                  text={branch}
                  x={bx}
                  y={by}
                  color={color}
                  glow={glow}
                  visible={revealedCount > i}
                  lang={lang}
                  isFinal={i === branches.length - 1}
                />
              );
            })}

            {/* small diamond connector dots at path ends */}
            {branches.map((_, i) => {
              if (revealedCount <= i) return null;
              const [bx, by] = BRANCH_POSITIONS[i];
              return (
                <circle
                  key={`${activeKey}-dot-${i}`}
                  cx={bx - 110}
                  cy={by}
                  r={3}
                  fill={color}
                  opacity={0.6}
                />
              );
            })}

            {/* dot at seed exit */}
            <circle cx={SEED_X + 75} cy={SEED_Y} r={3} fill={color} opacity={0.5} />
          </svg>
        </div>

        {/* caption */}
        <p className="mt-2 text-xs text-ghost-300/50 max-w-prose leading-relaxed">
          {CAPTION[lang]}
        </p>

        {/* source line */}
        <p className="mt-1 label-mono text-ghost-300/30">
          {activeMind.source[lang]}
        </p>
      </div>
    </div>
  );
}
