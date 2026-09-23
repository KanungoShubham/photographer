import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function svgPlaceholder({ seed, width, height, tone = "rose", label }) {
  const rand = mulberry32(seed);
  const id = `g${seed}`;
  const grainId = `n${seed}`;

  const palettes = {
    rose: { dark: "#0a0a0d", mid: "#3a1428", light: "#e8447e" },
    marigold: { dark: "#0a0a0d", mid: "#3a260c", light: "#ffab2e" },
    violet: { dark: "#0a0a0d", mid: "#241a3a", light: "#8a5cf6" },
  };
  const { dark, mid, light } = palettes[tone] ?? palettes.rose;

  const blobs = Array.from({ length: 4 }, () => {
    const cx = rand() * width;
    const cy = rand() * height;
    const r = width * (0.18 + rand() * 0.22);
    const opacity = 0.16 + rand() * 0.22;
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
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
    </filter>
    <radialGradient id="vig${seed}" cx="50%" cy="50%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.5" />
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
          width * 0.04
        )}" fill="#ffffff" opacity="0.08" letter-spacing="6">${label}</text>`
      : ""
  }
</svg>`;
}

const assets = [
  { name: "hero", seed: 101, width: 1920, height: 1080, tone: "rose", label: "WEDDING" },
  { name: "grid-haldi-1", seed: 111, width: 1200, height: 1200, tone: "marigold", label: "HALDI" },
  { name: "grid-mehendi-1", seed: 121, width: 1200, height: 1200, tone: "rose", label: "MEHENDI" },
  { name: "grid-sangeet-1", seed: 131, width: 1200, height: 1200, tone: "violet", label: "SANGEET" },
  { name: "grid-wedding-1", seed: 141, width: 1200, height: 1200, tone: "rose", label: "WEDDING" },
  { name: "grid-wedding-2", seed: 142, width: 1200, height: 1200, tone: "marigold", label: "WEDDING" },
  { name: "grid-reception-1", seed: 151, width: 1200, height: 1200, tone: "violet", label: "RECEPTION" },
  { name: "grid-portrait-1", seed: 161, width: 1200, height: 1200, tone: "marigold", label: "PORTRAITS" },
  { name: "timeline-haldi", seed: 211, width: 900, height: 1100, tone: "marigold", label: "HALDI" },
  { name: "timeline-mehendi", seed: 212, width: 900, height: 1100, tone: "rose", label: "MEHENDI" },
  { name: "timeline-sangeet", seed: 213, width: 900, height: 1100, tone: "violet", label: "SANGEET" },
  { name: "timeline-wedding", seed: 214, width: 900, height: 1100, tone: "rose", label: "PHERE" },
  { name: "timeline-reception", seed: 215, width: 900, height: 1100, tone: "marigold", label: "RECEPTION" },
  { name: "about-portrait", seed: 301, width: 1200, height: 1500, tone: "violet", label: "STUDIO" },
];

for (const asset of assets) {
  const svg = svgPlaceholder(asset);
  writeFileSync(path.join(outDir, `${asset.name}.svg`), svg, "utf8");
}

console.log(`Generated ${assets.length} placeholder images in ${outDir}`);
