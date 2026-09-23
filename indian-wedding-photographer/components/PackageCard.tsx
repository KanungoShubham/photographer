"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export type Package = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export default function PackageCard({ name, price, description, features, highlight = false, index = 0 }: Package & { index?: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ delay: index * 100 });

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className={`flex flex-col gap-5 border p-8 ${
        highlight ? "border-crimson" : "border-line"
      }`}
    >
      {highlight && (
        <span className="w-fit border border-crimson px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-crimson">
          Most Booked
        </span>
      )}
      <h3 className="font-display text-2xl italic text-ink">{name}</h3>
      <p className="font-display text-3xl text-crimson">{price}</p>
      <p className="font-sans text-sm text-ink/60">{description}</p>
      <ul className="flex flex-col gap-2 border-t border-line pt-5">
        {features.map((feature) => (
          <li key={feature} className="font-sans text-xs uppercase tracking-[0.1em] text-ink/50">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
