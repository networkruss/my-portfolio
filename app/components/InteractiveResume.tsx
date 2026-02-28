"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, Code2, Database, Layout, Sparkles } from "lucide-react";

type Category = "All" | "Frontend" | "Backend" | "FullStack";

interface Skill {
  name: string;
  category: Category;
  level: number;
}

const skills: Skill[] = [
  { name: "Next.js", category: "Frontend", level: 95 },
  { name: "React", category: "Frontend", level: 90 },
  { name: "TypeScript", category: "FullStack", level: 92 },
  { name: "Spring Boot", category: "Backend", level: 85 },
  { name: "Java", category: "Backend", level: 80 },
  { name: "MySQL", category: "Backend", level: 88 },
  { name: "PostgreSQL", category: "Backend", level: 85 },
  { name: "Directus", category: "Backend", level: 90 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Framer Motion", category: "Frontend", level: 88 },
  { name: "PHP", category: "Backend", level: 75 },
  { name: "React Native", category: "Frontend", level: 82 },
];

export default function InteractiveResume() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 overflow-y-auto custom-scrollbar h-full">
      {/* Narrative Summary */}
      <section className="mb-16">
        <h2 className="text-[10px] font-black tracking-[0.5em] uppercase text-blue-500 mb-6 flex items-center gap-4">
          <Sparkles className="w-3 h-3" /> Professional_Profile
        </h2>
        <p className="text-sm md:text-base text-[var(--foreground)] font-light leading-relaxed max-w-3xl italic">
          Full Stack Developer specialized in building robust ERP systems and business-critical software. I bridge the gap between complex database operations and premium user interfaces.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Col: Experience & Education */}
        <div className="lg:col-span-7 space-y-16">
          <section>
            <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-[var(--muted-foreground)] mb-10 flex items-center gap-3">
              <Briefcase className="w-3 h-3" /> Experience
            </h3>
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-[var(--border)]/10">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                <span className="text-[9px] font-black tracking-widest text-blue-500 uppercase block mb-2">2024 — Present</span>
                <h4 className="text-base font-black tracking-tight text-[var(--foreground)] uppercase mb-2">Full Stack Developer / Solutions Architect</h4>
                <p className="text-[11px] font-medium leading-[1.8] text-[var(--muted-foreground)] uppercase tracking-wider">
                  Specialized in architecting supply chain solutions. Built the **SCM Planner** engine using Directus and MySQL, streamlining replenishment operations for high-volume inventory.
                </p>
              </div>

              <div className="relative pl-8 border-l border-[var(--border)]/10">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[var(--muted-foreground)]/30 rounded-full" />
                <span className="text-[9px] font-black tracking-widest text-[var(--muted-foreground)] opacity-50 uppercase block mb-2">2024 — Mid</span>
                <h4 className="text-base font-black tracking-tight text-[var(--foreground)] uppercase mb-2">Junior Web Developer (Internship/Projects)</h4>
                <p className="text-[11px] font-medium leading-[1.8] text-[var(--muted-foreground)] uppercase tracking-wider">
                  Developed automated reporting tools and stock health monitors. Focused on data visualization and real-time dashboard performance using Spring Boot.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-[var(--muted-foreground)] mb-10 flex items-center gap-3">
              <GraduationCap className="w-3 h-3" /> Education
            </h3>
            <div className="relative pl-8 border-l border-[var(--border)]/10">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[var(--muted-foreground)]/30 rounded-full" />
              <h4 className="text-base font-black tracking-tight text-[var(--foreground)] uppercase mb-1">Bachelor of Science in Information Technology</h4>
              <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">Pangasinan State University</p>
              <p className="text-[11px] font-medium leading-[1.8] text-[var(--muted-foreground)] tracking-wider">
                Focused on Software Engineering and Database Management. Consistently working on real-world projects during academic years.
              </p>
            </div>
          </section>
        </div>

        {/* Right Col: Skills & Awards */}
        <div className="lg:col-span-5 space-y-16">
          <section>
            <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-[var(--muted-foreground)] mb-8 flex items-center gap-3">
              <Code2 className="w-3 h-3" /> Core_Capabilities
            </h3>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(["All", "Frontend", "Backend"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] font-black tracking-widest uppercase px-3 py-1.5 border transition-all ${
                    activeCategory === cat 
                      ? "bg-blue-500 border-blue-500 text-white" 
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-blue-500/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group flex flex-col gap-1.5 p-3 border border-[var(--border)]/10 hover:border-blue-500/30 transition-all bg-white/[0.01]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black tracking-widest uppercase text-[var(--foreground)]">{skill.name}</span>
                      <span className="text-[9px] font-mono text-blue-500/60">{skill.level}%</span>
                    </div>
                    <div className="h-0.5 w-full bg-[var(--muted)]/50 dark:bg-white/[0.05] overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section>
            <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-[var(--muted-foreground)] mb-8 flex items-center gap-3">
              <Award className="w-3 h-3" /> Focus_Areas
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-blue-500/10 bg-blue-500/[0.02]">
                <h5 className="text-[10px] font-black tracking-widest uppercase text-blue-500 mb-2 whitespace-pre flex items-center gap-2">
                  <Layout className="w-3 h-3" /> ERP System Design
                </h5>
                <p className="text-[9.5px] font-medium leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider">
                  Designing complex internal tools, procurement engines, and inventory health monitors.
                </p>
              </div>
              <div className="p-4 border border-[var(--border)]/10">
                <h5 className="text-[10px] font-black tracking-widest uppercase text-[var(--foreground)] mb-2 whitespace-pre flex items-center gap-2">
                  <Database className="w-3 h-3" /> Database Optimization
                </h5>
                <p className="text-[9.5px] font-medium leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider">
                  Direct database operations, aggregation queries, and real-time ledger processing.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
