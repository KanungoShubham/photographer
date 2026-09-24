"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const SNIPPETS = [
  { text: "const model = await loadModel();\nmodel.predict(input);", top: "14%", left: "4%" },
  { text: "export function deploy() {\n  return build().then(ship);\n}", top: "62%", left: "2%" },
  { text: "POST /api/v1/generate\n{ prompt, stream: true }", top: "20%", left: "78%" },
  { text: "useEffect(() => {\n  sync();\n}, [state]);", top: "68%", left: "80%" },
];

export default function CodeSnippets() {
  const refs = useRef<(HTMLPreElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      anime.set(el, { opacity: 0 });
      anime({
        targets: el,
        opacity: [0, 0.35, 0.35, 0],
        translateY: [0, -16],
        duration: 6000,
        delay: 800 + i * 1400,
        easing: "easeInOutSine",
        loop: true,
      });
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {SNIPPETS.map((s, i) => (
        <pre
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute font-mono text-[11px] leading-relaxed text-ink/50"
          style={{ top: s.top, left: s.left }}
        >
          {s.text}
        </pre>
      ))}
    </div>
  );
}
