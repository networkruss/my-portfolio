"use client";

import { motion, Variants } from "framer-motion";
import { useForm } from "@formspree/react";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  // Use a public env var for the Formspree form ID, fallback to the hardcoded ID
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID || "mdaojvoq";
  const [state, handleSubmit] = useForm(formspreeId);

  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  if (state.succeeded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">Received.</h2>
          <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase">I will get back to you shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-24 relative z-10">
      <motion.div initial="hidden" animate="show" variants={FADE_UP} className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          Get in <br /> <span className="text-white/20">Touch.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Links */}
        <motion.div initial="hidden" animate="show" variants={FADE_UP} className="lg:col-span-4 space-y-12">
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase mb-4">Email</h3>
            <a href="mailto:soliven.neilrussel.d@gmail.com" className="text-sm font-medium hover:text-blue-400 transition-colors uppercase tracking-wider">
              soliven.neilrussel.d@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase mb-4">Social</h3>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/networkruss" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/nrsoliven/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </motion.div>

        {/* Minimal Form */}
        <motion.div initial="hidden" animate="show" variants={FADE_UP} className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
                <label htmlFor="name" className="text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Name</label>
                <input id="name" type="text" name="name" required className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-xs tracking-widest" placeholder="Enter Name" />
              </div>
              <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
                <label htmlFor="email" className="text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Email</label>
                <input id="email" type="email" name="email" required className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-xs tracking-widest" placeholder="Email Address" />
              </div>
            </div>
            <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
              <label htmlFor="message" className="text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Message</label>
              <textarea id="message" name="message" required rows={4} className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-xs tracking-widest resize-none" placeholder="How can I help you?"></textarea>
            </div>

            <button type="submit" disabled={state.submitting} className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white hover:text-blue-500 transition-all">
              {state.submitting ? "Sending..." : "[ Send Message ]"}
              {!state.submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}