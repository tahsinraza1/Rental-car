import { cn } from '../../lib/cn'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'glass' | 'solid'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border',
        variant === 'default' && 'border-slate-200 bg-white shadow-sm',
        variant === 'glass'   && 'border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm',
        variant === 'solid'   && 'border-slate-200 bg-slate-50',
        className,
      )}
      {...props}
    />
  )
}
