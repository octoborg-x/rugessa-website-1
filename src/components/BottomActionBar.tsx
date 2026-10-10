import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { FileText, Phone, MessageSquare, Calculator } from 'lucide-react';
import { getWhatsAppUrl, PHONE_TEL, PHONE_DISPLAY } from '../utils/whatsapp';

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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#141619]/95 backdrop-blur-md border-t border-[var(--border-subtle)] dark:border-[#2A2D33] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg transition-colors"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Direct Call */}
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center p-2.5 bg-[#FAF8F5] dark:bg-[#202328] text-gray-800 dark:text-gray-100 rounded-xs border border-gray-200 dark:border-[#33373E] min-h-[44px] min-w-[44px]"
          aria-label={`Call ${PHONE_DISPLAY}`}
          title={`Call ${PHONE_DISPLAY}`}
        >
          <Phone className="w-4 h-4 text-[var(--color-teal-700)] dark:text-[var(--color-teal-400)]" />
        </a>

        {/* Direct WhatsApp (Opens WhatsApp app in user's room) */}
        <a
          href={getWhatsAppUrl('Hello Rugessa Team, I am interested in your carpet collections.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2.5 bg-[#25D366]/15 dark:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] rounded-xs border border-[#25D366]/30 dark:border-[#25D366]/50 min-h-[44px] min-w-[44px]"
          aria-label={`WhatsApp ${PHONE_DISPLAY}`}
          title={`WhatsApp ${PHONE_DISPLAY}`}
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
        </a>

        {/* Area Calculator Shortcut */}
        <button
          onClick={onScrollToCalculator}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#F2EEE8] dark:bg-[#202328] text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-xs border border-gray-200 dark:border-[#33373E] min-h-[44px] cursor-pointer"
          aria-label="Go to rug size calculator"
        >
          <Calculator className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          <span className="hidden sm:inline">Calc</span>
        </button>

        {/* Primary Quote Drawer Action */}
        <button
          onClick={openDrawer}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[var(--color-teal-700)] hover:bg-[var(--color-teal-900)] text-white text-xs font-semibold rounded-xs shadow-xs min-h-[44px] cursor-pointer active:scale-98 transition-transform"
          aria-label={`Open Quote List (${totalCount} items)`}
        >
          <FileText className="w-4 h-4" />
          <span>Quote ({totalCount})</span>
        </button>
      </div>
    </aside>
  );
};
