import { useState } from 'react'
import { format, differenceInHours, parse, isValid } from 'date-fns'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { OWNER_WHATSAPP_NUMBER } from '../../config'
import { validateAndPriceRange } from '../../lib/availability'
import { getBookedRangesForCar, saveBookingRequest } from '../../lib/bookingsStore'
import { cn } from '../../lib/cn'
import { exclusiveEndToInclusiveEnd, parseISODate } from '../../lib/dates'
import { buildWhatsAppBookingMessage, buildWhatsAppLink } from '../../lib/whatsapp'
import type { Car } from '../../types'

const PURPOSES = [
  'Self Drive',
  'Local Errands',
  'Wedding / Convoy',
  'Airport Pickup / Drop',
  'Weekend Road Trip',
  'Corporate Hire',
  'Event / Shoot',
  'Other',
]

const WHATSAPP_ICON = (
  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function BookingCard({ car }: { car: Car }) {
  const booked = getBookedRangesForCar(car.bookedDates, car.id)
  const disabled = booked.map((r) => ({
    from: parseISODate(r.start),
    to: exclusiveEndToInclusiveEnd(r.end),
  }))

  // Booking type
  const [bookingType, setBookingType] = useState<'daily' | 'hourly'>('daily')

  // Daily mode
  const [range, setRange] = useState<DateRange | undefined>()
  const [pickupTime, setPickupTime] = useState('10:00')
  const [returnTime, setReturnTime] = useState('10:00')

  // Hourly mode
  const [hourlyDate, setHourlyDate] = useState<Date | undefined>()
  const [hourlyPickup, setHourlyPickup] = useState('09:00')
  const [hourlyReturn, setHourlyReturn] = useState('11:00')

  // Common
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState('')

  // Derived values
  const pickupISO = range?.from ? format(range.from, 'yyyy-MM-dd') : ''
  const returnISO = range?.to ? format(range.to, 'yyyy-MM-dd') : ''
  const hourlyDateISO = hourlyDate ? format(hourlyDate, 'yyyy-MM-dd') : ''

  const dailyAvailability =
    bookingType === 'daily' && pickupISO && returnISO
      ? validateAndPriceRange({ start: pickupISO, end: returnISO }, booked)
      : null

  const days = dailyAvailability?.ok ? dailyAvailability.days : 0
  const dailyTotal = days > 0 ? days * car.pricePerDay : 0

  // Hourly hours calc
  const hourlyHours = (() => {
    if (!hourlyPickup || !hourlyReturn) return 0
    try {
      const base = new Date(2000, 0, 1)
      const from = parse(hourlyPickup, 'HH:mm', base)
      const to = parse(hourlyReturn, 'HH:mm', base)
      if (!isValid(from) || !isValid(to)) return 0
      const diff = differenceInHours(to, from)
      return diff > 0 ? diff : 0
    } catch {
      return 0
    }
  })()

  const hourlyRatePerHour = Math.round(car.pricePerDay / 8)
  const hourlyTotal = hourlyHours * hourlyRatePerHour

  // Validity
  const detailsOk = name.trim().length >= 2 && phone.trim().length >= 7

  const canBook =
    detailsOk &&
    (bookingType === 'daily'
      ? dailyAvailability?.ok === true
      : hourlyDateISO !== '' && hourlyHours > 0)

  function onSendInquiry() {
    if (!canBook) return

    const msg = buildWhatsAppBookingMessage({
      carName: car.name,
      bookingType,
      pickupDateISO: bookingType === 'daily' ? pickupISO : hourlyDateISO,
      returnDateISO: bookingType === 'daily' ? returnISO : undefined,
      pickupTime: bookingType === 'daily' ? pickupTime : hourlyPickup,
      returnTime: bookingType === 'daily' ? returnTime : hourlyReturn,
      hours: bookingType === 'hourly' ? hourlyHours : undefined,
      userName: name.trim(),
      phone: phone.trim(),
      purpose: purpose || undefined,
    })

    const link = buildWhatsAppLink(msg, OWNER_WHATSAPP_NUMBER)

    if (bookingType === 'daily') {
      saveBookingRequest({
        carId: car.id,
        name: name.trim(),
        phone: phone.trim(),
        pickupDate: pickupISO,
        returnDate: returnISO,
      })
    }

    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-colors duration-300">
      {/* ── CARD HEADER ── */}
      <div className="border-b border-orange-100 dark:border-slate-800 bg-gradient-to-br from-orange-50/90 via-white to-amber-50/50 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/30 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-200/80 dark:border-orange-800/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 mb-1">
              <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Instant Reservation</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Reserve {car.name}
            </h3>
          </div>
          <div className="text-right">
            <div className="font-heading text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              ₹{car.pricePerDay.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">/ day · Unlimited km</div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6">
        {/* ── STEP 1: DURATION TYPE TOGGLE ── */}
        <div>
          <StepHeader step="1" label="Select Rental Mode" />
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setBookingType('daily')}
              className={cn(
                'flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all duration-300 cursor-pointer',
                bookingType === 'daily'
                  ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 ring-2 ring-orange-500/25 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-orange-500" />
                <span className="font-heading text-xs sm:text-sm font-black text-slate-900 dark:text-white">Daily Self-Drive</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Road trips & outstation</span>
            </button>

            <button
              type="button"
              onClick={() => setBookingType('hourly')}
              className={cn(
                'flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all duration-300 cursor-pointer',
                bookingType === 'hourly'
                  ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 ring-2 ring-orange-500/25 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-500" />
                <span className="font-heading text-xs sm:text-sm font-black text-slate-900 dark:text-white">Hourly Rental</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Errands, events & shoots</span>
            </button>
          </div>
        </div>

        {/* ── STEP 2: DATES & CALENDAR ── */}
        <div>
          <StepHeader
            step="2"
            label={bookingType === 'daily' ? 'Select Pickup & Return Dates' : 'Select Date & Times'}
          />

          {bookingType === 'daily' ? (
            <div className="mt-2.5 grid gap-2.5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-3 shadow-inner">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={[{ before: new Date() }, ...disabled]}
                  numberOfMonths={1}
                  classNames={{
                    months: 'flex flex-col',
                    month: 'w-full',
                    month_caption: 'flex items-center justify-between px-2 pb-2.5',
                    caption_label: 'font-heading text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200',
                    nav: 'flex items-center gap-1',
                    button_previous: 'size-6.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-2xs cursor-pointer',
                    button_next: 'size-6.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-2xs cursor-pointer',
                    month_grid: 'w-full border-collapse',
                    weekdays: 'grid grid-cols-7 mb-1',
                    weekday: 'py-0.5 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider',
                    weeks: 'grid gap-1',
                    week: 'grid grid-cols-7',
                    day: 'p-0.5',
                  }}
                />

                <div className="mt-2.5 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-700/70 pt-2 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                    <span className="size-2 rounded-xs bg-orange-500" /> Selected
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-xs bg-slate-300 dark:bg-slate-600" /> Booked
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-xs border border-orange-400 bg-orange-100 dark:bg-orange-950/60" /> Today
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <DateBox label="Pickup Date" value={pickupISO} placeholder="Pick on calendar" />
                <DateBox label="Return Date" value={returnISO} placeholder="Pick on calendar" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <TimePicker label="Pickup Time" value={pickupTime} onChange={setPickupTime} />
                <TimePicker label="Return Time" value={returnTime} onChange={setReturnTime} />
              </div>

              <AvailabilityStatus availability={dailyAvailability} days={days} total={dailyTotal} />
            </div>
          ) : (
            <div className="mt-2.5 grid gap-2.5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-3 shadow-inner">
                <DayPicker
                  mode="single"
                  selected={hourlyDate}
                  onSelect={setHourlyDate}
                  disabled={[{ before: new Date() }]}
                  numberOfMonths={1}
                  classNames={{
                    months: 'flex flex-col',
                    month: 'w-full',
                    month_caption: 'flex items-center justify-between px-2 pb-2.5',
                    caption_label: 'font-heading text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200',
                    nav: 'flex items-center gap-1',
                    button_previous: 'size-6.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-2xs cursor-pointer',
                    button_next: 'size-6.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition shadow-2xs cursor-pointer',
                    month_grid: 'w-full border-collapse',
                    weekdays: 'grid grid-cols-7 mb-1',
                    weekday: 'py-0.5 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider',
                    weeks: 'grid gap-1',
                    week: 'grid grid-cols-7',
                    day: 'p-0.5',
                  }}
                />
              </div>

              <DateBox label="Selected Date" value={hourlyDateISO} placeholder="Pick on calendar" />

              <div className="grid grid-cols-2 gap-2">
                <TimePicker label="Pickup Time" value={hourlyPickup} onChange={setHourlyPickup} />
                <TimePicker label="Return Time" value={hourlyReturn} onChange={setHourlyReturn} />
              </div>

              <div
                className={cn(
                  'rounded-xl border p-3 text-xs',
                  hourlyHours > 0
                    ? 'border-emerald-500/30 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400',
                )}
              >
                {hourlyHours > 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Estimated: {hourlyHours} hour{hourlyHours !== 1 ? 's' : ''}</span>
                    <span className="font-heading font-black text-orange-600 dark:text-orange-400 text-sm sm:text-base">≈ ₹{hourlyTotal.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  'Select pickup and return time to calculate estimate.'
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── STEP 3: TRIP PURPOSE ── */}
        <div>
          <StepHeader step="3" label="Trip Purpose (Optional)" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PURPOSES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(purpose === p ? '' : p)}
                className={cn(
                  'rounded-xl border px-3 py-1 text-[11px] font-bold transition-all duration-200 cursor-pointer',
                  purpose === p
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 shadow-2xs ring-1 ring-orange-500/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-white dark:hover:bg-slate-750',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 4: CONTACT INFO ── */}
        <div>
          <StepHeader step="4" label="Your Contact Details" />
          <div className="mt-2 grid gap-2.5">
            <label className="grid gap-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Full Name</span>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="h-9.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </div>
            </label>

            <label className="grid gap-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">WhatsApp / Mobile Number</span>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <input
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  className="h-9.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </div>
            </label>
          </div>
        </div>

        {/* ── LIVE SUMMARY BREAKDOWN ── */}
        {canBook && (
          <div className="rounded-2xl border border-orange-300/80 dark:border-orange-800/60 bg-gradient-to-br from-orange-50/90 to-amber-50/90 dark:from-orange-950/40 dark:to-slate-900 p-4 shadow-sm">
            <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Reservation Summary
            </div>
            <div className="grid gap-1 text-xs">
              <SummaryItem label="Vehicle" value={car.name} />
              <SummaryItem label="Rental Mode" value={bookingType === 'daily' ? 'Daily Self-Drive' : 'Hourly Rental'} />
              {bookingType === 'daily' ? (
                <>
                  <SummaryItem label="Dates" value={`${pickupISO} → ${returnISO} (${days} days)`} />
                  <SummaryItem label="Times" value={`Pickup ${pickupTime} · Return ${returnTime}`} />
                  <SummaryItem label="Estimated Total" value={`₹${dailyTotal.toLocaleString('en-IN')}`} isTotal />
                </>
              ) : (
                <>
                  <SummaryItem label="Schedule" value={`${hourlyDateISO} (${hourlyPickup} to ${hourlyReturn})`} />
                  <SummaryItem label="Duration" value={`${hourlyHours} hours`} />
                  <SummaryItem label="Estimated Total" value={`₹${hourlyTotal.toLocaleString('en-IN')}`} isTotal />
                </>
              )}
              {purpose && <SummaryItem label="Trip Purpose" value={purpose} />}
              <SummaryItem label="Customer" value={`${name} (${phone})`} />
            </div>
          </div>
        )}

        {/* ── SEND INQUIRY BUTTON ── */}
        <button
          onClick={onSendInquiry}
          disabled={!canBook}
          className={cn(
            'flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-lg',
            canBook
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/30 hover:brightness-110 active:scale-95'
              : 'cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-700 shadow-none',
          )}
        >
          {WHATSAPP_ICON}
          <span>Send Inquiry on WhatsApp</span>
        </button>

        {/* Zero Advance Guarantee Info */}
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
          <svg className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span>Zero advance online. Pay directly upon vehicle inspection.</span>
        </div>
      </div>
    </div>
  )
}

function StepHeader({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-5.5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-black text-white shadow-xs shadow-orange-500/30">
        {step}
      </span>
      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{label}</span>
    </div>
  )
}

function DateBox({ label, value, placeholder }: { label: string; value: string; placeholder: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 transition focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/20">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</div>
      <div className={cn('mt-0.5 text-xs font-bold', value ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600')}>
        {value || placeholder}
      </div>
    </div>
  )
}

function TimePicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [h24, m] = (value || '12:00').split(':').map(Number)
  const isPM = h24 >= 12
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24
  const period = isPM ? 'PM' : 'AM'

  function update(newH12: number, newMin: number, newPeriod: string) {
    let h = newH12
    if (newPeriod === 'AM') {
      h = newH12 === 12 ? 0 : newH12
    } else {
      h = newH12 === 12 ? 12 : newH12 + 12
    }
    onChange(`${String(h).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`)
  }

  const selectClass =
    'h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-orange-500 focus:outline-none transition cursor-pointer'

  return (
    <div className="grid gap-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
      <div className="flex gap-1">
        <select value={h12} onChange={(e) => update(Number(e.target.value), m, period)} className={`${selectClass} flex-1`}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hr) => (
            <option key={hr} value={hr}>{hr}</option>
          ))}
        </select>
        <select value={m} onChange={(e) => update(h12, Number(e.target.value), period)} className={`${selectClass} flex-1`}>
          {[0, 15, 30, 45].map((min) => (
            <option key={min} value={min}>{String(min).padStart(2, '0')}</option>
          ))}
        </select>
        <select value={period} onChange={(e) => update(h12, m, e.target.value)} className={`${selectClass} w-14`}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  )
}

function AvailabilityStatus({
  availability,
  days,
  total,
}: {
  availability: { ok: true; days: number } | { ok: false; reason: string } | null
  days: number
  total: number
}) {
  if (!availability) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 p-2.5 text-xs text-slate-500 dark:text-slate-400">
        Select pickup and return dates above to verify calendar availability.
      </div>
    )
  }

  if (availability.ok) {
    return (
      <div className="rounded-xl border border-emerald-500/30 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-950/40 p-3 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <svg className="size-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Available for {days} day{days !== 1 ? 's' : ''}
          </div>
          <div className="font-heading font-black text-slate-900 dark:text-white text-sm">₹{total.toLocaleString('en-IN')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs font-semibold text-rose-700 dark:text-rose-300">
      {availability.reason}
    </div>
  )
}

function SummaryItem({ label, value, isTotal }: { label: string; value: string; isTotal?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-orange-200/50 dark:border-orange-900/50 pb-1 last:border-0 last:pb-0">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className={cn(isTotal ? 'font-heading font-black text-orange-600 dark:text-orange-400 text-sm' : 'font-bold text-slate-900 dark:text-white')}>{value}</span>
    </div>
  )
}
