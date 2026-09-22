import { useState, useRef, useEffect } from 'react'

export type SortOptionId = 'newest' | 'highest' | 'oldest'

export interface SortOption {
  id: SortOptionId
  label: string
  icon: string
  desc: string
}

export const SORT_OPTIONS: SortOption[] = [
  { id: 'newest', label: 'Latest First', icon: '🕒', desc: 'Newest & live feedback first' },
  { id: 'highest', label: 'Highest Rated', icon: '⭐', desc: '5-Star reviews first' },
  { id: 'oldest', label: 'Oldest First', icon: '📅', desc: 'Earliest customer stories first' },
]

interface SortSelectProps {
  value: SortOptionId
  onChange: (value: SortOptionId) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = SORT_OPTIONS.find((o) => o.id === value) || SORT_OPTIONS[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleSelect(id: SortOptionId) {
    onChange(id)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold shadow-2xs transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md bg-orange-50/20 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
            : 'border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-orange-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750'
        }`}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-orange-100/80 dark:bg-orange-950/80 text-xs">
          {selectedOption.icon}
        </span>
        <span className="font-extrabold text-slate-900 dark:text-white">{selectedOption.label}</span>
        <svg
          className={`size-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-orange-600 dark:text-orange-400' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="animate-dropdown absolute right-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-2xl border border-orange-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5"
        >
          <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Sort Reviews By
          </div>
          <div className="space-y-1">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = opt.id === value
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.id)}
                  className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white font-bold shadow-xs'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800/80 hover:text-orange-700 dark:hover:text-orange-400'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-lg text-xs ${
                        isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold truncate leading-tight">{opt.label}</div>
                      <div
                        className={`text-[10px] truncate leading-tight mt-0.5 ${
                          isSelected ? 'text-orange-100 font-medium' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <svg className="size-4 shrink-0 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
