import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { STORAGE_KEY, StoreContext, type StoreState } from './store-context'

const empty: StoreState = { cart: [], saved: [], isPro: false }

function read(): StoreState {
  if (typeof window === 'undefined') return empty
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<StoreState>
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      isPro: Boolean(parsed.isPro),
    }
  } catch {
    return empty
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(read)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage can be unavailable — the session still works in memory */
    }
  }, [state])

  const addToCart = useCallback((id: string) => {
    setState((s) => (s.cart.includes(id) ? s : { ...s, cart: [...s.cart, id] }))
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((x) => x !== id) }))
  }, [])

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), [])

  const toggleSaved = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
    }))
  }, [])

  const activatePro = useCallback(() => setState((s) => ({ ...s, isPro: true })), [])
  const cancelPro = useCallback(() => setState((s) => ({ ...s, isPro: false })), [])

  const value = useMemo(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      clearCart,
      inCart: (id: string) => state.cart.includes(id),
      toggleSaved,
      isSaved: (id: string) => state.saved.includes(id),
      activatePro,
      cancelPro,
    }),
    [state, addToCart, removeFromCart, clearCart, toggleSaved, activatePro, cancelPro],
  )

  return <StoreContext value={value}>{children}</StoreContext>
}
