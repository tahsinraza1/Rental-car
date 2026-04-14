import { useNavigate } from 'react-router-dom'
import selfDriveImg from '../../assets/occasions/self_drive.jpg'
import hourlyRentalImg from '../../assets/occasions/hourly_rental.jpg'
import weddingImg from '../../assets/occasions/wedding.jpg'
import airportTransferImg from '../../assets/occasions/airport_transfer.jpg'
import roadTripImg from '../../assets/occasions/road_trip.jpg'
import eventsImg from '../../assets/occasions/events.jpg'

const cases = [
  { icon: '🚗', title: 'Self Drive', image: selfDriveImg, desc: 'Take the wheel and go wherever you want, whenever you want. Full freedom, zero restrictions.' },
  { icon: '🕐', title: 'Hourly Rental', image: hourlyRentalImg, desc: 'Need a car for just a few hours? Our flexible hourly plans are perfect for quick errands.' },
  { icon: '💍', title: 'Weddings', image: weddingImg, desc: 'Make your special day unforgettable with a premium car convoy. Decorated & ready to impress.' },
  { icon: '✈️', title: 'Airport Transfers', image: airportTransferImg, desc: 'Stress-free airport pickups and drops. On time, every time — across Delhi & Noida.' },
  { icon: '🏔️', title: 'Road Trips', image: roadTripImg, desc: 'Hit the mountains or the highways. Our SUVs and sedans are built for long-distance adventures.' },
  { icon: '🎉', title: 'Events & Parties', image: eventsImg, desc: 'Arrive in style at any event. Book a premium ride for birthdays, corporate events, and more.' },
]

export function UseCasesSection() {
  const navigate = useNavigate()

  return (
    <section className="grid gap-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 mb-3">
          Every Occasion
        </div>
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">A car for every need</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Whether it's a quick errand or a grand celebration, we have you covered.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <div
            key={c.title}
            onClick={() => navigate('/cars')}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img 
                src={c.image} 
                alt={c.title} 
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700" 
              />
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{c.icon}</span>
                <span className="text-base font-black text-slate-900">{c.title}</span>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed mb-4">{c.desc}</div>
              
              <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 group-hover:gap-3 transition-all">
                Book now
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
