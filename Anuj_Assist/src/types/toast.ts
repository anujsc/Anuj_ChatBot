// Toast Type Definitions
import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastTheme = "light" | "dark" | "neon";

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  icon?: ReactNode;
}

export interface ToastConfig {
  icon: any;
  gradient: string;
  border: string;
  glow: string;
  iconColor: string;
}
