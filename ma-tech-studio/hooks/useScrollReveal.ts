"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

type RevealOptions = {
  delay?: number;
  distance?: number;
  duration?: number;
};

export function useScrollReveal<T extends HTMLElement>({
  delay = 0,
  distance = 40,
  duration = 750,
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
          translateY: [distance, 0],
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
  }, [delay, distance, duration]);

  return ref;
}
