import { useState, useEffect } from 'react';

export function useColorMode(initial = 'system') {
  const [mode, setMode] = useState(initial);

  // Load saved mode on mount
  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    
    const saved = localStorage.getItem('color-mode');
    if (saved) setMode(saved);
  }, []);

  // Apply classes + system sync
  useEffect(() => {
    const isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
    if (!isBrowser) return;
    
    const root = document.body;
    const apply = (m) => {
      root.classList.remove('light-mode', 'dark-mode');
      if (m === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        root.classList.add(mq.matches ? 'light-mode' : 'dark-mode');
      } else {
        root.classList.add(m === 'light' ? 'light-mode' : 'dark-mode');
      }
    };
    
    apply(mode);

    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      const onChange = () => apply('system');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('color-mode', mode);
    }
  }, [mode]);

  return { mode, setMode };
}
