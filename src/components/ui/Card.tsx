import { cn } from '../../lib/cn'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'glass' | 'solid'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border transition-colors duration-300',
        variant === 'default' && 'border-black/10 dark:border-white/10 bg-white dark:bg-slate-900',
        variant === 'glass'   && 'border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm',
        variant === 'solid'   && 'border-black/10 dark:border-white/10 bg-cream dark:bg-slate-950',
        className,
      )}
      {...props}
    />
  )
}

