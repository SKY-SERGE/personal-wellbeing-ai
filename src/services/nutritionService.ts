
import { supabase } from '@/integrations/supabase/client';
import { FoodItem, NutritionEntry, MealFoodItem, Nutrient, FoodNutrientValue } from '@/types/models';

export const nutritionService = {
  // Food Items
  async getAllFoodItems(): Promise<FoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
    
    return data;
  },
  
  async getFoodItemById(id: string): Promise<FoodItem> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching food item with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async createFoodItem(foodItem: Omit<FoodItem, 'id' | 'created_at'>): Promise<FoodItem> {
    const { data, error } = await supabase
      .from('food_items')
      .insert(foodItem)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating food item:', error);
      throw error;
    }
    
    return data;
  },

  // Nutrients
  async getAllNutrients(): Promise<Nutrient[]> {
    const { data, error } = await supabase
      .from('nutrients')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching nutrients:', error);
      throw error;
    }
    
    return data;
  },

  // Nutrition Entries
  async getNutritionEntries(userId: string, startDate?: string, endDate?: string): Promise<NutritionEntry[]> {
    let query = supabase
      .from('nutrition_entries')
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
      console.error('Error fetching nutrition entries:', error);
      throw error;
    }
    
    return data;
  },
  
  async createNutritionEntry(entry: Omit<NutritionEntry, 'id' | 'created_at'>): Promise<NutritionEntry> {
    const { data, error } = await supabase
      .from('nutrition_entries')
      .insert(entry)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating nutrition entry:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateNutritionEntry(id: string, entry: Partial<NutritionEntry>): Promise<NutritionEntry> {
    const { data, error } = await supabase
      .from('nutrition_entries')
      .update(entry)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      console.error(`Error updating nutrition entry with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async deleteNutritionEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('nutrition_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting nutrition entry with ID ${id}:`, error);
      throw error;
    }
  },

  // Meal Food Items
  async getMealFoodItems(nutritionEntryId: string): Promise<MealFoodItem[]> {
    const { data, error } = await supabase
      .from('meal_food_items')
      .select('*, food_items(*)')
      .eq('nutrition_entry_id', nutritionEntryId);
    
    if (error) {
      console.error(`Error fetching meal food items for nutrition entry ${nutritionEntryId}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async addMealFoodItem(item: Omit<MealFoodItem, 'id' | 'created_at'>): Promise<MealFoodItem> {
    const { data, error } = await supabase
      .from('meal_food_items')
      .insert(item)
      .select('*')
      .single();
    
    if (error) {
      console.error('Error adding meal food item:', error);
      throw error;
    }
    
    return data;
  },
  
  async updateMealFoodItem(id: string, item: Partial<MealFoodItem>): Promise<MealFoodItem> {
    const { data, error } = await supabase
      .from('meal_food_items')
      .update(item)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) {
      console.error(`Error updating meal food item with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async deleteMealFoodItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('meal_food_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting meal food item with ID ${id}:`, error);
      throw error;
    }
  },

  // Food Nutrient Values
  async getFoodNutrientValues(foodItemId: string): Promise<FoodNutrientValue[]> {
    const { data, error } = await supabase
      .from('food_nutrient_values')
      .select('*, nutrients(*)')
      .eq('food_item_id', foodItemId);
    
    if (error) {
      console.error(`Error fetching nutrient values for food item ${foodItemId}:`, error);
      throw error;
    }
    
    return data;
  }
};
