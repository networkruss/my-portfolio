"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

const AnimatedBackground = dynamic(() => import("./components/AnimatedBackground"), { 
  ssr: false 
});

const ChatAssistant = dynamic(() => import("./components/ChatAssistant"), {
  ssr: false
});

const LiquidCursor = dynamic(() => import("./components/LiquidCursor"), {
  ssr: false
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Update active tab based on pathname
  useEffect(() => {
    const current = navItems.find(item => item.href === pathname);
    if (current) setActiveTab(current.name);
  }, [pathname]);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--muted-foreground)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LiquidCursor />
          {/* Background Layer Group */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <AnimatedBackground />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-40 dark:opacity-80" />
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <motion.div 
            className="fixed top-0 left-0 right-0 h-[1px] bg-blue-500/30 z-[60] origin-left"
            style={{ scaleX }}
          />
          
          <nav className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border)]/10 bg-[var(--background)]/5 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex justify-between items-center">
              <Link 
                href="/" 
                className="text-[10px] font-bold tracking-[0.5em] text-[var(--foreground)] uppercase italic"
              >
                N. RUSSEL
              </Link>

              <div className="flex items-center space-x-6 md:space-x-10">
                <div className="hidden sm:flex items-center space-x-6 md:space-x-10">
                  {navItems.map((item) => (
                    <MagneticLink 
                      key={item.name}
                      href={item.href} 
                      isActive={activeTab === item.name}
                    >
                      {item.name}
                    </MagneticLink>
                  ))}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </nav>

          <AnimatePresence mode="wait">
            <motion.main 
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 relative z-10 pt-16"
            >
              {children}
            </motion.main>
          </AnimatePresence>

          <ChatAssistant />

          <footer className="py-20 border-t border-[var(--border)]/10 text-center">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-foreground)] opacity-60">
              © {new Date().getFullYear()} — Handcrafted in PH
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

function MagneticLink({ href, children, isActive }: { href: string; children: string; isActive: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <Link 
        href={href} 
        className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all px-2 py-1 ${
          isActive ? "text-blue-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}