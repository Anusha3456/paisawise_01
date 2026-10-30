export type CommitmentFrequency = 'monthly' | 'quarterly' | 'yearly';
export type CommitmentStatus = 'upcoming' | 'paid' | 'overdue';

export interface FinancialCommitment {
  id: string;
  title: string; // e.g. "2BHK House Rent", "Car Loan EMI"
  categoryId: string; // 'rent', 'emi', 'utilities', 'subscriptions', etc.
  amount: number;
  dueDateDay: number; // Day of month: 1 - 31
  nextDueDate: string; // ISO date string
  frequency: CommitmentFrequency;
  accountId: string; // Associated manual account alias
  isPaid: boolean;
  status: CommitmentStatus;
  autoRemind: boolean;
  notes?: string;
  createdAt: string;
}

