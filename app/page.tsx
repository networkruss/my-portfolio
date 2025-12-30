"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X, Download, Eye } from "lucide-react"; // Dagdag icons para sa mobile UX

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const viewResume = () => {
    setIsResumeOpen(true);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="text-center w-full max-w-5xl"
      >
        {/* ... (Keep your existing Header and Typography code here) ... */}
        <motion.p variants={FADE_UP} className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500/80 mb-6">Web Developer</motion.p>
        <motion.h1 variants={FADE_UP} className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-white">CRAFTING <br /> <span className="text-white/20">DIGITAL.</span></motion.h1>
        <motion.p variants={FADE_UP} className="text-slate-500 text-xs md:text-sm lg:text-base max-w-[280px] sm:max-w-sm mx-auto mb-12 uppercase">Designing cleaner spaces where <span className="text-white">logic meets aesthetics</span>.</motion.p>

        <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center">
          <Link href="/projects" className="text-[10px] font-bold tracking-[0.3em] uppercase text-white border-b border-white/20 pb-1 hover:border-blue-500 transition-all">[ View Work ]</Link>
          
          <button onClick={viewResume} className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all cursor-pointer bg-transparent border-none uppercase tracking-[0.4em]">Resume</button>

          <Link href="/contact" className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all">Connect</Link>
        </motion.div>
      </motion.div>

      {/* RESPONSIVE RESUME MODAL */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-6"
          >
            <motion.div 
              initial={{ y: "100%" }} // Slide up effect sa mobile
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:max-w-5xl h-[92vh] md:h-[85vh] bg-[#0a0a0a] border-t md:border border-white/10 rounded-t-xl md:rounded-sm overflow-hidden flex flex-col"
            >
              {/* Responsive Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  <Eye className="w-3 h-3 text-blue-500" />
                  <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">Preview_Mode</span>
                </div>
                <button onClick={() => setIsResumeOpen(false)} className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6 md:w-5 md:h-5" /></button>
              </div>

              {/* PDF Viewer Container */}
              <div className="flex-1 w-full bg-black relative overflow-hidden">
                <iframe 
                  src="/resume.pdf#view=FitH" 
                  className="w-full h-full border-none sm:block hidden" 
                  title="Resume Desktop"
                />
                {/* Fallback para sa Mobile (Direct view link kung mahirap i-render ang iframe sa phone) */}
                <div className="sm:hidden w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                   <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Download className="w-8 h-8 text-blue-500 animate-bounce" />
                   </div>
                   <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 leading-relaxed">
                     For Better View, touch download or buksan/open the PDF sa full screen mode.
                   </p>
                   <a href="/resume.pdf" target="_blank" className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">VIEW DOCUMENT</a>
                </div>
              </div>

              {/* Responsive Footer */}
              <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between">
                <p className="hidden md:block text-[8px] text-slate-600 uppercase tracking-widest italic font-medium">Neil Russel Soliven — CV 2025</p>
                <a 
                  href="/resume.pdf" 
                  download 
                  className="flex items-center gap-3 text-[9px] font-black tracking-[0.3em] uppercase text-blue-400 hover:text-white transition-all mx-auto md:mx-0"
                >
                  <Download className="w-3 h-3" /> [ Download Copy ]
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}