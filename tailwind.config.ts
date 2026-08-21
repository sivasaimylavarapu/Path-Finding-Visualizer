import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dsa: {
          darkest: "#050811",
          navy: "#0a0f1d",
          navyCard: "#0f172a",
          navyBorder: "#1e293b",
          cyan: "#06b6d4",
          cyanGlow: "#22d3ee",
          indigo: "#6366f1",
          purple: "#8b5cf6",
          violet: "#a855f7",
          start: "#10b981",
          target: "#f43f5e",
          wall: "#1e293b",
          weight: "#eab308",
          visited: "#38bdf8",
          path: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 3s ease-in-out infinite alternate",
        "node-pop": "nodePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "path-pop": "pathPop 0.4s ease-out forwards",
        "border-beam": "borderBeam 6s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(35px)" },
        },
        nodePop: {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "70%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pathPop: {
          "0%": { transform: "scale(0.5)", backgroundColor: "#f59e0b" },
          "50%": { transform: "scale(1.2)", backgroundColor: "#ec4899" },
          "100%": { transform: "scale(1)", backgroundColor: "#06b6d4" },
        },
        borderBeam: {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(6, 182, 212, 0.3)",
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "glow-start": "0 0 20px -2px rgba(16, 185, 129, 0.5)",
        "glow-target": "0 0 20px -2px rgba(244, 63, 94, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
