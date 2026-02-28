"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import SkillsCloud from "../components/SkillsCloud";

// Ang skills list ay nasa loob na ng SkillsCloud.tsx component.

export default function AboutPage() {
  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
      <motion.div initial="hidden" animate="show" variants={FADE_UP} className="mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-[var(--foreground)]">
          The <br /> <span className="text-[var(--foreground)]/10 dark:text-[var(--foreground)]/20">Developer.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Narrative Section */}
        <motion.div 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          variants={FADE_UP}
          className="lg:col-span-12 space-y-16"
        >
          <div className="space-y-6 md:space-y-8 border-l border-[var(--border)]/10 pl-6 md:pl-8">
            <p className="text-[var(--foreground)] text-base md:text-xl font-light tracking-wide leading-relaxed lg:max-w-4xl">
              Neil Russel is a web developer based in the Philippines — building full-stack systems with Next.js, Directus, and MySQL.
            </p>
            <div className="space-y-4 md:space-y-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] leading-relaxed text-[var(--muted-foreground)] lg:max-w-3xl">
              <p>
                Focused on ERP and C2C SaaS platforms — designing end-to-end web applications from database architecture to UI, with a strong emphasis on enterprise resource planning and business-critical workflows.
              </p>
              <p>
                Specializing in Next.js and Directus as a headless CMS/API layer, with MySQL and PostgreSQL as primary databases — delivering scalable, maintainable systems for real-world business operations.
              </p>
            </div>
          </div>

          {/* EXPERIENCE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-[var(--foreground)] uppercase opacity-50 dark:opacity-30">Experience_Log</h3>
            </div>
            <div className="md:col-span-8 space-y-12">
              <div className="group relative">
                <span className="text-[8px] font-bold tracking-widest text-blue-500 uppercase block mb-2">2024 — Present</span>
                <h4 className="text-sm md:text-base font-black tracking-tight text-[var(--foreground)] uppercase mb-2">Web Developer / Full Stack</h4>
                <p className="text-[10px] md:text-[11px] uppercase tracking-widest leading-relaxed text-[var(--muted-foreground)]">
                  Developing enterprise-scale ERP modules, including the SCM Planner and BIA Stock Health Monitor. Architecting headless CMS solutions and complex database operations.
                </p>
              </div>

              <div className="group relative">
                <span className="text-[8px] font-bold tracking-widest text-[var(--muted-foreground)] opacity-50 uppercase block mb-2">Ongoing Development</span>
                <h4 className="text-sm md:text-base font-black tracking-tight text-[var(--foreground)] uppercase mb-2">Founder & Lead Dev @ Pangasinan Ride</h4>
                <p className="text-[10px] md:text-[11px] uppercase tracking-widest leading-relaxed text-[var(--muted-foreground)]">
                  Building a localized transport-hailing platform to solve rental negotiation gaps in the province. Implementing real-time tracking and mapping.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Stack (Removed grid constraints for full-width) */}
        <motion.div 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          variants={FADE_UP}
          className="lg:col-span-12 mt-12"
        >
          <div className="border-t border-[var(--border)]/10 pt-16">
            <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-[var(--foreground)] uppercase mb-8 opacity-50 dark:opacity-30 text-center">Technical Core</h3>
            <SkillsCloud />
          </div>
        </motion.div>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP} className="mt-16 md:mt-24">
        <Link href="/projects" className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--foreground)] border-b border-[var(--border)] pb-1 hover:border-blue-500 transition-all">
          [ Explore Portfolio ]
        </Link>
      </motion.div>
    </div>
  );
}
