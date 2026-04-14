import { differenceInCalendarDays, isBefore, isEqual } from 'date-fns'
import type { DateRangeISO } from '../types'
import { parseISODate } from './dates'

export type AvailabilityResult =
  | { ok: true; days: number }
  | { ok: false; reason: string }

/**
 * Rental overlap rule (end is exclusive):
 * overlap when (newStart < existingEnd) AND (newEnd > existingStart)
 */
export function isRangeAvailable(
  range: DateRangeISO,
  booked: DateRangeISO[],
) {
  const newStart = parseISODate(range.start)
  const newEnd = parseISODate(range.end)

  for (const b of booked) {
    const existingStart = parseISODate(b.start)
    const existingEnd = parseISODate(b.end)

    if (newStart < existingEnd && newEnd > existingStart) return false
  }

  return true
}

export function validateAndPriceRange(
  range: DateRangeISO,
  booked: DateRangeISO[],
): AvailabilityResult {
  const start = parseISODate(range.start)
  const end = parseISODate(range.end)

  if (!isValidISO(range.start) || !isValidISO(range.end)) {
    return { ok: false, reason: 'Please select valid dates.' }
  }

  if (isEqual(start, end) || isBefore(end, start)) {
    return { ok: false, reason: 'Return date must be after pickup date.' }
  }

  const days = differenceInCalendarDays(end, start)
  if (days <= 0) return { ok: false, reason: 'Invalid rental duration.' }

  if (!isRangeAvailable(range, booked)) {
    return { ok: false, reason: 'Selected dates overlap an existing booking.' }
  }

  return { ok: true, days }
}

function isValidISO(s: string) {
  try {
    parseISODate(s)
    return true
  } catch {
    return false
  }
}

