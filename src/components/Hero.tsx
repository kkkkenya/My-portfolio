import { ArrowDownRight } from 'lucide-react'
import { affiliations, profile } from '../data'
import { PhotoSlot } from './PhotoSlot'

export function Hero() {
  return (
    <section
      id="top"
      className="blueprint-grid relative overflow-hidden border-b border-line-soft"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 pb-20 pt-20 md:grid-cols-[1fr_300px] md:pb-28 md:pt-28">
        <div>
          <p className="hero-rise hero-rise-1 font-tag text-[13px] text-teal">
            {profile.school} · {profile.location}
          </p>

          <h1 className="hero-rise hero-rise-2 mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-paper md:text-6xl">
            {profile.name}
          </h1>

          <p className="hero-rise hero-rise-3 mt-6 max-w-lg text-lg leading-relaxed text-paper-dim">
            {profile.tagline}
          </p>

          <div className="hero-rise hero-rise-4 mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-none border border-amber bg-amber px-5 py-3 font-tag text-[13px] font-medium text-ink transition-colors hover:bg-transparent hover:text-amber"
            >
              View my work
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-line px-5 py-3 font-tag text-[13px] font-medium text-paper transition-colors hover:border-amber hover:text-amber"
            >
              Get in touch
            </a>
          </div>
        </div>

        <PhotoSlot
          label="Portrait"
          hint="Gregory, studio headshot — lands after photo shoot"
          ratio="aspect-[4/5]"
          className="hero-rise hero-rise-2 w-full"
        />
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-5">
          <span className="font-tag text-xs text-paper-dim/70">
            Engaged with
          </span>
          {affiliations.map((item) => (
            <span
              key={item.name}
              className="font-display text-sm text-paper-dim"
            >
              {item.name}
              <span className="ml-2 font-tag text-xs text-paper-dim/70">
                {item.role}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
