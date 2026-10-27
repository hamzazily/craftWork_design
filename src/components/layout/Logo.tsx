import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export function LogoMark({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'accent' }) {
  return (
    <span
      className={cn(
        'grid h-8 w-8 shrink-0 place-items-center rounded-card',
        tone === 'dark' ? 'bg-obsidian text-snow' : 'bg-acid-green text-ink-black',
        className,
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 3h3.2l2.8 7.4L10.8 3H14l-4.6 10.4H6.6L2 3Z" fill="currentColor" />
      </svg>
    </span>
  )
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'accent' }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Craftwork — home">
      <LogoMark tone={tone} />
      <span className="text-body font-semibold tracking-[-0.3px]">Craftwork</span>
    </Link>
  )
}
