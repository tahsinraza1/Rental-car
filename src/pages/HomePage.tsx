import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CTABanner } from '../components/home/CTABanner'
import { HowItWorks } from '../components/home/HowItWorks'
import { StatsSection } from '../components/home/StatsSection'
import { Testimonials } from '../components/home/Testimonials'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { FleetMarquee } from '../components/home/FleetMarquee'
import { UseCasesSection } from '../components/home/UseCasesSection'
import { CarCard } from '../components/cars/CarCard'
import { cars } from '../data/cars'
import { OWNER_WHATSAPP_NUMBER } from '../config'

import faizanImg from '../assets/owners/faizan.jpg'
import imranImg from '../assets/owners/imran.jpg'
import inzemamImg from '../assets/owners/inzemam.jpg'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=90',
    tag: "Delhi & Noida's #1 Car Rental",
    title: 'Drive on',
    highlight: 'Your Terms.',
    sub: 'Self-drive, hourly, weddings, road trips — book any car in minutes via WhatsApp.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=90',
    tag: 'Adventure Awaits',
    title: 'Conquer Every',
    highlight: 'Road.',
    sub: 'Take the iconic Mahindra Thar for your next off-road adventure or weekend getaway.',
  },
  {
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1920&q=90',
    tag: 'Power & Presence',
    title: 'Command the',
    highlight: 'Streets.',
    sub: 'The Mahindra Scorpio-N — bold, powerful, and built for every terrain in Delhi NCR.',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const featured = useMemo(() => cars.slice(0, 6), [])
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
    <div className="grid gap-24">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl min-h-[620px] flex items-center shadow-2xl shadow-slate-300">

        {/* Background images crossfade */}
        {heroSlides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Light overlay — only left side so right side shows car clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Glow */}
        <div className="absolute -left-32 top-10 size-[500px] rounded-full bg-orange-500/15 blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative w-full px-6 py-20 md:px-14 md:py-28">
          <div className="max-w-xl">

            <div className={`inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/20 px-4 py-1.5 text-xs font-bold text-orange-300 mb-7 backdrop-blur-sm transition-all duration-500 ${fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <span className="size-1.5 rounded-full bg-orange-400 animate-pulse" />
              {slide.tag}
            </div>

            <h1 className={`text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.05] transition-all duration-500 ${fading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
              {slide.title}
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className={`mt-6 max-w-lg text-base leading-relaxed text-slate-200 transition-all duration-500 delay-75 ${fading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
              {slide.sub}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['🚗 Self Drive', '🕐 Hourly', '💍 Weddings', '✈️ Airport', '🏔️ Road Trips', '🎉 Events'].map((u) => (
                <span key={u} className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {u}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/cars')}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3.5 text-sm font-bold text-white shadow-2xl shadow-orange-500/40 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Explore Fleet
              </button>
              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I want to rent a car`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/25 hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-6">
              {[
                { icon: '✅', text: '500+ Happy Customers' },
                { icon: '⭐', text: '4.9 Star Rating' },
                { icon: '🔒', text: 'No Hidden Fees' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-slate-300">
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-black/50 transition backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo((active + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-black/50 transition backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2.5 bg-orange-400' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>

        {/* Thumbnail strip desktop */}
        <div className="absolute bottom-6 right-6 z-10 hidden lg:flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition-all duration-300 ${i === active ? 'border-orange-400 scale-105 opacity-100' : 'border-white/30 opacity-50 hover:opacity-90'}`}
            >
              <img src={s.image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Floating price card */}
        <div className="absolute top-8 right-8 z-10 hidden lg:block">
          <div className="rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-md shadow-2xl">
            <div className="text-xs text-slate-300 mb-1">Starting from</div>
            <div className="text-2xl font-black text-white">
              ₹1,899<span className="text-xs font-normal text-slate-400">/day</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cars available now
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsSection />

      {/* FLEET MARQUEE */}
      <FleetMarquee />

      {/* FEATURED CARS */}
      <section className="grid gap-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 mb-2">
              Our Fleet
            </div>
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Featured Cars</h2>
            <p className="mt-1 text-sm text-slate-500">Popular picks with instant availability checks.</p>
          </div>
          <button
            onClick={() => navigate('/cars')}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
          >
            View all
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <UseCasesSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* TEAM */}
      <section className="grid gap-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 mb-3">The Team</div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Meet the people behind DriveEasy</h2>
          <p className="mt-2 text-sm text-slate-500">Small team, big passion for making rentals better.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { name: 'Faizan Ahmed',  role: 'Founder & CEO',      avatar: faizanImg, bio: 'Passionate about making mobility accessible to everyone in Delhi & Noida.' },
            { name: 'Sheikh Imran',  role: 'Operations Head',    avatar: imranImg, bio: 'Ensures every booking goes smoothly from inquiry to key handover.' },
            { name: 'Inzemam Qureshi', role: 'Customer Success', avatar: inzemamImg, bio: 'Your go-to person for any questions, issues, or special requests.' },
          ].map((member) => (
            <div key={member.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm font-bold text-white">{member.name}</div>
                  <div className="text-xs text-orange-300">{member.role}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />
    </div>
  )
}