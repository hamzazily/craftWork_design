import { createContext } from 'react'

export interface StoreState {
  cart: string[]
  saved: string[]
  isPro: boolean
}

export interface StoreValue extends StoreState {
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  inCart: (id: string) => boolean
  clearCart: () => void
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
  activatePro: () => void
  cancelPro: () => void
}

export const StoreContext = createContext<StoreValue | null>(null)
export const STORAGE_KEY = 'craftwork.store.v1'
