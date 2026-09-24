"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";

type CaseStudyCardProps = {
  name: string;
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  problem: string;
  stack: readonly string[];
  preview: string;
  url: string;
  index?: number;
};

export default function CaseStudyCard({
  name,
  prefix,
  value,
  suffix,
  label,
  problem,
  stack,
  preview,
  url,
  index = 0,
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    const card = cardRef.current;
    const numberEl = numberRef.current;
    if (!card || !numberEl) return;

    anime.set(card, { opacity: 0, scale: 0.94, translateY: 24 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const delay = (index % 4) * 110;

        anime({
          targets: card,
          opacity: [0, 1],
          scale: [0.94, 1],
          translateY: [24, 0],
          duration: 800,
          delay,
          easing: "easeOutExpo",
        });

        const counter = { val: 0 };
        anime({
          targets: counter,
          val: value,
          duration: 1400,
          delay: delay + 200,
          easing: "easeOutExpo",
          update: () => {
            numberEl.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
          },
        });

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, value, prefix, suffix, decimals]);

  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      className="group relative flex h-104 flex-col justify-end overflow-hidden rounded-2xl border border-line"
    >
      <Image
        src={preview}
        alt={`${name} product preview`}
        fill
        sizes="(min-width: 768px) 25vw, 100vw"
        className="cs-image object-cover object-top-left grayscale contrast-125 brightness-75 transition-[filter,transform] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/70 to-void/20" />

      <div className="relative z-10 flex flex-col gap-1 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">{name}</p>

        <span
          ref={numberRef}
          className="font-display text-4xl font-bold leading-none text-ink md:text-5xl"
        >
          {prefix}0{suffix}
        </span>

        <p className="mt-1 font-sans text-sm text-ink/70">{label}</p>

        <p className="mt-3 font-sans text-xs leading-relaxed text-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {problem}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-line/60 pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {stack.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ink/50">
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
