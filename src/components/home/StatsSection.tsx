const stats = [
  { value: '500+', label: 'Happy Customers', icon: '😊', bg: 'bg-orange-50', border: 'border-orange-200', val: 'text-orange-600', sub: 'text-orange-400' },
  { value: '11+',  label: 'Premium Cars',    icon: '🚗', bg: 'bg-blue-50',   border: 'border-blue-200',   val: 'text-blue-600',   sub: 'text-blue-400' },
  { value: '2',    label: 'Locations',       icon: '📍', bg: 'bg-emerald-50',border: 'border-emerald-200',val: 'text-emerald-600',sub: 'text-emerald-400' },
  { value: '4.9★', label: 'Average Rating',  icon: '⭐', bg: 'bg-amber-50',  border: 'border-amber-200',  val: 'text-amber-600',  sub: 'text-amber-400' },
]

export function StatsSection() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className={`flex flex-col items-center justify-center gap-3 rounded-2xl border ${s.border} ${s.bg} p-6 text-center shadow-sm`}>
          <span className="text-3xl">{s.icon}</span>
          <div className={`text-3xl font-black ${s.val}`}>{s.value}</div>
          <div className={`text-xs font-semibold ${s.sub}`}>{s.label}</div>
        </div>
      ))}
    </section>
  )
}
