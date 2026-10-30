export interface SalarySurvivalMetrics {
  monthlySalary: number;
  totalCommitments: number; // Sum of fixed rent, EMIs, recurring bills
  plannedSavings: number; // Target monthly savings
  flexibleBudget: number; // monthlySalary - totalCommitments - plannedSavings
  recordedFlexibleSpending: number; // Spending recorded this cycle
  remainingFlexibleBudget: number; // flexibleBudget - recordedFlexibleSpending
  daysRemainingInCycle: number;
  totalDaysInCycle: number;
  recommendedDailyAllowance: number; // remainingFlexibleBudget / daysRemainingInCycle
  burnRateStatus: 'safe' | 'caution' | 'critical';
  projectedSurplusOrShortage: number; // positive = surplus, negative = shortfall
  cycleStartDate: string;
  cycleEndDate: string;
  nextPaydayDate: string;
  isEstimateOnly: true; // Frontend rule: Clearly indicate recommendation, not bank balance
}

