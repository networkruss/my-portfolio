"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommit, ExternalLink } from "lucide-react";

interface Activity {
  id: string;
  type: "commit" | "focus";
  project: string;
  message: string;
  timestamp: string;
  hash?: string;
}

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "focus",
    project: "My Portfolio",
    message: "Implementing Liquid Cursor and Page Transitions",
    timestamp: "Just now",
  },
  {
    id: "2",
    type: "commit",
    project: "Stock Transfer Module",
    message: "feat: Added RFID scanning logic and jspdf integration",
    timestamp: "2 hours ago",
    hash: "a2b3c4d",
  },
  {
    id: "3",
    type: "commit",
    project: "SCM Planner",
    message: "refactor: Optimized procurement calculation engine",
    timestamp: "1 day ago",
    hash: "9f8e7d6",
  },
];

export default function GitFeed() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-md bg-[var(--background-alt)] dark:bg-white/[0.02] border border-[var(--border)]/10 rounded-xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3 h-3 text-blue-500" />
          <h3 className="text-[9px] font-black tracking-[0.4em] uppercase text-[var(--muted-foreground)] opacity-70">Activity_Log</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[8px] font-bold tracking-widest uppercase text-emerald-500/80">Live</span>
        </div>
      </div>

      <div className="space-y-6">
        {recentActivities.map((activity, index) => (
          <div key={activity.id} className="relative pl-6 border-l border-[var(--border)]/10">
            {/* Dot on line */}
            <div className={`absolute -left-[4.5px] top-1 w-2 h-2 rounded-full border-2 border-[var(--background)] ${activity.type === 'focus' ? 'bg-blue-500' : 'bg-[var(--muted-foreground)]/30'}`} />
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold tracking-widest uppercase text-blue-500/60">[{activity.project}]</span>
                <span className="text-[8px] font-medium tracking-tighter text-[var(--muted-foreground)] opacity-50 italic">{activity.timestamp}</span>
              </div>
              
              <p className="text-[10px] md:text-[11px] font-medium text-[var(--foreground)] tracking-wide leading-relaxed">
                {activity.message}
              </p>

              {activity.hash && (
                <div className="flex items-center gap-2 mt-1">
                  <GitCommit className="w-2.5 h-2.5 text-[var(--muted-foreground)] opacity-40" />
                  <code className="text-[8px] font-mono text-[var(--muted-foreground)] opacity-40 uppercase tracking-tighter">{activity.hash}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border)]/5 flex justify-center">
        <button className="flex items-center gap-2 group text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--muted-foreground)] hover:text-blue-500 transition-colors">
          View all history <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </button>
      </div>
    </motion.div>
  );
}
