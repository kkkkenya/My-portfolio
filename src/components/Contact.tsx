import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="blueprint-grid-fine">
      <Reveal className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
          Have a project in mind? Let's talk.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-9 inline-flex items-center gap-3 border-b border-amber pb-2 font-display text-xl text-paper transition-colors hover:text-amber md:text-2xl"
        >
          {profile.email}
          <ArrowUpRight
            size={22}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

        <p className="mt-6 font-tag text-sm text-paper-dim">
          {profile.location}
        </p>
      </Reveal>
    </section>
  )
}
