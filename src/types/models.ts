
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  birth_date: string | null;
  height: number | null;
  weight: number | null;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'user' | 'admin' | 'doctor';

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface DoctorPatient {
  id: string;
  user_id_doctor: string;
  user_id_patient: string;
  assigned_at: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Nutrient {
  id: string;
  name: string;
  unit: string | null;
}

export interface FoodNutrientValue {
  id: string;
  food_item_id: string;
  nutrient_id: string;
  value: number;
}

export interface NutritionEntry {
  id: string;
  user_id: string;
  meal_type: string;
  date: string;
  created_at: string;
}

export interface MealFoodItem {
  id: string;
  nutrition_entry_id: string;
  food_item_id: string;
  quantity: number;
  created_at: string;
}

export interface ExerciseEntry {
  id: string;
  user_id: string;
  activity_type: string;
  duration: number;
  intensity: string | null;
  calories_burned: number | null;
  date: string;
  created_at: string;
}

export interface SleepEntry {
  id: string;
  user_id: string;
  start_time: string | null;
  end_time: string | null;
  hours: number | null;
  quality: string;
  notes: string | null;
  date: string;
  created_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  assigned_by: string | null;
  category: string;
  content: string;
  priority: number | null;
  is_read: boolean | null;
  created_at: string;
}

export interface ChatConversation {
  id: string;
  user_id: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  content: string;
  is_user: boolean | null;
  created_at: string;
}
