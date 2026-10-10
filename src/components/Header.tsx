import React from 'react';
import { RugessaLogo } from './RugessaLogo';
import { useQuote } from '../context/QuoteContext';
import { ThemeToggle } from './ThemeToggle';
import { FileText, Menu, Building2, Home, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL } from '../utils/whatsapp';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  activeSection,
  onNavigate,
}) => {
  const { items, openDrawer, audienceMode, setAudienceMode } = useQuote();
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#121417]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-sm cursor-pointer"
            aria-label="Rugessa Homepage"
          >
            <RugessaLogo size="md" />
          </button>
          <div className="hidden xl:flex flex-col border-l border-gray-200 dark:border-[#2C2F36] pl-4 py-0.5 text-xs text-[var(--color-text-muted)]">
            <span className="font-serif italic text-sm text-[var(--color-text-primary)]">
              "Weaving for a living..."
            </span>
            <span className="text-[11px] font-sans flex items-center gap-1.5">
              Mohammédia, Morocco ·{' '}
              <a href={`tel:${PHONE_TEL}`} className="hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-300)] font-medium">
                {PHONE_DISPLAY}
              </a>
              {' · '}
              <a
                href={getWhatsAppUrl('Hello Rugessa Team, I am inquiring from the website.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#128C7E] dark:text-[#25D366] hover:underline font-semibold inline-flex items-center gap-1"
                title="Open WhatsApp chat with Rugessa"
              >
                <MessageSquare className="w-3 h-3" />
                WhatsApp
              </a>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'home' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'collections' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            Collections (10)
          </button>
          <button
            onClick={() => onNavigate('contract')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'contract' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            Contract & Hotel
          </button>
          <button
            onClick={() => onNavigate('care')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'care' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            Care & Stains
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'about' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)] cursor-pointer py-1 ${
              activeSection === 'contact' ? 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls: Mode Switcher + Theme Switcher + Quote Drawer Trigger + Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Audience Mode Switcher (Residential / Contract) */}
          <div
            className="hidden sm:inline-flex items-center bg-[#F2EEE8] dark:bg-[#1E2126] p-1 rounded-sm border border-[#E6E0D6] dark:border-[#33373E] text-xs"
            role="group"
            aria-label="Audience selector"
          >
            <button
              onClick={() => setAudienceMode('residential')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                audienceMode === 'residential'
                  ? 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Home className="w-3 h-3 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]" />
              <span>Residential</span>
            </button>
            <button
              onClick={() => setAudienceMode('contract')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                audienceMode === 'contract'
                  ? 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Building2 className="w-3 h-3 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]" />
              <span>Trade & Hotel</span>
            </button>
          </div>

          {/* Theme Mode Toggle (Light / Dark / Auto) */}
          <div className="hidden sm:block">
            <ThemeToggle variant="segmented" />
          </div>
          <div className="sm:hidden">
            <ThemeToggle variant="compact" />
          </div>

          {/* Quote Specification Drawer Trigger Button */}
          <button
            onClick={openDrawer}
            className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)] min-h-[44px]"
            aria-label={`Open Quote List (${totalCount} items)`}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Quote RFP</span>
            {totalCount > 0 && (
              <span className="inline-flex items-center justify-center bg-[var(--color-gold-500)] text-[var(--color-text-primary)] font-bold text-[11px] w-5 h-5 rounded-full ml-0.5">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2.5 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-xs border border-gray-200 dark:border-[#383C44] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

