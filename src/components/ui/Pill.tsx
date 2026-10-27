import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Subcategory filter chip — 9999px radius, compact, text-only. */
export function FilterPill({
  active,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-pill px-4 py-2.5 text-body-sm transition-colors duration-200 ease-craft',
        active
          ? 'bg-obsidian text-snow'
          : 'bg-fog text-graphite hover:bg-hairline hover:text-ink-black',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Static label — metadata, not an action. */
export function Tag({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: 'neutral' | 'accent' | 'vermillion' | 'magenta' | 'dark'
  className?: string
  children: ReactNode
}) {
  const tones = {
    neutral: 'bg-fog text-graphite',
    accent: 'bg-acid-green text-ink-black',
    vermillion: 'text-vermillion border border-vermillion/35 bg-snow',
    magenta: 'text-magenta-pop border border-magenta-pop/35 bg-snow',
    dark: 'bg-obsidian text-snow',
  } as const

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-caption font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
