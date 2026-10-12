import React from 'react';
import { RugessaLogo } from './RugessaLogo';
import { Mail, ShieldCheck, ArrowUp, MessageSquare } from 'lucide-react';
import productsData from '../../data/products.json';
import siteData from '../../data/site.json';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL, FACTORY_ADDRESS, CONTACT_EMAIL } from '../utils/whatsapp';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  onNavigate: (sectionId: string, filterCollection?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const collections = Array.from(new Set(productsData.map((p) => p.collection)));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#161719] text-[#FAF8F5] pt-16 pb-24 lg:pb-16 border-t border-[#2C2D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2D30]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <RugessaLogo size="md" />
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              "{siteData.brand.history_verbatim}"
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-1 font-mono">
              <div className="flex items-center gap-1.5 text-[#88CCD0]">
                <ShieldCheck className="w-4 h-4" />
                <span>33 Authentic Machine-Woven Carpets</span>
              </div>
              <div>
                Tel: <a href={`tel:${PHONE_TEL}`} className="text-white hover:underline">{PHONE_DISPLAY}</a> · WhatsApp:{' '}
                <a
                  href={getWhatsAppUrl('Hello Rugessa Team, I am inquiring about carpet collections.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline inline-flex items-center gap-1 font-medium"
                  title="Open WhatsApp chat with Rugessa"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>Inquiries: <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline">{CONTACT_EMAIL}</a></div>
              <div className="text-[11px] text-gray-500 pt-1">
                {FACTORY_ADDRESS}
              </div>
            </div>
          </div>

          {/* Collections Column (Left 5) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#88CCD0] font-semibold mb-3">
              Collections (1–5)
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {collections.slice(0, 5).map((col) => (
                <li key={col}>
                  <button
                    onClick={() => onNavigate('collections', col)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Column (Right 5) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#88CCD0] font-semibold mb-3">
              Collections (6–10)
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {collections.slice(5).map((col) => (
                <li key={col}>
                  <button
                    onClick={() => onNavigate('collections', col)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation & Guides */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#88CCD0] font-semibold mb-3">
              Navigation & Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contract')} className="hover:text-white cursor-pointer">
                  Contract & Hotel Specification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white cursor-pointer">
                  Corporate Heritage (15+ Yrs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-white cursor-pointer">
                  12-Point Maintenance Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-white cursor-pointer">
                  33 Stain Removal Protocols
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white cursor-pointer">
                  Contact & Quoting Office
                </button>
              </li>
              <li>
                <a href="mailto:info@rugessa.com" className="hover:text-white flex items-center gap-1 text-[var(--color-teal-300)] font-medium">
                  <Mail className="w-3.5 h-3.5" /> info@rugessa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Rugessa. All rights reserved. Specialized Machine-Made Carpet Production.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Mohammédia 28810, Morocco</span>
            <ThemeToggle variant="segmented" />
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
