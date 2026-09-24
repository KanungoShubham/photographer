import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES } from "@/lib/caseStudies";

export default function CaseStudiesSection() {
  return (
    <section className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Client Case Studies</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Real problems, real numbers
          </h2>
          <p className="mt-3 font-sans text-sm text-ink/55">
            Four platforms we built end to end &mdash; the problem, the
            system behind it, and the measured result.
          </p>
        </div>
        <p className="font-mono text-xs tabular-nums text-ink/35">
          {String(CASE_STUDIES.length).padStart(2, "0")} studies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {CASE_STUDIES.map((study, index) => (
          <CaseStudyCard key={study.name} index={index} {...study} />
        ))}
      </div>

      <div className="mt-10">
        <a
          href="https://shubhamkanungo.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Explore"
          className="magnetic font-sans text-sm text-ink underline decoration-ink/40 decoration-2 underline-offset-4 hover:decoration-ink"
        >
          See the full case studies &rarr;
        </a>
      </div>
    </section>
  );
}
