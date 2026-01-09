import React, { useEffect, useState } from 'react';
import { getKazakhstanTime } from '../utils/time';
import { TimeState } from '../types';

const ClockDisplay: React.FC = () => {
  const [time, setTime] = useState<TimeState>(getKazakhstanTime());
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const t = getKazakhstanTime();
      setTime(t);

      // Countdown logic
      const now = new Date();
      // Use client time for countdown relative to user, or hardcode to KZ time. 
      // For visual simplicity, let's target next Jan 1st based on local system time (simplest for a visualizer)
      // Or better, target Jan 1st in Kazakhstan time.
      const currentYear = now.getFullYear();
      const nextYear = new Date(Date.UTC(currentYear + 1, 0, 1, -5, 0, 0)); // UTC+5 offset inverted is -5
      
      const diff = nextYear.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      } else {
        setCountdown("Happy New Year!");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative z-10 flex flex-col items-center justify-between h-screen w-full select-none py-12 md:py-0 overflow-hidden">
      
      {/* Top Section: Date & Location */}
      <div className="flex flex-col items-center justify-center pt-8 md:pt-16 z-20">
        <div className="text-sky-200/60 font-medium tracking-[0.4em] text-xs md:text-sm uppercase font-sans animate-fade-in mb-3">
          {time.date}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-500"></div>
          <h1 className="text-white text-base md:text-2xl font-bold tracking-[0.3em] uppercase font-sans drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Kazakhstan
          </h1>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
        </div>
      </div>

      {/* Main Time Display - Massive */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative perspective-1000">
        
        {/* Container for alignment */}
        <div className="flex flex-col md:flex-row items-center justify-center leading-none transform transition-transform duration-1000">
          
          {/* Hours */}
          <div className="relative group">
            <span className="text-[50vw] md:text-[32vw] font-bold tracking-tighter icy-text font-mono transform hover:scale-105 transition-transform duration-700 ease-out select-none" style={{ textShadow: '0 0 60px rgba(186, 230, 253, 0.2)' }}>
              {time.hours}
            </span>
          </div>

          {/* Separator - Hidden on mobile stack */}
          <div className="hidden md:block text-[20vw] -mt-[4vw] px-4 text-sky-200/20 animate-pulse font-mono select-none">
            :
          </div>

          {/* Minutes */}
          <div className="relative group -mt-[8vw] md:mt-0">
             <span className="text-[50vw] md:text-[32vw] font-bold tracking-tighter icy-text font-mono transform hover:scale-105 transition-transform duration-700 ease-out select-none" style={{ textShadow: '0 0 60px rgba(186, 230, 253, 0.2)' }}>
              {time.minutes}
            </span>
          </div>

        </div>

        {/* Seconds - Integrated beautifully */}
        <div className="absolute right-6 bottom-[25%] md:bottom-auto md:right-[5%] md:top-[65%] overflow-hidden mix-blend-overlay">
          <div className="relative">
             <span className="block text-[15vw] md:text-[8vw] font-mono font-bold text-white/40 tabular-nums leading-none tracking-tighter">
              {time.seconds}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Decoration: New Year Countdown */}
      <div className="pb-12 flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] md:text-xs text-sky-300/50 font-mono tracking-[0.3em] uppercase">New Year Countdown</span>
        <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
           <span className="text-sm md:text-lg text-white font-mono tracking-widest gold-text">
            {countdown}
           </span>
        </div>
      </div>

    </div>
  );
};

export default ClockDisplay;