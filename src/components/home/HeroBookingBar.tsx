import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, addDays } from 'date-fns'

const LOCATIONS = [
  'Jasola Vihar / Shaheen Bagh (Central Hub)',
  'South Delhi (Saket / GK / Hauz Khas)',
  'Noida Sectors (18 / 62 / Central)',
  'Delhi IGI Airport (T1 / T3 Express)',
  'Doorstep Delivery (All Delhi NCR)',
]

export function HeroBookingBar() {
  const navigate = useNavigate()
  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const [location, setLocation] = useState(LOCATIONS[0])
  const [pickupDate, setPickupDate] = useState(todayStr)
  const [pickupTime, setPickupTime] = useState('10:00')
  const [returnDate, setReturnDate] = useState(tomorrowStr)
  const [returnTime, setReturnTime] = useState('10:00')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/cars?pickup=${pickupDate}&return=${returnDate}&loc=${encodeURIComponent(location)}`)
  }

  return (
    <div className="relative z-20 mx-auto -mt-10 w-full max-w-5xl px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40 backdrop-blur-md md:p-5 transition-colors duration-300"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          
          {/* Location */}
          <div className="flex flex-col justify-center rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-3 transition focus-within:border-accent focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-accent/20">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Pickup & Drop Hub
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="dark:bg-slate-900 dark:text-white">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date & Time */}
          <div className="flex flex-col justify-center rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-3 transition focus-within:border-accent focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-accent/20">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Pickup Date & Time
            </label>
            <div className="mt-1 flex items-center gap-1.5">
              <input
                type="date"
                value={pickupDate}
                min={todayStr}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
              />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-20 bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col justify-center rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-3 transition focus-within:border-accent focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-accent/20">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Return Date & Time
            </label>
            <div className="mt-1 flex items-center gap-1.5">
              <input
                type="date"
                value={returnDate}
                min={pickupDate || todayStr}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
              />
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-20 bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-bold text-white shadow-lg shadow-accent/25 transition duration-300 hover:bg-accent-dark active:scale-[0.98] cursor-pointer"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Find Available Cars
            </button>
          </div>

        </div>

        {/* Micro Guarantee Badges */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-2.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>₹0 Advance Payment Online</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span>⚡ Unlimited Kilometers Included</span>
          </div>
          <div className="flex items-center gap-1.5 text-accent">
            <span>🛡️ Direct WhatsApp with Owner</span>
          </div>
        </div>
      </form>
    </div>
  )
}
