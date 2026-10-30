export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  accountId: string;
  date: string; // ISO date string
  notes?: string;
  isCommitmentPayment?: boolean;
  commitmentId?: string;
  createdAt: string;
}

export interface TransactionFilters {
  type?: 'all' | 'expense' | 'income';
  categoryId?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}

