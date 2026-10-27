import { Section, SectionHeading } from './Section'
import { LayersIcon, ShieldIcon, RefreshIcon } from '@/components/ui/Icon'

const features = [
  {
    Icon: LayersIcon,
    accent: 'text-ink-black',
    title: 'Reviewed before it ships',
    body: 'Every file is opened, checked against the grid and tested at real sizes. Nothing lands in the catalogue because it looked good in a thumbnail.',
  },
  {
    Icon: ShieldIcon,
    accent: 'text-vermillion',
    title: 'One licence, all of it',
    body: 'Commercial use, client work and unlimited projects on every purchase. The licence is one page and you can read the whole thing.',
  },
  {
    Icon: RefreshIcon,
    accent: 'text-magenta-pop',
    title: 'Updates stay yours',
    body: 'Authors keep shipping revisions after release. You get every version that follows, for as long as the file exists.',
  },
]

export function FeatureBand() {
  return (
    <Section wash="b">
      <SectionHeading
        eyebrow="How it works"
        title="A marketplace that behaves like a studio"
        description="Three things we refuse to compromise on, because they are the reasons bought files usually get thrown away."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {features.map(({ Icon, accent, title, body }) => (
          <article
            key={title}
            className="rounded-card border border-hairline bg-snow p-5 shadow-hairline"
          >
            <span className={`grid h-11 w-11 place-items-center rounded-card bg-fog ${accent}`}>
              <Icon size={20} />
            </span>
            <h3 className="mt-5 text-subheading font-semibold">{title}</h3>
            <p className="mt-2.5 text-body-sm text-graphite">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
