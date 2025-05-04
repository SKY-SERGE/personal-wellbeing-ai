
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/models';

export const profileService = {
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user || !user.user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user || !user.user) {
      throw new Error('Utilisateur non authentifié');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.user.id)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    return data;
  },
  
  async getUserRole(): Promise<string[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user || !user.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.user.id);
    
    if (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
    
    return data.map(r => r.role);
  },

  async getPatients(doctorId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('id', supabase
        .from('doctor_patients')
        .select('user_id_patient')
        .eq('user_id_doctor', doctorId)
      );
    
    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
    
    return data;
  }
};
