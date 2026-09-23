"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  { image: "/images/showcase-1.jpg", focal: "35mm", shutter: "1/250s", iso: "200", title: "Northbound" },
  { image: "/images/showcase-2.jpg", focal: "85mm", shutter: "1/125s", iso: "100", title: "Glass & Silence" },
  { image: "/images/showcase-3.jpg", focal: "50mm", shutter: "1/500s", iso: "400", title: "Amber Hour" },
  { image: "/images/showcase-4.jpg", focal: "24mm", shutter: "1/60s", iso: "800", title: "Concrete Bloom" },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const distance = track.scrollWidth - section.clientWidth;
    if (distance <= 0) return;

    const tween = gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance}`,
        scrub: true,
        pin: !isTouch,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="relative w-full overflow-hidden bg-noir">
      <div ref={trackRef} className="flex h-[100vh] w-max will-change-transform">
        {PANELS.map((panel) => (
          <div
            key={panel.title}
            className="relative flex h-full w-[100vw] shrink-0 items-end"
          >
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />

            <div className="relative z-10 flex w-full items-end justify-between px-6 pb-16 md:px-16">
              <h3 className="font-display text-3xl text-porcelain md:text-5xl">
                {panel.title}
              </h3>
              <dl className="hidden grid-cols-3 gap-8 font-sans text-xs uppercase tracking-[0.25em] text-porcelain/60 sm:grid">
                <div>
                  <dt className="text-gold">Focal</dt>
                  <dd className="mt-1">{panel.focal}</dd>
                </div>
                <div>
                  <dt className="text-gold">Shutter</dt>
                  <dd className="mt-1">{panel.shutter}</dd>
                </div>
                <div>
                  <dt className="text-gold">ISO</dt>
                  <dd className="mt-1">{panel.iso}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
