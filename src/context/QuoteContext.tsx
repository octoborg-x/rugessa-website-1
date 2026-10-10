import React, { createContext, useContext, useState, useEffect } from 'react';

export interface QuoteItem {
  id: string;
  sku: string;
  name: string;
  collection: string;
  image: string;
  dimensions?: string;
  surfaceM2?: number;
  quantity?: number;
  notes?: string;
}

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => void;
  removeItem: (id: string) => void;
  clearQuote: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  audienceMode: 'residential' | 'contract';
  setAudienceMode: (mode: 'residential' | 'contract') => void;
}

const STORAGE_KEY = 'rugessa_quote_items_v1';

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [audienceMode, setAudienceMode] = useState<'residential' | 'contract'>('residential');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage unavailable for quote state', e);
    }
  }, [items]);

  const addItem = (item: QuoteItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearQuote = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearQuote,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        audienceMode,
        setAudienceMode,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
