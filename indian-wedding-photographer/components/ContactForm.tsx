"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 border border-line py-14 text-center">
        <h2 className="font-display text-3xl italic text-ink">Thank you.</h2>
        <p className="max-w-sm font-sans text-sm text-ink/60">
          We&apos;ll check availability for your dates and get back to you
          within two days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7 border border-line p-8 md:p-10">
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
            Your Name
          </span>
          <input
            required
            type="text"
            name="name"
            className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors focus:border-crimson"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
            Phone / WhatsApp
          </span>
          <input
            required
            type="tel"
            name="phone"
            className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors focus:border-crimson"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
            Wedding Date
          </span>
          <input
            type="date"
            name="weddingDate"
            className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors focus:border-crimson"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
            City / Venue
          </span>
          <input
            type="text"
            name="venue"
            className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors focus:border-crimson"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
          Which functions?
        </span>
        <input
          type="text"
          name="functions"
          placeholder="Haldi, Mehendi, Sangeet, Wedding, Reception..."
          className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-crimson"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink/50">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          className="border-b border-line bg-transparent py-3 font-sans text-ink outline-none transition-colors focus:border-crimson"
        />
      </label>

      <button
        type="submit"
        className="self-start border border-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Check Availability
      </button>
    </form>
  );
}
