import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, BoltIcon, SparkIcon } from '@/components/ui/Icon'

const stats = [
  { value: '4,800', label: 'resources' },
  { value: '260', label: 'independent authors' },
  { value: '38k', label: 'designers subscribed' },
]

export function Hero() {
  return (
    <section className="wash-hero">
      <div className="page-shell flex flex-col items-center py-20 text-center md:py-28">
        <span className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-snow px-3 py-1.5 text-caption text-graphite shadow-hairline">
          <SparkIcon size={13} className="text-magenta-pop" />
          New this week — Axis Variable, three axes in one file
        </span>

        <h1 className="mt-7 max-w-[860px] text-heading sm:text-heading-lg md:text-display-sm lg:text-display">
          Design resources built to be used, not just downloaded.
        </h1>

        <p className="mt-6 max-w-[560px] text-body text-graphite md:text-subheading">
          Kits, mockups, icons, fonts and illustration from designers who ship. Buy one file or
          unlock the whole shelf with Pro Access.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button to="/pro" size="lg" variant="primary">
            <BoltIcon size={16} />
            Unlock Pro Access
          </Button>
          <Button to="/browse" size="lg" variant="ghost">
            Explore catalogue
            <ArrowRightIcon size={16} />
          </Button>
        </div>

        <dl className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-body font-semibold">{stat.value}</dd>
              <span className="text-body-sm text-graphite">{stat.label}</span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
