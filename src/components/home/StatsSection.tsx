import statsHighwayBg from '../../assets/stats-highway-bg.jpg'

export function StatsSection() {
  const stats = [
    {
      value: '500+',
      label: 'Happy Customers',
      glow: 'from-amber-400 to-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.55)] border-amber-300/40',
      icon: (
        <span className="text-2xl select-none">😊</span>
      ),
    },
    {
      value: '11+',
      label: 'Premium Cars',
      glow: 'from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.55)] border-cyan-300/40',
      icon: (
        <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
    },
    {
      value: '2',
      label: 'Locations',
      glow: 'from-teal-300 to-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.55)] border-teal-300/40',
      icon: (
        <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      value: '4.9★',
      label: 'Average Rating',
      glow: 'from-fuchsia-400 to-purple-600 shadow-[0_0_30px_rgba(168,85,247,0.55)] border-fuchsia-300/40',
      icon: (
        <svg className="size-6 text-white fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/15 p-6 md:p-8 lg:p-10 text-white shadow-2xl">
      {/* Background Highway Sunset Image */}
      <img
        src={statsHighwayBg}
        alt="Highway City Sunset"
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center brightness-105 contrast-105 opacity-90"
      />

      {/* Cinematic Dark Gradient Overlay with smooth transition to sunset road on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070D1E]/80 via-[#091124]/55 to-[#121A30]/30" />

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-orange-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/3 top-0 size-72 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 size-72 rounded-full bg-emerald-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-purple-500/25 blur-[100px]" />

      <div className="relative z-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 items-center">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 group transition-transform duration-300 hover:scale-[1.03]"
          >
            {/* Glowing 3D Orb */}
            <div
              className={`flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.glow} border transition-all duration-300 group-hover:scale-105`}
            >
              {s.icon}
            </div>

            {/* Metric & Label */}
            <div>
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none">
                {s.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-300">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
