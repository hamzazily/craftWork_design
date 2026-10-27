import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/Button'

export default function About() {
  return (
    <Section>
      <p className="text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
        Company
      </p>
      <h1 className="mt-3 max-w-[640px] text-heading md:text-heading-lg">
        Design resources for people who ship.
      </h1>
      <p className="mt-4 max-w-[560px] text-body text-graphite">
        Craftwork is a marketplace for UI kits, mockups, icons, fonts and illustration from
        independent designers. We keep the catalogue tight so every file is meant to be used,
        not just downloaded.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/browse" size="lg" variant="primary">
          Browse the catalogue
        </Button>
        <Button to="/sell" size="lg" variant="ghost">
          Become an author
        </Button>
      </div>
    </Section>
  )
}
