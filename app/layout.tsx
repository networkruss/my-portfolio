"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("./components/AnimatedBackground"), { 
  ssr: false 
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#030303] text-slate-400 font-sans min-h-screen flex flex-col antialiased">
        {/* Background Layer Group */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
           <AnimatedBackground />
           {/* Center Shadow for Text Clarity */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,3,3,0)_0%,#030303_100%)]" />
           {/* Subtle Noise Texture */}
           <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <motion.div 
          className="fixed top-0 left-0 right-0 h-[1px] bg-blue-500/30 z-[60] origin-left"
          style={{ scaleX }}
        />
        
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.02] bg-black/5 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-8 h-16 flex justify-between items-center">
            <Link 
              href="/" 
              onClick={() => setActiveTab("Home")}
              className="text-[10px] font-bold tracking-[0.5em] text-white uppercase italic"
            >
              N. RUSSEL
            </Link>

            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={() => setActiveTab(item.name)}
                  className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all ${
                    activeTab === item.name ? "text-blue-500" : "text-slate-600 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="flex-1 relative z-10 pt-16">{children}</main>

        <footer className="py-20 border-t border-white/2 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-slate-700">
            © {new Date().getFullYear()} — Handcrafted in PH
          </p>
        </footer>
      </body>
    </html>
  );
}