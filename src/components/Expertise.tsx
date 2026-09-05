import { expertise } from '../data'
import { Reveal } from './Reveal'

export function Expertise() {
  return (
    <section id="expertise" className="border-b border-line-soft">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-md font-display text-2xl font-semibold text-paper md:text-3xl">
            Where I spend my time
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {expertise.map((item) => (
            <div
              key={item.code}
              className="bg-ink px-7 py-8 transition-colors hover:bg-surface"
            >
              <span className="font-tag text-xs text-amber-dim">
                {item.code}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-paper">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-paper-dim">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
