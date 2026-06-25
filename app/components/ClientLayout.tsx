"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X as CloseIcon, Github, Linkedin, Mail } from "lucide-react";

const navItems = [
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update active tab based on pathname
  useEffect(() => {
    const current = navItems.find((item) => item.href === pathname);
    if (current) {
      setActiveTab(current.name);
    } else {
      setActiveTab("");
    }
  }, [pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-[var(--foreground)] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Main Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex justify-between items-center">
          {/* Logo - Casing exactly like the screenshots */}
          <Link
            href="/"
            className="text-base font-bold font-sans tracking-tight text-[var(--foreground)] hover:opacity-85 transition-opacity"
          >
            Neil Russel
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 md:space-x-12">
            <div className="hidden sm:flex items-center space-x-8 md:space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[13px] font-sans font-medium transition-colors ${
                    activeTab === item.name
                      ? "text-[var(--foreground)] border-b border-[var(--foreground)] pb-1"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="sm:hidden p-2 text-[var(--foreground)] hover:bg-[var(--background-alt)] rounded-sm transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[var(--background)] flex flex-col p-6 sm:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xs font-bold tracking-widest text-[var(--foreground)] uppercase">Navigation</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-[var(--foreground)]"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8 pl-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl font-sans font-semibold tracking-tight ${
                    activeTab === item.name ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-[var(--border)] pt-8 flex justify-between items-center">
              <p className="text-[10px] tracking-wide uppercase text-[var(--muted-foreground)] opacity-70">
                © 2025 — Neil Russel
              </p>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with custom Framer Motion page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 relative z-10 pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Global Footer (styled exactly like Slide 5) */}
      <footer className="w-full border-t border-[var(--border)] bg-[var(--background)] py-12 md:py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Left: Name logo */}
          <Link
            href="/"
            className="text-base font-bold font-sans tracking-tight text-[var(--foreground)] hover:opacity-85 transition-opacity"
          >
            Neil Russel
          </Link>

          {/* Center: Designed & built tag */}
          <p className="text-xs text-[var(--muted-foreground)] text-center font-sans tracking-wide">
            © 2025 · Designed & built with intention.
          </p>

          {/* Right: Clean, un-decorated links/icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/networkruss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="https://www.linkedin.com/in/nrsoliven/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="mailto:soliven.neilrussel.d@gmail.com"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}
