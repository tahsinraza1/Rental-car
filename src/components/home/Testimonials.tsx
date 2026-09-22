import { useState, useEffect, useMemo } from 'react'
import { subscribeToReviews, type CustomerReview } from '../../services/reviewService'
import { ReviewModal } from './ReviewModal'

const initialStaticTestimonials: CustomerReview[] = [
  {
    id: 'static-1',
    name: 'Rahul Sharma',
    city: 'South Delhi',
    car: 'Hyundai Creta',
    rating: 5,
    text: 'Booked a Creta for a weekend trip to Jaipur. The WhatsApp booking was effortless — the owner confirmed within 10 minutes. The car was sparkling clean with a full tank. Will definitely rent again.',
    avatar: 'RS',
    isUserSubmitted: false,
  },
  {
    id: 'static-2',
    name: 'Priya Nair',
    city: 'Noida Sector 62',
    car: 'Maruti Baleno',
    rating: 5,
    text: 'Loved the live availability calendar. Picked my dates, sent WhatsApp, and had keys at my doorstep next morning without paying any upfront advance.',
    avatar: 'PN',
    isUserSubmitted: false,
  },
  {
    id: 'static-3',
    name: 'Arjun Mehta',
    city: 'Jasola Vihar, Delhi',
    car: 'Toyota Innova Crysta',
    rating: 5,
    text: 'Rented the Innova for a family trip to Agra. Spotless condition, great suspension, and the owner was very polite and transparent about everything.',
    avatar: 'AM',
    isUserSubmitted: false,
  },
  {
    id: 'static-4',
    name: 'Sneha Patel',
    city: 'Noida Sector 18',
    car: 'Tata Punch',
    rating: 5,
    text: 'Super convenient for local city commute and client visits. Clean car, easy paperwork, and completely zero hidden charges at return.',
    avatar: 'SP',
    isUserSubmitted: false,
  },
  {
    id: 'static-5',
    name: 'Vikram Singh',
    city: 'Dwarka, Delhi',
    car: 'Mahindra Thar',
    rating: 5,
    text: 'The Thar handled the highway and rough mountain terrain like a beast. Direct owner contact meant quick coordination and total peace of mind.',
    avatar: 'VS',
    isUserSubmitted: false,
  },
  {
    id: 'static-6',
    name: 'Ananya Reddy',
    city: 'Greater Noida',
    car: 'Swift Dzire',
    rating: 5,
    text: 'Far better experience than traditional corporate rental apps. Reasonable flat daily rates and direct communication make all the difference.',
    avatar: 'AR',
    isUserSubmitted: false,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`size-3.5 ${
            i < count
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.5)]'
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

export function Testimonials() {
  const [liveReviews, setLiveReviews] = useState<CustomerReview[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all')
  const [showAll, setShowAll] = useState(false)

  // Subscribe to real-time reviews from Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToReviews((firestoreReviews) => {
      setLiveReviews(firestoreReviews)
    })
    return () => unsubscribe()
  }, [])

  // Combine live reviews (first) + static fallback testimonials
  const allReviews = useMemo(() => {
    return [...liveReviews, ...initialStaticTestimonials]
  }, [liveReviews])

  // Filter reviews by rating if selected
  const filteredReviews = useMemo(() => {
    if (selectedRatingFilter === 'all') return allReviews
    return allReviews.filter((r) => r.rating >= selectedRatingFilter)
  }, [allReviews, selectedRatingFilter])

  // Compute live statistics
  const totalCount = allReviews.length
  const avgRating = (
    allReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / (totalCount || 1)
  ).toFixed(1)

  const featured = filteredReviews[0] || initialStaticTestimonials[0]
  const restReviews = filteredReviews.slice(1)
  const displayedRest = showAll ? restReviews : restReviews.slice(0, 4)

  return (
    <section className="luxury-section-box p-6 sm:p-8 md:p-10 grid gap-8">
      {/* Top Header Row */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            Verified Customer Reviews
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            What Our Drivers <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Say</span>
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Real experiences from self-drive customers across Delhi & Noida.
          </p>
        </div>

        {/* Right CTA Actions: Live Score & Write Review Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Average Rating Pill */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xs">
            <span className="text-amber-500 font-black">★ {avgRating}</span>
            <span className="text-slate-400">/ 5.0</span>
            <span className="text-slate-400 font-normal">· {totalCount}+ reviews</span>
          </div>

          {/* Write A Review Trigger Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition duration-300 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <span>⭐ Share Feedback</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedRatingFilter('all')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
            selectedRatingFilter === 'all'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          All ({allReviews.length})
        </button>
        <button
          onClick={() => setSelectedRatingFilter(5)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
            selectedRatingFilter === 5
              ? 'bg-orange-500 text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          5 Stars Only ({allReviews.filter((r) => r.rating === 5).length})
        </button>
        {liveReviews.length > 0 && (
          <div className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-bold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {liveReviews.length} Live from Firebase
          </div>
        )}
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Featured Editorial Review Card */}
        {featured && (
          <div className="card-bouncy flex flex-col justify-between rounded-3xl border border-orange-200/90 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/30 p-7 shadow-sm transition duration-300 hover:border-orange-400 hover:shadow-md md:p-8 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between">
                <Stars count={featured.rating} />
                {featured.isUserSubmitted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 border border-orange-200 px-2.5 py-0.5 text-[10px] font-bold text-orange-700">
                    🔥 Live Review
                  </span>
                )}
              </div>

              <blockquote className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-slate-900 italic">
                "{featured.text}"
              </blockquote>
            </div>

            <div className="mt-7 flex items-center gap-3.5 border-t border-orange-100/80 pt-5">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-xs font-black text-white shadow-sm">
                {featured.avatar}
              </div>
              <div>
                <div className="font-heading text-sm font-black text-slate-900">
                  {featured.name}
                </div>
                <div className="text-xs text-slate-500">
                  {featured.city} · <span className="text-orange-600 font-bold">{featured.car}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2x2 or dynamic grid of regular reviews */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {displayedRest.map((t, idx) => (
            <div
              key={t.id || `${t.name}-${idx}`}
              className="card-bouncy flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition duration-300 hover:border-orange-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars count={t.rating} />
                  {t.isUserSubmitted ? (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      ✓ Real Driver
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">Verified Rental</span>
                  )}
                </div>
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-700">"{t.text}"</p>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-3.5">
                <div className="flex size-8.5 items-center justify-center rounded-xl bg-orange-100/90 text-[11px] font-black text-orange-600">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading text-xs font-bold text-slate-900 truncate">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {t.city} · <span className="text-orange-600 font-semibold">{t.car}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand More Reviews Button if many reviews */}
      {restReviews.length > 4 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-orange-400 hover:text-orange-600 transition cursor-pointer"
          >
            <span>{showAll ? 'Show Less' : `View All ${totalCount} Reviews`}</span>
            <svg
              className={`size-3.5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
