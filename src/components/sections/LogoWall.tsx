import { brands } from '@/data/catalog'

/** Flat, single-colour wordmarks sitting directly on the Paper canvas. */
function Wordmark({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 text-graphite">
      <span className="h-2.5 w-2.5 rounded-[2px] bg-current opacity-60" aria-hidden="true" />
      <span className="text-subheading font-semibold tracking-[-0.4px] whitespace-nowrap">
        {name}
      </span>
    </span>
  )
}

export function LogoWall() {
  const loop = [...brands, ...brands]

  return (
    <section className="border-y border-hairline bg-paper py-10">
      <p className="page-shell mb-7 text-center text-body-sm text-ash-gray">
        Design teams working from this shelf every day
      </p>
      <div className="edge-fade overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14">
          {loop.map((brand, index) => (
            <Wordmark key={`${brand}-${index}`} name={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}
