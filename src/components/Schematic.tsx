import { useEffect, useRef, useState } from 'react'

type Milestone = {
  x: number
  y: number
  year: string
  /** label sits below the node when true, above when false */
  below: boolean
  /** scroll progress (0-1) at which this milestone lights up */
  at: number
}

const MILESTONES: Milestone[] = [
  { x: 200, y: 84, year: '2023', below: true, at: 0.16 },
  { x: 400, y: 40, year: '2024', below: false, at: 0.42 },
  { x: 596, y: 84, year: '2025', below: true, at: 0.68 },
  { x: 640, y: 40, year: '2026', below: false, at: 0.8 },
]

/**
 * Blueprint circuit divider, scrub-drawn by scroll position.
 * The trace generates as you scroll; year milestones light up
 * as the line reaches them. Fully drawn once scrolled past.
 */
export function Schematic({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setProgress(1)
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
      setProgress((prev) => (Math.abs(prev - p) < 0.005 ? prev : p))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <svg viewBox="0 0 800 120" fill="none" preserveAspectRatio="xMidYMid meet">
        <path
          className="draw"
          d="M-10 84 H200 L244 40 H400 L444 84 H596 L640 40 H810"
          pathLength={1}
          style={{ strokeDashoffset: 1 - progress }}
        />
        <path
          className="draw"
          d="M244 40 V12 H330"
          pathLength={1}
          style={{ strokeDashoffset: 1 - progress }}
        />
        <path
          className="draw"
          d="M596 84 V112 H680"
          pathLength={1}
          style={{ strokeDashoffset: 1 - progress }}
        />
        {MILESTONES.map((m) => {
          const on = progress > m.at
          return (
            <g key={m.year} opacity={on ? 1 : 0} className="milestone">
              <circle cx={m.x} cy={m.y} r="5" className="node" />
              <text
                x={m.x}
                y={m.below ? m.y + 22 : m.y - 14}
                textAnchor="middle"
                className="milestone-year"
              >
                {m.year}
              </text>
            </g>
          )
        })}
        <rect
          x={322}
          y={4}
          width={16}
          height={16}
          className="node"
          opacity={progress > 0.5 ? 1 : 0}
        />
        <rect
          x={672}
          y={104}
          width={16}
          height={16}
          className="node"
          opacity={progress > 0.95 ? 1 : 0}
        />
      </svg>
    </div>
  )
}
