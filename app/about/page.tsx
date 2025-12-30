"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const skills = ["PHP", "Python", "MySQL", "React / Next.js", "C#", "ASP.NET", "Odoo ERP"];

export default function AboutPage() {
  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-24 relative z-10">
      {/* Editorial Header */}
      <motion.div initial="hidden" animate="show" variants={FADE_UP} className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          The <br /> <span className="text-white/20">Developer.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Narrative Section */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP}
          className="lg:col-span-7 space-y-8 border-l border-white/5 pl-8"
        >
          <p className="text-white text-xl md:text-2xl font-medium tracking-tight leading-snug">
            Neil Russel is a web developer based in the Philippines, focused on the intersection of complex logic and minimalist design.
          </p>
          <div className="space-y-6 text-[11px] uppercase tracking-[0.2em] leading-relaxed text-slate-500">
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
          className="lg:col-span-5 space-y-12"
        >
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-white uppercase mb-8 opacity-30">Technical Core</h3>
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill) => (
                <div key={skill} className="group flex justify-between items-center border-b border-white/[0.03] pb-4 hover:border-blue-500/30 transition-all">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP} className="mt-24">
        <Link href="/projects" className="text-[10px] font-bold tracking-[0.4em] uppercase text-white border-b border-white/20 pb-1 hover:border-blue-500 transition-all">
          [ Explore Portfolio ]
        </Link>
      </motion.div>
    </div>
  );
}