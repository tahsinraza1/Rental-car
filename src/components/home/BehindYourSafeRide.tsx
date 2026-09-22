import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ── ALL 9 OWNER PHOTOS ──
import owner1Img from '../../assets/owners/image 1.jpeg'
import owner2Img from '../../assets/owners/image 2.jpeg'
import owner3Img from '../../assets/owners/image 3.jpeg'
import owner4Img from '../../assets/owners/image 4.jpeg'
import owner5Img from '../../assets/owners/image 5.jpeg'
import owner6Img from '../../assets/owners/image 6.jpeg'
import owner7Img from '../../assets/owners/image 7.jpeg'
import owner8Img from '../../assets/owners/image 8.jpeg'
import owner9Img from '../../assets/owners/image 9.jpeg'

export interface FleetOwner {
  id: string
  name: string
  role: string
  location: string
  fleet: string
  rating: number
  tripsCount: number
  safetyPledge: string
  image: string
  tag: string
  badgeColor: string
}

export const FLEET_OWNERS: FleetOwner[] = [
  {
    id: 'owner-1',
    name: 'Faizan Ahmad',
    role: 'Fleet Host & 4x4 Specialist',
    location: 'South Delhi Hub (Jasola / Okhla)',
    fleet: 'Mahindra Thar, Scorpio-N & Jimny',
    rating: 4.98,
    tripsCount: 180,
    safetyPledge: 'I personally test-drive and inspect tire tread depth, brake pads, and 4x4 gearbox before every keys handover.',
    image: owner1Img,
    tag: '⚡ 4x4 & Adventure Lead',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'owner-2',
    name: 'Imran Malik',
    role: 'Fleet Operations & Sanitization Lead',
    location: 'Noida Hub (Sector 62 / 18)',
    fleet: 'Hyundai Creta, Glanza & Brezza',
    rating: 4.95,
    tripsCount: 145,
    safetyPledge: 'Zero advance deposit trap. Every cabin is deep-vacuumed and sanitized with fresh aroma before delivery.',
    image: owner2Img,
    tag: '🧼 100% Sanitization Lead',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'owner-3',
    name: 'Inzemam Ul Haq',
    role: 'Executive & Outstation Fleet Host',
    location: 'Central Delhi Hub (Shaheen Bagh / NFC)',
    fleet: 'Toyota Innova Crysta & Tata Safari',
    rating: 4.99,
    tripsCount: 160,
    safetyPledge: 'Family road trip safety is my #1 priority. My direct WhatsApp line stays active 24/7 throughout your journey.',
    image: owner3Img,
    tag: '🏆 Top Rated Superhost',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'owner-4',
    name: 'Rajesh Sharma',
    role: 'SUV Fleet Partner',
    location: 'South Delhi (Saket / Hauz Khas)',
    fleet: 'Mahindra Scorpio Classic & Thar Roxx',
    rating: 4.93,
    tripsCount: 120,
    safetyPledge: 'All original commercial self-drive permits, insurance, and valid PUC are kept verified in the glovebox.',
    image: owner4Img,
    tag: '🛡️ Verified Fleet Partner',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    id: 'owner-5',
    name: 'Sunil Verma',
    role: 'City Commute Fleet Host',
    location: 'South Extension & Lajpat Nagar',
    fleet: 'Maruti Baleno, Swift & Fronx',
    rating: 4.94,
    tripsCount: 135,
    safetyPledge: '100% full fuel tank handover, smooth doorstep delivery in 20 minutes, and quick WhatsApp document verification.',
    image: owner5Img,
    tag: '⚡ 5-Min Handover Host',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'owner-6',
    name: 'Gurpreet Singh',
    role: 'Highway & Mountain Fleet Lead',
    location: 'Greater Noida & Expressway Hub',
    fleet: 'Tata Safari, Scorpio-N & Grand Vitara',
    rating: 4.99,
    tripsCount: 175,
    safetyPledge: 'Suspension and wheel alignment checked before every highway booking. 24/7 Pan-India emergency roadside support.',
    image: owner6Img,
    tag: '🛣️ Highway Tour Specialist',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'owner-7',
    name: 'Vikram Rawat',
    role: 'Off-Road Fleet Specialist',
    location: 'Delhi NCR Hub',
    fleet: 'Mahindra Thar 4x4 & Maruti Jimny',
    rating: 4.92,
    tripsCount: 98,
    safetyPledge: 'Equipped with all-terrain tires, hill-hold assist, and emergency puncture kits for smooth Uttarakhand trips.',
    image: owner7Img,
    tag: '⛰️ Mountain Trip Host',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'owner-8',
    name: 'Sandeep Tyagi',
    role: 'Compact SUV Fleet Host',
    location: 'Noida Sector 18 & Atta Market Hub',
    fleet: 'Tata Punch & Maruti Brezza',
    rating: 4.91,
    tripsCount: 125,
    safetyPledge: 'Zero advance trap. Inspect the car thoroughly first, pay only after you are 100% satisfied with vehicle health.',
    image: owner8Img,
    tag: '🛡️ Zero-Advance Host',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'owner-9',
    name: 'Manish Bhardwaj',
    role: 'Premium Fleet Manager',
    location: 'Dwarka & IGI Airport Hub',
    fleet: 'Toyota Innova Crysta & Glanza',
    rating: 4.97,
    tripsCount: 155,
    safetyPledge: 'Guaranteed on-time airport pickup & drop with spotless sanitized cabins and clear handover receipts.',
    image: owner9Img,
    tag: '✈️ Airport Hub Host',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
]

export interface BehindYourSafeRideProps {
  showAboutButton?: boolean
}

export function BehindYourSafeRide({ showAboutButton = true }: BehindYourSafeRideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true)
  const [slideKey, setSlideKey] = useState(0)

  // Mobile Touch Swipe Handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const totalOwners = FLEET_OWNERS.length

  // Auto-slide effect (Active when autoSlideEnabled is true and not hovered)
  useEffect(() => {
    if (!autoSlideEnabled || isPaused) return

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalOwners)
      setSlideKey((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [autoSlideEnabled, isPaused, totalOwners])

  function handlePrev() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalOwners - 1))
    setSlideKey((prev) => prev + 1)
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % totalOwners)
    setSlideKey((prev) => prev + 1)
  }

  // Touch Swipe Handlers
  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(null)
  }

  function handleTouchMove(e: React.TouchEvent) {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return
    const distance = touchStartX - touchEndX
    const isSwipe = Math.abs(distance) > 45

    if (isSwipe) {
      if (distance > 0) {
        // Swiped Left -> Go Next
        handleNext()
      } else {
        // Swiped Right -> Go Prev
        handlePrev()
      }
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <section
      className="luxury-section-box relative overflow-hidden p-5 sm:p-7 md:p-9 lg:p-11"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Ambient Glowing Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-orange-500/12 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-amber-500/12 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-rose-500/5 blur-[120px]" />

      <div className="relative z-10 grid gap-6 sm:gap-8">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-800/60 bg-orange-50/90 dark:bg-orange-950/60 px-4 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs backdrop-blur-sm">
              <span className="size-2 rounded-full bg-orange-500 animate-ping" />
              🛡️ 100% Verified Car Owners & Fleet Hosts
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Meet The Trusted Owners <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Behind Your Safe Ride</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Book directly with verified car owners across Delhi & Noida. No middleman commissions, certified mechanical health, and 5-minute keys handover.
            </p>
          </div>

          {/* Controls: Auto-Slide Toggle */}
          <div className="flex flex-wrap items-center gap-3 self-end md:self-auto shrink-0">
            {/* Auto-Slide Toggle Button */}
            <button
              onClick={() => setAutoSlideEnabled((prev) => !prev)}
              aria-label="Toggle auto slide"
              title="Click to toggle Auto-Slide ON/OFF"
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-black transition-all cursor-pointer shadow-2xs ${
                autoSlideEnabled
                  ? 'border-orange-300 bg-orange-500 text-white shadow-orange-500/20'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className={`size-2 rounded-full ${autoSlideEnabled ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
              <span>{autoSlideEnabled ? '⚡ Auto-Slide: ON' : '⏸️ Auto-Slide: OFF'}</span>
            </button>
          </div>
        </div>

        {/* ── 1-SECOND SYNCED AUTO-SLIDE PROGRESS BAR ── */}
        {autoSlideEnabled && (
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
            <div
              key={slideKey}
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-full transition-all duration-200 animate-slide-progress"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            />
          </div>
        )}


        {/* ── PREMIUM 3D STAGGERED SLIDE STAGE (PHOTO-ONLY CARDS) ── */}
        <div
          className="stage-3d-perspective relative min-h-[460px] sm:min-h-[500px] md:min-h-[530px] w-full overflow-hidden rounded-3xl py-4 flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ◀◀ FLOATING LEFT NAVIGATION BUTTON */}
          <button
            onClick={handlePrev}
            aria-label="Previous owner photo"
            title="Previous Photo (Slide Left)"
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 grid size-12 sm:size-14 place-items-center rounded-full border-2 border-orange-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 text-orange-600 dark:text-orange-400 shadow-2xl backdrop-blur-md hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-transparent hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer group"
          >
            <svg
              className="size-5 sm:size-6 stroke-[3] transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* ▶▶ FLOATING RIGHT NAVIGATION BUTTON */}
          <button
            onClick={handleNext}
            aria-label="Next owner photo"
            title="Next Photo (Slide Right)"
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 grid size-12 sm:size-14 place-items-center rounded-full border-2 border-orange-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 text-orange-600 dark:text-orange-400 shadow-2xl backdrop-blur-md hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-transparent hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer group"
          >
            <svg
              className="size-5 sm:size-6 stroke-[3] transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* ── 9 3D STAGGERED PHOTO CARDS (PHOTO ONLY) ── */}
          {FLEET_OWNERS.map((owner, idx) => {
            // Calculate wrapped difference (-4 to +4)
            const rawDiff = (idx - currentIndex + totalOwners) % totalOwners
            const diff = rawDiff > totalOwners / 2 ? rawDiff - totalOwners : rawDiff
            const isCenter = diff === 0
            const isVisible = Math.abs(diff) <= 2

            if (!isVisible) return null

            // 3D Staggered positioning calculations
            const xPercent = diff * 105
            const zTranslate = isCenter ? 50 : -60 * Math.abs(diff)
            const yRotate = diff * -14
            const scale = isCenter ? 1.06 : Math.max(0.72, 1 - Math.abs(diff) * 0.16)
            const opacity = isCenter ? 1 : Math.max(0.2, 0.65 - Math.abs(diff) * 0.25)
            const zIndex = isCenter ? 35 : 25 - Math.abs(diff)

            return (
              <div
                key={owner.id}
                onClick={() => {
                  if (!isCenter) {
                    setCurrentIndex(idx)
                    setSlideKey((prev) => prev + 1)
                  }
                }}
                style={{
                  transform: `translateX(${xPercent}%) scale(${scale}) translateZ(${zTranslate}px) rotateY(${yRotate}deg)`,
                  opacity,
                  zIndex,
                  transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1), opacity 450ms ease, box-shadow 450ms ease, border-color 450ms ease',
                }}
                className={`absolute w-[84vw] max-w-[320px] sm:max-w-[360px] md:max-w-[390px] aspect-[4/5] overflow-hidden rounded-3xl border bg-slate-950 shadow-xl cursor-pointer ${
                  isCenter
                    ? 'center-card-bouncy border-2 border-orange-400 dark:border-orange-500 ring-4 ring-orange-400/30 shadow-2xl'
                    : 'border-slate-200/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500 hover:opacity-90'
                }`}
              >
                {/* Clean Full-Bleed Photo */}
                <img
                  src={owner.image}
                  alt={owner.name || `Owner Photo ${idx + 1}`}
                  className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out ${
                    isCenter ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            )
          })}
        </div>

        {/* ── 9 SLIDE PROGRESS INDICATOR PILLS & HELPER ── */}
        <div className="flex flex-col items-center justify-center gap-2.5 pt-1">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FLEET_OWNERS.map((owner, i) => {
              const isActive = currentIndex === i
              return (
                <button
                  key={owner.id}
                  onClick={() => {
                    setCurrentIndex(i)
                    setSlideKey((prev) => prev + 1)
                  }}
                  aria-label={`Jump to owner ${owner.name}`}
                  title={`${owner.name} (${owner.role})`}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-10 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-md ring-2 ring-orange-400/40'
                      : 'w-3 bg-slate-200 dark:bg-slate-700 hover:bg-orange-300'
                  }`}
                />
              )
            })}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline">Hover over cards to pause</span>
            <span className="hidden sm:inline">•</span>
            <span>👆 Swipe or click side cards to slide</span>
            <span>•</span>
            <span>Use Left/Right floating arrows</span>
          </div>


          {/* Direct Navigation Button to About Us Page (conditionally rendered) */}
          {showAboutButton && (
            <div className="pt-2 flex justify-center">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-3.5 text-xs sm:text-sm font-black text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>About Us</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}


