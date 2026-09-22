import { useState, useId } from 'react'
import { addCustomerReview } from '../../services/reviewService'
import { VehicleCombobox } from '../ui/VehicleCombobox'
import { BookingMethodSelect } from '../ui/BookingMethodSelect'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const RATING_DESCRIPTIONS: Record<number, { label: string; emoji: string }> = {
  5: { label: 'Outstanding Experience!', emoji: '🤩' },
  4: { label: 'Very Good & Smooth Drive', emoji: '😊' },
  3: { label: 'Good Road Trip', emoji: '🙂' },
  2: { label: 'Fair Experience', emoji: '😐' },
  1: { label: 'Needs Improvement', emoji: '🙁' },
}

const QUICK_REVIEW_PERKS = [
  '🧼 Spotless & Sanitized Car',
  '⚡ 5-Min Handover',
  '💰 Zero Advance Trap',
  '🛣️ Smooth Highway Power',
  '📱 Quick WhatsApp Support',
]

export function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const nameId = useId()
  const cityId = useId()
  const phoneId = useId()
  const emailId = useId()
  const commentId = useId()

  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [car, setCar] = useState('Mahindra Thar')
  const [bookingMethod, setBookingMethod] = useState('WhatsApp')
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<{ name: string; car: string; rating: number; bookingMethod: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const activeRating = hoverRating || rating

  function handleQuickPerkClick(perk: string) {
    if (text.includes(perk)) {
      setText(text.replace(perk, '').replace(/,\s*,/g, ',').trim())
    } else {
      setText(text ? `${text.trim()}, ${perk}` : perk)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setErrorMsg('Please enter your name')
      return
    }
    if (!text.trim() || text.trim().length < 5) {
      setErrorMsg('Please write a brief feedback message (at least 5 characters)')
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
        car: car || 'Self-Drive Fleet',
        rating,
        text: text.trim(),
        bookingMethod,
      })

      setIsSubmitting(false)
      setSubmittedData({
        name: name.trim(),
        car,
        rating,
        bookingMethod,
      })
      if (onSuccess) onSuccess()
    } catch (err: unknown) {
      console.error('Failed to submit review:', err)
      setIsSubmitting(false)
      const message = err instanceof Error ? err.message : 'Please check connection & Firebase permissions.'
      setErrorMsg(`Could not submit review: ${message}`)
    }
  }

  function handleResetAndClose() {
    setSubmittedData(null)
    setName('')
    setCity('')
    setPhone('')
    setEmail('')
    setText('')
    setRating(5)
    setBookingMethod('WhatsApp')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-orange-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl transition-all z-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
        >
          ✕
        </button>

        {submittedData ? (
          /* ── GLORIOUS THANK YOU SCREEN ── */
          <div className="py-6 sm:py-8 text-center animate-fade-in-up">
            <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-3xl text-white shadow-xl shadow-emerald-500/30">
              <span className="animate-bounce">✓</span>
              <span className="absolute -inset-1.5 rounded-full border-2 border-emerald-400/40 animate-ping opacity-75" />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Saved to Firebase Firestore
            </div>

            <h3 className="mt-3 font-heading text-2xl font-black text-slate-900 dark:text-white">
              Thank You for Your Feedback! 🎉
            </h3>

            <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Hi <strong className="text-slate-900 dark:text-white">{submittedData.name}</strong>, your review for <strong className="text-orange-600 dark:text-orange-400">{submittedData.car}</strong> (booked via <span className="text-slate-800 dark:text-slate-200 font-semibold">{submittedData.bookingMethod}</span>) has been received. Your honest feedback means the world to us!
            </p>

            <button
              onClick={handleResetAndClose}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-110 transition active:scale-98 cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* ── REVIEW FORM ── */
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
                <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
                Firebase Real-Time Feedback
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Rate Your <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Trip Experience</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Your genuine feedback helps fellow travelers and keeps our fleet top-rated.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 p-3 text-xs font-bold text-rose-700 dark:text-rose-300">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="rounded-2xl border border-orange-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 text-center">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Select Rating
                </label>
                <div className="flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <svg
                        className={`size-8 transition-colors ${
                          star <= activeRating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
                            : 'fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="mt-1 text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1.5">
                  <span>{RATING_DESCRIPTIONS[activeRating]?.emoji}</span>
                  <span>{RATING_DESCRIPTIONS[activeRating]?.label}</span>
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
                    placeholder="e.g. South Delhi, Noida 62"
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

              {/* Full Width Car You Rented Dropdown */}
              <div className="w-full">
                <VehicleCombobox
                  value={car}
                  onChange={(selectedCarName) => setCar(selectedCarName)}
                  label="Car You Rented"
                />
              </div>

              {/* How did you book with us? Dropdown */}
              <div className="w-full">
                <BookingMethodSelect
                  value={bookingMethod}
                  onChange={(method) => setBookingMethod(method)}
                  label="How did you book with us?"
                />
              </div>

              {/* Quick Tags */}
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

              {/* Review Text */}
              <div>
                <label htmlFor={commentId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  id={commentId}
                  rows={3}
                  required
                  placeholder="Share details about car cleanliness, pickup/handover, fuel efficiency, or WhatsApp communication..."
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
    </div>
  )
}
