export interface GuestListItem {
  id: string
  created_at: string
  task_name: string
  is_completed: boolean
  author_name: string
}

export type NewGuestListItem = Omit<GuestListItem, 'id' | 'created_at'>
