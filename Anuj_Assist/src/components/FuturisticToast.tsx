// Futuristic Toast Component with Glassmorphism & Neon Effects
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastData, ToastType, ToastTheme, ToastConfig } from '../types/toast';

// Re-export types for convenience
export type { ToastData, ToastType, ToastTheme, ToastConfig };

interface FuturisticToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  theme?: ToastTheme;
  index: number;
}

const toastConfig: Record<ToastType, ToastConfig> = {
  success: {
    icon: CheckCircle,
    gradient: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    border: 'from-emerald-400 via-green-400 to-teal-400',
    glow: 'shadow-emerald-500/50',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
    border: 'from-red-400 via-rose-400 to-pink-400',
    glow: 'shadow-red-500/50',
    iconColor: 'text-red-400',
  },
  info: {
    icon: Info,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-sky-500/20',
    border: 'from-blue-400 via-cyan-400 to-sky-400',
    glow: 'shadow-blue-500/50',
    iconColor: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
    border: 'from-amber-400 via-yellow-400 to-orange-400',
    glow: 'shadow-amber-500/50',
    iconColor: 'text-amber-400',
  },
};

const FuturisticToast: React.FC<FuturisticToastProps> = ({
  toast,
  onDismiss,
  theme = 'dark',
  index,
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const config = toastConfig[toast.type];
  const Icon = toast.icon || config.icon;
  const duration = toast.duration || 3000;

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        if (newProgress <= 0) {
          onDismiss(toast.id);
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, onDismiss, duration, isHovered]);

  const themeStyles = {
    light: 'bg-white/80 backdrop-blur-xl border-white/40',
    dark: 'bg-gray-900/80 backdrop-blur-xl border-gray-700/40',
    neon: 'bg-black/90 backdrop-blur-2xl border-purple-500/30',
  };

  const textStyles = {
    light: 'text-gray-800',
    dark: 'text-gray-100',
    neon: 'text-white',
  };

  return (
    <motion.div
      layout
      initial={{ 
        opacity: 0, 
        x: 400, 
        scale: 0.8,
        rotateY: 45,
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        rotateY: 0,
      }}
      exit={{ 
        opacity: 0, 
        x: 400, 
        scale: 0.8,
        rotateY: -45,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        marginBottom: index > 0 ? '12px' : '0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl border-2
        ${themeStyles[theme]}
        ${config.glow}
        shadow-2xl
        min-w-[320px] max-w-[420px]
        transform-gpu
        will-change-transform
      `}
    >
      {/* Animated gradient border */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-30`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Neon glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.border} opacity-20 blur-xl`} />

      {/* Content */}
      <div className="relative z-10 flex items-start gap-3 p-4">
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
            delay: 0.1,
          }}
          className={`flex-shrink-0 ${config.iconColor}`}
        >
          <Icon size={24} strokeWidth={2.5} />
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`flex-1 text-sm font-medium leading-relaxed ${textStyles[theme]}`}
        >
          {toast.message}
        </motion.p>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDismiss(toast.id)}
          className={`
            flex-shrink-0 p-1 rounded-full
            ${theme === 'light' ? 'hover:bg-gray-200/50' : 'hover:bg-white/10'}
            transition-colors duration-200
            ${textStyles[theme]}
          `}
          aria-label="Dismiss"
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="relative h-1 bg-white/10 overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.border}`}
          style={{
            width: `${progress}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {/* Particle effects for neon theme */}
      {theme === 'neon' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${config.border}`}
              initial={{ 
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
              }}
              animate={{
                y: [null, '-100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default FuturisticToast;
