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
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <h2 className="font-display text-3xl text-porcelain">Message sent.</h2>
        <p className="max-w-sm font-sans text-sm text-porcelain/60">
          Thank you for reaching out — expect a reply within two business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-porcelain/50">
            Name
          </span>
          <input
            required
            type="text"
            name="name"
            className="border-b border-porcelain/20 bg-transparent py-3 font-sans text-porcelain outline-none transition-colors focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-porcelain/50">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            className="border-b border-porcelain/20 bg-transparent py-3 font-sans text-porcelain outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-porcelain/50">
          Project type
        </span>
        <input
          type="text"
          name="projectType"
          placeholder="Editorial, fashion, architecture..."
          className="border-b border-porcelain/20 bg-transparent py-3 font-sans text-porcelain outline-none transition-colors placeholder:text-porcelain/30 focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-porcelain/50">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className="border-b border-porcelain/20 bg-transparent py-3 font-sans text-porcelain outline-none transition-colors focus:border-gold"
        />
      </label>

      <button
        type="submit"
        data-cursor-hover
        className="self-start font-sans text-xs uppercase tracking-[0.3em] text-gold transition-opacity hover:opacity-70"
      >
        Send Message &rarr;
      </button>
    </form>
  );
}
