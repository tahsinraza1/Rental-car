import { Link } from 'react-router-dom'
import type { Car } from '../../types'
import { isCarAvailable } from '../../lib/sheetAvailability'

export function CarCard({
  car,
  availability,
  sheetPrice,
  sheetName,
  isLoading,
}: {
  car: Car
  availability?: string
  sheetPrice?: number
  sheetName?: string
  isLoading?: boolean
}) {
  const statusText = availability?.trim() || 'Available'
  const isAvailable = isCarAvailable(statusText)
  const displayStatus = isAvailable ? 'AVAILABLE' : 'BOOKED'
  const displayPrice = sheetPrice ?? car.pricePerDay
  const displayName = sheetName?.trim() || car.name

  return (
    <div className="card-3d-wrap h-full">
      <Link
        to={`/cars/${car.id}`}
        className="card-3d-interactive group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300"
      >
        {/* Top subtle gloss sheen overlay on hover */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/0 to-white/30 dark:to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Photo Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={car.images[0]}
            alt={car.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.09]"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20 transition-transform duration-500 group-hover:-translate-y-0.5">
            {/* Fuel Type Badge */}
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10 shadow-xs">
              <span>⛽</span>
              <span>{car.fuel || 'Petrol'}</span>
            </div>

            {/* Live Status Pill */}
            {isLoading ? (
              <div className="skeleton h-6 w-20 rounded-full" />
            ) : (
              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md transition-all duration-300 ${
                  isAvailable
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-rose-600 text-white shadow-rose-600/35 ring-1 ring-rose-400/40'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isAvailable ? 'bg-white animate-pulse' : 'bg-rose-200 animate-ping'
                  }`}
                />
                <span>{displayStatus}</span>
              </div>
            )}
          </div>

          {/* Floating Rating Badge (Bottom Left) */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-amber-400 backdrop-blur-md border border-white/10 shadow-xs">
            <span>★</span>
            <span>{car.rating ? car.rating.toFixed(1) : '4.8'}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between gap-3.5 p-5">
          <div>
            {/* Title & Price */}
            <div className="flex items-start justify-between gap-2">
              <div>
                {isLoading ? (
                  <div className="skeleton h-6 w-32 rounded-md" />
                ) : (
                  <h3 className="font-display text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-accent truncate max-w-[180px]">
                    {displayName}
                  </h3>
                )}
                <div className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <svg className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{car.city || 'Delhi NCR'}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                {isLoading ? (
                  <div className="skeleton h-6 w-20 rounded-md" />
                ) : (
                  <>
                    <div className="font-display text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                      ₹{displayPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 -mt-0.5">/day</div>
                  </>
                )}
              </div>
            </div>

            {/* Micro Specs */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <svg className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span>{car.seats} Seats</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>Manual</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span>{car.mileage || '22.3 km/l'}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/40 group-hover:-translate-y-0.5 group-hover:brightness-110">
              <span>Book Now</span>
              <svg className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 transition duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">
              <span>View Details</span>
              <svg className="size-3 transition-transform duration-300 group-hover:translate-x-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
