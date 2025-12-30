"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const updateSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(DPR, DPR);
    };
    updateSize();

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; rot: number; vrot: number;
      hue: number; life: number; maxLife: number;
    };

    const particles: Particle[] = [];
    const max = 40;

    function createParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.4 + 0.1;

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 15 + 2,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.01,
        hue: 210,
        life: 0,
        maxLife: Math.random() * 15 + 10,
      });
    }

    for (let i = 0; i < max; i++) createParticle();

    function render() {
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/1.2);
      grad.addColorStop(0, "rgba(3, 3, 3, 0)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.8)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.life += 0.01;

        if (p.life > p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particles.splice(i, 1);
          createParticle();
        }

        const alpha = Math.min(p.life, p.maxLife - p.life, 1) * 0.15;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.strokeStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", updateSize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
  );
}
