"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  level: number; // 1-10
}

const skills: Skill[] = [
  { name: "Next.js", category: "frontend", level: 9 },
  { name: "React", category: "frontend", level: 9 },
  { name: "TypeScript", category: "frontend", level: 8 },
  { name: "Tailwind", category: "frontend", level: 9 },
  { name: "Framer Motion", category: "frontend", level: 8 },
  { name: "Node.js", category: "backend", level: 8 },
  { name: "Spring Boot", category: "backend", level: 7 },
  { name: "PHP", category: "backend", level: 8 },
  { name: "MySQL", category: "database", level: 8 },
  { name: "PostgreSQL", category: "database", level: 7 },
  { name: "Directus", category: "tools", level: 9 },
  { name: "Docker", category: "tools", level: 6 },
  { name: "Git", category: "tools", level: 8 },
  { name: "Vercel", category: "tools", level: 8 },
];

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square md:aspect-video bg-[var(--muted)]/5 rounded-3xl border border-[var(--border)]/10 overflow-hidden flex items-center justify-center p-8 md:p-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl">
        {skills.map((skill, index) => (
          <SkillBadge 
            key={skill.name} 
            skill={skill} 
            index={index} 
            mouseX={springX} 
            mouseY={springY} 
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Floating background blobs */}
      <motion.div 
        animate={{ 
          x: [0, 20, 0], 
          y: [0, -20, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0], 
          y: [0, 30, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" 
      />
    </div>
  );
}

function SkillBadge({ 
  skill, 
  index, 
  mouseX, 
  mouseY, 
  containerRef 
}: { 
  skill: Skill; 
  index: number; 
  mouseX: any; 
  mouseY: any;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Magnetic effect calculations
  const distanceX = useMotionValue(0);
  const distanceY = useMotionValue(0);

  useEffect(() => {
    const updateDistance = () => {
      if (!badgeRef.current || !containerRef.current) return;
      
      const badgeRect = badgeRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const badgeCenterX = badgeRect.left + badgeRect.width / 2 - containerRect.left;
      const badgeCenterY = badgeRect.top + badgeRect.height / 2 - containerRect.top;
      
      const dx = mouseX.get() - badgeCenterX;
      const dy = mouseY.get() - badgeCenterY;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 150;

      if (distance < radius && mouseX.get() !== 0) {
        // Inverse strength based on distance
        const strength = (1 - distance / radius) * 15;
        distanceX.set(dx * (strength / 100));
        distanceY.set(dy * (strength / 100));
      } else {
        distanceX.set(0);
        distanceY.set(0);
      }
    };

    const unsubscribeX = mouseX.onChange(updateDistance);
    const unsubscribeY = mouseY.onChange(updateDistance);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, containerRef, distanceX, distanceY]);

  const x = useSpring(distanceX, { damping: 20, stiffness: 100 });
  const y = useSpring(distanceY, { damping: 20, stiffness: 100 });

  const colors = {
    frontend: "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400",
    backend: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    database: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
    tools: "border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  };

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { 
          delay: index * 0.05, 
          type: "spring", 
          stiffness: 100, 
          damping: 15 
        } 
      }}
      viewport={{ once: true }}
      style={{ x, y }}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "rgba(var(--foreground-rgb), 0.05)",
        transition: { duration: 0.2 } 
      }}
      className={`
        px-4 py-2 rounded-full border text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase 
        whitespace-nowrap cursor-default shadow-sm backdrop-blur-sm
        ${colors[skill.category]}
        transition-colors duration-200
      `}
    >
      {skill.name}
    </motion.div>
  );
}
