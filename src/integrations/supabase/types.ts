export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_user: boolean | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_user?: boolean | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_user?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_patients: {
        Row: {
          assigned_at: string
          id: string
          user_id_doctor: string
          user_id_patient: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          user_id_doctor: string
          user_id_patient: string
        }
        Update: {
          assigned_at?: string
          id?: string
          user_id_doctor?: string
          user_id_patient?: string
        }
        Relationships: []
      }
      exercise_entries: {
        Row: {
          activity_type: string
          calories_burned: number | null
          created_at: string
          date: string
          duration: number
          id: string
          intensity: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          calories_burned?: number | null
          created_at?: string
          date?: string
          duration: number
          id?: string
          intensity?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          calories_burned?: number | null
          created_at?: string
          date?: string
          duration?: number
          id?: string
          intensity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      food_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      food_nutrient_values: {
        Row: {
          food_item_id: string
          id: string
          nutrient_id: string
          value: number
        }
        Insert: {
          food_item_id: string
          id?: string
          nutrient_id: string
          value: number
        }
        Update: {
          food_item_id?: string
          id?: string
          nutrient_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "food_nutrient_values_food_item_id_fkey"
            columns: ["food_item_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_nutrient_values_nutrient_id_fkey"
            columns: ["nutrient_id"]
            isOneToOne: false
            referencedRelation: "nutrients"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_food_items: {
        Row: {
          created_at: string
          food_item_id: string
          id: string
          nutrition_entry_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          food_item_id: string
          id?: string
          nutrition_entry_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          food_item_id?: string
          id?: string
          nutrition_entry_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_food_items_food_item_id_fkey"
            columns: ["food_item_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_food_items_nutrition_entry_id_fkey"
            columns: ["nutrition_entry_id"]
            isOneToOne: false
            referencedRelation: "nutrition_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrients: {
        Row: {
          id: string
          name: string
          unit: string | null
        }
        Insert: {
          id?: string
          name: string
          unit?: string | null
        }
        Update: {
          id?: string
          name?: string
          unit?: string | null
        }
        Relationships: []
      }
      nutrition_entries: {
        Row: {
          created_at: string
          date: string
          id: string
          meal_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          meal_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meal_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string
          first_name: string | null
          gender: string | null
          height: number | null
          id: string
          last_name: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          gender?: string | null
          height?: number | null
          id: string
          last_name?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          assigned_by: string | null
          category: string
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          priority: number | null
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          priority?: number | null
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          priority?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sleep_entries: {
        Row: {
          created_at: string
          date: string
          end_time: string | null
          hours: number | null
          id: string
          notes: string | null
          quality: string
          start_time: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          end_time?: string | null
          hours?: number | null
          id?: string
          notes?: string | null
          quality: string
          start_time?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          end_time?: string | null
          hours?: number | null
          id?: string
          notes?: string | null
          quality?: string
          start_time?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_patient_of_doctor: {
        Args: { _patient_user_id: string; _doctor_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "admin" | "doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "admin", "doctor"],
    },
  },
} as const
