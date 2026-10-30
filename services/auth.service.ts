import apiClient, { TOKEN_STORAGE_KEY } from './api';
import * as SecureStore from 'expo-secure-store';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';
import { UserProfile } from '../types/user.types';

const USE_MOCKS = true; // Toggle when backend FastAPI is active

export const MOCK_USER: UserProfile = {
  id: 'usr-1',
  fullName: 'Rajesh Sharma',
  email: 'rajesh.sharma@example.com',
  phone: '9876543210',
  occupation: 'Software Engineer',
  city: 'Bengaluru',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  monthlySalary: 45000,
  payday: 1,
  plannedSavings: 3000,
  isOnboarded: true,
  preferences: {
    currency: 'INR',
    theme: 'light',
    notificationsEnabled: true,
    dailyAllowanceReminder: true,
    upcomingCommitmentAlerts: true,
  },
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 600)); // Simulate realistic network delay
      const mockTokens = {
        accessToken: 'mock-jwt-token-paisawise',
        refreshToken: 'mock-refresh-token',
        expiresIn: 86400,
      };
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, mockTokens.accessToken);
      return {
        user: { ...MOCK_USER, email: payload.email },
        tokens: mockTokens,
      };
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (response.data.tokens?.accessToken) {
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, response.data.tokens.accessToken);
    }
    return response.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 600));
      const mockTokens = {
        accessToken: 'mock-jwt-token-paisawise',
        refreshToken: 'mock-refresh-token',
        expiresIn: 86400,
      };
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, mockTokens.accessToken);
      return {
        user: {
          ...MOCK_USER,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          isOnboarded: false, // New users must go through onboarding
        },
        tokens: mockTokens,
      };
    }

    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    if (response.data.tokens?.accessToken) {
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, response.data.tokens.accessToken);
    }
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 500));
      return {
        success: true,
        message: `Password reset instructions sent to ${email}`,
      };
    }
    const response = await apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  async getCurrentUser(): Promise<UserProfile> {
    if (USE_MOCKS) {
      return MOCK_USER;
    }
    const response = await apiClient.get<UserProfile>('/users/me');
    return response.data;
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 400));
      Object.assign(MOCK_USER, updates);
      return { ...MOCK_USER };
    }
    const response = await apiClient.patch<UserProfile>('/users/me', updates);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
    } catch {
      // Ignore
    }
  },
};

