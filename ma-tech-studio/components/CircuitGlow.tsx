"use client";

const LINES = [
  { x2: 40, y2: -110, delay: 0 },
  { x2: -150, y2: -60, delay: 0.3 },
  { x2: 160, y2: -40, delay: 0.6 },
  { x2: -120, y2: 90, delay: 0.9 },
  { x2: 130, y2: 100, delay: 1.2 },
  { x2: 0, y2: 140, delay: 1.5 },
];

export default function CircuitGlow() {
  return (
    <svg
      viewBox="-200 -160 400 320"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-70"
    >
      {LINES.map((line, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={0}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--color-blue)"
            strokeWidth={1}
            strokeDasharray="4 5"
            className="mock-flow-line"
            style={{ animationDelay: `${line.delay}s` }}
            opacity={0.5}
          />
          <circle cx={line.x2} cy={line.y2} r={4} fill="var(--color-cyan)" className="mock-dot" style={{ animationDelay: `${line.delay}s` }} />
        </g>
      ))}
    </svg>
  );
}
