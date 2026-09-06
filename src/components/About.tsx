import { aboutBio, stack } from '../data'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="border-b border-line-soft">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
            About
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 max-w-2xl space-y-5">
            {aboutBio.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-paper-dim md:text-base">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="border border-line px-3 py-1.5 font-tag text-xs text-teal"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
