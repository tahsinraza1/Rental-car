import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import selfDriveImg from '../../assets/occasions/self_drive.jpg'
import hourlyRentalImg from '../../assets/occasions/hourly_rental.jpg'
import weddingImg from '../../assets/occasions/wedding.jpg'
import airportTransferImg from '../../assets/occasions/airport_transfer.jpg'
import roadTripImg from '../../assets/occasions/road_trip.jpg'
import eventsImg from '../../assets/occasions/events.jpg'
import luxuryImg from '../../assets/occasions/luxury.jpg'
import groupTravelImg from '../../assets/occasions/group_travel.jpg'
import featuredWaveBg from '../../assets/featured-wave-bg.png'

type FilterCategory = 'all' | 'self-drive' | 'hourly' | 'wedding' | 'airport' | 'road-trip' | 'events' | 'luxury' | 'group'

interface OccasionCard {
  id: FilterCategory
  title: string
  desc: string
  image: string
  glow: string
  icon: React.ReactNode
  highlightedCta?: boolean
  imgPosition?: string
}

const filterTabs = [
  { id: 'all' as const, label: 'All', icon: '🚗' },
  { id: 'self-drive' as const, label: 'Self Drive', icon: '🛞' },
  { id: 'hourly' as const, label: 'Hourly Rental', icon: '⏱️' },
  { id: 'wedding' as const, label: 'Wedding', icon: '💍' },
  { id: 'airport' as const, label: 'Airport Transfer', icon: '✈️' },
  { id: 'road-trip' as const, label: 'Road Trips', icon: '🏔️' },
  { id: 'events' as const, label: 'Events & Parties', icon: '🎉' },
]

const occasions: OccasionCard[] = [
  {
    id: 'self-drive',
    title: 'Self Drive',
    desc: 'Take the wheel and explore destinations at your own pace.',
    image: selfDriveImg,
    glow: 'from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.55)] border-emerald-300/40',
    imgPosition: 'object-[center_65%]',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path strokeLinecap="round" d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    ),
  },
  {
    id: 'hourly',
    title: 'Hourly Rental',
    desc: 'Flexible hourly rental packages for quick city errands and meetings.',
    image: hourlyRentalImg,
    glow: 'from-amber-400 to-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.55)] border-amber-300/40',
    highlightedCta: true,
    imgPosition: 'object-[center_65%]',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'wedding',
    title: 'Weddings',
    desc: 'Make your special day memorable with decorated luxury cars.',
    image: weddingImg,
    glow: 'from-pink-400 to-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.55)] border-pink-300/40',
    imgPosition: 'object-[center_60%]',
    icon: (
      <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 'airport',
    title: 'Airport Transfers',
    desc: 'Punctual, stress-free terminal pickups and comfortable drop-offs.',
    image: airportTransferImg,
    glow: 'from-sky-400 to-blue-600 shadow-[0_0_20px_rgba(14,165,233,0.55)] border-sky-300/40',
    imgPosition: 'object-[center_60%]',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    id: 'road-trip',
    title: 'Road Trips',
    desc: 'Powerful SUVs and sedans engineered for long highway drives.',
    image: roadTripImg,
    glow: 'from-purple-400 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.55)] border-purple-300/40',
    imgPosition: 'object-[center_60%]',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'events',
    title: 'Events & Parties',
    desc: 'Arrive in style at VIP parties, concerts, and gala celebrations.',
    image: eventsImg,
    glow: 'from-amber-300 to-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.55)] border-yellow-300/40',
    imgPosition: 'object-[center_60%]',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    id: 'luxury',
    title: 'Premium & Luxury',
    desc: 'Experience unmatched prestige, first-class comfort, and elite ride quality.',
    image: luxuryImg,
    glow: 'from-cyan-300 to-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.55)] border-cyan-200/40',
    imgPosition: 'object-center',
    icon: (
      <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
      </svg>
    ),
  },
  {
    id: 'group',
    title: 'Group Travel',
    desc: 'Spacious 7+ seaters with ample luggage space for group trips.',
    image: groupTravelImg,
    glow: 'from-rose-400 to-orange-600 shadow-[0_0_20px_rgba(244,63,94,0.55)] border-rose-300/40',
    imgPosition: 'object-center',
    icon: (
      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

export function UseCasesSection() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState<FilterCategory>('all')

  const filteredCards = selectedTab === 'all'
    ? occasions
    : occasions.filter((c) => c.id === selectedTab)

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 sm:p-7 md:p-9 lg:p-10 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Abstract Wave Gradient Background Image */}
      <img
        src={featuredWaveBg}
        alt="A Car for Every Need Wave Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom dark:opacity-10"
      />

      {/* Subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/20 dark:bg-slate-950/40" />

      {/* ── TOP HEADER AREA ── */}
      <div className="relative z-10 flex flex-col gap-5 mb-7">
        {/* Top Tag & Script Quote */}
        <div className="flex items-center justify-between w-full">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Every Occasion</span>
          </div>

          {/* Right Script Quote */}
          <div className="hidden sm:block font-serif italic text-sm md:text-base font-light text-slate-500 dark:text-slate-400 tracking-wide">
            More than just a ride
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            A car for <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">every need</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            Whether it's a quick errand or a grand celebration, we have you covered.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/30 scale-105'
                    : 'border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-xs'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 8 FULL-BLEED OCCASION CARDS GRID (COMPACT HEIGHT) ── */}
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCards.map((c) => (
          <div
            key={c.title}
            onClick={() => navigate('/cars')}
            className="card-bouncy group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-slate-200/90 dark:border-slate-700/80 bg-slate-900 shadow-md hover:border-orange-400/80 cursor-pointer"
          >
            {/* Full Card Image */}
            <img
              src={c.image}
              alt={c.title}
              className={`h-full w-full object-cover ${c.imgPosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-110`}
              loading="lazy"
            />

            {/* Atmospheric Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95" />

            {/* Top Category Badge */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <div
                className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${c.glow} border backdrop-blur-md transition-all duration-300 group-hover:scale-110`}
              >
                {c.icon}
              </div>
            </div>

            {/* Bottom Title, Description & Action Area */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-3 sm:p-3.5">
              <div className="flex items-end justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm sm:text-base font-black tracking-tight text-white transition-colors duration-300 group-hover:text-orange-300 truncate">
                    {c.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-200/90 leading-tight line-clamp-1">
                    {c.desc}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-orange-400 group-hover:text-orange-300">
                    <span>Explore rides</span>
                    <svg className="size-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Glowing Arrow Button */}
                <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 group-hover:border-transparent group-hover:scale-110 mb-0.5">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM FOOTER DIVIDER ── */}
      <div className="relative z-10 mt-10 pt-4 flex flex-col items-center justify-center gap-3">
        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 shadow-xs shadow-orange-500/40" />
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Centered text divider */}
        <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          YOUR JOURNEY • OUR PRIORITY
        </div>
      </div>
    </section>
  )
}
