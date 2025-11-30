// Custom Toast Hook with Context
import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import ToastContainer from '../components/ToastContainer';
import type { ToastData, ToastType, ToastTheme } from '../types/toast';

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number, icon?: ReactNode) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  dismissToast: (id: string) => void;
  clearAll: () => void;
  setTheme: (theme: ToastTheme) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
  defaultTheme?: ToastTheme;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultTheme = 'dark',
  position = 'top-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [theme, setTheme] = useState<ToastTheme>(defaultTheme);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 3000, icon?: ReactNode) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastData = { id, type, message, duration, icon };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Limit number of toasts
        return updated.slice(0, maxToasts);
      });
    },
    [maxToasts]
  );

  const success = useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast('info', message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast('warning', message, duration),
    [showToast]
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        success,
        error,
        info,
        warning,
        dismissToast,
        clearAll,
        setTheme,
      }}
    >
      {children}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        theme={theme}
        position={position}
      />
    </ToastContext.Provider>
  );
};
