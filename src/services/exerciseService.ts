
import { supabase } from '@/integrations/supabase/client';
import { ExerciseEntry } from '@/types/models';

export const exerciseService = {
  async getExerciseEntries(userId: string, startDate?: string, endDate?: string): Promise<ExerciseEntry[]> {
    let query = supabase
      .from('exercise_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (startDate) {
      query = query.gte('date', startDate);
    }
    
    if (endDate) {
      query = query.lte('date', endDate);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching exercise entries:', error);
      throw error;
    }
    
    return data;
  },
  
  async createExerciseEntry(entry: Omit<ExerciseEntry, 'id' | 'created_at'>): Promise<ExerciseEntry> {
    const { data, error } = await supabase
      .from('exercise_entries')
      .insert(entry)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating exercise entry:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateExerciseEntry(id: string, entry: Partial<ExerciseEntry>): Promise<ExerciseEntry> {
    const { data, error } = await supabase
      .from('exercise_entries')
      .update(entry)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      console.error(`Error updating exercise entry with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async deleteExerciseEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('exercise_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting exercise entry with ID ${id}:`, error);
      throw error;
    }
  }
};
