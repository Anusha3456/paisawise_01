import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const profileSetupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  occupation: z.string().min(2, 'Occupation/Job title is required'),
  city: z.string().min(2, 'City is required'),
});

export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;

export const salarySetupSchema = z.object({
  monthlyTakeHome: z.number().min(1000, 'Salary must be at least ₹1,000'),
  payday: z.number().min(1).max(31, 'Payday must be between 1 and 31'),
  plannedSavings: z.number().min(0, 'Planned savings cannot be negative'),
});

export type SalarySetupFormData = z.infer<typeof salarySetupSchema>;

export const transactionSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  type: z.enum(['expense', 'income']),
  categoryId: z.string().min(1, 'Please select a category'),
  accountId: z.string().min(1, 'Please select an account'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const commitmentSchema = z.object({
  title: z.string().min(2, 'Commitment title is required (e.g. House Rent)'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  categoryId: z.string().min(1, 'Please select a category'),
  dueDateDay: z.number().min(1).max(31, 'Due date must be between 1 and 31'),
  frequency: z.enum(['monthly', 'quarterly', 'yearly']),
  accountId: z.string().min(1, 'Please select an account alias'),
  notes: z.string().optional(),
});

export type CommitmentFormData = z.infer<typeof commitmentSchema>;

export const accountSchema = z.object({
  name: z.string().min(2, 'Account alias is required (e.g. HDFC Salary)'),
  type: z.enum(['salary', 'savings', 'wallet', 'other']),
  balance: z.number().min(0, 'Initial balance cannot be negative'),
  bankName: z.string().optional(),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const savingsGoalSchema = z.object({
  title: z.string().min(2, 'Goal title is required (e.g. Emergency Fund)'),
  targetAmount: z.number().min(500, 'Target amount must be at least ₹500'),
  currentAmount: z.number().min(0, 'Initial saved amount cannot be negative'),
  targetDate: z.string().min(1, 'Target date is required'),
});

export type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;

