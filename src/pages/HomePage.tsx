import { CTABanner } from '../components/home/CTABanner'
import { HowItWorks } from '../components/home/HowItWorks'
import { StatsSection } from '../components/home/StatsSection'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { FleetMarquee } from '../components/home/FleetMarquee'
import { UseCasesSection } from '../components/home/UseCasesSection'
import { ScenicHero } from '../components/home/ScenicHero'
import { FeedbackSection } from '../components/home/FeedbackSection'
import { BehindYourSafeRide } from '../components/home/BehindYourSafeRide'
import { FeaturedCarsSection } from '../components/home/FeaturedCarsSection'

import featuredWaveBg from '../assets/featured-wave-bg.png'

export function HomePage() {
  return (
    <div className="relative grid gap-8 md:gap-11 lg:gap-14">

      {/* ULTRA LUXURY SCENIC HERO SECTION */}
      <ScenicHero />

      {/* ── SHOWCASE SECTION (STATS + MARQUEE + FEATURED CARS WITH ABSTRACT WAVE BG) ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 lg:p-10 transition-colors duration-300">
        {/* Abstract Wave Gradient Background Image */}
        <img
          src={featuredWaveBg}
          alt="Showcase Wave Background"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom dark:opacity-40"
        />

        {/* Subtle overlay */}
        <div className="pointer-events-none absolute inset-0 bg-white/10 dark:bg-slate-950/50" />


        {/* Content Layer */}
        <div className="relative z-10 grid gap-8 md:gap-10">
          {/* STATS SECTION (GLOWING 3D ORBS PILL BANNER) */}
          <StatsSection />

          {/* FLEET MARQUEE */}
          <FleetMarquee />

          {/* FEATURED CARS WITH 4-CARD CAROUSEL & PILL CATEGORY TABS */}
          <FeaturedCarsSection />
        </div>
      </div>

      {/* USE CASES */}
      <UseCasesSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* LIVE CUSTOMER FEEDBACK & REVIEWS (POWERED BY FIREBASE) */}
      <FeedbackSection />

      {/* BEHIND YOUR SAFE RIDE (3-SECOND AUTO SLIDING SAFETY CAROUSEL) */}
      <BehindYourSafeRide />

      {/* BOTTOM CTA BANNER */}
      <CTABanner />
    </div>
  )
}