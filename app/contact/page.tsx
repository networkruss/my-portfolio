"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mdaojvoq");

  const FADE_UP = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  if (state.succeeded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase">Received.</h2>
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] text-slate-500 uppercase">I will get back to you shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
      <motion.div initial="hidden" animate="show" variants={FADE_UP} className="mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          Get in <br /> <span className="text-white/20">Touch.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Contact Links */}
        <motion.div initial="hidden" animate="show" variants={FADE_UP} className="lg:col-span-4 space-y-10 md:space-y-12">
          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase mb-4">Email</h3>
            <a href="mailto:soliven.neilrussel.d@gmail.com" className="text-xs md:text-sm font-medium hover:text-blue-400 transition-colors uppercase tracking-wider break-all">
              soliven.neilrussel.d@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase mb-4">Social</h3>
            <div className="flex flex-row lg:flex-col gap-8 lg:gap-3">
              <a href="https://github.com/networkruss" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/nrsoliven/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </motion.div>

        {/* Minimal Form */}
        <motion.div initial="hidden" animate="show" variants={FADE_UP} className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
                <label htmlFor="name" className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Name</label>
                <input id="name" type="text" name="name" required className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-[10px] md:text-xs tracking-widest" placeholder="Full Name" />
              </div>
              <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
                <label htmlFor="email" className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Email</label>
                <input id="email" type="email" name="email" required className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-[10px] md:text-xs tracking-widest" placeholder="Email Address" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
            </div>
            <div className="group border-b border-white/5 focus-within:border-blue-500 transition-all py-2">
              <label htmlFor="message" className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">Message</label>
              <textarea id="message" name="message" required rows={4} className="w-full bg-transparent border-none text-white focus:outline-none pt-4 uppercase text-[10px] md:text-xs tracking-widest resize-none" placeholder="How can I help you?"></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button type="submit" disabled={state.submitting} className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white hover:text-blue-500 transition-all py-4">
              {state.submitting ? "Sending..." : "[ Send Message ]"}
              {!state.submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}