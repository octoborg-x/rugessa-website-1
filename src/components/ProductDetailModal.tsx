import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { X, FileText, Check, ShieldCheck, Sparkles, Droplets } from 'lucide-react';
import productsData from '../../data/products.json';

interface ProductDetailModalProps {
  product: typeof productsData[0] | null;
  onClose: () => void;
  onOpenStainGuide?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenStainGuide,
}) => {
  const { addItem } = useQuote();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name_verbatim,
      collection: product.collection,
      image: product.images[0]?.src || '',
      quantity: 1,
      notes: `${product.collection} machine-woven model ${product.sku}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.name_verbatim}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl z-10 overflow-hidden border border-[var(--border-subtle)] max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-xs cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 bg-gray-100 relative min-h-[260px] md:min-h-[420px]">
          <img
            src={product.images[0]?.src}
            alt={product.images[0]?.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-xs font-mono px-2.5 py-1 rounded-xs">
            {product.sku}
          </div>
          <div className="absolute bottom-3 left-3 bg-white/90 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-xs">
            {product.collection} Series
          </div>
        </div>

        {/* Product Information Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-teal-700)] font-semibold block">
                Official Machine-Woven Carpet
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-[var(--color-text-primary)] mt-1">
                {product.name_verbatim}
              </h2>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {product.display_copy}
            </p>

            {/* Technical Attribute Grid */}
            <div className="border-t border-b border-gray-100 py-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Collection Weave:</span>
                <span className="font-semibold text-gray-900">{product.collection}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Catalog SKU Reference:</span>
                <span className="font-mono font-bold text-gray-900">{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Manufacturing Standard:</span>
                <span className="text-gray-900">Machine-loomed continuous production</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Operational Experience:</span>
                <span className="text-gray-900">Over 15 years expertise</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E6E0D6] text-[11px] text-gray-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-teal-700)]" />
                <span>Commercial Specification Ready</span>
              </div>
              <p>
                Suitable for living rooms, bedrooms, hospitality guest suites, and corporate lounges. Pair with standard underlayments for enhanced acoustic impact reduction.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xs shadow-xs transition-all cursor-pointer min-h-[48px] ${
                added
                  ? 'bg-green-700 text-white'
                  : 'bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {product.sku} to Quote Drawer</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Add {product.sku} to Specification Quote</span>
                </>
              )}
            </button>

            {onOpenStainGuide && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStainGuide();
                }}
                className="w-full text-center text-[11px] text-[var(--color-teal-700)] hover:underline pt-1 cursor-pointer flex items-center justify-center gap-1"
              >
                <Droplets className="w-3 h-3" />
                <span>View Carpet Care & Stain Removal Protocols</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
