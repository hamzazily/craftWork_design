import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon, CloseIcon, SearchIcon } from '@/components/ui/Icon'
import { categories, getCategory, products } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = q
      ? products.filter((p) =>
          `${p.title} ${p.tagline} ${p.subcategory} ${getCategory(p.categoryId)?.label ?? ''}`
            .toLowerCase()
            .includes(q),
        )
      : products.slice(0, 6)
    return matched.slice(0, 7)
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const id = window.setTimeout(() => inputRef.current?.focus(), 20)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  const go = (slug: string) => {
    navigate(`/product/${slug}`)
    onClose()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => (i + 1) % Math.max(results.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active].slug)
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center px-5 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-ink/25 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the catalogue"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-[560px] overflow-hidden rounded-panel bg-snow shadow-float"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <SearchIcon size={18} className="text-ash-gray" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Search kits, mockups, fonts…"
            className="w-full bg-transparent text-body outline-none placeholder:text-ash-gray"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-pill text-graphite hover:bg-fog hover:text-ink-black"
            aria-label="Close"
          >
            <CloseIcon size={15} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2.5">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-body-sm text-graphite">
              Nothing matches “{query}”. Try a category instead.
            </p>
          ) : (
            <ul>
              {results.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(product.slug)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-left transition-colors',
                      index === active ? 'bg-fog' : 'bg-transparent',
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body-sm font-medium">{product.title}</span>
                      <span className="block truncate text-caption text-ash-gray">
                        {getCategory(product.categoryId)?.label} · {product.subcategory}
                      </span>
                    </span>
                    <span className="text-caption text-graphite">{formatPrice(product.priceCents)}</span>
                    <ArrowRightIcon size={14} className="text-ash-gray" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto border-t border-hairline px-5 py-3 no-scrollbar">
          <span className="text-caption text-ash-gray">Jump to</span>
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                navigate(`/browse?category=${category.id}`)
                onClose()
              }}
              className="rounded-pill bg-fog px-2.5 py-1 text-caption text-graphite whitespace-nowrap hover:text-ink-black"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
