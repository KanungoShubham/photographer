"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export type Package = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default function PricingCard({ name, price, description, features, index = 0 }: Package & { index?: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ delay: index * 120 });

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className="flex flex-col gap-6 border border-porcelain/10 p-8 transition-colors hover:border-gold/50"
    >
      <h3 className="font-display text-2xl text-porcelain">{name}</h3>
      <p className="font-display text-3xl text-gold">{price}</p>
      <p className="font-sans text-sm text-porcelain/60">{description}</p>
      <ul className="flex flex-col gap-2 border-t border-porcelain/10 pt-6">
        {features.map((feature) => (
          <li key={feature} className="font-sans text-xs uppercase tracking-[0.15em] text-porcelain/50">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
