// Performance monitoring utilities
// Note: web-vitals is optional and not included in dependencies

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  // Disabled - web-vitals not installed
  // To enable: npm install web-vitals
  if (onPerfEntry && onPerfEntry instanceof Function) {
    console.log("Web Vitals monitoring available but not installed");
  }
};

// Log performance metrics in development
export const logPerformanceMetrics = () => {
  if (typeof window === "undefined" || !window.performance) return;

  // Wait for page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log("⚡ Performance Metrics:");
      console.log(`  Page Load Time: ${pageLoadTime}ms`);
      console.log(`  Connect Time: ${connectTime}ms`);
      console.log(`  Render Time: ${renderTime}ms`);

      // Log resource timing
      const resources = performance.getEntriesByType("resource");
      const totalSize = resources.reduce((acc: number, resource: any) => {
        return acc + (resource.transferSize || 0);
      }, 0);
      console.log(`  Total Resources: ${resources.length}`);
      console.log(
        `  Total Transfer Size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`
      );
    }, 0);
  });
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Request idle callback polyfill
export const requestIdleCallback =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1);

export const cancelIdleCallback =
  typeof window !== "undefined" && "cancelIdleCallback" in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id);
