import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Full Database type required by @supabase/supabase-js v2.x
export type Database = {
  public: {
    Tables: {
      guest_list: {
        Row: {
          id: string
          created_at: string
          task_name: string
          is_completed: boolean
          author_name: string
        }
        Insert: {
          id?: string
          created_at?: string
          task_name: string
          is_completed?: boolean
          author_name: string
        }
        Update: {
          id?: string
          created_at?: string
          task_name?: string
          is_completed?: boolean
          author_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
