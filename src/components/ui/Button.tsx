import { cn } from '../../lib/cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 hover:opacity-90',
        variant === 'secondary' && 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm',
        variant === 'ghost' && 'text-slate-600 hover:bg-slate-100',
        className,
      )}
      {...props}
    />
  )
}
