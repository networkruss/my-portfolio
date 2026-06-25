"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Expertise data structured as 3-column categories matching the reference design
const expertise = {
  Frontend: [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/ui",
    "Framer Motion",
  ],
  Backend: [
    "Node.js",
    "Spring Boot",
    "Directus CMS",
    "MySQL / PostgreSQL",
    "REST APIs",
  ],
  Process: [
    "Database Architecture",
    "ERP Systems Design",
    "Headless CMS Strategy",
    "Inventory Modeling",
    "Agile Development",
  ],
};

export default function AboutPage() {
  const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10 text-[var(--foreground)]">
      
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={FADE_UP}
        className="mb-16 border-b border-[var(--border)] pb-8"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase block mb-3 font-sans">
          ABOUT
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight text-[var(--foreground)] mb-4">
          The Developer
        </h1>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] font-sans max-w-2xl leading-relaxed">
          Neil Russel Soliven — Web Developer & Systems Engineer based in the Philippines.
        </p>
      </motion.div>

      {/* Main Grid Content */}
      <div className="space-y-16">
        
        {/* Narrative bio section with profile picture */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          <div className="space-y-6 md:col-span-8">
            <p className="text-lg md:text-xl font-serif font-light leading-relaxed text-[var(--foreground)]">
              I specialize in architecting full-stack systems with Next.js, Directus, and MySQL/PostgreSQL, bridging the gap between complex database operations and client-facing web applications.
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)] font-sans">
              <p>
                My work focuses heavily on developing custom enterprise resource planning (ERP) modules, workflow automation engines, and inventory management systems. I approach development with a core emphasis on structural clean code, robust schema design, and seamless user experience.
              </p>
              <p>
                By utilizing headless CMS API layers like Directus alongside modern database instances, I design and deploy flexible, high-performance architectures that scale efficiently to solve real-world business challenges.
              </p>
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--background-alt)] group">
              <img
                src="/profile.jpg"
                alt="Neil Russel Soliven"
                className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Experience Log Table Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="border-t border-[var(--border)] pt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                EXPERIENCE LOG
              </h3>
            </div>
            <div className="md:col-span-8 divide-y divide-[var(--border)]">
              
              {/* Exp 1 */}
              <div className="py-6 first:pt-0 last:pb-0 space-y-2">
                <span className="text-xs font-semibold text-[var(--foreground)] block">
                  2026 — Present
                </span>
                <h4 className="text-base font-semibold text-[var(--foreground)]">
                  Web Developer / Full Stack
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] font-sans leading-relaxed">
                  Developing enterprise-scale ERP modules, including the SCM Planner and BIA Stock Health Monitor. Architecting headless CMS solutions, complex direct database query connections, and live forecast simulators.
                </p>
              </div>

              {/* Exp 2 */}
              <div className="py-6 first:pt-0 last:pb-0 space-y-2">
                <span className="text-xs font-semibold text-[var(--foreground)] block">
                  2026
                </span>
                <h4 className="text-base font-semibold text-[var(--foreground)]">
                  Full Stack Developer — ERP & Internal Tools
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] font-sans leading-relaxed">
                  Built end-to-end Purchase Order workflows, barcode/RFID-driven Stock Transfer modules, and real-time inventory dashboards for warehouse and branch operations.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Expertise Section — Clean 3-column grid matching reference */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="border-t border-[var(--border)] pt-12"
        >
          <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-10">
            EXPERTISE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">
            {Object.entries(expertise).map(([category, skills]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-base font-serif font-semibold text-[var(--foreground)]">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-[var(--muted-foreground)] font-sans leading-normal"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons — Get in touch + Download CV */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity font-sans text-xs md:text-sm font-semibold tracking-wide rounded-sm group shadow-sm"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background-alt)] transition-all font-sans text-xs md:text-sm font-semibold tracking-wide rounded-sm group"
          >
            Download CV
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
        
      </div>
    </div>
  );
}
