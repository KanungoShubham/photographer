"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const MAX_ROTATE = 12;
const MAX_SHIFT = 24;

export function useCardTilt<T extends HTMLElement>() {
  const wrapperRef = useRef<T | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;
    if (!wrapper || !image) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      anime({
        targets: wrapper,
        rotateX: -py * MAX_ROTATE * 2,
        rotateY: px * MAX_ROTATE * 2,
        duration: 400,
        easing: "easeOutQuad",
      });

      anime({
        targets: image,
        translateX: -px * MAX_SHIFT,
        translateY: -py * MAX_SHIFT,
        duration: 400,
        easing: "easeOutQuad",
      });
    };

    const handleLeave = () => {
      anime({
        targets: wrapper,
        rotateX: 0,
        rotateY: 0,
        duration: 500,
        easing: "easeOutExpo",
      });
      anime({
        targets: image,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: "easeOutExpo",
      });
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
      anime.remove(wrapper);
      anime.remove(image);
    };
  }, []);

  return { wrapperRef, imageRef };
}
