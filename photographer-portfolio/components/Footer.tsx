import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-10 bg-noir px-6 py-20 md:py-32 text-center md:px-12">
      <h2 className="font-display text-4xl text-porcelain md:text-6xl">
        Let&apos;s make something timeless.
      </h2>
      <Link
        href="/contact"
        data-cursor-hover
        className="font-sans text-sm uppercase tracking-[0.3em] text-gold transition-opacity hover:opacity-70"
      >
        Start a project &rarr;
      </Link>

      <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 border-t border-porcelain/10 pt-8 font-sans text-[11px] uppercase tracking-[0.25em] text-porcelain/40 md:flex-row">
        <span>&copy; {new Date().getFullYear()} Chasing Light Studio</span>
        <span>Based worldwide</span>
      </div>
    </footer>
  );
}
