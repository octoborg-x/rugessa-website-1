import React, { useState } from 'react';
import productsData from '../../data/products.json';
import { useQuote } from '../context/QuoteContext';
import { Search, FileText, Check, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { ScrollReveal } from '../components/ScrollReveal';

interface CollectionsPageProps {
  initialFilter?: string;
  onOpenCareGuide: () => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  initialFilter = 'all',
  onOpenCareGuide,
}) => {
  const { addItem } = useQuote();
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<typeof productsData[0] | null>(null);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const collections = Array.from(new Set(productsData.map((p) => p.collection)));

  const filtered = productsData.filter((product) => {
    const matchesCollection = selectedFilter === 'all' || product.collection === selectedFilter;
    const matchesSearch =
      product.name_verbatim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.collection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  const handleAdd = (product: typeof productsData[0]) => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name_verbatim,
      collection: product.collection,
      image: product.images[0]?.src || '',
      quantity: 1,
      notes: `${product.collection} model ${product.sku}`,
    });
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="py-12 bg-[var(--surface-canvas)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Title */}
        <ScrollReveal direction="up" distance={24}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E0D6] text-xs font-semibold text-[var(--color-teal-700)] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Machine-Woven Carpet Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light font-serif text-[var(--color-text-primary)]">
              Explore All 10 Rugessa Collections
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 font-light max-w-2xl">
              From deep residential shaggies to high-density heatsets and classic motifs. Every model is machine-woven with over 15 years of operational manufacturing rigor.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Controls & Search Bar */}
        <ScrollReveal direction="up" distance={20} delay={0.06}>
          <div className="bg-white p-6 rounded-sm border border-[var(--border-subtle)] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by SKU (e.g. HT-001, PS-002)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xs focus:outline-hidden focus:border-[var(--color-teal-700)]"
                />
              </div>

              <span className="text-xs font-mono text-gray-500">
                Showing <strong>{filtered.length}</strong> of {productsData.length} carpets
              </span>
            </div>

            {/* Collection Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-xs rounded-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[var(--color-teal-700)] text-white shadow-xs font-semibold'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Series ({productsData.length})
              </button>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedFilter(col)}
                  className={`px-2.5 py-1.5 text-xs rounded-xs font-medium transition-all cursor-pointer ${
                    selectedFilter === col
                      ? 'bg-[var(--color-teal-700)] text-white shadow-xs font-semibold'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {col} ({productsData.filter((p) => p.collection === col).length})
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product, idx) => {
            const isAdded = addedMap[product.id];
            return (
              <ScrollReveal
                key={product.id}
                direction="up"
                distance={26}
                delay={0.03 * (idx % 4)}
                scale={0.98}
                className="h-full"
              >
                <div
                  className="bg-white rounded-sm border border-[var(--border-subtle)] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col h-full group"
                >
                <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                  <img
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-xs">
                    {product.sku}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-xs">
                    {product.collection}
                  </div>

                  {/* View Details Quick Action Overlay */}
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold cursor-pointer"
                    aria-label={`View details for ${product.name_verbatim}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Specifications</span>
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-1">
                      {product.name_verbatim}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {product.display_copy}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-xs transition-all cursor-pointer min-h-[44px] ${
                        isAdded
                          ? 'bg-green-700 text-white'
                          : 'bg-[var(--surface-canvas)] hover:bg-[var(--color-teal-700)] text-gray-800 hover:text-white border border-gray-200'
                      }`}
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
            </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onOpenStainGuide={onOpenCareGuide}
        />
      )}
    </div>
  );
};
