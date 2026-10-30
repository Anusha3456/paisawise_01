export interface UserPreferences {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  dailyAllowanceReminder: boolean;
  upcomingCommitmentAlerts: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  city: string;
  avatarUrl?: string;
  monthlySalary: number;
  payday: number; // 1 - 31
  plannedSavings: number;
  isOnboarded: boolean;
  preferences: UserPreferences;
  createdAt: string;
}

