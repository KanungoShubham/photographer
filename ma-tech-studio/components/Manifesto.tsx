"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Manifesto() {
  const ref = useScrollReveal<HTMLDivElement>({ distance: 24, duration: 900 });

  return (
    <section className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div ref={ref} style={{ opacity: 0 }} className="mx-auto max-w-3xl text-center">
        <p className="font-display text-3xl font-semibold leading-snug text-ink md:text-5xl">
          We don&apos;t ship templates.{" "}
          <span className="brand-gradient">We ship businesses.</span>
        </p>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base text-ink/55">
          Every product we build &mdash; whether it&apos;s a $50 template or
          a full platform &mdash; is designed to make someone&apos;s work
          look like it belongs at the top of their industry.
        </p>
      </div>
    </section>
  );
}
