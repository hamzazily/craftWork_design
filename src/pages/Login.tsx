import { type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/Button'

export default function Login() {
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <Section>
      <div className="mx-auto max-w-[420px] rounded-panel border border-hairline bg-snow p-8 shadow-subtle">
        <h1 className="text-heading-sm">Sign in</h1>
        <p className="mt-2 text-body-sm text-graphite">
          Use the email on your library. This demo does not send a real magic link.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-caption text-ash-gray" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@studio.com"
            className="h-11 w-full rounded-card border border-hairline bg-paper px-3 text-body-sm outline-none placeholder:text-ash-gray focus:border-slate-ink"
          />
          <Button type="submit" size="lg" variant="dark" full>
            Continue
          </Button>
        </form>
      </div>
    </Section>
  )
}
