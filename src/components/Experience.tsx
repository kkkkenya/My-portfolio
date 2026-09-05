import { Plus } from 'lucide-react'
import { useState } from 'react'
import { experience } from '../data'
import { Reveal } from './Reveal'

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="border-b border-line-soft">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
            Experience
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 border-y border-line">
          {experience.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.role + item.org} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span>
                    <span className="font-display text-base font-semibold text-paper md:text-lg">
                      {item.role}
                    </span>
                    <span className="ml-3 text-sm text-paper-dim">
                      {item.org}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4">
                    <span className="font-tag text-xs text-paper-dim">
                      {item.period}
                    </span>
                    <Plus
                      size={18}
                      className={`text-amber transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </span>
                </button>

                <div className={`accordion-panel ${isOpen ? 'is-open' : ''}`}>
                  <div>
                    <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-paper-dim">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
