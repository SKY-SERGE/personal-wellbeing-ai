
import { supabase } from '@/integrations/supabase/client';
import { Recommendation } from '@/types/models';

export const recommendationService = {
  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
    
    return data;
  },
  
  async createRecommendation(recommendation: Omit<Recommendation, 'id' | 'created_at'>): Promise<Recommendation> {
    const { data, error } = await supabase
      .from('recommendations')
      .insert(recommendation)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating recommendation:', error);
      throw error;
    }
    
    return data;
  },
  
  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('recommendations')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) {
      console.error(`Error marking recommendation ${id} as read:`, error);
      throw error;
    }
  },
  
  async deleteRecommendation(id: string): Promise<void> {
    const { error } = await supabase
      .from('recommendations')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting recommendation ${id}:`, error);
      throw error;
    }
  }
};
