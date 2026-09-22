import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { subscribeToReviews, type CustomerReview } from '../../services/reviewService'
import { ReviewModal } from './ReviewModal'

import feedbackScenicBg from '../../assets/feedback-scenic-bg.jpg'
import cretaImg from '../../assets/cars/creta.jpg'
import glanzaImg from '../../assets/cars/glanza.webp'
import safariImg from '../../assets/cars/safari.jpg'
import scorpioNImg from '../../assets/cars/scorpio-n.jpg'
import tharImg from '../../assets/cars/thar.jpg'

interface CuratedReview extends CustomerReview {
  carImg?: string
  avatarImg?: string
  isFeatured?: boolean
}

const initialCuratedReviews: CuratedReview[] = [
  {
    id: 'curated-1',
    name: 'Rahul Sharma',
    city: 'Delhi',
    phone: '+91 98112 45890',
    email: 'rahul.s@gmail.com',
    car: 'Hyundai Creta',
    rating: 5,
    text: 'Booked a Hyundai Creta for a weekend trip. The WhatsApp booking was super smooth — owner confirmed within minutes. Will definitely use again!',
    bookingMethod: 'WhatsApp',
    avatar: 'RS',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    carImg: cretaImg,
    isUserSubmitted: false,
    isFeatured: false,
  },
  {
    id: 'curated-2',
    name: 'Priya Nair',
    city: 'Noida',
    phone: '+91 98731 29481',
    email: 'priya.nair@outlook.com',
    car: 'Toyota Glanza',
    rating: 5,
    text: 'Loved the real-time availability calendar. No back-and-forth calls needed. Just picked dates, sent on WhatsApp, and got the keys. 10/10.',
    bookingMethod: 'WhatsApp',
    avatar: 'PN',
    avatarImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    carImg: glanzaImg,
    isUserSubmitted: false,
    isFeatured: true,
  },
  {
    id: 'curated-3',
    name: 'Arjun Mehta',
    city: 'Delhi',
    phone: '+91 99100 83721',
    email: 'arjun.mehta@yahoo.com',
    car: 'Toyota Innova Crysta',
    rating: 5,
    text: 'Rented the Innova Crysta for a family trip to Agra. Spotless car, fair price, and the owner was very responsive. Highly recommended!',
    bookingMethod: 'Phone Call',
    avatar: 'AM',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    carImg: safariImg,
    isUserSubmitted: false,
    isFeatured: false,
  },
  {
    id: 'curated-4',
    name: 'Vikram Singh',
    city: 'Delhi',
    phone: '+91 98188 56214',
    email: 'vikram.singh@gmail.com',
    car: 'Mahindra Scorpio-N',
    rating: 5,
    text: 'Transparent pricing, no hidden fees. The Scorpio-N handled the Delhi roads and highways like a beast. Great experience overall.',
    bookingMethod: 'Direct/Offline',
    avatar: 'VS',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    carImg: scorpioNImg,
    isUserSubmitted: false,
    isFeatured: false,
  },
  {
    id: 'curated-5',
    name: 'Sneha Patel',
    city: 'Noida',
    phone: '+91 97172 34901',
    email: 'sneha.patel@gmail.com',
    car: 'Mahindra Thar',
    rating: 5,
    text: 'The 4x4 Thar was spotless and super well maintained. Quick 5-minute handover right at my doorstep. Unmatched self-drive experience in Delhi NCR!',
    bookingMethod: 'WhatsApp',
    avatar: 'SP',
    avatarImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    carImg: tharImg,
    isUserSubmitted: false,
    isFeatured: false,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`size-4 ${
            i < count
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.6)]'
              : 'fill-slate-200 text-slate-200'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function FeedbackSection() {
  const navigate = useNavigate()
  const [liveReviews, setLiveReviews] = useState<CustomerReview[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  // Subscribe to real-time reviews from Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToReviews((firestoreReviews) => {
      setLiveReviews(firestoreReviews)
    })
    return () => unsubscribe()
  }, [])

  // Combine live reviews with curated fallback reviews and limit to latest 5 for Home Page
  const latest5Reviews: CuratedReview[] = useMemo(() => {
    const formattedLive: CuratedReview[] = liveReviews.map((r) => ({
      ...r,
      carImg: tharImg,
      isFeatured: false,
    }))
    const combined = [...formattedLive, ...initialCuratedReviews]
    return combined.slice(0, 5)
  }, [liveReviews])

  const totalCount = 500 + liveReviews.length
  const avgRating = '4.9'

  const itemsPerPage = 4
  const maxIndex = Math.max(0, latest5Reviews.length - itemsPerPage)

  function handlePrev() {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  function handleNext() {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const visibleReviews = latest5Reviews.slice(startIndex, startIndex + itemsPerPage)
  if (visibleReviews.length < itemsPerPage && latest5Reviews.length >= itemsPerPage) {
    visibleReviews.push(...latest5Reviews.slice(0, itemsPerPage - visibleReviews.length))
  }

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/20 bg-slate-950 shadow-2xl">
      {/* ── SCENIC MOUNTAIN LAKE SUNRISE BACKGROUND ── */}
      <img
        src={feedbackScenicBg}
        alt="Scenic Highway Mountain Backdrop"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />

      {/* Atmospheric Soft Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/40 to-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top_right] from-amber-500/20 via-transparent to-transparent" />

      {/* Content Layer */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
        {/* ── TOP HEADER ROW ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400 shadow-sm backdrop-blur-md">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
              </svg>
            </div>
            <div>
              <div className="font-heading text-xs font-black tracking-widest text-sky-400 uppercase leading-none">
                Car Rental
              </div>
              <div className="font-heading text-sm font-black tracking-wider text-white uppercase leading-none mt-0.5">
                Express
              </div>
            </div>
          </div>

          {/* Center Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-amber-300 shadow-md">
            <span className="text-amber-400">★</span>
            <span className="text-white">Real People.</span>
            <span className="text-amber-300">Real Journeys.</span>
          </div>

          {/* Right Script Accent Text & Write Review CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block font-serif italic text-sm md:text-base font-light text-amber-200/90 tracking-wide drop-shadow-md">
              Happy Journeys, Real Stories
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-4.5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition duration-300 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <span>⭐ Give Feedback</span>
            </button>
          </div>
        </div>

        {/* ── MAIN HEADLINE & SUBTITLE ── */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            What Our <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base font-medium text-slate-200 drop-shadow">
            Real reviews from real customers in Delhi & Noida. Your trust drives us forward.
          </p>
        </div>

        {/* ── FLOATING GLASS STATS CAPSULE BAR ── */}
        <div className="max-w-4xl mx-auto rounded-full border border-white/50 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-2.5 sm:p-3.5 shadow-2xl mb-10 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800 gap-2 sm:gap-0">
            {/* Stat 1: Happy Customers */}
            <div className="flex items-center justify-center gap-3 px-3 py-1.5 sm:py-0">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/30 text-lg">
                😊
              </div>
              <div className="text-left">
                <div className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {totalCount}+
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Happy Customers</div>
              </div>
            </div>

            {/* Stat 2: Premium Cars */}
            <div className="flex items-center justify-center gap-3 px-3 py-1.5 sm:py-0">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-blue-500/30">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  14+
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Premium Cars</div>
              </div>
            </div>

            {/* Stat 3: Locations */}
            <div className="flex items-center justify-center gap-3 px-3 py-1.5 sm:py-0">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md shadow-emerald-500/30">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  2
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Hub Locations</div>
              </div>
            </div>

            {/* Stat 4: Average Rating */}
            <div className="flex items-center justify-center gap-3 px-3 py-1.5 sm:py-0">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30 font-black text-sm">
                ★
              </div>
              <div className="text-left">
                <div className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {avgRating}★
                </div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LATEST 5 REVIEWS CAROUSEL WITH BOUNCY CARDS ── */}
        <div className="relative mb-10">
          {/* Left Arrow Circle Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-12 place-items-center rounded-full border border-white/60 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-115 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 active:scale-95 cursor-pointer"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow Circle Button */}
          <button
            onClick={handleNext}
            aria-label="Next review"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-12 place-items-center rounded-full border border-white/60 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-115 hover:bg-white dark:hover:bg-slate-700 hover:text-orange-600 active:scale-95 cursor-pointer"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Cards Row: Responsive Display of Latest 5 Reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {visibleReviews.map((review, idx) => {
              const isCenterFeatured = idx === 1 || review.isFeatured

              return (
                <div
                  key={review.id || `${review.name}-${idx}`}
                  onClick={() => navigate('/feedback')}
                  className={`card-review-animated group relative flex flex-col justify-between rounded-[1.75rem] sm:rounded-[2rem] bg-white dark:bg-slate-850 p-5 sm:p-6 transition-all duration-500 cursor-pointer overflow-hidden ${
                    isCenterFeatured
                      ? 'shadow-2xl ring-2 ring-orange-400/80 -translate-y-1 sm:-translate-y-2.5 scale-100 sm:scale-102 border-2 border-orange-300 dark:border-orange-500/50'
                      : 'border border-slate-100/90 dark:border-slate-800 shadow-xl'
                  }`}
                >
                  {/* Decorative Soft Watermark Quote */}
                  <div className="quote-watermark pointer-events-none absolute right-4 top-3 select-none font-serif text-5xl sm:text-6xl font-black text-slate-100/90 dark:text-slate-800/40 leading-none">
                    ”
                  </div>

                  <div>
                    {/* Top Row: Stars + Verified / Live Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                      <div className="star-glow">
                        <StarRating count={review.rating} />
                      </div>

                      {isCenterFeatured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/90 dark:border-emerald-700/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 shadow-2xs">
                          <svg className="size-3 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span>Verified Story</span>
                        </span>
                      ) : review.isUserSubmitted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 px-2.5 py-0.5 text-[10px] font-bold text-orange-700 dark:text-orange-300 shadow-2xs">
                          <span className="size-1.5 rounded-full bg-orange-500 animate-ping" />
                          Live Feedback
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 px-2 py-0.5 text-[10px] font-bold text-sky-700 dark:text-sky-300 shadow-2xs">
                          ✓ Verified
                        </span>
                      )}
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic relative z-10">
                      “{review.text}”
                    </p>
                  </div>

                  {/* Bottom Row: Customer Avatar & Info + Car Thumbnail */}
                  <div className="mt-5 border-t border-slate-100/90 dark:border-slate-800 pt-3.5 relative z-10">
                    {/* Customer Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        {review.avatarImg ? (
                          <img
                            src={review.avatarImg}
                            alt={review.name}
                            className="size-9 rounded-full object-cover border-2 border-orange-200 dark:border-orange-500/50 shadow-xs shrink-0 transition-transform group-hover:scale-110 mt-0.5"
                          />
                        ) : (
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-xs font-black text-white shadow-xs transition-transform group-hover:scale-110 mt-0.5">
                            {review.avatar}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-heading text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors truncate">
                            {review.name}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="truncate">📍 {review.city}</span>
                            {review.phone && (
                              <span className="inline-flex items-center gap-0.5 text-slate-700 dark:text-slate-300 font-semibold truncate">
                                📞 {review.phone}
                              </span>
                            )}
                          </div>
                          {review.email && (
                            <div className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              ✉️ {review.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Car Thumbnail Tag Row */}
                    {review.carImg && (
                      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 p-1.5 px-2.5 border border-slate-200/80 dark:border-slate-800 transition-colors group-hover:border-orange-200 dark:group-hover:border-orange-500/40 group-hover:bg-orange-50/40 dark:group-hover:bg-orange-950/30">
                        <img
                          src={review.carImg}
                          alt={review.car}
                          className="h-7 w-12 rounded-md object-cover transition-transform group-hover:scale-105"
                        />
                        <span className="font-heading text-[11px] font-black text-slate-800 dark:text-slate-200 truncate">
                          {review.car}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── BOTTOM ACTION BAR: VIEW ALL FEEDBACKS CTA ── */}
        <div className="text-center pt-2">
          <Link
            to="/feedback"
            className="group inline-flex items-center gap-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/60 dark:border-slate-700 px-8 py-3.5 text-sm font-black text-slate-900 dark:text-white shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-105 hover:text-orange-500 dark:hover:text-orange-400 hover:shadow-2xl active:scale-98"
          >
            <span>View All Customer Feedbacks & Stories</span>
            <span className="flex size-6 items-center justify-center rounded-full bg-orange-500 text-white transition-transform group-hover:translate-x-1">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
