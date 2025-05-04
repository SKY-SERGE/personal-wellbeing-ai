
import { supabase } from '@/integrations/supabase/client';
import { SleepEntry } from '@/types/models';

export const sleepService = {
  async getSleepEntries(userId: string, startDate?: string, endDate?: string): Promise<SleepEntry[]> {
    let query = supabase
      .from('sleep_entries')
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
      console.error('Error fetching sleep entries:', error);
      throw error;
    }
    
    return data;
  },
  
  async createSleepEntry(entry: Omit<SleepEntry, 'id' | 'created_at'>): Promise<SleepEntry> {
    const { data, error } = await supabase
      .from('sleep_entries')
      .insert(entry)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating sleep entry:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateSleepEntry(id: string, entry: Partial<SleepEntry>): Promise<SleepEntry> {
    const { data, error } = await supabase
      .from('sleep_entries')
      .update(entry)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      console.error(`Error updating sleep entry with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async deleteSleepEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('sleep_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting sleep entry with ID ${id}:`, error);
      throw error;
    }
  }
};
