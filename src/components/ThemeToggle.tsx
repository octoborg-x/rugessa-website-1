import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const modes: { mode: ThemeMode; label: string; short: string; icon: typeof Moon }[] = [
    { mode: 'dark', label: 'Dark', short: 'D', icon: Moon },
    { mode: 'light', label: 'Light', short: 'L', icon: Sun },
    { mode: 'system', label: 'System', short: 'S', icon: Laptop },
  ];

  if (variant === 'segmented') {
    const containerClasses = isTransparent
      ? 'bg-black/40 backdrop-blur-md border border-white/20 text-white'
      : 'bg-[#F2EEE8] dark:bg-[#1E2126] border border-[#E6E0D6] dark:border-[#33373E] text-gray-700 dark:text-gray-300';

    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-xs text-xs transition-colors ${containerClasses} ${className}`}
        role="group"
        aria-label="Theme mode selector (Dark, Light, System)"
      >
        {modes.map(({ mode, label, short, icon: Icon }) => {
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
              title={`${label} Mode (${short})${mode === 'system' ? ' - Follows device OS preference' : ''}`}
              aria-label={`${label} theme mode (${short})`}
              aria-pressed={isSelected}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant: icon only, click cycles D -> L -> S -> D, right-click/context opens quick menu
  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => toggleTheme()}
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }}
        className={`flex items-center justify-center p-2 rounded-xs border transition-colors min-h-[36px] min-w-[36px] cursor-pointer text-xs ${
          isTransparent
            ? 'border-white/25 bg-black/40 text-white hover:bg-black/60'
            : 'border-gray-200 dark:border-[#383C44] bg-white dark:bg-[#1E2126] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#25282F]'
        }`}
        aria-label={`Current theme: ${themeMode} (${resolvedTheme} active). Click to cycle Dark, Light, System.`}
        title={`Theme Mode: ${themeMode.toUpperCase()} (Active: ${resolvedTheme}). Click to cycle Dark / Light / System.`}
      >
        {themeMode === 'system' ? (
          <Laptop className="w-4 h-4 text-[#88CCD0]" />
        ) : themeMode === 'dark' ? (
          <Moon className="w-4 h-4 text-[var(--color-teal-400)]" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {/* Dropdown for explicit selection */}
      {menuOpen && (
        <div
          role="menu"
          aria-label="Select theme mode"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1A1C1E] border border-gray-200 dark:border-[#33373E] rounded-xs shadow-lg z-50 py-1"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-[#2C2F36]">
            Select Mode (D / L / S)
          </div>
          {modes.map(({ mode, label, short, icon: Icon }) => {
            const isSelected = themeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setThemeMode(mode);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[var(--color-teal-50)] dark:bg-[#1C3B3F] text-[var(--color-teal-900)] dark:text-white font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#25282F]'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                  <span className="text-[10px] font-mono text-gray-400">({short})</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-teal-500)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
