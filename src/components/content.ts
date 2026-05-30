import { Bi } from "./lang";

/* ============================================================
   THE ANATOMY OF GENIUS · 天才的解剖
   An analytical companion reading three minds across five centuries —
   Leonardo da Vinci, Richard Feynman, Elon Musk — for the shared
   mental machinery of genius.

   Sources, attributed throughout, never reproduced:
   · Charles Nicholl, Leonardo da Vinci: The Flights of the Mind (Allen Lane, 2004)
   · Richard P. Feynman, Surely You're Joking, Mr. Feynman! (1985) and
     What Do You Care What Other People Think? (1988) — the 走近费曼丛书 memoirs
   · Ashlee Vance, Elon Musk: Tesla, SpaceX, and the Quest for a
     Fantastic Future (Ecco, 2015)

   Every passage below is original analysis and interpretation. No portion
   of any source text is reproduced; iconic lines are paraphrased and
   attributed, not transcribed. The Vance biography predates Musk's
   acquisition of Twitter; claims here stay inside what that book documents.

   依据上述三本传记的原创分析性评论。全文引注出处，绝不复制原著文字；
   著名语句皆为转述与归属，而非转录。万斯的传记成书于 2015 年，早于马斯克
   收购推特；本站关于马斯克的论断，止于该书所记录的范围。
   ============================================================ */

export type MindKey = "leo" | "feyn" | "musk";

export type Mind = {
  key: MindKey;
  name: Bi;
  full: Bi;
  dates: string;
  where: Bi;
  source: Bi;
  accent: string;        // hex
  accentClass: string;   // tailwind family name: leo | feyn | musk
  oneLine: Bi;
};

export const MINDS: Mind[] = [
  {
    key: "leo",
    name: { en: "Leonardo", zh: "列奥纳多" },
    full: { en: "Leonardo da Vinci", zh: "列奥纳多·达·芬奇" },
    dates: "1452 – 1519",
    where: { en: "Vinci · Florence · Milan · Amboise", zh: "芬奇镇 · 佛罗伦萨 · 米兰 · 昂布瓦兹" },
    source: { en: "Charles Nicholl, The Flights of the Mind (2004)", zh: "查尔斯·尼科尔《自由的心灵》(2004)" },
    accent: "#c45a35",
    accentClass: "leo",
    oneLine: { en: "The illegitimate notary's son who tried to read the whole book of nature with a pen.", zh: "那个私生子，公证人之子，试图用一支笔读完整本自然之书。" },
  },
  {
    key: "feyn",
    name: { en: "Feynman", zh: "费曼" },
    full: { en: "Richard P. Feynman", zh: "理查德·费曼" },
    dates: "1918 – 1988",
    where: { en: "Far Rockaway · MIT · Los Alamos · Caltech", zh: "法洛克威 · 麻省理工 · 洛斯阿拉莫斯 · 加州理工" },
    source: { en: "Feynman's own memoirs · the 走近费曼 series", zh: "费曼本人回忆录 · 走近费曼丛书" },
    accent: "#3fb4c4",
    accentClass: "feyn",
    oneLine: { en: "The Queens-accented Nobel physicist who refused to take any authority's word for anything.", zh: "那个带皇后区口音的诺贝尔物理学家，拒绝把任何权威的话当真。" },
  },
  {
    key: "musk",
    name: { en: "Musk", zh: "马斯克" },
    full: { en: "Elon Musk", zh: "埃隆·马斯克" },
    dates: "1971 –",
    where: { en: "Pretoria · Queen's · Penn · Silicon Valley", zh: "比勒陀利亚 · 女王大学 · 宾大 · 硅谷" },
    source: { en: "Ashlee Vance, Elon Musk (2015)", zh: "阿什利·万斯《硅谷钢铁侠》(2015)" },
    accent: "#6f8fd6",
    accentClass: "musk",
    oneLine: { en: "The Pretoria boy who read the encyclopedia for fun and decided one planet was not enough.", zh: "那个为消遣读完百科全书的比勒陀利亚男孩，认定一颗行星不够。" },
  },
];

/* ---- the eight traits, each read across all three minds ---- */

export type Thread = { mind: MindKey; text: Bi };
export type Section = {
  num: string; id: string; title: Bi; sub: Bi; body: Bi;
  threads: Thread[]; sources?: Bi;
};

