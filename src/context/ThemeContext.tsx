import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'rugessa_theme_preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialResolvedTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {}
    return 'system'; // Load system default theme mode as requested
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getInitialResolvedTheme(themeMode)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark =
        themeMode === 'dark' || (themeMode === 'system' && mediaQuery.matches);

      const effectiveTheme: 'light' | 'dark' = isDark ? 'dark' : 'light';
      setResolvedTheme(effectiveTheme);

      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
    };

    applyTheme();

    const handleSystemChange = () => {
      if (themeMode === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {}
  };

  const cycleTheme = () => {
    setThemeModeState((prev) => {
      const cycleMap: Record<ThemeMode, ThemeMode> = {
        system: 'dark',
        dark: 'light',
        light: 'system',
      };
      const nextMode = cycleMap[prev] || 'system';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextMode);
      } catch {}
      return nextMode;
    });
  };

  const toggleTheme = cycleTheme;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedTheme,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
