import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need to pay any advance or security deposit online?',
    a: 'Zero advance online payment. You only pay directly upon car delivery after physically inspecting the vehicle and keys handover.',
  },
  {
    q: 'What documents are required to rent a car?',
    a: 'You only need two basic documents: a valid Original Driving License (DL) and an Aadhaar Card (or Government ID). No complicated paperwork.',
  },
  {
    q: 'Is there any kilometer limit on my rental?',
    a: 'No! All our self-drive car rentals come with 100% Unlimited Kilometers. Drive as much as you want without worrying about per-km extra penalty charges.',
  },
  {
    q: 'How fast can I get a car delivered to my location?',
    a: 'In Central Hub areas (Jasola, Shaheen Bagh, Okhla, New Friends Colony), dispatch takes 15-20 minutes. For South Delhi and Noida sectors, doorstep delivery takes 30-60 minutes.',
  },
  {
    q: 'Can I extend my booking mid-way through the trip?',
    a: 'Yes, easily! Just send a quick WhatsApp message to the owner. If the car has no immediate next-day booking, your extension will be confirmed immediately.',
  },
]

export function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="luxury-section-box p-6 sm:p-8 md:p-10 grid gap-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
          <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
          Got Questions?
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Frequently Asked <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Everything you need to know about our hassle-free self-drive car rentals.
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl grid gap-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition duration-300 ${
                isOpen
                  ? 'border-accent/40 bg-orange-50/40 dark:bg-orange-950/20 dark:border-orange-500/40 shadow-xs'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-heading text-sm font-bold text-ink dark:text-white pr-4">
                  {faq.q}
                </span>
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                    isOpen ? 'bg-accent text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
