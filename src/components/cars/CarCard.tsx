import { Link } from 'react-router-dom'
import type { Car } from '../../types'

const fuelIcons: Record<string, string> = {
  Petrol: '⛽', Diesel: '🛢️', EV: '⚡', Hybrid: '🌿',
}

export function CarCard({ car, availability, sheetPrice, sheetName }: { car: Car; availability?: string; sheetPrice?: number; sheetName?: string }) {
  const statusText = availability?.trim() || 'Available'
  const isAvailable = statusText.toLowerCase() !== 'unavailable'
  const displayPrice = sheetPrice ?? car.pricePerDay
  const displayName = sheetName?.trim() || car.name

  return (
    <Link
      to={`/cars/${car.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-200"
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={car.images[0]}
          alt={car.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

        {/* Fuel badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {fuelIcons[car.fuel]} {car.fuel}
          </span>
        </div>

        {/* Availability */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${
            isAvailable
              ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
              : 'border-rose-400/40 bg-rose-500/20 text-rose-200'
          }`}>
            <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            {statusText}
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-base font-bold text-white drop-shadow">{displayName}</div>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {car.city}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-white drop-shadow">₹{displayPrice.toLocaleString('en-IN')}</div>
            <div className="text-xs text-slate-300">/ day</div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
            <svg className="size-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {car.seats} seats
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
            <svg className="size-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {car.transmission}
          </span>
          {car.mileage && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs text-orange-600">
              🛣️ {car.mileage}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Instant availability check</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:gap-2 transition-all">
              View details
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
