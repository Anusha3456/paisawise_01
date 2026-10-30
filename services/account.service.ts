import apiClient from './api';
import { AccountAlias } from '../types/account.types';
import { MOCK_ACCOUNTS } from '../mocks/accounts.mock';

const USE_MOCKS = true;
let localAccounts = [...MOCK_ACCOUNTS];

export const accountService = {
  async getAccounts(): Promise<AccountAlias[]> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return [...localAccounts];
    }
    const response = await apiClient.get<AccountAlias[]>('/accounts');
    return response.data;
  },

  async addAccount(account: Omit<AccountAlias, 'id' | 'isManualTracked' | 'updatedAt'>): Promise<AccountAlias> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const newAcc: AccountAlias = {
        ...account,
        id: `acc-${Date.now()}`,
        isManualTracked: true,
        updatedAt: new Date().toISOString(),
      };
      localAccounts.push(newAcc);
      return newAcc;
    }
    const response = await apiClient.post<AccountAlias>('/accounts', account);
    return response.data;
  },

  async updateAccount(id: string, updates: Partial<AccountAlias>): Promise<AccountAlias> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const index = localAccounts.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Account not found');
      localAccounts[index] = {
        ...localAccounts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return localAccounts[index];
    }
    const response = await apiClient.put<AccountAlias>(`/accounts/${id}`, updates);
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      localAccounts = localAccounts.filter(a => a.id !== id);
      return;
    }
    await apiClient.delete(`/accounts/${id}`);
  },
};

