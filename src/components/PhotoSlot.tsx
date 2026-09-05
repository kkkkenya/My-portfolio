type PhotoSlotProps = {
  /** Short label, e.g. "Portrait". */
  label: string
  /** Shot description, e.g. "Gregory, studio headshot — lands after photo shoot". */
  hint: string
  ratio?: string
  className?: string
}

/**
 * Styled placeholder for a post-shoot photo — NOT a stock photo.
 *
 * To swap in the real photo, replace the whole <PhotoSlot ... /> line with:
 *   <img src="/portrait.jpg" alt="Gregory Muhoro Kimemiah" className="..." />
 */
export function PhotoSlot({ label, hint, ratio = 'aspect-[4/5]', className = '' }: PhotoSlotProps) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${hint}`}
      className={`blueprint-grid-fine relative flex flex-col items-center justify-center gap-2 overflow-hidden border border-dashed border-amber-dim bg-surface ${ratio} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, rgba(232,163,61,0.10) 0px, rgba(232,163,61,0.10) 1px, transparent 1px, transparent 12px)',
        }}
      />
      <p className="relative font-tag text-xs tracking-widest text-amber">{label}</p>
      <p className="relative max-w-[26ch] px-6 text-center font-tag text-[11px] leading-relaxed text-paper-dim">
        {hint}
      </p>
    </div>
  )
}
