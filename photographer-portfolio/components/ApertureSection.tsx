"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ApertureScene = dynamic(() => import("@/components/ApertureScene"), {
  ssr: false,
});

export default function ApertureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    let frame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;

      progressRef.current = progress;

      const reveal = Math.min(1, progress / 0.6);
      text.style.opacity = String(reveal);
      text.style.transform = `translateY(${(1 - reveal) * 24}px)`;

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] w-full bg-noir">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <ApertureScene progressRef={progressRef} />
        </div>

        <div
          ref={textRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: 0 }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
            The Aperture
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl text-porcelain md:text-6xl">
            Every shot is a decision about light.
          </h2>
        </div>
      </div>
    </section>
  );
}
