import { AuthorsBand } from '@/components/sections/AuthorsBand'
import { CategoryExplorer } from '@/components/sections/CategoryExplorer'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { FeatureBand } from '@/components/sections/FeatureBand'
import { Hero } from '@/components/sections/Hero'
import { LogoWall } from '@/components/sections/LogoWall'
import { ProBand } from '@/components/sections/ProBand'
import { Testimonials } from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <CategoryExplorer />
      <FeatureBand />
      <ProBand />
      <Testimonials />
      <AuthorsBand />
      <ClosingCta />
    </>
  )
}
