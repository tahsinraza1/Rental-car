import { useEffect, useState } from 'react'

export type SheetRow = Record<string, string | undefined> & {
  Car?: string
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
  const exactNameMatch = rows.find((row) => normalizeString(row.Car ?? '') === normalizedName)
  if (exactNameMatch) return exactNameMatch

  return rows.find((row) => {
    const rowName = normalizeString(row.Car ?? '')
    return rowName && (normalizedName.includes(rowName) || rowName.includes(normalizedName))
  })
}

export function lookupAvailability(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  return row?.Availability?.trim() ?? 'Available'
}

export function lookupPrice(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  const rawPrice = row ? (row['Price '] ?? row.Price ?? '') : ''
  const parsed = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : undefined
}

export function lookupSheetName(carId: string, carName: string, rows: SheetRow[]) {
  const row = lookupSheetRow(carId, carName, rows)
  const sheetCar = row?.Car?.trim()
  return sheetCar && sheetCar.length > 0 ? sheetCar : undefined
}

export function useSheetAvailability(pollIntervalMs = 30000) {
  const [rows, setRows] = useState<SheetRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const response = await fetch(SHEET_API_URL)
        if (!response.ok) throw new Error('Unable to fetch sheet data')
        const data = (await response.json()) as SheetRow[]
        if (!active) return
        setRows(Array.isArray(data) ? data : [])
        setError(false)
      } catch (err) {
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
