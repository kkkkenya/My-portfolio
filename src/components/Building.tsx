import { PhotoSlot } from './PhotoSlot'
import { Counter } from './Counter'
import { Reveal } from './Reveal'
import { Schematic } from './Schematic'
import { stats } from '../data'

export function Building() {
  return (
    <section className="border-b border-line-soft bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal className="grid gap-10 md:grid-cols-[1fr_2fr_1fr] md:gap-12">
          <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
            Right now
          </h2>
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-paper">
              Most of my time goes into the{' '}
              <span className="text-amber">Engineering Study Hub</span> — a
              Discord community built for Kenyan engineering students who want
              structure, not just notes.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper-dim">
              Everything else on this page is proof of work from the years
              before it. If you want to build something together, the fastest
              way to reach me is below.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-line-soft pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-2xl font-semibold text-amber md:text-3xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 font-tag text-[11px] leading-snug text-paper-dim">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <PhotoSlot
            label="Detail"
            hint="Study Hub in action — community or session snapshot"
            ratio="aspect-[16/9] md:aspect-square"
            className="w-full self-start"
          />
        </Reveal>
        <Reveal>
          <Schematic className="mt-16" />
        </Reveal>
      </div>
    </section>
  )
}
