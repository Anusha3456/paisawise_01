import apiClient from './api';
import { SavingsGoal, MicroSavingsSuggestion } from '../types/savings.types';
import { MOCK_SAVINGS_GOALS, MOCK_SAVINGS_SUGGESTIONS } from '../mocks/savings.mock';

const USE_MOCKS = true;
let localGoals = [...MOCK_SAVINGS_GOALS];
let localSuggestions = [...MOCK_SAVINGS_SUGGESTIONS];

export const savingsService = {
  async getGoals(): Promise<SavingsGoal[]> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return [...localGoals];
    }
    const response = await apiClient.get<SavingsGoal[]>('/savings/goals');
    return response.data;
  },

  async addGoal(goal: Omit<SavingsGoal, 'id' | 'isCompleted' | 'createdAt'>): Promise<SavingsGoal> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const newGoal: SavingsGoal = {
        ...goal,
        id: `goal-${Date.now()}`,
        isCompleted: goal.currentAmount >= goal.targetAmount,
        createdAt: new Date().toISOString(),
      };
      localGoals.push(newGoal);
      return newGoal;
    }
    const response = await apiClient.post<SavingsGoal>('/savings/goals', goal);
    return response.data;
  },

  async depositToGoal(id: string, amount: number): Promise<SavingsGoal> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      const index = localGoals.findIndex(g => g.id === id);
      if (index === -1) throw new Error('Goal not found');
      const updatedAmount = localGoals[index].currentAmount + amount;
      localGoals[index] = {
        ...localGoals[index],
        currentAmount: updatedAmount,
        isCompleted: updatedAmount >= localGoals[index].targetAmount,
      };
      return localGoals[index];
    }
    const response = await apiClient.post<SavingsGoal>(`/savings/goals/${id}/deposit`, { amount });
    return response.data;
  },

  async getMicroSuggestions(): Promise<MicroSavingsSuggestion[]> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return [...localSuggestions];
    }
    const response = await apiClient.get<MicroSavingsSuggestion[]>('/savings/suggestions');
    return response.data;
  },

  async acceptMicroSuggestion(id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      const suggestion = localSuggestions.find(s => s.id === id);
      if (suggestion) {
        suggestion.isAccepted = true;
      }
      return;
    }
    await apiClient.post(`/savings/suggestions/${id}/accept`);
  },
};