export const SECTIONS: Section[] = [
  {
    num: "01", id: "curiosity",
    title: { en: "The Curiosity Engine", zh: "好奇心引擎" },
    sub: { en: "Curiosity without a customer · the question that needs no use", zh: "没有客户的好奇 · 不为用途的发问" },
    body: {
      en: "The first thing all three biographies record is a curiosity that does not wait for permission and does not require a payoff. Most people are curious about what concerns them; the genius described in these books is curious about everything, including — especially — things with no obvious use. Nicholl shows Leonardo filling page after page with questions no patron commissioned: why the sky is blue, how a bird's wing carries it, why a woodpecker's tongue is shaped as it is. Feynman's memoirs return again and again to the pure pleasure of finding things out, a phrase he made the title of his own credo; his father had trained him to notice that knowing the name of a thing is not the same as knowing the thing. Vance's Musk is the boy who read the Encyclopædia Britannica because he had run out of other books. The engine is the same in each: an appetite for mechanism — how does this actually work? — that is indistinguishable from hunger, runs whether or not anyone is paying, and never reaches a state of satisfaction. It is the precondition for everything that follows, and the one trait none of the books can fully explain the origin of.",
      zh: "三本传记记录的第一件事，都是一种不等许可、也不要求回报的好奇心。多数人对与自己相关之事好奇；这些书所描述的天才，对一切好奇——尤其是对那些没有明显用途之物。尼科尔笔下的列奥纳多，一页又一页地填满无人委托的问题：天空为何是蓝的，鸟翼如何托起它，啄木鸟的舌头为何是那个形状。费曼的回忆录一再回到『找出事物真相的纯粹乐趣』——他把这句话做成自己信条的标题；他的父亲训练他注意：知道一个东西的名字，与知道那个东西，并非一回事。万斯笔下的马斯克，是那个因为别的书读完了、便去读《大英百科全书》的男孩。每个人身上的引擎都一样：一种对『机理』的食欲——这东西究竟如何运作？——它与饥饿无从分辨，无论是否有人付钱都在运转，且永不抵达满足之态。它是其后一切的前提，也是这些书都无法完全解释其来源的那一项特质。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl reproduces Leonardo's to-do lists, which read like a manifesto of undirected wonder: measure why a fish is faster than a bird, ask the master of arithmetic how to square a triangle, describe the tongue of the woodpecker. He is buying knowledge with attention, not money.", zh: "尼科尔再现了列奥纳多的待办清单，读来像一份『无定向之惊奇』的宣言：量一量鱼为何比鸟快，向算术大师请教如何把三角形化为正方形，描述啄木鸟的舌头。他在用注意力、而非金钱，购买知识。" } },
      { mind: "feyn", text: { en: "Feynman's wobbling-plate story is curiosity in its purest, most useless form: he watched a thrown cafeteria plate wobble, worked out the ratio of wobble to spin for no reason at all, and the play led him back to the electron orbits that won the Nobel Prize. He insisted the diagrams came out of piddling around.", zh: "费曼的『晃动盘子』故事，是好奇心最纯粹、最无用的形态：他看着食堂里被抛起的盘子晃动，毫无理由地算出晃动与自转的比率，而这场玩闹把他带回了那条赢得诺贝尔奖的电子轨道。他坚称那些图，来自『瞎鼓捣』。" } },
      { mind: "musk", text: { en: "Vance describes a child who read for ten hours at a stretch and emptied two libraries, retaining what he read with a clarity that unsettled adults. The curiosity later narrows to a thesis — make humanity multiplanetary — but it begins as the same omnivorous, useless reading.", zh: "万斯描述了一个一口气读十小时、读空两座图书馆的孩子，他记住所读之物的那种清晰，令成年人不安。这份好奇后来收窄为一项论题——让人类成为多行星物种——但它起初，是同样杂食而无用的阅读。" } },
    ],
    sources: { en: "Nicholl pt. I–II (the notebooks, the lists) · Feynman, Surely You're Joking (the plate) · Vance ch. 2 (the reading boy)", zh: "尼科尔第一、二部（笔记与清单）· 费曼《别闹了，费曼先生》（盘子）· 万斯第 2 章（读书的男孩）" },
  },
  {
    num: "02", id: "first-principles",
    title: { en: "First Principles", zh: "第一性原理" },
    sub: { en: "Reason from the thing itself, not from what is said about it", zh: "从事物本身、而非从他人之说，开始推理" },
    body: {
      en: "The second trait is a refusal to accept inherited authority as evidence. Each of these minds insists on going back to the thing itself — the body, the equation, the cost of the raw material — and reasoning up from there, even when the conclusion contradicts every expert in the room. This is the move modern readers call 'first-principles thinking,' and Vance's Musk is its most explicit modern practitioner: told that rockets simply cost what they cost, he decomposed a rocket into its constituent aluminium, titanium, copper, and carbon fibre, priced the materials on the open market, and found them to be a small fraction of the quoted price — which became the founding insight of SpaceX. But the same discipline is centuries older. Leonardo distrusted the textbook anatomy inherited from Galen and went to the corpse instead; Feynman distrusted memorized physics and re-derived results from scratch, trusting nothing he had not personally rebuilt. The posture is not contrarianism for its own sake — it is the conviction that authority is a compression of someone else's reasoning, and that the compression often hides an error a fresh derivation would catch.",
      zh: "第二项特质，是拒绝把『继承来的权威』当作证据。这些心灵都坚持回到事物本身——身体、方程、原材料的成本——并从那里向上推理，纵使结论与房间里每一位专家相左。这正是现代读者所称的『第一性原理思维』，而万斯笔下的马斯克，是它最明晰的现代实践者：当被告知火箭就是那么贵时，他把一枚火箭分解为其组成的铝、钛、铜与碳纤维，按公开市场为材料定价，发现它们只是报价的一小部分——这成了 SpaceX 的奠基洞见。但同一门功夫古老得多。列奥纳多不信从盖伦继承来的教科书解剖学，转而去看尸体；费曼不信背下来的物理，从零重新推导，凡未亲手重建之物一概不信。这种姿态并非为反对而反对——它是一种信念：权威是别人推理的一次压缩，而那压缩往往藏着一处错误，一次新鲜的推导便能逮住。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl emphasizes that Leonardo signed himself 'omo sanza lettere' — a man without book-learning — and turned the insult into a method. Lacking Latin and the inherited canon, he had no authority to defer to, so he dissected, measured, and drew the evidence himself. The famous heart studies got the function of the aortic valve right by observation centuries before it could be confirmed.", zh: "尼科尔强调，列奥纳多自署为『omo sanza lettere』——一个没有书本学问的人——并把这句羞辱变成了方法。缺少拉丁文与继承的经典，他没有可服从的权威，于是亲自解剖、测量、画下证据。那著名的心脏研究，凭观察正确判断了主动脉瓣的功能——比它能被证实早了几个世纪。" } },
      { mind: "feyn", text: { en: "Feynman's rule was that he would not consider himself to understand a result until he could derive it himself, and he was famously suspicious of anything 'everybody knows.' The same instinct produced the Challenger O-ring demonstration: he ignored the committee's prose and dropped a piece of the rubber into ice water in front of the cameras.", zh: "费曼的规矩是：在能自己推导出一个结果之前，他不认为自己理解了它；而对任何『众所周知』之事，他都出了名地怀疑。同一种本能产生了挑战者号的 O 形环演示：他无视委员会的辞藻，当着镜头把一块橡胶丢进冰水。" } },
      { mind: "musk", text: { en: "Vance gives the rocket-cost decomposition in detail: the trip to Russia, the spreadsheet on the flight home, the conclusion that the materials in a rocket are roughly two percent of its price. Musk frames it as physics — boil the problem down to its fundamentals and reason up — and treats industry pricing as a convention, not a law.", zh: "万斯详细给出了火箭成本的分解：那趟俄国之行、归程飞机上的电子表格、以及那个结论——一枚火箭的材料约占其价格的百分之二。马斯克把它表述为物理学——把问题煮到最基本、再向上推理——并把行业定价当作惯例，而非定律。" } },
    ],
    sources: { en: "Nicholl pt. IV (anatomy, the heart) · Feynman, What Do You Care (Challenger) · Vance ch. 5 & 9 (the rocket spreadsheet, the physics frame)", zh: "尼科尔第四部（解剖、心脏）· 费曼《你干吗在乎别人怎么想》（挑战者号）· 万斯第 5、9 章（火箭表格、物理学框架）" },
  },
  {
    num: "03", id: "notebook",
    title: { en: "The Notebook", zh: "笔记本" },
    sub: { en: "Thinking on paper · the externalized mind", zh: "在纸上思考 · 被外化的心灵" },
    body: {
      en: "Genius in these books is rarely a flash; it is an accumulation, and the instrument of accumulation is the notebook. Leonardo left somewhere on the order of seven thousand pages, written right-to-left in mirror script, in which the boundary between drawing and reasoning simply dissolves — he draws in order to think, and a single page may carry a flying machine, a study of water turbulence, a shopping list, and a note to learn the multiplication of roots from a particular man. Feynman drew an even sharper line: when a historian once referred to his notebooks as a record of his thinking, he corrected him — they were not a record of the work, he said, they were the work; the thinking happened on the paper, not in the head and then onto the paper. This is the most teachable trait of the three, and the most quietly radical: it treats cognition as something done with the hands, in a medium outside the skull, where it can be revised, compared, and compounded over decades. Where Musk fits is instructive precisely because he fits awkwardly — Vance's Musk externalizes not onto vellum but into spreadsheets, simulations, and the companies themselves, which function as his working notebooks at industrial scale.",
      zh: "在这些书里，天才很少是灵光一闪；它是一种积累，而积累的器具是笔记本。列奥纳多留下了约七千页，以右向左的镜像字书写，其中绘画与推理的界线干脆消融——他为了思考而画，单单一页上可能同时载着一台飞行器、一项水流湍动的研究、一张购物清单，以及一条『去向某人学习根的乘法』的备忘。费曼划下了更锋利的一道线：当一位历史学家把他的笔记称作他思维的记录时，他纠正道——那不是工作的记录，他说，那就是工作本身；思考发生在纸上，而非先在脑中、再落到纸上。这是三者中最可教的一项特质，也是最为静默地激进的一项：它把认知当作用手完成之事，在颅骨之外的介质中进行，于那里它能被修订、比对，并跨数十年复利累积。马斯克之归属位置，恰因其『勉强契合』而富启发——万斯笔下的马斯克，不外化于犊皮纸，而外化于电子表格、模拟、以及公司本身，后者以工业尺度充当他的工作笔记。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl treats the notebooks as the real masterpiece — more complete than the handful of finished paintings. Because Leonardo never published them, the knowledge they held largely died with him and had to be rediscovered independently; the genius was real but, on this trait, civilizationally wasted.", zh: "尼科尔把笔记本视作真正的杰作——比那寥寥几幅完成的画作更完整。因为列奥纳多从未发表它们，其中所藏的知识大体随他而亡，须由后人独立重新发现；这份天才是真实的，但就这一项特质而言，于文明是被浪费了。" } },
      { mind: "feyn", text: { en: "Feynman's insistence that the notebook IS the thinking — not its transcript — is the cleanest statement of externalized cognition any of the three ever gave. It reframes a notebook from storage to workshop, and it is the single most portable habit a reader can steal from this site.", zh: "费曼坚持『笔记本就是思考本身』——而非其誊录——这是三人中对『外化认知』给出的最清晰陈述。它把笔记本从仓库重构为工坊，也是读者能从本站偷走的、最可移植的一个习惯。" } },
      { mind: "musk", text: { en: "Musk is the partial fit, and the gap is revealing: he externalizes into running systems rather than pages. Vance's portrait is of a man who treats each company as an instrument for thinking a problem through in the world — which compounds far faster than paper, and fails far more expensively.", zh: "马斯克是那个不完全的契合，而这道缝隙颇具揭示性：他外化于运行中的系统、而非纸页。万斯的画像，是一个把每家公司当作『在世界中把一个问题想透』之器具的人——它比纸复利得快得多，也失败得昂贵得多。" } },
    ],
    sources: { en: "Nicholl pt. III (the notebooks, mirror writing) · Feynman / Weiner interview (the notebook IS the work) · Vance ch. 13–14", zh: "尼科尔第三部（笔记本、镜像书写）· 费曼与韦纳访谈（笔记本就是工作）· 万斯第 13–14 章" },
  },
  {
    num: "04", id: "visual",
    title: { en: "Visual Thinking", zh: "视觉思维" },
    sub: { en: "Seeing the answer before saying it · the diagram as proof", zh: "在说出之前先看见答案 · 图即证明" },
    body: {
      en: "A recurring claim across the three accounts is that these minds thought in images first and words second — that the picture was not an illustration of the idea but the form in which the idea actually arrived. Leonardo is the obvious case: for him sight was the supreme sense (he called it the window of the soul), and he reasoned about turbulence, anatomy, and machinery by drawing, building a visual vocabulary so exact that modern engineers can read his sketches as specifications. Feynman's contribution to physics is literally a way of drawing: the Feynman diagram replaced pages of intractable algebra with a picture of particles meeting and parting, and it worked because he could see the physics as a spatial event before he could compute it. Vance's Musk reports running mental simulations — rotating and stress-testing a design in his head, claiming to see the object before it is built. Whether or not the introspective reports are exact, the pattern is consistent: the breakthrough is often a perception, an act of seeing, that the equations or the engineering are then sent to catch up with.",
      zh: "三部传记中反复出现的一个论断是：这些心灵先以图像、后以文字思考——那幅画并非观念的图解，而是观念真正抵达时的形态。列奥纳多是显见的例子：对他而言视觉是至高之感（他称之为灵魂之窗），他通过绘画来推理湍流、解剖与机械，建立起一套精确到现代工程师能把他的草图读作规格的视觉词汇。费曼对物理学的贡献，字面意义上就是一种作画之法：费曼图以一幅『粒子相遇与分离』的图画，取代了数页难以驾驭的代数，而它之所以奏效，是因为他能在计算之前，把物理学看作一桩空间事件。万斯笔下的马斯克自述会在脑中跑模拟——在头脑里旋转一个设计并对其施加应力测试，声称在造出之前便已看见那个物件。无论这些内省报告是否精确，模式是一致的：突破往往是一次知觉、一桩『看见』之举，而方程或工程，随后才被派去追赶它。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl shows a Leonardo for whom drawing and knowing are the same act — the water studies, the deluge drawings, the anatomical cross-sections all reason visually about things words could not yet hold. He is the patron saint of thinking by seeing.", zh: "尼科尔呈现的列奥纳多，绘画与认知是同一桩举动——水的研究、洪流的画、解剖的剖面，都以视觉推理那些文字尚无法承载之物。他是『以看见来思考』的主保圣人。" } },
      { mind: "feyn", text: { en: "The Feynman diagram is visual thinking turned into a permanent tool the whole field now uses. He could see a scattering event as a little drawing and read the mathematics off the picture — an externalization of intuition so successful it stopped looking like one person's quirk and became standard notation.", zh: "费曼图是把视觉思维变成了整个领域如今都在用的永久工具。他能把一次散射事件看作一幅小画，并从图上读出数学——一次成功到不再像某一个人的怪癖、而成为标准记法的『直觉外化』。" } },
      { mind: "musk", text: { en: "Vance records Musk's claim of a near-cinematic mental workspace — rotating engines and rockets in his head, simulating before fabricating. Treat the introspection cautiously, but the design-by-visualization pattern matches the other two precisely.", zh: "万斯记下了马斯克关于一个近乎电影般的心智工作空间的自述——在脑中旋转引擎与火箭，在制造前先模拟。对这内省持审慎态度，但这种『以可视化来设计』的模式，与另外两人精确吻合。" } },
    ],
    sources: { en: "Nicholl pt. III–IV (water, deluge, anatomy drawings) · Feynman / the diagrams · Vance ch. 1 & 12 (mental simulation)", zh: "尼科尔第三、四部（水、洪流、解剖图）· 费曼与费曼图 · 万斯第 1、12 章（心智模拟）" },
  },
  {
    num: "05", id: "synthesis",
    title: { en: "Synthesis Across Domains", zh: "跨域综合" },
    sub: { en: "Refusing to specialize · the field is the whole world", zh: "拒绝专精 · 整个世界就是领域" },
    body: {
      en: "Each of these figures refused the central bargain of expertise — that you go deep by going narrow. Instead they treated the boundaries between disciplines as administrative fictions, and their best work tends to happen exactly where two fields are made to touch. Leonardo is the archetype: painter, anatomist, hydraulic engineer, military designer, botanist, geologist, all at once, with the water studies feeding the drapery and the anatomy feeding the portraits. Feynman wandered with the same disregard for fences — physics, yes, but also biology in a sabbatical year, safecracking, Mayan hieroglyphics, bongo drumming, and painting under a pseudonym — and insisted these were not distractions from physics but the same faculty pointed at new objects. Vance's Musk applies a single engineering temperament across payments, rockets, cars, and solar power, moving capital and talent and mental models between domains that conventional careers keep strictly apart. The synthesis is not dilettantism; it is the bet that the patterns rhyme across fields, and that the person who can hear the rhyme has an advantage the specialist structurally cannot.",
      zh: "这些人物都拒绝了专业的那桩核心交易——以变窄来求变深。他们反将学科间的边界视作行政上的虚构，而他们最好的工作，往往恰恰发生在两个领域被迫相触之处。列奥纳多是原型：画家、解剖学家、水利工程师、军事设计师、植物学家、地质学家，全在一身，水的研究滋养了衣褶，解剖滋养了肖像。费曼以同样对栅栏的漠视游走——物理，是的，但也有休假之年的生物学、开保险柜、玛雅象形文字、邦戈鼓、以及以化名作画——并坚称这些不是对物理的分心，而是同一种官能指向了新的对象。万斯笔下的马斯克，把单一的工程气质施于支付、火箭、汽车与太阳能，在那些被常规职业严格分隔的领域之间，移动资本、人才与心智模型。这种综合不是浅尝辄止；它是一个赌注——模式在各领域间押韵，而能听见这押韵的人，拥有专家在结构上无法拥有的优势。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl's Leonardo is the limit case of the cross-domain mind — so unwilling to specialize that he left a trail of unfinished commissions because the next question always pulled him sideways. The cost of total synthesis is that very little gets finished.", zh: "尼科尔的列奥纳多，是跨域心灵的极限个案——不愿专精到留下一连串未竟之约，因为下一个问题总把他横向拉走。彻底综合的代价，是几乎没有什么能被完成。" } },
      { mind: "feyn", text: { en: "Feynman insisted the wandering was not a break from physics but the same playful faculty pointed elsewhere; the biology year and the safes and the drums all run on one engine. He treated the unity of his own curiosity as more real than the disciplines it crossed.", zh: "费曼坚称那些游走不是对物理的中断，而是同一种好玩的官能指向了别处；生物学之年、保险柜与鼓，全靠同一台引擎运转。他把自身好奇心的统一，看得比它所跨越的学科更真实。" } },
      { mind: "musk", text: { en: "Vance frames Musk's portfolio as a single thesis executed in four industries at once — payments funding rockets, rockets disciplining cars, all bent toward the multiplanetary goal. The synthesis is financial and strategic as much as intellectual.", zh: "万斯把马斯克的版图框定为『一项论题在四个产业中同时执行』——支付为火箭供血，火箭规训汽车，全部弯向多行星的目标。这种综合，既是智识的，也同等地是金融与战略的。" } },
    ],
    sources: { en: "Nicholl (the range of the notebooks) · Feynman, Surely You're Joking (biology, safes, Brazil, painting) · Vance ch. 10–11 (the parallel companies)", zh: "尼科尔（笔记本的广度）· 费曼《别闹了，费曼先生》（生物学、保险柜、巴西、绘画）· 万斯第 10–11 章（并行的公司）" },
  },
  {
    num: "06", id: "play",
    title: { en: "Play & Irreverence", zh: "游戏与不敬" },
    sub: { en: "Serious work disguised as a game · authority taken lightly", zh: "伪装成游戏的严肃工作 · 被轻看的权威" },
    body: {
      en: "A surprising amount of what these books document is play — and the play is not a break from the work but its native mode. Feynman is the clearest instance: the man who cracked the safes holding the atomic secrets at Los Alamos did it partly as a prank and partly to prove the security was theatre, and he was equally serious and unserious about samba, painting, and picking locks. His whole epistemology is irreverent — he treated pompous authority as a target and assumed that anything dressed up in jargon was hiding a simple idea or an empty one. Leonardo, too, built automata and theatrical illusions, designed practical jokes and riddles, and approached the most solemn commissions with a craftsman's delight in mechanism. Vance's Musk carries the same streak in a colder key — the relish for the audacious gesture, the willingness to look ridiculous, the treatment of enormous risk as a kind of game. The thread that matters is this: taking the work seriously and taking yourself seriously are different things, and the genius in these books does the first by refusing the second.",
      zh: "这些书所记录的，有出人意料之多的成分是『玩』——而这玩并非工作的间歇，而是工作的母语。费曼是最清楚的例子：那个在洛斯阿拉莫斯撬开装着原子机密的保险柜的人，一半是恶作剧，一半是为证明那套安保不过是戏；他对桑巴、绘画与撬锁，同等地认真又同等地不认真。他整套认识论都是不敬的——他把自命不凡的权威当作靶子，并假定任何披着行话外衣之物，要么藏着一个简单的念头，要么藏着一个空洞的念头。列奥纳多同样制造自动机与剧场幻术，设计恶作剧与谜语，并以匠人对机理的喜悦去对待最庄严的委托。万斯笔下的马斯克，以更冷的调性携带着同一缕脉络——对大胆姿态的津津乐道、甘冒显得荒唐之险、把巨大的风险当作一种游戏。真正要紧的那一缕是：认真对待工作、与认真对待自己，是两回事；这些书里的天才，正以拒绝后者来完成前者。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl's Leonardo loved spectacle and trickery — mechanical lions, festival automata, hidden jokes in the margins. The same hands that drew the heart also built toys to astonish a court; the playfulness and the rigor are not in tension, they are the same impulse.", zh: "尼科尔的列奥纳多热爱奇观与戏法——机械狮子、节庆自动机、页边藏着的玩笑。那双画出心脏的手，也造出令宫廷惊叹的玩具；这份顽皮与那份严谨并不冲突，它们是同一种冲动。" } },
      { mind: "feyn", text: { en: "The Los Alamos safecracking is the signature: serious enough to expose a real security failure, unserious enough to be a running joke. Feynman made irreverence a working method — strip the pomp off a problem and the real question is usually small and answerable.", zh: "洛斯阿拉莫斯撬保险柜是其招牌：认真到足以揭露一桩真实的安保失败，不认真到成了一个持续的玩笑。费曼把不敬变成了一种工作方法——剥掉一个问题的浮夸，真正的问题通常很小、且可回答。" } },
      { mind: "musk", text: { en: "Vance's Musk plays in a colder register — the appetite for the spectacular bet, the indifference to looking foolish, risk treated as a game with civilizational stakes. The same trait, in a man with far more power, is where play starts to shade into something harder to admire.", zh: "万斯笔下的马斯克以更冷的音区玩耍——对惊人赌注的胃口、对显得愚蠢的无所谓、把风险当作一场赌上文明的游戏。同一项特质，在一个权力大得多的人身上，正是『玩』开始染上某种更难令人钦佩之物的地方。" } },
    ],
    sources: { en: "Nicholl pt. II & V (automata, spectacle) · Feynman, Surely You're Joking (the safes) · Vance ch. 1 & 7", zh: "尼科尔第二、五部（自动机、奇观）· 费曼《别闹了，费曼先生》（保险柜）· 万斯第 1、7 章" },
  },
  {
    num: "07", id: "obsession",
    title: { en: "Obsessive Immersion", zh: "痴迷的沉浸" },
    sub: { en: "The capacity to disappear into one problem · focus as a drug", zh: "消失进一个问题的能力 · 专注如药" },
    body: {
      en: "Curiosity starts the engine; obsession is what keeps it running past the point where ordinary people stop. All three books describe a capacity for total immersion — the ability to vanish into a single problem for hours, days, years, to the exclusion of food, sleep, comfort, and frequently other human beings. Leonardo would reportedly stand before a single passage of a painting for hours without touching it, then add one stroke and leave; he carried the Mona Lisa, unfinished and undelivered, for some sixteen years because he could not stop returning to it. Feynman describes the state of being so far inside a calculation that the outside world thins to nothing, and treats it not as discipline but as the deepest available pleasure. Vance's Musk works hours that alarm everyone around him, sleeps at the factory, and seems to experience the surge into a problem as a compulsion more than a choice. The dark edge of this trait is the subject of the next section; here it is enough to note that the immersion is real, it is the difference between talent and output, and it is not obviously available to the will — none of the three seems able to turn it off.",
      zh: "好奇心发动引擎；痴迷则让它越过常人停下的那一点继续运转。三本书都描述了一种彻底沉浸的能力——消失进一个问题达数小时、数日、数年的本领，把食物、睡眠、舒适、以及常常连同其他人，一并排除在外。据说列奥纳多会在一幅画的某一处段落前站立数小时而不落笔，然后添一笔便离去；他把那幅未完成、也未交付的《蒙娜丽莎》带在身边约十六年，因为他无法停止回到它。费曼描述了那种深入一项计算、以至于外部世界稀薄至无的状态，并把它视作并非纪律、而是可得的最深之乐。万斯笔下的马斯克，以令周围每个人都警觉的时长工作，睡在工厂里，似乎把『扑入一个问题的狂涌』体验为一种强迫、多于一种选择。这项特质的暗缘，是下一节的主题；在此只需记下：那份沉浸是真实的，它是天赋与产出之间的差别，且它显然不听命于意志——三人中没有一个，似乎能把它关掉。",
    },
    threads: [
      { mind: "leo", text: { en: "Nicholl gives the image of Leonardo immobile before the Last Supper, adding nothing for hours, then a single touch — immersion so total it looks like idleness from outside. He kept the Mona Lisa for sixteen years; the obsession and the non-finishing are two faces of one trait.", zh: "尼科尔给出列奥纳多在《最后的晚餐》前一动不动的形象，数小时不添一物，然后一触——沉浸彻底到从外面看像是闲怠。他把《蒙娜丽莎》留了十六年；那份痴迷与那种『不完成』，是同一项特质的两面。" } },
      { mind: "feyn", text: { en: "Feynman describes immersion as the highest pleasure he knew — being so deep in a problem the world disappears. He guarded that state fiercely and arranged his life to protect access to it, which is part of why he refused administrative power and honors that would interrupt it.", zh: "费曼把沉浸描述为他所知的最高之乐——深入一个问题以至于世界消失。他凶猛地守护那个状态，并安排自己的生活以护住通往它的路径；这也是他拒绝那些会打断它的行政权力与荣誉的部分原因。" } },
      { mind: "musk", text: { en: "Vance's Musk runs on a compulsion to surge into the problem — the factory-floor hours, the refusal to stop, the apparent inability to throttle the drive. The book is candid that this is not a lever he chooses to pull so much as one that is always pulled.", zh: "万斯笔下的马斯克，靠一种『扑入问题』的强迫运转——工厂地板上的时长、不肯停下、以及显然无法为驱动力节流。该书坦率地指出：这与其说是他选择去拉的杠杆，不如说是一根永远被拉着的杠杆。" } },
    ],
    sources: { en: "Nicholl pt. IV–V (the Last Supper, the Mona Lisa) · Feynman, The Pleasure of Finding Things Out · Vance ch. 6 & 12", zh: "尼科尔第四、五部（最后的晚餐、蒙娜丽莎）· 费曼《发现的乐趣》· 万斯第 6、12 章" },
  },
  {
    num: "08", id: "cost",
    title: { en: "The Unfinished & the Cost", zh: "未竟与代价" },
    sub: { en: "What the engine burns · the people and works left behind", zh: "引擎所焚烧之物 · 被留在身后的人与作品" },
    body: {
      en: "The honest section. The same machinery that produces the work also produces a wreckage, and none of these three books pretends otherwise. The obsessive immersion that finishes the heart studies is the same trait that leaves dozens of commissions abandoned; the first-principles certainty that decomposes a rocket is the same certainty that overrides the people who say a deadline is impossible. Leonardo's tragedy in Nicholl's telling is the unfinished — the destroyed clay horse, the failed Battle of Anghiari, the notebooks never published, a body of knowledge that died with him and had to be rebuilt from scratch by others. Feynman's cost is quieter and more personal: the distance, the famous difficulty of ordinary intimacy, and above all the loss of Arline, his first wife, who died of tuberculosis while he was at Los Alamos. Vance's Musk carries the most legible human cost of the three — the strained marriage, the employees burned through, the people treated as components of a machine pointed at the future. The site does not resolve whether the cost is necessary; it insists only that any account of genius that hides the cost is a flattering lie, and that the wreckage is part of the anatomy, not an unfortunate footnote to it.",
      zh: "诚实的一节。产出作品的那同一套机器，也产出一片残骸，而这三本书没有一本假装并非如此。完成心脏研究的那种痴迷沉浸，正是留下数十件委托被弃置的同一项特质；分解一枚火箭的那种第一性原理的笃定，正是碾过那些说『最后期限不可能』之人的同一种笃定。在尼科尔的叙述里，列奥纳多的悲剧是『未竟』——被毁的黏土马、失败的《安吉亚里之战》、从未发表的笔记，一具随他而亡、须由他人从零重建的知识之体。费曼的代价更安静、更私人：那份疏离、那种对寻常亲密出了名的笨拙，以及最重的——失去阿琳，他的第一任妻子，她在他于洛斯阿拉莫斯期间死于肺结核。万斯笔下的马斯克，背负着三者中最为可读的人性代价——绷紧的婚姻、被耗尽的员工、被当作一台指向未来之机器零件的人。本站不去裁决那代价是否必要；它只坚持：任何隐藏代价的天才叙事，都是一句谄媚的谎言，而那残骸是解剖的一部分，不是它一条不幸的脚注。",
    },
    threads: [
      { mind: "leo", text: { en: "For Nicholl the deepest cost is civilizational: the unpublished notebooks meant Leonardo's discoveries had almost no effect on the science that followed. The genius was nearly total and nearly wasted — finished works are few, and the great knowledge died locked in mirror-script.", zh: "对尼科尔而言，最深的代价是文明性的：未发表的笔记意味着列奥纳多的发现，对其后的科学几乎毫无影响。这份天才近乎完整，也近乎被浪费——完成的作品寥寥，而那伟大的知识，锁在镜像字里随他死去。" } },
      { mind: "feyn", text: { en: "Feynman's cost is intimate and unevenly told — the charm that the memoirs foreground can obscure the distance underneath. The loss of Arline is the place where the playful surface drops and the book lets real grief through.", zh: "费曼的代价是私密的、且被不均地讲述——回忆录所凸显的魅力，能遮蔽其下的疏离。失去阿琳，是那顽皮表面落下、书让真实的悲痛透出来的地方。" } },
      { mind: "musk", text: { en: "Vance is unsentimental about the human cost: the first marriage, the exhausted employees, the people read as means to a civilizational end. He neither excuses it nor pretends the outputs would exist without the temperament that produces it.", zh: "万斯对人性代价毫不感伤：第一段婚姻、被耗尽的员工、被读作『通往文明目的之手段』的人。他既不为之开脱，也不假装『没有那产出代价的气质，那些产出仍会存在』。" } },
    ],
    sources: { en: "Nicholl pt. V–VI (the unfinished, the lost horse, the notebooks' fate) · Feynman, What Do You Care (Arline) · Vance ch. 6 & 11", zh: "尼科尔第五、六部（未竟、丢失的马、笔记的命运）· 费曼《你干吗在乎别人怎么想》（阿琳）· 万斯第 6、11 章" },
  },
];

