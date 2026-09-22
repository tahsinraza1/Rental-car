import { Link } from 'react-router-dom'
import { OWNER_WHATSAPP_NUMBER } from '../config'
import { BehindYourSafeRide } from '../components/home/BehindYourSafeRide'

// Assets
import heroLuxuryBmw from '../assets/hero_luxury_bmw.jpg'
import roadTripImg from '../assets/occasions/road_trip.jpg'
import faizanImg from '../assets/owners/image 1.jpeg'

// ── 6 CORE PILLARS OF EXCELLENCE ──
const CORE_PILLARS = [
  {
    icon: '🛡️',
    title: 'Zero Advance Trap',
    subtitle: 'Pay After Inspection',
    description: 'Never pay in the dark. Inspect the vehicle condition, odometer, tires, and AC in person before handing over any rental payment.',
    badge: '100% Risk Free',
    gradient: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-200/80',
  },
  {
    icon: '⚡',
    title: '5-Minute WhatsApp Flow',
    subtitle: 'Zero App Downloads',
    description: 'No slow KYC apps, no complicated wallet verifications. Send your driving license over WhatsApp and receive car keys at your doorstep in minutes.',
    badge: 'Instant Handover',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-200/80',
  },
  {
    icon: '🚗',
    title: '100% Certified Fleet',
    subtitle: 'Commercial Self-Drive Permits',
    description: 'Every vehicle in our catalog undergoes rigorous 24-point mechanical audits, brake inspections, and tire tread depth verifications before every trip.',
    badge: 'Safety Certified',
    gradient: 'from-sky-500/10 to-blue-500/10',
    border: 'border-sky-200/80',
  },
  {
    icon: '🧼',
    title: 'Hospital-Grade Cleanliness',
    subtitle: 'Deep Vacuumed & Sanitized',
    description: 'Every cabin is thoroughly steam-vacuumed, sanitized, and infused with pleasant fragrance. You will always receive a spotless, fresh car.',
    badge: 'Spotless Guarantee',
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-200/80',
  },
  {
    icon: '📍',
    title: 'Doorstep NCR Delivery',
    subtitle: 'Delhi, Noida & IGI Airport',
    description: 'We bring the car directly to your society gate, office porch, or airport terminal in 20-30 minutes with real-time driver tracking.',
    badge: 'Express Delivery',
    gradient: 'from-rose-500/10 to-orange-500/10',
    border: 'border-rose-200/80',
  },
  {
    icon: '🛣️',
    title: '24/7 Roadside Shield',
    subtitle: 'Pan-India Highway Assist',
    description: 'Heading to Uttarakhand, Himachal, or Rajasthan? Your fleet host stays directly connected on WhatsApp 24/7 for instant roadside assistance.',
    badge: 'Direct Host Hotline',
    gradient: 'from-amber-500/10 to-yellow-500/10',
    border: 'border-amber-200/80',
  },
]


// ── OPERATIONAL HUBS ──
const HUBS = [
  {
    name: 'South Delhi Hub',
    address: 'Jasola Vihar & Okhla Phase-II, South Delhi',
    coverage: 'Jasola, Saket, Hauz Khas, GK, Nehru Place, NFC',
    deliveryTime: '15 - 25 Mins',
    fleetType: 'SUVs, Sedans & 4x4 Off-Roaders',
    tag: '⚡ Primary Dispatch Hub',
  },
  {
    name: 'Noida Hub',
    address: 'Sector 62 & Sector 18 Commercial Belt, Noida',
    coverage: 'Noida Expressway, Sector 18, Indirapuram, Greater Noida',
    deliveryTime: '20 - 30 Mins',
    fleetType: 'Compact SUVs & City Hatchbacks',
    tag: '🏢 IT Corridor Hub',
  },
  {
    name: 'Central Delhi Hub',
    address: 'Shaheen Bagh & New Friends Colony, New Delhi',
    coverage: 'Connaught Place, Pragati Maidan, ITO, Central NCR',
    deliveryTime: '20 - 30 Mins',
    fleetType: 'Luxury 7-Seater MPVs & Executive Sedans',
    tag: '🏆 Outstation & Family Hub',
  },
  {
    name: 'Airport Express Hub',
    address: 'IGI Airport Terminal 1, 2 & 3, New Delhi',
    coverage: 'Delhi Aerocity, Dwarka Expressway, Mahipalpur',
    deliveryTime: 'Guaranteed Flight Pickup',
    fleetType: 'All Vehicle Classes',
    tag: '✈️ 24/7 Airport Service',
  },
]

