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
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-4 h-4 border border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 relative z-10 text-white">
      {/* Back Button */}
      <Link
        href="/projects"
        className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all mb-16"
      >
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        Back to Works
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

        {/* Header */}
        <div className="border-l border-white/10 pl-6 md:pl-8 mb-14">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              {project.title}
            </h1>
            {project.isOngoing && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                <span className="text-[8px] font-black tracking-[0.2em] text-blue-400 uppercase">
                  Work in Progress
                </span>
              </div>
            )}
          </div>
          <p className="text-slate-400 text-[11px] md:text-xs uppercase tracking-widest leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* --- SCREENSHOT GALLERY --- */}
        <section className="mb-14">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-600 mb-5">
            Screenshots
          </p>

          {hasScreenshots ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.screenshots.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video bg-white/5 border border-white/5 rounded-sm overflow-hidden group hover:border-blue-500/40 transition-all duration-300"
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
            <div className="flex flex-col items-center justify-center h-40 border border-dashed border-white/10 rounded-sm gap-3">
              <ImageOff className="w-5 h-5 text-slate-700" />
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-700">
                Screenshots coming soon
              </p>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-14" />

        {/* Details */}
        <section className="mb-14">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-600 mb-5">
            Overview
          </p>
          <p className="text-slate-400 text-[11px] md:text-xs leading-loose tracking-wider uppercase max-w-3xl">
            {project.details}
          </p>
        </section>

        {/* Tech Stack + Features — Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

          {/* Tech Stack */}
          <section>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-600 mb-5">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-white/10 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-600 mb-5">
              Key Features
            </p>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-slate-400">
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
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-6 text-[9px] font-bold tracking-[0.3em] uppercase text-slate-500">
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
                  className="absolute left-3 md:left-6 p-3 text-slate-500 hover:text-white border border-white/10 hover:border-white/30 bg-black/50 rounded-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 md:right-6 p-3 text-slate-500 hover:text-white border border-white/10 hover:border-white/30 bg-black/50 rounded-sm transition-all"
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
                    i === lightboxIndex ? "bg-blue-500 w-4" : "bg-white/20 hover:bg-white/40"
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