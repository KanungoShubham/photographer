"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import anime from "animejs";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current) return;

    document.body.style.overflow = "hidden";

    anime.set(logoRef.current, { scale: 0.4, opacity: 0, rotate: -20 });

    anime({
      targets: logoRef.current,
      scale: [0.4, 1],
      opacity: [0, 1],
      rotate: [-20, 0],
      duration: 850,
      easing: "easeOutElastic(1, 0.6)",
      complete: () => {
        anime({
          targets: logoRef.current,
          scale: 1.08,
          duration: 350,
          delay: 250,
          direction: "alternate",
          easing: "easeInOutSine",
          complete: () => {
            if (!overlayRef.current) return;
            anime({
              targets: overlayRef.current,
              opacity: 0,
              duration: 500,
              easing: "easeInOutQuad",
              complete: () => {
                document.body.style.overflow = "";
                setVisible(false);
              },
            });
          },
        });
      },
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
    >
      <div ref={logoRef}>
        <Image src="/brand/logo-mark.png" alt="MA Tech Studio" width={96} height={96} priority />
      </div>
    </div>
  );
}
