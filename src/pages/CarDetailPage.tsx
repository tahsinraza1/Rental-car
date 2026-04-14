import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BookingCard } from '../components/booking/BookingCard'
import { cars, getCarById } from '../data/cars'
import { formatShortDate } from '../lib/dates'

const fuelIcons: Record<string, string> = {
  Petrol: '⛽', Diesel: '🛢️', EV: '⚡', Hybrid: '🌿',
}

export function CarDetailPage() {
  const { carId } = useParams()
  const car = carId ? getCarById(carId) : undefined
  const [search] = useSearchParams()
  const [activeImg, setActiveImg] = useState(0)

  const initial = useMemo(() => ({
    pickup: search.get('pickup') ?? '',
    ret: search.get('return') ?? '',
  }), [search])

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
        <div className="text-4xl">🚗</div>
        <div className="text-lg font-bold text-slate-900">Car not found</div>
        <Link to="/cars" className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition shadow-lg shadow-orange-500/25">
          Back to all cars
        </Link>
      </div>
    )
  }

  const similarCars = cars.filter((c) => c.id !== car.id).slice(0, 3)

  return (
    <div className="grid gap-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/" className="hover:text-slate-700 transition">Home</Link>
        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <Link to="/cars" className="hover:text-slate-700 transition">Cars</Link>
        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-slate-700 font-medium">{car.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column */}
        <div className="lg:col-span-7 grid gap-5">

          {/* Image gallery */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="relative aspect-[16/10]">
              <img src={car.images[activeImg]} alt={car.name} className="h-full w-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${
                  car.bookedDates.length === 0
                    ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
                    : 'border-white/20 bg-black/30 text-slate-300'
                }`}>
                  <span className={`size-1.5 rounded-full ${car.bookedDates.length === 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                  {car.bookedDates.length === 0 ? 'Available now' : 'Check dates'}
                </div>
              </div>
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-2 p-3 bg-white">
                {car.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition ${
                      activeImg === i ? 'border-orange-400' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">{car.name}</h1>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="size-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {car.city}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-orange-600">₹{car.pricePerDay.toLocaleString('en-IN')}</div>
                <div className="text-xs text-slate-400">per day</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                {fuelIcons[car.fuel]} {car.fuel}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                ⚙️ {car.transmission}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                👥 {car.seats} seats
              </span>
            </div>

            {/* Specs grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Fuel',         value: car.fuel,              icon: fuelIcons[car.fuel] },
                { label: 'Transmission', value: car.transmission,      icon: '⚙️' },
                { label: 'Seats',        value: `${car.seats} people`, icon: '👥' },
                { label: 'City',         value: car.city,              icon: '📍' },
                ...(car.mileage  ? [{ label: 'Mileage', value: car.mileage,        icon: '🛣️' }] : []),
                ...(car.engineCC ? [{ label: 'Engine',  value: car.engineCC,       icon: '🔧' }] : []),
                ...(car.year     ? [{ label: 'Year',    value: String(car.year),   icon: '📅' }] : []),
              ].map((spec) => (
                <div key={spec.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="text-xl mb-1">{spec.icon}</div>
                  <div className="text-xs text-slate-400">{spec.label}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold text-slate-900 mb-3">About this car</div>
              <p className="text-sm text-slate-600 leading-relaxed">{car.description}</p>
            </div>
          )}

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold text-slate-900 mb-4">Key features</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {car.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2">
                    <svg className="size-3.5 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-xs text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How booking works */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-900 mb-4">How booking works</div>
            <div className="grid gap-3">
              {[
                { step: '1', text: 'Select your pickup and return dates on the calendar' },
                { step: '2', text: 'Instantly see if the car is available for your dates' },
                { step: '3', text: 'Enter your name and phone number' },
                { step: '4', text: 'Click "Book via WhatsApp" — a message is sent to the owner' },
                { step: '5', text: 'Owner confirms your booking on WhatsApp. No payment online.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-xs font-bold text-white shadow-sm">
                    {item.step}
                  </div>
                  <div className="text-sm text-slate-600 pt-0.5">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Booked dates */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-bold text-slate-900 mb-3">Booked dates</div>
            {car.bookedDates.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                No bookings yet — all dates are available!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {car.bookedDates.map((r, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600">
                    <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {formatShortDate(r.start)} → {formatShortDate(r.end)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Booking */}
        <div className="lg:col-span-5 grid gap-4 content-start">
          <BookingCard car={car} />
          {(initial.pickup || initial.ret) && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
              <div className="font-semibold mb-1">Dates from quick search</div>
              <div className="text-xs text-blue-500">You can re-select dates in the calendar if needed.</div>
            </div>
          )}
        </div>
      </div>

      {/* Similar cars */}
      {similarCars.length > 0 && (
        <section className="grid gap-5">
          <div className="text-lg font-bold text-slate-900">Similar cars you might like</div>
          <div className="grid gap-4 md:grid-cols-3">
            {similarCars.map((c) => (
              <Link key={c.id} to={`/cars/${c.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50 transition shadow-sm">
                <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                  <img src={c.images[0]} alt={c.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.city}</div>
                  <div className="text-sm font-bold text-orange-500 mt-1">₹{c.pricePerDay.toLocaleString('en-IN')}/day</div>
                </div>
                <svg className="size-4 text-slate-300 group-hover:text-orange-400 transition shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
