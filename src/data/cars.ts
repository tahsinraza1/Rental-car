import type { Car } from '../types'

import tharImg from '../assets/cars/thar.jpg'
import scorpioImg from '../assets/cars/scorpio.jpg'
import balenoImg from '../assets/cars/baleno.jpg'
import dzireImg from '../assets/cars/dzire.jpg'
import xuv700Img from '../assets/cars/xuv700.jpg'
import cretaImg from '../assets/cars/creta.jpg'
import vernaImg from '../assets/cars/verna.jpg'

export const cars: Car[] = [
  {
    id: 'swift',
    name: 'Maruti Swift Dzire',
    city: 'Delhi',
    pricePerDay: 1899,
    images: [dzireImg],
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    year: 2023,
    engineCC: '1197 cc',
    mileage: '23.26 km/l',
    description:
      'The Maruti Swift Dzire is India\'s best-selling compact sedan — perfect for city commutes and highway trips alike. Fuel-efficient, comfortable, and easy to drive.',
    features: ['Touchscreen Infotainment', 'Rear AC Vents', 'Keyless Entry', 'ABS + EBD', 'Dual Airbags', 'Auto Gear Shift (AGS)'],
    bookedDates: [
      { start: '2026-04-12', end: '2026-04-15' },
      { start: '2026-04-20', end: '2026-04-22' },
    ],
  },
  {
    id: 'baleno',
    name: 'Maruti Baleno',
    city: 'Noida',
    pricePerDay: 2299,
    images: [balenoImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2023,
    engineCC: '1197 cc',
    mileage: '22.35 km/l',
    description:
      'The Maruti Baleno is a premium hatchback with a spacious cabin, modern design, and feature-packed interior. Ideal for families and long drives.',
    features: ['360° Camera', 'HUD Display', 'Wireless Charging', 'Sunroof', '6 Airbags', 'Lane Departure Warning'],
    bookedDates: [{ start: '2026-04-11', end: '2026-04-13' }],
  },
  {
    id: 'creta',
    name: 'Hyundai Creta',
    city: 'Delhi',
    pricePerDay: 3299,
    images: [cretaImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '1493 cc',
    mileage: '21.4 km/l',
    description:
      'The Hyundai Creta is India\'s most popular SUV — combining bold styling, a premium cabin, and powerful diesel performance for every road condition.',
    features: ['Panoramic Sunroof', 'BOSE Sound System', 'Ventilated Seats', 'ADAS Suite', '6 Airbags', 'BlueLink Connected Car'],
    bookedDates: [{ start: '2026-04-18', end: '2026-04-21' }],
  },

  {
    id: 'xuv700',
    name: 'Mahindra XUV700',
    city: 'Delhi',
    pricePerDay: 5499,
    images: [xuv700Img],
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1999 cc',
    mileage: '15.1 km/l',
    description:
      'The Mahindra XUV700 is a feature-loaded 7-seater SUV that punches well above its price. With ADAS, a stunning dual-screen setup, and a powerful turbo-petrol engine, it\'s a class apart.',
    features: ['ADAS Level 2', 'Dual 10.25" Screens', 'Sony 3D Sound', 'Panoramic Sunroof', '7 Airbags', 'AdrenoX Connected'],
    bookedDates: [],
  },
  {
    id: 'city',
    name: 'Honda City',
    city: 'Noida',
    pricePerDay: 2799,
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80',
    ],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2023,
    engineCC: '1498 cc',
    mileage: '18.4 km/l',
    description:
      'The Honda City is a premium sedan that blends sporty styling with a refined ride. Its spacious cabin, powerful VTEC engine, and advanced safety features make it a top choice.',
    features: ['Honda Sensing ADAS', 'Wireless Apple CarPlay', 'Sunroof', 'Lane Watch Camera', '6 Airbags', 'Paddle Shifters'],
    bookedDates: [{ start: '2026-04-15', end: '2026-04-18' }],
  },
  {
    id: 'scorpio',
    name: 'Mahindra Scorpio-N',
    city: 'Delhi',
    pricePerDay: 4999,
    images: [scorpioImg],
    seats: 7,
    transmission: 'Manual',
    fuel: 'Diesel',
    year: 2024,
    engineCC: '2184 cc',
    mileage: '15.2 km/l',
    description:
      'The Mahindra Scorpio-N is a bold, body-on-frame SUV built for adventure. With a powerful diesel engine, 4WD option, and commanding stance, it dominates both city roads and rough terrain.',
    features: ['4WD with Low Range', 'Sony Sound System', 'Wireless Charging', 'Sunroof', '6 Airbags', 'Terrain Modes'],
    bookedDates: [],
  },
  {
    id: 'thar',
    name: 'Mahindra Thar',
    city: 'Delhi',
    pricePerDay: 4299,
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
    id: 'verna',
    name: 'Hyundai Verna',
    city: 'Noida',
    pricePerDay: 2599,
    images: [vernaImg],
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    year: 2024,
    engineCC: '1497 cc',
    mileage: '20.6 km/l',
    description:
      'The all-new Hyundai Verna is a stunning sedan with a bold coupe-like silhouette, a feature-rich cabin, and a punchy turbo-petrol engine. It redefines the premium sedan segment.',
    features: ['Panoramic Sunroof', 'ADAS Level 2', 'Bose Sound System', 'Ventilated Seats', '6 Airbags', 'Digital Cluster'],
    bookedDates: [],
  },
]

export function getCarById(carId: string) {
  return cars.find((c) => c.id === carId)
}
