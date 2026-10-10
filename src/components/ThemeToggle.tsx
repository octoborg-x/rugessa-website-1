import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'segmented' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'segmented',
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

  const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'system', label: 'Auto (System)', icon: Laptop },
  ];

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center bg-[#F2EEE8] dark:bg-[#1E2126] p-1 rounded-sm border border-[#E6E0D6] dark:border-[#33373E] text-xs transition-colors ${className}`}
        role="group"
        aria-label="Theme mode selector"
      >
        <button
          type="button"
          onClick={() => setThemeMode('light')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer min-h-[32px] ${
            themeMode === 'light'
              ? 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          title="Switch to Light mode"
          aria-pressed={themeMode === 'light'}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px]">Light</span>
        </button>

        <button
          type="button"
          onClick={() => setThemeMode('dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer min-h-[32px] ${
            themeMode === 'dark'
              ? 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          title="Switch to Dark mode"
          aria-pressed={themeMode === 'dark'}
        >
          <Moon className="w-3.5 h-3.5 text-[var(--color-teal-400)]" />
          <span className="text-[11px]">Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setThemeMode('system')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer min-h-[32px] ${
            themeMode === 'system'
              ? 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          title="Follow System default theme (Dark or Light)"
          aria-pressed={themeMode === 'system'}
        >
          <Laptop className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[11px]">Auto ({resolvedTheme})</span>
        </button>
      </div>
    );
  }

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => toggleTheme()}
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }}
        className="flex items-center justify-center p-2 rounded-xs border border-gray-200 dark:border-[#383C44] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#202328] transition-colors min-h-[44px] min-w-[44px] cursor-pointer"
        aria-label={`Current theme: ${themeMode} (${resolvedTheme} active). Click to toggle theme.`}
        title={`Theme: ${themeMode} (Current: ${resolvedTheme}). Right-click or hold for options.`}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 text-[var(--color-teal-500)]" />
        ) : (
          <Sun className="w-4 h-4 text-[var(--color-gold-500)]" />
        )}
      </button>

      {/* Theme Selection Dropdown Menu */}
      {menuOpen && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1C1E] border border-gray-200 dark:border-[#33373E] rounded-xs shadow-lg z-50 py-1"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-[#2C2F36]">
            Appearance
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = themeMode === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setThemeMode(opt.mode);
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
                  <span>{opt.label}</span>
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
