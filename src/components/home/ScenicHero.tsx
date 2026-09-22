import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { OWNER_WHATSAPP_NUMBER } from '../../config'
import heroImg from '../../assets/hero_night_audi.jpg'
import heroTharScorpioImg from '../../assets/hero_thar_scorpio.jpg'
import heroWhiteTharImg from '../../assets/hero_white_thar.jpg'

const heroSlides = [
  {
    image: heroImg,
    tag: '✨ Premium Luxury Fleet · Delhi NCR',
    title: 'Drive Beyond',
    highlight: 'Ordinary.',
    sub: 'Experience unmatched prestige and effortless comfort. 0% online advance, unlimited kilometers & instant 24/7 doorstep delivery.',
    perks: ['⚡ Zero Advance', '🧼 Sanitized Fleet', '🛣️ Unlimited Kilometers'],
    price: '₹2,000',
    activeCategory: 'premium',
    imgPosition: 'object-[70%_center] lg:object-center',
  },
  {
    image: heroTharScorpioImg,
    tag: '🚙 4x4 Off-Road & Road Trips',
    title: 'Conquer Every',
    highlight: 'Terrain.',
    sub: 'Take command of iconic 4x4 Thar & muscular Scorpio-N. Built for highway cruising, mountain trails & unforgettable road trip adventures.',
    perks: ['🏔️ Outstation Ready', '🚀 4x4 Power', '🛡️ Direct Owner Trust'],
    price: '₹2,500',
    activeCategory: 'suv',
    imgPosition: 'object-[70%_center] lg:object-center',
  },
  {
    image: heroWhiteTharImg,
    tag: '🔥 Unrivaled Street Presence',
    title: 'Command the',
    highlight: 'Streets.',
    sub: 'Turn heads wherever you arrive with our pristine Mahindra Thar fleet. Raw muscle, high-spec comfort & total self-drive freedom.',
    perks: ['👑 VIP Street Presence', '⏱️ Hourly & Daily', '⚡ Instant Handover'],
    price: '₹2,500',
    activeCategory: 'suv',
    imgPosition: 'object-[80%_center] sm:object-[75%_center] lg:object-[82%_center] xl:object-right',
  },
  {
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=90',
    tag: '⚡ Delhi & Noida Fast Booking',
    title: 'Your Journey,',
    highlight: 'Your Terms.',
    sub: 'From daily city errands to grand wedding convoys — choose from 14+ top-rated cars and get rolling in 60 seconds via WhatsApp.',
    perks: ['📱 60s WhatsApp Booking', '📍 Doorstep Dispatch', '💰 Flat Honest Pricing'],
    price: '₹2,000',
    activeCategory: 'premium',
    imgPosition: 'object-[70%_center] lg:object-center',
  },
]

