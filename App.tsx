import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import ClockDisplay from './components/ClockDisplay';
import Background from './components/Background';

const App: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  const handleDoubleClick = () => {
    if (!isFullScreen) {
      toggleFullScreen();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'F11') {
      event.preventDefault();
      toggleFullScreen();
    } else if (event.key === 'Escape' && isFullScreen) {
      toggleFullScreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    // Show hint after 3 seconds if not in fullscreen
    const hintTimer = setTimeout(() => {
      if (!isFullScreen) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
      }
    }, 3000);

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(hintTimer);
    };
  }, [isFullScreen]);

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >

      {/* Ambient Background */}
      <Background />

      {/* Main Content */}
      <ClockDisplay />

      {/* Controls UI */}
      <div className="absolute top-6 right-6 z-50 opacity-70 hover:opacity-100 transition-all duration-300 group">
        <button
          onClick={toggleFullScreen}
          className="relative p-3 bg-white/5 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 hover:scale-110"
          aria-label="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}

          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10">
            {isFullScreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            <div className="text-[10px] text-gray-400 mt-1">F11 или двойной клик</div>
          </div>
        </button>
      </div>

      {/* Hint for new users */}
      {showHint && !isFullScreen && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/10">
            💡 Двойной клик или F11 для полноэкранного режима
          </div>
        </div>
      )}

      {/* Decorative accent lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[20vh] bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50"></div>

    </div>
  );
};

export default App;