"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";

const HEADLINE = "CHASING LIGHT";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordsRef.current || !bgRef.current) return;

    const chars = wordsRef.current.querySelectorAll(".char");

    anime.set(chars, { translateY: "110%" });
    anime.set(bgRef.current, { scale: 1.15, opacity: 0 });

    anime({
      targets: chars,
      translateY: [110, 0],
      duration: 1100,
      delay: anime.stagger(35, { start: 300 }),
      easing: "easeOutExpo",
    });

    anime({
      targets: bgRef.current,
      scale: [1.15, 1],
      opacity: [0, 0.9],
      duration: 1800,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden bg-noir">
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/10 to-noir" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div ref={wordsRef} className="flex flex-wrap justify-center gap-x-[0.2em]">
          {HEADLINE.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="flex flex-nowrap">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="overflow-mask">
                  <span className="char font-display text-[13vw] font-semibold leading-[0.95] tracking-tight text-porcelain sm:text-[9vw] md:text-[7.5vw]">
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-md font-sans text-xs uppercase tracking-[0.35em] text-porcelain/60">
          A photographic study in shadow, form, and stillness
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-porcelain/50">
        Scroll
      </div>
    </section>
  );
}
