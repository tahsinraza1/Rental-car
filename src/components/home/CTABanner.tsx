import { useNavigate } from 'react-router-dom'
import { OWNER_WHATSAPP_NUMBER } from '../../config'
import ctaBannerBg from '../../assets/cta-banner-bg.png'

export function CTABanner() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-slate-700/60 bg-slate-950 shadow-2xl">
      {/* Background Scenic Fortuner Sunset Highway Image (High Opacity & Visibility) */}
      <img
        src={ctaBannerBg}
        alt="Ready to Experience Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_right] opacity-100 transition-transform duration-1000 ease-out hover:scale-103"
      />

      {/* Subtle Soft Gradient Overlay for Text Readability without Darkening BG */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent sm:via-slate-950/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent sm:hidden" />

      {/* Content Layer */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          {/* Top Pill Badge */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-slate-950/65 backdrop-blur-md px-3 py-1 text-xs font-semibold text-orange-200 shadow-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-xs" />
            <span>Instant live booking across Delhi & Noida</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
            Ready to experience <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
              the road on your terms?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-100 drop-shadow">
            Browse our curated fleet, check real-time availability, and reserve in under 2 minutes via WhatsApp. No credit card, no security deposit traps.
          </p>

          {/* Feature Checklist */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-100">
            {[
              'Unlimited kilometers',
              'No advance payment online',
              'Doorstep delivery available',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 drop-shadow-xs">
                <div className="flex size-3.5 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  <svg className="size-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons (Positioned Lower on Desktop as Requested) */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center shrink-0 md:self-end md:translate-y-3 lg:translate-y-5">
          <button
            onClick={() => navigate('/cars')}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Browse All Cars</span>
          </button>

          <a
            href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I want to rent a car`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/50 bg-slate-950/80 backdrop-blur-md px-5.5 py-3 text-xs sm:text-sm font-extrabold text-emerald-400 shadow-xl shadow-emerald-950/30 transition-all duration-300 hover:bg-emerald-950/60 hover:border-emerald-400 hover:scale-105 active:scale-95"
          >
            <svg className="size-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Owner</span>
          </a>
        </div>
      </div>
    </section>
  )
}
