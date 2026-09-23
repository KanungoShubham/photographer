"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";

const HEADLINE = "Every Function, Every Emotion";

export default function Hero() {
  const wordsRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordsRef.current) return;
    const chars = wordsRef.current.querySelectorAll(".char");

    anime.set(chars, { translateY: "110%" });
    if (kickerRef.current) anime.set(kickerRef.current, { opacity: 0 });

    anime({
      targets: chars,
      translateY: [110, 0],
      duration: 900,
      delay: anime.stagger(18, { start: 200 }),
      easing: "easeOutExpo",
    });

    if (kickerRef.current) {
      anime({ targets: kickerRef.current, opacity: [0, 1], duration: 700, delay: 700, easing: "easeOutExpo" });
    }
  }, []);

  return (
    <section className="relative flex h-[92vh] w-full items-end overflow-hidden bg-ink">
      <Image
        src="/images/hero.jpg"
        alt="Wedding photography"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

      <div className="relative z-10 w-full px-6 pb-14 md:px-12 md:pb-16">
        <div ref={kickerRef} className="mb-4 flex items-center gap-3" style={{ opacity: 0 }}>
          <span className="h-px w-8 bg-paper/60" />
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-paper/80">
            Wedding &amp; Function Photography — India
          </p>
        </div>

        <div ref={wordsRef} className="flex flex-wrap gap-x-4 gap-y-0">
          {HEADLINE.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="flex flex-nowrap">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="overflow-mask">
                  <span className="char font-display text-[13vw] italic leading-[0.95] text-paper sm:text-[8vw] md:text-[5.4vw]">
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-paper/20 pt-6">
          <p className="max-w-md font-sans text-sm text-paper/70">
            From Haldi to Reception — candid, colour-true coverage of every
            function, documented as it happens.
          </p>
          <div className="flex gap-6">
            <a
              href="/weddings"
              className="border border-paper px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              See Packages
            </a>
            <a
              href="/gallery"
              className="font-sans text-xs uppercase tracking-[0.18em] text-paper underline decoration-crimson decoration-2 underline-offset-4 hover:text-crimson"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
