import { cn } from '../../lib/cn'

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }

export function Select({ label, className, children, ...props }: Props) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <select
        className={cn(
          'h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900',
          'focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
