"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.slice(0, 4)); // Show top 4 projects as "Selected Work"
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  // Helper to format project index numbers
  const formatIndex = (index: number) => {
    return (index + 1).toString().padStart(2, "0");
  };

  // Helper to resolve custom categories for Neil's projects to match the design style
  const getProjectCategory = (id: string, techStack: string[]) => {
    switch (id) {
      case "lecreuset-bug-report":
        return "QA Testing · Authentication Flow";
      case "scm-planner":
        return "Supply Chain · Systems Planning";
      case "bia-stock-health":
        return "Inventory Analytics · Risk Detection";
      case "purchase-order-system":
        return "Enterprise Operations · PO Workflow";
      case "stock-transfer":
        return "RFID Scanning · Warehouse Logistics";
      case "data-analytics-sql":
        return "Data Engineering · BI Dashboards";
      default:
        return techStack.slice(0, 2).join(" · ");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col min-h-screen justify-between relative z-10">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 md:space-y-12 mt-4 md:mt-10"
      >
        {/* Uppercase Sub-header */}
        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase block font-sans">
          DEVELOPER & SYSTEMS ENGINEER — PHILIPPINES
        </span>

        {/* Large Serif Title */}
        <h1 className="text-[42px] sm:text-[62px] md:text-[80px] font-serif font-light leading-[1.08] text-[var(--foreground)] tracking-tight max-w-4xl">
          Crafting interfaces <br />
          <span className="font-serif italic font-light">worth using.</span>
        </h1>

        {/* Two-Column Intro Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 md:pt-8 items-start">
          {/* Bio text column */}
          <div className="md:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)] font-normal max-w-xl">
              I design and build web systems where considered database architecture and clean, functional frontend share equal weight. Currently open to select project work and full-time roles.
            </p>
          </div>

          {/* Social Links / Mail column */}
          <div className="md:col-span-5 flex flex-col md:items-end gap-3.5 font-sans pt-2 md:pt-0">
            <a
              href="https://github.com/networkruss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
            >
              <Github className="w-3.5 h-3.5 opacity-80" />
              GitHub
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/nrsoliven/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
            >
              <Linkedin className="w-3.5 h-3.5 opacity-80" />
              LinkedIn
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="mailto:soliven.neilrussel.d@gmail.com"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 opacity-80" />
              soliven.neilrussel.d@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Selected Work Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 md:mt-32 pt-8 border-t border-[var(--border)]"
      >
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            SELECTED WORK
          </h2>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[var(--foreground)] hover:opacity-80 transition-opacity"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Projects Rows List */}
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="w-5 h-5 border border-[var(--foreground)]/20 border-t-[var(--foreground)] rounded-full animate-spin" />
            </div>
          ) : (
            projects.map((project, idx) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex justify-between items-center py-6 md:py-8 px-2 md:px-4 -mx-2 md:-mx-4 hover:bg-[var(--background-alt)] transition-colors duration-300 rounded-sm"
              >
                {/* Left side: Index and Title/Category */}
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-sm font-sans font-medium text-[var(--muted-foreground)] opacity-70">
                    {formatIndex(idx)}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-serif text-[var(--foreground)] font-normal leading-tight group-hover:opacity-85 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] font-sans">
                      {getProjectCategory(project.id, project.techStack)}
                    </p>
                  </div>
                </div>

                {/* Right side: Year and Arrow */}
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm font-sans font-medium text-[var(--muted-foreground)]">
                    2026
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>
      </motion.div>

      {/* Let's Work Together Call-To-Action Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 md:mt-32 w-full"
      >
        <div className="w-full bg-[var(--background-alt)] border border-[var(--border)] rounded-md px-8 py-10 md:px-16 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-[var(--foreground)] leading-tight">
              Let's work together.
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] font-sans">
              Have a project in mind? I'd love to hear about it.
            </p>
          </div>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 transition-all font-sans text-xs md:text-sm font-semibold tracking-wide rounded-sm group shadow-sm"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}