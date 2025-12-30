"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="text-center"
      >
        <motion.p 
          variants={FADE_UP}
          className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500/80 mb-6"
        >
          Web Developer
        </motion.p>

        <motion.h1 
          variants={FADE_UP}
          className="text-7xl md:text-9xl font-black mb-8 leading-[0.85]"
        >
          CRAFTING <br /> 
          <span className="text-white/20">DIGITAL.</span>
        </motion.h1>

        <motion.p 
          variants={FADE_UP}
          className="text-slate-500 text-sm md:text-base max-w-sm mx-auto mb-12 tracking-wide leading-relaxed uppercase"
        >
          Designing cleaner spaces for the web <br /> 
          where <span className="text-white">logic meets aesthetics</span>.
        </motion.p>

        <motion.div variants={FADE_UP} className="flex gap-12 justify-center">
          <Link
            href="/projects"
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white border-b border-white/20 pb-1 hover:border-blue-500 transition-all"
          >
            [ View Work ]
          </Link>
          
          <Link
            href="/contact"
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all"
          >
            Connect
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}