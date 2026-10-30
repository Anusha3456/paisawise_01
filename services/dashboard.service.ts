import apiClient from './api';
import { DashboardData } from '../types/dashboard.types';
import { MOCK_DASHBOARD_DATA } from '../mocks/dashboard.mock';

const USE_MOCKS = true;

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardData> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 400));
      return { ...MOCK_DASHBOARD_DATA };
    }
    const response = await apiClient.get<DashboardData>('/dashboard/summary');
    return response.data;
  },
};

