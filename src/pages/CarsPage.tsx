import { useMemo, useState } from 'react'
import { CarCard } from '../components/cars/CarCard'
import { cars } from '../data/cars'
import { lookupAvailability, lookupPrice, lookupSheetName, useSheetAvailability } from '../lib/sheetAvailability'

const availabilities = ['All', 'Available', 'Unavailable']

export function CarsPage() {
  const [q, setQ] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('All')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc')
  const { rows: sheetRows, loading: sheetLoading } = useSheetAvailability()

  const filtered = useMemo(() => {
    let result = [...cars]
    const s = q.trim().toLowerCase()
    if (s) result = result.filter((c) => c.name.toLowerCase().includes(s))
    if (availabilityFilter !== 'All') {
      const isFilterAvailable = availabilityFilter === 'Available'
      result = result.filter((c) => {
        const status = sheetLoading ? 'Available' : lookupAvailability(c.id, c.name, sheetRows)
        const isCarAvailable = status.trim().toLowerCase() !== 'unavailable'
        return isFilterAvailable ? isCarAvailable : !isCarAvailable
      })
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay)
    else result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [q, availabilityFilter, sortBy, sheetRows, sheetLoading])

  const hasFilters = q !== '' || availabilityFilter !== 'All' || sortBy !== 'price-asc'

  function clearFilters() {
    setQ('')
    setAvailabilityFilter('All')
    setSortBy('price-asc')
  }

  return (
    <div className="grid gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            Delhi & Noida Fleet
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Explore All <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Vehicles</span>
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available · Clean cars, zero hidden fees & live WhatsApp booking
          </p>
        </div>
      </div>

      {/* Sticky Filter & Search Control Bar */}
      <div className="sticky top-[52px] z-30 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-md shadow-slate-200/50 dark:shadow-slate-950/50 backdrop-blur-xl md:p-4 transition-colors duration-300">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative min-w-0 flex-1">
            <svg
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by car name (e.g. Thar, Scorpio, Creta)..."
              className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 pl-10 pr-9 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-accent focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {q && (
              <button
                onClick={() => setQ('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Availability Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {availabilities.map((a) => (
              <button
                key={a}
                onClick={() => setAvailabilityFilter(a)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition duration-300 ${
                  availabilityFilter === a
                    ? 'bg-accent text-white shadow-md shadow-accent/25'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-accent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Sort Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 lg:ml-auto">
            {([
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'name', label: 'Name A–Z' },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition duration-300 ${
                  sortBy === opt.value
                    ? 'bg-accent text-white shadow-md shadow-accent/25'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-accent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-accent hover:text-accent-dark transition underline underline-offset-2 ml-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Car Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-20 text-center shadow-xs">
          <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">No Vehicles Match Your Search</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Try clearing your search query or selecting "All" availability.</div>
          <button
            onClick={clearFilters}
            className="mt-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-900 dark:text-white transition hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-3">
          {filtered.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isLoading={sheetLoading}
              availability={sheetLoading ? undefined : lookupAvailability(car.id, car.name, sheetRows)}
              sheetPrice={sheetLoading ? undefined : lookupPrice(car.id, car.name, sheetRows)}
              sheetName={sheetLoading ? undefined : lookupSheetName(car.id, car.name, sheetRows)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
