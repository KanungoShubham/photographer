"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

type RevealOptions = {
  delay?: number;
  distanceX?: number;
  distanceY?: number;
  duration?: number;
};

export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  distanceX = 0,
  distanceY = 48,
  duration = 800,
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: el,
          opacity: [0, 1],
          translateX: [distanceX, 0],
          translateY: [distanceY, 0],
          duration,
          delay,
          easing: "easeOutExpo",
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, distanceX, distanceY, duration]);

  return ref;
}
