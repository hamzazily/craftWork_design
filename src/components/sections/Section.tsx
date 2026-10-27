import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export function Section({
  children,
  className,
  wash,
}: {
  children: ReactNode
  className?: string
  wash?: 'a' | 'b'
}) {
  return (
    <section
      className={cn(
        'py-10 md:py-16',
        wash === 'a' && 'wash-a',
        wash === 'b' && 'wash-b',
        className,
      )}
    >
      <div className="page-shell">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; to: string }
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[620px]">
        {eyebrow && (
          <p className="mb-2.5 text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-heading-sm md:text-heading">{title}</h2>
        {description && <p className="mt-3 text-body text-graphite">{description}</p>}
      </div>

      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1.5 rounded-card border border-hairline bg-snow px-4 py-2.5 text-body-sm font-medium shadow-hairline transition-colors hover:border-slate-ink"
        >
          {action.label}
          <ArrowRightIcon size={15} />
        </Link>
      )}
    </div>
  )
}
