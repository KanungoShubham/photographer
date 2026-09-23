import Hero from "@/components/Hero";
import FunctionsTimeline from "@/components/FunctionsTimeline";
import GalleryGrid from "@/components/GalleryGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-paper">
      <Hero />
      <FunctionsTimeline />
      <GalleryGrid limit={8} cta />
      <Testimonials />
      <Footer />
    </main>
  );
}