/* ---- GeniusRadar: eight axes × three minds ---- */
export type RadarAxis = { key: string; label: Bi };
export const RADAR_AXES: RadarAxis[] = [
  { key: "curiosity",   label: { en: "Curiosity",      zh: "好奇心" } },
  { key: "firstprin",   label: { en: "First Principles", zh: "第一性原理" } },
  { key: "notebook",    label: { en: "Notebook Habit", zh: "笔记习惯" } },
  { key: "visual",      label: { en: "Visual Thinking", zh: "视觉思维" } },
  { key: "synthesis",   label: { en: "Cross-Domain",   zh: "跨域综合" } },
  { key: "play",        label: { en: "Play",           zh: "游戏" } },
  { key: "obsession",   label: { en: "Obsession",      zh: "痴迷" } },
  { key: "output",      label: { en: "Output Volume",  zh: "产出量" } },
];
// scores 0–100, in RADAR_AXES order; interpretive, not measured — argued in the body text.
export const RADAR_SCORES: Record<MindKey, number[]> = {
  leo:  [100, 86, 100, 100, 100, 78, 92, 46],
  feyn: [96, 100, 90, 94, 88, 100, 84, 72],
  musk: [82, 96, 54, 80, 84, 66, 100, 100],
};

/* ---- GeniusTimeline: milestones across five centuries ---- */
export type Milestone = { year: number; mind: MindKey; label: Bi };
export const TIMELINE: Milestone[] = [
  { year: 1452, mind: "leo",  label: { en: "Born in Vinci, out of wedlock", zh: "私生于芬奇镇" } },
  { year: 1482, mind: "leo",  label: { en: "Enters the court of Milan", zh: "进入米兰宫廷" } },
  { year: 1489, mind: "leo",  label: { en: "Anatomical & flight studies begin in earnest", zh: "解剖与飞行研究正式开始" } },
  { year: 1503, mind: "leo",  label: { en: "Begins the Mona Lisa — carried 16 years", zh: "开始画《蒙娜丽莎》——携带十六年" } },
  { year: 1519, mind: "leo",  label: { en: "Dies at Amboise; notebooks unpublished", zh: "卒于昂布瓦兹；笔记未发表" } },
  { year: 1918, mind: "feyn", label: { en: "Born in Queens; father trains him to question", zh: "生于皇后区；父亲训练他发问" } },
  { year: 1943, mind: "feyn", label: { en: "Los Alamos: physics, and the safecracking", zh: "洛斯阿拉莫斯：物理，与撬保险柜" } },
  { year: 1945, mind: "feyn", label: { en: "Arline dies of tuberculosis", zh: "阿琳死于肺结核" } },
  { year: 1965, mind: "feyn", label: { en: "Nobel Prize — the diagrams, from 'piddling'", zh: "诺贝尔奖——那些图，源自『瞎鼓捣』" } },
  { year: 1986, mind: "feyn", label: { en: "Challenger: the O-ring in ice water", zh: "挑战者号：冰水中的 O 形环" } },
  { year: 1971, mind: "musk", label: { en: "Born in Pretoria", zh: "生于比勒陀利亚" } },
  { year: 1995, mind: "musk", label: { en: "Zip2 — ships software at internet speed", zh: "Zip2——以互联网速度发布软件" } },
  { year: 2002, mind: "musk", label: { en: "SpaceX: the rocket-cost first-principles bet", zh: "SpaceX：火箭成本的第一性原理赌注" } },
  { year: 2008, mind: "musk", label: { en: "Tesla & SpaceX both near death, then saved", zh: "特斯拉与 SpaceX 双双濒死，复又获救" } },
  { year: 2015, mind: "musk", label: { en: "Vance's biography closes here", zh: "万斯的传记在此合卷" } },
];

