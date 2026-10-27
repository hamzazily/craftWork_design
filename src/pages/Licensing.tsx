import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/Button'

const points = [
  'Paid files include a commercial licence for you and your clients.',
  'Pro Access covers every Pro-included resource you download while subscribed.',
  'Files you already downloaded stay licensed if you cancel.',
  'You may not resell, redistribute, or offer the source files as a competing kit.',
]

export default function Licensing() {
  return (
    <Section>
      <p className="text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
        Support
      </p>
      <h1 className="mt-3 max-w-[640px] text-heading md:text-heading-lg">Licensing</h1>
      <p className="mt-4 max-w-[560px] text-body text-graphite">
        Simple rules so you can ship without a lawyer on retain. If a use case is not listed,
        write to us before you publish.
      </p>
      <ul className="mt-10 max-w-[640px] space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="rounded-card border border-hairline bg-snow px-5 py-4 text-body-sm shadow-hairline"
          >
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button to="/browse" variant="ghost">
          Back to the catalogue
        </Button>
      </div>
    </Section>
  )
}
