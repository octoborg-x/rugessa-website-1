import React, { useState, useEffect } from 'react';
import productsData from '../../data/products.json';
import siteData from '../../data/site.json';
import { useQuote } from '../context/QuoteContext';
import { RugCalculator } from '../components/RugCalculator';
import { ProductDetailModal } from '../components/ProductDetailModal';
import {
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Droplets,
  Search,
  ShieldCheck,
  Building2,
  Home,
  Check,
  Layers,
  Award,
  Clock,
  Compass,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pause,
  Play
} from 'lucide-react';
import { getWhatsAppUrl, PHONE_DISPLAY, PHONE_TEL, FACTORY_ADDRESS } from '../utils/whatsapp';

interface HomePageProps {
  initialCollectionFilter?: string;
  onNavigateSection: (sectionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  initialCollectionFilter = 'all',
  onNavigateSection,
}) => {
  const { addItem, openDrawer, audienceMode, setAudienceMode } = useQuote();
  const [selectedFilter, setSelectedFilter] = useState<string>(initialCollectionFilter);
  const [stainQuery, setStainQuery] = useState<string>('');
  const [addedSkuMap, setAddedSkuMap] = useState<Record<string, boolean>>({});
  const [modalProduct, setModalProduct] = useState<typeof productsData[0] | null>(null);

  const collections = Array.from(new Set(productsData.map((p) => p.collection)));

  const filteredProducts = selectedFilter === 'all'
    ? productsData
    : productsData.filter((p) => p.collection === selectedFilter);

  const filteredStains = siteData.stain_guide.filter(
    (item) =>
      item.stain.toLowerCase().includes(stainQuery.toLowerCase()) ||
      item.treatment.toLowerCase().includes(stainQuery.toLowerCase())
  );

  const handleAddProduct = (product: typeof productsData[0]) => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name_verbatim,
      collection: product.collection,
      image: product.images[0]?.src || '',
      quantity: 1,
      notes: `${product.collection} machine-woven model ${product.sku}`,
    });

    setAddedSkuMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedSkuMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const heroSlides = [
    {
      id: 'polyster-shaggy-ps-001',
      image: '/assets/products/polyster-shaggy_ps-001.jpg',
      collection: 'Polyster Shaggy',
      sku: 'PS-001',
      spec: 'High-density pile tuft with optical luster, deep texture & tactile warmth',
      badge: 'Residential Plush Comfort',
      texture: 'Dense Shaggy Pile · 100% Polypropylene',
    },
    {
      id: 'classic-cl-001',
      image: '/assets/products/classic_cl-001.jpg',
      collection: 'Classic Loomed',
      sku: 'CL-001',
      spec: 'Timeless architectural motifs, rich border framing & structural loomed density',
      badge: 'Traditional Heritage Loom',
      texture: 'Precision Classical Motif · High Point Count',
    },
    {
      id: 'heatset-ht-007',
      image: '/assets/products/heatset_ht-007.jpg',
      collection: 'Heatset Contract',
      sku: 'HT-007',
      spec: 'Thermal-treated polypropylene yarns engineered for commercial footfall resilience',
      badge: 'Hospitality & Commercial Grade',
      texture: 'Thermal Heatset Weave · Heavy Traffic Tested',
    },
    {
      id: 'chenille-ch-001',
      image: '/assets/products/chenille_ch-001.jpg',
      collection: 'Chenille',
      sku: 'CH-001',
      spec: 'Velvety touch with supple drape, geometric balance and soft tactile warmth',
      badge: 'Velvet Tactile Sheen',
      texture: 'Chenille Yarn Weave · Soft Touch Surface',
    },
    {
      id: 'viscose-vs-001',
      image: '/assets/products/viscose_vs-001.jpg',
      collection: 'Viscose',
      sku: 'VS-001',
      spec: 'Silky optical reflection with radiant gradient depth and delicate refined feel',
      badge: 'Silky Luster Finish',
      texture: 'Viscose Blend · High Luster Yarn',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const currentActiveSlide = heroSlides[activeSlide];
  const activeProductData = productsData.find((p) => p.sku === currentActiveSlide.sku);

  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO PROPOSITION WITH FULL-WIDTH & HEIGHT VISIBLE CARPET BACKGROUND SLIDER */}
      <section
        id="hero"
        className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-[#0D0E11] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-[#24272D] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full Width & Height Visible Slider Images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.sku}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeSlide
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`Rugessa ${slide.collection} Carpet textile`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className={`w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-transform duration-[7000ms] ease-out ${
                  idx === activeSlide ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          ))}

          {/* Balanced editorial dark scrim: keeps carpet background vividly visible while ensuring text is readable */}
          {/* Asymmetric left-to-right gradient: dark where the headline sits, clear translucent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 md:from-black/80 md:via-black/50 md:to-black/20 z-10" />
          {/* Top and bottom soft fade for navigation and edge transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-black/45 z-10" />
          {/* Warm subtle ambient tint */}
          <div className="absolute inset-0 bg-black/15 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#88CCD0] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold-400)]" />
                <span>Over 15 Years of Machine-Woven Carpet Craft</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white font-serif leading-[1.08] tracking-tight drop-shadow-sm">
                Weaving for a living<span className="text-[var(--color-gold-400)]">.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-xl drop-shadow-xs">
                {audienceMode === 'contract' ? (
                  <>
                    Engineered carpet collections for hospitality corridors, executive offices, and residential developments. High pile resilience, verified cleanability, and multi-line specification quotes.
                  </>
                ) : (
                  <>
                    Transform residential spaces with authentic machine-woven textures. Ten distinct weave series ranging from deep plush Shaggies to dense thermal-set Heatsets and delicate Chenille.
                  </>
                )}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openDrawer}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-600)] text-white text-xs font-semibold rounded-xs shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Quotation</span>
                </button>

                <button
                  onClick={() => onNavigateSection('collections')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black/40 hover:bg-black/60 text-white text-xs font-semibold rounded-xs border border-white/30 backdrop-blur-md shadow-sm transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Explore the 10 Collections</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-gold-400)]" />
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-300 font-mono">
                <span className="flex items-center gap-1.5 text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-olive-400)]" />
                  33 Verified SKUs
                </span>
                <span className="flex items-center gap-1.5 text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-olive-400)]" />
                  10 Weave Types
                </span>
                <span className="flex items-center gap-1.5 text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-olive-400)]" />
                  Zero Fakes / Real Factory Catalog
                </span>
              </div>

              {/* Slider Navigation & Interactive Carpet Thumbnails */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3">
                  {/* Dots / Pills */}
                  <div className="flex items-center gap-2" role="tablist" aria-label="Hero slider pagination">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.sku}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                          idx === activeSlide
                            ? 'w-8 h-2.5 bg-[var(--color-gold-400)] shadow-xs'
                            : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                        }`}
                        aria-label={`Slide ${idx + 1}: ${slide.collection}`}
                        title={`Slide ${idx + 1}: ${slide.collection}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-gray-300 tracking-wider">
                    0{activeSlide + 1} / 0{heroSlides.length} · {currentActiveSlide.collection} ({currentActiveSlide.sku})
                  </span>

                  {/* Play/Pause & Arrow Controls */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsPaused((prev) => !prev)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                      aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                      title={isPaused ? "Play slideshow" : "Pause slideshow"}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 text-[var(--color-gold-400)]" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                      aria-label="Previous slide"
                      title="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                      aria-label="Next slide"
                      title="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Miniature Carpet Swatch Strip: Click to immediately view that carpet texture in background */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 shrink-0">
                    Background Swatches:
                  </span>
                  {heroSlides.map((slide, idx) => {
                    const isCurrent = idx === activeSlide;
                    return (
                      <button
                        key={slide.sku}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`group relative flex items-center gap-2 px-2 py-1 rounded-xs transition-all cursor-pointer shrink-0 border ${
                          isCurrent
                            ? 'bg-black/70 border-[var(--color-gold-400)] text-white shadow-md ring-1 ring-[var(--color-gold-400)]'
                            : 'bg-black/40 border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
                        }`}
                        title={`Switch background to ${slide.collection} (${slide.sku})`}
                      >
                        <div className="w-6 h-6 rounded-xs overflow-hidden shrink-0 border border-white/20">
                          <img
                            src={slide.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-mono">
                          {slide.sku}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Architectural Spec Column — Visual link to background carpet */}
            <div className="lg:col-span-5 space-y-4">
              {/* Featured Active Background Carpet Card */}
              <div className="p-5 sm:p-6 rounded-sm bg-black/60 dark:bg-[#15171B]/85 backdrop-blur-md border border-white/25 shadow-2xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider uppercase text-[#88CCD0] font-semibold">
                      Background Carpet Texture
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-white/10 text-[var(--color-gold-300)] font-semibold">
                    {currentActiveSlide.badge}
                  </span>
                </div>

                {/* Thumbnail Preview & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xs overflow-hidden border border-white/30 shrink-0 relative group shadow-md">
                    <img
                      src={currentActiveSlide.image}
                      alt={currentActiveSlide.collection}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={() => activeProductData && setModalProduct(activeProductData)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Inspect full image & specs"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-serif text-white leading-tight">
                      {currentActiveSlide.collection}
                    </h3>
                    <p className="text-xs font-mono text-[var(--color-gold-300)] mt-0.5">
                      Model SKU: {currentActiveSlide.sku}
                    </p>
                    <p className="text-[11px] text-gray-300 leading-snug mt-1.5">
                      {currentActiveSlide.spec}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-gray-400">
                    {currentActiveSlide.texture}
                  </span>

                  <div className="flex items-center gap-2">
                    {activeProductData && (
                      <button
                        type="button"
                        onClick={() => setModalProduct(activeProductData)}
                        className="text-xs px-2.5 py-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>
                    )}
                    {activeProductData && (
                      <button
                        type="button"
                        onClick={() => handleAddProduct(activeProductData)}
                        className="text-xs px-3 py-1.5 rounded-xs bg-[var(--color-teal-600)] hover:bg-[var(--color-teal-500)] text-white font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        {addedSkuMap[activeProductData.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5" />
                            <span>Add to Quote</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Commercial Standard Specification Card */}
              <div className="p-4 sm:p-5 bg-black/55 dark:bg-[#181A1D]/85 backdrop-blur-md rounded-sm border border-white/15 dark:border-[#33373E] shadow-xl flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[var(--color-teal-700)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">Commercial Standard</span>
                    <span className="text-[10px] font-mono text-[var(--color-teal-300)] font-bold">15+ Yrs Factory Heritage</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    Precision machine-woven textiles engineered for prolonged resilience, dimensional stability, and easy spot maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISUAL COLLECTION INDEX */}
      {/* Q: What distinct weave constructions and yarn styles does Rugessa produce? */}
      <section id="collections" className="py-20 bg-white dark:bg-[#121417] border-b border-[var(--border-subtle)] dark:border-[#2C2F36] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)] font-semibold block mb-2">
                Curated Loom Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)] font-serif">
                The Ten Machine-Woven Collections
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2 font-light max-w-xl">
                Every genuine category crawled from Rugessa's operational catalog. Explore dense shaggies, geometric heatsets, and classic motifs.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#FAF8F5] dark:bg-[#1A1C1E] p-1.5 rounded-sm border border-[#E6E0D6] dark:border-[#33373E] max-w-xl">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-xs rounded-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[var(--color-teal-700)] text-white shadow-xs font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                All (33)
              </button>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedFilter(col)}
                  className={`px-2.5 py-1.5 text-xs rounded-xs font-medium transition-all cursor-pointer ${
                    selectedFilter === col
                      ? 'bg-[var(--color-teal-700)] text-white shadow-xs font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* 10 Collections Visual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((colName) => {
              const colProducts = productsData.filter((p) => p.collection === colName);
              const previewProduct = colProducts[0];
              const isSelected = selectedFilter === colName;

              return (
                <div
                  key={colName}
                  className={`group bg-[var(--surface-canvas)] border rounded-sm overflow-hidden transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'border-[var(--color-teal-700)] ring-1 ring-[var(--color-teal-700)] shadow-md'
                      : 'border-[var(--border-subtle)] hover:border-gray-400 hover:shadow-xs'
                  }`}
                >
                  <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
                    <img
                      src={previewProduct?.images[0]?.src}
                      alt={`Rugessa ${colName} Carpet Collection`}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-mono font-bold px-2.5 py-1 rounded-xs">
                      {colProducts.length} Model{colProducts.length === 1 ? '' : 's'}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-normal font-serif text-[var(--color-text-primary)] mb-2">
                        {colName}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {previewProduct?.display_copy}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E6E0D6] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">
                        Series Ref: {previewProduct?.sku}
                      </span>
                      <button
                        onClick={() => setSelectedFilter(colName)}
                        className="text-xs font-semibold text-[var(--color-teal-700)] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Models</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED SKU SHOWCASE */}
      {/* Q: What individual models and colorways can I specify right now? */}
      <section className="py-20 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block mb-1">
                Active Catalog Selection
              </span>
              <h2 className="text-3xl font-light font-serif text-[var(--color-text-primary)]">
                {selectedFilter === 'all'
                  ? 'All 33 Machine-Woven Carpets'
                  : `${selectedFilter} Series (${filteredProducts.length} SKUs)`}
              </h2>
            </div>
            {selectedFilter !== 'all' && (
              <button
                onClick={() => setSelectedFilter('all')}
                className="text-xs text-[var(--color-teal-700)] font-semibold underline cursor-pointer"
              >
                Reset to All 33 Carpets
              </button>
            )}
          </div>

          {/* SKU Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedSkuMap[product.id];
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-sm border border-[var(--border-subtle)] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-4/3 bg-gray-100 overflow-hidden cursor-pointer group" onClick={() => setModalProduct(product)}>
                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-xs">
                      {product.sku}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-white/90 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-xs">
                      {product.collection}
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2.5 py-1 bg-white/95 text-gray-900 text-[11px] font-semibold rounded-xs shadow-xs flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[var(--color-teal-700)]" />
                        Quick View
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => setModalProduct(product)}
                        className="font-semibold text-sm text-[var(--color-text-primary)] mb-1 hover:text-[var(--color-teal-700)] cursor-pointer transition-colors"
                      >
                        {product.name_verbatim}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {product.display_copy}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalProduct(product)}
                        className="p-2.5 text-xs text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xs transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="View specifications"
                        aria-label={`View specs for ${product.name_verbatim}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddProduct(product)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xs transition-all cursor-pointer min-h-[44px] ${
                          isAdded
                            ? 'bg-green-700 text-white'
                            : 'bg-[var(--surface-canvas)] hover:bg-[var(--color-teal-700)] text-gray-800 hover:text-white border border-gray-200'
                        }`}
                        aria-label={`Add ${product.name_verbatim} to Quote`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Quote</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5" />
                            <span>Add to Quote RFP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: PARAMETRIC SPACE & AREA ESTIMATOR */}
      <RugCalculator />

      {/* SECTION 5: MASTER WEAVER HERITAGE */}
      {/* Q: Can I trust Rugessa's operational reliability and delivery promises? */}
      <section id="heritage" className="py-20 bg-white border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block">
                Corporate Foundations
              </span>
              <h2 className="text-3xl sm:text-4xl font-light font-serif text-[var(--color-text-primary)] leading-tight">
                Over 15 Years of Dedicated Carpet Manufacturing
              </h2>
              <div className="p-5 bg-[var(--surface-canvas)] border-l-2 border-[var(--color-teal-700)] rounded-r-sm">
                <p className="text-xs text-gray-700 font-serif italic text-base leading-relaxed">
                  "{siteData.brand.history_verbatim}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {siteData.brand.core_principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-teal-50)] text-[var(--color-teal-700)] flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-2">
                    {principle}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Continuous operational investments assure dependable fiber consistency, rigorous batch inspection, and international delivery.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CARE & STAIN CONSULTATION TEASER */}
      {/* Q: How do I protect and maintain my Rugessa carpet after installation? */}
      <section id="care" className="py-20 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block mb-2">
              Textile Care Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-serif text-[var(--color-text-primary)]">
              Carpet Maintenance & Stain Removal Protocols
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 font-light">
              Preserve yarn luster, pile volume, and hygiene with Rugessa's verified maintenance recommendations and 33 specific stain removal procedures.
            </p>
          </div>

          {/* Quick Search Stain Box */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-[var(--border-subtle)] shadow-xs mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6 text-[var(--color-teal-700)]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Search 33 Stain Treatment Procedures
                </h3>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={stainQuery}
                  onChange={(e) => setStainQuery(e.target.value)}
                  placeholder="e.g. coffee, ink, grease..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xs focus:outline-hidden focus:border-[var(--color-teal-700)]"
                  aria-label="Search stain recipes"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-72 overflow-y-auto pr-1">
              {filteredStains.slice(0, 9).map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xs border border-gray-100 bg-[#FAF8F5] hover:border-[var(--color-teal-500)] transition-colors"
                >
                  <span className="font-semibold text-xs text-[var(--color-teal-900)] block mb-1">
                    {s.stain}
                  </span>
                  <p className="text-xs text-gray-600 leading-snug">
                    {s.treatment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 12 Care Points Summary Preview */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-[var(--color-olive-700)]" />
              <h3 className="text-base font-semibold text-gray-900">
                Core Carpet Maintenance Rules (Excerpt)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {siteData.care_guide.points.slice(0, 3).map((pt, idx) => (
                <div key={idx} className="p-4 rounded-xs bg-[#FAF8F5] border border-gray-100 text-xs text-gray-700 leading-relaxed">
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CONVERSION & TRADE INQUIRY */}
      {/* Q: How do I submit my specifications or get in touch directly? */}
      <section className="py-20 bg-[#18191B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#88CCD0] font-semibold block mb-3">
            Direct Specifier Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-serif tracking-tight mb-4">
            Begin Your Carpet Specification
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
            Whether furnishing a residential residence or outfitting hospitality guest suites, our team handles custom dimensioning and volume supply with guaranteed manufacturing integrity.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={openDrawer}
              className="px-6 py-3.5 bg-[var(--color-teal-500)] hover:bg-[var(--color-teal-700)] text-gray-950 hover:text-white font-semibold text-xs rounded-xs shadow-md transition-all cursor-pointer min-h-[48px] flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Launch Specification RFP</span>
            </button>
            <a
              href={getWhatsAppUrl('Hello Rugessa Team, I would like to request a quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs rounded-xs shadow-md transition-all min-h-[48px] flex items-center gap-2"
              title="Open WhatsApp chat with Rugessa"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: {PHONE_DISPLAY}</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="px-6 py-3.5 bg-transparent border border-gray-600 hover:border-white text-white font-semibold text-xs rounded-xs transition-all min-h-[48px] flex items-center gap-2"
            >
              <span>Call: {PHONE_DISPLAY}</span>
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6 font-mono">
            Facility: {FACTORY_ADDRESS}
          </p>
        </div>
      </section>

      {/* Product Detail Modal for inspecting specs */}
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onOpenStainGuide={() => onNavigateSection('care')}
        />
      )}
    </div>
  );
};
