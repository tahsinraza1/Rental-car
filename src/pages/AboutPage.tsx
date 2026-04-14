import { Link } from 'react-router-dom'
import faizanImg from '../assets/owners/faizan.jpg'
import imranImg from '../assets/owners/imran.jpg'
import izemamImg from '../assets/owners/inzemam.jpg'

const team = [
  { name: 'Faizan ahmed', role: 'Founder & CEO', avatar: faizanImg, bio: 'Passionate about making mobility accessible to everyone in Delhi & Noida.' },
  { name: 'sheikh imran', role: 'Operations Head', avatar: imranImg, bio: 'Ensures every booking goes smoothly from inquiry to key handover.' },
  { name: 'Inzemam qureshi', role: 'Customer Success', avatar: izemamImg, bio: 'Your go-to person for any questions, issues, or special requests.' },
]

const values = [
  { title: 'Transparency', description: 'No hidden fees, no surprise charges. The price you see is the price you pay — always.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80', bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', tag: 'bg-blue-100 text-blue-700' },
  { title: 'Simplicity', description: 'We believe renting a car should be as easy as sending a WhatsApp message. No apps, no hassle.', image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80', bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700', tag: 'bg-orange-100 text-orange-700' },
  { title: 'Trust', description: 'Direct owner contact builds real relationships and accountability on both sides.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80', bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', tag: 'bg-emerald-100 text-emerald-700' },
  { title: 'Accessibility', description: 'No app downloads, no credit cards required. Just a phone and WhatsApp is all you need.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700', tag: 'bg-amber-100 text-amber-700' },
]

const milestones = [
  { year: '2026', event: 'DriveEasy founded in Delhi with 3 cars' },
]

export function AboutPage() {
  return (
    <div className="grid gap-20">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl min-h-[420px] flex items-center shadow-xl">
        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80" alt="About DriveEasy" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        <div className="absolute -left-32 top-0 size-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="relative px-8 py-16 md:px-14 md:py-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/20 px-4 py-1.5 text-xs font-bold text-orange-300 mb-5 backdrop-blur-sm">
            Our Story
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl leading-[1.1]">
            We're reimagining<br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">car rentals in India</span>
          </h1>
          <p className="mt-5 text-base text-slate-300 leading-relaxed">
            DriveEasy was born from a simple frustration — renting a car in India was too complicated, too expensive, and too impersonal. We built a platform that connects renters directly with car owners via WhatsApp.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg">
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80" alt="Our mission" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              🚗 Direct owner-to-renter connection
            </div>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 mb-4">
            Our Mission
          </div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl leading-tight">Making car rentals personal again</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            We believe the best transactions happen between real people. When you rent through DriveEasy, you're not dealing with a faceless corporation — you're talking directly to the car owner who takes pride in their vehicle.
          </p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            This means better prices, more flexibility, and a more personal experience. The owner knows their car inside out and can answer any question you have.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: '2026', label: 'Founded' },
              { value: '500+', label: 'Customers' },
              { value: '11+', label: 'Cars' },
              { value: '2', label: 'Locations' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
                <div className="text-xl font-black text-orange-600">{s.value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/cars" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition shadow-lg shadow-orange-500/25">
              Browse our fleet
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="grid gap-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-3">What We Stand For</div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Our values</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">Every decision we make is guided by these four principles.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className={`group overflow-hidden rounded-3xl border ${v.border} ${v.bg} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
              <div className="relative h-52 overflow-hidden">
                <img src={v.image} alt={v.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${v.tag}`}>{v.title}</div>
              </div>
              <div className="p-6">
                <div className={`text-base font-black mb-2 ${v.accent}`}>{v.title}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{v.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 mb-4">Our Journey</div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Redefining rentals in Delhi NCR</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We started DriveEasy with a single goal: to make renting a car as simple as texting a friend.
            Frustrated by hidden fees, confusing apps, and corporate middlemen, we launched with just 3 cars
            in Delhi, offering a revolutionary direct-to-owner WhatsApp booking model.
          </p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            By connecting renters directly with real car owners, we've brought trust and transparency back to the
            industry. From those first 3 cars, our fleet has rapidly grown to serve all of Delhi and Noida, helping
            hundreds of people hit the road on their own terms.
          </p>
          <div className="mt-8 grid gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-[11px] font-black text-white shadow-md shadow-orange-500/20">
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-orange-400/40 to-transparent my-1" />}
                </div>
                <div className="pb-7">
                  <div className="text-xs font-bold text-orange-500 mb-0.5">{m.year}</div>
                  <div className="text-sm text-slate-700">{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl aspect-[3/4] md:sticky md:top-24 shadow-lg">
          <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80" alt="DriveEasy journey" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-2xl border border-white/20 bg-slate-900/80 p-4 backdrop-blur-sm">
              <div className="text-xs text-slate-400 mb-1">Currently serving</div>
              <div className="text-lg font-black text-white">Delhi & Noida</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Delhi', 'Noida'].map((city) => (
                  <span key={city} className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] text-slate-300">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="grid gap-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 mb-3">The Team</div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Meet the people behind DriveEasy</h2>
          <p className="mt-2 text-sm text-slate-500">Small team, big passion for making rentals better.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member) => (
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

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 p-10 md:p-14 text-center shadow-2xl shadow-orange-300">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative">
          <h2 className="text-2xl font-black text-white md:text-3xl">Ready to experience the difference?</h2>
          <p className="mt-3 text-sm text-white/80 max-w-md mx-auto">Browse our fleet and book your first car in minutes. No app, no card, just WhatsApp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/cars" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50 transition shadow-lg">Browse Cars</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/15 px-7 py-3 text-sm font-bold text-white hover:bg-white/25 transition">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
