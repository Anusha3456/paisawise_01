import { AccountAlias } from '../types/account.types';

export const MOCK_ACCOUNTS: AccountAlias[] = [
  {
    id: 'acc-1',
    name: 'Primary Salary Account',
    bankName: 'HDFC Bank',
    type: 'salary',
    balance: 28400,
    isManualTracked: true,
    color: '#1E3A8A',
    updatedAt: '2026-10-30T09:00:00.000Z',
  },
  {
    id: 'acc-2',
    name: 'Emergency Savings Fund',
    bankName: 'State Bank of India',
    type: 'savings',
    balance: 45000,
    isManualTracked: true,
    color: '#047857',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
  {
    id: 'acc-3',
    name: 'Daily UPI Pocket Wallet',
    bankName: 'Paytm / Cash Wallet',
    type: 'wallet',
    balance: 3200,
    isManualTracked: true,
    color: '#D97706',
    updatedAt: '2026-10-30T14:30:00.000Z',
  },
];