/* ---- NotebookViewer: a facsimile-style page per mind (drawn, not reproduced) ---- */
export type NotebookPage = { mind: MindKey; heading: Bi; lines: Bi[]; caption: Bi };
export const NOTEBOOK: NotebookPage[] = [
  {
    mind: "leo",
    heading: { en: "A page of undirected questions", zh: "一页无定向的问题" },
    lines: [
      { en: "— Describe the tongue of the woodpecker", zh: "——描述啄木鸟的舌头" },
      { en: "— Why is the sky blue", zh: "——天空为何是蓝的" },
      { en: "— Ask Maestro Luca about the squaring of triangles", zh: "——问卢卡大师三角形的化方" },
      { en: "— Draw the turbulence where the river meets the pier", zh: "——画下河水撞上桥墩处的湍流" },
      { en: "— Buy: sugar, a skull, Italian-French dictionary", zh: "——买：糖、一个头骨、意法词典" },
    ],
    caption: { en: "Written right-to-left in mirror script. Paraphrased from the kinds of lists Nicholl reproduces — drawing and reasoning and errands on one page.", zh: "以右向左的镜像字书写。转述自尼科尔再现的那类清单——绘画、推理与杂务同处一页。" },
  },
  {
    mind: "feyn",
    heading: { en: "The notebook IS the work", zh: "笔记本就是工作本身" },
    lines: [
      { en: "wobble : spin = 2 : 1  (why?)", zh: "晃动 : 自转 = 2 : 1（为什么？）" },
      { en: "re-derive — don't trust 'everybody knows'", zh: "重新推导——别信『众所周知』" },
      { en: "draw the scattering as a picture, read off the math", zh: "把散射画成图，从中读出数学" },
      { en: "if the jargon hides nothing, the idea is simple", zh: "若行话什么也没藏，那念头就是简单的" },
    ],
    caption: { en: "When a historian called his notes a record of his thinking, Feynman corrected him: they were not a record — they were the work itself, done on paper. Paraphrased.", zh: "当一位历史学家把他的笔记称作思维的记录，费曼纠正道：那不是记录——那就是工作本身，在纸上完成。此处为转述。" },
  },
  {
    mind: "musk",
    heading: { en: "The spreadsheet on the flight home", zh: "归程飞机上的电子表格" },
    lines: [
      { en: "rocket → Al, Ti, Cu, carbon fibre", zh: "火箭 → 铝、钛、铜、碳纤维" },
      { en: "materials ≈ 2% of quoted price", zh: "材料 ≈ 报价的 2%" },
      { en: "therefore: build it, don't buy it", zh: "故：自己造，别买" },
      { en: "reusability changes the whole equation", zh: "可重复使用改变整个方程" },
    ],
    caption: { en: "Musk externalizes not onto vellum but into spreadsheets and the companies themselves. Paraphrased from Vance's account of the rocket-cost calculation.", zh: "马斯克不外化于犊皮纸，而外化于电子表格与公司本身。转述自万斯对火箭成本计算的叙述。" },
  },
];

