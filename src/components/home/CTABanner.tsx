import { useNavigate } from 'react-router-dom'
import { OWNER_WHATSAPP_NUMBER } from '../../config'

export function CTABanner() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 p-10 md:p-16 shadow-2xl shadow-orange-300">
      {/* blobs */}
      <div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 top-0 size-40 -translate-x-1/2 rounded-full bg-yellow-300/20 blur-2xl pointer-events-none" />

      {/* dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize:'24px 24px'}} />

      <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left md:justify-between">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-bold text-white mb-5 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            Cars available now in Delhi & Noida
          </div>
          <h2 className="text-3xl font-black text-white md:text-4xl leading-tight">
            Ready to hit the road?
          </h2>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Browse our fleet, pick your dates, and book in minutes via WhatsApp. No app download, no credit card required.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center md:justify-start">
            {['No hidden fees', 'Instant confirmation', 'Direct owner contact'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-white/90">
                <svg className="size-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row shrink-0">
          <button
            onClick={() => navigate('/cars')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-orange-600 hover:bg-orange-50 hover:scale-[1.02] transition-all shadow-xl shadow-black/10"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Browse Cars
          </button>
          <a
            href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I want to rent a car`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/15 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/25 hover:scale-[1.02] transition-all backdrop-blur-sm"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
