"use client";

import { useEffect } from "react";
import Image from "next/image";
import anime from "animejs";
import { useCardTilt } from "@/hooks/useCardTilt";

export type WorkItem = {
  title: string;
  category: string;
  image: string;
};

type TiltCardProps = WorkItem & { index?: number };

export default function TiltCard({ title, category, image, index = 0 }: TiltCardProps) {
  const { wrapperRef, imageRef } = useCardTilt<HTMLDivElement>();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [64, 0],
          scale: [0.96, 1],
          duration: 900,
          delay: (index % 6) * 90,
          easing: "easeOutExpo",
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      data-cursor-hover
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-noir [perspective:1000px] will-change-transform"
      style={{ transformStyle: "preserve-3d", opacity: 0 }}
    >
      <div ref={imageRef} className="absolute inset-[-6%] will-change-transform">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />

      <div className="pointer-events-none absolute bottom-6 left-6 [transform:translateZ(40px)]">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
          {category}
        </p>
        <h3 className="mt-1 font-display text-2xl text-porcelain">{title}</h3>
      </div>
    </div>
  );
}
