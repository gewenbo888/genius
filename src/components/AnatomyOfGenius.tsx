"use client";

import { ReactNode } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import {
  MINDS, SECTIONS, MindKey, Thread, OPEN_QUESTIONS,
} from "./content";
import MindsPortrait from "./MindsPortrait";
import GeniusRadar from "./GeniusRadar";
import GeniusTimeline from "./GeniusTimeline";
import CuriosityEngine from "./CuriosityEngine";
import FirstPrinciplesLab from "./FirstPrinciplesLab";
import NotebookViewer from "./NotebookViewer";
import GeniusAnalyst from "./GeniusAnalyst";
import CultivationLadder from "./CultivationLadder";

const ACCENT: Record<MindKey, string> = {
  leo: "#c45a35", feyn: "#3fb4c4", musk: "#6f8fd6",
};
const MIND_BY_KEY: Record<MindKey, (typeof MINDS)[number]> =
  Object.fromEntries(MINDS.map((m) => [m.key, m])) as Record<MindKey, (typeof MINDS)[number]>;

const VIS: Record<string, ReactNode> = {
  curiosity: <CuriosityEngine />,
  "first-principles": <FirstPrinciplesLab />,
  notebook: <NotebookViewer />,
};

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gold-500/12 bg-ink-950/80 px-5 py-3 backdrop-blur md:px-9">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <path d="M5 25 C 11 19, 13 13, 16 6" fill="none" stroke="#c45a35" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 27 C 16 19, 16 13, 16 6" fill="none" stroke="#d6a23c" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M27 25 C 21 19, 19 13, 16 6" fill="none" stroke="#3fb4c4" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="6" r="3" fill="#f3d692" />
        </svg>
        <div className="leading-tight">
          <div className="display text-base text-ghost-50">The Anatomy of Genius</div>
          <div className="zh text-[0.6rem] text-ghost-300">天才的解剖</div>
        </div>
      </div>
      <nav className="hidden gap-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ghost-300 xl:flex">
        <a href="#cast" className="hover:text-gold-400">Cast</a>
        <a href="#radar" className="hover:text-gold-400">Compare</a>
        <a href="#curiosity" className="hover:text-gold-400">Curiosity</a>
        <a href="#first-principles" className="hover:text-gold-400">First Principles</a>
        <a href="#notebook" className="hover:text-gold-400">Notebook</a>
        <a href="#cost" className="hover:text-gold-400">The Cost</a>
        <a href="#climb" className="hover:text-gold-400">The Climb</a>
      </nav>
      <div className="flex items-center gap-3">
        <LangToggle />
        <a href="https://psyverse.fun" className="hidden font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold-400 hover:text-gold-300 sm:block">← Psyverse</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-fine pointer-events-none absolute inset-0 z-0 opacity-40" />
      <div className="paper-grain pointer-events-none absolute inset-0 z-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[8%] top-[24%] h-64 w-64 rounded-full bg-leo-600/10 blur-3xl drift" />
        <div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full bg-feyn-600/10 blur-3xl drift" style={{ animationDelay: "1.4s" }} />
        <div className="absolute bottom-[10%] left-[42%] h-72 w-72 rounded-full bg-musk-600/10 blur-3xl drift" style={{ animationDelay: "2.8s" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="label-mono">Psyverse · An analytical companion to three biographies</div>
        <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ghost-300">
          EN · 中文 · curiosity · first principles · the notebook · visual thinking · synthesis · play · obsession · the cost
        </div>
        <h1 className="display mt-6 text-6xl leading-[0.95] text-ghost-50 md:text-8xl">
          The Anatomy of <span className="gold-text">Genius</span>
        </h1>
        <h2 className="zh mt-3 text-3xl text-ghost-200 md:text-5xl">天才的解剖</h2>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[0.72rem] tracking-[0.12em]">
          <span style={{ color: ACCENT.leo }}>Leonardo da Vinci · 1452</span>
          <span className="text-ghost-500">———</span>
          <span style={{ color: ACCENT.feyn }}>Richard Feynman · 1918</span>
          <span className="text-ghost-500">———</span>
          <span style={{ color: ACCENT.musk }}>Elon Musk · 1971</span>
        </div>

        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ghost-100 md:text-xl">
          <T v={{
            en: "Three minds, five centuries, one machinery. Read side by side, a Renaissance painter, a quantum physicist, and a modern industrialist run on the same handful of habits — insatiable curiosity, reasoning from first principles, thinking on paper, seeing before saying, crossing every field, playing in earnest, vanishing into the problem — and paying a cost the books refuse to hide. This is an analytical companion, drawn from the biographies, never reproducing them.",
            zh: "三种心灵，五个世纪，一套机器。并置而读，一位文艺复兴画家、一位量子物理学家、一位现代实业家，靠着同样寥寥几个习惯运转——无尽的好奇、从第一性原理推理、在纸上思考、先看见再说出、跨越每一个领域、认真地玩耍、消失进问题——并付出一份这些书拒绝隐藏的代价。这是一份分析性的伴读，取材于传记，绝不复制它们。",
          }} />
        </p>

        <div className="mt-10 max-w-2xl holo rounded-lg p-6">
          <div className="label-mono">The question under the whole site · 全站之下的发问</div>
          <p className="mt-3 text-xl leading-relaxed text-ghost-50 md:text-2xl">
            <T v={{
              en: "Is genius a kind of person — or a kind of relationship between a mind and a problem?",
              zh: "天才，是一种人——还是一种『心灵与问题之间的关系』？",
            }} />
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ghost-300">
          <span>8 traits · 八项特质</span>
          <span>analytical · not derivative · bilingual</span>
          <span>Nicholl · Feynman · Vance</span>
        </div>
      </div>
    </section>
  );
}

