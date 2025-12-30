"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/60 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl max-w-lg"
      >
        <h1 className="text-9xl font-black tracking-tighter text-blue-500/20 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
          404
        </h1>
        <h2 className="text-4xl font-black mb-4 tracking-tight">PAGE NOT FOUND</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The link might be broken, or the page has been moved to a new digital dimension.
        </p>
        <Link 
          href="/" 
          className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 tracking-widest uppercase text-xs"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}