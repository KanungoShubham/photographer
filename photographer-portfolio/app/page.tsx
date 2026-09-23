import Hero from "@/components/Hero";
import ApertureSection from "@/components/ApertureSection";
import WorksGrid from "@/components/WorksGrid";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-noir">
      <Hero />
      <ApertureSection />
      <WorksGrid limit={6} cta />
      <HorizontalShowcase />
      <Footer />
    </main>
  );
}