function ThreadRow({ t }: { t: Thread }) {
  const m = MIND_BY_KEY[t.mind];
  const c = ACCENT[t.mind];
  return (
    <div className="rounded-lg border-l-2 bg-ink-900/40 p-4" style={{ borderColor: c }}>
      <div className="flex items-baseline gap-2">
        <span className="display text-sm" style={{ color: c }}><T v={m.name} /></span>
        <span className="font-mono text-[0.55rem] tracking-[0.15em] text-ghost-500">{m.dates}</span>
      </div>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ghost-200"><T v={t.text} /></p>
    </div>
  );
}

function SectionBlock({ s, vis }: { s: (typeof SECTIONS)[number]; vis?: ReactNode }) {
  return (
    <section id={s.id} className="relative border-t border-gold-500/8 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4">
          <span className="display text-5xl text-gold-500/25">{s.num}</span>
          <div>
            <h2 className="display text-4xl text-ghost-50 md:text-5xl"><T v={s.title} /></h2>
            <h3 className="mt-1 text-lg text-gold-400"><T v={s.sub} /></h3>
          </div>
        </div>
        <div className="mt-5 h-px rule-signal opacity-50" />
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ghost-200"><T v={s.body} /></p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {s.threads.map((t) => <ThreadRow key={t.mind} t={t} />)}
        </div>

        {s.sources && (
          <div className="mt-6 inline-block rounded-md border border-gold-500/30 bg-ink-900/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gold-400">
            Source · 出处 · <T v={s.sources} />
          </div>
        )}
        {vis && <div className="mt-12">{vis}</div>}
      </div>
    </section>
  );
}

