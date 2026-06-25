"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
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

  // Helper to format custom details for each project card
  const getProjectMetadata = (id: string) => {
    switch (id) {
      case "scm-planner":
        return { year: "2026", category: "Enterprise System · Procurement" };
      case "bia-stock-health":
        return { year: "2026", category: "Enterprise System · Inventory Analytics" };
      case "purchase-order-system":
        return { year: "2026", category: "Enterprise System · Operations" };
      case "stock-transfer":
        return { year: "2026", category: "Enterprise System · RFID Scanning" };
      case "data-analytics-sql":
        return { year: "2026", category: "Data Engineering · BI" };
      default:
        return { year: "2026", category: "Web Application" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-5 h-5 border border-[var(--foreground)]/20 border-t-[var(--foreground)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10 text-[var(--foreground)]">
      
      {/* Page Header (Matching Slide 3/4) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-[var(--border)] pb-8"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase block mb-3 font-sans">
          WORK
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight text-[var(--foreground)] mb-4">
          Selected Projects
        </h1>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans max-w-2xl leading-relaxed">
          A focused collection of enterprise systems, database architectures, and front-end modules.
        </p>
      </motion.div>

      {/* Cards List Stack (Single Column layout matching Slide 3/4/5) */}
      <div className="space-y-8 md:space-y-12">
        {projects.map((project, index) => {
          const meta = getProjectMetadata(project.id);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block bg-[var(--background-alt)] border border-[var(--border)] rounded-sm p-6 md:p-10 hover:border-[var(--muted-foreground)]/30 hover:shadow-sm transition-all duration-300"
              >
                {/* Card Top Row */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--muted-foreground)] font-sans">
                    <span className="font-semibold">{meta.year}</span>
                    <span className="opacity-50">•</span>
                    <span>{meta.category}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Card Title */}
                <h2 className="text-2xl md:text-3xl font-serif font-light text-[var(--foreground)] group-hover:opacity-85 transition-opacity mb-4">
                  {project.title}
                </h2>

                {/* Card Description */}
                <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>

                {/* Card Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]/45">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[var(--background)] border border-[var(--border)] text-[11px] font-sans font-medium text-[var(--muted-foreground)] tracking-wide rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
