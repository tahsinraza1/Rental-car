import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BookingCard } from '../components/booking/BookingCard'
import { cars, getCarById } from '../data/cars'
import { lookupAvailability, lookupPrice, lookupSheetName, useSheetAvailability, isCarAvailable } from '../lib/sheetAvailability'
import { OWNER_PHONE_E164, OWNER_WHATSAPP_NUMBER } from '../config'

export function CarDetailPage() {
  const { carId } = useParams()
  const car = carId ? getCarById(carId) : undefined
  const [search] = useSearchParams()
  const [activeImg, setActiveImg] = useState(0)
  const { rows: sheetRows, loading: sheetLoading } = useSheetAvailability()
  const sheetName = sheetLoading ? undefined : lookupSheetName(car?.id ?? '', car?.name ?? '', sheetRows)
  const sheetPrice = sheetLoading ? undefined : lookupPrice(car?.id ?? '', car?.name ?? '', sheetRows)
  const displayName = sheetName?.trim() || car?.name

  const initial = useMemo(() => ({
    pickup: search.get('pickup') ?? '',
    ret: search.get('return') ?? '',
  }), [search])

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-20 text-center shadow-xl">
        <div className="font-heading text-3xl font-black text-slate-900 dark:text-white">Car Not Found</div>
        <p className="text-sm text-slate-500 dark:text-slate-400">The car you are looking for is currently not available in our fleet.</p>
        <Link
          to="/cars"
          className="mt-2 inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition duration-300 hover:brightness-110"
        >
          Back to All Cars
        </Link>
      </div>
    )
  }

  const rawStatus = sheetLoading ? 'Available' : lookupAvailability(car.id, car.name, sheetRows)
  const isAvailable = isCarAvailable(rawStatus)
  const displayStatus = isAvailable ? 'Available for Instant Booking' : 'Currently Booked'
  const displayPrice = sheetPrice ?? car.pricePerDay
  const similarCars = cars.filter((c) => c.id !== car.id).slice(0, 3)

  const specList = [
    {
      label: 'Fuel Type',
      value: car.fuel,
      glow: 'from-emerald-400 to-teal-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      ),
    },
    {
      label: 'Transmission',
      value: '6-Speed Manual',
      glow: 'from-amber-400 to-orange-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      ),
    },
    {
      label: 'Seating Capacity',
      value: `${car.seats} Passengers`,
      glow: 'from-sky-400 to-blue-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      label: 'Location Hub',
      value: car.city,
      glow: 'from-rose-400 to-pink-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    ...(car.mileage ? [{
      label: 'Fuel Mileage',
      value: car.mileage,
      glow: 'from-teal-400 to-cyan-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    }] : []),
    ...(car.engineCC ? [{
      label: 'Engine Power',
      value: car.engineCC,
      glow: 'from-purple-400 to-violet-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.32l-3.27 3.27-2.956-.739-.739-2.956 3.27-3.27a4.5 4.5 0 00-6.32 4.486c.048.58.024 1.193-.14 1.743l-6.837 5.63" />
        </svg>
      ),
    }] : []),
    {
      label: 'Kilometers',
      value: 'Unlimited Included',
      glow: 'from-orange-400 to-amber-600',
      icon: (
        <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid gap-6 md:gap-8">
      {/* ── BREADCRUMB CAPSULE ── */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Link to="/" className="transition hover:text-orange-600 dark:hover:text-orange-400">Home</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <Link to="/cars" className="transition hover:text-orange-600 dark:hover:text-orange-400">Browse Cars</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-200/80 dark:border-orange-800/60">
          {displayName}
        </span>
      </nav>

      {/* ── MAIN GRID (DETAILS + BOOKING CARD) ── */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left Column: Details */}
        <div className="grid gap-6 lg:col-span-7">

          {/* ── HIGH-DEFINITION LUXURY GALLERY ── */}
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 sm:p-3.5 shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 group border border-slate-100 dark:border-slate-800">
              <img
                src={car.images[activeImg]}
                alt={car.name}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/20 pointer-events-none" />

              {/* Live Status Badge */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <div
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-md backdrop-blur-md transition-all duration-300 ${
                    isAvailable
                      ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                      : 'bg-rose-600 text-white shadow-rose-600/35 ring-1 ring-rose-400/40'
                  }`}
                >
                  <span
                    className={`inline-block size-2 rounded-full ${
                      isAvailable ? 'bg-white animate-pulse' : 'bg-rose-200 animate-ping'
                    }`}
                  />
                  <span>{displayStatus}</span>
                </div>
              </div>

              {/* Bottom Feature Badges on Photo */}
              <div className="absolute bottom-3.5 left-3.5 z-10 hidden sm:flex items-center gap-2">
                <span className="rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-slate-700 px-3 py-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-md">
                  ⚡ 0% Advance Online
                </span>
                <span className="rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-slate-700 px-3 py-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-md">
                  ✨ Clean & Sanitized Fleet
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Bar */}
            {car.images.length > 1 && (
              <div className="mt-2.5 flex items-center gap-2.5 overflow-x-auto p-1">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      activeImg === i
                        ? 'border-orange-500 ring-2 ring-orange-500/40 opacity-100 scale-105 shadow-md shadow-orange-500/25'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-70 hover:opacity-100 hover:border-orange-300 dark:hover:border-orange-500'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── VEHICLE IDENTITY & RADIANT PRICE BANNER ── */}
          <div className="rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200/90 dark:border-orange-800/60 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 mb-2.5 shadow-2xs">
                  <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>{car.city} · Self Drive Fleet</span>
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  {displayName}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {car.seats} Passenger Seater · 6-Speed Manual · {car.fuel} Engine
                </p>
              </div>

              {/* Highlighted Price Card */}
              <div className="rounded-2xl border border-orange-200/80 dark:border-orange-900/50 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-orange-950/40 dark:via-slate-900 dark:to-rose-950/30 p-4 sm:p-5 text-right shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Daily Self-Drive</div>
                <div className="font-heading text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  ₹{displayPrice.toLocaleString('en-IN')}
                  <span className="ml-1 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">/ day</span>
                </div>
                <div className="mt-1 flex items-center justify-end gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>✓</span>
                  <span>Unlimited Kilometers Included</span>
                </div>
              </div>
            </div>

            {/* ── 3D SPECIFICATIONS MATRIX ── */}
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Vehicle Specifications
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specList.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 p-3.5 transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-slate-800 hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{spec.label}</span>
                      <div className={`flex size-7 items-center justify-center rounded-lg bg-gradient-to-br ${spec.glow} shadow-2xs`}>
                        {spec.icon}
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-black text-slate-900 dark:text-white tracking-tight">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ABOUT VEHICLE ── */}
          {car.description && (
            <div className="rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </span>
                <h2 className="font-heading text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  About This Car
                </h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">{car.description}</p>
            </div>
          )}

          {/* ── KEY FEATURES & TECH ── */}
          {car.features && car.features.length > 0 && (
            <div className="rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h2 className="font-heading text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Key Features & Amenities
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {car.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 rounded-xl border border-orange-100 dark:border-slate-800 bg-orange-50/50 dark:bg-slate-800/60 px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all duration-300 hover:border-orange-200 dark:hover:border-slate-700 hover:bg-orange-100/50 dark:hover:bg-slate-800"
                  >
                    <svg className="size-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DIRECT OWNER CONTACT BANNER ── */}
          <div className="rounded-[2rem] border border-orange-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/20 p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/25">
                <svg className="size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg font-black text-slate-900 dark:text-white">Direct Verified Host</span>
                  <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  Questions about this car? Connect directly with the owner for fast support.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`tel:${OWNER_PHONE_E164}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 dark:border-emerald-700/60 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-black text-emerald-700 dark:text-emerald-400 shadow-2xs transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:border-emerald-600 hover:shadow-md hover:shadow-emerald-500/15 active:scale-95 group"
              >
                <span className="flex size-5.5 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 group-hover:scale-110 transition-transform">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span>Call Host</span>
              </a>

              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I have a question about ${displayName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4.5 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-500/25 transition-all duration-300 hover:brightness-110 active:scale-95"
              >
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: STICKY BOOKING CARD ── */}
        <div className="grid gap-4 content-start lg:col-span-5 lg:sticky lg:top-20">
          <BookingCard car={car} />
          {(initial.pickup || initial.ret) && (
            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/60 bg-orange-50 dark:bg-orange-950/40 p-3.5 text-xs font-semibold text-orange-800 dark:text-orange-300 shadow-xs flex items-center gap-2">
              <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Dates pre-applied from your search filter. You can modify them directly.</span>
            </div>
          )}
        </div>
      </div>

      {/* ── SIMILAR CARS IN FLEET ── */}
      {similarCars.length > 0 && (
        <section className="mt-10 grid gap-6 border-t border-slate-200/90 dark:border-slate-800 pt-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Alternative Picks</div>
              <h2 className="font-heading mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Similar Cars in Fleet
              </h2>
            </div>
            <Link
              to="/cars"
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 transition"
            >
              <span>View All Fleet</span>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {similarCars.map((c) => (
              <Link
                key={c.id}
                to={`/cars/${c.id}`}
                className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={c.images[0]}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-2.5 right-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-700 px-2.5 py-0.5 text-[10px] font-bold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
                    {c.fuel}
                  </div>
                </div>

                <div className="p-3 pt-3 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-base font-black text-slate-900 dark:text-white group-hover:text-orange-600 transition truncate">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {c.seats} Seats · Manual Transmission
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-heading text-lg font-black text-orange-600 dark:text-orange-400">
                        ₹{c.pricePerDay.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-400"> / day</span>
                      </div>
                    </div>
                    <span className="flex size-7 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
