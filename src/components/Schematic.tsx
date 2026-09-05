import { useInViewOnce } from './Reveal'

/**
 * Blueprint circuit divider — draws itself when scrolled into view.
 * pathLength={1} normalizes every path so dash 1 -> 0 always completes.
 */
export function Schematic({ className = '' }: { className?: string }) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>(0.4)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`schematic${seen ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      <svg viewBox="0 0 800 120" fill="none" preserveAspectRatio="xMidYMid meet">
        <path
          className="draw draw-main"
          d="M-10 84 H200 L244 40 H400 L444 84 H596 L640 40 H810"
          pathLength={1}
        />
        <path className="draw draw-branch" d="M244 40 V12 H330" pathLength={1} />
        <path className="draw draw-branch" d="M596 84 V112 H680" pathLength={1} />
        {[
          [200, 84],
          [400, 40],
          [596, 84],
          [640, 40],
        ].map(([cx, cy], i) => (
          <circle key={i} className="node" cx={cx} cy={cy} r="5" style={{ transitionDelay: `${500 + i * 160}ms` }} />
        ))}
        <rect className="node" x={322} y={4} width={16} height={16} style={{ transitionDelay: '1100ms' }} />
        <rect className="node" x={672} y={104} width={16} height={16} style={{ transitionDelay: '1250ms' }} />
      </svg>
    </div>
  )
}
