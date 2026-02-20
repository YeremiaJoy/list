'use client'

interface GuestNameHeaderProps {
  guestName: string
  onNameChange: (name: string) => void
}

export default function GuestNameHeader({ guestName, onNameChange }: GuestNameHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* App icon */}
          <span className="text-2xl select-none" aria-hidden="true">
            📋
          </span>

          {/* Name input */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Your Name
            </p>
            <input
              type="text"
              value={guestName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter your name to get started…"
              aria-label="Your guest name"
              className="w-full text-sm font-medium text-slate-700 placeholder-slate-300 bg-transparent border-none outline-none truncate"
            />
          </div>

          {/* Avatar bubble */}
          {guestName.trim() && (
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0 select-none"
            >
              {guestName.trim()[0].toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
