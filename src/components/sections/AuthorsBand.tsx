import { Link } from 'react-router-dom'
import { Section, SectionHeading } from './Section'
import { Avatar } from '@/components/ui/Avatar'
import { ArrowUpRightIcon } from '@/components/ui/Icon'
import { authors, products } from '@/data/catalog'
import { formatCompact } from '@/lib/format'

export function AuthorsBand() {
  const featured = authors.slice(0, 3)

  return (
    <Section>
      <SectionHeading
        eyebrow="The authors"
        title="Independent designers, paid 80% of every sale"
        description="No exclusivity clauses, no reduced rate after a promotion. The rate on the day you join is the rate you keep."
        action={{ label: 'Become an author', to: '/sell' }}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((author) => {
          const count = products.filter((p) => p.authorId === author.id).length
          return (
            <article
              key={author.id}
              className="group rounded-card border border-hairline bg-snow p-5 transition-shadow duration-200 hover:shadow-lift"
            >
              <div className="flex items-center gap-3.5">
                <Avatar name={author.name} accent={author.accent} size={48} />
                <div className="min-w-0">
                  <h3 className="truncate text-body font-semibold">{author.name}</h3>
                  <p className="truncate text-caption text-graphite">
                    {author.role} · {author.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-body-sm text-graphite">{author.bio}</p>

              <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-caption text-ash-gray">
                <span>
                  {count} resources · {formatCompact(author.followers)} followers
                </span>
                <Link
                  to={`/browse?author=${author.id}`}
                  className="inline-flex items-center gap-1 text-ink-black transition-transform group-hover:translate-x-0.5"
                >
                  View shelf
                  <ArrowUpRightIcon size={14} />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
