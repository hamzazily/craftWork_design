import { useMemo, useState } from 'react'
import { Section, SectionHeading } from './Section'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { CategoryTabs, type TabValue } from '@/components/ui/CategoryTabs'
import { FilterPill } from '@/components/ui/Pill'
import { ArrowRightIcon } from '@/components/ui/Icon'
import { categories, products } from '@/data/catalog'

export function CategoryExplorer() {
  const [tab, setTab] = useState<TabValue>('all')
  const [sub, setSub] = useState<string>('all')

  const subcategories = useMemo(() => {
    if (tab === 'all') return []
    return categories.find((c) => c.id === tab)?.subcategories ?? []
  }, [tab])

  const visible = useMemo(() => {
    return products
      .filter((p) => (tab === 'all' ? true : p.categoryId === tab))
      .filter((p) => (sub === 'all' ? true : p.subcategory === sub))
      .slice(0, 8)
  }, [tab, sub])

  return (
    <Section>
      <SectionHeading
        eyebrow="The catalogue"
        title="Everything on the shelf, sorted the way you work"
        description="Filter down to the exact format you need, or open the full catalogue with price, rating and licence filters."
      />

      <CategoryTabs
        value={tab}
        onChange={(next) => {
          setTab(next)
          setSub('all')
        }}
      />

      {subcategories.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <FilterPill active={sub === 'all'} onClick={() => setSub('all')}>
            All
          </FilterPill>
          {subcategories.map((item) => (
            <FilterPill key={item} active={sub === item} onClick={() => setSub(item)}>
              {item}
            </FilterPill>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="rounded-card border border-hairline bg-snow py-14 text-center text-body-sm text-graphite">
          Nothing in this corner yet. Try another filter.
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Button
          to={tab === 'all' ? '/browse' : `/browse?category=${tab}`}
          variant="ghost"
          size="md"
        >
          Browse the full catalogue
          <ArrowRightIcon size={15} />
        </Button>
      </div>
    </Section>
  )
}
