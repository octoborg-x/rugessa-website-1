import React from 'react';
import siteData from '../../data/site.json';
import { Award, Clock, ShieldCheck, HeartHandshake, CheckCircle2, Factory, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Unconditional Customer Satisfaction',
      desc: 'Adopted as an unwavering corporate policy from inception, ensuring client requirements dictate manufacturing precision.',
    },
    {
      icon: Award,
      title: 'Quality in Production and Service',
      desc: 'Rigorous yarn selection, uniform weave density, and continuous inspection ensure every collection meets international flooring standards.',
    },
    {
      icon: Clock,
      title: 'Delivery in Time',
      desc: 'A core operational discipline preventing delays for residential project timelines and commercial contract handovers.',
    },
    {
      icon: ShieldCheck,
      title: 'Affordable Price',
      desc: 'Direct industrial manufacturing efficiencies allow premium tactile beauty and contract longevity at competitive value.',
    },
  ];

  return (
    <div className="py-12 bg-[var(--surface-canvas)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block">
            The Weaving House
          </span>
          <h1 className="text-3xl sm:text-5xl font-light font-serif text-[var(--color-text-primary)] leading-tight">
            More than 15 Years of Machine-Made Carpet Production
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] font-light leading-relaxed">
            Founded on deep industrial weaving expertise, Rugessa crafts continuous textile collections tailored for living comfort and commercial durability.
          </p>
        </div>

        {/* Verbatim Corporate Statement Card */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[var(--border-subtle)] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-teal-700)]" />
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Official Corporate Declaration
            </span>
            <blockquote className="text-lg sm:text-xl font-serif text-gray-900 leading-relaxed italic">
              "{siteData.brand.history_verbatim}"
            </blockquote>
            <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-mono">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-olive-500)]" />
              <span>Verified source: Rugessa Corporate Charter (`corporate.html`)</span>
            </div>
          </div>
        </div>

        {/* 4 Core Principles */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block mb-1">
              Guiding Standards
            </span>
            <h2 className="text-3xl font-light font-serif text-[var(--color-text-primary)]">
              The Four Company Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-sm border border-[var(--border-subtle)] shadow-2xs space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-teal-50)] text-[var(--color-teal-700)] flex items-center justify-center mb-2">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing & Craft Overview */}
        <div className="bg-[#F2EEE8] p-8 sm:p-10 rounded-sm border border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-teal-900)]">
                <Factory className="w-5 h-5 text-[var(--color-teal-700)]" />
                <h3 className="text-xl font-semibold">Specialized Loom Engineering</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Rugessa’s specialized production personnel operate industrial weaving plants engineered for diverse yarn types: Polypropylene Heatset, Polyester microfibers, classic chenille weaves, and durable BCF filaments. Continuing investments in loomed machinery ensure consistent batch dyes and zero pile distortion.
              </p>
              <div className="pt-2 text-xs text-gray-500 space-y-1">
                <div>
                  Direct client queries: <a href="mailto:info@rugessa.com" className="font-semibold text-[var(--color-teal-700)] dark:text-[var(--color-teal-300)] underline">info@rugessa.com</a> · Tel: <a href="tel:+212771010849" className="font-semibold text-gray-900 dark:text-white underline">+212 771 010 849</a> · WhatsApp: <a href="https://api.whatsapp.com/send?phone=212771010849" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">+212 771 010 849</a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white dark:bg-[#181A1D] p-6 rounded-xs border border-gray-200 dark:border-[#2C2F36] text-xs text-gray-600 dark:text-gray-300 space-y-2">
              <span className="font-semibold text-gray-900 dark:text-white block">Manufacturing Base & Facility</span>
              <p className="leading-normal">
                Operating from the industrial textile cluster of Mohammédia, Morocco:
              </p>
              <p className="font-mono text-[11px] text-gray-800 dark:text-gray-200 bg-[#FAF8F5] dark:bg-[#202328] p-2 border border-gray-200 dark:border-[#383C44] rounded-xs">
                Sud-Ouest, N° 17, Zone Industrielle,<br />
                Mohammédia 28810, Morocco
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
