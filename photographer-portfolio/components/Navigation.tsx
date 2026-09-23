"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import anime from "animejs";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;
    const items = linksRef.current.querySelectorAll(".menu-link");

    anime.remove(overlayRef.current);
    anime.remove(items);

    if (open) {
      anime({
        targets: overlayRef.current,
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutExpo",
      });
      anime.set(items, { translateY: 40, opacity: 0 });
      anime({
        targets: items,
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(80, { start: 200 }),
        duration: 700,
        easing: "easeOutExpo",
      });
    } else {
      anime({
        targets: overlayRef.current,
        opacity: 0,
        duration: 300,
        easing: "easeOutExpo",
      });
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.2em] text-porcelain"
          data-cursor-hover
        >
          C.LIGHT
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor-hover
          className="font-sans text-xs uppercase tracking-[0.3em] text-porcelain/80 transition-colors hover:text-gold"
        >
          Menu
        </button>
      </header>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-noir opacity-0 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={close}
          data-cursor-hover
          className="absolute right-6 top-6 font-sans text-xs uppercase tracking-[0.3em] text-porcelain/80 transition-colors hover:text-gold md:right-12 md:top-6"
        >
          Close
        </button>

        <div ref={linksRef} className="flex flex-col items-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              data-cursor-hover
              className={`menu-link font-display text-4xl transition-colors hover:text-gold md:text-6xl ${
                pathname === link.href ? "text-gold" : "text-porcelain"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