// ── JOURNEY MILESTONES ──
const MILESTONES = [
  {
    year: '2026 Q1',
    title: 'Founded in South Delhi',
    description: 'Launched with a handpicked fleet of 3 verified self-drive SUVs in Jasola Vihar to solve the frustrating deposit traps of big rental apps.',
  },
  {
    year: '2026 Q2',
    title: 'The Direct WhatsApp Revolution',
    description: 'Pioneered 100% direct-to-owner WhatsApp handovers with zero mandatory app downloads, instant KYC, and test-before-pay assurance.',
  },
  {
    year: '2026 Q3',
    title: 'Noida & Airport Expansion',
    description: 'Expanded fleet to 14+ certified vehicles across 4 strategic NCR hubs, achieving 500+ successful mountain & city road trips with 4.96★ rating.',
  },
]

export function AboutPage() {
  return (
    <div className="grid gap-16 md:gap-20 lg:gap-24 relative">

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/90 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-ink p-7 sm:p-10 md:p-14 lg:p-16 text-white">
        {/* Background Image with High Opacity & Cinematic Vibrancy */}
        <img
          src={heroLuxuryBmw}
          alt="Car Rental Express Fleet"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-70 scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-black/50" />

        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-orange-500/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-amber-500/20 blur-[120px]" />

        <div className="relative z-10 max-w-3xl">
          {/* Header Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/20 px-4 py-1.5 text-xs font-bold text-orange-300 shadow-sm backdrop-blur-md">
            <span className="size-2 rounded-full bg-orange-400 animate-ping" />
            <span>✨ The Direct Car Rental Revolution • Delhi & Noida</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Reinventing Self-Drive Rentals with{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              Direct Trust & Zero Middlemen.
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-300 font-medium">
            Car Rental Express was founded to eliminate deceptive security deposit traps, buggy corporate apps, and faceless customer bots. We connect you directly with verified car owners across Delhi NCR with zero advance hassle.
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Curated Fleet</span>
              <svg className="size-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi! I would like to know more about Car Rental Express direct booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-950/50 px-6 py-3.5 text-sm font-extrabold text-emerald-400 shadow-lg shadow-emerald-950/30 backdrop-blur-md transition-all hover:bg-emerald-900/60 hover:border-emerald-400 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-black tracking-wide">Chat with Fleet Leads 💬</span>
            </a>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {[
              { num: '500+', label: 'Trips Completed', icon: '🛣️' },
              { num: '100%', label: 'Sanitized Cabins', icon: '🧼' },
              { num: '₹0', label: 'Hidden Advance Trap', icon: '🛡️' },
              { num: '4.96★', label: 'Average Host Rating', icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-orange-400 text-lg sm:text-xl font-black">
                  <span>{stat.icon}</span>
                  <span>{stat.num}</span>
                </div>
                <div className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. THE DIRECT TRUST REVOLUTION (OLD WAY VS CAR RENTAL EXPRESS) ── */}
      <section className="luxury-section-box relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
              <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
              Why We Are Different
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              The <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Direct Owner Advantage</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            See how booking directly with car owners solves every pain point of traditional car rental aggregators.
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Traditional Car Rental Apps (The Bad Old Way) */}
          <div className="rounded-3xl border border-rose-200/80 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-sm mb-4">
              <span className="grid size-7 place-items-center rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 text-base">✕</span>
              <span>Traditional Rental Apps & Aggregators</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none shrink-0">✕</span>
                <span><strong>Heavy Security Deposit Trap:</strong> ₹5,000 to ₹10,000 blocked for weeks after return with endless deductions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none shrink-0">✕</span>
                <span><strong>Mandatory App & Slow KYC:</strong> Invasive app downloads, slow facial scans, and buggy payment gateways.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none shrink-0">✕</span>
                <span><strong>Faceless Call Center Bots:</strong> If the car breaks down on the highway, you wait on hold with generic automated IVR.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none shrink-0">✕</span>
                <span><strong>Uncertain Car Health:</strong> Worn-out tires and unclean cabins because fleet handlers do not own the vehicle.</span>
              </li>
            </ul>
          </div>

          {/* Car Rental Express Direct Model (The Modern Way) */}
          <div className="rounded-3xl border-2 border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-base font-black">✓</span>
                <span>Car Rental Express Direct Model</span>
              </div>
              <span className="rounded-full bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5">OUR PROMISE</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-base leading-none shrink-0">✓</span>
                <span><strong>Zero Advance Trap:</strong> Inspect the vehicle in person, check tires & AC, pay only after 100% satisfaction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-base leading-none shrink-0">✓</span>
                <span><strong>5-Minute WhatsApp Handover:</strong> Quick driving license verification and direct keys delivery to your doorstep.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-base leading-none shrink-0">✓</span>
                <span><strong>Direct Owner Contact 24/7:</strong> Call or WhatsApp the vehicle owner directly anytime for instant roadside assistance.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-base leading-none shrink-0">✓</span>
                <span><strong>Owner-Maintained Excellence:</strong> Every car is maintained with genuine pride, fresh lubricants, and hospital-grade sanitization.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── 3. FOUNDER & OWNER SPOTLIGHT (FAIZAN) ── */}
      <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border-2 border-orange-300/80 dark:border-slate-800 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl">
        {/* Soft Ambient Background Orbs */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 size-72 rounded-full bg-amber-400/15 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-center">
          
          {/* Left: Founder Photo Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative group w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-950 ring-4 ring-orange-400/20">
              <img
                src={faizanImg}
                alt="Faizan Ahmad - Founder & Fleet Lead"
                className="h-full w-full object-cover object-[center_75%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

              {/* Founder Tag at Top */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-black text-white shadow-md border border-white/10">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Founder & Fleet Lead</span>
              </div>

              {/* Bottom Info on Photo */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-300 drop-shadow-sm">Car Rental Express</div>
                <div className="font-heading text-xl font-black text-white drop-shadow-md">Faizan Ahmad</div>
                <div className="text-[11px] font-medium text-slate-200">South Delhi & Noida Fleet Lead</div>
              </div>
            </div>
          </div>

          {/* Right: Founder Story & Highlights */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-100/90 dark:bg-orange-950/50 px-4 py-1 text-xs font-black text-orange-700 dark:text-orange-300 shadow-2xs self-start">
              <span className="size-2 rounded-full bg-orange-500 animate-ping" />
              <span>👑 Founder's Note & Owner Spotlight</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              "We built this so you never have to deal with{' '}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                deposit traps or faceless apps."
              </span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
              Hello! I'm <strong>Faizan Ahmad</strong>, the founder of Car Rental Express. After seeing countless road-trippers frustrated by delayed security deposit refunds and mechanical breakdowns from corporate aggregators, I decided to build a 100% transparent direct-owner rental network in Delhi NCR.
            </p>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
              Before handing over any keys, I personally inspect vehicle tire health, brake systems, air conditioning, and sanitized interiors. When you book with us, there are zero surprise deductions, and you have my direct WhatsApp number for 24/7 roadside assistance throughout your trip.
            </p>

            {/* Quick Highlights Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <div className="grid size-9 place-items-center rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-base shrink-0">
                  🛡️
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Zero Advance Trap</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Test-drive first, pay after inspection</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <div className="grid size-9 place-items-center rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-base shrink-0">
                  🚗
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">4x4 & SUV Specialist</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Thar, Scorpio-N, Jimny & Sedans</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <div className="grid size-9 place-items-center rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 text-base shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">South Delhi Hub</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Jasola / Okhla express doorstep dispatch</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <div className="grid size-9 place-items-center rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-base shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">24/7 Direct Hotline</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Direct owner WhatsApp support on road</div>
                </div>
              </div>
            </div>

            {/* Direct Connect CTA */}
            <div className="mt-5 flex items-center">
              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Faizan%20Ahmad!%20I%20visited%20the%20About%20Us%20page%20and%20would%20like%20to%20know%20more%20about%20booking%20a%20car.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/60 px-6 py-3 text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/15 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 font-black">💬 Chat Directly with Faizan Ahmad</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">→</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. MEET THE TRUSTED OWNERS (3D STAGGERED CAROUSEL WITHOUT ABOUT BUTTON) ── */}
      <BehindYourSafeRide showAboutButton={false} />

      {/* ── 4. 6 CORE PILLARS OF EXCELLENCE (INTERACTIVE 3D CARDS) ── */}
      <section className="grid gap-8">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
            Uncompromising Standards
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Built On <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">6 Pillars of Excellence</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Every booking, handover, and kilometer is backed by these core principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CORE_PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`card-review-animated group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${pillar.border} dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 border border-orange-200/80 dark:border-slate-700 text-2xl shadow-xs group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-[11px] font-black text-slate-700 dark:text-slate-300">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-0.5">
                  {pillar.subtitle}
                </div>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
                <span>Pillar 0{i + 1}</span>
                <span className="text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">Guaranteed ✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. OPERATIONAL HUBS & COVERAGE (DELHI & NOIDA) ── */}
      <section className="grid gap-8">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
            Delhi NCR Presence
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Strategic <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Delivery Hubs</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Fast 20-30 minute doorstep vehicle handover across all major Delhi, Noida, and Airport zones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HUBS.map((hub) => (
            <div
              key={hub.name}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-md hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200/80 dark:border-orange-700/50 px-2.5 py-1 text-[11px] font-black text-orange-700 dark:text-orange-400 mb-3">
                  {hub.tag}
                </span>
                <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">{hub.name}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">{hub.address}</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 dark:text-slate-500 font-bold block text-[10px] uppercase tracking-wider">Coverage:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{hub.coverage}</span>
                  </div>
                  <div className="rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 p-2 border border-emerald-100 dark:border-emerald-800/60">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[10px] uppercase tracking-wider">Delivery Window:</span>
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300">{hub.deliveryTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                🚗 {hub.fleetType}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. OUR JOURNEY MILESTONES ── */}
      <section className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-4 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
            <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
            Our Milestones
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            From 3 Cars to <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">NCR's Favorite</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            We started with a single conviction: Self-drive car rentals shouldn't require risking ₹10,000 deposits or struggling with impersonal bots.
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
            By keeping fleet sizes curated, mechanically perfect, and directly accessible via WhatsApp, we have built a community of passionate road-trippers across Delhi and Noida.
          </p>

          <div className="mt-6 grid gap-3.5">
            {MILESTONES.map((m, i) => (
              <div key={m.title} className="flex gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:border-orange-300 dark:hover:border-orange-500/50 transition-all">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-black text-white shadow-md">
                  0{i + 1}
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400">{m.year}</div>
                  <div className="font-heading text-base font-black text-slate-900 dark:text-white">{m.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Visual Showcase */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl md:sticky md:top-24">
          <img
            src={roadTripImg}
            alt="Car Rental Express Road Trips"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-2xl border border-white/20 bg-slate-900/85 p-5 text-white backdrop-blur-md shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-orange-300">Our Community Promise</div>
              <div className="font-heading mt-1 text-xl font-bold text-white">500+ Safe Mountain & Highway Journeys</div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-medium">
                Tested on Manali passes, Jaipur highways, and Delhi city traffic with 100% breakdown-free safety record.
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {['🏔️ Manali / Ladakh Ready', '🏰 Rajasthan Highway', '⚡ 24/7 Roadside Shield', '🛡️ Zero Advance Trap'].map((t) => (
                  <span key={t} className="rounded-full border border-orange-400/30 bg-orange-500/20 px-3 py-0.5 text-[11px] font-semibold text-orange-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM LUXURY CTA BANNER ── */}
      <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-orange-300/60 bg-gradient-to-br from-slate-950 via-slate-900 to-ink p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/20 px-4 py-1 text-xs font-bold text-orange-300 backdrop-blur-md">
            <span>✨ Zero Deposit • Instant WhatsApp Handover</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Ready To Experience{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              Direct Trust Rentals?
            </span>
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            Browse our verified fleet or chat directly with our co-founders on WhatsApp. No app installations, no credit card requirements, just pure driving freedom.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/cars"
              className="rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-orange-500/25 transition duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Browse 14+ Fleet Cars
            </Link>
            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi! I would like to book a self-drive car with Car Rental Express.`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-emerald-400/50 bg-emerald-950/50 px-8 py-3.5 text-sm font-extrabold text-emerald-400 shadow-xl shadow-emerald-950/30 backdrop-blur-md transition duration-300 hover:bg-emerald-900/60 hover:border-emerald-400 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-black tracking-wide">💬 Direct WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
