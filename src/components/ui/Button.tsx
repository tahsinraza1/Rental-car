import { cn } from '../../lib/cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition duration-300',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-ink text-white hover:bg-ink/90',
        variant === 'secondary' && 'border border-black/10 bg-white text-ink hover:border-black/20 hover:bg-paper',
        variant === 'ghost' && 'text-muted hover:bg-cream hover:text-ink',
        className,
      )}
      {...props}
    />
  )
}
