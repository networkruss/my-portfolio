"use client";

import { motion, Variants } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mdaojvoq");

  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  if (state.succeeded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[var(--foreground)]">Received.</h2>
          <p className="text-xs text-[var(--muted-foreground)] font-sans uppercase tracking-widest">I will get back to you shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10 text-[var(--foreground)]">
      
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={FADE_UP}
        className="mb-16 border-b border-[var(--border)] pb-8"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase block mb-3 font-sans">
          CONTACT
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight text-[var(--foreground)] mb-4">
          Get in Touch
        </h1>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans max-w-2xl leading-relaxed">
          Let's discuss new projects, collaboration opportunities, or general inquiries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Contact Links */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="lg:col-span-4 space-y-8 font-sans"
        >
          {/* Email Block */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              EMAIL
            </h3>
            <a
              href="mailto:soliven.neilrussel.d@gmail.com"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)] hover:opacity-80 transition-opacity"
            >
              soliven.neilrussel.d@gmail.com
            </a>
          </div>

          {/* Social Block */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              SOCIALS
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/networkruss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)] hover:opacity-80 transition-opacity"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/nrsoliven/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)] hover:opacity-80 transition-opacity"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Formspree Contact Form */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="lg:col-span-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name and Email inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full bg-[var(--background-alt)] border border-[var(--border)] focus:border-[var(--foreground)] transition-colors rounded-sm px-4 py-3 text-sm focus:outline-none text-[var(--foreground)]"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[var(--background-alt)] border border-[var(--border)] focus:border-[var(--foreground)] transition-colors rounded-sm px-4 py-3 text-sm focus:outline-none text-[var(--foreground)]"
                  placeholder="your.email@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-[var(--background-alt)] border border-[var(--border)] focus:border-[var(--foreground)] transition-colors rounded-sm px-4 py-3 text-sm focus:outline-none text-[var(--foreground)] resize-none"
                placeholder="How can I help you?"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.submitting}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity font-sans text-xs md:text-sm font-semibold tracking-wide rounded-sm group shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send Message"}
              {!state.submitting && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>

          </form>
        </motion.div>

      </div>
    </div>
  );
}
