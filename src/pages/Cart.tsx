import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductArt } from '@/components/product/ProductArt'
import { Button } from '@/components/ui/Button'
import { BoltIcon, CheckIcon, DownloadIcon, ShieldIcon, TrashIcon } from '@/components/ui/Icon'
import { getAuthor, getCategory, products } from '@/data/catalog'
import { useStore } from '@/hooks/useStore'
import { formatPrice } from '@/lib/format'

export default function Cart() {
  const { cart, removeFromCart, clearCart, isPro } = useStore()
  const [purchased, setPurchased] = useState<string[]>([])

  const items = cart
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const gross = items.reduce((sum, item) => sum + item.priceCents, 0)
  const proSavings = isPro
    ? items.reduce((sum, item) => sum + (item.proIncluded ? item.priceCents : 0), 0)
    : 0
  const total = gross - proSavings

  const complete = () => {
    setPurchased(items.map((item) => item.title))
    clearCart()
  }

  if (purchased.length > 0) {
    return (
      <div className="page-shell py-16 md:py-24">
        <div className="mx-auto max-w-[560px] rounded-panel border border-hairline bg-snow p-8 text-center shadow-subtle">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-pill bg-acid-green text-ink-black">
            <CheckIcon size={22} />
          </span>
          <h1 className="mt-5 text-heading-sm">Order complete</h1>
          <p className="mt-2.5 text-body-sm text-graphite">
            {purchased.length} {purchased.length === 1 ? 'resource is' : 'resources are'} now in
            your library, licensed to you and every client project you use them in.
          </p>

          <ul className="mt-6 divide-y divide-hairline text-left">
            {purchased.map((title) => (
              <li key={title} className="flex items-center justify-between gap-3 py-3">
                <span className="text-body-sm">{title}</span>
                <span className="inline-flex items-center gap-1.5 text-caption text-graphite">
                  <DownloadIcon size={14} />
                  Ready
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button to="/browse" variant="ghost">
              Keep browsing
            </Button>
            <Button to="/pro" variant="dark">
              Manage Pro Access
            </Button>
          </div>

          <p className="mt-5 text-caption text-ash-gray">
            Demonstration checkout — no payment was taken and no card details were collected.
          </p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page-shell py-16 md:py-24">
        <div className="mx-auto max-w-[520px] rounded-panel border border-hairline bg-snow p-10 text-center">
          <h1 className="text-heading-sm">Your cart is empty</h1>
          <p className="mx-auto mt-2.5 max-w-[360px] text-body-sm text-graphite">
            Nothing here yet. The free shelf is a reasonable place to start — four resources, no
            account required.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button to="/browse?price=free" variant="primary">
              Browse free resources
            </Button>
            <Button to="/browse" variant="ghost">
              Open the catalogue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell py-10 md:py-14">
      <h1 className="text-heading md:text-heading-lg">Cart</h1>
      <p className="mt-2.5 text-body text-graphite">
        {items.length} {items.length === 1 ? 'resource' : 'resources'} · files are available the
        moment the order completes.
      </p>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ul className="space-y-3">
          {items.map((item) => {
            const author = getAuthor(item.authorId)
            const covered = isPro && item.proIncluded
            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-card border border-hairline bg-snow p-3.5"
              >
                <Link
                  to={`/product/${item.slug}`}
                  className="w-[120px] shrink-0 overflow-hidden rounded-preview bg-fog"
                >
                  <ProductArt
                    variant={item.art.variant}
                    accent={item.art.accent}
                    seed={item.art.seed}
                    className="block aspect-[7/5] w-full"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-caption text-ash-gray">
                    {getCategory(item.categoryId)?.label} · {author.name}
                  </p>
                  <h2 className="mt-1 truncate text-body font-semibold">
                    <Link to={`/product/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <p className="mt-1 truncate text-body-sm text-graphite">{item.tagline}</p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-body-sm font-semibold">
                      {covered ? (
                        <span className="inline-flex items-center gap-1.5 text-graphite">
                          <BoltIcon size={13} />
                          Covered by Pro
                        </span>
                      ) : (
                        formatPrice(item.priceCents)
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex items-center gap-1.5 text-caption text-graphite transition-colors hover:text-vermillion"
                    >
                      <TrashIcon size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-hairline bg-snow p-6 shadow-subtle">
            <h2 className="text-subheading font-semibold">Order summary</h2>

            <dl className="mt-5 space-y-3 text-body-sm">
              <div className="flex justify-between">
                <dt className="text-graphite">Subtotal</dt>
                <dd>{formatPrice(gross)}</dd>
              </div>
              {proSavings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-graphite">Pro Access credit</dt>
                  <dd className="text-vermillion">−{formatPrice(proSavings)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-hairline pt-3 text-body font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button variant="primary" size="lg" full onClick={complete}>
                Complete purchase
              </Button>
            </div>

            <p className="mt-3 text-center text-caption text-ash-gray">
              Demonstration checkout — no payment is processed.
            </p>

            <div className="mt-6 flex gap-3 border-t border-hairline pt-5">
              <ShieldIcon size={18} className="mt-0.5 shrink-0 text-graphite" />
              <p className="text-caption text-graphite">
                Every file carries the standard licence: unlimited personal and commercial use,
                including client work.{' '}
                <Link to="/licensing" className="text-ink-black underline underline-offset-2">
                  Read it
                </Link>
              </p>
            </div>
          </div>

          {!isPro && proSavings === 0 && (
            <div className="mt-3 rounded-card border border-hairline bg-fog p-5">
              <p className="text-body-sm">
                {items.filter((i) => i.proIncluded).length} of these are included with Pro Access at
                $16/month.
              </p>
              <Link
                to="/pro"
                className="mt-2.5 inline-flex items-center gap-1.5 text-body-sm font-medium underline underline-offset-4"
              >
                <BoltIcon size={14} />
                Compare with Pro
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
