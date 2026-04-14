import { addDays, format, isValid, parseISO } from 'date-fns'

export function parseISODate(dateISO: string) {
  const d = parseISO(dateISO)
  if (!isValid(d)) throw new Error(`Invalid ISO date: ${dateISO}`)
  return d
}

export function formatShortDate(dateISO: string) {
  return format(parseISODate(dateISO), 'dd MMM yyyy')
}

/** Convert an exclusive end date to inclusive end-of-disabled range (end - 1 day). */
export function exclusiveEndToInclusiveEnd(endISOExclusive: string) {
  return addDays(parseISODate(endISOExclusive), -1)
}

