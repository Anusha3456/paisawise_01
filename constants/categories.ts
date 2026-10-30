/**
 * PaisaWise Expense & Income Categories
 * Tailored for Indian salaried professionals
 */

export interface CategoryDefinition {
  id: string;
  name: string;
  type: 'expense' | 'income';
  icon: string; // Lucide icon key
  color: string;
  bgColor: string;
  isCommitmentEligible?: boolean;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'rent',
    name: 'Rent & Housing',
    type: 'expense',
    icon: 'Home',
    color: '#E11D48',
    bgColor: '#FFE4E6',
    isCommitmentEligible: true,
  },
  {
    id: 'emi',
    name: 'EMI & Loans',
    type: 'expense',
    icon: 'CreditCard',
    color: '#D97706',
    bgColor: '#FEF3C7',
    isCommitmentEligible: true,
  },
  {
    id: 'groceries',
    name: 'Groceries & Daily',
    type: 'expense',
    icon: 'ShoppingCart',
    color: '#059669',
    bgColor: '#D1FAE5',
  },
  {
    id: 'food',
    name: 'Food & Dining',
    type: 'expense',
    icon: 'Utensils',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  {
    id: 'utilities',
    name: 'Bills & Utilities',
    type: 'expense',
    icon: 'Zap',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    isCommitmentEligible: true,
  },
  {
    id: 'fuel',
    name: 'Fuel & Commute',
    type: 'expense',
    icon: 'Car',
    color: '#6366F1',
    bgColor: '#EEF2FF',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    type: 'expense',
    icon: 'ShoppingBag',
    color: '#9333EA',
    bgColor: '#F3E8FF',
  },
  {
    id: 'entertainment',
    name: 'Entertainment & OTT',
    type: 'expense',
    icon: 'Tv',
    color: '#DB2777',
    bgColor: '#FCE7F3',
    isCommitmentEligible: true,
  },
  {
    id: 'healthcare',
    name: 'Health & Medical',
    type: 'expense',
    icon: 'HeartPulse',
    color: '#DC2626',
    bgColor: '#FEE2E2',
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    type: 'expense',
    icon: 'Repeat',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    isCommitmentEligible: true,
  },
  {
    id: 'savings',
    name: 'Savings & SIP',
    type: 'expense',
    icon: 'PiggyBank',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    isCommitmentEligible: true,
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    type: 'expense',
    icon: 'MoreHorizontal',
    color: '#64748B',
    bgColor: '#F1F5F9',
  },
  {
    id: 'salary',
    name: 'Salary Credit',
    type: 'income',
    icon: 'Briefcase',
    color: '#16A34A',
    bgColor: '#DCFCE7',
  },
  {
    id: 'bonus',
    name: 'Bonus & Incentives',
    type: 'income',
    icon: 'Award',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: 'cashback',
    name: 'Cashback & Interest',
    type: 'income',
    icon: 'TrendingUp',
    color: '#0284C7',
    bgColor: '#E0F2FE',
  },
];

export const getCategoryById = (id: string): CategoryDefinition => {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
};

