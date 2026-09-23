"use client";

import { useState } from "react";
import Image from "next/image";
import { FUNCTIONS } from "@/lib/functions";

export default function FunctionsTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-crimson" />
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-ink/60">
              The Full Celebration
            </p>
          </div>
          <h2 className="font-display text-4xl italic text-ink md:text-5xl">
            Five Functions, One Story
          </h2>
        </div>
        <p className="hidden font-sans text-xs tabular-nums text-ink/40 md:block">
          {String(active + 1).padStart(2, "0")} / {String(FUNCTIONS.length).padStart(2, "0")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:sticky md:top-24 md:order-2">
          {FUNCTIONS.map((fn, index) => (
            <Image
              key={fn.name}
              src={fn.image}
              alt={fn.name}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="flex flex-col md:order-1">
          {FUNCTIONS.map((fn, index) => (
            <button
              key={fn.name}
              type="button"
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className="group flex items-start justify-between gap-6 border-t border-line py-7 text-left transition-colors first:border-t-0 hover:bg-ink/[0.02] md:px-2"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-sans text-xs tabular-nums text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-3xl italic transition-colors md:text-4xl ${
                    active === index ? "text-crimson" : "text-ink"
                  }`}
                >
                  {fn.name}
                </span>
              </div>
              <p className="hidden max-w-[14rem] shrink-0 text-right font-sans text-xs leading-relaxed text-ink/50 md:block">
                {fn.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
