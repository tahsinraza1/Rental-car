import { cars } from '../../data/cars'

export function FleetMarquee() {
  const items = [...cars, ...cars]

  return (
    <section className="grid gap-6 overflow-hidden">
      <div className="text-center">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 shadow-2xs">
          <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
          14+ Verified Cars
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Our Growing <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Fleet</span>
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">From city hatchbacks to rugged SUVs — the right car for every trip.</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-paper to-transparent" />

        <div className="flex gap-4 marquee-track">
          {items.map((car, i) => (
            <div key={`${car.id}-${i}`} className="w-56 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="relative h-32 overflow-hidden">
                <img src={car.images[0]} alt={car.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3">
                  <div className="text-xs sm:text-[13px] font-bold text-white tracking-wide truncate drop-shadow-md">{car.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
