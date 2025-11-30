import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface FuturisticLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const FuturisticLoader: React.FC<FuturisticLoaderProps> = ({ isLoading, onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loaderRef.current) return;

    const loader = loaderRef.current;
    const logo = loader.querySelector('.logo');
    const dots = loader.querySelectorAll('.dot');
    const waves = loader.querySelectorAll('.wave');
    const text = loader.querySelector('.loading-text');
    const bar = loader.querySelector('.bar');

    const tl = gsap.timeline();

    // Set initial states
    gsap.set(logo, { scale: 0, rotation: -180, opacity: 0 });
    gsap.set(dots, { scale: 0, opacity: 0 });
    gsap.set(waves, { scale: 0.5, opacity: 0 });
    gsap.set(text, { opacity: 0, y: 20 });
    gsap.set(bar, { scaleX: 0 });

    // Entrance animation
    tl.to(logo, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.6)'
    })
    .to(waves, {
      scale: 1,
      opacity: 0.3,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    }, '-=0.5')
    .to(dots, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    .to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')
    .to(bar, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.2');

    // Looping animations
    gsap.to(logo, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });

    gsap.to(waves, {
      scale: 1.2,
      opacity: 0.1,
      duration: 2,
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true
      },
      ease: 'sine.inOut'
    });

    gsap.to(dots, {
      y: -10,
      duration: 0.6,
      stagger: {
        each: 0.15,
        repeat: -1,
        yoyo: true
      },
      ease: 'power1.inOut'
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([logo, dots, waves, text, bar]);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && loaderRef.current) {
      const loader = loaderRef.current;
      const logo = loader.querySelector('.logo');
      const dots = loader.querySelectorAll('.dot');
      const waves = loader.querySelectorAll('.wave');
      const text = loader.querySelector('.loading-text');
      const bar = loader.querySelector('.bar');

      gsap.killTweensOf([logo, dots, waves, text, bar]);

      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        }
      });

      exitTl
        .to(text, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(bar, {
          scaleX: 0,
          duration: 0.4,
          ease: 'power2.in'
        }, '-=0.2')
        .to(dots, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'back.in(1.7)'
        }, '-=0.2')
        .to(waves, {
          scale: 1.5,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.in'
        }, '-=0.3')
        .to(logo, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.5,
          ease: 'back.in(2)'
        }, '-=0.3')
        .to(loader, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }, '-=0.2');
    }
  }, [isLoading, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#1a0a0e] to-black overflow-hidden"
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
            className="wave absolute inset-0 rounded-full border-2 border-[#ba3f47]/20"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Central logo/icon */}
      <div className="logo relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ba3f47] to-[#8b2f37] shadow-[0_0_40px_rgba(186,63,71,0.6)]" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#d94855] to-[#ba3f47] flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="dot w-3 h-3 rounded-full bg-[#ba3f47] shadow-[0_0_10px_rgba(186,63,71,0.8)]"
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="loading-text text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
          Loading
        </h2>
        <p className="text-sm text-gray-400 tracking-wider">
          Please wait...
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800/50 rounded-full overflow-hidden">
        <div className="bar h-full bg-gradient-to-r from-[#ba3f47] via-[#d94855] to-[#ba3f47] origin-left relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default FuturisticLoader;
