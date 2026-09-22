import { useState, useRef, useEffect } from 'react'
import { OWNER_PHONE_E164, OWNER_WHATSAPP_NUMBER } from '../config'
import { cars } from '../data/cars'
import type { Car } from '../types'
import contactHeroBg from '../assets/contact-hero-bg.png'

export function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [carSearchQuery, setCarSearchQuery] = useState('')
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false)
  const carDropdownRef = useRef<HTMLDivElement>(null)
  const carSearchInputRef = useRef<HTMLInputElement>(null)

  const [rentalDuration, setRentalDuration] = useState('Daily Rental (1–3 Days)')
  const [message, setMessage] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Filter cars based on search query
  const filteredCars = cars.filter((c) => {
    const q = carSearchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      c.name.toLowerCase().includes(q) ||
      c.fuel.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    )
  })

  // Close vehicle dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (carDropdownRef.current && !carDropdownRef.current.contains(event.target as Node)) {
        setIsCarDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-focus search input when car dropdown opens
  useEffect(() => {
    if (isCarDropdownOpen) {
      setTimeout(() => carSearchInputRef.current?.focus(), 50)
    } else {
      setCarSearchQuery('')
    }
  }, [isCarDropdownOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const carText = selectedCar ? ` for ${selectedCar.name} (₹${selectedCar.pricePerDay}/day)` : ' for Any Available Vehicle'
    const text = `Hi! I'm ${name.trim()} (${phone.trim()}). I want to inquire about renting a car${carText} (${rentalDuration}).\n\nNotes: ${message.trim() || 'Please share available dates and booking details.'}`
    const link = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const durationOptions = [
    { label: 'Daily (1–3 Days)', icon: '🗓️' },
    { label: 'Hourly Rental', icon: '⏱️' },
    { label: 'Weekly (4–7 Days)', icon: '🛣️' },
    { label: 'Monthly Rental', icon: '📅' },
    { label: 'Wedding / Convoy', icon: '🎉' },
  ]

  const faqs = [
    {
      q: 'Do I need to pay any advance amount online?',
      a: 'Absolutely not. You pay 0% advance online. Full payment is made directly in person upon vehicle physical inspection and key handover.',
    },
    {
      q: 'What documents are required for booking?',
      a: 'A valid original Driving License (held for at least 1 year) and an Aadhaar Card or Passport for identity and address verification.',
    },
    {
      q: 'How fast do you dispatch cars for doorstep delivery?',
      a: 'We offer doorstep delivery across South Delhi, Central Delhi, and Noida sectors within 60–90 minutes of WhatsApp confirmation.',
    },
    {
      q: 'Is there any limit on kilometers driven?',
      a: 'All our daily rentals come with generous unlimited kilometer usage with zero per-km penalty so you can enjoy your road trip stress-free.',
    },
    {
      q: 'Can I pick up or drop off at Delhi Airport (IGI T1/T2/T3)?',
      a: 'Yes! We provide dedicated 24×7 Airport pickup and drop service. Just notify us of your flight details in advance.',
    },
  ]

  const serviceHubs = [
    { name: 'South Delhi Hub', desc: 'Jasola Vihar, Shaheen Bagh, Saket, GK & Nehru Place', time: '15-30 min delivery' },
    { name: 'Noida Hub', desc: 'Sector 18, 62, 137, Expressway & Greater Noida', time: '30-45 min delivery' },
    { name: 'Airport Express', desc: 'IGI Airport Terminal 1, 2 & 3 Dedicated Dispatch', time: '24×7 Available' },
    { name: 'Gurugram & NCR', desc: 'Cyber Hub, Golf Course Road & Ghaziabad', time: 'On-demand dispatch' },
  ]

  return (
    <div className="grid gap-10 md:gap-14">
      {/* ── HERO BANNER WITH SCENIC ROAD TRIP BACKGROUND ── */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800/80 bg-slate-950 p-8 sm:p-12 md:p-14 shadow-2xl bg-cover bg-right sm:bg-center"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
      >
        {/* Rich dark gradient overlays ensuring crystal clear text readability while showing the Fortuner */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/75 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/25" />

        <div className="relative z-10 max-w-2xl lg:max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-950/60 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-300 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24×7 Delhi NCR Support · Instant WhatsApp Response</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-sm">
            We're here to get you <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              on the road in minutes.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200 font-medium max-w-2xl drop-shadow-xs">
            Have questions about car availability, wedding convoys, outstation road trips, or doorstep delivery? Connect directly with our host team.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-100">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1.5 shadow-sm">
              ⚡ Zero Online Advance
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1.5 shadow-sm">
              🧼 Sanitized & Inspected Cars
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1.5 shadow-sm">
              🛣️ Unlimited Kilometers
            </span>
          </div>
        </div>
      </section>

      {/* ── 3 QUICK CONTACT TILES ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Direct Call */}
        <div className="group flex flex-col justify-between rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-2xs group-hover:scale-105 transition-transform">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                Live Hotline
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">Direct Phone Call</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                Speak directly with the fleet manager for urgent bookings & airport pick-ups.
              </p>
            </div>
          </div>

          <a
            href={`tel:${OWNER_PHONE_E164}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-500/80 bg-white dark:bg-slate-850 px-4 py-2.5 text-xs font-black text-emerald-700 dark:text-emerald-400 shadow-2xs transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-600 hover:shadow-md hover:shadow-emerald-500/25 active:scale-95"
          >
            <span>Call {OWNER_PHONE_E164}</span>
          </a>
        </div>

        {/* Card 2: WhatsApp */}
        <div className="group flex flex-col justify-between rounded-[2rem] border border-orange-200/90 dark:border-slate-800 bg-gradient-to-br from-white to-orange-50/40 dark:from-slate-900 dark:to-slate-850 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 px-2.5 py-0.5 text-[10px] font-bold text-orange-700 dark:text-orange-300">
                Avg. Reply &lt; 5m
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">WhatsApp Concierge</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                Fastest way to get car photos, check exact dates, and lock in your reservation.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I would like to inquire about car rentals.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-500/25 transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Card 3: Location Hub */}
        <div className="group flex flex-col justify-between rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 shadow-2xs group-hover:scale-105 transition-transform">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                HQ & Fleet Yard
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">Delhi Hub Location</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Jasola Vihar / Shaheen Bagh near Metro Station, New Delhi 110025. Doorstep delivery available.
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Jasola+Vihar+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95"
          >
            <span>Open in Google Maps</span>
          </a>
        </div>
      </section>

      {/* ── MAIN SECTION: INQUIRY BUILDER & COVERAGE HUBS ── */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Interactive WhatsApp Inquiry Form */}
        <div className="rounded-[2.5rem] border border-orange-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-9 shadow-xl lg:col-span-7">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-orange-300 mb-2">
              <span>Fast Booking Assistant</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Send an Instant Inquiry
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Fill in your trip details below. It instantly prepares your inquiry on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4.5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name *</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 px-3.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone / WhatsApp Number *</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 px-3.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </label>
            </div>

            {/* ── CUSTOM SEARCHABLE VEHICLE SELECTOR ── */}
            <div className="relative grid gap-1.5" ref={carDropdownRef}>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Vehicle (Optional)</span>
              
              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setIsCarDropdownOpen((prev) => !prev)}
                className={`flex h-11 w-full items-center justify-between rounded-xl border bg-slate-50/50 dark:bg-slate-800 px-3.5 text-left transition duration-300 cursor-pointer ${
                  isCarDropdownOpen
                    ? 'border-orange-500 bg-white dark:bg-slate-800 ring-2 ring-orange-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {selectedCar ? (
                    <>
                      <img
                        src={selectedCar.images[0]}
                        alt=""
                        className="size-7 shrink-0 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div className="min-w-0 truncate">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{selectedCar.name}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-bold">
                        🚗
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Any Available Car</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedCar && (
                    <span className="rounded-md bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-700/50 px-2 py-0.5 text-[11px] font-black text-orange-600 dark:text-orange-400">
                      ₹{selectedCar.pricePerDay.toLocaleString('en-IN')}/day
                    </span>
                  )}
                  <svg
                    className={`size-4 text-slate-400 transition-transform duration-300 ${isCarDropdownOpen ? 'rotate-180 text-orange-500' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Searchable Dropdown Popup Menu */}
              {isCarDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-2xl border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in-up">
                  {/* Search Input Box */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80">
                    <div className="relative">
                      <svg
                        className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      <input
                        ref={carSearchInputRef}
                        value={carSearchQuery}
                        onChange={(e) => setCarSearchQuery(e.target.value)}
                        placeholder="Search car (e.g. Thar, Scorpio, Swift)..."
                        className="h-8.5 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-7 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      {carSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setCarSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Vehicle List */}
                  <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
                    {/* Default "Any Available Car" */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCar(null)
                        setIsCarDropdownOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition cursor-pointer ${
                        selectedCar === null
                          ? 'bg-orange-500 text-white font-bold shadow-xs'
                          : 'hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-sm ${selectedCar === null ? 'bg-white/20 text-white' : 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'}`}>
                          🚗
                        </span>
                        <div>
                          <div className="text-xs font-bold">Any Available Car</div>
                          <div className={`text-[10px] ${selectedCar === null ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                            Best matched according to budget
                          </div>
                        </div>
                      </div>
                      {selectedCar === null && <span className="text-xs font-black">✓</span>}
                    </button>

                    {filteredCars.map((c) => {
                      const isSelected = selectedCar?.id === c.id
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCar(c)
                            setIsCarDropdownOpen(false)
                          }}
                          className={`flex w-full items-center justify-between rounded-xl p-2 text-left transition cursor-pointer ${
                            isSelected
                              ? 'bg-orange-500 text-white font-bold shadow-xs'
                              : 'hover:bg-orange-50/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-transparent hover:border-orange-200 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <img
                              src={c.images[0]}
                              alt={c.name}
                              className="size-9 shrink-0 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div className="min-w-0 truncate">
                              <div className="text-xs font-bold truncate">{c.name}</div>
                              <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                                {c.seats} Seats · {c.fuel}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`rounded-md px-2 py-0.5 text-[11px] font-black ${
                              isSelected ? 'bg-white/25 text-white' : 'bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-700/50 text-orange-600 dark:text-orange-400'
                            }`}>
                              ₹{c.pricePerDay.toLocaleString('en-IN')}/day
                            </span>
                            {isSelected && <span className="text-xs font-black">✓</span>}
                          </div>
                        </button>
                      )
                    })}

                    {filteredCars.length === 0 && (
                      <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-semibold">
                        No vehicles found matching "{carSearchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── RENTAL DURATION CLICKABLE PILL BUTTONS (NO DROPDOWN) ── */}
            <div className="grid gap-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rental Duration</span>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((d) => {
                  const isSelected = rentalDuration === d.label
                  return (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setRentalDuration(d.label)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs shadow-orange-500/25 ring-2 ring-orange-500/20'
                          : 'border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-750'
                      }`}
                    >
                      <span className="text-xs">{d.icon}</span>
                      <span>{d.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <label className="grid gap-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Trip Notes / Pickup Location</span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention pickup date, time, doorstep address or any special request..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 p-3 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:outline-none resize-none"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:brightness-110 active:scale-98 cursor-pointer"
            >
              <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Continue on WhatsApp</span>
            </button>
            <p className="text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              No registration or credit card needed. Direct host communication.
            </p>
          </form>
        </div>

        {/* Right: Coverage Hubs & FAQs */}
        <div className="grid gap-6 lg:col-span-5">
          {/* Hub coverage */}
          <div className="rounded-[2.5rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-bold">
                📍
              </span>
              <h2 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                Doorstep Delivery Coverage
              </h2>
            </div>
            <div className="grid gap-2.5">
              {serviceHubs.map((hub) => (
                <div
                  key={hub.name}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3 transition hover:bg-orange-50/40 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-slate-700"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{hub.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{hub.desc}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-transparent dark:border-emerald-800/50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400">
                    {hub.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="rounded-[2.5rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold">
                ❓
              </span>
              <h2 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid gap-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="ml-2 text-slate-400 dark:text-slate-500 font-bold transition-transform duration-300">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-850 px-3.5 py-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
