import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/Button'

export default function Sell() {
  return (
    <Section>
      <p className="text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
        Authors
      </p>
      <h1 className="mt-3 max-w-[640px] text-heading md:text-heading-lg">
        Put your files on a shelf people actually use.
      </h1>
      <p className="mt-4 max-w-[520px] text-body text-graphite">
        Craftwork pays independently, on time, and does not bury your work under a wall of
        similar kits. Apply with a portfolio — we review every week.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="mailto:authors@craftwork.studio" size="lg" variant="primary">
          Apply to sell
        </Button>
        <Button to="/browse" size="lg" variant="ghost">
          See the catalogue
        </Button>
      </div>
    </Section>
  )
}
