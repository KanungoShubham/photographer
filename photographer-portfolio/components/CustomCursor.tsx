"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };

    let frame: number;
    const render = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const handleMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const handleOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(HOVER_SELECTOR);
      if (target) {
        anime({
          targets: ring,
          scale: 2.4,
          duration: 350,
          easing: "easeOutExpo",
        });
        ring.style.mixBlendMode = "difference";
        anime({ targets: dot, scale: 0, duration: 200, easing: "easeOutExpo" });
      }
    };

    const handleOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(HOVER_SELECTOR);
      if (target) {
        anime({ targets: ring, scale: 1, duration: 350, easing: "easeOutExpo" });
        ring.style.mixBlendMode = "normal";
        anime({ targets: dot, scale: 1, duration: 200, easing: "easeOutExpo" });
      }
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-gold will-change-transform"
      />
    </div>
  );
}
