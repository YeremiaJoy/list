'use client'

import { useState } from 'react'
import type { GuestListItem } from '@/types'

interface GuestListItemProps {
  item: GuestListItem
  onToggle: (id: string, current: boolean) => Promise<void>
  onEdit: (id: string, taskName: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function GuestListItemComponent({
  item,
  onToggle,
  onEdit,
  onDelete,
}: GuestListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(item.task_name)
  const [isBusy, setIsBusy] = useState(false)

  const wrap = async (fn: () => Promise<void>) => {
    setIsBusy(true)
    await fn()
    setIsBusy(false)
  }

  const handleSaveEdit = () => {
    if (!editValue.trim()) return
    wrap(async () => {
      await onEdit(item.id, editValue.trim())
      setIsEditing(false)
    })
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditValue(item.task_name)
  }

  const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 ${
        item.is_completed ? 'border-slate-100 opacity-70' : 'border-slate-200'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* ── Checkbox ── */}
          <button
            onClick={() => wrap(() => onToggle(item.id, item.is_completed))}
            disabled={isBusy}
            aria-label={item.is_completed ? 'Mark incomplete' : 'Mark complete'}
            className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all active:scale-90 ${
              item.is_completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300 hover:border-blue-400'
            }`}
          >
            {item.is_completed && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                autoFocus
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit()
                  if (e.key === 'Escape') cancelEdit()
                }}
                className="w-full text-sm text-slate-700 bg-slate-50 border border-blue-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            ) : (
              <p
                className={`text-sm font-medium break-words transition-all ${
                  item.is_completed ? 'line-through text-slate-400' : 'text-slate-700'
                }`}
              >
                {item.task_name}
              </p>
            )}

            {/* Attribution row */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                aria-hidden="true"
                className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[9px] font-bold shrink-0"
              >
                {item.author_name[0]?.toUpperCase()}
              </span>
              <p className="text-xs text-slate-400 truncate">
                <span className="font-medium text-slate-500">{item.author_name}</span>
                &nbsp;·&nbsp;{formattedDate}
              </p>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex items-center gap-1 shrink-0 ml-1">
            {isEditing ? (
              <>
                {/* Save */}
                <button
                  onClick={handleSaveEdit}
                  disabled={isBusy || !editValue.trim()}
                  aria-label="Save edit"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all disabled:opacity-40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                {/* Cancel */}
                <button
                  onClick={cancelEdit}
                  aria-label="Cancel edit"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                {/* Edit */}
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isBusy}
                  aria-label="Edit item"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 active:scale-95 transition-all disabled:opacity-40"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {/* Delete */}
                <button
                  onClick={() => wrap(() => onDelete(item.id))}
                  disabled={isBusy}
                  aria-label="Delete item"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all disabled:opacity-40"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
