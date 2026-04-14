const testimonials = [
  { name: 'Rahul Sharma', city: 'Delhi',  rating: 5, text: 'Booked a Hyundai Creta for a weekend trip. The WhatsApp booking was super smooth — owner confirmed within minutes. Will definitely use again!', avatar: 'RS', color: 'from-orange-500 to-red-500',    featured: true  },
  { name: 'Priya Nair',   city: 'Noida',  rating: 5, text: 'Loved the real-time availability calendar. No back-and-forth calls needed. Just picked dates, sent a WhatsApp, and got the keys. 10/10.',       avatar: 'PN', color: 'from-blue-500 to-indigo-500',   featured: false },
  { name: 'Arjun Mehta',  city: 'Delhi',  rating: 5, text: 'Rented the Innova Crysta for a family trip to Agra. Spotless car, fair price, and the owner was very responsive. Highly recommended!',          avatar: 'AM', color: 'from-emerald-500 to-teal-500',  featured: false },
  { name: 'Sneha Patel',  city: 'Noida',  rating: 5, text: 'The Tata Nexon EV was perfect for my city commute. Zero emissions, great range, and the booking process was effortless.',                       avatar: 'SP', color: 'from-pink-500 to-rose-500',    featured: false },
  { name: 'Vikram Singh', city: 'Delhi',  rating: 5, text: 'Transparent pricing, no hidden fees. The Scorpio-N handled the Delhi roads like a beast. Great experience overall.',                             avatar: 'VS', color: 'from-amber-500 to-orange-500',  featured: false },
  { name: 'Ananya Reddy', city: 'Noida',  rating: 5, text: 'DriveEasy is the best car rental platform I have used. Direct owner contact means better deals and faster responses.',                           avatar: 'AR', color: 'from-violet-500 to-purple-500', featured: false },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="size-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section className="grid gap-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 mb-3">
          ⭐ 4.9 Average Rating
        </div>
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">What our customers say</h2>
        <p className="mt-2 text-sm text-slate-500">Real reviews from real customers in Delhi & Noida.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Featured large card */}
        <div className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-7 flex flex-col gap-5 shadow-md">
          <Stars count={featured.rating} />
          <p className="text-base text-slate-700 leading-relaxed flex-1">"{featured.text}"</p>
          <div className="flex items-center gap-3">
            <div className={`grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${featured.color} text-sm font-bold text-white shadow-lg`}>
              {featured.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{featured.name}</div>
              <div className="text-xs text-slate-500">{featured.city}</div>
            </div>
          </div>
        </div>

        {/* Rest grid */}
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {rest.map((t) => (
            <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <Stars count={t.rating} />
              <p className="text-sm text-slate-600 leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
