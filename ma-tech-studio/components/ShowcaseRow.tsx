"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ReactNode } from "react";

export default function ShowcaseRow({
  index,
  image,
  imageAlt,
  children,
}: {
  index: number;
  image: string;
  imageAlt: string;
  children: ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;

  useEffect(() => {
    const row = rowRef.current;
    const imageWrap = imageWrapRef.current;
    const text = textRef.current;
    if (!row || !imageWrap || !text) return;

    let frame: number;
    const tick = () => {
      const rect = row.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 → row's top just entering from the bottom, 1 → fully revealed.
      // Fixed reveal distance (not tied to row height) so tall stacked-mobile
      // rows still finish revealing instead of staying stuck near-invisible.
      const revealDistance = Math.min(vh, 640);
      const raw = (vh - rect.top) / revealDistance;
      const progress = Math.min(Math.max(raw, 0), 1);
      const wipe = Math.min(Math.max(progress * 2.2, 0), 1);

      imageWrap.style.clipPath = `inset(0 ${(1 - wipe) * 100}% 0 0)`;
      imageWrap.style.transform = `scale(${1.08 - progress * 0.08}) translateY(${(1 - progress) * 30}px)`;

      text.style.opacity = `${Math.min(progress * 1.6, 1)}`;
      text.style.transform = `translateX(${(1 - Math.min(progress * 1.6, 1)) * (reversed ? -32 : 32)}px)`;

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reversed]);

  return (
    <div
      ref={rowRef}
      className={`flex flex-col items-center gap-10 border-b border-line py-16 md:gap-14 md:py-20 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="group h-72 w-full overflow-hidden md:h-[32rem] md:w-1/2">
        <div ref={imageWrapRef} className="relative h-full w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top-left transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div ref={textRef} className="w-full md:w-1/2">
        {children}
      </div>
    </div>
  );
}
