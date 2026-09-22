import { OWNER_WHATSAPP_NUMBER } from '../../config'

const hubs = [
  {
    name: 'Jasola Vihar & Shaheen Bagh',
    tag: 'Primary Central Hub',
    time: 'Instant 15-min Dispatch',
    desc: 'Main garage & pickup point near Metro Station with the largest selection of cars on standby.',
    featured: true,
  },
  {
    name: 'South Delhi & Greater Kailash',
    tag: 'Doorstep Delivery',
    time: '30-45 mins Dispatch',
    desc: 'Covering Saket, GK 1 & 2, Hauz Khas, Nehru Place, Defence Colony, and Lajpat Nagar.',
    featured: false,
  },
  {
    name: 'Noida Sectors & Expressways',
    tag: 'Noida NCR Coverage',
    time: '30-45 mins Dispatch',
    desc: 'Serving Sector 18, Sector 62, Expressway, Sector 137, and Greater Noida West.',
    featured: false,
  },
  {
    name: 'Delhi IGI Airport (T1 & T3)',
    tag: 'Flight Pickup / Drop',
    time: 'Scheduled On-Time Handover',
    desc: 'Flight arrival vehicle handover at Terminal 1, Terminal 2, and Terminal 3 departures & arrivals.',
    featured: false,
  },
]

export function CoverageHubs() {
  return (
    <section className="luxury-section-box p-6 sm:p-8 md:p-10 grid gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            Coverage & Dispatch
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Delhi NCR Doorstep <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Delivery Hubs</span>
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            We deliver clean, sanitized vehicles straight to your doorstep or metro station.
          </p>
        </div>

        <a
          href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, can you deliver a car to my location in Delhi NCR?`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-xs font-bold text-ink dark:text-white shadow-xs transition duration-300 hover:border-accent hover:text-accent dark:hover:text-accent"
        >
          <span>Check My Location</span>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {hubs.map((hub) => (
          <div
            key={hub.name}
            className={`flex flex-col justify-between rounded-3xl border p-6 transition duration-300 ${
              hub.featured
                ? 'border-accent bg-gradient-to-b from-orange-50/80 to-white dark:from-orange-950/30 dark:to-slate-900 shadow-md ring-1 ring-accent/30'
                : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-accent/40 dark:hover:border-accent/40 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold tracking-wider text-accent uppercase">
                  {hub.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {hub.time}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-heading text-base font-bold text-ink dark:text-white">{hub.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted dark:text-slate-400">{hub.desc}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <svg className="size-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>On-demand Key Handover</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
