import { SalarySurvivalMetrics } from './salary.types';
import { FinancialCommitment } from './commitment.types';
import { Transaction } from './transaction.types';

export interface CategorySpendingSummary {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardData {
  userName: string;
  cyclePeriod: string;
  metrics: SalarySurvivalMetrics;
  categorySpending: CategorySpendingSummary[];
  upcomingCommitments: FinancialCommitment[];
  recentTransactions: Transaction[];
  coachTip: {
    title: string;
    message: string;
    actionLabel?: string;
  };
}

