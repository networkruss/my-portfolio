"use client";

import { useChat, Message } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, MinusSquare, Maximize2 } from "lucide-react";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-[90vw] sm:w-[380px] bg-[var(--background)] border border-[var(--border)]/20 rounded-xl overflow-hidden shadow-2xl flex flex-col mb-4 ${isMinimized ? "h-auto" : "h-[500px]"}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--border)]/10 bg-[var(--muted)]/30 flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">Russel AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] uppercase tracking-widest text-[var(--muted-foreground)]">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <MinusSquare className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--border)]"
                >
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--muted)]/50 flex items-center justify-center mb-2">
                        <MessageSquare className="w-6 h-6 text-[var(--muted-foreground)] opacity-20" />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
                        Ask me about Russel&apos;s projects, skills, or experience.
                      </p>
                    </div>
                  )}
                  {messages.map((m: Message) => (
                    <div 
                      key={m.id} 
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border ${
                          m.role === "user" ? "bg-[var(--muted)] border-[var(--border)]/20" : "bg-blue-500/10 border-blue-500/20"
                        }`}>
                          {m.role === "user" ? <User className="w-3 h-3 text-[var(--muted-foreground)]" /> : <Bot className="w-3 h-3 text-blue-500" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-[11px] leading-relaxed tracking-wide ${
                          m.role === "user" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-[var(--muted)]/50 text-[var(--foreground)] rounded-tl-none border border-[var(--border)]/10"
                        }`}>
                          {m.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-blue-500" />
                        </div>
                        <div className="bg-[var(--muted)]/50 p-3 rounded-2xl rounded-tl-none border border-[var(--border)]/10 flex gap-1 items-center">
                          <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" />
                          <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] leading-relaxed">
                      <p className="font-bold uppercase tracking-wider mb-1">Error Occurred</p>
                      {error.message || "An unexpected error occurred. Please check your API key configuration."}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form 
                  onSubmit={handleSubmit}
                  className="p-4 border-t border-[var(--border)]/10 bg-[var(--background)]"
                >
                  <div className="relative flex items-center">
                    <input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="w-full bg-[var(--muted)]/30 border border-[var(--border)]/20 rounded-full py-2.5 px-4 pr-10 text-[11px] focus:outline-none focus:border-blue-500/50 transition-all text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1.5 p-1.5 text-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-blue-500 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[7px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] opacity-40 mt-2 text-center">
                    AI can make mistakes. Verify important info.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">1</span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
