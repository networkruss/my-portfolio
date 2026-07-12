"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff, ExternalLink, AlertTriangle, Monitor, Globe, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BugReport {
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
}

interface Project {
  id: string;
  title: string;
  type?: string;
  description: string;
  details: string;
  techStack: string[];
  features: string[];
  screenshots: string[];
  isOngoing: boolean;
  challenge?: string;
  solution?: string;
  impact?: string;
  githubLink?: string;
  severity?: string;
  environment?: string;
  targetUrl?: string;
  bugReport?: BugReport;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: Project) => p.id === id);
        setProject(found ?? null);
      });
  }, [id]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex((lightboxIndex - 1 + project.screenshots.length) % project.screenshots.length);
  }, [lightboxIndex, project]);

  const next = useCallback(() => {
    if (lightboxIndex === null || !project) return;
    setLightboxIndex((lightboxIndex + 1) % project.screenshots.length);
  }, [lightboxIndex, project]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="w-5 h-5 border border-[var(--foreground)]/20 border-t-[var(--foreground)] rounded-full animate-spin" />
      </div>
    );
  }

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const isBugReport = project.type === "bug-report";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10 text-[var(--foreground)]">
      {/* Back Button */}
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-12"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        
        {/* Project Header */}
        <div className="border-b border-[var(--border)] pb-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-[var(--foreground)]">
              {project.title}
            </h1>
            <span className="text-xs text-[var(--muted-foreground)] font-sans">
              {isBugReport ? "2026 · QA Testing" : "2026 · Enterprise System"}
            </span>
          </div>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] font-sans leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Bug Report Metadata Bar */}
          {isBugReport && (
            <div className="flex flex-wrap gap-3 mt-6">
              {project.severity && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold tracking-wider uppercase rounded-sm">
                  <AlertTriangle className="w-3 h-3" />
                  {project.severity} Severity
                </span>
              )}
              {project.environment && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background-alt)] border border-[var(--border)] text-[var(--muted-foreground)] text-[11px] font-medium tracking-wide rounded-sm">
                  <Monitor className="w-3 h-3" />
                  {project.environment}
                </span>
              )}
              {project.targetUrl && (
                <a
                  href={project.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--background-alt)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-[11px] font-medium tracking-wide rounded-sm transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  Target URL
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Cinematic Cover Image */}
        <div className="relative aspect-[21/9] w-full mb-12 overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--background-alt)] group">
          {hasScreenshots ? (
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img
                src={project.screenshots[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs font-bold tracking-widest uppercase opacity-20">Preview Unavailable</span>
            </div>
          )}
        </div>

        {/* Details Overview */}
        <section className="mb-14">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4">
            OVERVIEW
          </h2>
          <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans leading-relaxed max-w-3xl mb-6">
            {project.details}
          </p>
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity text-xs font-semibold tracking-wide rounded-sm shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View SQL Source
            </a>
          )}
        </section>

        {/* Bug Report: Steps to Reproduce */}
        {isBugReport && project.bugReport && (
          <section className="mb-14">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-6">
              STEPS TO REPRODUCE
            </h2>
            <div className="space-y-4">
              {project.bugReport.stepsToReproduce.map((step, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-bold font-sans">
                    {i + 1}
                  </div>
                  <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans leading-relaxed pt-1.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bug Report: Expected vs Actual Result */}
        {isBugReport && project.bugReport && (
          <section className="mb-16 relative">
            <div className="absolute -inset-x-6 inset-y-0 bg-[var(--background-alt)] border-y border-[var(--border)] -z-10 rounded-sm" />
            <div className="py-10 px-2 md:px-0">
              <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--foreground)] uppercase mb-8">
                EXPECTED VS. ACTUAL RESULT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Expected Result */}
                <div className="relative p-6 bg-[var(--background)] border border-emerald-500/20 rounded-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500 rounded-t-sm" />
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                      Expected Result
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {project.bugReport.expectedResult}
                  </p>
                </div>

                {/* Actual Result */}
                <div className="relative p-6 bg-[var(--background)] border border-red-500/20 rounded-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-500 rounded-t-sm" />
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <h4 className="text-[11px] font-bold tracking-wider uppercase text-red-600 dark:text-red-400">
                      Actual Result
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {project.bugReport.actualResult}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Case Study Section */}
        {(project.challenge || project.solution || project.impact) && (
          <section className="mb-16 relative">
            <div className="absolute -inset-x-6 inset-y-0 bg-[var(--background-alt)] border-y border-[var(--border)] -z-10 rounded-sm" />
            
            <div className="py-10 px-2 md:px-0">
              <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--foreground)] uppercase mb-8">
                CASE STUDY
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Challenge */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-wider uppercase text-[var(--foreground)]">The Challenge</h4>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)] italic">
                    "{project.challenge}"
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-wider uppercase text-[var(--foreground)]">The Solution</h4>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {project.solution}
                  </p>
                </div>

                {/* Impact */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-wider uppercase text-[var(--foreground)]">Impact</h4>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)] font-semibold">
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technology & Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Tech Stack */}
          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4">
              TECH STACK
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[var(--background-alt)] border border-[var(--border)] text-[11px] font-sans font-medium text-[var(--muted-foreground)] tracking-wide rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4">
              KEY FEATURES
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)] mt-1.5 flex-shrink-0 opacity-40" />
                  <span className="text-xs md:text-sm text-[var(--muted-foreground)] font-sans leading-normal">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Screenshot Gallery / Visual Evidence */}
        <section className="mb-14 border-t border-[var(--border)] pt-12">
          <h2 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-6">
            {isBugReport ? "VISUAL EVIDENCE / PROOF OF CONCEPT" : "SCREENSHOT GALLERY"}
          </h2>

          {hasScreenshots ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.screenshots.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video bg-[var(--background-alt)] border border-[var(--border)] rounded-sm overflow-hidden group hover:border-[var(--foreground)] transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 border border-dashed border-[var(--border)] rounded-sm gap-3">
              <ImageOff className="w-5 h-5 text-[var(--muted-foreground)] opacity-30" />
              <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] opacity-40">
                Screenshots coming soon
              </p>
            </div>
          )}
        </section>

      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && hasScreenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-6 text-xs font-bold tracking-widest text-white/70">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(project.screenshots.length).padStart(2, "0")}
            </span>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[80vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.screenshots[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Prev/Next Navigation Controls */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 p-3 text-white/70 hover:text-white border border-white/10 bg-black/25 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 p-3 text-white/70 hover:text-white border border-white/10 bg-black/25 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
