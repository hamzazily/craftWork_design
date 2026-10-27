import { useId } from 'react'
import type { AccentKey, ArtVariant } from '@/data/types'
import { seeded } from '@/lib/format'

/**
 * Catalogue previews are generated, not photographed. The system's imagery rule
 * is iconography, product crops and brand-coloured illustration only — so each
 * tile draws its own deterministic SVG from the product's seed.
 *
 * Accents appear as low-saturation washes with a single saturated detail; the
 * card frame around them stays neutral so the art carries the colour.
 */

type Palette = { solid: string; wash: string; soft: string; line: string }

const palettes: Record<AccentKey, Palette> = {
  green: {
    solid: '#cafc00',
    wash: 'rgba(180, 235, 160, 0.45)',
    soft: 'rgba(202, 252, 0, 0.22)',
    line: '#9eb800',
  },
  vermillion: {
    solid: '#f54911',
    wash: 'rgba(245, 73, 17, 0.12)',
    soft: 'rgba(245, 73, 17, 0.2)',
    line: '#f54911',
  },
  magenta: {
    solid: '#c42df9',
    wash: 'rgba(196, 45, 249, 0.1)',
    soft: 'rgba(196, 45, 249, 0.18)',
    line: '#c42df9',
  },
  ink: {
    solid: '#14151a',
    wash: 'rgba(20, 21, 26, 0.07)',
    soft: 'rgba(20, 21, 26, 0.12)',
    line: '#606060',
  },
}

const NEUTRAL = '#dee0e3'
const DEEP = '#14151a'
const PAPER = '#ffffff'

export function ProductArt({
  variant,
  accent,
  seed,
  className,
}: {
  variant: ArtVariant
  accent: AccentKey
  seed: number
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const p = palettes[accent]
  const rand = seeded(seed)

  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`wash-${uid}`} cx="52%" cy="12%" r="78%">
          <stop offset="0%" stopColor={p.wash} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id={`screen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f2f2f2" />
        </linearGradient>
      </defs>

      <rect width="320" height="220" fill="#f2f2f2" />
      <rect width="320" height="220" fill={`url(#wash-${uid})`} />

      {variant === 'ui' && <UiScene p={p} rand={rand} uid={uid} />}
      {variant === 'mockup' && <MockupScene p={p} uid={uid} />}
      {variant === 'icons' && <IconScene p={p} rand={rand} />}
      {variant === 'type' && <TypeScene p={p} />}
      {variant === 'illustration' && <IllustrationScene p={p} rand={rand} />}
      {variant === 'template' && <TemplateScene p={p} rand={rand} />}
    </svg>
  )
}

type SceneProps = { p: Palette; rand?: () => number; uid?: string }

function UiScene({ p, rand, uid }: SceneProps & { rand: () => number; uid: string }) {
  const bars = Array.from({ length: 7 }, () => 14 + rand() * 40)
  return (
    <g>
      <rect x="28" y="26" width="264" height="168" rx="12" fill={PAPER} />
      <rect x="28" y="26" width="264" height="168" rx="12" fill="none" stroke={NEUTRAL} />
      <rect x="28" y="26" width="264" height="26" rx="12" fill="#f9f9f9" />
      <rect x="28" y="40" width="264" height="12" fill="#f9f9f9" />
      <line x1="28" y1="52" x2="292" y2="52" stroke={NEUTRAL} />
      <circle cx="42" cy="39" r="3" fill={NEUTRAL} />
      <circle cx="53" cy="39" r="3" fill={NEUTRAL} />
      <circle cx="64" cy="39" r="3" fill={p.solid} />

      {/* sidebar */}
      <rect x="28" y="52" width="58" height="142" fill="#f9f9f9" />
      <line x1="86" y1="52" x2="86" y2="194" stroke={NEUTRAL} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="38"
          y={66 + i * 16}
          width={i === 1 ? 38 : 30}
          height="6"
          rx="3"
          fill={i === 1 ? p.soft : NEUTRAL}
        />
      ))}

      {/* metric cards */}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={98 + i * 92} y="64" width="80" height="34" rx="8" fill="#f9f9f9" />
          <rect x={108 + i * 92} y="74" width="26" height="5" rx="2.5" fill={NEUTRAL} />
          <rect
            x={108 + i * 92}
            y="84"
            width="42"
            height="7"
            rx="3.5"
            fill={i === 0 ? DEEP : p.line}
          />
        </g>
      ))}

      {/* chart */}
      <rect x="98" y="108" width="172" height="76" rx="8" fill="#f9f9f9" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={110 + i * 22}
          y={172 - h}
          width="12"
          height={h}
          rx="4"
          fill={i === 4 ? p.solid : NEUTRAL}
        />
      ))}
      <line x1="110" y1="174" x2="262" y2="174" stroke={NEUTRAL} />
      <rect x="0" y="0" width="0" height="0" fill={`url(#screen-${uid})`} />
    </g>
  )
}

