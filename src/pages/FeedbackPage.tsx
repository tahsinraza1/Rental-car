import { useState, useEffect, useMemo, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { subscribeToReviews, addCustomerReview, type CustomerReview } from '../services/reviewService'
import { VehicleCombobox } from '../components/ui/VehicleCombobox'
import { BookingMethodSelect } from '../components/ui/BookingMethodSelect'
import { SortSelect, type SortOptionId } from '../components/ui/SortSelect'

import cretaImg from '../assets/cars/creta.jpg'
import glanzaImg from '../assets/cars/glanza.webp'
import safariImg from '../assets/cars/safari.jpg'
import scorpioNImg from '../assets/cars/scorpio-n.jpg'
import tharImg from '../assets/cars/thar.jpg'
import balenoImg from '../assets/cars/baleno.jpg'
import punchImg from '../assets/cars/punch.jpg'
import heroBg from '../assets/contact-hero-bg.png'

interface CuratedReview extends CustomerReview {
  carImg?: string
  avatarImg?: string
  isFeatured?: boolean
}

const initialCuratedReviews: CuratedReview[] = [
  {
    id: 'curated-1',
    name: 'Rahul Sharma',
    city: 'South Delhi',
    phone: '+91 98112 45890',
    email: 'rahul.s@gmail.com',
    car: 'Hyundai Creta',
    rating: 5,
    text: 'Booked a Hyundai Creta for a weekend trip to Jaipur. The WhatsApp booking was super smooth — owner confirmed within 10 minutes. Sparkling clean car, full tank. Will definitely use again!',
    bookingMethod: 'WhatsApp',
    avatar: 'RS',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    carImg: cretaImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-03-15'),
  },
  {
    id: 'curated-2',
    name: 'Priya Nair',
    city: 'Noida Sector 62',
    phone: '+91 98731 29481',
    email: 'priya.nair@outlook.com',
    car: 'Toyota Glanza',
    rating: 5,
    text: 'Loved the real-time availability calendar. No back-and-forth calls needed. Just picked dates, sent on WhatsApp, and got the keys next morning without any upfront deposit trap.',
    bookingMethod: 'WhatsApp',
    avatar: 'PN',
    avatarImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    carImg: glanzaImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-03-12'),
  },
  {
    id: 'curated-3',
    name: 'Arjun Mehta',
    city: 'Jasola Vihar, Delhi',
    phone: '+91 99100 83721',
    email: 'arjun.mehta@yahoo.com',
    car: 'Toyota Innova Crysta',
    rating: 5,
    text: 'Rented the Innova Crysta for an outstation family wedding in Agra. Spotless car, fair price, and the owner was very polite and transparent about everything. Highly recommended!',
    bookingMethod: 'Phone Call',
    avatar: 'AM',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    carImg: safariImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-03-08'),
  },
  {
    id: 'curated-4',
    name: 'Vikram Singh',
    city: 'Dwarka, Delhi',
    phone: '+91 98188 56214',
    email: 'vikram.singh@gmail.com',
    car: 'Mahindra Scorpio-N',
    rating: 5,
    text: 'Transparent pricing, no hidden fees. The Scorpio-N handled the mountain terrain like a beast. Direct owner contact meant quick coordination and total peace of mind.',
    bookingMethod: 'Direct/Offline',
    avatar: 'VS',
    avatarImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    carImg: scorpioNImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-03-05'),
  },
  {
    id: 'curated-5',
    name: 'Sneha Patel',
    city: 'Noida Sector 18',
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
    createdAt: new Date('2026-02-28'),
  },
  {
    id: 'curated-6',
    name: 'Ananya Reddy',
    city: 'Greater Noida',
    phone: '+91 98991 76230',
    email: 'ananya.reddy@gmail.com',
    car: 'Maruti Baleno',
    rating: 5,
    text: 'Super easy paperwork, zero advance trap, and great fuel mileage for city commute. By far the easiest self-drive rental I have used in Delhi NCR.',
    bookingMethod: 'WhatsApp',
    avatar: 'AR',
    avatarImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    carImg: balenoImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-02-20'),
  },
  {
    id: 'curated-7',
    name: 'Karan Malhotra',
    city: 'Saket, Delhi',
    phone: '+91 98104 55198',
    email: 'karan.m@gmail.com',
    car: 'Tata Punch',
    rating: 5,
    text: 'Smooth city drive, easy handover paperwork, and zero hidden charges at return. By far the easiest self-drive car rental service.',
    bookingMethod: 'Phone Call',
    avatar: 'KM',
    avatarImg: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    carImg: punchImg,
    isUserSubmitted: false,
    createdAt: new Date('2026-02-15'),
  },
]

const QUICK_REVIEW_PERKS = [
  '🧼 Spotless & Sanitized Car',
  '⚡ 5-Min Handover',
  '💰 Zero Advance Trap',
  '🛣️ Smooth Highway Power',
  '📱 Quick WhatsApp Support',
]

const RATING_MOODS: Record<number, { label: string; emoji: string; color: string }> = {
  5: { label: 'Outstanding Experience!', emoji: '🤩', color: 'text-amber-500' },
  4: { label: 'Very Good & Smooth Drive', emoji: '😊', color: 'text-orange-500' },
  3: { label: 'Good Road Trip', emoji: '🙂', color: 'text-yellow-600' },
  2: { label: 'Fair Experience', emoji: '😐', color: 'text-slate-500' },
  1: { label: 'Needs Improvement', emoji: '🙁', color: 'text-rose-500' },
}

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

function formatReviewDate(createdAt?: Date | string | { toDate?: () => Date; seconds?: number }): string {
  if (!createdAt) return 'Recent'
  try {
    let date: Date
    if (typeof createdAt === 'object' && 'toDate' in createdAt && typeof createdAt.toDate === 'function') {
      date = createdAt.toDate()
    } else if (typeof createdAt === 'object' && 'seconds' in createdAt && typeof createdAt.seconds === 'number') {
      date = new Date(createdAt.seconds * 1000)
    } else {
      date = new Date(createdAt as string | Date)
    }
    if (isNaN(date.getTime())) return 'Recent'
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'Recent'
  }
}

export function FeedbackPage() {
  const nameId = useId()
  const cityId = useId()
  const phoneId = useId()
  const emailId = useId()
  const textId = useId()

  const reviewsFeedRef = useRef<HTMLDivElement>(null)

  const [liveReviews, setLiveReviews] = useState<CustomerReview[]>([])
  const [filterRating, setFilterRating] = useState<number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOptionId>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({})

  const REVIEWS_PER_PAGE = 6

  // Form State
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCar, setSelectedCar] = useState('Mahindra Thar')
  const [bookingMethod, setBookingMethod] = useState('WhatsApp')
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedReview, setSubmittedReview] = useState<{
    name: string
    car: string
    rating: number
    city: string
    bookingMethod?: string
  } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Subscribe to Firebase Firestore real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToReviews((reviews) => {
      setLiveReviews(reviews)
    })
    return () => unsubscribe()
  }, [])

  // Combine live reviews + curated fallback reviews
  const allReviews: CuratedReview[] = useMemo(() => {
    const formattedLive: CuratedReview[] = liveReviews.map((r) => ({
      ...r,
      carImg: tharImg,
      isFeatured: false,
    }))
    return [...formattedLive, ...initialCuratedReviews]
  }, [liveReviews])

  // Filter and Search with Sorting
  const sortedAndFiltered = useMemo(() => {
    let list = [...allReviews]
    if (filterRating !== 'all') {
      list = list.filter((r) => r.rating >= filterRating)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.car.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q) ||
          (r.phone && r.phone.toLowerCase().includes(q)) ||
          (r.email && r.email.toLowerCase().includes(q)) ||
          (r.bookingMethod && r.bookingMethod.toLowerCase().includes(q))
      )
    }

    // Sort order
    list.sort((a, b) => {
      if (sortBy === 'highest') {
        return (b.rating || 5) - (a.rating || 5)
      }
      if (sortBy === 'oldest') {
        const timeA = a.createdAt ? new Date(a.createdAt as string | Date).getTime() : 0
        const timeB = b.createdAt ? new Date(b.createdAt as string | Date).getTime() : 0
        return timeA - timeB
      }
      // 'newest'
      const isLiveA = a.isUserSubmitted ? 1 : 0
      const isLiveB = b.isUserSubmitted ? 1 : 0
      if (isLiveA !== isLiveB) return isLiveB - isLiveA
      const timeA = a.createdAt ? new Date(a.createdAt as string | Date).getTime() : 0
      const timeB = b.createdAt ? new Date(b.createdAt as string | Date).getTime() : 0
      return timeB - timeA
    })

    return list
  }, [allReviews, filterRating, searchQuery, sortBy])

  // Reset current page when filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterRating, sortBy])

  const totalPages = Math.max(1, Math.ceil(sortedAndFiltered.length / REVIEWS_PER_PAGE))
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE
    return sortedAndFiltered.slice(start, start + REVIEWS_PER_PAGE)
  }, [sortedAndFiltered, currentPage])

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    reviewsFeedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleReviewExpand(id: string) {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Aggregate stats
  const totalCount = allReviews.length
  const avgRating = (
    allReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / (totalCount || 1)
  ).toFixed(1)

  const activeRating = hoverRating || rating

  function handleQuickPerkClick(perk: string) {
    if (text.includes(perk)) {
      setText(text.replace(perk, '').replace(/,\s*,/g, ',').trim())
    } else {
      setText(text ? `${text.trim()}, ${perk}` : perk)
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!text.trim() || text.trim().length < 5) {
      setErrorMsg('Please enter at least 5 characters for your review.')
      return
    }

    setErrorMsg('')
    setIsSubmitting(true)

    try {
      await addCustomerReview({
        name: name.trim(),
        city: city.trim() || 'Delhi NCR',
        phone: phone.trim(),
        email: email.trim(),
        car: selectedCar || 'Self-Drive Fleet',
        rating,
        text: text.trim(),
        bookingMethod,
      })

      setIsSubmitting(false)
      setSubmittedReview({
        name: name.trim(),
        car: selectedCar,
        rating,
        city: city.trim() || 'Delhi NCR',
        bookingMethod,
      })
      setName('')
      setCity('')
      setPhone('')
      setEmail('')
      setText('')
      setRating(5)
      setBookingMethod('WhatsApp')
    } catch (err: unknown) {
      console.error('Failed to submit feedback:', err)
      setIsSubmitting(false)
      const message = err instanceof Error ? err.message : 'Please check connection & Firebase permissions.'
      setErrorMsg(`Submission failed: ${message}`)
    }
  }

  return (
    <div className="grid gap-10">
      {/* ── PAGE HERO HEADER WITH SCENIC ROAD TRIP BACKGROUND ── */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-800 bg-cover bg-right sm:bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Rich dark gradient overlays ensuring crystal clear text readability while showcasing the scenic car */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/75 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/25" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-950/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-orange-200 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
            ⭐ 100% Genuine Driver Reviews
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
            Customer Feedback &{' '}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-medium drop-shadow-xs">
            Read transparent, unfiltered experiences from customers who rented our self-drive cars in Delhi & Noida. Your honest feedback helps us keep our fleet exceptional!
          </p>
        </div>
      </div>

      {/* ── TRUST STATS PILLS ROW ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Overall Rating', val: `★ ${avgRating}`, highlight: 'text-amber-500', icon: '⭐' },
          { label: '5-Star Trips', val: '98%', highlight: 'text-emerald-600 dark:text-emerald-400', icon: '🏆' },
          { label: 'Verified Renters', val: `${totalCount}+`, highlight: 'text-orange-600 dark:text-orange-400', icon: '👥' },
          { label: 'Advance Required', val: '0%', highlight: 'text-rose-600 dark:text-rose-400', icon: '🛡️' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-lg">
              {stat.icon}
            </div>
            <div>
              <div className={`font-heading text-xl font-black ${stat.highlight}`}>
                {stat.val}
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN 2-COLUMN LAYOUT: FORM (LEFT) + REVIEWS FEED (RIGHT) ── */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* ── LEFT COLUMN: SUBMIT FEEDBACK FORM (5 Cols, Sticky on Desktop) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-3xl border border-orange-200/90 dark:border-slate-800 bg-gradient-to-b from-orange-50/60 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-6 sm:p-8 shadow-xl">
          {submittedReview ? (
            /* ── THANK YOU CELEBRATION SCREEN ── */
            <div className="py-8 text-center animate-fade-in-up">
              <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-3xl text-white shadow-xl shadow-emerald-500/30">
                <span className="animate-bounce">✓</span>
                <span className="absolute -inset-1.5 rounded-full border-2 border-emerald-400/40 animate-ping opacity-75" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Saved to Firebase Firestore
              </div>

              <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                Thank You for Your Feedback! 🎉
              </h3>

              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Hi <strong className="text-slate-900 dark:text-white">{submittedReview.name}</strong>, your review for <strong className="text-orange-600 dark:text-orange-400">{submittedReview.car}</strong> has been received. Your honest rating helps fellow drivers book with peace of mind!
              </p>

              {/* Submitted Details Box */}
              <div className="mt-5 rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 p-4 text-left shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Your Rating:</span>
                  <StarRating count={submittedReview.rating} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Location:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{submittedReview.city}</span>
                </div>
                {submittedReview.bookingMethod && (
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Booked Via:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{submittedReview.bookingMethod}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Status:</span>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-700/50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                    ⏳ Saved & Live Sync Active
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setSubmittedReview(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-orange-300 dark:border-orange-500/40 bg-white dark:bg-slate-800 px-5 py-2.5 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs hover:bg-orange-50 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <span>✍️ Submit Another Review</span>
                </button>
                <Link
                  to="/cars"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-110 transition active:scale-98"
                >
                  <span>🚗 Explore Fleet</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ── WRITE FEEDBACK FORM ── */
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    Share Your Experience
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Rate Your Road Trip
                  </h2>
                </div>
                <div className="flex size-10 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold text-lg shadow-2xs">
                  ✍️
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 p-3 text-xs font-bold text-rose-700 dark:text-rose-300">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Star Rating Interactive Selector */}
                <div className="rounded-2xl border border-orange-200/90 dark:border-slate-800 bg-white dark:bg-slate-800 p-4 text-center shadow-xs">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Select Your Rating
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform duration-200 hover:scale-130 active:scale-90 focus:outline-none cursor-pointer"
                      >
                        <svg
                          className={`size-8 sm:size-9 transition-colors ${
                            star <= activeRating
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]'
                              : 'fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <div className={`mt-2 text-xs font-bold ${RATING_MOODS[activeRating]?.color} flex items-center justify-center gap-1.5`}>
                    <span>{RATING_MOODS[activeRating]?.emoji}</span>
                    <span>{RATING_MOODS[activeRating]?.label}</span>
                  </div>
                </div>

                {/* Name & Phone Number (Row 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                      <span>Phone Number</span>
                      <span className="text-[10px] font-normal text-slate-400">Optional</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
                        📞
                      </span>
                      <input
                        id={phoneId}
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* City & Email (Row 2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={cityId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      City / Area
                    </label>
                    <input
                      id={cityId}
                      type="text"
                      placeholder="e.g. South Delhi, Noida"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor={emailId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                      <span>Email Address</span>
                      <span className="text-[10px] font-normal text-slate-400">Optional</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
                        ✉️
                      </span>
                      <input
                        id={emailId}
                        type="email"
                        placeholder="e.g. rahul@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8 pr-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Width Car Selection Dropdown */}
                <div className="w-full">
                  <VehicleCombobox
                    value={selectedCar}
                    onChange={(carName) => setSelectedCar(carName)}
                    label="Car You Rented"
                  />
                </div>

                {/* Full Width How did you book with us? Dropdown */}
                <div className="w-full">
                  <BookingMethodSelect
                    value={bookingMethod}
                    onChange={(method) => setBookingMethod(method)}
                    label="How did you book with us?"
                  />
                </div>

                {/* 1-Tap Quick Perks Chips */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    Quick Highlight Tags (1-Tap):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_REVIEW_PERKS.map((perk) => {
                      const isSelected = text.includes(perk)
                      return (
                        <button
                          key={perk}
                          type="button"
                          onClick={() => handleQuickPerkClick(perk)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                            isSelected
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400'
                          }`}
                        >
                          {perk}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Review Message Textarea */}
                <div>
                  <label htmlFor={textId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Review / Feedback *
                  </label>
                  <textarea
                    id={textId}
                    rows={4}
                    required
                    placeholder="Describe vehicle cleanliness, pickup/handover speed, fuel economy, or owner support..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition duration-300 hover:brightness-110 active:scale-98 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="size-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Saving to Firebase...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: ALL CUSTOMER REVIEWS WALL (7 Cols with Smart Pagination) ── */}
        <div ref={reviewsFeedRef} className="lg:col-span-7 space-y-4">
          
          {/* Controls Bar: Search + Filter Pills + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
            {/* Search Input */}
            <div className="relative min-w-0 flex-1">
              <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, car, city or text..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 pl-9 pr-8 py-1.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold p-1 cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Rating Filter Pills & Sort Selector */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setFilterRating('all')}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    filterRating === 'all'
                      ? 'bg-orange-500 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All ({allReviews.length})
                </button>
                <button
                  onClick={() => setFilterRating(5)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    filterRating === 5
                      ? 'bg-orange-500 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ⭐ 5 Stars ({allReviews.filter((r) => r.rating === 5).length})
                </button>
              </div>

              {/* Custom Luxury Sort Dropdown */}
              <SortSelect value={sortBy} onChange={(val) => setSortBy(val)} />
            </div>
          </div>

          {/* Quick Counter Strip */}
          <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>
              Showing {sortedAndFiltered.length === 0 ? 0 : (currentPage - 1) * REVIEWS_PER_PAGE + 1}–{Math.min(currentPage * REVIEWS_PER_PAGE, sortedAndFiltered.length)} of {sortedAndFiltered.length} verified reviews
            </span>
            {sortedAndFiltered.length > REVIEWS_PER_PAGE && (
              <span className="text-orange-600 dark:text-orange-400 font-bold">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          {/* Empty State when no results match */}
          {sortedAndFiltered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center shadow-xs">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-2xl text-orange-500 mb-3">
                🔍
              </div>
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                No matching reviews found
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium">
                We couldn't find any feedback matching your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterRating('all')
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition cursor-pointer"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            /* Reviews Grid of Compact, Consistent Bouncy Cards */
            <div className="grid gap-4 sm:grid-cols-2">
              {paginatedReviews.map((r, i) => {
                const isExpanded = !!expandedReviews[r.id || `${r.name}-${i}`]
                const reviewId = r.id || `${r.name}-${i}`
                const isLongText = r.text && r.text.length > 130

                return (
                  <div
                    key={reviewId}
                    className="card-review-animated group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-850 p-5 shadow-xs transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-xl overflow-hidden"
                  >
                    {/* Decorative Soft Watermark Quote */}
                    <div className="quote-watermark pointer-events-none absolute right-3.5 top-2 select-none font-serif text-4xl sm:text-5xl font-black text-slate-100/90 dark:text-slate-800/40 leading-none">
                      ”
                    </div>

                    <div>
                      {/* Rating & Badges Header */}
                      <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
                        <div className="star-glow">
                          <StarRating count={r.rating} />
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 justify-end">
                          {r.bookingMethod && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                              {r.bookingMethod === 'WhatsApp' ? '💬' : r.bookingMethod === 'Phone Call' ? '📞' : r.bookingMethod === 'Direct/Offline' ? '🏢' : '🌐'} {r.bookingMethod}
                            </span>
                          )}
                          {r.isUserSubmitted ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 px-2 py-0.5 text-[10px] font-bold text-orange-700 dark:text-orange-300 shadow-2xs">
                              🔥 Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 shadow-2xs">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Review Text with Read More Toggle */}
                      <p className={`text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic relative z-10 ${
                        !isExpanded && isLongText ? 'line-clamp-3' : ''
                      }`}>
                        “{r.text}”
                      </p>

                      {isLongText && (
                        <button
                          type="button"
                          onClick={() => toggleReviewExpand(reviewId)}
                          className="mt-1 text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition cursor-pointer relative z-10 inline-block"
                        >
                          {isExpanded ? 'Show less ↑' : 'Read more... ↓'}
                        </button>
                      )}
                    </div>

                    {/* Author & Car Info Footer */}
                    <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-start justify-between gap-2 relative z-10">
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        {r.avatarImg ? (
                          <img
                            src={r.avatarImg}
                            alt={r.name}
                            className="size-9 rounded-full object-cover border-2 border-orange-200 dark:border-orange-500/50 shadow-2xs shrink-0 transition-transform group-hover:scale-110 mt-0.5"
                          />
                        ) : (
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-[11px] font-black text-white shadow-2xs transition-transform group-hover:scale-110 mt-0.5">
                            {r.avatar}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-heading text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition truncate">
                            {r.name}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="truncate">📍 {r.city}</span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[10.5px] text-slate-400 font-medium">
                              {formatReviewDate(r.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="rounded-lg bg-slate-100/90 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 px-2.5 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px] shrink-0">
                        {r.car}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── CLEAN PAGINATION CONTROLS BAR ── */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of <strong className="text-slate-900 dark:text-white">{totalPages}</strong>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>←</span>
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1
                  const isCurrent = pageNum === currentPage
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`size-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
