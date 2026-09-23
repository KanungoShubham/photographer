import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Ananya Studios",
  description: "Check availability for your wedding dates.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full bg-paper">
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        description="Tell us your dates and functions — we'll check availability."
        image="/images/grid-reception-1.jpg"
      />

      <section className="mx-auto w-full max-w-2xl px-6 py-20 md:px-12 md:py-28">
        <ContactForm />

        <div className="mt-10 flex flex-col gap-2 text-center font-sans text-sm text-ink/50">
          <span>studio@ananyaphotography.in</span>
          <span>Based in Jaipur · Available across India &amp; for destination weddings</span>
        </div>
      </section>

      <Footer />
    </main>
  );
}
