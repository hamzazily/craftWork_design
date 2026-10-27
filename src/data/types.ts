export type CategoryId =
  | 'ui-kits'
  | 'mockups'
  | 'icons'
  | 'fonts'
  | 'illustrations'
  | 'templates'

export type ArtVariant = 'ui' | 'mockup' | 'icons' | 'type' | 'illustration' | 'template'

/** Decorative accent used by generated preview art. Never a surface colour. */
export type AccentKey = 'green' | 'vermillion' | 'magenta' | 'ink'

export interface Category {
  id: CategoryId
  label: string
  blurb: string
  subcategories: string[]
}

export interface Author {
  id: string
  name: string
  handle: string
  role: string
  location: string
  bio: string
  followers: number
  accent: AccentKey
}

export interface Product {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  categoryId: CategoryId
  subcategory: string
  authorId: string
  priceCents: number
  proIncluded: boolean
  rating: number
  reviews: number
  downloads: number
  updatedAt: string
  formats: string[]
  highlights: string[]
  art: { variant: ArtVariant; accent: AccentKey; seed: number }
  badge?: 'new' | 'trending' | 'staff pick'
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  accent: AccentKey
}
