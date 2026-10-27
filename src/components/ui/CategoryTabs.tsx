import { categories } from '@/data/catalog'
import type { CategoryId } from '@/data/types'
import { cn } from '@/lib/cn'

export type TabValue = CategoryId | 'all'

/** Full-width segmented control — the primary resource category filter. */
export function CategoryTabs({
  value,
  onChange,
}: {
  value: TabValue
  onChange: (value: TabValue) => void
}) {
  const tabs: Array<{ id: TabValue; label: string }> = [
    { id: 'all', label: 'All resources' },
    ...categories.map((c) => ({ id: c.id as TabValue, label: c.label })),
  ]

  return (
    <div className="no-scrollbar -mx-5 overflow-x-auto px-5">
      <div role="tablist" aria-label="Resource categories" className="flex w-max gap-1 md:w-full">
        {tabs.map((tab) => {
          const active = tab.id === value
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex-1 rounded-card px-4 py-2.5 text-body-sm font-medium whitespace-nowrap transition-colors duration-200 ease-craft',
                active
                  ? 'bg-obsidian text-snow'
                  : 'bg-hairline text-ink-black hover:bg-mist/40',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
