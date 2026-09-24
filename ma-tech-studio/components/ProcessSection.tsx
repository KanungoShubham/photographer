"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    name: "Brief",
    description: "Tell us what you need built and who it's for.",
    icon: (
      <path
        d="M8 4h10l6 6v18H8V4Z M18 4v6h6M13 17h8M13 21h8M13 13h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    step: "02",
    name: "Design",
    description: "We design the interface and confirm direction with you.",
    icon: (
      <path
        d="M6 26 22 10l4 4L10 30H6v-4Z M19 13l4 4 M6 6h6M6 10h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    step: "03",
    name: "Build",
    description: "We build it in production-ready code, not a mockup.",
    icon: (
      <path
        d="M12 10 4 18l8 8 M22 10l8 8-8 8 M19 7l-4 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    step: "04",
    name: "Launch",
    description: "Deployed, tested, and handed over — ready to use.",
    icon: (
      <path
        d="M18 4c5 3 8 8 8 14 0 3-1 6-2 8l-3-2 1-4c-1-3-2-5-4-7-2 2-3 4-4 7l1 4-3 2c-1-2-2-5-2-8 0-6 3-11 8-14Z M14 26l-3 5 M22 26l3 5 M16 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

function StepNode({
  step,
  name,
  description,
  icon,
  index,
  active,
}: (typeof STEPS)[number] & { index: number; active: boolean }) {
  return (
    <div
      className="group relative flex flex-1 flex-col items-center gap-4 text-center transition-all duration-500"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 160}ms`,
      }}
    >
      {/* viewfinder frame — icon slowly zooms like a camera holding on the shot */}
      <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-300 group-hover:border-ink/50">
        <div className="absolute inset-0 flex items-center justify-center text-ink/60 transition-colors duration-300 group-hover:text-ink">
          <svg viewBox="0 0 36 36" className="process-frame-zoom h-14 w-14">
            {icon}
          </svg>
        </div>

        {/* corner brackets */}
        <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l border-t border-ink/25" />
        <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r border-t border-ink/25" />
        <span className="absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b border-l border-ink/25" />
        <span className="absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b border-r border-ink/25" />

        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-sm bg-void/80 px-1.5 font-mono text-[9px] tabular-nums text-ink/50">
          {step}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{name}</h3>
      <p className="max-w-56 font-sans text-sm text-ink/55">{description}</p>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div className="mb-16 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">How It Works</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          From brief to launch
        </h2>
      </div>

      <div className="relative">
        {/* flowchart connector line — hand-drawn on scroll into view */}
        <svg
          className="pointer-events-none absolute left-0 top-10 hidden h-px w-full md:block"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <path
            ref={lineRef}
            d="M12 0.5 H88"
            stroke="currentColor"
            strokeWidth="1"
            className="text-line"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={active ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.65,0,0.35,1)" }}
          />
        </svg>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, index) => (
            <StepNode key={step.step} index={index} active={active} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
