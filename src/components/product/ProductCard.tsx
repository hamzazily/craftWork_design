import { Link } from 'react-router-dom'
import { ProductArt } from './ProductArt'
import { Tag } from '@/components/ui/Pill'
import { BoltIcon, CheckIcon, DownloadIcon, HeartIcon, StarIcon } from '@/components/ui/Icon'
import { getAuthor, getCategory } from '@/data/catalog'
import type { Product } from '@/data/types'
import { useStore } from '@/hooks/useStore'
import { cn } from '@/lib/cn'
import { formatCompact, formatPrice } from '@/lib/format'

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, inCart, toggleSaved, isSaved, isPro } = useStore()
  const author = getAuthor(product.authorId)
  const category = getCategory(product.categoryId)
  const added = inCart(product.id)
  const saved = isSaved(product.id)
  const unlocked = isPro && product.proIncluded

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-card border border-hairline bg-snow p-5 transition-shadow duration-200 ease-craft hover:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-preview bg-fog">
        <ProductArt
          variant={product.art.variant}
          accent={product.art.accent}
          seed={product.art.seed}
          className="block aspect-[7/5] w-full"
        />

        {product.badge && (
          <span className="absolute top-2.5 left-2.5">
            <Tag tone={product.badge === 'staff pick' ? 'dark' : 'neutral'} className="bg-snow/95">
              {product.badge}
            </Tag>
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleSaved(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.title} from saved` : `Save ${product.title}`}
          className={cn(
            'absolute top-2.5 right-2.5 z-10 grid h-8 w-8 place-items-center rounded-pill border border-hairline bg-snow/95 transition-colors duration-200',
            saved ? 'text-vermillion' : 'text-graphite opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
          )}
        >
          <HeartIcon size={15} filled={saved} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-caption text-ash-gray">
          {category?.label} · {product.subcategory}
        </p>

        <h3 className="mt-1.5 text-body font-semibold">
          <Link
            to={`/product/${product.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {product.title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-body-sm text-graphite">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-2 text-caption text-ash-gray">
          <span className="truncate">{author.name}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <StarIcon size={12} filled className="text-ink-black" />
            {product.rating.toFixed(1)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <DownloadIcon size={12} />
            {formatCompact(product.downloads)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3.5">
          <span className="text-body-sm font-semibold">
            {unlocked ? (
              <span className="inline-flex items-center gap-1.5">
                <BoltIcon size={14} />
                Included
              </span>
            ) : (
              formatPrice(product.priceCents)
            )}
          </span>

          <button
            type="button"
            onClick={() => addToCart(product.id)}
            disabled={added}
            className={cn(
              'relative z-10 inline-flex h-8 items-center gap-1.5 rounded-pill px-3 text-caption font-medium transition-colors duration-200',
              added
                ? 'bg-fog text-graphite'
                : 'bg-fog text-ink-black hover:bg-obsidian hover:text-snow',
            )}
          >
            {added ? (
              <>
                <CheckIcon size={13} /> In cart
              </>
            ) : unlocked ? (
              'Download'
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
