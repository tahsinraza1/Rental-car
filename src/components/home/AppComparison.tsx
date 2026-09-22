const comparisonItems = [
  {
    feature: 'Advance Booking Payment',
    express: '₹0 Advance Required — Pay on car inspection',
    traditional: '100% upfront card payment required',
    expressPositive: true,
  },
  {
    feature: 'Security Deposit Policy',
    express: 'Zero security deposit traps or deductions',
    traditional: '₹5,000 – ₹10,000 bank hold for 7-14 days',
    expressPositive: true,
  },
  {
    feature: 'Kilometer Allowance',
    express: 'Unlimited Kilometers included in flat rate',
    traditional: 'Strict 150-300 km caps with heavy extra charges',
    expressPositive: true,
  },
  {
    feature: 'Customer Support',
    express: 'Direct WhatsApp with Verified Car Owner',
    traditional: 'Automated AI chatbots & long call queues',
    expressPositive: true,
  },
  {
    feature: 'Doorstep Delivery',
    express: 'Fast delivery across Delhi & Noida in 30-60 mins',
    traditional: 'Fixed faraway parking lots only',
    expressPositive: true,
  },
  {
    feature: 'Booking Convenience',
    express: 'No app download needed — Instant WhatsApp',
    traditional: 'Mandatory app install & long KYC validation',
    expressPositive: true,
  },
]

export function AppComparison() {
  return (
    <section className="luxury-section-box p-6 sm:p-8 md:p-10 grid gap-8">
      <div>
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-2xs">
          <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
          Honest Comparison
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Why Drivers Choose <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">Car Rental Express</span>
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Compare our direct owner-to-driver model against traditional corporate rental apps.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/80">
                <th className="p-5 font-heading text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Feature / Benefit
                </th>
                <th className="p-5 font-heading text-sm font-extrabold text-accent bg-orange-50/70 dark:bg-orange-950/40 border-x border-orange-100 dark:border-orange-900/40 min-w-[240px]">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    Car Rental Express
                  </div>
                </th>
                <th className="p-5 font-heading text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 min-w-[220px]">
                  Traditional Rental Apps
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition duration-150">
                  <td className="p-5 font-heading text-xs font-bold text-ink dark:text-white sm:text-sm">
                    {item.feature}
                  </td>
                  <td className="p-5 bg-orange-50/30 dark:bg-orange-950/20 border-x border-orange-100 dark:border-orange-900/40 font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white mt-0.5 shadow-2xs">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span>{item.express}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mt-0.5">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span>{item.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
