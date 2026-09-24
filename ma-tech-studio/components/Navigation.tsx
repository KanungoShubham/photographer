"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import anime from "animejs";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Templates", href: "#templates" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const navItems = headerRef.current.querySelectorAll(".nav-item");
    anime.set(headerRef.current, { translateY: -24, opacity: 0 });
    anime.set(navItems, { opacity: 0, translateY: -8 });

    anime({
      targets: headerRef.current,
      translateY: 0,
      opacity: 1,
      duration: 700,
      easing: "easeOutExpo",
    });

    anime({
      targets: navItems,
      translateY: 0,
      opacity: 1,
      delay: anime.stagger(60, { start: 250 }),
      duration: 500,
      easing: "easeOutExpo",
    });
  }, []);

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
      <header
        ref={headerRef}
        style={{ opacity: 0 }}
        className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-paper/85 px-6 py-4 backdrop-blur md:px-12"
      >
        <Link href="/" className="nav-item magnetic flex items-center gap-2.5">
          <Image src="/brand/logo-mark.png" alt="MA Tech Studio" width={28} height={28} />
          <span className="font-display text-base font-bold tracking-tight text-ink">
            MA <span className="text-ink/60">Tech Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="Go"
              className="nav-item magnetic font-sans text-sm text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor="Let's talk"
          className="nav-item magnetic hidden rounded-lg bg-gradient-to-r from-cyan via-blue to-violet px-5 py-2.5 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85 md:inline-block"
        >
          Start a Project
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="nav-item font-sans text-sm text-ink/70 hover:text-ink md:hidden"
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
          className="absolute right-6 top-5 font-sans text-sm text-ink/70 hover:text-ink"
        >
          Close
        </button>

        <div ref={linksRef} className="flex flex-col items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="menu-link font-display text-3xl font-semibold text-ink hover:text-blue"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="menu-link mt-4 rounded-lg bg-gradient-to-r from-cyan via-blue to-violet px-6 py-3 font-sans text-sm font-semibold text-paper"
          >
            Start a Project
          </a>
        </div>
      </div>
    </>
  );
}
