'use client'

import { useState, useRef } from 'react'

interface AddItemFormProps {
  guestName: string
  onAdd: (taskName: string) => Promise<void>
}

export default function AddItemForm({ guestName, onAdd }: AddItemFormProps) {
  const [taskName, setTaskName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = taskName.trim()
    if (!trimmed || isSubmitting) return

    setIsSubmitting(true)
    await onAdd(trimmed)
    setTaskName('')
    setIsSubmitting(false)
    inputRef.current?.focus()
  }

  const isDisabled = !guestName.trim()

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Add New Item
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder={
              isDisabled
                ? 'Enter your name above first…'
                : `What does ${guestName.trim()} need?`
            }
            disabled={isDisabled || isSubmitting}
            aria-label="New list item"
            className="flex-1 text-sm text-slate-700 placeholder-slate-300 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 transition"
          />
          <button
            type="submit"
            disabled={!taskName.trim() || isDisabled || isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 min-w-[64px]"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
