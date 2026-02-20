'use client'

import type { GuestListItem } from '@/types'
import GuestListItemComponent from './GuestListItem'

interface GuestListProps {
  items: GuestListItem[]
  isLoading: boolean
  onToggle: (id: string, current: boolean) => Promise<void>
  onEdit: (id: string, taskName: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

// ── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 rounded-full w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded-full w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="text-center py-20 select-none">
      <p className="text-5xl mb-4">🛒</p>
      <p className="text-slate-600 font-semibold text-base">No items yet</p>
      <p className="text-slate-400 text-sm mt-1">Be the first to add something to the list!</p>
    </div>
  )
}

// ── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
        {title} · {count}
      </p>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function GuestList({
  items,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
}: GuestListProps) {
  if (isLoading) return <Skeleton />
  if (items.length === 0) return <EmptyState />

  const pending = items.filter((i) => !i.is_completed)
  const completed = items.filter((i) => i.is_completed)

  const itemProps = { onToggle, onEdit, onDelete }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <Section title="Pending" count={pending.length}>
          {pending.map((item) => (
            <GuestListItemComponent key={item.id} item={item} {...itemProps} />
          ))}
        </Section>
      )}

      {completed.length > 0 && (
        <Section title="Completed" count={completed.length}>
          {completed.map((item) => (
            <GuestListItemComponent key={item.id} item={item} {...itemProps} />
          ))}
        </Section>
      )}
    </div>
  )
}
