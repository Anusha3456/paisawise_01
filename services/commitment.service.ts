import apiClient from './api';
import { FinancialCommitment } from '../types/commitment.types';
import { MOCK_COMMITMENTS } from '../mocks/commitments.mock';

const USE_MOCKS = true;
let localCommitments = [...MOCK_COMMITMENTS];

export const commitmentService = {
  async getCommitments(): Promise<FinancialCommitment[]> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return [...localCommitments];
    }
    const response = await apiClient.get<FinancialCommitment[]>('/commitments');
    return response.data;
  },

  async addCommitment(commitment: Omit<FinancialCommitment, 'id' | 'isPaid' | 'status' | 'createdAt'>): Promise<FinancialCommitment> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const newComm: FinancialCommitment = {
        ...commitment,
        id: `comm-${Date.now()}`,
        isPaid: false,
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      };
      localCommitments.push(newComm);
      return newComm;
    }
    const response = await apiClient.post<FinancialCommitment>('/commitments', commitment);
    return response.data;
  },

  async markAsPaid(id: string): Promise<FinancialCommitment> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      const index = localCommitments.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Commitment not found');
      localCommitments[index] = {
        ...localCommitments[index],
        isPaid: true,
        status: 'paid',
      };
      return localCommitments[index];
    }
    const response = await apiClient.patch<FinancialCommitment>(`/commitments/${id}/pay`);
    return response.data;
  },

  async deleteCommitment(id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      localCommitments = localCommitments.filter(c => c.id !== id);
      return;
    }
    await apiClient.delete(`/commitments/${id}`);
  },
};

