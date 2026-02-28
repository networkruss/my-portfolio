"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X, Download, Eye, FileText, Monitor } from "lucide-react";
import GitFeed from "./components/GitFeed";
import InteractiveResume from "./components/InteractiveResume";
import dynamic from "next/dynamic";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeMode, setResumeMode] = useState<"digital" | "pdf">("digital");

  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const viewResume = () => {
    setIsResumeOpen(true);
    setResumeMode("digital");
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="text-center w-full max-w-5xl"
      >
        <motion.p variants={FADE_UP} className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-blue-600 dark:text-blue-500/80 mb-6">Web Developer</motion.p>
        <motion.h1 variants={FADE_UP} className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-[var(--foreground)]">CRAFTING <br /> <span className="text-[var(--foreground)]/10 dark:text-[var(--foreground)]/20">DIGITAL.</span></motion.h1>
        <motion.p variants={FADE_UP} className="text-[var(--muted-foreground)] text-xs md:text-sm lg:text-base max-w-[280px] sm:max-w-sm mx-auto mb-12 uppercase">Designing cleaner spaces where <span className="text-[var(--foreground)] font-medium">logic meets aesthetics</span>.</motion.p>

        <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center">
          <Link href="/projects" className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--foreground)] border-b border-[var(--border)] pb-1 hover:border-blue-600 dark:hover:border-blue-500 transition-all">[ View Work ]</Link>
          
          <button onClick={viewResume} className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer bg-transparent border-none uppercase tracking-[0.4em]">Resume</button>

          <Link href="/contact" className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all">Connect</Link>
        </motion.div>
      </motion.div>

      {/* RECENT ACTIVITY / GIT FEED SECTION */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 md:mt-32 w-full flex flex-col items-center"
      >
        <GitFeed />
        <p className="mt-8 text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] opacity-40 max-w-[200px] text-center leading-relaxed">
          System automatically logs local development focus and simulated commit history
        </p>
      </motion.div>

      {/* RESPONSIVE RESUME MODAL (CV 2.0) */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 dark:bg-black/95 backdrop-blur-md p-0 md:p-6"
          >
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:max-w-6xl h-[92vh] md:h-[85vh] bg-[var(--background)] border-t md:border border-[var(--border)] rounded-t-xl md:rounded-sm overflow-hidden flex flex-col"
            >
              {/* Responsive Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)] bg-[var(--background)]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <FileText className="w-3 h-3 text-blue-500" />
                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] uppercase text-[var(--muted-foreground)]">Curriculum_Vitae</span>
                  </div>
                  
                  {/* Mode Toggles */}
                  <div className="hidden md:flex items-center gap-2 p-1 bg-[var(--muted)]/50 dark:bg-white/[0.03] rounded-sm">
                    <button 
                      onClick={() => setResumeMode("digital")}
                      className={`flex items-center gap-2 px-3 py-1.5 text-[8px] font-black tracking-widest uppercase transition-all rounded-sm ${resumeMode === 'digital' ? 'bg-[var(--background)] text-blue-500 shadow-sm' : 'text-[var(--muted-foreground)] opacity-50'}`}
                    >
                      <Monitor className="w-2.5 h-2.5" /> Digital
                    </button>
                    <button 
                      onClick={() => setResumeMode("pdf")}
                      className={`flex items-center gap-2 px-3 py-1.5 text-[8px] font-black tracking-widest uppercase transition-all rounded-sm ${resumeMode === 'pdf' ? 'bg-[var(--background)] text-blue-500 shadow-sm' : 'text-[var(--muted-foreground)] opacity-50'}`}
                    >
                      <Download className="w-2.5 h-2.5" /> PDF Preview
                    </button>
                  </div>
                </div>
                <button onClick={() => setIsResumeOpen(false)} className="p-2 -mr-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><X className="w-6 h-6 md:w-5 md:h-5" /></button>
              </div>

              {/* Viewer Content */}
              <div className="flex-1 w-full bg-[var(--background)] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {resumeMode === "digital" ? (
                    <motion.div
                      key="digital"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full"
                    >
                      <InteractiveResume />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="pdf"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full p-4 md:p-10 bg-black/5 dark:bg-black/20"
                    >
                      <iframe 
                        src="/resume.pdf#view=FitH" 
                        className="w-full h-full border-none sm:block hidden rounded-sm shadow-2xl" 
                        title="Resume Desktop"
                      />
                      <div className="sm:hidden w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <Download className="w-8 h-8 text-blue-500 animate-bounce" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] leading-relaxed">
                          For Better View, touch download or open the PDF in full screen mode.
                        </p>
                        <a href="/resume.pdf" target="_blank" className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">VIEW DOCUMENT</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Responsive Footer */}
              <div className="p-6 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="hidden md:block text-[8px] text-[var(--muted-foreground)] uppercase tracking-widest italic font-medium opacity-50">Neil Russel Soliven — Digital CV 2025</p>
                  <div className="md:hidden flex gap-2">
                    <button onClick={() => setResumeMode("digital")} className={`text-[9px] font-black tracking-widest uppercase ${resumeMode === 'digital' ? 'text-blue-500' : 'text-[var(--muted-foreground)]'}`}>Digital</button>
                    <span className="text-[var(--border)]">/</span>
                    <button onClick={() => setResumeMode("pdf")} className={`text-[9px] font-black tracking-widest uppercase ${resumeMode === 'pdf' ? 'text-blue-500' : 'text-[var(--muted-foreground)]'}`}>PDF</button>
                  </div>
                </div>
                <a 
                  href="/resume.pdf" 
                  download 
                  className="flex items-center gap-3 text-[9px] font-black tracking-[0.3em] uppercase text-blue-500 hover:text-blue-600 transition-all"
                >
                  <Download className="w-3 h-3" /> [ Get Copy ]
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}