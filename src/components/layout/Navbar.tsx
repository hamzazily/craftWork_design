import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { Logo } from './Logo'
import { BoltIcon, CartIcon, CloseIcon, MenuIcon, SearchIcon } from '@/components/ui/Icon'
import { categories } from '@/data/catalog'
import { useStore } from '@/hooks/useStore'

const shortcutKey = () =>
  typeof navigator !== 'undefined' && /mac/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'

export function Navbar() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart, isPro } = useStore()
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 rounded-b-card bg-snow shadow-subtle">
        <nav className="page-shell flex h-16 items-center gap-4" aria-label="Main">
          <Logo />

          {/* Centred catalogue search with keyboard-shortcut hint */}
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="mx-auto hidden h-10 w-full max-w-[400px] items-center gap-2.5 rounded-card border border-hairline bg-paper px-3.5 text-body-sm text-ash-gray transition-colors duration-200 hover:border-mist md:flex"
          >
            <SearchIcon size={16} />
            <span className="flex-1 text-left">Search 4,800+ resources</span>
            <kbd className="rounded-[6px] border border-hairline bg-snow px-1.5 py-0.5 text-caption text-graphite">
              {shortcutKey()}K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-card text-ink-black hover:bg-fog md:hidden"
            >
              <SearchIcon size={18} />
            </button>

            <Link
              to="/sell"
              className="hidden rounded-card px-3 py-2 text-body-sm text-graphite transition-colors hover:text-ink-black lg:block"
            >
              Become an author
            </Link>

            {/* The only chromatic fill in the bar */}
            <Link
              to="/pro"
              className="hidden items-center gap-1.5 rounded-pill bg-acid-green px-3 py-1.5 text-body-sm font-medium text-ink-black transition-colors hover:bg-acid-press sm:inline-flex"
            >
              <BoltIcon size={14} />
              {isPro ? 'Pro active' : 'Pro Access'}
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart, ${cart.length} item${cart.length === 1 ? '' : 's'}`}
              className="relative grid h-9 w-9 place-items-center rounded-card text-ink-black hover:bg-fog"
            >
              <CartIcon size={18} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-pill bg-obsidian px-1 text-[10px] font-semibold text-snow">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="hidden rounded-card px-3 py-2 text-body-sm font-medium sm:block"
            >
              Login
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-card text-ink-black hover:bg-fog lg:hidden"
            >
              {menuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-hairline lg:hidden">
            <div className="page-shell flex flex-col gap-1 py-4">
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/browse?category=${category.id}`}
                  className="rounded-card px-3 py-2.5 text-body-sm hover:bg-fog"
                >
                  {category.label}
                </NavLink>
              ))}
              <span className="my-2 h-px bg-hairline" />
              <NavLink to="/sell" className="rounded-card px-3 py-2.5 text-body-sm hover:bg-fog">
                Become an author
              </NavLink>
              <NavLink to="/pro" className="rounded-card px-3 py-2.5 text-body-sm hover:bg-fog">
                Pro Access
              </NavLink>
              <NavLink to="/login" className="rounded-card px-3 py-2.5 text-body-sm hover:bg-fog">
                Login
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
