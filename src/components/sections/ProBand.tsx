import { Link } from 'react-router-dom'
import { Section } from './Section'
import { Button } from '@/components/ui/Button'
import { BoltIcon, CheckIcon, InfinityIcon } from '@/components/ui/Icon'
import { products } from '@/data/catalog'

const included = [
  'Every Pro resource, unlimited downloads',
  'New releases the day they land',
  'Commercial licence for you and your clients',
  'Team seats at a flat rate, no per-file maths',
]

export function ProBand() {
  const proCount = products.filter((p) => p.proIncluded).length

  return (
    <Section>
      <div className="grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline md:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-snow p-8 md:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-fog px-2.5 py-1 text-caption font-medium">
            <InfinityIcon size={13} />
            Pro Access
          </span>

          <h2 className="mt-5 text-heading-sm md:text-heading">
            Stop buying files one at a time.
          </h2>
          <p className="mt-3.5 max-w-[440px] text-body text-graphite">
            One subscription opens {proCount} of the {products.length} resources on the shelf,
            including everything released while you are a member.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button to="/pro" size="lg" variant="primary">
              <BoltIcon size={16} />
              Unlock Pro Access
            </Button>
            <Button to="/browse" size="lg" variant="ghost">
              See what is included
            </Button>
          </div>

          <p className="mt-4 text-caption text-ash-gray">
            $16/month billed yearly · cancel any time · files you downloaded stay licensed
          </p>
        </div>

        <ul className="bg-fog p-8 md:p-10">
          {included.map((item) => (
            <li key={item} className="flex gap-3 border-b border-hairline py-4 first:pt-0 last:border-0 last:pb-0">
              <CheckIcon size={17} className="mt-0.5 shrink-0" />
              <span className="text-body-sm">{item}</span>
            </li>
          ))}
          <li className="pt-5">
            <Link to="/licensing" className="text-body-sm underline underline-offset-4">
              Read the licence
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  )
}
