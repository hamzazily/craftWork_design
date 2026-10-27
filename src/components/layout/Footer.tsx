import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { ArrowRightIcon, CheckIcon, GlobeIcon, MailIcon, UsersIcon } from '@/components/ui/Icon'
import { categories } from '@/data/catalog'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Become an author', to: '/sell' },
      { label: 'Pro Access', to: '/pro' },
      { label: 'Changelog', to: '/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Licensing', to: '/licensing' },
      { label: 'Help centre', to: '/about' },
      { label: 'Refunds', to: '/licensing' },
      { label: 'Contact', to: '/about' },
    ],
  },
]

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="mt-16 border-t border-hairline bg-paper wash-a">
      <div className="page-shell grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-[320px]">
          <Logo tone="accent" />
          <p className="mt-4 text-body-sm text-graphite">
            A marketplace for design resources that were built to be used, not just downloaded.
          </p>

          <form onSubmit={onSubmit} className="mt-6">
            <label htmlFor="newsletter" className="text-caption text-ash-gray">
              One email a week — new releases only
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="newsletter"
                type="email"
                required
                placeholder="you@studio.com"
                className="h-10 w-full rounded-card border border-hairline bg-snow px-3 text-body-sm outline-none placeholder:text-ash-gray focus:border-slate-ink"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-card bg-obsidian text-snow transition-colors hover:bg-charcoal"
              >
                {subscribed ? <CheckIcon size={16} /> : <ArrowRightIcon size={16} />}
              </button>
            </div>
            {subscribed && (
              <p className="mt-2 text-caption text-graphite">
                You are on the list. Check your inbox to confirm.
              </p>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-body-sm font-semibold">Catalogue</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/browse?category=${category.id}`}
                  className="text-body-sm text-graphite transition-colors hover:text-ink-black"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-body-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-body-sm text-graphite transition-colors hover:text-ink-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="page-shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-caption text-ash-gray">
            © {new Date().getFullYear()} Craftwork. Independent designers, fairly paid.
          </p>
          <div className="flex items-center gap-1">
            {[
              { label: 'Community', Icon: UsersIcon },
              { label: 'Newsletter', Icon: MailIcon },
              { label: 'Website', Icon: GlobeIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-card text-graphite transition-colors hover:bg-fog hover:text-ink-black"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
