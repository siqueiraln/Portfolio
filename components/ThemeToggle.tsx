import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, className = '' }) => {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
