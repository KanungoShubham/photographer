import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorksGrid from "@/components/WorksGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery — Chasing Light",
  description: "The full portfolio: editorial, fashion, and cinematic architecture.",
};

export default function GalleryPage() {
  return (
    <main className="relative w-full bg-noir">
      <PageHeader
        eyebrow="Portfolio"
        title="The Gallery"
        description="Every frame is a decision made in available light — a survey of editorial, fashion, and architectural work."
        image="/images/grid-fashion-1.jpg"
      />
      <WorksGrid heading="All Works" description="Filterable by nothing but instinct." />
      <Footer />
    </main>
  );
}
