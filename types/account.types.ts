export type AccountType = 'salary' | 'savings' | 'wallet' | 'other';

export interface AccountAlias {
  id: string;
  name: string; // e.g., 'Primary Salary A/C', 'Emergency Savings'
  type: AccountType;
  bankName?: string; // Optional label, e.g. 'HDFC Bank', 'ICICI Bank'
  balance: number; // Manually tracked balance
  isManualTracked: true; // Explicitly marked as manual tracking
  color?: string;
  updatedAt: string;
}

