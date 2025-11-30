// Toast Container with Stacking Management
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import FuturisticToast from './FuturisticToast';
import type { ToastData, ToastTheme } from '../types/toast';

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  theme?: ToastTheme;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionClasses = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  theme = 'dark',
  position = 'top-right',
}) => {
  return (
    <div
      className={`
        fixed z-[9999] flex flex-col gap-3
        ${positionClasses[position]}
        pointer-events-none
        max-h-screen overflow-hidden
        p-4
      `}
      style={{
        perspective: '1000px',
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <div key={toast.id} className="pointer-events-auto">
            <FuturisticToast
              toast={toast}
              onDismiss={onDismiss}
              theme={theme}
              index={index}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
