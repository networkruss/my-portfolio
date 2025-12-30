"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const skills = ["PHP", "Python", "MySQL", "React / Next.js", "C#", "ASP.NET", "Odoo ERP"];

export default function AboutPage() {
  const FADE_UP = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
      <motion.div initial="hidden" animate="show" variants={FADE_UP} className="mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          The <br /> <span className="text-white/20">Developer.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Narrative Section */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP}
          className="lg:col-span-7 space-y-6 md:space-y-8 border-l border-white/10 pl-6 md:pl-8"
        >
          <p className="text-white text-lg md:text-2xl font-medium tracking-tight leading-snug">
            Neil Russel is a web developer based in the Philippines, focused on the intersection of complex logic and minimalist design.
          </p>
          <div className="space-y-4 md:space-y-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] leading-relaxed text-slate-500">
            <p>
              EXPERIENCED IN BUILDING DYNAMIC, USER-CENTRIC WEBSITES AND ERP-INTEGRATED APPLICATIONS DURING MY TENURE AT DIREC BUSINESS TECHNOLOGIES INC.
            </p>
            <p>
              CURRENTLY SPECIALIZING IN C#, PHP, AND NEXT.JS WHILE MASTERING PYTHON AND FLASK TO SOLVE REAL-WORLD PROBLEMS WITH ARCHITECTURAL PRECISION.
            </p>
          </div>
        </motion.div>

        {/* Technical Stack (Minimalist List) */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP}
          className="lg:col-span-5 space-y-8 md:space-y-12"
        >
          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-white uppercase mb-6 md:mb-8 opacity-30">Technical Core</h3>
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill) => (
                <div key={skill} className="group flex justify-between items-center border-b border-white/[0.03] pb-3 md:pb-4 transition-all">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP} className="mt-16 md:mt-24">
        <Link href="/projects" className="text-[10px] font-bold tracking-[0.4em] uppercase text-white border-b border-white/20 pb-1 hover:border-blue-500 transition-all">
          [ Explore Portfolio ]
        </Link>
      </motion.div>
    </div>
  );
}