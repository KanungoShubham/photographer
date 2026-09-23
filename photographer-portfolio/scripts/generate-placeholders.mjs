import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

// Deterministic pseudo-random so re-runs are stable.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function svgPlaceholder({
  seed,
  width,
  height,
  tone = "neutral", // neutral | gold | warm
  label,
}) {
  const rand = mulberry32(seed);
  const id = `g${seed}`;
  const grainId = `n${seed}`;

  const dark = "#0c0c0c";
  const mid = tone === "gold" ? "#3a3226" : tone === "warm" ? "#2a2422" : "#1c1c1c";
  const light = tone === "gold" ? "#8a7638" : tone === "warm" ? "#5c4f3e" : "#4a4a4a";

  // A handful of soft blurred "light" blobs to fake photographic depth.
  const blobs = Array.from({ length: 4 }, () => {
    const cx = rand() * width;
    const cy = rand() * height;
    const r = width * (0.18 + rand() * 0.22);
    const opacity = 0.12 + rand() * 0.18;
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(
      0
    )}" r="${r.toFixed(0)}" fill="${light}" opacity="${opacity.toFixed(2)}" />`;
  }).join("\n      ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${dark}" />
      <stop offset="55%" stop-color="${mid}" />
      <stop offset="100%" stop-color="${dark}" />
    </linearGradient>
    <filter id="${grainId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" seed="${seed}" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
    </filter>
    <radialGradient id="vig${seed}" cx="50%" cy="50%" r="75%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id})" />
  <g filter="blur(${Math.round(width * 0.05)}px)">
      ${blobs}
  </g>
  <rect width="${width}" height="${height}" filter="url(#${grainId})" />
  <rect width="${width}" height="${height}" fill="url(#vig${seed})" />
  ${
    label
      ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, serif" font-size="${Math.round(
          width * 0.035
        )}" fill="#ffffff" opacity="0.06" letter-spacing="8">${label}</text>`
      : ""
  }
</svg>`;
}

const assets = [
  { name: "hero", seed: 1, width: 1920, height: 1080, tone: "neutral", label: "CHASING LIGHT" },
  { name: "grid-editorial-1", seed: 11, width: 1200, height: 1500, tone: "neutral", label: "EDITORIAL" },
  { name: "grid-editorial-2", seed: 12, width: 1200, height: 900, tone: "warm", label: "EDITORIAL" },
  { name: "grid-fashion-1", seed: 21, width: 1200, height: 1600, tone: "gold", label: "FASHION" },
  { name: "grid-fashion-2", seed: 22, width: 1200, height: 900, tone: "neutral", label: "FASHION" },
  { name: "grid-architecture-1", seed: 31, width: 1200, height: 1500, tone: "neutral", label: "ARCHITECTURE" },
  { name: "grid-architecture-2", seed: 32, width: 1200, height: 900, tone: "warm", label: "ARCHITECTURE" },
  { name: "grid-editorial-3", seed: 13, width: 1200, height: 1500, tone: "gold", label: "EDITORIAL" },
  { name: "showcase-1", seed: 41, width: 2400, height: 1350, tone: "neutral" },
  { name: "showcase-2", seed: 42, width: 2400, height: 1350, tone: "warm" },
  { name: "showcase-3", seed: 43, width: 2400, height: 1350, tone: "gold" },
  { name: "showcase-4", seed: 44, width: 2400, height: 1350, tone: "neutral" },
];

for (const asset of assets) {
  const svg = svgPlaceholder(asset);
  writeFileSync(path.join(outDir, `${asset.name}.svg`), svg, "utf8");
}

console.log(`Generated ${assets.length} placeholder images in ${outDir}`);
