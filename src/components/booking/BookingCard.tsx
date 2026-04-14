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
  'Local Use',
  'Wedding / Ceremony',
  'Airport Transfer',
  'Road Trip',
  'Corporate / Office',
  'Event / Party',
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

  // ── Derived values ──────────────────────────────────────────────
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

  const hourlyRatePerHour = Math.round(car.pricePerDay / 8) // approx hourly rate
  const hourlyTotal = hourlyHours * hourlyRatePerHour

  // Validity
  const detailsOk = name.trim().length >= 2 && phone.trim().length >= 7

  const canBook =
    detailsOk &&
    (bookingType === 'daily'
      ? dailyAvailability?.ok === true
      : hourlyDateISO !== '' && hourlyHours > 0)

  // ── Submit ──────────────────────────────────────────────────────
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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-5">
        <div>
          <div className="text-base font-bold text-slate-900">Send Booking Inquiry</div>
          <div className="mt-0.5 text-xs text-slate-500">Fill details → send to owner via WhatsApp</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-black text-orange-600">₹{car.pricePerDay.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">per day</div>
        </div>
      </div>

      <div className="p-6 grid gap-6">

        {/* Step 1 — Booking type */}
        <div>
          <StepLabel step={1} label="Choose booking type" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <TypeButton
              active={bookingType === 'daily'}
              onClick={() => setBookingType('daily')}
              icon="📅"
              title="Daily Rental"
              sub="Multi-day / self drive"
            />
            <TypeButton
              active={bookingType === 'hourly'}
              onClick={() => setBookingType('hourly')}
              icon="🕐"
              title="Hourly Rental"
              sub="Local use / short trips"
            />
          </div>
        </div>

        {/* Step 2 — Date & time */}
        <div>
          <StepLabel step={2} label={bookingType === 'daily' ? 'Select pickup & return dates' : 'Select date & hours'} />

          {bookingType === 'daily' ? (
            <div className="mt-3 grid gap-3">
              {/* Calendar */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={[{ before: new Date() }, ...disabled]}
                  numberOfMonths={1}
                  classNames={{
                    months: 'flex flex-col',
                    month: 'w-full',
                    month_caption: 'flex items-center justify-between px-1 pb-3',
                    caption_label: 'text-sm font-bold text-slate-900',
                    nav: 'flex items-center gap-1',
                    button_previous: 'size-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center',
                    button_next: 'size-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center',
                    month_grid: 'w-full border-collapse',
                    weekdays: 'grid grid-cols-7 mb-1',
                    weekday: 'py-1.5 text-center text-[11px] font-semibold text-slate-400',
                    weeks: 'grid gap-0.5',
                    week: 'grid grid-cols-7',
                    day: 'p-0.5',
                    day_button: cn('size-9 w-full rounded-xl text-sm text-slate-700 hover:bg-orange-100 transition', 'aria-selected:font-bold'),
                    today: 'border border-orange-400 text-orange-600',
                    outside: 'opacity-30',
                    disabled: 'opacity-20 line-through cursor-not-allowed',
                    range_start: 'bg-orange-500 rounded-xl text-white',
                    range_end: 'bg-orange-500 rounded-xl text-white',
                    range_middle: 'bg-orange-100 text-orange-700 rounded-none',
                    selected: 'bg-orange-500 text-white rounded-xl',
                  }}
                />
                <div className="mt-2 flex gap-3 border-t border-slate-100 pt-2">
                  <LegendDot color="bg-orange-500" label="Selected" />
                  <LegendDot color="bg-slate-300" label="Booked" />
                  <LegendDot color="border border-orange-400" label="Today" />
                </div>
              </div>

              {/* Pickup / return date display */}
              <div className="grid grid-cols-2 gap-2">
                <DateDisplay label="Pickup date" value={pickupISO} placeholder="Select on calendar" />
                <DateDisplay label="Return date" value={returnISO} placeholder="Select on calendar" />
              </div>

              {/* Times */}
              <div className="grid grid-cols-2 gap-2">
                <TimeInput label="Pickup time" value={pickupTime} onChange={setPickupTime} />
                <TimeInput label="Return time" value={returnTime} onChange={setReturnTime} />
              </div>

              {/* Availability status */}
              <AvailabilityBadge
                availability={dailyAvailability}
                days={days}
                total={dailyTotal}
              />
            </div>
          ) : (
            /* Hourly mode */
            <div className="mt-3 grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <DayPicker
                  mode="single"
                  selected={hourlyDate}
                  onSelect={setHourlyDate}
                  disabled={[{ before: new Date() }]}
                  numberOfMonths={1}
                  classNames={{
                    months: 'flex flex-col',
                    month: 'w-full',
                    month_caption: 'flex items-center justify-between px-1 pb-3',
                    caption_label: 'text-sm font-bold text-slate-900',
                    nav: 'flex items-center gap-1',
                    button_previous: 'size-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center',
                    button_next: 'size-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center',
                    month_grid: 'w-full border-collapse',
                    weekdays: 'grid grid-cols-7 mb-1',
                    weekday: 'py-1.5 text-center text-[11px] font-semibold text-slate-400',
                    weeks: 'grid gap-0.5',
                    week: 'grid grid-cols-7',
                    day: 'p-0.5',
                    day_button: 'size-9 w-full rounded-xl text-sm text-slate-700 hover:bg-orange-100 transition',
                    today: 'border border-orange-400 text-orange-600',
                    outside: 'opacity-30',
                    disabled: 'opacity-20 cursor-not-allowed',
                    selected: 'bg-orange-500 text-white rounded-xl',
                  }}
                />
              </div>

              <DateDisplay label="Selected date" value={hourlyDateISO} placeholder="Pick a date above" />

              <div className="grid grid-cols-2 gap-2">
                <TimeInput label="Pickup time" value={hourlyPickup} onChange={setHourlyPickup} />
                <TimeInput label="Return time" value={hourlyReturn} onChange={setHourlyReturn} />
              </div>

              {/* Hourly summary */}
              <div className={cn(
                'rounded-xl border px-4 py-3 text-sm',
                hourlyHours > 0
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-400',
              )}>
                {hourlyHours > 0 ? (
                  <div className="flex items-center justify-between">
                    <span>⏱ {hourlyHours} hour{hourlyHours !== 1 ? 's' : ''}</span>
                    <span className="font-bold">≈ ₹{hourlyTotal.toLocaleString('en-IN')} est.</span>
                  </div>
                ) : (
                  'Select pickup & return time to see duration'
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                💡 Hourly rate ≈ ₹{hourlyRatePerHour.toLocaleString('en-IN')}/hr. Final price confirmed by owner.
              </div>
            </div>
          )}
        </div>

        {/* Step 3 — Purpose */}
        <div>
          <StepLabel step={3} label="Purpose of rental" />
          <div className="mt-3 flex flex-wrap gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p}
                onClick={() => setPurpose(purpose === p ? '' : p)}
                className={cn(
                  'rounded-xl border px-3 py-1.5 text-xs font-semibold transition',
                  purpose === p
                    ? 'border-orange-300 bg-orange-100 text-orange-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4 — Your details */}
        <div>
          <StepLabel step={4} label="Your details" />
          <div className="mt-3 grid gap-3">
            <FieldInput
              label="Full name"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={setName}
              autoComplete="name"
            />
            <FieldInput
              label="WhatsApp / Phone number"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
        </div>

        {/* Booking summary */}
        {canBook && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 grid gap-2 text-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Booking Summary</div>
            <SummaryRow label="Car" value={car.name} />
            <SummaryRow label="Type" value={bookingType === 'daily' ? 'Daily Rental' : 'Hourly Rental'} />
            {bookingType === 'daily' ? (
              <>
                <SummaryRow label="Pickup" value={`${pickupISO} at ${pickupTime}`} />
                <SummaryRow label="Return" value={`${returnISO} at ${returnTime}`} />
                <SummaryRow label="Duration" value={`${days} day${days !== 1 ? 's' : ''}`} />
                <SummaryRow label="Est. Total" value={`₹${dailyTotal.toLocaleString('en-IN')}`} highlight />
              </>
            ) : (
              <>
                <SummaryRow label="Date" value={hourlyDateISO} />
                <SummaryRow label="Pickup" value={hourlyPickup} />
                <SummaryRow label="Return" value={hourlyReturn} />
                <SummaryRow label="Duration" value={`${hourlyHours} hour${hourlyHours !== 1 ? 's' : ''}`} />
                <SummaryRow label="Est. Total" value={`₹${hourlyTotal.toLocaleString('en-IN')}`} highlight />
              </>
            )}
            {purpose && <SummaryRow label="Purpose" value={purpose} />}
            <SummaryRow label="Name" value={name} />
            <SummaryRow label="Phone" value={phone} />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={onSendInquiry}
          disabled={!canBook}
          className={cn(
            'flex h-13 w-full items-center justify-center gap-3 rounded-2xl text-sm font-bold transition',
            canBook
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/25 hover:opacity-90'
              : 'cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200',
          )}
        >
          {WHATSAPP_ICON}
          Send Inquiry via WhatsApp
        </button>

        {/* Footer note */}
        <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
          <svg className="size-3.5 mt-0.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          No online payment required. Owner will confirm your booking directly on WhatsApp.
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <span className={cn('size-2.5 rounded-full shrink-0', color)} />
      {label}
    </div>
  )
}

function StepLabel({ step, label }: { step: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-[11px] font-black text-white shadow-sm">
        {step}
      </div>
      <span className="text-sm font-bold text-slate-900">{label}</span>
    </div>
  )
}

function TypeButton({ active, onClick, icon, title, sub }: { active: boolean; onClick: () => void; icon: string; title: string; sub: string }) {
  return (
    <button onClick={onClick}
      className={cn('flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition',
        active ? 'border-orange-300 bg-orange-50 ring-1 ring-orange-300' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white',
      )}>
      <span className="text-xl">{icon}</span>
      <span className={cn('text-sm font-bold', active ? 'text-orange-600' : 'text-slate-900')}>{title}</span>
      <span className="text-[11px] text-slate-400">{sub}</span>
    </button>
  )
}

function DateDisplay({ label, value, placeholder }: { label: string; value: string; placeholder: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className={cn('mt-0.5 text-sm font-semibold', value ? 'text-slate-900' : 'text-slate-400')}>
        {value || placeholder}
      </div>
    </div>
  )
}

function TimeInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition" />
    </label>
  )
}

function FieldInput({ label, placeholder, value, onChange, autoComplete, inputMode }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete} inputMode={inputMode}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition" />
    </label>
  )
}

function AvailabilityBadge({ availability, days, total }: {
  availability: { ok: true; days: number } | { ok: false; reason: string } | null
  days: number; total: number
}) {
  if (!availability) {
    return <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">Select pickup & return dates to check availability</div>
  }
  if (availability.ok) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Available for {days} day{days !== 1 ? 's' : ''}
          </div>
          <div className="text-sm font-black text-slate-900">₹{total.toLocaleString('en-IN')}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
      <div className="flex items-center gap-2">
        <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        {availability.reason}
      </div>
    </div>
  )
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={cn('text-xs font-semibold', highlight ? 'text-orange-600' : 'text-slate-900')}>{value}</span>
    </div>
  )
}
