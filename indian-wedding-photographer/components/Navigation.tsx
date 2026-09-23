"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import anime from "animejs";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Weddings", href: "/weddings" },
  { label: "About", href: "/about" },
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
      anime({ targets: overlayRef.current, opacity: [0, 1], duration: 350, easing: "easeOutExpo" });
      anime.set(items, { translateY: 24, opacity: 0 });
      anime({
        targets: items,
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(60, { start: 120 }),
        duration: 500,
        easing: "easeOutExpo",
      });
    } else {
      anime({ targets: overlayRef.current, opacity: 0, duration: 200, easing: "easeOutExpo" });
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-paper px-6 py-4 md:px-12">
        <Link href="/" className="font-display text-xl uppercase italic tracking-tight text-ink">
          Ananya Studios
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-crimson ${
                pathname === link.href ? "text-crimson" : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-crimson md:hidden"
        >
          Menu
        </button>
      </header>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-paper opacity-0 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-6 top-5 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-crimson"
        >
          Close
        </button>

        <div ref={linksRef} className="flex flex-col items-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={`menu-link font-display text-4xl italic transition-colors hover:text-crimson ${
                pathname === link.href ? "text-crimson" : "text-ink"
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
