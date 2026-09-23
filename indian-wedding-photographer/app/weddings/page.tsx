import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PackageCard from "@/components/PackageCard";
import FunctionsTimeline from "@/components/FunctionsTimeline";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Weddings & Packages — Ananya Studios",
  description: "Wedding photography packages covering every function.",
};

const PACKAGES = [
  {
    name: "Single Function",
    price: "₹35,000",
    description: "One function, fully covered — perfect for an intimate Haldi or Mehendi.",
    features: ["1 photographer, up to 6 hours", "300+ edited photos", "Online gallery in 7 days"],
  },
  {
    name: "Full Wedding",
    price: "₹1,25,000",
    description: "Haldi through Reception — the complete multi-day story, start to finish.",
    features: ["2 photographers, all 5 functions", "1500+ edited photos", "Cinematic highlight reel", "Online gallery in 14 days"],
    highlight: true,
  },
  {
    name: "Destination Wedding",
    price: "Custom",
    description: "Multi-day coverage with travel, for weddings outside your home city.",
    features: ["Full team, travel included", "Drone coverage where permitted", "Same-day social media set"],
  },
];

export default function WeddingsPage() {
  return (
    <main className="relative w-full bg-paper">
      <PageHeader
        eyebrow="Packages"
        title="Weddings"
        description="Choose one function or the full celebration — every package is built around real Indian wedding timelines."
        image="/images/grid-sangeet-1.jpg"
      />

      <section className="grid w-full grid-cols-1 gap-6 px-6 py-20 md:grid-cols-3 md:px-12 md:py-28">
        {PACKAGES.map((pkg, index) => (
          <PackageCard key={pkg.name} index={index} {...pkg} />
        ))}
      </section>

      <FunctionsTimeline />

      <section className="flex w-full flex-col items-center gap-5 px-6 pb-20 text-center md:px-12">
        <p className="max-w-md font-sans text-sm text-ink/60">
          Not sure which package fits your dates? Tell us your functions and
          city and we&apos;ll put together a quote.
        </p>
        <Link
          href="/contact"
          className="font-sans text-sm uppercase tracking-[0.08em] text-ink underline decoration-crimson decoration-2 underline-offset-4 hover:text-crimson"
        >
          Get a Custom Quote &rarr;
        </Link>
      </section>

      <Footer />
    </main>
  );
}
