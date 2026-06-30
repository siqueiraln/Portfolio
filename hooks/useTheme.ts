import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemTheme();
}

/**
 * Theme controller: defaults to the visitor's system preference and remembers
 * any manual choice. While the user hasn't chosen, it keeps following the OS.
 */
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Reflect the active theme onto <html> so the .dark variant + tokens apply.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Follow OS changes only until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
};

export default useTheme;
