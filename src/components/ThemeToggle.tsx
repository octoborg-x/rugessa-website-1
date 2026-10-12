import React from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'segmented' | 'compact';
  isTransparent?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'segmented',
  isTransparent = false,
}) => {
  const { themeMode, resolvedTheme, setThemeMode, toggleTheme } = useTheme();

  const modes: { mode: ThemeMode; ariaLabel: string; icon: typeof Moon }[] = [
    { mode: 'dark', ariaLabel: 'Dark mode', icon: Moon },
    { mode: 'light', ariaLabel: 'Light mode', icon: Sun },
    { mode: 'system', ariaLabel: 'System default mode', icon: Laptop },
  ];

  if (variant === 'segmented') {
    const containerClasses = isTransparent
      ? 'bg-black/40 backdrop-blur-md border border-white/20 text-white'
      : 'bg-[#F2EEE8] dark:bg-[#1E2126] border border-[#E6E0D6] dark:border-[#33373E] text-gray-700 dark:text-gray-300';

    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-xs transition-colors ${containerClasses} ${className}`}
        role="group"
        aria-label="Theme mode selector"
      >
        {modes.map(({ mode, ariaLabel, icon: Icon }) => {
          const isSelected = themeMode === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setThemeMode(mode)}
              className={`flex items-center justify-center p-1.5 rounded-xs transition-all cursor-pointer min-h-[32px] min-w-[32px] ${
                isSelected
                  ? isTransparent
                    ? 'bg-white/25 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
                  : isTransparent
                  ? 'text-white/60 hover:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title={ariaLabel}
              aria-label={ariaLabel}
              aria-pressed={isSelected}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant: pure icon button cycling between Dark -> Light -> System (no text)
  return (
    <button
      onClick={() => toggleTheme()}
      className={`flex items-center justify-center p-2 rounded-xs border transition-colors min-h-[36px] min-w-[36px] cursor-pointer ${
        isTransparent
          ? 'border-white/25 bg-black/40 text-white hover:bg-black/60'
          : 'border-gray-200 dark:border-[#383C44] bg-white dark:bg-[#1E2126] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#25282F]'
      } ${className}`}
      aria-label={`Theme: ${themeMode} (${resolvedTheme}). Click to cycle.`}
      title={`Theme: ${themeMode.toUpperCase()} (${resolvedTheme})`}
    >
      {themeMode === 'system' ? (
        <Laptop className="w-4 h-4 text-[#88CCD0]" />
      ) : themeMode === 'dark' ? (
        <Moon className="w-4 h-4 text-[var(--color-teal-400)]" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500" />
      )}
    </button>
  );
};

