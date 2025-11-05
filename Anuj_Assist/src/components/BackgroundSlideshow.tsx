// Slideshow background with fade effect
import { bgImages } from '../data/bgImages';
import React from 'react';


const SLIDESHOW_INTERVAL = 5000;
const FADE_DURATION = 800; // ms (should match App)

const BackgroundSlideshow: React.FC = () => {
  const [current, setCurrent] = React.useState(0);
  const [prev, setPrev] = React.useState(0);
  const [showPrev, setShowPrev] = React.useState(false);


  // Preload next image for smooth transition
  React.useEffect(() => {
    const nextIdx = (current + 1) % bgImages.length;
    const img = new window.Image();
    img.src = bgImages[nextIdx];
  }, [current]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prevIdx) => (prevIdx + 1) % bgImages.length);
      setShowPrev(true);
      setTimeout(() => setShowPrev(false), FADE_DURATION);
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <>
      {/* Previous image for crossfade */}
      {showPrev && (
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImages[prev]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            willChange: 'opacity',
            animation: `fadeOutBg ${FADE_DURATION}ms forwards`,
          }}
        />
      )}
      {/* Current image always visible */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImages[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          willChange: 'opacity',
        }}
      />
      <style>{`
        @keyframes fadeOutBg {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </>
  );
};
export default BackgroundSlideshow;
