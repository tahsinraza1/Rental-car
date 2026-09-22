import { useState, useRef, useEffect, useMemo } from 'react'
import { cars } from '../../data/cars'

interface VehicleComboboxProps {
  value: string
  onChange: (carName: string) => void
  label?: string
  placeholder?: string
}

// Popular car options fallback list in case user booked an outstation fleet car
const ADDITIONAL_FLEET_MODELS = [
  { name: 'Toyota Innova Crysta', category: '7-Seater', seats: 7, fuel: 'Diesel', transmission: 'Manual' },
  { name: 'Hyundai Creta', category: 'SUV', seats: 5, fuel: 'Petrol', transmission: 'Automatic' },
  { name: 'Kia Seltos', category: 'SUV', seats: 5, fuel: 'Diesel', transmission: 'Automatic' },
  { name: 'Toyota Fortuner', category: 'SUV', seats: 7, fuel: 'Diesel', transmission: 'Automatic' },
]

export function VehicleCombobox({
  value,
  onChange,
  label = 'Car You Rented',
  placeholder = 'Select or search a car...',
}: VehicleComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Find currently selected car
  const selectedCarObj = cars.find((c) => c.name.toLowerCase() === value.toLowerCase())

  // Categories list
  const categories = [
    { id: 'all', label: 'All Fleet' },
    { id: 'suv', label: 'SUV / 4x4' },
    { id: 'hatchback', label: 'Hatchback' },
    { id: '7seater', label: '7-Seater' },
  ]

  // Filter cars based on search query and category
  const filteredCars = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return cars.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fuel.toLowerCase().includes(q) ||
        c.transmission.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)

      let matchesCat = true
      if (selectedCategory === 'suv') {
        matchesCat =
          c.name.toLowerCase().includes('thar') ||
          c.name.toLowerCase().includes('scorpio') ||
          c.name.toLowerCase().includes('safari') ||
          c.name.toLowerCase().includes('jimny') ||
          c.name.toLowerCase().includes('brezza') ||
          c.name.toLowerCase().includes('fronx') ||
          c.name.toLowerCase().includes('vitara')
      } else if (selectedCategory === 'hatchback') {
        matchesCat =
          c.name.toLowerCase().includes('glanza') ||
          c.name.toLowerCase().includes('baleno') ||
          c.name.toLowerCase().includes('swift') ||
          c.name.toLowerCase().includes('altroz') ||
          c.name.toLowerCase().includes('punch')
      } else if (selectedCategory === '7seater') {
        matchesCat = c.seats >= 7 || c.name.toLowerCase().includes('safari') || c.name.toLowerCase().includes('scorpio')
      }

      return matchesQuery && matchesCat
    })
  }, [searchQuery, selectedCategory])

  // Close on click outside & escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
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

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    } else {
      setSearchQuery('')
      setSelectedCategory('all')
    }
  }, [isOpen])

  function handleSelect(carName: string) {
    onChange(carName)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{label}</label>
          <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-md border border-orange-100 dark:border-orange-900/60">
            🔍 Searchable
          </span>
        </div>
      )}

      {/* ── TRIGGER BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`group flex w-full items-center justify-between gap-3 sm:gap-4 rounded-2xl border bg-white dark:bg-slate-900 p-3 sm:p-3.5 text-left transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'border-orange-500 ring-4 ring-orange-500/15 shadow-lg'
            : 'border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-md'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
          {/* Thumbnail preview */}
          {selectedCarObj?.images?.[0] ? (
            <img
              src={selectedCarObj.images[0]}
              alt={value}
              className="size-11 sm:size-12 rounded-xl object-cover border border-orange-200 dark:border-orange-800/60 shadow-xs shrink-0 transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950 dark:to-amber-950 text-xl border border-orange-200 dark:border-orange-800/60 shadow-xs">
              🚗
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {value || placeholder}
            </div>
            {selectedCarObj ? (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  👥 {selectedCarObj.seats} Seats
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  ⛽ {selectedCarObj.fuel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 dark:bg-orange-950/70 border border-orange-200/60 dark:border-orange-800/50 px-1.5 py-0.5 text-[11px] font-bold text-orange-600 dark:text-orange-400">
                  ₹{selectedCarObj.pricePerDay.toLocaleString('en-IN')}/day
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 dark:text-slate-500">Click to choose or search model from fleet</div>
            )}
          </div>
        </div>

        {/* Animated Chevron Badge */}
        <div
          className={`flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            isOpen
              ? 'bg-orange-500 text-white rotate-180 shadow-md shadow-orange-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-950/80 group-hover:text-orange-600 dark:group-hover:text-orange-400'
          }`}
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* ── CUSTOM SEARCHABLE DROPDOWN MENU ── */}
      {isOpen && (
        <div className="animate-dropdown absolute left-0 right-0 top-full z-50 mt-2 max-h-96 w-full min-w-full overflow-hidden rounded-2xl border-2 border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-2xl backdrop-blur-xl">
          {/* Search Box with Search Icon & Clear Button */}
          <div className="relative mb-2.5">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type car name to filter (e.g. Scorpio, Thar, Creta, Glanza)..."
              className="w-full rounded-xl border border-orange-200 dark:border-slate-700 bg-orange-50/40 dark:bg-slate-800 pl-10 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid size-5 place-items-center rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cars List with Thumbnails */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => {
                const isSelected = car.name.toLowerCase() === value.toLowerCase()
                return (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => handleSelect(car.name)}
                    className={`group/item flex w-full items-center justify-between gap-3 rounded-xl p-2.5 sm:p-3 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold shadow-md shadow-orange-500/20'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-orange-50/80 dark:hover:bg-slate-800/80 hover:text-orange-600 dark:hover:text-orange-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className={`size-11 sm:size-12 rounded-xl object-cover shrink-0 border transition-transform duration-200 group-hover/item:scale-105 ${
                          isSelected ? 'border-white/50 shadow-xs' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-black truncate">{car.name}</div>
                        <div
                          className={`text-[11px] flex flex-wrap items-center gap-1.5 mt-0.5 ${
                            isSelected ? 'text-orange-100 font-medium' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <span>{car.seats} Seats</span>
                          <span>•</span>
                          <span>{car.fuel}</span>
                          <span>•</span>
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span
                        className={`text-xs sm:text-sm font-black ${
                          isSelected ? 'text-white' : 'text-orange-600 dark:text-orange-400'
                        }`}
                      >
                        ₹{car.pricePerDay.toLocaleString('en-IN')}/d
                      </span>
                      {isSelected && (
                        <div className="flex size-5 items-center justify-center rounded-full bg-white text-orange-600">
                          <svg className="size-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="py-4 px-3 text-center">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">No standard car found for "{searchQuery}"</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Want to use this custom car name instead?</div>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery)}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-orange-600 cursor-pointer"
                >
                  <span>Use "{searchQuery}"</span>
                </button>
              </div>
            )}

            {/* Additional popular models fallback section if not matching search */}
            {searchQuery && !filteredCars.length && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  Or pick from popular models:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {ADDITIONAL_FLEET_MODELS.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => handleSelect(m.name)}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-400 transition cursor-pointer truncate"
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
