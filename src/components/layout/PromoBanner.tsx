import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CloseIcon } from '@/components/ui/Icon'

/** The one place a full-bleed chromatic band is allowed to appear. */
export function PromoBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="relative bg-magenta-pop text-snow">
      <div className="page-shell flex h-10 items-center justify-center gap-3 text-body-sm">
        <span className="truncate">
          Autumn release — 40% off every Pro Access plan until Friday.
        </span>
        <Link
          to="/pro"
          className="hidden shrink-0 rounded-pill bg-snow/15 px-2.5 py-0.5 text-caption font-medium whitespace-nowrap transition-colors hover:bg-snow/25 sm:block"
        >
          Claim offer
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute inset-y-0 right-4 grid place-items-center text-snow/80 hover:text-snow"
      >
        <CloseIcon size={15} />
      </button>
    </div>
  )
}
