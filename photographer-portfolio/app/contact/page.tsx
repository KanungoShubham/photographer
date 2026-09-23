import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Chasing Light",
  description: "Start a conversation about your next shoot.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full bg-noir">
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        description="Tell me about the light you're chasing."
        image="/images/showcase-3.jpg"
      />

      <section className="mx-auto w-full max-w-2xl px-6 py-20 md:py-32 md:px-12">
        <ContactForm />

        <div className="mt-16 flex flex-col gap-2 border-t border-porcelain/10 pt-8 font-sans text-sm text-porcelain/50">
          <span>studio@chasinglight.com</span>
          <span>Based worldwide, available for travel</span>
        </div>
      </section>

      <Footer />
    </main>
  );
}
