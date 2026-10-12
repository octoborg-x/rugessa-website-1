import React, { useEffect, useRef, useState } from 'react';
import { RugessaLogo } from './RugessaLogo';
import { useQuote } from '../context/QuoteContext';
import { useTheme } from '../context/ThemeContext';
import { X, ChevronDown, ChevronRight, ShoppingCart, Mail, Home, Building2, Sun, Moon, Laptop, MessageSquare } from 'lucide-react';
import productsData from '../../data/products.json';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL, FACTORY_ADDRESS, CONTACT_EMAIL } from '../utils/whatsapp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string, filterCollection?: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { items, openDrawer, audienceMode, setAudienceMode } = useQuote();
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const collections = Array.from(new Set(productsData.map((p) => p.collection)));
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Focus trap and escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={menuRef}
        className="relative ml-auto w-full max-w-sm bg-white dark:bg-[#181A1D] text-gray-900 dark:text-[#F5F3EF] h-full flex flex-col shadow-2xl z-10 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-[#282B30] flex items-center justify-between">
          <RugessaLogo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black dark:hover:text-white rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audience Mode Switcher */}
        <div className="p-4 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]">
          <span className="text-[11px] font-mono uppercase text-gray-500 dark:text-gray-400 block mb-2">
            Viewing Mode
          </span>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Audience selector">
            <button
              onClick={() => {
                setAudienceMode('residential');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xs border cursor-pointer min-h-[44px] ${
                audienceMode === 'residential'
                  ? 'bg-white dark:bg-[#2A2E36] border-[var(--color-teal-700)] text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] shadow-xs'
                  : 'bg-transparent border-gray-200 dark:border-[#383C44] text-gray-600 dark:text-gray-400'
              }`}
            >
              <Home className="w-4 h-4" /> Residential
            </button>
            <button
              onClick={() => {
                setAudienceMode('contract');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xs border cursor-pointer min-h-[44px] ${
                audienceMode === 'contract'
                  ? 'bg-white dark:bg-[#2A2E36] border-[var(--color-teal-700)] text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] shadow-xs'
                  : 'bg-transparent border-gray-200 dark:border-[#383C44] text-gray-600 dark:text-gray-400'
              }`}
            >
              <Building2 className="w-4 h-4" /> Trade & Hotel
            </button>
          </div>

          {/* Theme Selector - 3 Modes (D / L / S) */}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#33373E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-gray-500 dark:text-gray-400">
                Theme (3 Modes: D / L / S)
              </span>
              <span className="text-[10px] font-mono text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] font-semibold">
                {themeMode === 'system' ? `Auto (${resolvedTheme})` : themeMode === 'dark' ? 'Dark' : 'Light'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setThemeMode('dark')}
                className={`flex items-center justify-center p-2 rounded-xs border min-h-[38px] cursor-pointer transition-colors ${
                  themeMode === 'dark'
                    ? 'bg-white dark:bg-[#2A2E36] border-[var(--color-teal-500)] text-gray-900 dark:text-white font-semibold shadow-xs'
                    : 'bg-transparent border-gray-200 dark:border-[#383C44] text-gray-600 dark:text-gray-400'
                }`}
                title="Dark mode (D)"
                aria-label="Dark mode (D)"
              >
                <Moon className="w-4 h-4 text-[var(--color-teal-400)]" />
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`flex items-center justify-center p-2 rounded-xs border min-h-[38px] cursor-pointer transition-colors ${
                  themeMode === 'light'
                    ? 'bg-white dark:bg-[#2A2E36] border-[var(--color-gold-500)] text-gray-900 dark:text-white font-semibold shadow-xs'
                    : 'bg-transparent border-gray-200 dark:border-[#383C44] text-gray-600 dark:text-gray-400'
                }`}
                title="Light mode (L)"
                aria-label="Light mode (L)"
              >
                <Sun className="w-4 h-4 text-amber-500" />
              </button>
              <button
                onClick={() => setThemeMode('system')}
                className={`flex items-center justify-center p-2 rounded-xs border min-h-[38px] cursor-pointer transition-colors ${
                  themeMode === 'system'
                    ? 'bg-white dark:bg-[#2A2E36] border-[var(--color-teal-700)] text-gray-900 dark:text-white font-semibold shadow-xs'
                    : 'bg-transparent border-gray-200 dark:border-[#383C44] text-gray-600 dark:text-gray-400'
                }`}
                title="System default mode (S)"
                aria-label="System default mode (S)"
              >
                <Laptop className="w-4 h-4 text-[#88CCD0]" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Accordion */}
        <div className="flex-1 py-4 px-4 space-y-1">
          <button
            onClick={() => {
              onNavigate('home');
              onClose();
            }}
            className="w-full text-left py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] flex items-center cursor-pointer"
          >
            Home Overview
          </button>

          {/* Collections Accordion */}
          <div>
            <button
              onClick={() => setCollectionsExpanded(!collectionsExpanded)}
              className="w-full flex items-center justify-between py-3 text-left font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] cursor-pointer"
              aria-expanded={collectionsExpanded}
            >
              <span>Collections (10 Series)</span>
              {collectionsExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {collectionsExpanded && (
              <div className="pl-3 py-2 space-y-1 border-l-2 border-[var(--color-teal-100)] ml-2 my-1">
                <button
                  onClick={() => {
                    onNavigate('collections', 'all');
                    onClose();
                  }}
                  className="w-full text-left py-2 text-xs text-[var(--color-teal-700)] font-semibold min-h-[44px] flex items-center cursor-pointer"
                >
                  View All Collections (33 SKUs)
                </button>
                {collections.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      onNavigate('collections', col);
                      onClose();
                    }}
                    className="w-full text-left py-2 text-xs text-gray-700 hover:text-[var(--color-teal-700)] min-h-[44px] flex items-center justify-between cursor-pointer"
                  >
                    <span>{col}</span>
                    <span className="text-gray-400 font-mono text-[11px]">
                      {productsData.filter((p) => p.collection === col).length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onNavigate('contract');
              onClose();
            }}
            className="w-full text-left py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] flex items-center cursor-pointer"
          >
            Contract & Hospitality Portal
          </button>

          <button
            onClick={() => {
              onNavigate('care');
              onClose();
            }}
            className="w-full text-left py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] flex items-center cursor-pointer"
          >
            Carpet Care & 33 Stain Guides
          </button>

          <button
            onClick={() => {
              onNavigate('about');
              onClose();
            }}
            className="w-full text-left py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] flex items-center cursor-pointer"
          >
            About & Corporate Heritage
          </button>

          <button
            onClick={() => {
              onNavigate('contact');
              onClose();
            }}
            className="w-full text-left py-3 text-sm font-semibold text-gray-900 border-b border-gray-100 min-h-[48px] flex items-center cursor-pointer"
          >
            Contact & Quoting Office
          </button>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-[#1E2126] border-t border-gray-100 dark:border-[#2C2F36] space-y-2.5">
          <button
            onClick={() => {
              onClose();
              openDrawer();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[48px] cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Open Cart ({totalCount})</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-white dark:bg-[#25282F] border border-gray-200 dark:border-[#383C44] text-gray-800 dark:text-gray-100 text-xs font-medium rounded-xs min-h-[44px]"
            >
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={getWhatsAppUrl('Hello Rugessa Team, I am inquiring about your carpet collections.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-xs min-h-[44px]"
              title="Open WhatsApp chat with Rugessa"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-[#25282F] border border-gray-200 dark:border-[#383C44] text-gray-700 dark:text-gray-200 text-xs font-medium rounded-xs min-h-[40px]"
          >
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <span>{CONTACT_EMAIL}</span>
          </a>

          <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center pt-1 font-mono">
            {FACTORY_ADDRESS}
          </p>
        </div>
      </div>
    </div>
  );
};
