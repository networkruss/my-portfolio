"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  isOngoing?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        // Sinisiguro nito na kinukuha ang pinakabagong data mula sa iyong API route
        const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' });
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-4 h-4 border border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 md:mb-20 border-l border-white/10 pl-6 md:pl-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
          Selected <br /> <span className="text-white/20">Works.</span>
        </h1>
        <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-slate-500 max-w-[250px] md:max-w-sm leading-relaxed">
          A curation of digital systems and ongoing developments / 2024 — 2025
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-sm"
      >
        {projects.map((project, index) => (
          <motion.div key={project.id} variants={item}>
            {/* TAMA NA LINK: Gagamitin nito ang id (e.g., brgy-system) para sa dynamic folder na [id] */}
            <Link
              href={`/projects/${project.id}`}
              className="group relative flex flex-col justify-between h-[350px] md:h-[400px] bg-[#030303] p-8 md:p-10 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-slate-600 uppercase">
                    Index_0{index + 1}
                  </span>
                  
                  {project.isOngoing && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                      </span>
                      <span className="text-[8px] font-black tracking-[0.2em] text-blue-400 uppercase">
                        Work in Progress
                      </span>
                    </div>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tighter text-white mb-3 md:mb-4 uppercase group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-slate-500 uppercase tracking-wider max-w-xs line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 md:pt-8 flex gap-4">
                 <div className="h-[1px] w-6 md:w-8 bg-blue-500/30 group-hover:w-12 md:group-hover:w-16 transition-all duration-700" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}