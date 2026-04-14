export type DateRangeISO = {
  /** Pickup date (inclusive), in `YYYY-MM-DD` */
  start: string
  /**
   * Return date (exclusive), in `YYYY-MM-DD`.
   * Example: start=2026-04-10, end=2026-04-12 means 2 rental days (10→11, 11→12).
   */
  end: string
}

export type Car = {
  id: string
  name: string
  city: string
  pricePerDay: number
  images: string[]
  seats: number
  transmission: 'Manual' | 'Automatic'
  fuel: 'Petrol' | 'Diesel' | 'EV' | 'Hybrid'
  bookedDates: DateRangeISO[]
  description?: string
  features?: string[]
  mileage?: string
  engineCC?: string
  year?: number
}

export type BookingDraft = {
  carId: string
  name: string
  phone: string
  pickupDate: string // YYYY-MM-DD
  returnDate: string // YYYY-MM-DD (exclusive)
}

