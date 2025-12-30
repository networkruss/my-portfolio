"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Fetching the list from your API to match the current ID
    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.id === id);
        setProject(found);
      });
  }, [id]);

  if (!project) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 text-white">
      <Link href="/projects" className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-all mb-12">
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        Back to Works
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">{project.title}</h1>
        
        <div className="p-12 border border-white/5 bg-white/[0.01] rounded-sm text-center">
          <Construction className="w-6 h-6 text-blue-500 mx-auto mb-6 opacity-50" />
          <h2 className="text-[10px] font-black tracking-[0.5em] uppercase mb-4">Documentation In Progress</h2>
          <p className="text-slate-500 text-[11px] uppercase tracking-widest max-w-xs mx-auto leading-relaxed italic">
            Technical migration from local environment is ongoing.
          </p>
        </div>
      </motion.div>
    </div>
  );
}