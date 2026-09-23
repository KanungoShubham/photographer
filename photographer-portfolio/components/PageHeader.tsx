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
      translateY: [40, 0],
      duration: 900,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="relative flex h-[60vh] w-full items-end overflow-hidden bg-noir">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/20" />

      <div ref={textRef} style={{ opacity: 0 }} className="relative z-10 w-full px-6 pb-16 md:px-12">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl text-porcelain md:text-7xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-lg font-sans text-sm text-porcelain/60">{description}</p>
        )}
      </div>
    </section>
  );
}
