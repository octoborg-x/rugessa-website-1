import React, { useState } from 'react';
import siteData from '../../data/site.json';
import { BookOpen, Droplets, Search, AlertCircle, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { ScrollReveal, Parallax } from '../components/ScrollReveal';

export const CareGuidePage: React.FC = () => {
  const [stainQuery, setStainQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const stains = siteData.stain_guide;

  // Categorize stains for user convenience
  const getCategory = (stain: string) => {
    const s = stain.toUpperCase();
    if (s.includes('DRINK') || s.includes('BEER') || s.includes('WINE') || s.includes('TEA') || s.includes('COFFEE') || s.includes('LEMONADE') || s.includes('JUICE')) {
      return 'beverage';
    }
    if (s.includes('OIL') || s.includes('FAT') || s.includes('BUTTER') || s.includes('TAR') || s.includes('CHOCOLATE') || s.includes('EGG') || s.includes('FOOD') || s.includes('MUSTARD') || s.includes('SUGAR')) {
      return 'food_oil';
    }
    if (s.includes('INK') || s.includes('PEN') || s.includes('PAINT') || s.includes('NAIL') || s.includes('POLISH') || s.includes('GLUE') || s.includes('VARNISH') || s.includes('DRUG') || s.includes('PERFUME')) {
      return 'chemicals_dyes';
    }
    return 'general';
  };

  const filteredStains = stains.filter((item) => {
    const matchesSearch =
      item.stain.toLowerCase().includes(stainQuery.toLowerCase()) ||
      item.treatment.toLowerCase().includes(stainQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || getCategory(item.stain) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-[var(--surface-canvas)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header with Parallax & ScrollReveal */}
        <ScrollReveal direction="up" distance={24}>
          <div className="relative">
            <Parallax speed={-20} className="absolute right-0 top-0 opacity-10 pointer-events-none hidden md:block">
              <Droplets className="w-32 h-32 text-[var(--color-teal-700)]" />
            </Parallax>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#181A1D] border border-[#E6E0D6] dark:border-[#33373E] text-xs font-semibold text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Rugessa Carpet Maintenance Knowledge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light font-serif text-[var(--color-text-primary)]">
              Carpet Care & Stain Removal Protocols
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 font-light max-w-2xl leading-relaxed">
              Preserve fiber integrity, tactile loft, and color vividness. Every recommendation and stain intervention is drawn verbatim from Rugessa’s factory maintenance guidelines.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 1: The 12 Fundamental Care Recommendations */}
        <section id="maintenance" className="bg-white dark:bg-[#181A1D] p-8 sm:p-10 rounded-sm border border-[var(--border-subtle)] dark:border-[#2C2F36] shadow-xs space-y-8">
          <ScrollReveal direction="up" distance={20}>
            <div>
              <div className="flex items-center gap-2.5 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                  Factory Recommendations
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-gray-900 dark:text-white">
                12 Foundational Carpet Care Principles
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">
                "{siteData.care_guide.intro}"
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteData.care_guide.points.map((point, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={24}
                delay={0.04 * (idx % 6)}
                scale={0.98}
              >
                <div
                  className="p-5 rounded-xs bg-[#FAF8F5] dark:bg-[#202328] border border-[#E6E0D6] dark:border-[#383C44] hover:border-[var(--color-teal-500)] transition-colors flex gap-3.5 h-full"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--color-teal-50)] dark:bg-[#1C3B3F] text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    {point.replace(/^\d+\s*[-.]\s*/, '')}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Golden Care Rule Banner */}
          <ScrollReveal direction="up" distance={16} delay={0.1}>
            <div className="p-4 bg-[var(--color-gold-50)] dark:bg-[#2A2315] border border-[var(--color-gold-300)] dark:border-[#5C451E] rounded-xs flex items-start gap-3 text-xs text-[var(--color-gold-900)] dark:text-[var(--color-gold-300)]">
              <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-gold-700)] dark:text-[var(--color-gold-400)] mt-0.5" />
              <div>
                <strong>Rule 8 Reminder:</strong> Always test any chemical stain removal substance on an inconspicuous, non-visible section of the carpet before treating central surface areas.
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 2: The 33 Stain Removal Engine */}
        <section id="stains" className="bg-white dark:bg-[#181A1D] p-8 sm:p-10 rounded-sm border border-[var(--border-subtle)] dark:border-[#2C2F36] shadow-xs space-y-8">
          <ScrollReveal direction="up" distance={20}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-2.5 text-[var(--color-olive-700)] dark:text-[var(--color-olive-400)] mb-2">
                  <Droplets className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                    Chemical Spot Intervention
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light font-serif text-gray-900 dark:text-white">
                  Searchable Stain Removal Engine (33 Substances)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Immediate, accurate intervention procedures for residential and commercial carpet emergencies.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={stainQuery}
                  onChange={(e) => setStainQuery(e.target.value)}
                  placeholder="Search substance (e.g. wine, coffee, ink)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-[#202328] border border-gray-200 dark:border-[#383C44] rounded-xs focus:outline-hidden focus:border-[var(--color-teal-700)] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-[#2C2F36]">
              {[
                { id: 'all', label: `All Stains (${stains.length})` },
                { id: 'beverage', label: 'Beverages & Liquors' },
                { id: 'food_oil', label: 'Foods, Fats & Greases' },
                { id: 'chemicals_dyes', label: 'Inks, Dyes & Cosmetics' },
                { id: 'general', label: 'Other Household Stains' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs rounded-xs font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[var(--color-teal-700)] text-white shadow-xs font-semibold'
                      : 'bg-gray-50 dark:bg-[#202328] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2E35]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Stains Cards Grid with Staggered ScrollReveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStains.map((stainItem, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={20}
                delay={0.03 * (idx % 6)}
                scale={0.99}
              >
                <div
                  className="p-4 rounded-xs border border-gray-200 dark:border-[#33373E] bg-[#FAF8F5] dark:bg-[#202328] hover:border-[var(--color-teal-500)] transition-colors space-y-1.5 h-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900 dark:text-white tracking-wide">
                      {stainItem.stain}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-gray-400 dark:text-gray-500">
                      Protocol #{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                    {stainItem.treatment}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Direct Support Callout */}
          <ScrollReveal direction="up" distance={20} delay={0.08}>
            <div className="p-6 bg-[#FAF8F5] dark:bg-[#202328] rounded-xs border border-[#E6E0D6] dark:border-[#33373E] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                  Severe, persistent or dried stains?
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  For persistent or dried commercial stains, consult a professional carpet cleaning contractor or contact Rugessa advisory at <a href="mailto:info@rugessa.com" className="font-semibold text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] underline">info@rugessa.com</a>.
                </p>
              </div>
              <a
                href="mailto:info@rugessa.com?subject=Carpet%20Stain%20Consultation"
                className="px-4 py-2.5 bg-white dark:bg-[#181A1D] border border-gray-300 dark:border-[#383C44] text-xs font-semibold text-gray-800 dark:text-gray-200 rounded-xs hover:border-[var(--color-teal-700)] shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]" />
                <span>Contact Care Specialist</span>
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
};

