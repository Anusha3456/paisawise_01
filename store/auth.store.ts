import { create } from 'zustand';
import { UserProfile } from '../types/user.types';
import { AuthTokens } from '../types/auth.types';
import { authService, MOCK_USER } from '../services/auth.service';

interface AuthStoreState {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setOnboarded: (isOnboarded: boolean) => void;
  login: (email: string, pass: string) => Promise<void>;
  register: (fullName: string, email: string, phone: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: MOCK_USER,
  tokens: {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresIn: 86400,
  },
  isAuthenticated: true, // Default to true with mock user for smooth initial navigation
  isOnboarded: true,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: !!user, isOnboarded: !!user?.isOnboarded }),
  
  setOnboarded: (isOnboarded) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, isOnboarded }, isOnboarded });
    } else {
      set({ isOnboarded });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await authService.login({ email, password });
      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isOnboarded: response.user.isOnboarded,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (fullName, email, phone, password) => {
    set({ isLoading: true });
    try {
      const response = await authService.register({ fullName, email, phone, password });
      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isOnboarded: false, // New registration needs onboarding
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await authService.logout();
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isOnboarded: false,
    });
  },

  updateUser: async (updates) => {
    const updated = await authService.updateUserProfile(updates);
    set({ user: updated });
  },
}));

