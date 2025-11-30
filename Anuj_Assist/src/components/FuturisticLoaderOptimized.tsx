import React, { useEffect, useState } from 'react';

interface FuturisticLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

// Optimized loader using CSS animations instead of GSAP
const FuturisticLoader: React.FC<FuturisticLoaderProps> = ({ isLoading, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading && isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800); // Exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isLoading, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a0a0e] to-black overflow-hidden transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(186,63,71,0.15),transparent_50%)]" />
      </div>

      {/* Waves */}
      <div className="absolute">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className={`wave-${i} absolute inset-0 rounded-full border-2 border-[#ba3f47]/20`}
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Central logo/icon */}
      <div className={`logo-container relative w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 ${isExiting ? 'scale-0' : ''}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ba3f47] to-[#8b2f37] shadow-[0_0_40px_rgba(186,63,71,0.6)] animate-logo-pulse" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#d94855] to-[#ba3f47] flex items-center justify-center animate-logo-rotate">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* Animated dots */}
      <div className={`flex gap-2 mb-4 sm:mb-6 ${isExiting ? 'opacity-0' : ''}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ba3f47] shadow-[0_0_10px_rgba(186,63,71,0.8)]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className={`text-center mb-6 sm:mb-8 transition-all duration-300 ${isExiting ? 'opacity-0 -translate-y-5' : ''}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide">
          Loading
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 tracking-wider">
          Please wait...
        </p>
      </div>

      {/* Progress bar */}
      <div className={`w-48 sm:w-64 h-1 bg-gray-800/50 rounded-full overflow-hidden ${isExiting ? 'opacity-0' : ''}`}>
        <div className="bar h-full bg-gradient-to-r from-[#ba3f47] via-[#d94855] to-[#ba3f47] origin-left animate-progress">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes logo-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes wave-expand {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
        }
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out forwards;
        }
        .logo-container {
          transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-logo-rotate {
          animation: logo-rotate 8s linear infinite;
        }
        .animate-logo-pulse {
          animation: logo-pulse 2s ease-in-out infinite;
        }
        .wave-0, .wave-1, .wave-2 {
          animation: wave-expand 1.2s ease-out forwards;
        }
        .dot {
          animation: dot-bounce 0.6s ease-in-out infinite;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-logo-rotate,
          .animate-logo-pulse,
          .wave-0, .wave-1, .wave-2,
          .dot,
          .animate-shimmer {
            animation: none !important;
          }
          .logo-container {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FuturisticLoader;
