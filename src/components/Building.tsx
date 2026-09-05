import { PhotoSlot } from './PhotoSlot'

export function Building() {
  return (
    <section className="border-b border-line-soft bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr_1fr] md:gap-12">
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
          </div>
          <PhotoSlot
            label="Detail"
            hint="Study Hub in action — community or session snapshot"
            ratio="aspect-square"
            className="w-full self-start"
          />
        </div>
      </div>
    </section>
  )
}
