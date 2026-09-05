export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 font-tag text-xs text-paper-dim">
        <span>© {year} Gregory Muhoro Kimemiah</span>
        <a href="#top" className="hover:text-amber">
          Back to top
        </a>
      </div>
    </footer>
  )
}
