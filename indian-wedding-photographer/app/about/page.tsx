import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Ananya Studios",
  description: "The story behind Ananya Studios.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full bg-paper">
      <PageHeader
        eyebrow="The Studio"
        title="About"
        description="Eight wedding seasons, hundreds of functions, one belief: the real moments matter more than the posed ones."
        image="/images/about-portrait.jpg"
      />

      <section className="grid w-full grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden  ">
          <Image
            src="/images/about-portrait.jpg"
            alt="The photography team"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center gap-6">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">Est. 2016</p>
          <h2 className="font-display text-3xl italic text-ink md:text-4xl">
            We shoot the wedding as it happens, not as it&apos;s staged.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-ink/60">
            Ananya Studios started with one Haldi ceremony shot on a
            borrowed lens. Since then we&apos;ve covered weddings across Jaipur,
            Udaipur, and Delhi NCR — always with the same approach: know the
            rituals, anticipate the moment, and stay out of the way until it
            happens.
          </p>
          <p className="font-sans text-sm leading-relaxed text-ink/60">
            Our team works every function — Haldi, Mehendi, Sangeet, the
            Phere, and Reception — as one continuous story, so the final
            album reads like the week actually felt.
          </p>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
