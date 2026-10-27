import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CloseIcon, CookieIcon } from '@/components/ui/Icon'

const KEY = 'craftwork.cookies.v1'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) {
        const id = window.setTimeout(() => setVisible(true), 1200)
        return () => window.clearTimeout(id)
      }
    } catch {
      /* no storage — stay quiet rather than nagging on every render */
    }
  }, [])

  const decide = (choice: 'all' | 'essential') => {
    try {
      window.localStorage.setItem(KEY, choice)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-5 pb-5">
      <div className="relative w-full max-w-[520px] rounded-card bg-snow p-5 shadow-float">
        <button
          type="button"
          onClick={() => decide('essential')}
          aria-label="Dismiss"
          className="absolute top-3.5 right-3.5 grid h-7 w-7 place-items-center rounded-pill text-ash-gray hover:bg-fog hover:text-ink-black"
        >
          <CloseIcon size={14} />
        </button>

        <div className="flex gap-3.5">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-pill bg-fog text-vermillion">
            <CookieIcon size={18} />
          </span>
          <div>
            <h2 className="text-body font-semibold">We use a few cookies</h2>
            <p className="mt-1 text-body-sm text-graphite">
              Essential ones keep your cart and licences working. Optional ones tell us which
              resources people actually use. Your call —{' '}
              <Link to="/licensing" className="text-ink-black underline underline-offset-2">
                cookie policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="dark" onClick={() => decide('all')}>
                Accept all
              </Button>
              <Button size="sm" variant="ghost" onClick={() => decide('essential')}>
                Essential only
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
