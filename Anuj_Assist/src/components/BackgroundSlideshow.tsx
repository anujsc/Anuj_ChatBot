// Optimized slideshow background with fade effect and lazy loading
import { bgImages } from '../data/bgImages';
import React, { useState, useEffect, useCallback } from 'react';

const SLIDESHOW_INTERVAL = 6000; // Increased for better performance
const FADE_DURATION = 1000;

const BackgroundSlideshow: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images progressively
  useEffect(() => {
    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block on error
        img.src = src;
      });
    };

    // Preload first image immediately
    preloadImage(bgImages[0]).then(() => setIsLoaded(true));

    // Preload remaining images in background
    bgImages.slice(1).forEach(src => {
      requestIdleCallback(() => preloadImage(src), { timeout: 2000 });
    });
  }, []);

  // Memoized next image preloader
  const preloadNext = useCallback(() => {
    const nextIdx = (current + 1) % bgImages.length;
    const img = new Image();
    img.src = bgImages[nextIdx];
  }, [current]);

  useEffect(() => {
    preloadNext();
  }, [preloadNext]);

  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length);
    }, SLIDESHOW_INTERVAL);
    
    return () => clearInterval(interval);
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `url(${bgImages[current]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        willChange: 'opacity',
      }}
    />
  );
};

export default React.memo(BackgroundSlideshow);
