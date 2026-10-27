import { Section, SectionHeading } from './Section'
import { Avatar } from '@/components/ui/Avatar'
import { StarIcon } from '@/components/ui/Icon'
import { testimonials } from '@/data/catalog'

export function Testimonials() {
  return (
    <Section wash="a">
      <SectionHeading
        eyebrow="Reviews"
        title="What people say once the file is open"
        description="Collected from verified purchases across the last twelve months."
      />

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map((item) => (
          <figure
            key={item.id}
            className="mb-5 break-inside-avoid rounded-card border border-hairline bg-snow p-5"
          >
            <div className="flex gap-0.5 text-ink-black" aria-label="Five out of five">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} size={13} filled />
              ))}
            </div>

            <blockquote className="mt-3.5 text-body-sm">“{item.quote}”</blockquote>

            <figcaption className="mt-5 flex items-center gap-3">
              <Avatar name={item.name} accent={item.accent} size={40} />
              <span>
                <span className="block text-body-sm font-semibold">{item.name}</span>
                <span className="block text-caption text-graphite">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
