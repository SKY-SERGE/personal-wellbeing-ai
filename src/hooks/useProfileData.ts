
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { Profile } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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

  const { data: patients = [], isLoading: patientsLoading } = useQuery({
    queryKey: ['patients', user?.id],
    queryFn: () => user && roles.includes('doctor') ? profileService.getPatients(user.id) : Promise.resolve([]),
    enabled: !!user && roles.includes('doctor'),
  });

  const updateProfile = useMutation({
    mutationFn: (profileData: Partial<Profile>) => profileService.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Profil mis à jour avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    }
  });

  return {
    profile,
    isLoading,
    error,
    roles,
    rolesLoading,
    patients,
    patientsLoading,
    isAdmin: roles.includes('admin'),
    isDoctor: roles.includes('doctor'),
    updateProfile: updateProfile.mutate,
    updateProfileLoading: updateProfile.isPending,
  };
};
