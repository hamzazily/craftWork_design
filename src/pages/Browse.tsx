import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { CategoryTabs, type TabValue } from '@/components/ui/CategoryTabs'
import { CloseIcon, SearchIcon, SlidersIcon } from '@/components/ui/Icon'
import { FilterPill } from '@/components/ui/Pill'
import { authors, categories, getAuthor, products } from '@/data/catalog'
import type { Product } from '@/data/types'

type Sort = 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high'
type Price = 'all' | 'free' | 'paid' | 'pro'

const sorts: Array<{ id: Sort; label: string }> = [
  { id: 'popular', label: 'Most downloaded' },
  { id: 'newest', label: 'Recently updated' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'price-low', label: 'Price: low to high' },
  { id: 'price-high', label: 'Price: high to low' },
]

const prices: Array<{ id: Price; label: string }> = [
  { id: 'all', label: 'Any price' },
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
  { id: 'pro', label: 'In Pro Access' },
]

function sortProducts(list: Product[], sort: Sort): Product[] {
  const copy = [...list]
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    case 'price-low':
      return copy.sort((a, b) => a.priceCents - b.priceCents)
    case 'price-high':
      return copy.sort((a, b) => b.priceCents - a.priceCents)
    default:
      return copy.sort((a, b) => b.downloads - a.downloads)
  }
}

export default function Browse() {
  const [params, setParams] = useSearchParams()

  const category = (params.get('category') ?? 'all') as TabValue
  const sub = params.get('sub') ?? 'all'
  const query = params.get('q') ?? ''
  const authorId = params.get('author') ?? 'all'
  const price = (params.get('price') ?? 'all') as Price
  const sort = (params.get('sort') ?? 'popular') as Sort

  const update = (next: Record<string, string | null>) => {
    const draft = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (!value || value === 'all' || value === '') draft.delete(key)
      else draft.set(key, value)
    }
    setParams(draft, { replace: true })
  }

  const subcategories = useMemo(
    () => (category === 'all' ? [] : (categories.find((c) => c.id === category)?.subcategories ?? [])),
    [category],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      if (category !== 'all' && product.categoryId !== category) return false
      if (sub !== 'all' && product.subcategory !== sub) return false
      if (authorId !== 'all' && product.authorId !== authorId) return false
      if (price === 'free' && product.priceCents !== 0) return false
      if (price === 'paid' && product.priceCents === 0) return false
      if (price === 'pro' && !product.proIncluded) return false
      if (q) {
        const haystack =
          `${product.title} ${product.tagline} ${product.description} ${product.subcategory} ${getAuthor(product.authorId).name}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
    return sortProducts(filtered, sort)
  }, [category, sub, query, authorId, price, sort])

  const activeFilters = [
    category !== 'all' && {
      label: categories.find((c) => c.id === category)?.label ?? category,
      clear: { category: null, sub: null },
    },
    sub !== 'all' && { label: sub, clear: { sub: null } },
    authorId !== 'all' && { label: getAuthor(authorId).name, clear: { author: null } },
    price !== 'all' && {
      label: prices.find((p) => p.id === price)?.label ?? price,
      clear: { price: null },
    },
    query !== '' && { label: `“${query}”`, clear: { q: null } },
  ].filter(Boolean) as Array<{ label: string; clear: Record<string, null> }>

  return (
    <div className="page-shell py-10 md:py-14">
      <header className="max-w-[680px]">
        <p className="mb-2.5 text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">
          Catalogue
        </p>
        <h1 className="text-heading md:text-heading-lg">Browse every resource</h1>
        <p className="mt-3 text-body text-graphite">
          {products.length} resources from {authors.length} authors. Filter by category, price or
          author — the URL keeps your filters, so a shelf is shareable.
        </p>
      </header>

      <div className="mt-9">
        <CategoryTabs value={category} onChange={(next) => update({ category: next, sub: null })} />
      </div>

      {subcategories.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          <FilterPill active={sub === 'all'} onClick={() => update({ sub: null })}>
            All
          </FilterPill>
          {subcategories.map((item) => (
            <FilterPill key={item} active={sub === item} onClick={() => update({ sub: item })}>
              {item}
            </FilterPill>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 rounded-card border border-hairline bg-snow p-3.5 shadow-hairline lg:flex-row lg:items-center">
        <div className="flex h-10 flex-1 items-center gap-2.5 rounded-card border border-hairline bg-paper px-3.5">
          <SearchIcon size={16} className="text-ash-gray" />
          <input
            value={query}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Search by name, format or author"
            className="w-full bg-transparent text-body-sm outline-none placeholder:text-ash-gray"
            aria-label="Search resources"
          />
          {query && (
            <button
              type="button"
              onClick={() => update({ q: null })}
              aria-label="Clear search"
              className="text-ash-gray hover:text-ink-black"
            >
              <CloseIcon size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {prices.map((option) => (
            <FilterPill
              key={option.id}
              active={price === option.id}
              onClick={() => update({ price: option.id })}
            >
              {option.label}
            </FilterPill>
          ))}
        </div>

        <label className="flex h-10 items-center gap-2 rounded-card border border-hairline bg-paper px-3 text-body-sm">
          <SlidersIcon size={15} className="text-graphite" />
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(event) => update({ sort: event.target.value })}
            className="bg-transparent pr-1 outline-none"
          >
            {sorts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <p className="text-body-sm text-graphite">
          {results.length} {results.length === 1 ? 'resource' : 'resources'}
        </p>
        {activeFilters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => update(filter.clear)}
            className="inline-flex items-center gap-1.5 rounded-pill bg-fog px-2.5 py-1 text-caption text-graphite transition-colors hover:text-ink-black"
          >
            {filter.label}
            <CloseIcon size={12} />
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={() => setParams(new URLSearchParams(), { replace: true })}
            className="text-caption text-ink-black underline underline-offset-4"
          >
            Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-hairline bg-snow px-6 py-20 text-center">
          <h2 className="text-subheading font-semibold">Nothing matches those filters</h2>
          <p className="mx-auto mt-2 max-w-[380px] text-body-sm text-graphite">
            Loosen one of them — or clear everything and start from the full shelf.
          </p>
          <div className="mt-6 flex justify-center">
            <Button variant="ghost" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
