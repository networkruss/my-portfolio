"use client";

import { useState } from "react"; // Added useState
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { X } from "lucide-react"; // Import X icon para sa close button

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false); // State para sa Popup

  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="text-center w-full max-w-5xl"
      >
        <motion.p 
          variants={FADE_UP}
          className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500/80 mb-6"
        >
          Web Developer
        </motion.p>

        <motion.h1 
          variants={FADE_UP}
          className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter break-words text-white"
        >
          CRAFTING <br /> 
          <span className="text-white/20">DIGITAL.</span>
        </motion.h1>

        <motion.p 
          variants={FADE_UP}
          className="text-slate-500 text-xs md:text-sm lg:text-base max-w-[280px] sm:max-w-sm mx-auto mb-12 tracking-wide leading-relaxed uppercase"
        >
          Designing cleaner spaces for the web <br className="hidden sm:block" /> 
          where <span className="text-white">logic meets aesthetics</span>.
        </motion.p>

        <motion.div 
          variants={FADE_UP} 
          className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center"
        >
          <Link
            href="/projects"
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white border-b border-white/20 pb-1 hover:border-blue-500 transition-all"
          >
            [ View Work ]
          </Link>
          
          {/* TRIGGER MODAL */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all cursor-pointer bg-transparent border-none outline-none"
          >
            Resume
          </button>

          <Link
            href="/contact"
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all"
          >
            Connect
          </Link>
        </motion.div>
      </motion.div>

      {/* RESUME MODAL POPUP */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col"
            >
              {/* Header ng Modal */}
              <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#0a0a0a]">
                <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-slate-500">Document_Viewer / CV</span>
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="p-1 hover:text-blue-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PDF Viewer Area */}
              <div className="flex-1 w-full bg-slate-900/20">
                <iframe 
                  src="/resume.pdf#toolbar=0" // #toolbar=0 para clean look, pero pwedeng alisin kung gusto mo ng controls agad
                  className="w-full h-full border-none"
                  title="Resume Preview"
                />
              </div>

              {/* Footer / Decided to Download */}
              <div className="p-4 border-t border-white/5 bg-[#0a0a0a] flex justify-center">
                <a 
                  href="/resume.pdf" 
                  download 
                  className="text-[9px] font-black tracking-[0.3em] uppercase text-blue-400 hover:text-white transition-all"
                >
                  [ Download Full Copy ]
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}