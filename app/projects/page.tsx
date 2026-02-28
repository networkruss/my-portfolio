"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, Variants, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  screenshots: string[];
  isOngoing?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  
  // Mouse tracking for the peek effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for the following effect
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
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

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

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
    <div 
      className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10 text-[var(--foreground)]"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image Peek (Desktop Only) */}
      <AnimatePresence>
        {hoveredProject && hoveredProject.screenshots?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            style={{ 
              position: "fixed",
              left: springX,
              top: springY,
              x: "-50%",
              y: "-50%",
              pointerEvents: "none",
              zIndex: 100,
            }}
            className="hidden md:block w-72 h-48 rounded-lg overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-500/10"
          >
            <Image 
              src={hoveredProject.screenshots[0]} 
              alt={hoveredProject.title} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 md:mb-20 border-l border-[var(--border)]/10 pl-6 md:pl-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
          Selected <br /> <span className="text-[var(--foreground)]/10 dark:text-[var(--foreground)]/20">Works.</span>
        </h1>
        <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-[var(--muted-foreground)] max-w-[250px] md:max-w-sm leading-relaxed">
          A curation of digital systems and ongoing developments / 2024 — 2025
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]/10 border border-[var(--border)]/10 overflow-hidden rounded-sm"
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            variants={item}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group relative flex flex-col justify-between h-[350px] md:h-[400px] bg-[var(--background)] p-8 md:p-10 hover:bg-[var(--muted)]/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
                    Index_0{index + 1}
                  </span>
                  
                  {project.isOngoing && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                      </span>
                      <span className="text-[8px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                        Work in Progress
                      </span>
                    </div>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tighter text-[var(--foreground)] mb-3 md:mb-4 uppercase group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-[10px] md:text-[11px] leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider max-w-xs line-clamp-3 md:line-clamp-none">
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