/* ---- FirstPrinciplesLab: decompose to fundamentals, then rebuild ---- */
export type FPCase = {
  mind: MindKey; problem: Bi; convention: Bi;
  atoms: Bi[]; rebuild: Bi; insight: Bi;
};
export const FP_CASES: FPCase[] = [
  {
    mind: "leo",
    problem: { en: "How does the human body actually work?", zh: "人体究竟如何运作？" },
    convention: { en: "Trust the inherited anatomy of Galen, copied for a thousand years.", zh: "信从盖伦那继承了千年、辗转抄录的解剖学。" },
    atoms: [
      { en: "Ignore the textbook; obtain the corpse.", zh: "无视教科书；取得尸体。" },
      { en: "Dissect, layer by layer, and draw exactly what is there.", zh: "一层一层地解剖，精确画下所见之物。" },
      { en: "Model the heart as a pump; study the vortices in the valve.", zh: "把心脏建模为一台泵；研究瓣膜中的涡流。" },
    ],
    rebuild: { en: "An anatomy built from observation, not authority — the aortic valve understood centuries early.", zh: "一套建于观察、而非权威之上的解剖学——主动脉瓣的理解早了数个世纪。" },
    insight: { en: "The authority was a thousand-year-old compression of someone else's looking. Leonardo looked again.", zh: "那权威，是别人一次观看的、千年陈旧的压缩。列奥纳多重新看了一遍。" },
  },
  {
    mind: "feyn",
    problem: { en: "Why did the Challenger shuttle explode?", zh: "挑战者号航天飞机为何爆炸？" },
    convention: { en: "Accept the committee's careful, hedged, many-page prose.", zh: "接受委员会那审慎、含糊、长达数页的辞藻。" },
    atoms: [
      { en: "Find the single physical component most likely to fail in cold.", zh: "找出在低温下最可能失效的那一个物理部件。" },
      { en: "The O-ring seal — does its rubber stay elastic near freezing?", zh: "O 形环密封圈——它的橡胶在接近冰点时还有弹性吗？" },
      { en: "Drop a sample into a glass of ice water on camera.", zh: "当着镜头把一个样本丢进一杯冰水。" },
    ],
    rebuild: { en: "The rubber loses resilience in the cold — shown in seconds, in public, with no jargon.", zh: "橡胶在低温下失去回弹——几秒之内、当众、毫无行话地展示出来。" },
    insight: { en: "A demonstration anyone could see beat a report no one could pin down. Reason from the rubber, not the rhetoric.", zh: "一个人人都能看见的演示，胜过一份谁也抓不住的报告。从橡胶推理，而非从修辞。" },
  },
  {
    mind: "musk",
    problem: { en: "Why does a rocket cost so much?", zh: "一枚火箭为何如此昂贵？" },
    convention: { en: "Accept that rockets cost tens of millions because they always have.", zh: "接受『火箭值数千万，因为向来如此』。" },
    atoms: [
      { en: "List the raw materials: aluminium, titanium, copper, carbon fibre.", zh: "列出原材料：铝、钛、铜、碳纤维。" },
      { en: "Price each on the open commodities market.", zh: "在公开的大宗商品市场上为每一种定价。" },
      { en: "Sum them; compare to the quoted price of the finished rocket.", zh: "求和；与成品火箭的报价相比。" },
    ],
    rebuild: { en: "Materials are ~2% of the price; the rest is convention. So build in-house — and make it reusable.", zh: "材料约占价格的 2%；其余是惯例。故自己造——并让它可重复使用。" },
    insight: { en: "Industry pricing was a habit dressed as a law. The spreadsheet, not the incumbents, set the floor.", zh: "行业定价是一个伪装成定律的习惯。是那张电子表格、而非在位者，定下了地板。" },
  },
];

