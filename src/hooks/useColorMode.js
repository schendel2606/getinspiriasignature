import { useState, useEffect } from 'react';

export function useColorMode() {
  const [mode, setMode] = useState(() => {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return 'system';
    return localStorage.getItem('color-mode') || 'system';
  });

  useEffect(() => {
    const isBrowser = typeof document !== 'undefined';
    if (!isBrowser) return;

    const applyTheme = (theme) => {
      document.documentElement.classList.remove('light', 'dark');
      if (theme !== 'system') {
        document.documentElement.classList.add(theme);
      }
    };

    applyTheme(mode);
    localStorage.setItem('color-mode', mode);
  }, [mode]);

  return { mode, setMode };
}
