
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendationService } from '@/services/recommendationService';
import { Recommendation } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';

export const useRecommendations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: recommendations = [], isLoading, error } = useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: () => user?.id ? recommendationService.getUserRecommendations(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const createRecommendation = useMutation({
    mutationFn: (data: Omit<Recommendation, 'id' | 'created_at'>) => recommendationService.createRecommendation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', user?.id] });
    },
  });

  const markAsRead = useMutation({
    mutationFn: (id: string) => recommendationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', user?.id] });
    },
  });

  const deleteRecommendation = useMutation({
    mutationFn: (id: string) => recommendationService.deleteRecommendation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', user?.id] });
    },
  });

  return {
    recommendations,
    isLoading,
    error,
    createRecommendation: createRecommendation.mutate,
    markAsRead: markAsRead.mutate,
    deleteRecommendation: deleteRecommendation.mutate,
  };
};
