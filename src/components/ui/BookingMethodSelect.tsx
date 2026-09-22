import { useState, useRef, useEffect } from 'react'

export interface BookingMethodOption {
  id: string
  label: string
  icon: string
  desc: string
}

export const BOOKING_METHODS: BookingMethodOption[] = [
  { id: 'WhatsApp', label: 'WhatsApp', icon: '💬', desc: 'Booked via WhatsApp chat' },
  { id: 'Phone Call', label: 'Phone Call', icon: '📞', desc: 'Spoke directly on call' },
  { id: 'Direct/Offline', label: 'Direct/Offline', icon: '🏢', desc: 'Visited office / In-person' },
  { id: 'Other', label: 'Other', icon: '🌐', desc: 'Online portal / Friend referral' },
]

interface BookingMethodSelectProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function BookingMethodSelect({
  value,
  onChange,
  label = 'How did you book with us?',
}: BookingMethodSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = BOOKING_METHODS.find((m) => m.id === value) || BOOKING_METHODS[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(id: string) {
    onChange(id)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Booking Channel</span>
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-2.5 rounded-xl border bg-white dark:bg-slate-900 px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-white shadow-2xs transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
            : 'border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-slate-50/50 dark:hover:bg-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/80 text-sm">
            {selectedOption.icon}
          </span>
          <div className="min-w-0">
            <span className="font-bold text-slate-900 dark:text-white truncate block">
              {selectedOption.label}
            </span>
          </div>
        </div>

        <svg
          className={`size-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 shrink-0 ${
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

      {/* Dropdown Options */}
      {isOpen && (
        <div className="animate-dropdown absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-orange-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1">
            {BOOKING_METHODS.map((method) => {
              const isSelected = method.id === value
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => handleSelect(method.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl p-2 text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-xs'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800/80 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-sm ${
                        isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {method.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{method.label}</div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-orange-100' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {method.desc}
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
