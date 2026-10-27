import { Section } from './Section'
import { Button } from '@/components/ui/Button'
import { BoltIcon } from '@/components/ui/Icon'

export function ClosingCta() {
  return (
    <Section>
      <div className="rounded-panel bg-obsidian px-6 py-16 text-center md:px-16 md:py-20">
        <h2 className="mx-auto max-w-[680px] text-heading-sm text-snow md:text-heading-lg">
          Open the shelf. Everything on it was made to be opened.
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-body text-mist">
          Start with the free resources, or unlock the full catalogue for less than the cost of one
          kit a month.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/pro" size="lg" variant="primary">
            <BoltIcon size={16} />
            Unlock Pro Access
          </Button>
          <Button to="/browse" size="lg" variant="inverse">
            Browse free resources
          </Button>
        </div>
      </div>
    </Section>
  )
}
