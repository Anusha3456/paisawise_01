import { useAuthStore } from '../store/auth.store';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isOnboarded,
    isLoading,
    login,
    register,
    logout,
    setOnboarded,
    updateUser,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isOnboarded,
    isLoading,
    login,
    register,
    logout,
    setOnboarded,
    updateUser,
  };
};

