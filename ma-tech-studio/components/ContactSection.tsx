export default function ContactSection() {
  return (
    <section id="contact" className="w-full border-t border-line px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Get In Touch</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-4 max-w-md font-sans text-sm text-ink/55">
          Whether it&apos;s a $50 template or a custom platform &mdash; message
          us on WhatsApp and we&apos;ll reply the same day.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/918989719137?text=Hi!%20I'd%20like%20to%20talk%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Chat"
            className="magnetic flex items-center gap-3 rounded-lg bg-ink px-7 py-3.5 font-sans text-sm font-semibold text-void transition-opacity hover:opacity-85"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.004 2C6.486 2 2.01 6.476 2.01 11.994c0 2.114.66 4.075 1.79 5.688L2.5 21.999l4.44-1.263a9.94 9.94 0 0 0 5.064 1.381h.004c5.518 0 9.992-4.476 9.992-9.994C21.998 6.476 17.522 2.002 12.004 2Zm0 18.13h-.003a8.11 8.11 0 0 1-4.135-1.13l-.297-.176-2.635.75.706-2.567-.193-.264a8.096 8.096 0 0 1-1.24-4.35c0-4.48 3.645-8.124 8.128-8.124a8.08 8.08 0 0 1 5.746 2.382 8.077 8.077 0 0 1 2.379 5.746c0 4.48-3.646 8.125-8.126 8.125Z" />
            </svg>
            Message Us on WhatsApp
          </a>

          <a
            href="tel:+918989719137"
            data-cursor="Call"
            aria-label="Call us"
            className="magnetic flex h-13 w-13 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5c0-.6.4-1 1-1h3.2c.5 0 .9.3 1 .8l1 4a1 1 0 0 1-.3 1L7.5 11.3a14 14 0 0 0 5.2 5.2l1.5-1.4a1 1 0 0 1 1-.3l4 1c.5.1.8.5.8 1V20c0 .6-.4 1-1 1h-1C9.5 21 3 14.5 3 6V5Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