/* ---- CuriosityEngine: one question branches into more ---- */
export type CuriosityChain = { mind: MindKey; seed: Bi; branches: Bi[] };
export const CURIOSITY: CuriosityChain[] = [
  {
    mind: "leo",
    seed: { en: "How does a bird stay up?", zh: "鸟如何留在空中？" },
    branches: [
      { en: "→ How does air push on a moving wing?", zh: "→ 空气如何推一只运动的翼？" },
      { en: "→ How does water move around an obstacle? (same physics)", zh: "→ 水如何绕过障碍物运动？（同一种物理）" },
      { en: "→ Could a man fly with the right machine?", zh: "→ 人借合适的机器能否飞？" },
      { en: "→ Draw the turbulence; it looks like hair, like flood, like the deluge.", zh: "→ 画下湍流；它像头发、像洪水、像大洪流。" },
    ],
  },
  {
    mind: "feyn",
    seed: { en: "Why does the plate wobble?", zh: "盘子为何晃动？" },
    branches: [
      { en: "→ What's the ratio of wobble to spin?", zh: "→ 晃动与自转的比率是多少？" },
      { en: "→ Why does the equation look like electron orbits?", zh: "→ 为何这方程看起来像电子轨道？" },
      { en: "→ Could this rebuild quantum electrodynamics?", zh: "→ 这能否重建量子电动力学？" },
      { en: "→ (it did — and won the Nobel Prize)", zh: "→（它做到了——并赢得诺贝尔奖）" },
    ],
  },
  {
    mind: "musk",
    seed: { en: "Why isn't there a base on Mars yet?", zh: "为何火星上还没有基地？" },
    branches: [
      { en: "→ Because launch is too expensive.", zh: "→ 因为发射太贵。" },
      { en: "→ Why is launch expensive? Rockets are thrown away.", zh: "→ 发射为何贵？因为火箭被扔掉了。" },
      { en: "→ What if the booster flew back and landed?", zh: "→ 若助推器飞回来并着陆呢？" },
      { en: "→ Then the cost floor is fuel, not hardware.", zh: "→ 那么成本的地板是燃料，而非硬件。" },
    ],
  },
];

