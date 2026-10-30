import apiClient from './api';
import { SalarySurvivalMetrics } from '../types/salary.types';
import { MOCK_DASHBOARD_DATA } from '../mocks/dashboard.mock';
import { getSalaryCycleDetails } from '../utils/date';

const USE_MOCKS = true;
let localMetrics: SalarySurvivalMetrics = { ...MOCK_DASHBOARD_DATA.metrics };

export const salaryService = {
  async getSalaryMetrics(): Promise<SalarySurvivalMetrics> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 200));
      return { ...localMetrics };
    }
    const response = await apiClient.get<SalarySurvivalMetrics>('/salary/metrics');
    return response.data;
  },

  async updateSalaryConfig(payload: {
    monthlySalary: number;
    payday: number;
    plannedSavings: number;
  }): Promise<SalarySurvivalMetrics> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 300));
      const cycleInfo = getSalaryCycleDetails(payload.payday);
      const flexibleBudget = payload.monthlySalary - localMetrics.totalCommitments - payload.plannedSavings;
      const remainingFlexibleBudget = Math.max(0, flexibleBudget - localMetrics.recordedFlexibleSpending);
      const recommendedDailyAllowance = Math.round(remainingFlexibleBudget / cycleInfo.daysRemaining);

      localMetrics = {
        ...localMetrics,
        monthlySalary: payload.monthlySalary,
        plannedSavings: payload.plannedSavings,
        flexibleBudget,
        remainingFlexibleBudget,
        daysRemainingInCycle: cycleInfo.daysRemaining,
        totalDaysInCycle: cycleInfo.totalDaysInCycle,
        recommendedDailyAllowance,
        cycleStartDate: cycleInfo.cycleStart,
        cycleEndDate: cycleInfo.cycleEnd,
        nextPaydayDate: cycleInfo.nextPaydayDate,
      };
      return { ...localMetrics };
    }

    const response = await apiClient.put<SalarySurvivalMetrics>('/salary/config', payload);
    return response.data;
  },
};

