import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'dark' | 'quiet' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-card font-medium transition-[transform,background-color,border-color,box-shadow] duration-200 ease-craft select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap'

const variants: Record<Variant, string> = {
  /* The singular chromatic fill — one per viewport section. */
  primary: 'bg-acid-green text-ink-black shadow-subtle hover:bg-acid-press',
  /* Paired ghost — identical dimensions to the primary to balance CTA blocks. */
  ghost: 'bg-snow text-ink-black border border-hairline shadow-hairline hover:border-slate-ink',
  dark: 'bg-obsidian text-snow shadow-subtle hover:bg-charcoal',
  quiet: 'bg-transparent text-graphite hover:text-ink-black',
  /* For the inverted (obsidian) panel — keeps the ghost silhouette on a dark ground. */
  inverse: 'border border-mist/35 bg-transparent text-snow hover:border-snow/70',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-body-sm',
  md: 'h-11 px-6 text-body-sm',
  lg: 'h-[52px] px-7 text-body',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  to?: string
  href?: string
  full?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  full,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], full && 'w-full', className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
