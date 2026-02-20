import { createClient } from '@supabase/supabase-js'
import type { GuestListItem } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Typed Supabase database schema
export type Database = {
  public: {
    Tables: {
      guest_list: {
        Row: GuestListItem
        Insert: {
          task_name: string
          is_completed?: boolean
          author_name: string
        }
        Update: {
          task_name?: string
          is_completed?: boolean
        }
      }
    }
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
