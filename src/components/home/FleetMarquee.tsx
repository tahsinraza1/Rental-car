import { cars } from '../../data/cars'

export function FleetMarquee() {
  const items = [...cars, ...cars]

  return (
    <section className="grid gap-6 overflow-hidden">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 mb-3">
          11+ Premium Cars
        </div>
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Our Growing Fleet</h2>
        <p className="mt-2 text-sm text-slate-500">From budget hatchbacks to rugged SUVs — the right car for every trip.</p>
      </div>

      <div className="relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex gap-4 marquee-track">
          {items.map((car, i) => (
            <div key={`${car.id}-${i}`} className="shrink-0 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-32 overflow-hidden">
                <img src={car.images[0]} alt={car.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="text-xs font-bold text-white truncate">{car.name}</div>
                  <div className="text-[10px] text-slate-300">₹{car.pricePerDay.toLocaleString('en-IN')}/day</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
