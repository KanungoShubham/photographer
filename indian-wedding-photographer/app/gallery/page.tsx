import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery — Ananya Studios",
  description: "Haldi, Mehendi, Sangeet, Wedding, and Reception — the full album.",
};

export default function GalleryPage() {
  return (
    <main className="relative w-full bg-paper">
      <PageHeader
        eyebrow="The Album"
        title="Gallery"
        description="Every function, every guest, every unscripted moment — the full body of work."
        image="/images/grid-wedding-1.jpg"
      />
      <GalleryGrid heading="All Functions" />
      <Footer />
    </main>
  );
}
