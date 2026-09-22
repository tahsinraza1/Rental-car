import featuredWaveBg from '../../assets/featured-wave-bg.png'

interface AdvantageFeature {
  title: string
  desc: string
  tag: string
  glow: string
  badgeColor: string
  icon: React.ReactNode
}

const features: AdvantageFeature[] = [
  {
    title: 'No Online Payment Required',
    desc: 'Pay directly to the car owner upon key handover. No credit card details required, zero payment gateway fees, and complete transaction safety.',
    tag: '100% Safe',
    glow: 'from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.45)] border-emerald-300/40',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: (
      <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Live Calendar Availability',
    desc: 'Real-time schedule check prevents double-booking. See immediately if your desired dates and cars are available without waiting for confirmations.',
    tag: 'Instant Status',
    glow: 'from-amber-400 to-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.45)] border-amber-300/40',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: (
      <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Direct WhatsApp Contact',
    desc: 'Connect straight with the vehicle owner on WhatsApp. Enjoy quick responses, custom rental flexibility, and zero corporate middleman interference.',
    tag: 'Direct Chat',
    glow: 'from-green-400 to-emerald-600 shadow-[0_0_20px_rgba(34,197,94,0.45)] border-green-300/40',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
    icon: (
      <svg className="size-5.5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    title: 'Transparent Flat Rates',
    desc: 'What you see is exactly what you pay. Zero weekend surge pricing, no platform commissions, and absolutely no surprise charges on return.',
    tag: 'No Surges',
    glow: 'from-purple-400 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.45)] border-purple-300/40',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: (
      <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Curated Fleet Quality',
    desc: 'Every car in our fleet is deep cleaned, sanitized, mechanically tested, and strictly maintained to ensure a reliable and flawless driving experience.',
    tag: 'Certified Fleet',
    glow: 'from-sky-400 to-blue-600 shadow-[0_0_20px_rgba(14,165,233,0.45)] border-sky-300/40',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: (
      <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: 'Delhi & Noida Doorstep Coverage',
    desc: 'Serving Delhi NCR including Jasola, Shaheen Bagh, South Delhi, and Noida sectors with prompt doorstep vehicle delivery and pickup options.',
    tag: 'Delhi NCR Hubs',
    glow: 'from-rose-400 to-orange-500 shadow-[0_0_20px_rgba(244,63,94,0.45)] border-rose-300/40',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: (
      <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Background Abstract Wave Overlay */}
      <img
        src={featuredWaveBg}
        alt="Abstract Wave Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-40 dark:opacity-20"
      />

      {/* Subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/20 dark:bg-slate-950/40" />

      {/* ── TOP HEADER AREA ── */}
      <div className="relative z-10 flex flex-col gap-4 mb-8 sm:mb-10">
        {/* Top Tag & Script Quote */}
        <div className="flex items-center justify-between w-full">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-950/60 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>The Express Advantage</span>
          </div>

          {/* Right Script Quote */}
          <div className="hidden sm:block font-serif italic text-sm md:text-base font-light text-slate-500 dark:text-slate-400 tracking-wide">
            Honest, Transparent & Direct
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Built different, <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">for the better</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            We cut out corporate middlemen so you get lower rates, verified cars, and an effortless personal rental experience.
          </p>
        </div>
      </div>

      {/* ── 6 COMPACT FEATURE CARDS GRID (REDUCED HEIGHT & WIDTH) ── */}
      <div className="relative z-10 grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="card-bouncy group relative flex flex-col justify-between rounded-[1.35rem] border border-slate-200/90 dark:border-slate-750 bg-white/95 dark:bg-slate-800/90 backdrop-blur-xs p-4 sm:p-5 shadow-xs hover:border-orange-400/80 dark:hover:border-orange-500 cursor-pointer"
          >
            <div>
              {/* Top Row: Glowing 3D Orb Icon & Pill Tag */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-9.5 items-center justify-center rounded-xl bg-gradient-to-br ${f.glow} border transition-all duration-500 group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-lg shadow-xs`}
                >
                  {f.icon}
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide shadow-2xs transition-transform duration-300 group-hover:scale-105 ${f.badgeColor}`}>
                  {f.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-3.5">
                <h3 className="font-heading text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {f.desc}
                </p>
              </div>
            </div>

            {/* Bottom Accent Bar */}
            <div className="mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-500/90 dark:text-orange-400 group-hover:text-orange-600">
                <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>Express Guarantee</span>
              </div>
              <svg className="size-3.5 text-slate-300 dark:text-slate-600 transition-transform duration-300 group-hover:text-orange-500 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM FOOTER DIVIDER ── */}
      <div className="relative z-10 mt-10 pt-4 flex flex-col items-center justify-center gap-3">
        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 shadow-xs shadow-orange-500/40" />
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Centered text divider */}
        <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          DIRECT TO DRIVER • ZERO COMPROMISE
        </div>
      </div>
    </section>
  )
}