function MockupScene({ p, uid }: SceneProps & { uid: string }) {
  return (
    <g>
      <ellipse cx="160" cy="190" rx="112" ry="12" fill="rgba(20,21,26,0.06)" />
      {/* laptop */}
      <rect x="66" y="52" width="188" height="118" rx="10" fill={DEEP} />
      <rect x="74" y="60" width="172" height="96" rx="4" fill={`url(#screen-${uid})`} />
      <rect x="86" y="72" width="60" height="6" rx="3" fill={NEUTRAL} />
      <rect x="86" y="86" width="98" height="6" rx="3" fill={NEUTRAL} />
      <rect x="86" y="100" width="44" height="14" rx="7" fill={p.solid} />
      <rect x="150" y="112" width="84" height="32" rx="6" fill={p.soft} />
      <rect x="52" y="170" width="216" height="8" rx="4" fill={DEEP} />
      {/* phone */}
      <rect x="228" y="88" width="56" height="98" rx="12" fill={PAPER} stroke={NEUTRAL} />
      <rect x="234" y="94" width="44" height="86" rx="8" fill="#f9f9f9" />
      <rect x="242" y="102" width="28" height="5" rx="2.5" fill={NEUTRAL} />
      <rect x="242" y="114" width="20" height="5" rx="2.5" fill={p.line} />
      <rect x="242" y="130" width="28" height="28" rx="6" fill={p.soft} />
      <rect x="246" y="90" width="12" height="3" rx="1.5" fill={NEUTRAL} />
    </g>
  )
}

function IconScene({ p, rand }: SceneProps & { rand: () => number }) {
  const cells = Array.from({ length: 12 }, (_, i) => i)
  const accentCell = Math.floor(rand() * 12)
  return (
    <g>
      {cells.map((i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        const x = 42 + col * 62
        const y = 36 + row * 56
        const isAccent = i === accentCell
        const stroke = isAccent ? p.solid : DEEP
        return (
          <g key={i}>
            <rect x={x} y={y} width="48" height="44" rx="10" fill={PAPER} stroke={NEUTRAL} />
            <g
              transform={`translate(${x + 15} ${y + 13})`}
              stroke={stroke}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Glyph index={i} />
            </g>
          </g>
        )
      })}
    </g>
  )
}

function Glyph({ index }: { index: number }) {
  switch (index % 6) {
    case 0:
      return <circle cx="9" cy="9" r="7.5" />
    case 1:
      return <rect x="1.5" y="1.5" width="15" height="15" rx="4" />
    case 2:
      return <path d="M9 1.5 16.5 16.5H1.5L9 1.5Z" />
    case 3:
      return <path d="M2 9h14M9 2v14" />
    case 4:
      return <path d="M2 12.5 7 6l4 5 5-7" />
    default:
      return <path d="M9 1.8c4 0 7.2 3.2 7.2 7.2S13 16.2 9 16.2 1.8 13 1.8 9 5 1.8 9 1.8ZM9 5v8" />
  }
}

function TypeScene({ p }: SceneProps) {
  return (
    <g>
      <rect x="28" y="26" width="264" height="168" rx="12" fill={PAPER} stroke={NEUTRAL} />
      <text
        x="52"
        y="140"
        fontFamily="var(--font-sans)"
        fontSize="108"
        fontWeight="600"
        letterSpacing="-6"
        fill={DEEP}
      >
        Aa
      </text>
      <text
        x="206"
        y="72"
        fontFamily="var(--font-sans)"
        fontSize="20"
        fontWeight="400"
        fill={p.line}
      >
        Aa
      </text>
      <text
        x="206"
        y="104"
        fontFamily="var(--font-sans)"
        fontSize="20"
        fontWeight="700"
        fill={DEEP}
      >
        Aa
      </text>
      <line x1="206" y1="120" x2="268" y2="120" stroke={NEUTRAL} />
      <circle cx="232" cy="120" r="4" fill={p.solid} />
      <text
        x="52"
        y="170"
        fontFamily="var(--font-sans)"
        fontSize="13"
        fontWeight="400"
        letterSpacing="1.5"
        fill="#999999"
      >
        ABCDEFGHIJKLM 0123
      </text>
    </g>
  )
}

function IllustrationScene({ p, rand }: SceneProps & { rand: () => number }) {
  const tilt = -12 + rand() * 24
  return (
    <g>
      <circle cx="108" cy="104" r="56" fill={p.soft} />
      <path
        d="M168 44c34 0 58 26 58 60s-24 60-58 60"
        fill="none"
        stroke={DEEP}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="150"
        y="86"
        width="74"
        height="74"
        rx="20"
        fill={PAPER}
        stroke={NEUTRAL}
        transform={`rotate(${tilt} 187 123)`}
      />
      <circle cx="187" cy="123" r="18" fill={p.solid} />
      <path
        d="M52 168c30-22 62-30 96-24"
        fill="none"
        stroke={p.line}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="248" cy="62" r="9" fill="none" stroke={DEEP} strokeWidth="2" />
      <circle cx="74" cy="56" r="5" fill={DEEP} />
      <path d="M262 150h18M271 141v18" stroke={p.line} strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function TemplateScene({ p, rand }: SceneProps & { rand: () => number }) {
  const lines = Array.from({ length: 6 }, () => 40 + rand() * 62
  )
  return (
    <g>
      <rect x="150" y="34" width="122" height="158" rx="8" fill={PAPER} stroke={NEUTRAL} />
      <rect x="164" y="52" width="52" height="8" rx="4" fill={NEUTRAL} />
      <rect x="164" y="70" width="94" height="52" rx="6" fill={p.soft} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="164" y={134 + i * 14} width={90 - i * 18} height="6" rx="3" fill={NEUTRAL} />
      ))}

      <rect x="48" y="26" width="122" height="158" rx="8" fill={PAPER} stroke={NEUTRAL} />
      <rect x="62" y="44" width="40" height="10" rx="5" fill={DEEP} />
      <rect x="62" y="62" width="70" height="10" rx="5" fill={p.solid} />
      {lines.map((w, i) => (
        <rect key={i} x="62" y={88 + i * 14} width={w} height="6" rx="3" fill={NEUTRAL} />
      ))}
    </g>
  )
}