/* ---- GeniusAnalyst: lenses on the open questions ---- */
export type AnalystRole = { key: string; role: Bi; blurb: Bi; accent: string };
export const ANALYST_ROLES: AnalystRole[] = [
  { key: "biographer",   role: { en: "Biographer",    zh: "传记作家" }, blurb: { en: "what the books actually say", zh: "书里究竟怎么说" }, accent: "#d6a23c" },
  { key: "neuroscientist", role: { en: "Neuroscientist", zh: "神经科学家" }, blurb: { en: "what a brain is doing here", zh: "大脑在此做了什么" }, accent: "#3fb4c4" },
  { key: "historian",    role: { en: "Historian",     zh: "历史学家" }, blurb: { en: "what the era made possible", zh: "时代成全了什么" }, accent: "#c45a35" },
  { key: "skeptic",      role: { en: "Skeptic",       zh: "怀疑者" }, blurb: { en: "where the myth inflates the man", zh: "神话在何处夸大了人" }, accent: "#9c9176" },
  { key: "educator",     role: { en: "Educator",      zh: "教育者" }, blurb: { en: "what a learner can actually steal", zh: "学习者究竟能偷走什么" }, accent: "#6f8fd6" },
];

export type AnalystTopic = { key: string; q: Bi; views: { lens: string; text: Bi }[] };
export const ANALYST_TOPICS: AnalystTopic[] = [
  {
    key: "born-or-made",
    q: { en: "Is genius born or made?", zh: "天才是天生的，还是造就的？" },
    views: [
      { lens: "biographer", text: { en: "All three books refuse the clean answer. Each subject shows an early, almost unwilled appetite — Leonardo's eye, Feynman's father-trained questioning, Musk's reading — but also decades of relentless accumulation. The biographies read less as 'born vs made' than as a rare temperament meeting an enormous amount of work; neither half alone produces the figure.", zh: "三本书都拒绝那个干净的答案。每位传主都显出一种早发的、近乎不由自主的胃口——列奥纳多的眼、费曼经父亲训练的发问、马斯克的阅读——但也有数十年不懈的积累。这些传记读来，与其说是『天生 vs 造就』，不如说是一种罕见的气质遇上巨量的工作；任一半单独，都造不出那个人物。" } },
      { lens: "neuroscientist", text: { en: "There is no 'genius gene' to point to; what the accounts describe is closer to an unusual reward system — curiosity that is intrinsically, almost chemically, pleasurable — coupled with a capacity for sustained focus most brains cannot hold. Both have heritable components and both are shaped by environment. The honest answer is 'a predisposition, heavily cultivated.'", zh: "没有可指认的『天才基因』；这些叙述所描述的，更接近一种不寻常的奖赏系统——一种内在地、近乎化学性地令人愉悦的好奇——再加上一种多数大脑无法维持的持续专注之能力。两者都有可遗传的成分，也都被环境塑造。诚实的答案是『一种素质，被大力培养』。" } },
      { lens: "historian", text: { en: "Born when and where matters enormously. Leonardo needed Florentine workshops and Milanese courts; Feynman needed the war, MIT, and Caltech; Musk needed Silicon Valley capital. The same temperament in a different century is a frustrated villager. 'Made' includes 'made by an era that had a use for him.'", zh: "生于何时何地，关系极大。列奥纳多需要佛罗伦萨的工坊与米兰的宫廷；费曼需要战争、麻省理工与加州理工；马斯克需要硅谷的资本。同样的气质放在另一个世纪，便是一个郁郁不得志的村民。『造就』包含『被一个对他有用的时代所造就』。" } },
      { lens: "skeptic", text: { en: "The 'born' story is flattering and lazy; it lets readers off the hook ('I wasn't born with it'). But the 'made' story can be just as false if it implies anyone could do this with enough effort. The books document outliers. Most of the trait-by-trait habits are learnable; the intensity that fuses them probably is not.", zh: "『天生』的故事谄媚而懒惰；它让读者得以脱钩（『我不是天生的料』）。但若『造就』的故事暗示『人人只要够努力都能做到』，它也同样虚假。这些书记录的是异常值。逐项特质的多数习惯是可学的；把它们熔为一体的那种强度，大概不是。" } },
      { lens: "educator", text: { en: "The useful framing for a learner ignores the metaphysics. You cannot choose your endowment, but you can choose to keep a real notebook, to re-derive instead of memorize, to cross fields on purpose, to ask the useless question. Those are the made parts, and they are exactly the parts the books say matter most.", zh: "对学习者有用的框架，无视那形而上学。你无法选择自己的禀赋，但你能选择真正去记一本笔记、选择重新推导而非死记、选择有意跨越领域、选择去问那个无用的问题。那些是『被造就』的部分，也正是这些书所说最要紧的部分。" } },
    ],
  },
  {
    key: "cost-necessary",
    q: { en: "Is the human cost necessary for the work?", zh: "人性的代价，是工作所必需的吗？" },
    views: [
      { lens: "biographer", text: { en: "The books document the cost without claiming it was required. Leonardo's unfinished works, Feynman's distances, Musk's burned relationships are all real; whether the output needed them is a question each biography leaves open. Correlation is not necessity, and the honest reader holds both the achievement and the wreckage in view at once.", zh: "这些书记录了代价，却不主张它是必需的。列奥纳多的未竟之作、费曼的疏离、马斯克烧毁的关系，皆为真实；产出是否需要它们，是每本传记都留作开放的问题。相关不是必然，诚实的读者把成就与残骸同时保持在视野里。" } },
      { lens: "neuroscientist", text: { en: "The same focus that produces the work does plausibly crowd out the bandwidth ordinary relationships require — attention is finite. But 'crowds out' is not 'must destroy.' The cost looks less like a physical law than like a default that goes unchallenged because the work keeps paying off.", zh: "产出工作的那同一种专注，确有可能挤掉寻常关系所需的带宽——注意力是有限的。但『挤掉』不等于『必然摧毁』。这代价看起来不那么像一条物理定律，更像一个因为『工作不断回报』而无人挑战的默认值。" } },
      { lens: "historian", text: { en: "We remember the geniuses whose costs we can romanticize and forget the equally driven who simply hurt people without producing a Mona Lisa. Survivorship bias makes the cost look necessary because we only kept the cases where it 'worked.' Plenty of cruelty produces nothing.", zh: "我们记住那些其代价可被我们浪漫化的天才，而遗忘那些同样被驱动、却只是伤害了人而没有产出《蒙娜丽莎》的人。幸存者偏差让代价显得必需，因为我们只留下了那些『奏效』的个案。大量的残忍什么也没产出。" } },
      { lens: "skeptic", text: { en: "This is the most dangerous question on the site, because 'the cost was necessary' is the exact story a powerful person tells to license harm. The books should be read as a warning here, not a permission slip. The cost being real does not make it required, and lesser imitators get only the cruelty.", zh: "这是本站最危险的问题，因为『代价是必需的』，正是一个有权之人用来为伤害发放许可证的故事。在此处，这些书应被读作警告，而非一张许可条。代价之真实，并不使它成为必需；而较弱的模仿者，只得到那份残忍。" } },
      { lens: "educator", text: { en: "For a learner the practical lesson is to separate the trait from its pathology. You can keep the notebook and the curiosity without keeping the contempt for other people. The biographies that flatten genius into 'difficult but worth it' do real damage; the goal is the engine, not the wreckage.", zh: "对学习者，实用的教训是把特质与其病理分开。你能保留笔记本与好奇，而不保留对他人的轻蔑。那些把天才压平为『难相处但值得』的传记，造成真实的损害；目标是引擎，而非残骸。" } },
    ],
  },
  {
    key: "comparable",
    q: { en: "Are these three even comparable?", zh: "这三个人，真的可比吗？" },
    views: [
      { lens: "skeptic", text: { en: "Start with the objection: a Renaissance painter, a quantum physicist, and a billionaire industrialist live in incommensurable worlds. Forcing them onto one radar chart risks a flattering myth of 'timeless genius' that erases what is specific to each. The comparison is a lens, not a measurement, and it should be held loosely.", zh: "先从异议开始：一位文艺复兴画家、一位量子物理学家、一位亿万富翁实业家，活在不可通约的世界里。把他们硬塞进一张雷达图，有制造一个『永恒天才』谄媚神话之险，抹去各自的特殊性。这种比较是一面透镜，不是一次测量，应当松松地握着。" } },
      { lens: "biographer", text: { en: "And yet the books rhyme. Read back-to-back, the same handful of habits keeps surfacing in radically different costumes — the notebook, the re-derivation, the useless question, the immersion. The comparison earns its keep not by ranking them but by isolating what survives translation across five centuries.", zh: "然而这些书押韵。接连读来，同样寥寥几个习惯，在截然不同的戏服下不断浮现——笔记本、重新推导、无用的问题、沉浸。这种比较之所以站得住，不是因为给他们排名，而是因为它分离出了『跨越五个世纪、仍能存活于翻译』之物。" } },
      { lens: "historian", text: { en: "The differences are the point as much as the similarities. Leonardo's knowledge died unpublished; Feynman's became standard notation; Musk's becomes capital and hardware. The same traits land completely differently depending on whether the era has institutions to catch the output. Comparison reveals the era, not just the man.", zh: "差异与相似同等重要。列奥纳多的知识未发表便死去；费曼的成了标准记法；马斯克的化为资本与硬件。同样的特质，依时代是否有承接产出的制度，落地完全不同。比较揭示的是时代，而不只是那个人。" } },
      { lens: "educator", text: { en: "For learning purposes, comparability is exactly the useful move. If a habit shows up in a painter, a physicist, and an engineer alike, it is more likely to be a general feature of how breakthroughs happen than a quirk of one field — which is precisely the kind of thing worth trying to adopt.", zh: "就学习而言，可比性恰是那个有用的动作。若一个习惯在画家、物理学家与工程师身上都出现，它更可能是『突破如何发生』的一项普遍特征，而非某一领域的怪癖——这正是值得尝试采纳之物。" } },
    ],
  },
  {
    key: "cultivable",
    q: { en: "Can any of this be cultivated?", zh: "这其中，有任何东西可被培养吗？" },
    views: [
      { lens: "educator", text: { en: "Yes — selectively. The endowment is not transferable, but most of the documented habits are. Keep a real notebook and think on the page. Re-derive instead of memorizing. Cross one field into another on purpose. Protect long blocks of undistracted immersion. None of these requires being Leonardo; all of them move you toward how he worked.", zh: "可以——有选择地。禀赋无法转移，但所记录的多数习惯可以。真正去记一本笔记，并在纸上思考。重新推导，而非死记。有意地把一个领域跨入另一个。守护长段不受干扰的沉浸。这些都不要求你是列奥纳多；它们全都把你推向他工作的方式。" } },
      { lens: "neuroscientist", text: { en: "Curiosity and focus both respond to practice and environment, within limits set by temperament. You can train attention, reduce the interruptions that fragment it, and deliberately expose yourself to the novelty that feeds curiosity. You probably cannot install the raw intensity, but you can stop sabotaging the parts you have.", zh: "好奇与专注，都在气质设定的限度内，对练习与环境有所回应。你能训练注意力，减少使其碎裂的打断，并刻意把自己暴露于喂养好奇的新奇之中。你大概无法装上那份原始的强度，但你能停止破坏自己已有的部分。" } },
      { lens: "biographer", text: { en: "The books quietly support the cultivable reading: each subject worked at these habits for decades. Leonardo's eye was trained in a workshop; Feynman's questioning was taught by his father; Musk built his models through obsessive reading. None arrived fully formed. The myth of the effortless genius is the least supported claim in all three biographies.", zh: "这些书静静地支持『可培养』的读法：每位传主都在这些习惯上耕耘了数十年。列奥纳多的眼在工坊里被训练；费曼的发问由父亲所授；马斯克通过痴迷的阅读建起他的模型。无人是生而完备的。『毫不费力的天才』之神话，是三本传记中最缺乏支撑的论断。" } },
      { lens: "skeptic", text: { en: "Careful with the self-help reading, though. You can adopt every habit on this site and still not produce a Mona Lisa, and that is fine — the point is not to manufacture geniuses but to think a little more like one. Promising more than that is exactly the flattering lie the cost section warned about.", zh: "不过，对『自助书』式的读法要当心。你能采纳本站每一个习惯，仍然产不出一幅《蒙娜丽莎》，而这没关系——重点不是制造天才，而是稍微更像天才那样思考一点。承诺多于此，正是『代价』一节所警告的那句谄媚的谎言。" } },
    ],
  },
];

