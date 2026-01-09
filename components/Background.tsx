import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; r: number; d: number; s: number }[] = [];
    const maxParticles = 100;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1, // radius
        d: Math.random() * maxParticles, // density
        s: Math.random() * 0.5 + 0.2 // speed
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.beginPath();
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    };

    let angle = 0;
    const update = () => {
      angle += 0.01;
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) { // 66.67% of the flakes
            particles[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, s: p.s };
          } else {
            // If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              particles[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d, s: p.s };
            } else {
              particles[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d, s: p.s };
            }
          }
        }
      }
    };

    let animationFrameId: number;
    const renderLoop = () => {
      draw();
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Deepest dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050a14] to-black"></div>
      
      {/* Snow Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-60 mix-blend-screen" />

      {/* Radial spotlight in center to backlight numbers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-sky-100 opacity-[0.02] blur-[150px] rounded-full"></div>

      {/* Flag Colors - Abstract and subtle - Shifted to more "Wintery" tones */}
      {/* Icy Blue */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-sky-800 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Pale Gold/Sun */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-700 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
    </div>
  );
};

export default Background;