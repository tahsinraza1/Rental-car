import { useMemo, useState } from 'react'
import { CarCard } from '../components/cars/CarCard'
import { cars } from '../data/cars'

const transmissions = ['All', 'Manual', 'Automatic']
const fuels = ['All', 'Petrol', 'Diesel', 'EV', 'Hybrid']

export function CarsPage() {
  const [q, setQ] = useState('')
  const [transmission, setTransmission] = useState('All')
  const [fuel, setFuel] = useState('All')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc')

  const filtered = useMemo(() => {
    let result = [...cars]
    const s = q.trim().toLowerCase()
    if (s) result = result.filter((c) => c.name.toLowerCase().includes(s))
    if (transmission !== 'All') result = result.filter((c) => c.transmission === transmission)
    if (fuel !== 'All') result = result.filter((c) => c.fuel === fuel)
    if (sortBy === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay)
    else result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [q, transmission, fuel, sortBy])

  const hasFilters = q || transmission !== 'All' || fuel !== 'All'

  function clearFilters() {
    setQ('')
    setTransmission('All')
    setFuel('All')
    setSortBy('price-asc')
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 mb-3">
          Our Fleet
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">All Cars</h1>
            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} car{filtered.length !== 1 ? 's' : ''} available · Pick your dates on the car page
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-slate-600">Search</span>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition"
                />
              </div>
            </label>
          </div>

          {/* Transmission */}
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Transmission</span>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition"
            >
              {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          {/* Fuel */}
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Fuel Type</span>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition"
            >
              {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
        </div>

        {/* Sort + clear */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort by:</span>
            <div className="flex gap-1">
              {([
                { value: 'price-asc', label: 'Price ↑' },
                { value: 'price-desc', label: 'Price ↓' },
                { value: 'name', label: 'Name' },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    sortBy === opt.value
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
          <div className="text-4xl">🔍</div>
          <div className="text-lg font-bold text-slate-900">No cars found</div>
          <div className="text-sm text-slate-500">Try adjusting your filters or search term.</div>
          <button
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  )
}
