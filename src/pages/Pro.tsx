import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/Button'
import { BoltIcon, CheckIcon } from '@/components/ui/Icon'
import { products } from '@/data/catalog'
import { useStore } from '@/hooks/useStore'

const included = [
  'Every Pro resource, unlimited downloads',
  'New releases the day they land',
  'Commercial licence for you and your clients',
  'Team seats at a flat rate, no per-file maths',
]

export default function Pro() {
  const { isPro, activatePro, cancelPro } = useStore()
  const proCount = products.filter((p) => p.proIncluded).length

  return (
    <Section wash="a">
      <p className="text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
        Pro Access
      </p>
      <h1 className="mt-3 max-w-[640px] text-heading md:text-heading-lg">
        One subscription. The shelf stays open.
      </h1>
      <p className="mt-4 max-w-[520px] text-body text-graphite">
        Unlock {proCount} of {products.length} resources, including everything released while you
        are a member. $16/month billed yearly.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {isPro ? (
          <>
            <Button size="lg" variant="dark" disabled>
              <BoltIcon size={16} />
              Pro is active
            </Button>
            <Button size="lg" variant="ghost" onClick={cancelPro}>
              Cancel membership
            </Button>
          </>
        ) : (
          <Button size="lg" variant="primary" onClick={activatePro}>
            <BoltIcon size={16} />
            Unlock Pro Access
          </Button>
        )}
        <Button to="/browse?price=pro" size="lg" variant="ghost">
          See what is included
        </Button>
      </div>

      <ul className="mt-12 max-w-[560px] overflow-hidden rounded-panel border border-hairline bg-snow">
        {included.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-b border-hairline px-6 py-4 last:border-0"
          >
            <CheckIcon size={17} className="mt-0.5 shrink-0" />
            <span className="text-body-sm">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
