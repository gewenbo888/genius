import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // aged-ink substrate — the dark of a candlelit study, parchment burned to near-black
        ink: {
          950: "#0c0a07",
          900: "#13100b",
          800: "#1c1813",
          700: "#28231b",
          600: "#37301f",
          500: "#4a4130",
        },
        // illumination gold — the unifying thread of genius; gilt on a manuscript page
        gold: {
          600: "#b07e1e",
          500: "#d6a23c",
          400: "#e8bd5e",
          300: "#f3d692",
        },
        // sanguine — Leonardo's red-chalk; the warm rust of dried ink and anatomy drawings
        leo: {
          600: "#9c3d22",
          500: "#c45a35",
          400: "#dd7d54",
          300: "#efab8a",
        },
        // chalk-cyan — Feynman's blackboard; the cool glow of a physics derivation
        feyn: {
          600: "#1f8a99",
          500: "#3fb4c4",
          400: "#6fd0dd",
          300: "#a6e6ee",
        },
        // steel-iris — Musk's industrial electric; titanium under arc-light
        musk: {
          600: "#4a63b0",
          500: "#6f8fd6",
          400: "#9ab0e6",
          300: "#c2d0f2",
        },
        // warm bone neutrals — text inked on parchment
        ghost: {
          50: "#f7f1e4",
          100: "#ece4d4",
          200: "#cfc4ad",
          300: "#9c9176",
          500: "#6b6250",
          700: "#3a342a",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Spectral"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        zh: ['"Noto Serif SC"', "serif"],
      },
      boxShadow: {
        panel: "inset 0 1px 0 rgba(243,214,146,0.06), 0 24px 60px -28px rgba(0,0,0,0.94)",
        glow: "0 0 40px -8px rgba(214,162,60,0.5)",
        glowleo: "0 0 36px -8px rgba(196,90,53,0.5)",
        glowfeyn: "0 0 36px -8px rgba(63,180,196,0.5)",
        glowmusk: "0 0 36px -8px rgba(111,143,214,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
