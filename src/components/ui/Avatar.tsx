import type { AccentKey } from '@/data/types'
import { cn } from '@/lib/cn'

const tints: Record<AccentKey, string> = {
  green: 'bg-acid-green text-ink-black',
  vermillion: 'bg-vermillion/12 text-vermillion',
  magenta: 'bg-magenta-pop/12 text-magenta-pop',
  ink: 'bg-fog text-ink-black',
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/** Identity marks are typographic — the system uses no photography of people. */
export function Avatar({
  name,
  accent = 'ink',
  size = 40,
  className,
}: {
  name: string
  accent?: AccentKey
  size?: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-pill font-semibold',
        tints[accent],
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
