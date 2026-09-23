"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
      easing: "easeOutQuad",
    });
  }, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <section className="w-full bg-ink px-6 py-24 text-center md:px-12 md:py-32">
      <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-paper/50">Kind Words</p>

      <div ref={cardRef} className="mx-auto mt-8 max-w-2xl" style={{ opacity: 0 }}>
        <p className="font-display text-3xl italic leading-relaxed text-paper md:text-4xl">
          &ldquo;{current.quote}&rdquo;
        </p>
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-crimson">
          {current.name}
        </p>
        <p className="mt-1 font-sans text-xs text-paper/40">{current.detail}</p>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-crimson" : "bg-paper/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
