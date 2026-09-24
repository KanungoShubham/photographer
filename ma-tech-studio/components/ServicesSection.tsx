"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import ServiceImageScene from "@/components/ServiceImageScene";
import { SERVICES } from "@/lib/services";

const SERVICE_IMAGES = SERVICES.map((service) => service.image);

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!captionRef.current) return;
    anime({
      targets: captionRef.current,
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 520,
      easing: "easeOutQuart",
    });
  }, [active]);

  return (
    <section id="services" className="w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mb-14 flex items-end justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">What We Do</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Full-stack product studio
          </h2>
        </div>
        <p className="hidden font-mono text-xs tabular-nums text-ink/40 md:block">
          {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <button
              key={service.name}
              type="button"
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className="group flex items-center justify-between gap-4 border-t border-line py-6 text-left transition-colors first:border-t-0 hover:bg-ink/[0.02]"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs tabular-nums text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-2xl font-semibold transition-colors md:text-3xl ${
                    active === index ? "brand-gradient" : "text-ink"
                  }`}
                >
                  {service.name}
                </span>
              </div>
              <span
                className={`shrink-0 text-cyan transition-opacity ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              >
                &rarr;
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl border border-line bg-void p-10">
          <ServiceImageScene images={[...SERVICE_IMAGES]} active={active} />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/25 to-void/10" />
          <div ref={captionRef} className="relative z-10">
            <h3 className="holo-text font-display text-2xl font-semibold">{current.name}</h3>
            <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-ink/70">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
