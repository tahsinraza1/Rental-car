import { cn } from '../../lib/cn'

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border border-black/10 bg-cream px-2.5 py-1 text-xs font-medium text-ink', className)}
      {...props}
    />
  )
}
