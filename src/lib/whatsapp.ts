import { OWNER_WHATSAPP_NUMBER } from '../config'
import { formatShortDate } from './dates'

export type WhatsAppBookingParams = {
  carName: string
  bookingType: 'daily' | 'hourly'
  pickupDateISO: string
  returnDateISO?: string
  pickupTime?: string
  returnTime?: string
  hours?: number
  userName: string
  phone: string
  purpose?: string
}

export function buildWhatsAppBookingMessage(p: WhatsAppBookingParams) {
  const lines: string[] = [
    `🚗 *Car Booking Inquiry*`,
    ``,
    `*Car:* ${p.carName}`,
    `*Booking Type:* ${p.bookingType === 'hourly' ? 'Hourly Rental' : 'Daily Rental'}`,
  ]

  if (p.bookingType === 'hourly') {
    lines.push(`*Date:* ${formatShortDate(p.pickupDateISO)}`)
    lines.push(`*Pickup Time:* ${p.pickupTime ?? '—'}`)
    lines.push(`*Return Time:* ${p.returnTime ?? '—'}`)
    if (p.hours) lines.push(`*Duration:* ${p.hours} hour(s)`)
  } else {
    lines.push(`*Pickup:* ${formatShortDate(p.pickupDateISO)}${p.pickupTime ? ` at ${p.pickupTime}` : ''}`)
    if (p.returnDateISO) lines.push(`*Return:* ${formatShortDate(p.returnDateISO)}${p.returnTime ? ` at ${p.returnTime}` : ''}`)
  }

  if (p.purpose) lines.push(`*Purpose:* ${p.purpose}`)

  lines.push(``)
  lines.push(`*Name:* ${p.userName}`)
  lines.push(`*Phone:* ${p.phone}`)
  lines.push(``)
  lines.push(`Please confirm availability. Thank you!`)

  return lines.join('\n')
}

export function buildWhatsAppLink(message: string, ownerNumber = OWNER_WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${ownerNumber}?text=${encoded}`
}

