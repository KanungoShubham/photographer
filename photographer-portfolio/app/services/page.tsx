import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services — Chasing Light",
  description: "Editorial, fashion, and architectural photography packages.",
};

const PACKAGES = [
  {
    name: "Editorial Session",
    price: "$1,200",
    description: "Half-day shoot for magazines, personal branding, and lifestyle stories.",
    features: ["Up to 4 hours on location", "One retoucher-graded set (30 images)", "Digital delivery in 5 business days"],
  },
  {
    name: "Fashion Editorial",
    price: "$2,800",
    description: "Full-day production for lookbooks, campaigns, and designer collections.",
    features: ["Full-day shoot with studio or location", "Creative direction & mood board", "60 retouched images, print-ready"],
  },
  {
    name: "Architectural Commission",
    price: "Custom",
    description: "Multi-day coverage for firms, developers, and interior designers.",
    features: ["Multi-day, multi-site coverage", "Drone & interior lighting options", "Licensed for editorial & commercial use"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative w-full bg-noir">
      <PageHeader
        eyebrow="What I Offer"
        title="Services"
        description="Every package is built around one goal — light that tells the truth."
        image="/images/grid-architecture-1.jpg"
      />

      <section className="grid w-full grid-cols-1 gap-6 px-6 py-20 md:py-32 md:grid-cols-3 md:px-12">
        {PACKAGES.map((pkg, index) => (
          <PricingCard key={pkg.name} index={index} {...pkg} />
        ))}
      </section>

      <section className="flex w-full flex-col items-center gap-6 px-6 pb-32 text-center md:px-12">
        <p className="max-w-md font-sans text-sm text-porcelain/60">
          Every project starts with a conversation about light, location, and
          what the work needs to say.
        </p>
        <Link
          href="/contact"
          data-cursor-hover
          className="font-sans text-xs uppercase tracking-[0.3em] text-gold transition-opacity hover:opacity-70"
        >
          Enquire about a project &rarr;
        </Link>
      </section>

      <Footer />
    </main>
  );
}
