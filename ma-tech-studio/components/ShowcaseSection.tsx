"use client";

import { useState } from "react";
import ShowcaseRow from "@/components/ShowcaseRow";
import { TEMPLATES } from "@/lib/templates";
import { WORK } from "@/lib/work";

const INITIAL_WORK_COUNT = 3;

export default function ShowcaseSection() {
  const [showAllWork, setShowAllWork] = useState(false);
  const visibleWork = showAllWork ? WORK : WORK.slice(0, INITIAL_WORK_COUNT);
  const remainingWork = WORK.length - INITIAL_WORK_COUNT;

  return (
    <section id="templates" className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div className="mb-4 flex flex-col items-start justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Work &amp; Templates</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            See it live, or make it yours
          </h2>
          <p className="mt-3 font-sans text-sm text-ink/55">
            Ready-to-launch templates you can buy today, plus real client sites
            we&apos;ve shipped and put into production.
          </p>
        </div>
        <p className="font-mono text-xs tabular-nums text-ink/35">
          {String(TEMPLATES.length + WORK.length).padStart(2, "0")} total
        </p>
      </div>

      {TEMPLATES.map((template, index) => (
        <ShowcaseRow key={template.name} index={index} image={template.preview} imageAlt={`${template.name} preview`}>
          <p className="font-mono text-[11px] tabular-nums text-ink/30">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">Template</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">{template.name}</h3>
          <p className="mt-2 font-sans text-sm text-ink/55">{template.tagline}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">Problem</p>
              <p className="mt-1 font-sans text-xs text-ink/55">{template.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">Approach</p>
              <p className="mt-1 font-sans text-xs text-ink/55">{template.approach}</p>
            </div>
          </div>

          <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6">
            {template.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 font-sans text-xs text-ink/50">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-mono text-lg font-semibold text-ink">{template.price}</span>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View"
              className="magnetic rounded-lg border border-line px-6 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              View Demo
            </a>
            <a
              href="#contact"
              data-cursor="Get it"
              className="magnetic rounded-lg bg-ink px-6 py-2.5 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85"
            >
              Get This Template
            </a>
          </div>
        </ShowcaseRow>
      ))}

      <div id="work" className="mb-4 mt-16 flex items-end justify-between border-b border-line pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Selected Work &mdash; shipped &amp; live</p>
        <p className="font-mono text-xs tabular-nums text-ink/35">{String(WORK.length).padStart(2, "0")} projects</p>
      </div>

      {visibleWork.map((item, index) => (
        <ShowcaseRow key={item.name} index={TEMPLATES.length + index} image={item.preview} imageAlt={`${item.name} preview`}>
          <p className="font-mono text-[11px] tabular-nums text-ink/30">
            {String(TEMPLATES.length + index + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">{item.category}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit site"
            className="group mt-2 inline-flex flex-wrap items-baseline gap-3"
          >
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{item.name}</h3>
            <span
              data-text="View site →"
              className="glitch-text font-mono text-[11px] uppercase tracking-widest text-ink/50 opacity-0 transition-opacity group-hover:opacity-100"
            >
              View site &rarr;
            </span>
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-ink/50">
              Next.js
            </span>
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-ink/50">
              Tailwind CSS
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-mono text-lg font-semibold text-ink">${item.priceUsd}</span>
            <span className="font-sans text-xs text-ink/45">
              &#8377;{item.priceInr.toLocaleString("en-IN")}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit"
              className="magnetic rounded-lg border border-line px-6 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              Visit Site
            </a>
            <a
              href="#contact"
              data-cursor="Get it"
              className="magnetic rounded-lg bg-ink px-6 py-2.5 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85"
            >
              Start a Similar Project
            </a>
          </div>
        </ShowcaseRow>
      ))}

      {!showAllWork && remainingWork > 0 && (
        <div className="flex justify-center pt-14">
          <button
            type="button"
            onClick={() => setShowAllWork(true)}
            data-cursor="Show all"
            className="magnetic rounded-lg bg-ink px-8 py-3 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85"
          >
            View All Work &mdash; {remainingWork} More
          </button>
        </div>
      )}
    </section>
  );
}
