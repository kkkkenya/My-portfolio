import { ExternalLink } from 'lucide-react'
import { projects } from '../data'
import { PhotoSlot } from './PhotoSlot'
import { Reveal } from './Reveal'
import { Schematic } from './Schematic'

export function Work() {
  return (
    <section id="work" className="border-b border-line-soft bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
            Selected work
          </h2>
          <p className="max-w-xs text-sm text-paper-dim">
            Founder projects and client work, built solo or with a small team, shipped and in use.
          </p>
        </Reveal>

        <Reveal>
          <Schematic className="mx-auto mt-10 max-w-5xl px-6" />
        </Reveal>

        <Reveal delay={100}>
          <PhotoSlot
            label="Action"
            hint="Gregory at work — laptop or whiteboard, candid, landscape"
            ratio="aspect-[16/9] md:aspect-[21/9]"
            className="mt-10 w-full"
          />
        </Reveal>

        {(
          [
            ['Founder & builder', 'founder'],
            ['Client work', 'client'],
          ] as const
        ).map(([heading, category]) => (
          <div key={category} className="mt-12">
            <Reveal>
              <h3 className="font-tag text-xs tracking-widest text-amber">
                {heading}
              </h3>
            </Reveal>
            <Reveal
              delay={100}
              className="mt-4 divide-y divide-line border-y border-line"
            >
              {projects
                .filter((project) => project.category === category)
                .map((project) => (
                  <article
                    key={project.title}
                    className="group grid gap-3 py-7 md:grid-cols-[1fr_2fr] md:gap-8"
                  >
                    <h4 className="font-display text-lg font-semibold text-paper">
                      {project.title}
                    </h4>
                    <div>
                      <p className="max-w-xl text-[15px] leading-relaxed text-paper-dim">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-tag text-xs text-teal"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-1 font-tag text-xs text-amber hover:underline"
                          >
                            Visit
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
