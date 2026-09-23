import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-8 bg-ink px-6 py-24 text-center md:px-12">
      <h2 className="font-display text-4xl italic text-paper md:text-5xl">
        Let&apos;s document your celebration.
      </h2>
      <Link
        href="/contact"
        className="border border-paper px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        Check Availability
      </Link>

      <div className="mt-10 flex w-full flex-col items-center justify-between gap-3 border-t border-paper/15 pt-8 font-sans text-[11px] uppercase tracking-[0.15em] text-paper/40 md:flex-row">
        <span>&copy; {new Date().getFullYear()} Ananya Studios</span>
        <span>Based in India · Available for destination weddings</span>
      </div>
    </footer>
  );
}
