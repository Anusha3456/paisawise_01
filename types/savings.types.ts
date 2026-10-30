export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'emergency' | 'vacation' | 'gadget' | 'gold' | 'other';
  icon: string;
  color: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface MicroSavingsSuggestion {
  id: string;
  title: string; // e.g. "Skipped ordering takeout tonight"
  amount: number; // e.g. 5, 10, 20, 50, 100
  reason: string;
  category: string;
  suggestedAt: string;
  isAccepted: boolean;
}

