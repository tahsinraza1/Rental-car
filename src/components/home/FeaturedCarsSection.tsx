import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { cars } from '../../data/cars'
import { lookupAvailability, lookupPrice, lookupSheetName, useSheetAvailability, isCarAvailable } from '../../lib/sheetAvailability'

type CategoryType = 'all' | 'muv' | 'suv' | 'sedan' | 'hatchback'

const categories = [
  { id: 'all' as const, label: 'All Cars', icon: '⊞' },
  { id: 'muv' as const, label: 'MUV', icon: '🚐' },
  { id: 'suv' as const, label: 'SUV', icon: '🚙' },
  { id: 'sedan' as const, label: 'Sedan', icon: '🚘' },
  { id: 'hatchback' as const, label: 'Hatchback', icon: '⚡' },
]

export function FeaturedCarsSection() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const { rows: sheetRows, loading: sheetLoading } = useSheetAvailability()

  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Measure window width for responsive card positioning
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter cars based on selected category
  const filteredCars = useMemo(() => {
    if (selectedCategory === 'muv') {
      return cars.filter((c) =>
        ['Safari', 'Scorpio', 'Innova'].some((name) => c.name.includes(name)),
      )
    }
    if (selectedCategory === 'suv') {
      return cars.filter((c) =>
        ['Thar', 'Scorpio', 'Safari', 'Brezza', 'Grand Vitara', 'Jimny'].some((name) =>
          c.name.includes(name),
        ),
      )
    }
    if (selectedCategory === 'sedan') {
      return cars.filter((c) =>
        ['Glanza', 'Baleno', 'Swift', 'Dzire'].some((name) => c.name.includes(name)),
      )
    }
    if (selectedCategory === 'hatchback') {
      return cars.filter((c) =>
        ['Glanza', 'Baleno', 'Fronx', 'Swift', 'Altroz', 'Punch'].some((name) =>
          c.name.includes(name),
        ),
      )
    }
    return cars
  }, [selectedCategory])

  const totalCars = filteredCars.length

  // Reset index when category changes
  function handleCategoryChange(cat: CategoryType) {
    setSelectedCategory(cat)
    setCurrentIndex(0)
  }

  // Next & Prev handlers (infinite circular wrapping)
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCars) % totalCars)
  }, [totalCars])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCars)
  }, [totalCars])

  // Touch handlers for mobile swipe
  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX)
  }

  function handleTouchMove(e: React.TouchEvent) {
    setTouchEndX(e.touches[0].clientX)
  }

  function handleTouchEnd() {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX
      if (diff > 40) {
        handleNext()
      } else if (diff < -40) {
        handlePrev()
      }
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  // Responsive step sizing for center-focus layout
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024
  const cardWidth = isMobile ? Math.floor(Math.min(windowWidth - 48, 320)) : isTablet ? 330 : 360
  const step = isMobile ? 270 : isTablet ? 340 : 380

  return (
    <section className="relative grid gap-7 py-3">
      {/* Header with Title & Filter Tabs */}
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          {/* Small Pill Tag */}
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-950/60 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            Our Handpicked Fleet
          </div>

          {/* Section Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Featured <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Cars</span>
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Slide to explore verified cars with direct WhatsApp availability & instant handover.
          </p>
        </div>

        {/* Right Controls: Category Tabs + Arrow Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-xs">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Header Navigation Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous car"
              className="grid size-9 place-items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-xs transition hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 active:scale-95 cursor-pointer"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next car"
              className="grid size-9 place-items-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30 transition hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── CENTER FOCUS STAGE ── */}
      <div
        className="featured-center-stage relative min-h-[490px] sm:min-h-[510px] md:min-h-[530px] w-full overflow-hidden rounded-3xl py-4 flex items-center justify-center select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Ambient Depth Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-20 bg-gradient-to-r from-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-20 bg-gradient-to-l from-transparent to-transparent" />

        {/* ◀ Left Floating Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous car (Slide Left)"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 grid size-11 sm:size-12 place-items-center rounded-full border border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40 backdrop-blur-md transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* ▶ Right Floating Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next car (Slide Right)"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 grid size-11 sm:size-12 place-items-center rounded-full border border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40 backdrop-blur-md transition-all duration-300 hover:border-orange-400 hover:text-orange-600 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* ── ALL CARDS WITH CENTER FOCUS PHYSICS ── */}
        {filteredCars.map((car, idx) => {
          // Wrapped difference calculation (-Math.floor(total/2) to +Math.floor(total/2))
          const rawDiff = (idx - currentIndex + totalCars) % totalCars
          const diff = rawDiff > totalCars / 2 ? rawDiff - totalCars : rawDiff
          const isCenter = diff === 0
          const absDiff = Math.abs(diff)

          // Center vs Side dynamics (Center = 1.0 for 100% sharp text rendering)
          const scale = isCenter ? 1 : absDiff === 1 ? 0.94 : 0.86
          const opacity = isCenter ? 1 : absDiff === 1 ? 0.75 : absDiff === 2 ? 0.35 : 0
          const zIndex = isCenter ? 30 : 20 - absDiff * 5
          const translateX = Math.round(diff * step)
          const isInteractive = absDiff <= 2

          const statusText = lookupAvailability(car.id, car.name, sheetRows)?.trim() || 'Available'
          const isAvailable = isCarAvailable(statusText)
          const displayStatus = isAvailable ? 'AVAILABLE' : 'BOOKED'
          const displayPrice = lookupPrice(car.id, car.name, sheetRows) ?? car.pricePerDay
          const displayName = lookupSheetName(car.id, car.name, sheetRows)?.trim() || car.name

          return (
            <div
              key={car.id}
              style={{
                width: `${cardWidth}px`,
                transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: isInteractive ? 'auto' : 'none',
              }}
              onClick={() => {
                if (!isCenter) {
                  setCurrentIndex(idx)
                }
              }}
              className={`featured-stage-card select-none rounded-[2rem] border bg-white dark:bg-slate-900 overflow-hidden ${
                isCenter
                  ? 'featured-center-active cursor-default'
                  : 'border-slate-200/85 dark:border-slate-800 shadow-md cursor-pointer hover:opacity-90'
              }`}
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="featured-img-subtle-scale h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                  {/* Fuel Type Badge */}
                  <div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/10 shadow-xs">
                    <span>⛽</span>
                    <span>{car.fuel || 'Petrol'}</span>
                  </div>

                  {/* Live Status Pill */}
                  {sheetLoading ? (
                    <div className="skeleton h-6 w-20 rounded-full" />
                  ) : (
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md transition-all duration-300 ${
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

                {/* Floating Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-xs font-bold text-amber-400 backdrop-blur-md border border-white/10 shadow-xs">
                  <span>★</span>
                  <span>{car.rating ? car.rating.toFixed(1) : '4.8'}</span>
                </div>

                {/* Center Focused Indicator Tag */}
                {isCenter && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-orange-500/90 px-2.5 py-0.5 text-[10px] font-extrabold text-white backdrop-blur-md shadow-xs animate-fade-in-up">
                    <span>✦ Active Focus</span>
                  </div>
                )}
              </div>

              {/* Card Body with Razor-Sharp Typography */}
              <div className="featured-content-stagger flex flex-col justify-between gap-3.5 p-5">
                <div>
                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {sheetLoading ? (
                        <div className="skeleton h-6 w-32 rounded-md" />
                      ) : (
                        <h3 className={`font-display text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300 truncate max-w-[170px] sm:max-w-[190px] ${
                          isCenter ? 'text-orange-600 dark:text-orange-400' : ''
                        }`}>
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
                      {sheetLoading ? (
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
                  <Link
                    to={`/cars/${car.id}`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all duration-300 ${
                      isCenter
                        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-md shadow-orange-500/30 hover:brightness-110 hover:scale-105'
                        : 'bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 shadow-xs'
                    }`}
                  >
                    <span>Book Now</span>
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <Link
                    to={`/cars/${car.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 transition duration-300 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <span>View Details</span>
                    <svg className="size-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── DOT PROGRESS INDICATORS & VIEW ALL BUTTON ── */}
      <div className="flex flex-col items-center justify-center gap-5 pt-1">
        {totalCars > 1 && (
          <div className="flex items-center gap-2">
            {filteredCars.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to car ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 shadow-xs shadow-orange-500/40'
                    : 'size-2 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/cars')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-800 hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 px-6 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs transition duration-300 active:scale-95 cursor-pointer"
        >
          <span>View All 14 Cars in Fleet</span>
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
