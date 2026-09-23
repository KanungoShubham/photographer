"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { GalleryItem } from "@/lib/gallery";

export default function GalleryTile({
  title,
  category,
  image,
  index = 0,
  className = "",
}: GalleryItem & { index?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>({ delay: (index % 4) * 70, distanceY: 28 });

  return (
    <div ref={ref} style={{ opacity: 0 }} className={`group relative aspect-square w-full overflow-hidden ${className}`}>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 768px) 35vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40" />
      <div className="pointer-events-none absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-crimson">{category}</p>
        <p className="font-display text-lg italic text-paper">{title}</p>
      </div>
    </div>
  );
}
