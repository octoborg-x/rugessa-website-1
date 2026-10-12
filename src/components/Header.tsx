import React, { useState, useEffect } from 'react';
import { RugessaLogo } from './RugessaLogo';
import { useQuote } from '../context/QuoteContext';
import { ThemeToggle } from './ThemeToggle';
import { ShoppingCart, Menu, Building2, Home, MessageSquare } from 'lucide-react';
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

  // Track scroll position to keep header transparent until reaching second block (#collections) on home page
  const [isScrolledPastSlider, setIsScrolledPastSlider] = useState(false);

  useEffect(() => {
    if (activeSection !== 'home') {
      setIsScrolledPastSlider(true);
      return;
    }

    const checkScroll = () => {
      const secondBlock = document.getElementById('collections');
      if (secondBlock) {
        const rect = secondBlock.getBoundingClientRect();
        // Transparent until the second block reaches the bottom of the header (80px)
        setIsScrolledPastSlider(rect.top <= 80);
      } else {
        setIsScrolledPastSlider(window.scrollY > 550);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [activeSection]);

  const isTransparent = activeSection === 'home' && !isScrolledPastSlider;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-white/10 text-white shadow-none'
          : 'bg-white/95 dark:bg-[#121417]/95 backdrop-blur-md border-b border-[var(--border-subtle)] dark:border-[#2A2E35] text-[var(--color-text-primary)] shadow-xs'
      }`}
    >
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

          <div
            className={`hidden xl:flex flex-col pl-4 py-0.5 text-xs transition-colors ${
              isTransparent
                ? 'border-l border-white/20 text-white/80'
                : 'border-l border-gray-200 dark:border-[#2C2F36] text-[var(--color-text-muted)]'
            }`}
          >
            <span
              className={`font-serif italic text-sm ${
                isTransparent ? 'text-white' : 'text-[var(--color-text-primary)]'
              }`}
            >
              "Weaving for a living..."
            </span>
            <span className="text-[11px] font-sans flex items-center gap-1.5">
              Mohammédia, Morocco ·{' '}
              <a
                href={`tel:${PHONE_TEL}`}
                className={`font-medium ${
                  isTransparent
                    ? 'text-white hover:text-[var(--color-gold-300)]'
                    : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-300)]'
                }`}
              >
                {PHONE_DISPLAY}
              </a>
              {' · '}
              <a
                href={getWhatsAppUrl('Hello Rugessa Team, I am inquiring from the website.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isTransparent
                    ? 'text-[#25D366] hover:underline font-semibold'
                    : 'text-[#128C7E] dark:text-[#25D366] hover:underline font-semibold'
                } inline-flex items-center gap-1`}
                title="Open WhatsApp chat with Rugessa"
              >
                <MessageSquare className="w-3 h-3" />
                WhatsApp
              </a>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider transition-colors ${
            isTransparent
              ? 'text-white/80'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'home'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'collections'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            Collections (10)
          </button>
          <button
            onClick={() => onNavigate('contract')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'contract'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            Contract & Hotel
          </button>
          <button
            onClick={() => onNavigate('care')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'care'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            Care & Stains
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'about'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              activeSection === 'contact'
                ? isTransparent
                  ? 'text-white font-bold border-b-2 border-[var(--color-gold-400)]'
                  : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-bold border-b-2 border-[var(--color-teal-700)] dark:border-[var(--color-teal-400)]'
                : isTransparent
                ? 'hover:text-white'
                : 'hover:text-[var(--color-teal-700)] dark:hover:text-[var(--color-teal-400)]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls: Audience Switcher + Theme Toggle + Cart Icon Button + Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Audience Mode Switcher (Residential / Contract) */}
          <div
            className={`hidden sm:inline-flex items-center p-1 rounded-sm text-xs transition-colors ${
              isTransparent
                ? 'bg-black/35 backdrop-blur-md border border-white/20 text-white'
                : 'bg-[#F2EEE8] dark:bg-[#1E2126] border border-[#E6E0D6] dark:border-[#33373E]'
            }`}
            role="group"
            aria-label="Audience selector"
          >
            <button
              onClick={() => setAudienceMode('residential')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                audienceMode === 'residential'
                  ? isTransparent
                    ? 'bg-white/25 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
                  : isTransparent
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Home className={`w-3 h-3 ${isTransparent ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]'}`} />
              <span>Residential</span>
            </button>
            <button
              onClick={() => setAudienceMode('contract')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs transition-all cursor-pointer ${
                audienceMode === 'contract'
                  ? isTransparent
                    ? 'bg-white/25 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-[#2A2E36] text-[var(--color-teal-900)] dark:text-white font-semibold shadow-xs'
                  : isTransparent
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Building2 className={`w-3 h-3 ${isTransparent ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]'}`} />
              <span>Trade & Hotel</span>
            </button>
          </div>

          {/* Theme Mode Toggle (Icon only - Auto / Light / Dark) */}
          <div className="hidden sm:block">
            <ThemeToggle variant="segmented" isTransparent={isTransparent} />
          </div>
          <div className="sm:hidden">
            <ThemeToggle variant="compact" isTransparent={isTransparent} />
          </div>

          {/* Cart Icon Button with only Qty items (No text) */}
          <button
            onClick={openDrawer}
            className="relative p-2.5 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-800)] text-white rounded-xs shadow-xs transition-all cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)] active:scale-95"
            aria-label={`Cart with ${totalCount} items`}
            title={`Cart with ${totalCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            <span
              className={`absolute -top-1.5 -right-1.5 font-bold text-[10px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center shadow-xs ${
                totalCount > 0
                  ? 'bg-[var(--color-gold-500)] text-[var(--color-teal-950)]'
                  : 'bg-black/60 text-white/80'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className={`lg:hidden p-2.5 rounded-xs border min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
              isTransparent
                ? 'text-white border-white/25 bg-black/25 hover:bg-black/45'
                : 'text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white border-gray-200 dark:border-[#383C44]'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
