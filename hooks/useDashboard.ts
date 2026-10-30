import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { DashboardData } from '../types/dashboard.types';

export const useDashboard = () => {
  const query = useQuery<DashboardData>({
    queryKey: ['dashboardSummary'],
    queryFn: () => dashboardService.getDashboardSummary(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};

