"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SKILL_GROUPS } from "@/lib/skills";

function SkillGroup({
  group,
  items,
  index,
}: (typeof SKILL_GROUPS)[number] & { index: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ delay: (index % 3) * 90, distance: 24 });

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className="group relative flex flex-col gap-6 border border-line p-8 transition-colors duration-300 hover:border-ink/35 hover:bg-ink/2"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] tabular-nums text-ink/30">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/25">
          {String(items.length).padStart(2, "0")} tools
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold text-ink">{group}</h3>

      <div className="h-px w-full origin-left scale-x-0 bg-ink/20 transition-transform duration-500 group-hover:scale-x-100" />

      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-baseline gap-2.5 font-sans text-sm text-ink/60 transition-colors group-hover:text-ink/80"
          >
            <span className="h-1 w-1 shrink-0 -translate-y-0.5 rounded-full bg-ink/30" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Under the Hood</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            The stack we build with
          </h2>
          <p className="mt-3 font-sans text-sm text-ink/55">
            Real tools we use daily &mdash; not a buzzword list.
          </p>
        </div>
        <p className="font-mono text-xs tabular-nums text-ink/35">
          {String(SKILL_GROUPS.length).padStart(2, "0")} disciplines
        </p>
      </div>

      <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 md:grid-cols-3">
        {SKILL_GROUPS.map((group, index) => (
          <div key={group.group} className="border-b border-r border-line">
            <SkillGroup index={index} {...group} />
          </div>
        ))}
      </div>
    </section>
  );
}
