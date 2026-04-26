"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
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
        <div className="w-4 h-4 border border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 relative z-10 text-[var(--foreground)]">
      {/* Back Button */}
      <Link
        href="/projects"
        className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all mb-16"
      >
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        Back to Works
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

        {/* CINEMATIC HERO */}
        <div className="relative aspect-[21/9] w-full mb-16 overflow-hidden rounded-sm group">
          {project.screenshots && project.screenshots.length > 0 ? (
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img
                src={project.screenshots[0]}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-[var(--muted)]/5 flex items-center justify-center border border-[var(--border)]/10">
              <span className="text-[9px] font-black tracking-[0.5em] uppercase opacity-20">Preview_Unavailable</span>
            </div>
          )}
          {/* Gradients for depth */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_120%)] opacity-30" />
        </div>

        {/* Header */}
        <div className="border-l border-[var(--border)]/10 pl-6 md:pl-8 mb-14">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-[var(--foreground)]">
              {project.title}
            </h1>
            {project.isOngoing && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                <span className="text-[8px] font-black tracking-[0.2em] text-blue-500 uppercase">
                  Work in Progress
                </span>
              </div>
            )}
          </div>
          <p className="text-[var(--muted-foreground)] text-[11px] md:text-xs uppercase tracking-widest leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* --- SCREENSHOT GALLERY --- */}
        <section className="mb-14">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[var(--muted-foreground)] dark:opacity-50 mb-5">
            Screenshots
          </p>

          {hasScreenshots ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.screenshots.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video bg-[var(--muted)]/5 border border-[var(--border)]/10 rounded-sm overflow-hidden group hover:border-blue-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 text-[8px] font-bold tracking-widest text-white/40 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          ) : (
            // Empty state — shown when screenshots folder is empty
            <div className="flex flex-col items-center justify-center h-40 border border-dashed border-[var(--border)]/20 rounded-sm gap-3">
              <ImageOff className="w-5 h-5 text-[var(--muted-foreground)] opacity-30" />
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted-foreground)] opacity-30">
                Screenshots coming soon
              </p>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]/10 mb-14" />

        {/* Details */}
        <section className="mb-20">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[var(--muted-foreground)] dark:opacity-50 mb-6">
            Overview
          </p>
          <p className="text-[var(--muted-foreground)] text-[12px] md:text-sm leading-relaxed tracking-wide font-medium max-w-3xl mb-8">
            {project.details}
          </p>
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4" />
              View SQL Source
            </a>
          )}
        </section>

        {/* --- CASE STUDY SECTION --- */}
        {(project.challenge || project.solution || project.impact) && (
          <section className="mb-24 relative">
             {/* Decorative Background for Case Study */}
            <div className="absolute -inset-x-6 inset-y-0 bg-[var(--muted)]/20 dark:bg-white/[0.01] -z-10 rounded-xl border-y border-[var(--border)]/5" />
            
            <div className="py-12 px-2 md:px-0">
              <h3 className="text-[9px] font-black tracking-[0.5em] uppercase text-blue-500 mb-12 flex items-center gap-4">
                <span className="h-px w-8 bg-blue-500/30" />
                Case Study
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                {/* Challenge */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-[var(--foreground)]">The Challenge</h4>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider italic">
                    "{project.challenge}"
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-blue-500">The Solution</h4>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider">
                    {project.solution}
                  </p>
                </div>

                {/* Impact */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-emerald-500">Impact</h4>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] uppercase tracking-wider font-bold">
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack + Features — Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

          {/* Tech Stack */}
          <section>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[var(--muted-foreground)] dark:opacity-50 mb-5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-[var(--border)]/20 text-[var(--muted-foreground)] hover:border-blue-500/50 hover:text-blue-500 transition-all duration-300 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[var(--muted-foreground)] dark:opacity-50 mb-5">
              Key Features
            </p>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && hasScreenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 dark:bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-6 text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--muted-foreground)]">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(project.screenshots.length).padStart(2, "0")}
            </span>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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

            {/* Prev */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 md:left-6 p-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/10 hover:border-blue-500/50 bg-[var(--background)]/50 rounded-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 md:right-6 p-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]/10 hover:border-blue-500/50 bg-[var(--background)]/50 rounded-sm transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-6 flex gap-2">
              {project.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === lightboxIndex ? "bg-blue-500 w-4" : "bg-[var(--foreground)]/20 hover:bg-[var(--foreground)]/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
