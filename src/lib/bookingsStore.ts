import type { BookingDraft, DateRangeISO } from '../types'

type StoredBooking = BookingDraft & { createdAt: string }

const KEY = 'rentalcar.bookingRequests.v1'

export function saveBookingRequest(draft: BookingDraft) {
  const all = loadBookingRequests()
  const next: StoredBooking = { ...draft, createdAt: new Date().toISOString() }
  all.unshift(next)
  localStorage.setItem(KEY, JSON.stringify(all))
  return next
}

export function loadBookingRequests(): StoredBooking[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as StoredBooking[]
  } catch {
    return []
  }
}

export function getBookedRangesForCar(
  carBooked: DateRangeISO[],
  carId: string,
): DateRangeISO[] {
  // Only consider confirmed bookings in DB for blocking.
  // Booking requests are saved for admin visibility, but should not block dates until owner confirms.
  // If you want to block pending requests too, merge them here.
  void carId
  return carBooked
}

