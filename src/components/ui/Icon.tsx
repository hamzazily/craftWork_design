import type { SVGProps } from 'react'

/**
 * Iconography: outlined at 1.5–2px stroke, geometric simplicity matching the
 * typeface. Monochrome by default — colour is applied by the caller.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 18, strokeWidth = 1.6, children, ...rest }: IconProps & { strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const BoltIcon = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p}>
    <path
      d="M13.2 2.6 4.8 13.1c-.33.41-.04 1.02.48 1.02H10l-1.2 8.28 8.4-10.5c.33-.41.04-1.02-.48-1.02H12l1.2-8.28Z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </Base>
)

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m16 16 4.2 4.2" />
  </Base>
)

export const CartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 3.4h2.3l2.1 10.9h10.1l2-7.7H6.2" />
    <circle cx="9.2" cy="19.2" r="1.5" />
    <circle cx="16.8" cy="19.2" r="1.5" />
  </Base>
)

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Base>
)

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Base>
)

export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5.5 9 6.5 6.5L18.5 9" />
  </Base>
)

export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5.5 6.5 6.5L9 18.5" />
  </Base>
)

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.8 12h16.4M14 5.8l6.2 6.2-6.2 6.2" />
  </Base>
)

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8.4 7H17v8.6" />
  </Base>
)

export const StarIcon = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p}>
    <path
      d="m12 3.2 2.72 5.56 6.13.88-4.43 4.3 1.05 6.1L12 17.15 6.53 20.04l1.05-6.1-4.43-4.3 6.13-.88L12 3.2Z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </Base>
)

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m4.5 12.5 4.8 4.8L19.5 7" />
  </Base>
)

export const HeartIcon = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p}>
    <path
      d="M12 20.3S3.6 15.6 3.6 9.8a4.6 4.6 0 0 1 8.4-2.6 4.6 4.6 0 0 1 8.4 2.6c0 5.8-8.4 10.5-8.4 10.5Z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </Base>
)

export const DownloadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.4v11.4M7.4 10.4 12 15l4.6-4.6M4 19.4h16" />
  </Base>
)

export const SlidersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7.5h10M18 7.5h2M4 16.5h4M12 16.5h8" />
    <circle cx="16" cy="7.5" r="2" />
    <circle cx="10" cy="16.5" r="2" />
  </Base>
)

export const CookieIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20.9 12.4a8.9 8.9 0 1 1-8.7-9.3 3.4 3.4 0 0 0 3.2 3.9 3.1 3.1 0 0 0 3 3.3 3 3 0 0 0 2.5 2.1Z" />
    <path d="M9 10h.01M13.5 14.5h.01M8.5 15.5h.01" strokeWidth="2.4" />
  </Base>
)

export const LayersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3.2 8.4 4.4-8.4 4.4-8.4-4.4 8.4-4.4Z" />
    <path d="m4.4 12.4 7.6 4 7.6-4M4.4 16.6l7.6 4 7.6-4" />
  </Base>
)

export const SparkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c0 4 1.9 6.1 6 6.6-4.1.5-6 2.6-6 6.6 0-4-1.9-6.1-6-6.6 4.1-.5 6-2.6 6-6.6Z" />
    <path d="M18.5 15.5c0 2 .9 3 3 3.2-2.1.3-3 1.3-3 3.3 0-2-.9-3-3-3.3 2.1-.2 3-1.2 3-3.2Z" />
  </Base>
)

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 5.6v5.9c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V5.6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </Base>
)

export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9.5" cy="8.4" r="3.4" />
    <path d="M3.4 19.6c0-3.1 2.7-5.2 6.1-5.2s6.1 2.1 6.1 5.2" />
    <path d="M16.2 5.4a3.4 3.4 0 0 1 0 6.1M17.8 14.9c2 .6 3.4 2.2 3.4 4.7" />
  </Base>
)

export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.6" y="3.6" width="7" height="7" rx="2" />
    <rect x="13.4" y="3.6" width="7" height="7" rx="2" />
    <rect x="3.6" y="13.4" width="7" height="7" rx="2" />
    <rect x="13.4" y="13.4" width="7" height="7" rx="2" />
  </Base>
)

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4.8v14.4M4.8 12h14.4" />
  </Base>
)

export const TrashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 6.5h15M9.5 6.5V4.2h5v2.3M6.6 6.5l.9 13h9l.9-13M10.2 10v6M13.8 10v6" />
  </Base>
)

export const RefreshIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20.4 3.6v4.8h-4.8" />
  </Base>
)

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.2" width="18" height="13.6" rx="3" />
    <path d="m4.4 7.6 7.6 5.4 7.6-5.4" />
  </Base>
)

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M3.4 12h17.2M12 3.2c2.3 2.4 3.4 5.3 3.4 8.8s-1.1 6.4-3.4 8.8c-2.3-2.4-3.4-5.3-3.4-8.8S9.7 5.6 12 3.2Z" />
  </Base>
)

export const FileIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13.6 3.2H7a2 2 0 0 0-2 2v13.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.6l-5.4-5.4Z" />
    <path d="M13.4 3.4v5.4h5.4" />
  </Base>
)

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 6.8V12l3.4 2.2" />
  </Base>
)

export const InfinityIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.2 12c0 2-1.5 3.6-3.4 3.6S2.4 14 2.4 12s1.5-3.6 3.4-3.6c3.7 0 6.3 7.2 10 7.2 1.9 0 3.4-1.6 3.4-3.6s-1.5-3.6-3.4-3.6c-3.7 0-6.3 7.2-10 7.2" />
  </Base>
)
