type Milestone = {
  x: number
  y: number
  year: string
  /** label sits below the node when true, above when false */
  below: boolean
}

const MILESTONES: Milestone[] = [
  { x: 200, y: 84, year: '2023', below: true },
  { x: 400, y: 40, year: '2024', below: false },
  { x: 596, y: 84, year: '2025', below: true },
  { x: 640, y: 40, year: '2026', below: false },
]

/**
 * Blueprint circuit divider, always fully drawn.
 * The only motion is the slow ambient pulse traveling the trace —
 * nothing here is tied to scroll position.
 */
export function Schematic({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 800 120" fill="none" preserveAspectRatio="xMidYMid meet">
        <path
          className="draw"
          d="M-10 84 H200 L244 40 H400 L444 84 H596 L640 40 H810"
          pathLength={1}
        />
        <path className="draw" d="M244 40 V12 H330" pathLength={1} />
        <path className="draw" d="M596 84 V112 H680" pathLength={1} />
        {/* independent ambient pulse: energy flowing along the trace on its own loop */}
        <path
          className="pulse"
          d="M-10 84 H200 L244 40 H400 L444 84 H596 L640 40 H810"
          pathLength={1}
        />
        {MILESTONES.map((m) => (
          <g key={m.year} className="milestone">
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
        ))}
        <rect x={322} y={4} width={16} height={16} className="node" />
        <rect x={672} y={104} width={16} height={16} className="node" />
      </svg>
    </div>
  )
}
