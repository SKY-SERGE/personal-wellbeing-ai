
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { Profile } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';

export const useProfileData = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => profileService.getCurrentProfile(),
    enabled: !!user,
  });

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ['roles', user?.id],
    queryFn: () => profileService.getUserRole(),
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: (profileData: Partial<Profile>) => profileService.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    roles,
    rolesLoading,
    isAdmin: roles.includes('admin'),
    isDoctor: roles.includes('doctor'),
    updateProfile: updateProfile.mutate,
    updateProfileLoading: updateProfile.isPending,
  };
};
