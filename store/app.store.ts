import { create } from 'zustand';

interface AppStoreState {
  isOffline: boolean;
  activeFilterCategory: string | null;
  activeTransactionType: 'all' | 'expense' | 'income';
  searchQuery: string;
  setFilterCategory: (categoryId: string | null) => void;
  setTransactionType: (type: 'all' | 'expense' | 'income') => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  isOffline: false,
  activeFilterCategory: null,
  activeTransactionType: 'all',
  searchQuery: '',
  
  setFilterCategory: (activeFilterCategory) => set({ activeFilterCategory }),
  setTransactionType: (activeTransactionType) => set({ activeTransactionType }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ activeFilterCategory: null, activeTransactionType: 'all', searchQuery: '' }),
}));

