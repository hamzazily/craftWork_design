import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductArt } from '@/components/product/ProductArt'
import { ProductCard } from '@/components/product/ProductCard'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import {
  BoltIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  DownloadIcon,
  FileIcon,
  HeartIcon,
  ShieldIcon,
  StarIcon,
} from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Pill'
import { getAuthor, getCategory, getProductBySlug, relatedProducts } from '@/data/catalog'
import { useStore } from '@/hooks/useStore'
import { cn } from '@/lib/cn'
import { formatCompact, formatDate, formatPrice } from '@/lib/format'
import NotFound from './NotFound'

export default function Product() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const [shot, setShot] = useState(0)
  const { addToCart, inCart, toggleSaved, isSaved, isPro } = useStore()

  if (!product) return <NotFound />

  const author = getAuthor(product.authorId)
  const category = getCategory(product.categoryId)
  const related = relatedProducts(product)
  const added = inCart(product.id)
  const saved = isSaved(product.id)
  const unlocked = isPro && product.proIncluded
  const shots = [0, 7, 13, 21].map((offset) => product.art.seed + offset)

  return (
    <div className="page-shell py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption text-graphite">
        <Link to="/browse" className="hover:text-ink-black">
          Catalogue
        </Link>
        <ChevronRightIcon size={12} className="text-ash-gray" />
        <Link to={`/browse?category=${product.categoryId}`} className="hover:text-ink-black">
          {category?.label}
        </Link>
        <ChevronRightIcon size={12} className="text-ash-gray" />
        <span className="text-ash-gray">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
        {/* ---------- Preview + detail ---------- */}
        <div>
          <div className="overflow-hidden rounded-panel border border-hairline bg-snow p-2.5">
            <ProductArt
              variant={product.art.variant}
              accent={product.art.accent}
              seed={shots[shot]}
              className="block aspect-[16/10] w-full rounded-preview"
            />
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-2.5">
            {shots.map((seed, index) => (
              <button
                key={seed}
                type="button"
                onClick={() => setShot(index)}
                aria-label={`Preview ${index + 1}`}
                aria-pressed={index === shot}
                className={cn(
                  'overflow-hidden rounded-card border bg-snow p-1 transition-colors',
                  index === shot ? 'border-slate-ink' : 'border-hairline hover:border-mist',
                )}
              >
                <ProductArt
                  variant={product.art.variant}
                  accent={product.art.accent}
                  seed={seed}
                  className="block aspect-[16/10] w-full rounded-[7px]"
                />
              </button>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-subheading font-semibold">About this resource</h2>
            <p className="mt-3 text-body text-graphite">{product.description}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-card border border-hairline bg-snow px-4 py-3 text-body-sm"
                >
                  <CheckIcon size={16} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-subheading font-semibold">Files and formats</h2>
            <div className="mt-3 overflow-hidden rounded-card border border-hairline bg-snow">
              {product.formats.map((format, index) => (
                <div
                  key={format}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5',
                    index > 0 && 'border-t border-hairline',
                  )}
                >
                  <FileIcon size={17} className="text-graphite" />
                  <span className="flex-1 text-body-sm font-medium">{format}</span>
                  <span className="text-caption text-ash-gray">
                    {product.title.split(' ')[0].toLowerCase()}-{format.toLowerCase()}.zip
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-card border border-hairline bg-fog p-5">
            <div className="flex items-start gap-3.5">
              <ShieldIcon size={20} className="mt-0.5 shrink-0" />
              <div>
                <h2 className="text-body font-semibold">Standard Craftwork licence</h2>
                <p className="mt-1.5 text-body-sm text-graphite">
                  Unlimited personal and commercial projects, including paid client work. You may
                  not resell or redistribute the source files themselves.{' '}
                  <Link to="/licensing" className="text-ink-black underline underline-offset-2">
                    Full terms
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Purchase panel ---------- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-hairline bg-snow p-6 shadow-subtle">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="neutral">{category?.label}</Tag>
              <Tag tone="neutral">{product.subcategory}</Tag>
              {product.badge && <Tag tone="dark">{product.badge}</Tag>}
            </div>

            <h1 className="mt-4 text-heading-sm">{product.title}</h1>
            <p className="mt-2 text-body text-graphite">{product.tagline}</p>

            <Link
              to={`/browse?author=${author.id}`}
              className="mt-5 flex items-center gap-3 rounded-card border border-hairline p-2.5 transition-colors hover:border-slate-ink"
            >
              <Avatar name={author.name} accent={author.accent} size={36} />
              <span className="min-w-0">
                <span className="block truncate text-body-sm font-medium">{author.name}</span>
                <span className="block truncate text-caption text-graphite">{author.role}</span>
              </span>
            </Link>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-caption text-ash-gray">
                  {unlocked ? 'Your Pro Access covers this' : 'One-time purchase'}
                </p>
                <p className="mt-1 text-heading-sm font-semibold">
                  {unlocked ? 'Included' : formatPrice(product.priceCents)}
                </p>
              </div>
              {product.proIncluded && !unlocked && (
                <Link
                  to="/pro"
                  className="inline-flex items-center gap-1.5 rounded-pill bg-fog px-2.5 py-1 text-caption transition-colors hover:bg-hairline"
                >
                  <BoltIcon size={12} />
                  In Pro Access
                </Link>
              )}
            </div>

            <div className="mt-5 flex gap-2.5">
              {unlocked ? (
                <Button size="lg" variant="primary" full>
                  <DownloadIcon size={16} />
                  Download files
                </Button>
              ) : added ? (
                <Button to="/cart" size="lg" variant="dark" full>
                  <CheckIcon size={16} />
                  View in cart
                </Button>
              ) : (
                <Button size="lg" variant="primary" full onClick={() => addToCart(product.id)}>
                  {product.priceCents === 0 ? 'Get it free' : 'Add to cart'}
                </Button>
              )}

              <button
                type="button"
                onClick={() => toggleSaved(product.id)}
                aria-pressed={saved}
                aria-label={saved ? 'Remove from saved' : 'Save for later'}
                className={cn(
                  'grid h-[52px] w-[52px] shrink-0 place-items-center rounded-card border border-hairline bg-snow transition-colors',
                  saved ? 'text-vermillion' : 'text-graphite hover:text-ink-black',
                )}
              >
                <HeartIcon size={18} filled={saved} />
              </button>
            </div>

            <dl className="mt-6 space-y-3 border-t border-hairline pt-5 text-body-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-graphite">
                  <StarIcon size={15} filled className="text-ink-black" />
                  Rating
                </dt>
                <dd>
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-graphite">
                  <DownloadIcon size={15} />
                  Downloads
                </dt>
                <dd>{formatCompact(product.downloads)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-graphite">
                  <ClockIcon size={15} />
                  Updated
                </dt>
                <dd>{formatDate(product.updatedAt)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-graphite">
                  <FileIcon size={15} />
                  Formats
                </dt>
                <dd className="text-right">{product.formats.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-heading-sm">More like this</h2>
            <Link
              to={`/browse?category=${product.categoryId}`}
              className="text-body-sm text-graphite hover:text-ink-black"
            >
              All {category?.label.toLowerCase()}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
