import howItWorksBg from '../../assets/steps/how_it_works_bg.jpg'
import step1Img from '../../assets/steps/step1_browse.jpg'
import step2Img from '../../assets/steps/step2_availability.jpg'
import step3Img from '../../assets/steps/step3_payment.jpg'
import step4Img from '../../assets/steps/step4_drive.jpg'
import featuredWaveBg from '../../assets/featured-wave-bg.png'

interface StepCard {
  step: string
  title: string
  desc: string
  cta: string
  image: string
  badgeColor: string
  textColor: string
  glowBorder: string
  shadowGlow: string
  actionUrl: string
}

const stepsData: StepCard[] = [
  {
    step: '01',
    title: 'Browse & Pick',
    desc: 'Explore our wide range of well-maintained cars. Filter by type, budget, or features.',
    cta: 'Start Browsing',
    image: step1Img,
    badgeColor: 'bg-blue-600 text-white shadow-blue-500/40',
    textColor: 'text-blue-600 hover:text-blue-700',
    glowBorder: 'hover:border-blue-400/80',
    shadowGlow: 'hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.25)]',
    actionUrl: '/cars',
  },
  {
    step: '02',
    title: 'Check Availability',
    desc: 'Select your pickup and return dates. Our real-time calendar shows available cars instantly.',
    cta: 'Check Availability',
    image: step2Img,
    badgeColor: 'bg-amber-500 text-white shadow-amber-500/40',
    textColor: 'text-amber-500 hover:text-amber-600',
    glowBorder: 'hover:border-amber-400/80',
    shadowGlow: 'hover:shadow-[0_20px_40px_-12px_rgba(245,158,11,0.25)]',
    actionUrl: '/cars',
  },
  {
    step: '03',
    title: 'Book & Pay',
    desc: 'Confirm your details and make a secure payment. Get instant confirmation via WhatsApp & Email.',
    cta: 'Book Now',
    image: step3Img,
    badgeColor: 'bg-emerald-500 text-white shadow-emerald-500/40',
    textColor: 'text-emerald-600 hover:text-emerald-700',
    glowBorder: 'hover:border-emerald-400/80',
    shadowGlow: 'hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.25)]',
    actionUrl: '/cars',
  },
  {
    step: '04',
    title: 'Pick Up & Drive',
    desc: 'Visit our location, complete a quick verification, and hit the road with your dream car!',
    cta: 'Get on the Road',
    image: step4Img,
    badgeColor: 'bg-purple-600 text-white shadow-purple-500/40',
    textColor: 'text-purple-600 hover:text-purple-700',
    glowBorder: 'hover:border-purple-400/80',
    shadowGlow: 'hover:shadow-[0_20px_40px_-12px_rgba(147,51,234,0.25)]',
    actionUrl: '/cars',
  },
]

const trustBadges = [
  {
    icon: (
      <svg className="size-4.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
    ),
    bg: 'bg-blue-50 border-blue-200/80',
    title: 'Trusted & Secure',
    subtitle: '100% safe & verified vehicles',
  },
  {
    icon: (
      <svg className="size-4.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 00-9-9z" />
      </svg>
    ),
    bg: 'bg-purple-50 border-purple-200/80',
    title: '24/7 Support',
    subtitle: "We're always here for you",
  },
  {
    icon: (
      <svg className="size-4.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    bg: 'bg-amber-50 border-amber-200/80',
    title: 'Best Prices',
    subtitle: 'No hidden charges',
  },
  {
    icon: (
      <svg className="size-4.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
      </svg>
    ),
    bg: 'bg-emerald-50 border-emerald-200/80',
    title: 'Well Maintained Cars',
    subtitle: 'Clean, safe & reliable',
  },
]

export function HowItWorks() {

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Background abstract wave overlay */}
      <img
        src={featuredWaveBg}
        alt="Background Wave"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-50 dark:opacity-10"
      />

      {/* ── TOP HERO BANNER (SCENIC COASTAL HIGHWAY AT SUNSET) ── */}
      <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] w-full overflow-hidden pb-16 pt-8 sm:pt-10 px-6 sm:px-10 flex flex-col items-center justify-start text-center">
        {/* Scenic Background Photo */}
        <img
          src={howItWorksBg}
          alt="Scenic Coastal Highway Background"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />

        {/* Ambient Dark-to-Light Gradient Overlay for crystal clear typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80" />

        {/* Top Floating Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-950/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-amber-300 shadow-lg">
          <span className="text-amber-400 animate-pulse">⚡</span>
          <span>Simple Process</span>
        </div>

        {/* Main Headline */}
        <h2 className="relative z-10 mt-3 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
          Book in <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">4 Easy Steps</span>
        </h2>

        {/* Subtitle */}
        <p className="relative z-10 mt-2 max-w-xl text-xs sm:text-sm md:text-base font-medium text-slate-100 drop-shadow">
          From browsing to driving — the whole process takes under 5 minutes.
        </p>

        {/* Stylized colorful swoosh line */}
        <div className="relative z-10 mt-2.5 h-1.5 w-32 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 shadow-sm shadow-orange-500/50" />
      </div>

      {/* ── 4 STEP CARDS ROW (COMPACT & NON-CLICKABLE) ── */}
      <div className="relative z-10 -mt-10 sm:-mt-14 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 lg:gap-5">
          {stepsData.map((s, idx) => (
            <div
              key={s.step}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 p-2 sm:p-2.5 shadow-md transition-all duration-300 hover:shadow-lg ${s.glowBorder}`}
            >
              {/* Top Illustration Area (Compact Aspect Ratio) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.15rem] bg-slate-100 dark:bg-slate-900">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Number Badge floating at top of card body */}
              <div className="relative px-2.5 pt-2.5">
                <div
                  className={`inline-flex size-7.5 items-center justify-center rounded-full ${s.badgeColor} font-black text-xs shadow-sm ring-3 ring-white dark:ring-slate-800 transition-transform duration-300 group-hover:scale-105`}
                >
                  {s.step}
                </div>
              </div>

              {/* Card Body Text */}
              <div className="flex flex-1 flex-col justify-between p-2.5 pt-1.5">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom CTA Indicator (Non-clickable info badge) */}
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${s.textColor}`}>
                    <span>{s.cta}</span>
                    <svg className="size-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Connector Chevron Arrow (Desktop only, between cards 1, 2, 3) */}
              {idx < stepsData.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 size-7 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-400 pointer-events-none transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM TRUST BADGES & SIGNATURE ROW ── */}
      <div className="relative z-10 mt-10 sm:mt-12 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 px-6 sm:px-10 py-6 sm:py-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${b.bg} dark:bg-slate-800 dark:border-slate-700 shadow-xs`}>
                  {b.icon}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-tight leading-tight">
                    {b.title}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                    {b.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Signature Quote */}
          <div className="flex flex-col items-center lg:items-end shrink-0">
            <div className="font-serif italic text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-orange-600 dark:from-slate-200 dark:via-white dark:to-orange-400 bg-clip-text text-transparent tracking-wide">
              Your Journey • Our Priority
            </div>
            <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mt-0.5" />
          </div>
        </div>
      </div>
    </section>
  )
}
