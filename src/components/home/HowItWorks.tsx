const steps = [
  {
    step: '01', title: 'Browse & Pick',
    description: 'Explore our fleet of well-maintained cars. Filter by type or budget to find your perfect ride.',
    icon: (<svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>),
    bg: 'bg-orange-500', shadow: 'shadow-orange-200',
  },
  {
    step: '02', title: 'Check Availability',
    description: 'Select your pickup and return dates. Our real-time calendar shows exactly which dates are free.',
    icon: (<svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>),
    bg: 'bg-blue-500', shadow: 'shadow-blue-200',
  },
  {
    step: '03', title: 'Book via WhatsApp',
    description: 'Enter your details and send a booking request directly to the owner via WhatsApp. No app needed.',
    icon: (<svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>),
    bg: 'bg-emerald-500', shadow: 'shadow-emerald-200',
  },
  {
    step: '04', title: 'Drive & Enjoy',
    description: 'Owner confirms on WhatsApp. Pick up the car and hit the road. No hidden charges, ever.',
    icon: (<svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>),
    bg: 'bg-amber-500', shadow: 'shadow-amber-200',
  },
]

export function HowItWorks() {
  return (
    <section className="grid gap-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 mb-3">
          Simple Process
        </div>
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">Book in 4 easy steps</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
          From browsing to driving — the whole process takes under 5 minutes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.step} className="relative flex flex-col gap-5">
            {/* connector */}
            {i < steps.length - 1 && (
              <div className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] bg-gradient-to-r from-slate-300 to-transparent lg:block" />
            )}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 h-full flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`grid size-14 shrink-0 place-items-center rounded-2xl ${s.bg} text-white shadow-lg ${s.shadow}`}>
                  {s.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 leading-none">{s.step}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
