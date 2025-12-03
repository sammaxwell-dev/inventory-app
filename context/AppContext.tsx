import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { Product, InventorySession, InventoryRecord, Category } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  currentSession: InventorySession;
  addProduct: (product: Product) => void;
  updateInventoryRecord: (record: InventoryRecord) => void;
  finishSession: () => void;
  resetSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'auld_dub_products';
const STORAGE_KEY_SESSION = 'auld_dub_current_session';

export const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  // Load products from local storage or use initial
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  // Load active session or create new
  const [currentSession, setCurrentSession] = useState<InventorySession>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_SESSION);
    if (stored) return JSON.parse(stored);
    return {
      id: Date.now().toString(),
      startDate: Date.now(),
      records: {},
      status: 'active',
    };
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(currentSession));
  }, [currentSession]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateInventoryRecord = (record: InventoryRecord) => {
    setCurrentSession((prev) => ({
      ...prev,
      records: {
        ...prev.records,
        [record.productId]: record,
      },
    }));
  };

  const finishSession = () => {
    // In a real app, we would save this to a history array in localStorage
    alert('Inventory Session Completed! (Saved locally)');
    resetSession();
  };

  const resetSession = () => {
    setCurrentSession({
      id: Date.now().toString(),
      startDate: Date.now(),
      records: {},
      status: 'active',
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        currentSession,
        addProduct,
        updateInventoryRecord,
        finishSession,
        resetSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};