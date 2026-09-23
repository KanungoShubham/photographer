import Link from "next/link";
import GalleryTile from "@/components/GalleryTile";
import { GALLERY } from "@/lib/gallery";

type GalleryGridProps = {
  limit?: number;
  heading?: string;
  cta?: boolean;
};

export default function GalleryGrid({ limit, heading = "From the Album", cta = false }: GalleryGridProps) {
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;

  return (
    <section className="w-full bg-paper px-6 py-20 md:px-12 md:py-28">
      <div className="mb-10 flex items-center gap-3">
        <span className="h-px w-8 bg-crimson" />
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-ink/60">Gallery</p>
      </div>
      <h2 className="mb-10 font-display text-4xl italic text-ink md:text-5xl">{heading}</h2>

      <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {items.map((item, index) => (
          <GalleryTile
            key={item.title}
            index={index}
            className={index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : ""}
            {...item}
          />
        ))}
      </div>

      {cta && (
        <div className="mt-12">
          <Link
            href="/gallery"
            className="font-sans text-xs uppercase tracking-[0.18em] text-ink underline decoration-crimson decoration-2 underline-offset-4 hover:text-crimson"
          >
            View Full Gallery &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