/* ---- CultivationLadder: the traits as a learnable sequence ---- */
export type Rung = { n: string; trait: Bi; practice: Bi };
export const CULTIVATION: Rung[] = [
  { n: "01", trait: { en: "Curiosity", zh: "好奇心" }, practice: { en: "Ask one useless question a day and chase it with no expectation of payoff.", zh: "每天问一个无用的问题，毫无回报之念地追下去。" } },
  { n: "02", trait: { en: "First Principles", zh: "第一性原理" }, practice: { en: "Take one thing 'everybody knows' and rebuild it from the ground up yourself.", zh: "取一件『众所周知』之事，亲手从地基重建它。" } },
  { n: "03", trait: { en: "The Notebook", zh: "笔记本" }, practice: { en: "Think on paper. Treat the page as the workshop, not the filing cabinet.", zh: "在纸上思考。把纸页当作工坊，而非档案柜。" } },
  { n: "04", trait: { en: "Visual Thinking", zh: "视觉思维" }, practice: { en: "Draw the problem before you write about it. Make the idea a picture.", zh: "在写它之前，先画那个问题。把念头变成一幅画。" } },
  { n: "05", trait: { en: "Synthesis", zh: "综合" }, practice: { en: "Carry a pattern from one field deliberately into another.", zh: "刻意把一个领域的模式，带入另一个。" } },
  { n: "06", trait: { en: "Play", zh: "游戏" }, practice: { en: "Take the work seriously and yourself lightly. Strip the pomp off the problem.", zh: "认真对待工作，轻看自己。剥掉问题的浮夸。" } },
  { n: "07", trait: { en: "Immersion", zh: "沉浸" }, practice: { en: "Defend long, unbroken blocks of attention as if they were the work — they are.", zh: "守护长段不间断的注意力，当它就是工作——它确实是。" } },
  { n: "08", trait: { en: "Honesty about Cost", zh: "对代价的诚实" }, practice: { en: "Keep the engine; refuse the cruelty. Do not romanticize the wreckage.", zh: "保留引擎；拒绝残忍。不要浪漫化那残骸。" } },
];

/* ---- closing open questions ---- */
export type OpenQ = { q: Bi; lens: { en: string } };
export const OPEN_QUESTIONS: OpenQ[] = [
  { q: { en: "If Leonardo had published his notebooks, how different would the history of science be?", zh: "若列奥纳多发表了他的笔记，科学史会多么不同？" }, lens: { en: "the cost of a wasted genius" } },
  { q: { en: "Is the curiosity that needs no payoff a luxury, or the actual source of every payoff?", zh: "那不求回报的好奇，是一种奢侈，还是一切回报的真正源头？" }, lens: { en: "useless questions, useful answers" } },
  { q: { en: "Why does the same handful of habits keep appearing across five centuries and three fields?", zh: "为何同样寥寥几个习惯，跨越五个世纪、三个领域反复出现？" }, lens: { en: "the invariants of breakthrough" } },
  { q: { en: "Can an institution be built that catches the output without breaking the people?", zh: "能否建一种制度，既承接产出，又不弄碎人？" }, lens: { en: "the engine without the wreckage" } },
  { q: { en: "Which of the eight traits is the one you have stopped practicing — and why?", zh: "这八项特质中，你已停止练习的是哪一项——为什么？" }, lens: { en: "the reader's own anatomy" } },
  { q: { en: "Is 'genius' a kind of person, or a kind of relationship between a mind and a problem?", zh: "『天才』是一种人，还是一种『心灵与问题之间的关系』？" }, lens: { en: "the question under the whole site" } },
];
