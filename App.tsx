import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import ClockDisplay from './components/ClockDisplay';
import Background from './components/Background';

const App: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Ambient Background */}
      <Background />

      {/* Main Content */}
      <ClockDisplay />

      {/* Controls UI */}
      <div className="absolute top-6 right-6 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={toggleFullScreen}
          className="p-3 bg-white/5 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-all border border-white/10"
          aria-label="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
        </button>
      </div>
      
      {/* Decorative accent lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50"></div>

    </div>
  );
};

export default App;