function FeatureSection({ id, eyebrow, title, intro, children }: {
  id: string; eyebrow: Bi; title: Bi; intro: Bi; children: ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-gold-500/8 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="label-mono"><T v={eyebrow} /></div>
        <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl"><T v={title} /></h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200"><T v={intro} /></p>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

type Bi = { en: string; zh: string };

function OpenQuestions() {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {OPEN_QUESTIONS.map((q, i) => (
        <div key={i} className="holo flex gap-4 rounded-xl p-5">
          <span className="mono shrink-0 text-2xl text-gold-400/60">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className={`text-base leading-snug text-ghost-50 ${lang === "zh" ? "zh" : "display"}`}><T v={q.q} /></div>
            <p className="mt-2 font-mono text-[0.68rem] leading-relaxed text-gold-400/80">{q.lens.en}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Body() {
  const { lang } = useLang();
  return (
    <main className="relative bg-ink-950 text-ghost-100">
      <Header />
      <Hero />

      <div className="grid-bg border-y border-gold-500/12 bg-ink-900/60 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold-400/70 ticker inline-block">
          {(lang === "zh"
            ? "好奇心 · 第一性原理 · 笔记本 · 视觉思维 · 跨域综合 · 游戏 · 痴迷 · 代价 · 啄木鸟的舌头 · 晃动的盘子 · 火箭的成本 · 镜像书写 · 费曼图 · 第一性原理 · 蒙娜丽莎 · 洛斯阿拉莫斯 · 火星 · "
            : "CURIOSITY · FIRST PRINCIPLES · THE NOTEBOOK · VISUAL THINKING · SYNTHESIS · PLAY · OBSESSION · THE COST · THE WOODPECKER'S TONGUE · THE WOBBLING PLATE · THE COST OF A ROCKET · MIRROR WRITING · FEYNMAN DIAGRAMS · THE MONA LISA · LOS ALAMOS · MARS · ").repeat(2)}
        </div>
      </div>

      {/* meet the three minds */}
      <section id="cast" className="relative border-t border-gold-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">The cast · 三种心灵</div>
          <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl">
            <T v={{ en: "Three minds across five centuries", zh: "横跨五个世纪的三种心灵" }} />
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-200">
            <T v={{
              en: "A painter who tried to read the whole book of nature; a physicist who refused to take any authority's word for anything; an engineer who decided one planet was not enough. Different costumes, one engine. Read their biographies back to back and the same habits keep surfacing.",
              zh: "一位试图读完整本自然之书的画家；一位拒绝把任何权威之言当真的物理学家；一位认定一颗行星不够的工程师。不同的戏服，同一台引擎。把他们的传记接连读来，同样的习惯不断浮现。",
            }} />
          </p>
          <div className="mt-12"><MindsPortrait /></div>
        </div>
      </section>

      {/* flagship radar */}
      <FeatureSection
        id="radar"
        eyebrow={{ en: "Eight traits · 八项特质 · one chart", zh: "八项特质 · 一张图" }}
        title={{ en: "The same machinery, three shapes", zh: "同一套机器，三种形状" }}
        intro={{
          en: "Score all three across the eight traits this site argues for — curiosity, first principles, the notebook, visual thinking, cross-domain synthesis, play, obsession, and sheer output — and a different polygon emerges for each. The scores are interpretive, argued in the text below, not measured; the point is the shared shape, not the ranking. Toggle a mind to bring its polygon forward.",
          zh: "把三人都放在本站所主张的八项特质上打分——好奇、第一性原理、笔记本、视觉思维、跨域综合、游戏、痴迷、以及纯粹的产出量——每人便描出一个不同的多边形。这些分数是阐释性的，在下文中论证，而非测量；重点是那共有的形状，而非排名。点选一位，让其多边形前移。",
        }}
      >
        <GeniusRadar />
      </FeatureSection>

      {/* timeline */}
      <FeatureSection
        id="timeline"
        eyebrow={{ en: "Five centuries · 五个世纪 · one machinery", zh: "五个世纪 · 一套机器" }}
        title={{ en: "Four hundred years of silence, then the same mind again", zh: "四百年的沉默，然后是同一种心灵的重现" }}
        intro={{
          en: "Lay the three lives on a single axis and the span becomes visceral: nearly four centuries separate Leonardo's death from Feynman's birth, yet the habits recur as if copied. The era changes what the output becomes — Leonardo's dies unpublished, Feynman's becomes standard notation, Musk's becomes capital and hardware — but the underlying machinery is eerily constant.",
          zh: "把三段人生放在同一根轴上，那跨度便变得可触：列奥纳多之死与费曼之生，相隔近四个世纪，而那些习惯却如同被誊抄般重现。时代改变了产出之归宿——列奥纳多的未发表便死去，费曼的成为标准记法，马斯克的化为资本与硬件——但其底层的机器，恒常得令人发悚。",
        }}
      >
        <GeniusTimeline />
      </FeatureSection>

      {/* the eight traits */}
      {SECTIONS.map((s) => (
        <SectionBlock key={s.id} s={s} vis={VIS[s.id]} />
      ))}

      {/* the analyst panel */}
      <FeatureSection
        id="analyst"
        eyebrow={{ en: "Five lenses · 五个视角", zh: "五个视角" }}
        title={{ en: "Ask the panel", zh: "向专家组发问" }}
        intro={{
          en: "Four questions the biographies open but do not close — born or made, is the cost necessary, are these three even comparable, can any of it be cultivated — read in turn by a biographer, a neuroscientist, a historian, a skeptic, and an educator. Where the lenses agree is solid ground; where they diverge is exactly where the books leave the verdict to you.",
          zh: "传记打开却未关闭的四个问题——天生还是造就、代价是否必需、这三人是否可比、其中是否有什么可被培养——由一位传记作家、一位神经科学家、一位历史学家、一位怀疑者、与一位教育者依次阅读。透镜一致之处，是坚实的地面；它们分歧之处，正是这些书把判决留给你之处。",
        }}
      >
        <GeniusAnalyst />
      </FeatureSection>

      {/* the climb */}
      <FeatureSection
        id="climb"
        eyebrow={{ en: "The climb · 可攀爬的天才 · eight rungs", zh: "可攀爬的天才 · 八级阶梯" }}
        title={{ en: "What a reader can actually steal", zh: "读者究竟能偷走什么" }}
        intro={{
          en: "The endowment is not transferable, but most of the habits are. Here are the eight traits as a ladder — each a concrete practice you can adopt this week. You can climb every rung and still never paint a Mona Lisa, and that is fine: the aim is not to manufacture geniuses but to think a little more like one. The ladder ends not in triumph but in honesty.",
          zh: "禀赋无法转移，但多数习惯可以。这里把八项特质化作一座阶梯——每一级都是你本周就能采纳的、具体的练习。你可以攀上每一级，却仍然永远画不出一幅《蒙娜丽莎》，而这没关系：目标不是制造天才，而是稍微更像天才那样思考一点。这座阶梯，终于诚实、而非凯旋。",
        }}
      >
        <CultivationLadder />
      </FeatureSection>

      {/* open questions */}
      <section className="relative border-t border-gold-500/8 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="label-mono">The questions that remain · 余下的问题</div>
          <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl">
            <T v={{ en: "Six questions the site leaves open", zh: "本站留作开放的六个问题" }} />
          </h2>
          <div className="mt-12"><OpenQuestions /></div>
        </div>
      </section>

      {/* closing */}
      <section className="relative border-t border-gold-500/8 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-4xl leading-snug text-ghost-50 md:text-6xl">
            <T v={{ en: "Genius is less a kind of person than a way of standing in front of a problem.", zh: "天才，与其说是一种人，不如说是一种站在问题面前的方式。" }} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ghost-300">
            <T v={{
              en: "Read three biographies closely and what survives is not a set of miracles but a set of moves — most of them learnable, none of them magic. Curiosity that needs no payoff. Reasoning from the thing itself. Thinking on paper, seeing before saying, crossing every fence, playing in earnest, vanishing into the problem. And, inseparable from all of it, a cost the honest reader does not look away from. Keep the engine; refuse the cruelty. That is the whole anatomy.",
              zh: "细读三本传记，所幸存之物不是一组奇迹，而是一组动作——其中多数可学，无一为魔法。不求回报的好奇。从事物本身推理。在纸上思考、先看见再说出、跨过每一道栅栏、认真地玩耍、消失进问题。以及，与这一切不可分割的，一份诚实的读者不会移开目光的代价。保留引擎；拒绝残忍。这，便是全部的解剖。",
            }} />
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-gold-500/25 bg-ink-900/60 p-5">
            <p className="text-xs leading-relaxed text-ghost-300">
              <T v={{
                en: "An analytical companion drawn from Charles Nicholl's Leonardo da Vinci: The Flights of the Mind (2004), Richard Feynman's memoirs (the 走近费曼 series), and Ashlee Vance's Elon Musk (2015). All commentary on this site is original analysis and interpretation. No portion of any source text is reproduced; iconic lines are paraphrased and attributed, not transcribed.",
                zh: "一份分析性伴读，取材于查尔斯·尼科尔《达·芬奇传：自由的心灵》(2004)、理查德·费曼的回忆录（走近费曼丛书）、与阿什利·万斯《硅谷钢铁侠》(2015)。本站所有评论均为原创分析与诠释。本站不复制任何原著文字；著名语句皆为转述与归属，而非转录。",
              }} />
            </p>
          </div>
          <div className="mx-auto mt-12 h-px w-40 rule-signal" />
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-gold-400/70">
            The Anatomy of Genius · 天才的解剖 · Psyverse · 2026
          </p>
        </div>
      </section>

      <footer className="border-t border-gold-500/12 bg-ink-950 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="display text-xl text-ghost-50">The Anatomy of Genius</div>
            <div className="zh mt-1 text-sm text-ghost-300">天才的解剖</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ghost-300">
              <T v={{ en: "Three minds · eight traits · a flagship radar · a five-century timeline · five analytic lenses · an eight-rung ladder. Original commentary, drawn from the biographies, never reproducing them.", zh: "三种心灵 · 八项特质 · 旗舰雷达 · 五世纪时间轴 · 五个分析视角 · 八级阶梯。原创评论，取材于传记，绝不复制它们。" }} />
            </p>
          </div>
          <div>
            <div className="label-mono">Traits · 特质</div>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ghost-300">
              {SECTIONS.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-gold-400">{s.num} · <T v={s.title} /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-mono">Companion archives</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ghost-300">
              <li><a href="https://musk-codex.psyverse.fun" className="hover:text-gold-300">Musk Codex · 马斯克解码</a></li>
              <li><a href="https://book-of-elon.psyverse.fun" className="hover:text-gold-300">The Book of Elon · 埃隆之书</a></li>
              <li><a href="https://idea-of-the-brain.psyverse.fun" className="hover:text-gold-300">The Idea of the Brain · 大脑传</a></li>
              <li><a href="https://nexus-book.psyverse.fun" className="hover:text-gold-300">Nexus · 智人之上</a></li>
              <li className="pt-3"><a href="https://psyverse.fun" className="text-gold-400 hover:text-gold-300">↩ All Psyverse archives</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-7xl rule-signal" />
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-[0.58rem] uppercase tracking-[0.3em] text-ghost-300">
          <div>© 2026 Gewenbo · Psyverse · Analytical commentary on Nicholl, Feynman & Vance</div>
          <div>EN · 中文 · educational</div>
        </div>
      </footer>
    </main>
  );
}

export default function AnatomyOfGenius() {
  return (
    <LangProvider>
      <Body />
    </LangProvider>
  );
}
