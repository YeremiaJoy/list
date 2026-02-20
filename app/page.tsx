'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { GuestListItem } from '@/types'
import GuestNameHeader from '@/components/GuestNameHeader'
import AddItemForm from '@/components/AddItemForm'
import GuestList from '@/components/GuestList'

const LOCAL_STORAGE_KEY = 'guestList_guestName'

export default function HomePage() {
  const [guestName, setGuestName] = useState<string>('')
  const [items, setItems] = useState<GuestListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ── Hydrate guest name from localStorage (client only) ──────────────────
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''
    setGuestName(saved)
  }, [])

  // ── Persist guest name changes ───────────────────────────────────────────
  const handleNameChange = (name: string) => {
    setGuestName(name)
    localStorage.setItem(LOCAL_STORAGE_KEY, name)
  }

  // ── Fetch all list items (ordered oldest → newest) ───────────────────────
  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('guest_list')
      .select('*')
      .order('created_at', { ascending: true })

    if (fetchError) {
      setError('Could not load the list. Please try again.')
    } else {
      setItems((data as GuestListItem[]) ?? [])
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // ── CREATE ────────────────────────────────────────────────────────────────
  const handleAdd = async (taskName: string) => {
    const trimmedName = guestName.trim()
    if (!trimmedName) {
      alert('Please enter your name in the header before adding items.')
      return
    }

    const { error: insertError } = await supabase.from('guest_list').insert({
      task_name: taskName,
      author_name: trimmedName,
      is_completed: false,
    })

    if (insertError) {
      setError('Failed to add item. Please try again.')
      return
    }

    await fetchItems()
  }

  // ── TOGGLE ────────────────────────────────────────────────────────────────
  const handleToggle = async (id: string, current: boolean) => {
    const { error: updateError } = await supabase
      .from('guest_list')
      .update({ is_completed: !current })
      .eq('id', id)

    if (updateError) {
      setError('Failed to update item.')
      return
    }

    // Optimistic local update for snappy UI
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_completed: !current } : item))
    )
  }

  // ── EDIT ──────────────────────────────────────────────────────────────────
  const handleEdit = async (id: string, taskName: string) => {
    const { error: updateError } = await supabase
      .from('guest_list')
      .update({ task_name: taskName })
      .eq('id', id)

    if (updateError) {
      setError('Failed to update item.')
      return
    }

    // Optimistic local update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task_name: taskName } : item))
    )
  }

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase.from('guest_list').delete().eq('id', id)

    if (deleteError) {
      setError('Failed to delete item.')
      return
    }

    // Optimistic local update
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sticky name header */}
      <GuestNameHeader guestName={guestName} onNameChange={handleNameChange} />

      {/* Main content — offset by header height */}
      <main className="max-w-lg mx-auto px-4 pt-24 pb-12">
        {/* Add item form */}
        <AddItemForm guestName={guestName} onAdd={handleAdd} />

        {/* Error banner */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1">{error}</span>
            <button
              onClick={() => setError(null)}
              aria-label="Dismiss error"
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* The list */}
        <GuestList
          items={items}
          isLoading={isLoading}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}
