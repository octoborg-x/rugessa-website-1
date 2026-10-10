import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { FileText, Phone, MessageSquare, Calculator } from 'lucide-react';

interface BottomActionBarProps {
  onScrollToCalculator: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onScrollToCalculator,
}) => {
  const { items, openDrawer } = useQuote();
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <aside
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Direct Call +212771010849 */}
        <a
          href="tel:+212771010849"
          className="flex items-center justify-center p-2.5 bg-[#FAF8F5] text-gray-800 rounded-xs border border-gray-200 min-h-[44px] min-w-[44px]"
          aria-label="Call +212 771 010 849"
        >
          <Phone className="w-4 h-4 text-[var(--color-teal-700)]" />
        </a>

        {/* Direct WhatsApp */}
        <a
          href="https://wa.me/212771010849?text=Hello%20Rugessa%20Team%2C%20I%20am%20interested%20in%20your%20carpet%20collections."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2.5 bg-[#25D366]/15 text-[#128C7E] rounded-xs border border-[#25D366]/30 min-h-[44px] min-w-[44px]"
          aria-label="WhatsApp +212 771 010 849"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
        </a>

        {/* Area Calculator Shortcut */}
        <button
          onClick={onScrollToCalculator}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#F2EEE8] text-gray-800 text-xs font-semibold rounded-xs border border-gray-200 min-h-[44px] cursor-pointer"
          aria-label="Go to rug size calculator"
        >
          <Calculator className="w-3.5 h-3.5 text-gray-600" />
          <span className="hidden sm:inline">Calc</span>
        </button>

        {/* Primary Quote Drawer Action */}
        <button
          onClick={openDrawer}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[var(--color-teal-700)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer active:scale-98 transition-transform"
          aria-label={`Open Quote List (${totalCount} items)`}
        >
          <FileText className="w-4 h-4" />
          <span>Quote ({totalCount})</span>
        </button>
      </div>
    </aside>
  );
};
