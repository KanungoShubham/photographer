import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Chasing Light",
  description: "The story and philosophy behind the studio.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full bg-noir">
      <PageHeader
        eyebrow="The Studio"
        title="About"
        description="Ten years behind the lens, chasing the exact second light becomes emotion."
        image="/images/grid-editorial-3.jpg"
      />

      <section className="grid w-full grid-cols-1 gap-12 px-6 py-20 md:py-32 md:grid-cols-2 md:px-12">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src="/images/grid-editorial-2.jpg"
            alt="The photographer at work"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center gap-6">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
            Est. 2016
          </p>
          <h2 className="font-display text-3xl text-porcelain md:text-4xl">
            I work in shadow, form, and stillness.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-porcelain/60">
            Chasing Light Studio was founded on a simple belief: the most
            honest photograph is the one that waits for its light rather than
            manufacturing it. Across editorial sets, fashion campaigns, and
            architectural commissions, the same discipline applies — observe
            first, shoot second.
          </p>
          <p className="font-sans text-sm leading-relaxed text-porcelain/60">
            The studio has shot for independent magazines, boutique fashion
            houses, and architecture firms across three continents, always
            favoring available light and unscripted moments over heavy
            production.
          </p>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
