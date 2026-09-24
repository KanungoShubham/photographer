import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative w-full bg-paper">
      <Hero />
      <ScrollReveal>
        <Manifesto />
      </ScrollReveal>
      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>
      <ScrollReveal>
        <TechStackSection />
      </ScrollReveal>
      <ScrollReveal>
        <ShowcaseSection />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudiesSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
