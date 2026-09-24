"use client";

import { useEffect, useRef } from "react";

const MAGNETIC_PULL = 0.35;
const MAGNETIC_MAX = 18;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...mouse };
    const ringPos = { ...mouse };
    let ringScale = 1;
    let targetScale = 1;
    let label = "";
    let frame: number;

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.55;
      dotPos.y += (mouse.y - dotPos.y) * 0.55;
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ringScale += (targetScale - ringScale) * 0.18;

      dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ringScale})`;
      ring.textContent = ringScale > 1.4 ? label : "";

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const interactiveSelector = "a, button, [data-cursor]";

    const handleEnter = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      targetScale = 2.2;
      label = el.getAttribute("data-cursor") || "";
      ring.style.borderColor = "var(--color-cyan)";
    };
    const handleLeave = () => {
      targetScale = 1;
      label = "";
      ring.style.borderColor = "var(--color-violet)";
    };

    const interactive = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector));
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // magnetic pull for elements opting in via className="magnetic"
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const magneticHandlers = magnetic.map((el) => {
      const onMagMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        const offsetX = Math.max(Math.min(relX * MAGNETIC_PULL, MAGNETIC_MAX), -MAGNETIC_MAX);
        const offsetY = Math.max(Math.min(relY * MAGNETIC_PULL, MAGNETIC_MAX), -MAGNETIC_MAX);
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      };
      const onMagLeave = () => {
        el.style.transform = "translate(0, 0)";
      };
      el.addEventListener("mousemove", onMagMove);
      el.addEventListener("mouseleave", onMagLeave);
      return { el, onMagMove, onMagLeave };
    });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      magneticHandlers.forEach(({ el, onMagMove, onMagLeave }) => {
        el.removeEventListener("mousemove", onMagMove);
        el.removeEventListener("mouseleave", onMagLeave);
        el.style.transform = "";
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cyber-cursor-dot" />
      <div ref={ringRef} className="cyber-cursor-ring" />
    </>
  );
}
