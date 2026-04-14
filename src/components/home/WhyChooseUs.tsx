const features = [
  { title: 'No Online Payment',      desc: 'Pay directly to the owner. No card details, no payment gateway, no risk. 100% safe.',                              icon: '🔒', bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', tag: '100% Secure',    tagBg: 'bg-emerald-100 text-emerald-700', wide: true  },
  { title: 'Instant Availability',   desc: 'Real-time calendar shows blocked dates. No waiting for confirmation on availability.',                              icon: '📅', bg: 'bg-blue-50',    border: 'border-blue-200',    accent: 'text-blue-700',    tag: 'Real-time',      tagBg: 'bg-blue-100 text-blue-700',       wide: false },
  { title: 'Direct Owner Contact',   desc: 'Talk directly to the car owner on WhatsApp. Better deals, faster responses.',                                      icon: '💬', bg: 'bg-orange-50',  border: 'border-orange-200',  accent: 'text-orange-700',  tag: 'WhatsApp',       tagBg: 'bg-orange-100 text-orange-700',   wide: false },
  { title: 'Transparent Pricing',    desc: 'What you see is what you pay. No surge pricing, no hidden fees, no surprises at checkout.',                        icon: '💰', bg: 'bg-violet-50',  border: 'border-violet-200',  accent: 'text-violet-700',  tag: 'No Hidden Fees', tagBg: 'bg-violet-100 text-violet-700',   wide: false },
  { title: 'Wide Fleet Selection',   desc: 'From budget hatchbacks to premium SUVs — we have the right car for every trip and budget.',                        icon: '🚘', bg: 'bg-sky-50',     border: 'border-sky-200',     accent: 'text-sky-700',     tag: '11+ Cars',       tagBg: 'bg-sky-100 text-sky-700',         wide: false },
  { title: 'Delhi & Noida Coverage', desc: 'Serving Delhi and Noida with doorstep pickup and drop — at your convenience, any time.',                           icon: '📍', bg: 'bg-rose-50',    border: 'border-rose-200',    accent: 'text-rose-700',    tag: 'Delhi & Noida',  tagBg: 'bg-rose-100 text-rose-700',       wide: true  },
]

export function WhyChooseUs() {
  return (
    <section className="grid gap-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-3">
          Why DriveEasy
        </div>
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Built different, for the better</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
          We cut out the middlemen so you get better prices and a more personal experience.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className={`group rounded-2xl border ${f.border} ${f.bg} p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ${f.wide ? 'lg:col-span-2' : ''}`}
          >
            <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold mb-4 ${f.tagBg}`}>
              {f.tag}
            </div>
            <div className="flex items-start gap-4">
              <div className="text-4xl shrink-0">{f.icon}</div>
              <div>
                <div className={`text-sm font-bold mb-1.5 ${f.accent}`}>{f.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