export function ScenicHero() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [active])

  function goTo(idx: number) {
    if (idx === active) return
    setFading(true)
    setTimeout(() => {
      setActive(idx)
      setFading(false)
    }, 300)
  }

  const slide = heroSlides[active]

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#070B14] text-white shadow-2xl border border-white/10">
      {/* Background Images with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt="Car Rental Express Fleet"
            className={`absolute inset-0 h-full w-full object-cover ${s.imgPosition} brightness-105 contrast-105 transition-all duration-1000 ${
              i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-102 pointer-events-none'
            }`}
          />
        ))}

        {/* Lighter Cinematic gradient overlays so background car image is vibrant & clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/80 via-[#070B14]/40 to-transparent lg:via-[#070B14]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/80 via-transparent to-black/10" />
        <div className="absolute -left-20 top-1/4 size-[400px] rounded-full bg-orange-500/20 blur-[120px] pointer-events-none" />
        <div className="absolute right-1/4 bottom-10 size-[350px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />
      </div>

      {/* Floating 3D Category Pills (Over/around car area on desktop) */}
      <div className="pointer-events-auto absolute top-28 right-[32%] z-10 hidden xl:flex items-center gap-2">
        <button
          onClick={() => navigate('/cars?type=SUV')}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer ${
            slide.activeCategory === 'suv'
              ? 'border-orange-400 bg-orange-500/20 text-orange-200 ring-2 ring-orange-500/40 shadow-orange-500/20'
              : 'border-orange-500/30 bg-black/60 hover:border-orange-400 hover:bg-black/80'
          }`}
        >
          <span className="flex size-6 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
            🚗
          </span>
          <span>SUV</span>
        </button>
      </div>

      <div className="pointer-events-auto absolute top-24 right-[20%] z-10 hidden xl:flex items-center gap-2">
        <button
          onClick={() => navigate('/cars?type=Hatchback')}
          className="flex items-center gap-2 rounded-2xl border border-sky-500/30 bg-black/60 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-sky-400 hover:bg-black/80 cursor-pointer"
        >
          <span className="flex size-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
            🚙
          </span>
          <span>Sedan</span>
        </button>
      </div>

      <div className="pointer-events-auto absolute top-36 right-[8%] z-10 hidden xl:flex items-center gap-2">
        <button
          onClick={() => navigate('/cars')}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer ${
            slide.activeCategory === 'premium'
              ? 'border-purple-400 bg-purple-500/20 text-purple-200 ring-2 ring-purple-500/40 shadow-purple-500/20'
              : 'border-purple-500/30 bg-black/60 hover:border-purple-400 hover:bg-black/80'
          }`}
        >
          <span className="flex size-6 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            👑
          </span>
          <span>Premium</span>
        </button>
      </div>

      {/* Floating Price Badge (Top Right - Compact & Refined) */}
      <div className="absolute top-5 right-5 z-10 sm:top-7 sm:right-7">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 shadow-xl backdrop-blur-xl transition hover:border-orange-400/40 sm:px-3.5 sm:py-2">
          <div className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-xs shadow-orange-500/30">
            <svg className="size-3.5 sm:size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.97 2.59a1.5 1.5 0 00-1.06-.44H4.5A2.25 2.25 0 002.25 4.5v7.41c0 .4.16.78.44 1.06l9.75 9.75a2.25 2.25 0 003.18 0l6.19-6.19a2.25 2.25 0 000-3.18l-8.84-8.76zM6.75 7.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-none">
              Starting From
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-base font-black text-white sm:text-lg">
                ₹2,000
              </span>
              <span className="text-[10px] font-medium text-slate-300">/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 flex min-h-[540px] flex-col justify-between px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:min-h-[580px]">
        {/* Top & Middle Copy with Smooth Slide Fade Animation */}
        <div className="max-w-2xl pt-2 sm:pt-4">
          {/* Pill Tag */}
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-black/50 px-4 py-1.5 text-xs font-bold text-orange-200 shadow-md backdrop-blur-md transition-all duration-500 ${
              fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="size-2 rounded-full bg-orange-400 shadow-xs shadow-orange-400 animate-pulse" />
            {slide.tag}
          </div>

          {/* Headline */}
          <h1
            className={`font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.035em] text-white leading-[0.98] sm:leading-[1.02] drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)] transition-all duration-500 ${
              fading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            {slide.title} <br />
            <span className="text-gradient-hero headline-glow inline-block">
              {slide.highlight}
            </span>
          </h1>

          {/* Subtitle with Left Glow Bar */}
          <div
            className={`mt-4 max-w-xl transition-all duration-500 delay-75 ${
              fading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="border-l-2 border-orange-500/80 pl-3.5 text-sm sm:text-base md:text-lg font-medium text-slate-200 leading-relaxed drop-shadow-xs">
              {slide.sub}
            </p>

            {/* Micro Perk Chips */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              {slide.perks?.map((perk) => (
                <span
                  key={perk}
                  className="inline-flex items-center gap-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-bold text-orange-200 shadow-2xs"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Action CTA Buttons & Trust Counters */}
        <div className="mt-8 sm:mt-10 grid gap-6">
          {/* Action CTAs: Explore Cars + WhatsApp Us */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => navigate('/cars')}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition duration-300 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span>Explore Cars</span>
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to rent a car from Car Rental Express')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 hover:bg-emerald-500/25 px-7 py-3.5 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition duration-300 hover:border-emerald-400/60 active:scale-95"
            >
              <svg className="size-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Bottom Trust Indicators & Dot Indicators */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-semibold text-slate-300">
              {/* Happy Customers */}
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-orange-400 backdrop-blur-md border border-white/10">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm font-extrabold text-white">500+</div>
                  <div className="text-[11px] text-slate-400">Happy Customers</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-amber-400 backdrop-blur-md border border-white/10">
                  <svg className="size-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm font-extrabold text-white">4.9★</div>
                  <div className="text-[11px] text-slate-400">Verified Rating</div>
                </div>
              </div>

              {/* No Hidden Fees */}
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-sky-400 backdrop-blur-md border border-white/10">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm font-extrabold text-white">No Hidden Fees</div>
                  <div className="text-[11px] text-slate-400">What you see is what you pay</div>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? 'w-8 h-2 bg-gradient-to-r from-orange-500 to-rose-500 shadow-md shadow-orange-500/40'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Slide Arrow Buttons */}
      <button
        onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 hover:scale-105 transition backdrop-blur-md cursor-pointer"
        aria-label="Previous slide"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={() => goTo((active + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 hover:scale-105 transition backdrop-blur-md cursor-pointer"
        aria-label="Next slide"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </section>
  )
}
