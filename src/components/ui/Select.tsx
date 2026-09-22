import { cn } from '../../lib/cn'

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }

export function Select({ label, className, children, ...props }: Props) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-muted dark:text-slate-400">{label}</span>
      <select
        className={cn(
          'h-11 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 px-3 text-sm text-ink dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/50 transition duration-300',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}

