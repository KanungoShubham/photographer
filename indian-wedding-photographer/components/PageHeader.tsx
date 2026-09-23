"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
};

export default function PageHeader({ eyebrow, title, description, image }: PageHeaderProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    anime({
      targets: textRef.current,
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      delay: 150,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="relative flex h-[46vh] w-full items-end overflow-hidden bg-ink">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

      <div ref={textRef} style={{ opacity: 0 }} className="relative z-10 w-full px-6 pb-12 md:px-12">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-paper/60" />
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-paper/80">{eyebrow}</p>
        </div>
        <h1 className="font-display text-5xl italic text-paper md:text-7xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-lg font-sans text-sm text-paper/70">{description}</p>
        )}
      </div>
    </section>
  );
}
