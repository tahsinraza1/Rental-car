import type { Car } from '../types'

import punchImg from '../assets/cars/punch.jpg'
import glanzaImg from '../assets/cars/glanza.webp'
import balenoImg from '../assets/cars/baleno.jpg'
import fronxImg from '../assets/cars/fronx.jpg'
import swiftImg from '../assets/cars/swift.jpg'
import altrozImg from '../assets/cars/altroz.jpg'
import tharImg from '../assets/cars/thar.jpg'
import jimnyImg from '../assets/cars/jimny.jpg'
import scorpioClassicImg from '../assets/cars/scorpio-classic.jpg'
import safariImg from '../assets/cars/safari.jpg'
import tharRoxxImg from '../assets/cars/thar-roxx.jpg'
import scorpioNImg from '../assets/cars/scorpio-n.jpg'
import brezzaImg from '../assets/cars/brezza.jpg'
import grandVitaraImg from '../assets/cars/grand-vitara.jpg'

export const cars: Car[] = [
  // ── Budget Segment ─────────────────────────────────────
  {
    id: 'punch',
    name: 'Tata Punch',
    city: 'Delhi',
    pricePerDay: 2000,
    images: [punchImg],
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1199 cc',
    mileage: '18.97 km/l',
    description:
      'The Tata Punch is a micro-SUV that combines SUV styling with city-friendly dimensions. Rugged, safe, and fun to drive — ideal for everyday commutes and weekend getaways.',
    features: ['Touchscreen Infotainment', 'Auto Headlamps', 'Rain-Sensing Wipers', 'Dual Airbags', 'ABS + EBD', 'Harman Audio'],
    bookedDates: [],
  },

  // ── Mid Segment (₹2,500/day) ────────────────────────────
  {
    id: 'glanza',
    name: 'Toyota Glanza',
    city: 'Delhi',
    pricePerDay: 2500,
    images: [glanzaImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1197 cc',
    mileage: '22.35 km/l',
    description:
      'The Toyota Glanza is a premium hatchback with Toyota reliability and a feature-rich cabin. Perfect for city drives and long highway cruises alike.',
    features: ['HUD Display', '360° Camera', 'Wireless Charging', 'OTA Updates', '6 Airbags', 'Toyota Connected'],
    bookedDates: [],
  },
  {
    id: 'baleno',
    name: 'Maruti Baleno',
    city: 'Delhi',
    pricePerDay: 2500,
    images: [balenoImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1197 cc',
    mileage: '22.35 km/l',
    description:
      'The Maruti Baleno is a premium hatchback with a spacious cabin, modern design, and feature-packed interior. Ideal for families and long drives.',
    features: ['360° Camera', 'HUD Display', 'Wireless Charging', 'Sunroof', '6 Airbags', 'Lane Departure Warning'],
    bookedDates: [{ start: '2026-04-11', end: '2026-04-13' }],
  },
  {
    id: 'fronx',
    name: 'Maruti Fronx',
    city: 'Delhi',
    pricePerDay: 2500,
    images: [fronxImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1197 cc',
    mileage: '21.5 km/l',
    description:
      'The Maruti Fronx is a stylish coupe-SUV that blends sporty design with practicality. Its turbo-petrol engine and premium cabin make every drive exciting.',
    features: ['Turbo Boosterjet Engine', 'HUD Display', 'Wireless CarPlay', 'Sunroof', '6 Airbags', 'Cruise Control'],
    bookedDates: [],
  },
  {
    id: 'swift',
    name: 'Maruti Swift',
    city: 'Delhi',
    pricePerDay: 2500,
    images: [swiftImg],
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1197 cc',
    mileage: '23.20 km/l',
    description:
      'The all-new Maruti Swift is India\'s favourite hatchback — sporty, fuel-efficient, and loaded with tech. Perfect for zipping through city traffic.',
    features: ['Touchscreen Infotainment', 'Rear AC Vents', 'Keyless Entry', 'ABS + EBD', 'Dual Airbags', 'Auto Gear Shift (AGS)'],
    bookedDates: [],
  },
  {
    id: 'altroz',
    name: 'Tata Altroz',
    city: 'Delhi',
    pricePerDay: 2500,
    images: [altrozImg],
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1199 cc',
    mileage: '22.0 km/l',
    description:
      'The Tata Altroz is a 5-star safety rated premium hatchback with a spacious cabin and refined ride quality. A perfect blend of style and substance.',
    features: ['iRA Connected Car', '7" Touchscreen', 'Auto AC', 'Projector Headlamps', 'Dual Airbags', '5-Star GNCAP Safety'],
    bookedDates: [],
  },

  // ── SUV & Off-Road Segment ──────────────────────────────
  {
    id: 'thar',
    name: 'Mahindra Thar',
    city: 'Delhi',
    pricePerDay: 4500,
    images: [tharImg],
    seats: 4,
    transmission: 'Manual',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '2184 cc',
    mileage: '15.2 km/l',
    description:
      'The Mahindra Thar is an iconic off-road SUV that\'s equally at home on beach trails and mountain paths. With a removable roof, 4WD, and rugged build, it\'s the ultimate adventure vehicle.',
    features: ['4WD with Low Range', 'Removable Roof & Doors', 'Waterproof Interior', 'Touchscreen Infotainment', 'Dual Airbags', 'Sway Bar Disconnect'],
    bookedDates: [],
  },
  {
    id: 'jimny',
    name: 'Maruti Jimny',
    city: 'Delhi',
    pricePerDay: 4500,
    images: [jimnyImg],
    seats: 4,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1462 cc',
    mileage: '16.94 km/l',
    description:
      'The Maruti Jimny is a compact off-roader with legendary 4WD capability. Light, agile, and adventure-ready, it conquers trails that bigger SUVs can\'t.',
    features: ['AllGrip Pro 4WD', 'Ladder-Frame Chassis', 'Hill Hold & Descent', 'Touchscreen Infotainment', 'Dual Airbags', 'ESP + Brake Assist'],
    bookedDates: [],
  },
  {
    id: 'scorpio-classic',
    name: 'Mahindra Scorpio Classic',
    city: 'Delhi',
    pricePerDay: 4500,
    images: [scorpioClassicImg],
    seats: 7,
    transmission: 'Manual',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '2184 cc',
    mileage: '15.4 km/l',
    description:
      'The Mahindra Scorpio Classic is the tried-and-true workhorse — rugged, spacious, and built for Indian roads. A commanding presence on any terrain.',
    features: ['mHawk Diesel Engine', 'Captain Seats', 'Micro-Hybrid Tech', 'Touchscreen Infotainment', 'Dual Airbags', 'Follow-Me-Home Headlamps'],
    bookedDates: [],
  },

  // ── Premium Segment ─────────────────────────────────────
  {
    id: 'tata-safari',
    name: 'Tata Safari',
    city: 'Delhi',
    pricePerDay: 5500,
    images: [safariImg],
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '1956 cc',
    mileage: '14.5 km/l',
    description:
      'The Tata Safari is a flagship 7-seater SUV with a luxurious cabin, panoramic sunroof, and commanding road presence. Perfect for family road trips.',
    features: ['Panoramic Sunroof', 'JBL Sound System', 'Ventilated Seats', 'ADAS Suite', '6 Airbags', 'Terrain Modes'],
    bookedDates: [],
  },
  {
    id: 'thar-roxx',
    name: 'Mahindra Thar Roxx',
    city: 'Delhi',
    pricePerDay: 6000,
    images: [tharRoxxImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '2184 cc',
    mileage: '15.2 km/l',
    description:
      'The Mahindra Thar Roxx is the evolved, 5-door version of the iconic Thar — combining off-road DNA with premium comfort, a spacious cabin, and cutting-edge tech.',
    features: ['4WD with Terrain Modes', 'Panoramic Sunroof', 'Adrenox Connected', 'Dual 10.25" Screens', '6 Airbags', 'Level 2 ADAS'],
    bookedDates: [],
  },
  {
    id: 'scorpio-n',
    name: 'Mahindra Scorpio N',
    city: 'Delhi',
    pricePerDay: 6000,
    images: [scorpioNImg],
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '2184 cc',
    mileage: '15.2 km/l',
    description:
      'The Mahindra Scorpio N is a bold, body-on-frame SUV built for adventure. With a powerful diesel engine, 4WD option, and commanding stance, it dominates both city roads and rough terrain.',
    features: ['4WD with Low Range', 'Sony Sound System', 'Wireless Charging', 'Sunroof', '6 Airbags', 'Terrain Modes'],
    bookedDates: [],
  },
  {
    id: 'brezza',
    name: 'Maruti Brezza',
    city: 'Delhi',
    pricePerDay: 2700,
    images: [brezzaImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1462 cc',
    mileage: '19.8 km/l',
    description:
      'The Maruti Brezza is a compact SUV with bold styling, advanced features, and a comfortable ride. Perfect for city and highway drives.',
    features: ['Sunroof', 'Cruise Control', '6 Airbags', 'SmartPlay Pro+', 'ABS + EBD'],
    bookedDates: [],
  },
  {
    id: 'grand-vitara',
    name: 'Maruti Grand Vitara',
    city: 'Delhi',
    pricePerDay: 3000,
    images: [grandVitaraImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    year: 2024,
    engineCC: '1490 cc',
    mileage: '27.97 km/l',
    description:
      'The Maruti Grand Vitara is a premium SUV with hybrid technology, luxurious interiors, and exceptional fuel efficiency. Ideal for long journeys.',
    features: ['Panoramic Sunroof', '360° Camera', 'Wireless Charging', '6 Airbags', 'All-Wheel Drive'],
    bookedDates: [],
  },
]

export function getCarById(carId: string) {
  return cars.find((c) => c.id === carId)
}
