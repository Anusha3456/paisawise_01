import apiClient from './api';
import { Transaction, TransactionFilters } from '../types/transaction.types';
import { MOCK_TRANSACTIONS } from '../mocks/transactions.mock';

const USE_MOCKS = true;
let localTransactions = [...MOCK_TRANSACTIONS];

export const transactionService = {
  async getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      let results = [...localTransactions];

      if (filters?.type && filters.type !== 'all') {
        results = results.filter(t => t.type === filters.type);
      }
      if (filters?.categoryId) {
        results = results.filter(t => t.categoryId === filters.categoryId);
      }
      if (filters?.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        results = results.filter(
          t => t.title.toLowerCase().includes(query) || (t.notes && t.notes.toLowerCase().includes(query))
        );
      }
      return results;
    }

    const response = await apiClient.get<Transaction[]>('/transactions', { params: filters });
    return response.data;
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return localTransactions.find(t => t.id === id) || null;
    }
    const response = await apiClient.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 400));
      const newTx: Transaction = {
        ...transaction,
        id: `tx-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      localTransactions = [newTx, ...localTransactions];
      return newTx;
    }
    const response = await apiClient.post<Transaction>('/transactions', transaction);
    return response.data;
  },

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const index = localTransactions.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Transaction not found');
      localTransactions[index] = { ...localTransactions[index], ...updates };
      return localTransactions[index];
    }
    const response = await apiClient.put<Transaction>(`/transactions/${id}`, updates);
    return response.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      localTransactions = localTransactions.filter(t => t.id !== id);
      return;
    }
    await apiClient.delete(`/transactions/${id}`);
  },
};

