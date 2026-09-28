import { useEffect, useState } from 'react'

export type SheetRow = Record<string, string | undefined> & {
  Car?: string
  Cars?: string
  'Price '?: string
  Availability?: string
  id?: string
  ID?: string
  slug?: string
  Slug?: string
}

const SHEET_API_URL = 'https://opensheet.elk.sh/1CDDKB1_U47E4yQZ_vIRsd4ouC8PoPiMWfRYc1jF0tcM/Sheet1'

function normalizeString(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9_\- ]/g, '')
}

function getSheetRowId(row: SheetRow) {
  return row.id ?? row.ID ?? row.slug ?? row.Slug
}

function lookupSheetRow(carId: string, carName: string, rows: SheetRow[]) {
  const normalizedId = normalizeString(carId)
  if (normalizedId) {
    const idMatch = rows.find((row) => {
      const rowId = getSheetRowId(row)
      return rowId ? normalizeString(rowId) === normalizedId : false
    })
    if (idMatch) return idMatch
  }

  const normalizedName = normalizeString(carName)
  const exactNameMatch = rows.find((row) => normalizeString(row.Cars ?? row.Car ?? '') === normalizedName)
  if (exactNameMatch) return exactNameMatch

  return rows.find((row) => {
    const rowName = normalizeString(row.Cars ?? row.Car ?? '')
    return rowName && (normalizedName.includes(rowName) || rowName.includes(normalizedName))
  })
}

export function lookupAvailability(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  return row?.Availability?.trim() ?? 'Available'
}

export function isCarAvailable(availability?: string): boolean {
  if (!availability) return true
  const norm = availability.trim().toLowerCase()
  if (
    norm.includes('unavail') ||
    norm.includes('unabiable') ||
    norm.includes('book') ||
    norm.includes('not') ||
    norm.includes('busy') ||
    norm.includes('reserved') ||
    norm.includes('sold') ||
    norm === 'no' ||
    norm === 'false' ||
    norm === '0'
  ) {
    return false
  }
  return true
}

export function getCarStatusDisplay(availability?: string): { isAvailable: boolean; label: string } {
  const available = isCarAvailable(availability)
  return {
    isAvailable: available,
    label: available ? 'AVAILABLE' : 'BOOKED',
  }
}

export function lookupPrice(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  const rawPrice = row ? (row['Price '] ?? row.Price ?? '') : ''
  const parsed = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : undefined
}

export function lookupSheetName(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  const sheetCar = (row?.Cars ?? row?.Car)?.trim()
  return sheetCar && sheetCar.length > 0 ? sheetCar : undefined
}

let memoryCachedRows: SheetRow[] | null = null
let lastFetchTime = 0
const CACHE_TTL_MS = 45000 // 45 seconds cache
let ongoingPromise: Promise<SheetRow[]> | null = null

async function fetchSheetData(): Promise<SheetRow[]> {
  const now = Date.now()
  if (memoryCachedRows && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCachedRows
  }
  if (ongoingPromise) {
    return ongoingPromise
  }
  ongoingPromise = (async () => {
    try {
      const response = await fetch(SHEET_API_URL)
      if (!response.ok) throw new Error('Unable to fetch sheet data')
      const data = (await response.json()) as SheetRow[]
      const cleanData = Array.isArray(data) ? data : []
      memoryCachedRows = cleanData
      lastFetchTime = Date.now()
      return cleanData
    } finally {
      ongoingPromise = null
    }
  })()
  return ongoingPromise
}

export function useSheetAvailability(pollIntervalMs = 30000) {
  const [rows, setRows] = useState<SheetRow[]>(() => memoryCachedRows || [])
  const [loading, setLoading] = useState<boolean>(() => !memoryCachedRows)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = await fetchSheetData()
        if (!active) return
        setRows(data)
        setError(false)
      } catch {
        if (!active) return
        setError(true)
      } finally {
        if (!active) return
        setLoading(false)
      }
    }

    load()
    const intervalId = window.setInterval(load, pollIntervalMs)
    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [pollIntervalMs])

  return { rows, loading, error }
}
