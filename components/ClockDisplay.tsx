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
        <div className="flex items-center gap-6">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-sky-400 to-sky-300 rounded-full shadow-lg shadow-sky-400/30"></div>
          <h1 className="text-white text-lg md:text-3xl font-black tracking-[0.4em] uppercase font-sans drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transform hover:scale-105 transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(186, 230, 253, 0.9) 50%, rgba(255,255,255,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(186, 230, 253, 0.5), 0 0 60px rgba(14, 165, 233, 0.3)'
          }}>
            Kazakhstan
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-300 rounded-full shadow-lg shadow-amber-400/30"></div>
        </div>
      </div>

      {/* Main Time Display - Enhanced Massive */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative perspective-1000">

        {/* Container for alignment */}
        <div className="flex flex-col md:flex-row items-center justify-center leading-none transform transition-transform duration-1000">

          {/* Hours */}
          <div className="relative group">
            <span className="text-[60vw] md:text-[38vw] font-black tracking-tighter time-digit-enhanced font-mono transform hover:scale-110 transition-all duration-500 ease-out select-none drop-shadow-2xl">
              {time.hours}
            </span>
          </div>

          {/* Separator - Hidden on mobile stack */}
          <div className="hidden md:block text-[24vw] -mt-[6vw] px-4 time-separator-enhanced font-mono select-none font-bold">
            :
          </div>

          {/* Minutes */}
          <div className="relative group -mt-[12vw] md:mt-0">
             <span className="text-[60vw] md:text-[38vw] font-black tracking-tighter time-digit-enhanced font-mono transform hover:scale-110 transition-all duration-500 ease-out select-none drop-shadow-2xl">
              {time.minutes}
            </span>
          </div>

        </div>

        {/* Seconds - Enhanced with glow effect */}
        <div className="absolute right-4 bottom-[20%] md:bottom-auto md:right-[3%] md:top-[60%] overflow-hidden">
          <div className="relative group">
             <span className="block text-[18vw] md:text-[10vw] font-mono font-black text-white/70 tabular-nums leading-none tracking-tighter transform hover:scale-105 transition-all duration-300 select-none" style={{
               textShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(186, 230, 253, 0.3), 0 0 45px rgba(14, 165, 233, 0.2)',
               background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(186, 230, 253, 0.6) 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text'
             }}>
              {time.seconds}
            </span>
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-400/10 rounded-lg blur-xl scale-150 opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
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