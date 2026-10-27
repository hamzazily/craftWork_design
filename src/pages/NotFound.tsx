import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="page-shell py-20 text-center md:py-28">
      <p className="text-caption font-medium tracking-[0.06em] text-ash-gray uppercase">404</p>
      <h1 className="mt-3 text-heading-sm md:text-heading">This page is not on the shelf</h1>
      <p className="mx-auto mt-3.5 max-w-[440px] text-body text-graphite">
        The file you asked for is not here. It may have been renamed, or the link is a draft.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/browse" size="lg" variant="primary">
          Browse the catalogue
        </Button>
        <Button to="/" size="lg" variant="ghost">
          Back home
        </Button>
      </div>
    </div>
  )
}
