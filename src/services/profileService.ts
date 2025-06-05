
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
    
    return data as Profile;
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
    
    return data as Profile;
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
    
    // Extrait juste les valeurs de rôle du résultat et les renvoie comme un tableau de chaînes
    return data.map(r => r.role);
  },

  async getPatients(doctorId: string): Promise<Profile[]> {
    // Correction de l'erreur : d'abord exécuter la subquery pour obtenir les IDs des patients
    const { data: patientLinks, error: patientLinksError } = await supabase
      .from('doctor_patients')
      .select('user_id_patient')
      .eq('user_id_doctor', doctorId);
    
    if (patientLinksError) {
      console.error('Error fetching patient links:', patientLinksError);
      throw patientLinksError;
    }
    
    // Extraire les IDs des patients du résultat
    const patientIds = patientLinks.map(link => link.user_id_patient);
    
    // Si aucun patient n'est trouvé, renvoyer un tableau vide
    if (patientIds.length === 0) {
      return [];
    }
    
    // Utiliser les IDs des patients pour récupérer leurs profils
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('id', patientIds);
    
    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
    
    return data as Profile[];
  }
};
