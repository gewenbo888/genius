import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "The Anatomy of Genius · Da Vinci, Feynman, Musk";
const TITLE_ZH =
  "天才的解剖 · 达·芬奇、费曼、马斯克";
const DESC =
  "A bilingual analytical companion reading three minds across five centuries — Leonardo da Vinci, Richard Feynman, and Elon Musk — for the shared mental machinery of genius: insatiable curiosity, first-principles reasoning, the notebook habit, visual thinking, cross-domain synthesis, play, obsession, and the human cost. Original commentary drawn from Charles Nicholl's Leonardo, Feynman's memoirs, and Ashlee Vance's biography; never reproduces the source texts.";

export const metadata: Metadata = {
  metadataBase: new URL("https://genius.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "anatomy of genius", "the nature of genius", "Leonardo da Vinci", "Richard Feynman", "Elon Musk",
    "Charles Nicholl", "Ashlee Vance", "Surely You're Joking Mr Feynman", "first principles thinking",
    "curiosity", "visual thinking", "Feynman diagrams", "da Vinci notebooks", "polymath",
    "creativity", "innovation", "how geniuses think", "mental models", "obsession",
    "is genius born or made", "cultivating genius", "biography analysis", "deliberate practice",
    "天才", "天才的解剖", "达·芬奇", "列奥纳多·达·芬奇", "费曼", "理查德·费曼", "埃隆·马斯克", "马斯克",
    "查尔斯·尼科尔", "阿什利·万斯", "别闹了费曼先生", "硅谷钢铁侠", "第一性原理", "好奇心",
    "视觉思维", "费曼图", "达·芬奇笔记", "博学者", "通才", "创造力", "天才是天生还是后天",
    "如何培养天才", "传记分析",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    title: TITLE_EN,
    description:
      "Three minds, one machinery. Eight traits of genius read across Leonardo da Vinci, Richard Feynman, and Elon Musk — a bilingual analytical companion. Curiosity · First principles · The notebook · Visual thinking · Synthesis · Play · Obsession · The cost.",
    url: "https://genius.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_EN,
    description: "The shared mental machinery of Da Vinci, Feynman & Musk — eight traits of genius, read across 500 years. Bilingual EN+中文.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0c0a07" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Spectral:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://genius.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
              about: [
                { "@type": "Person", name: "Leonardo da Vinci" },
                { "@type": "Person", name: "Richard Feynman" },
                { "@type": "Person", name: "Elon Musk" },
              ],
              citation: [
                { "@type": "Book", name: "Leonardo da Vinci: The Flights of the Mind", author: { "@type": "Person", name: "Charles Nicholl" }, datePublished: "2004" },
                { "@type": "Book", name: "Surely You're Joking, Mr. Feynman!", author: { "@type": "Person", name: "Richard P. Feynman" }, datePublished: "1985" },
                { "@type": "Book", name: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", author: { "@type": "Person", name: "Ashlee Vance" }, datePublished: "2015" },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-ink-950 text-ghost-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
