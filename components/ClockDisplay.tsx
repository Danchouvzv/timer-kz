import React, { useEffect, useState } from 'react';
import { getKazakhstanTime } from '../utils/time';
import { TimeState } from '../types';

const ClockDisplay: React.FC = () => {
  const [time, setTime] = useState<TimeState>(getKazakhstanTime());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const t = getKazakhstanTime();
      setTime(t);
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
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-400"></div>
          <h1 className="text-white text-lg md:text-2xl font-bold tracking-[0.3em] uppercase font-sans">
            Kazakhstan
          </h1>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-sky-400"></div>
        </div>
      </div>

      {/* Main Time Display - Professional */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative">

        {/* Container for alignment */}
        <div className="flex flex-col md:flex-row items-center justify-center leading-none">

          {/* Hours */}
          <div className="relative">
            <span className="text-[55vw] md:text-[35vw] time-digit-professional font-mono select-none">
              {time.hours}
            </span>
          </div>

          {/* Separator - Hidden on mobile stack */}
          <div className="hidden md:block text-[22vw] -mt-[5vw] px-4 time-separator-professional font-mono select-none font-bold">
            :
          </div>

          {/* Minutes */}
          <div className="relative -mt-[10vw] md:mt-0">
             <span className="text-[55vw] md:text-[35vw] time-digit-professional font-mono select-none">
              {time.minutes}
            </span>
          </div>

        </div>

        {/* Seconds - Clean and minimal */}
        <div className="absolute right-6 bottom-[25%] md:bottom-auto md:right-[5%] md:top-[65%]">
          <span className="text-[16vw] md:text-[9vw] font-mono font-bold text-white/60 tabular-nums leading-none tracking-tighter select-none">
            {time.seconds}
          </span>
        </div>
      </div>


    </div>
  );
};

export default ClockDisplay;