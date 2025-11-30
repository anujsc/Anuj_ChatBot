import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { logPerformanceMetrics } from './utils/performance'

// Log performance metrics in development
if (import.meta.env.DEV) {
  logPerformanceMetrics();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
