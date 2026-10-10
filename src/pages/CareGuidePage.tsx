import React, { useState } from 'react';
import siteData from '../../data/site.json';
import { BookOpen, Droplets, Search, AlertCircle, ShieldCheck, Mail, Sparkles } from 'lucide-react';

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
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E0D6] text-xs font-semibold text-[var(--color-teal-700)] mb-3">
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

        {/* Section 1: The 12 Fundamental Care Recommendations */}
        <section id="maintenance" className="bg-white p-8 sm:p-10 rounded-sm border border-[var(--border-subtle)] shadow-xs space-y-8">
          <div>
            <div className="flex items-center gap-2.5 text-[var(--color-teal-700)] mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                Factory Recommendations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light font-serif text-gray-900">
              12 Foundational Carpet Care Principles
            </h2>
            <p className="text-xs text-gray-500 italic mt-1">
              "{siteData.care_guide.intro}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteData.care_guide.points.map((point, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xs bg-[#FAF8F5] border border-[#E6E0D6] hover:border-[var(--color-teal-500)] transition-colors flex gap-3.5"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--color-teal-50)] text-[var(--color-teal-700)] font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {point.replace(/^\d+\s*[-.]\s*/, '')}
                </p>
              </div>
            ))}
          </div>

          {/* Golden Care Rule Banner */}
          <div className="p-4 bg-[var(--color-gold-50)] border border-[var(--color-gold-300)] rounded-xs flex items-start gap-3 text-xs text-[var(--color-gold-900)]">
            <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-gold-700)] mt-0.5" />
            <div>
              <strong>Rule 8 Reminder:</strong> Always test any chemical stain removal substance on an inconspicuous, non-visible section of the carpet before treating central surface areas.
            </div>
          </div>
        </section>

        {/* Section 2: The 33 Stain Removal Engine */}
        <section id="stains" className="bg-white p-8 sm:p-10 rounded-sm border border-[var(--border-subtle)] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2.5 text-[var(--color-olive-700)] mb-2">
                <Droplets className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                  Chemical Spot Intervention
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-gray-900">
                Searchable Stain Removal Engine (33 Substances)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
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
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xs focus:outline-hidden focus:border-[var(--color-teal-700)]"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
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
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stains Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStains.map((stainItem, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xs border border-gray-200 bg-[#FAF8F5] hover:border-[var(--color-teal-500)] transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-gray-900 tracking-wide">
                    {stainItem.stain}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-gray-400">
                    Protocol #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-snug">
                  {stainItem.treatment}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Support Callout */}
          <div className="p-6 bg-[#FAF8F5] rounded-xs border border-[#E6E0D6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-900">
                Severe, persistent or dried stains?
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                For persistent or dried commercial stains, consult a professional carpet cleaning contractor or contact Rugessa advisory at <a href="mailto:info@rugessa.com" className="font-semibold text-[var(--color-teal-700)] underline">info@rugessa.com</a>.
              </p>
            </div>
            <a
              href="mailto:info@rugessa.com?subject=Carpet%20Stain%20Consultation"
              className="px-4 py-2.5 bg-white border border-gray-300 text-xs font-semibold text-gray-800 rounded-xs hover:border-[var(--color-teal-700)] shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--color-teal-700)]" />
              <span>Contact Care Specialist</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
