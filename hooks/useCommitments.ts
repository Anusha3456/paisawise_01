import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commitmentService } from '../services/commitment.service';
import { FinancialCommitment } from '../types/commitment.types';

export const useCommitments = () => {
  const queryClient = useQueryClient();

  const query = useQuery<FinancialCommitment[]>({
    queryKey: ['commitments'],
    queryFn: () => commitmentService.getCommitments(),
  });

  const payMutation = useMutation({
    mutationFn: (id: string) => commitmentService.markAsPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commitments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
    },
  });

  const addMutation = useMutation({
    mutationFn: (newComm: Omit<FinancialCommitment, 'id' | 'isPaid' | 'status' | 'createdAt'>) =>
      commitmentService.addCommitment(newComm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commitments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => commitmentService.deleteCommitment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commitments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
    },
  });

  return {
    commitments: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    markAsPaid: payMutation.mutateAsync,
    isPaying: payMutation.isPending,
    addCommitment: addMutation.mutateAsync,
    isAdding: addMutation.isPending,
    deleteCommitment: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

