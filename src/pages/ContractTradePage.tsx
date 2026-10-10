import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { RugCalculator } from '../components/RugCalculator';
import {
  Building2,
  Hotel,
  Briefcase,
  UtensilsCrossed,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers
} from 'lucide-react';
import productsData from '../../data/products.json';

interface ContractTradePageProps {
  onSelectCollection: (col: string) => void;
}

export const ContractTradePage: React.FC<ContractTradePageProps> = ({
  onSelectCollection,
}) => {
  const { openDrawer, setAudienceMode } = useQuote();

  const handleLaunchTradeRFP = () => {
    setAudienceMode('contract');
    openDrawer();
  };

  const applications = [
    {
      icon: Hotel,
      title: 'Boutique Hotels & Guest Suites',
      desc: 'Plush underfoot comfort with high acoustic isolation. Ideal for bedroom perimeters, bedside runners, and presidential suite lounge arrangements.',
      recommended: ['Polyster Shaggy', '3D Microfiber Shagy', 'Chenille'],
    },
    {
      icon: Building2,
      title: 'Hotel Corridors & Reception Lounges',
      desc: 'High-density loomed construction offering rapid pile recovery under continuous foot-traffic and luggage casters.',
      recommended: ['Heatset', 'Frieze', 'Classic'],
    },
    {
      icon: Briefcase,
      title: 'Corporate Offices & Executive Suites',
      desc: 'Refined architectural textures providing optical professionalism, sound dampening for conference rooms, and vacuum durability.',
      recommended: ['Frieze', 'Classic', 'Bcf'],
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining & Private Lounges',
      desc: 'Rich yarn depth supported by Rugessa’s 33 verified stain cleanability protocols for rapid incident intervention.',
      recommended: ['Lurex Heatset', 'Classic', 'Viscose'],
    },
  ];

  return (
    <div className="py-14 bg-[var(--surface-canvas)] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#18191B] to-[#26282B] text-white p-8 sm:p-14 rounded-sm shadow-elevated relative overflow-hidden">
          <div className="max-w-2xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#88CCD0] text-xs font-semibold backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>Architectural & Hospitality Specification Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light font-serif tracking-tight leading-tight">
              Machine-Woven Flooring for Commercial Scale
            </h1>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Serving interior architects, hospitality procurement directors, and commercial developers. Rugessa combines 15+ years of continuous manufacturing experience with reliable delivery schedules and multi-line specification quotes.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleLaunchTradeRFP}
                className="px-6 py-3.5 bg-[var(--color-teal-500)] text-gray-950 hover:bg-[var(--color-teal-700)] hover:text-white font-semibold text-xs rounded-xs shadow-md transition-all cursor-pointer flex items-center gap-2 min-h-[48px]"
              >
                <FileText className="w-4 h-4" />
                <span>Launch Commercial RFP Specification</span>
              </button>
            </div>
          </div>
        </div>

        {/* Commercial Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block mb-1">
              Specifier Commitments
            </span>
            <h2 className="text-3xl font-light font-serif text-[var(--color-text-primary)]">
              Engineered for Contract Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-sm border border-[var(--border-subtle)] shadow-2xs">
              <ShieldCheck className="w-8 h-8 text-[var(--color-teal-700)] mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                Dimensional & Color Stability
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Machine-loomed under strict tension controls to prevent edge warping, shedding, or dimensional contraction across large-room installations.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-[var(--border-subtle)] shadow-2xs">
              <Clock className="w-8 h-8 text-[var(--color-gold-700)] mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                On-Time Delivery Principle
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                As verified in Rugessa’s corporate charter, delivery in time is a foundational company policy, preventing handover bottlenecks on construction sites.
              </p>
            </div>

            <div className="p-6 bg-white rounded-sm border border-[var(--border-subtle)] shadow-2xs">
              <Layers className="w-8 h-8 text-[var(--color-olive-700)] mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                33 Verified Spot Cleanability Protocols
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every Rugessa series is supported by rigorous chemical stain interventions (from wine to coffee and machine oils) ensuring long operational asset life.
              </p>
            </div>
          </div>
        </div>

        {/* Space Application Matrix */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block mb-1">
              Deployment Matrix
            </span>
            <h2 className="text-3xl font-light font-serif text-[var(--color-text-primary)]">
              Tailored Spaces & Recommended Weaves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-sm border border-[var(--border-subtle)] shadow-2xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xs bg-[var(--color-teal-50)] text-[var(--color-teal-700)]">
                    <app.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {app.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {app.desc}
                </p>

                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-gray-500">Recommended Collections:</span>
                  {app.recommended.map((col) => (
                    <button
                      key={col}
                      onClick={() => onSelectCollection(col)}
                      className="px-2.5 py-1 text-[11px] rounded-xs bg-[#FAF8F5] border border-gray-200 text-gray-800 hover:border-[var(--color-teal-700)] font-medium cursor-pointer"
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Sizing & Surface Calculator */}
      <RugCalculator />
    </div>
  );
};
