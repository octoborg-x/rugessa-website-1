import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { QuoteProvider } from './context/QuoteContext';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { QuoteDrawer } from './components/QuoteDrawer';
import { BottomActionBar } from './components/BottomActionBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ContractTradePage } from './pages/ContractTradePage';
import { CareGuidePage } from './pages/CareGuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export type RouteType = 'home' | 'collections' | 'contract' | 'care' | 'about' | 'contact';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('all');

  const handleNavigate = (target: string, filterCollection?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (filterCollection) {
      setCollectionFilter(filterCollection);
    }

    if (['home', 'collections', 'contract', 'care', 'about', 'contact'].includes(target)) {
      setCurrentRoute(target as RouteType);
      return;
    }

    // If navigating to a section within home (e.g. 'calculator', 'heritage', 'collections')
    if (target === 'calculator' || target === 'heritage' || target === 'hero') {
      setCurrentRoute('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    // Default fallback
    setCurrentRoute('home');
  };

  return (
    <ThemeProvider>
      <QuoteProvider>
        <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--color-text-primary)] flex flex-col selection:bg-[var(--color-teal-100)] selection:text-[var(--color-teal-900)]">
          {/* Accessible Skip Link for Keyboard Navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-teal-700)] focus:text-white focus:rounded-xs focus:shadow-lg focus:outline-hidden"
          >
            Skip to main content
          </a>

          {/* Header */}
          <Header
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            activeSection={currentRoute}
            onNavigate={handleNavigate}
          />

          {/* Mobile Navigation Drawer */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={handleNavigate}
          />

          {/* Main Content Area */}
          <main id="main-content" className="flex-1">
            {currentRoute === 'home' && (
              <HomePage
                initialCollectionFilter={collectionFilter}
                onNavigateSection={handleNavigate}
              />
            )}

            {currentRoute === 'collections' && (
              <CollectionsPage
                initialFilter={collectionFilter}
                onOpenCareGuide={() => handleNavigate('care')}
              />
            )}

            {currentRoute === 'contract' && (
              <ContractTradePage
                onSelectCollection={(col) => handleNavigate('collections', col)}
              />
            )}

            {currentRoute === 'care' && <CareGuidePage />}

            {currentRoute === 'about' && <AboutPage />}

            {currentRoute === 'contact' && <ContactPage />}
          </main>

          {/* Persistent Mobile Bottom Action Bar */}
          <BottomActionBar
            onScrollToCalculator={() => handleNavigate('calculator')}
          />

          {/* Quote RFP Slide-Over Drawer */}
          <QuoteDrawer />

          {/* Global Footer */}
          <Footer onNavigate={handleNavigate} />
        </div>
      </QuoteProvider>
    </ThemeProvider>
  );
}



