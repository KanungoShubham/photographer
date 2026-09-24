"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import anime from "animejs";
import CircuitGlow from "@/components/CircuitGlow";
import CodeSnippets from "@/components/CodeSnippets";

const HEADLINE = "Digital Products, Built Better";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const restRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = videoWrapRef.current;
    if (!section || !wrap) return;

    // scroll-linked parallax: the video drifts and scales slightly as the hero leaves view
    let frame: number;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      wrap.style.transform = `scale(${1 + progress * 0.12}) translateY(${progress * 40}px)`;
      wrap.style.opacity = `${1 - progress * 0.5}`;
    };
    const loop = () => {
      onScroll();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    if (!next) videoRef.current.play().catch(() => {});
    setMuted(next);
  };

  useEffect(() => {
    if (!logoRef.current || !wordsRef.current || !restRef.current) return;
    const chars = wordsRef.current.querySelectorAll(".char");

    anime.set(logoRef.current, { opacity: 0, scale: 0.85, translateY: 20 });
    anime.set(chars, { translateY: "110%" });
    anime.set(restRef.current, { opacity: 0, translateY: 16 });

    anime({
      targets: logoRef.current,
      opacity: [0, 1],
      scale: [0.85, 1],
      translateY: [20, 0],
      duration: 900,
      easing: "easeOutExpo",
      complete: () => {
        // continuous idle motion, started only once the entrance has fully settled
        anime({
          targets: logoRef.current,
          translateY: [0, -14, 0],
          duration: 6000,
          easing: "easeInOutSine",
          loop: true,
        });
      },
    });

    anime({
      targets: chars,
      translateY: [110, 0],
      duration: 900,
      delay: anime.stagger(16, { start: 650 }),
      easing: "easeOutExpo",
    });

    anime({
      targets: restRef.current,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      delay: 1200,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:px-12"
    >
      <div ref={videoWrapRef} className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          src="/developer-typing.mp4"
          autoPlay
          muted={muted}
          loop
          playsInline
        />
        {/* cinematic grade: contrast/desaturation grade + vignette + film grain */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/25" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 18vw 4vw rgba(0,0,0,0.85)" }}
        />
        {/* letterbox bars for a widescreen cinematic frame */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] bg-black md:h-[7vh]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] bg-black md:h-[7vh]" />
      </div>

      <CodeSnippets />
      <CircuitGlow />

      <button
        type="button"
        onClick={toggleSound}
        data-cursor={muted ? "Unmute" : "Mute"}
        className="magnetic absolute bottom-8 right-6 z-10 flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink/40 hover:text-ink md:right-12"
      >
        {muted ? "Sound off" : "Sound on"}
      </button>

      <div ref={logoRef} className="relative z-10" style={{ opacity: 0 }}>
        <Image
          src="/brand/logo-mark.png"
          alt="MA Tech Studio"
          width={320}
          height={320}
          priority
          className="h-auto w-[200px] drop-shadow-[0_20px_60px_rgba(59,130,246,0.35)] sm:w-[260px] md:w-[320px]"
        />
      </div>

      <p className="relative z-10 mt-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        Web · Mobile · SaaS · AI
      </p>

      <div ref={wordsRef} className="relative z-10 mt-6 flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-0">
        {HEADLINE.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="flex flex-nowrap">
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} className="overflow-mask">
                <span className="char holo-text font-display text-[10vw] font-bold leading-[1.05] sm:text-[6vw] md:text-[4.2vw]">
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>

      <div ref={restRef} className="relative z-10 mt-8 flex flex-col items-center" style={{ opacity: 0 }}>
        <p className="max-w-lg font-sans text-base text-ink/60">
          We design and build websites, apps, and SaaS products &mdash; and
          ship ready-to-launch templates for founders and photographers who
          need something live now.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#templates"
            data-cursor="Explore"
            className="magnetic rounded-lg bg-gradient-to-r from-cyan via-blue to-violet px-7 py-3 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85"
          >
            Browse Templates
          </a>
          <a
            href="#contact"
            data-cursor="Let's talk"
            className="magnetic rounded-lg border border-line px-7 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-ink/40"
          >
            Start a Custom Build
          </a>
        </div>
      </div>
    </section>
  );
}
