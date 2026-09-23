import Link from "next/link";
import TiltCard, { type WorkItem } from "@/components/TiltCard";
import { WORKS } from "@/lib/works";

type WorksGridProps = {
  limit?: number;
  heading?: string;
  description?: string;
  cta?: boolean;
};

export default function WorksGrid({
  limit,
  heading = "Selected Works",
  description = "Editorial, fashion, and cinematic architecture — a decade of chasing available light.",
  cta = false,
}: WorksGridProps) {
  const items: WorkItem[] = limit ? WORKS.slice(0, limit) : WORKS;

  return (
    <section className="w-full bg-noir px-6 py-20 md:py-32 md:px-12">
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-4xl text-porcelain md:text-5xl">{heading}</h2>
        <p className="max-w-sm font-sans text-sm text-porcelain/50">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((work, index) => (
          <TiltCard key={work.title} index={index} {...work} />
        ))}
      </div>

      {cta && (
        <div className="mt-16 flex justify-center">
          <Link
            href="/gallery"
            data-cursor-hover
            className="font-sans text-xs uppercase tracking-[0.3em] text-gold transition-opacity hover:opacity-70"
          >
            View Full Gallery &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
