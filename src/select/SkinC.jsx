import { useCallback, useEffect, useRef, useState } from "react"
import "./skin-c.css"
import { profile, roster } from "./roster"

// Skin C: night-heat racing garage on the same spiral engine.
// Ghost-grid roster, pole-position lights up, spec card with plates,
// cash purse, start-light sequence, elastic edges.

// --- diversified SFX kit: ticks, chimes, count beeps, back sweep ---
function tone({ freq = 660, end = null, dur = 0.07, type = "square", vol = 0.04, delay = 0 }) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    tone.ctx = tone.ctx || new Ctx()
    const ctx = tone.ctx
    if (ctx.state === "suspended") void ctx.resume()
    const t = ctx.currentTime + delay
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    if (end) o.frequency.exponentialRampToValueAtTime(Math.max(40, end), t + dur)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(ctx.destination)
    o.start(t)
    o.stop(t + dur + 0.03)
  } catch {
    /* audio unavailable: silent */
  }
}
const sfxHover = (i) => tone({ freq: 480 + (i % 5) * 70, dur: 0.05, type: "square", vol: 0.028 })
const sfxSelect = () => {
  tone({ freq: 520, dur: 0.08, type: "square" })
  tone({ freq: 784, dur: 0.11, type: "square", delay: 0.07 })
}
const sfxBack = () => tone({ freq: 520, end: 240, dur: 0.13, type: "triangle", vol: 0.04 })
const sfxCount = () => tone({ freq: 440, dur: 0.13, type: "square", vol: 0.05 })
const sfxGo = () => {
  // green light: twin-osc engine with gear shifts and firing-rate throb + pass-by whoosh
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    tone.ctx = tone.ctx || new Ctx()
    const ctx = tone.ctx
    if (ctx.state === "suspended") void ctx.resume()
    const t = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, t)
    master.gain.exponentialRampToValueAtTime(0.045, t + 0.12)
    master.gain.setValueAtTime(0.045, t + 1.1)
    master.gain.exponentialRampToValueAtTime(0.0001, t + 1.55)
    master.connect(ctx.destination)
    const filt = ctx.createBiquadFilter()
    filt.type = "lowpass"
    filt.Q.value = 3
    filt.frequency.setValueAtTime(250, t)
    filt.frequency.exponentialRampToValueAtTime(3800, t + 1.3)
    filt.connect(master)
    const mkOsc = (type, base, g0) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = type
      o.frequency.setValueAtTime(base, t)
      g.gain.value = g0
      o.connect(g).connect(filt)
      return { o, g }
    }
    const e1 = mkOsc("sawtooth", 55, 0.5)
    const e2 = mkOsc("square", 82, 0.22)
    // gear shifts: climb, drop back, climb higher
    const gears = [[55, 160, 0, 0.5], [110, 230, 0.5, 0.95], [150, 310, 0.95, 1.35]]
    gears.forEach(([from, to, t0, t1]) => {
      e1.o.frequency.setValueAtTime(from, t + t0)
      e1.o.frequency.exponentialRampToValueAtTime(to, t + t1)
      e2.o.frequency.setValueAtTime(from * 1.5, t + t0)
      e2.o.frequency.exponentialRampToValueAtTime(to * 1.5, t + t1)
    })
    // firing-rate throb: the engine putter
    const lfo = ctx.createOscillator()
    const lfoAmp = ctx.createGain()
    lfo.type = "sine"
    lfo.frequency.setValueAtTime(22, t)
    lfo.frequency.exponentialRampToValueAtTime(46, t + 1.3)
    lfoAmp.gain.value = 0.3
    lfo.connect(lfoAmp)
    lfoAmp.connect(e1.g.gain)
    lfoAmp.connect(e2.g.gain)
    e1.o.start(t)
    e2.o.start(t)
    lfo.start(t)
    e1.o.stop(t + 1.6)
    e2.o.stop(t + 1.6)
    lfo.stop(t + 1.6)
    // pass-by whoosh
    const len = Math.floor(ctx.sampleRate * 1.1)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = "bandpass"
    bp.Q.value = 1.2
    bp.frequency.setValueAtTime(400, t)
    bp.frequency.exponentialRampToValueAtTime(3500, t + 0.55)
    bp.frequency.exponentialRampToValueAtTime(500, t + 1.05)
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.0001, t)
    ng.gain.exponentialRampToValueAtTime(0.06, t + 0.5)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 1.05)
    noise.connect(bp).connect(ng).connect(ctx.destination)
    noise.start(t)
    noise.stop(t + 1.1)
  } catch {
    /* audio unavailable: silent */
  }
}
const sfxToggle = (on) => tone({ freq: on ? 920 : 520, dur: 0.06, type: "sine", vol: 0.04 })

// car specs derived from the game stats
const spec = (p) => ({
  bhp: p.stats.PWR * 4 + 40,
  top: 180 + p.stats.PWR,
  accel: (9.5 - p.stats.SPD * 0.06).toFixed(1),
  grip: p.stats.STY,
})
const num = (p, i) => String(i + 1).padStart(2, "0")

export default function SkinC() {
  const [active, setActive] = useState(3)
  const readConsent = () => {
    try {
      return localStorage.getItem("gmk-consent")
    } catch {
      return null
    }
  }
  const [sfx, setSfx] = useState(() => readConsent() === "all")
  const [crt, setCrt] = useState(() => readConsent() !== "denied")
  const [consent, setConsent] = useState(() => readConsent())
  const [legal, setLegal] = useState(null) // null | cookies | terms | privacy
  const [paint, setPaint] = useState(() => {
    try {
      return localStorage.getItem("gmk-paint") || "volt"
    } catch {
      return "volt"
    }
  })
  const [detail, setDetail] = useState(null)
  const [lights, setLights] = useState(null) // null | 1..3 | "GO" (+proj in ref)
  const [purse, setPurse] = useState(1200)
  const scrollRef = useRef(null)
  const listRef = useRef(null)
  const rowsRef = useRef([])
  const smoothRef = useRef(new Map())
  const lightsProj = useRef(null)
  const activeRef = useRef(active)
  activeRef.current = active

  const item = detail ?? roster[active]
  const preview = roster[active]
  const pspec = spec(preview)

  // persist paint job
  useEffect(() => {
    try {
      localStorage.setItem("gmk-paint", paint)
    } catch {
      /* private mode: paint just doesn't stick */
    }
  }, [paint])

  const cyclePaint = useCallback(() => {
    setPaint((p) => (p === "volt" ? "heat" : p === "heat" ? "sunset" : "volt"))
  }, [])

  // cookie-consent settings: all / necessary (fx only) / denied — persisted
  const choose = useCallback((c) => {
    try {
      localStorage.setItem("gmk-consent", c)
    } catch {
      /* private mode — choice just doesn't stick */
    }
    setConsent(c)
    if (c === "all") {
      setSfx(true)
      setCrt(true)
      sfxToggle(true)
    } else if (c === "necessary") {
      setSfx(false)
      setCrt(true)
    } else {
      setSfx(false)
      setCrt(false)
    }
  }, [])
  const cookieMode = sfx && crt ? "all" : !sfx && crt ? "necessary" : !sfx && !crt ? "denied" : "custom"

  // ---- 3D engine (lerped spiral) ----
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    let raf = 0
    let lastTop = scroller.scrollTop
    let py = 50
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const frame = () => {
      raf = requestAnimationFrame(frame)
      const top = scroller.scrollTop
      const vel = Math.max(-40, Math.min(40, top - lastTop))
      lastTop = top
      py += (50 + vel * 1.6 - py) * 0.12
      scroller.style.setProperty("--py", `${py.toFixed(2)}%`)

      const vh = window.innerHeight
      const cy = vh / 2
      rowsRef.current.forEach((cell, i) => {
        if (!cell) return
        const r = cell.getBoundingClientRect()
        const dist = Math.abs(r.top + r.height / 2 - cy) / (vh / 2)
        const base = -45 + (1 - Math.min(dist * 1.35, 1)) * 33
        const target = i === activeRef.current ? -4 : base
        const prev = smoothRef.current.get(cell) ?? target
        const next = reduced ? target : prev + (target - prev) * 0.16
        smoothRef.current.set(cell, next)
        cell.style.setProperty("--ry", `${next.toFixed(2)}deg`)
      })
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ---- elastic overscroll ----
  useEffect(() => {
    const scroller = scrollRef.current
    const list = listRef.current
    if (!scroller || !list) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let pull = 0
    let raf = 0
    let releaseTimer = 0

    const render = () => {
      const o = Math.max(-260, Math.min(260, pull))
      if (o === 0) {
        list.style.transform = ""
        return
      }
      const squash = 1 - Math.min(Math.abs(o) / 1400, 0.06)
      list.style.transformOrigin = o >= 0 ? "50% 0%" : "50% 100%"
      list.style.transform = `translateY(${(o * 0.7).toFixed(1)}px) scaleY(${squash.toFixed(4)})`
    }
    const release = () => {
      pull = 0
      list.style.transition = reduced ? "" : "transform 0.65s cubic-bezier(0.22, 1.4, 0.36, 1)"
      list.style.transform = ""
      clearTimeout(releaseTimer)
      releaseTimer = setTimeout(() => {
        list.style.transition = ""
      }, 700)
    }
    const scheduleRelease = () => {
      clearTimeout(releaseTimer)
      releaseTimer = setTimeout(release, 110)
    }
    const atLimit = (dir) => {
      const max = scroller.scrollHeight - scroller.clientHeight
      if (dir < 0) return scroller.scrollTop <= 0
      return scroller.scrollTop >= max - 1
    }
    const yank = (delta) => {
      if (reduced) return
      list.style.transition = ""
      pull = Math.max(-260, Math.min(260, pull - delta * 0.45))
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }
    const onWheel = (e) => {
      if ((atLimit(-1) && e.deltaY < 0) || (atLimit(1) && e.deltaY > 0)) {
        e.preventDefault()
        yank(e.deltaY)
        scheduleRelease()
      } else if (pull !== 0) {
        release()
      }
    }
    let lastY = 0
    const onTouchStart = (e) => {
      lastY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const y = e.touches[0].clientY
      const dy = lastY - y
      lastY = y
      if ((atLimit(-1) && dy < 0) || (atLimit(1) && dy > 0)) {
        e.preventDefault()
        yank(dy * 1.4)
      }
    }
    const onTouchEnd = () => {
      if (pull !== 0) release()
    }
    scroller.addEventListener("wheel", onWheel, { passive: false })
    scroller.addEventListener("touchstart", onTouchStart, { passive: true })
    scroller.addEventListener("touchmove", onTouchMove, { passive: false })
    scroller.addEventListener("touchend", onTouchEnd)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(releaseTimer)
      scroller.removeEventListener("wheel", onWheel)
      scroller.removeEventListener("touchstart", onTouchStart)
      scroller.removeEventListener("touchmove", onTouchMove)
      scroller.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  const hover = useCallback(
    (i) => {
      setActive((prev) => {
        if (prev !== i) {
          setPurse((p) => p + 100)
          if (sfx) sfxHover(i)
        }
        return i
      })
    },
    [sfx]
  )

  const select = useCallback(
    (proj) => {
      const sound = sfx
      if (sound) sfxSelect()
      lightsProj.current = proj
      setLights(1)
      if (sound) sfxCount()
      setTimeout(() => {
        setLights(2)
        if (sound) sfxCount()
      }, 380)
      setTimeout(() => {
        setLights(3)
        if (sound) sfxCount()
      }, 760)
      setTimeout(() => {
        setLights("GO")
        if (sound) sfxGo()
      }, 1140)
      setTimeout(() => {
        setLights(null)
        setPurse((p) => p + 1000)
        setDetail(lightsProj.current)
      }, 1750)
    },
    [sfx]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (legal) {
        if (e.key === "Escape") setLegal(null)
        return
      }
      if (lights) return
      if (detail) {
        if (e.key === "Escape") {
          if (sfx) sfxBack()
          setDetail(null)
        }
        return
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault()
        setActive((a) => {
          const n = (a + 1) % roster.length
          setPurse((p) => p + 100)
          if (sfx) sfxHover(n)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault()
        setActive((a) => {
          const n = (a - 1 + roster.length) % roster.length
          setPurse((p) => p + 100)
          if (sfx) sfxHover(n)
          rowsRef.current[n]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
          return n
        })
      }
      if (e.key === "Enter") select(roster[activeRef.current])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [detail, lights, legal, sfx, select])

  const lit = lights === "GO" ? 3 : (lights ?? 0)

  return (
    <div className={`ga-root ${crt ? "ga-crt" : ""}`} data-paint={paint}>
      <div className="ga-glow" />
      <div className="ga-streaks" />
      <div className="ga-road" />

      {/* top HUD */}
      <div className="ga-topbar ga-hud">
        <div className="ga-toprow">
          <span>
            NIGHT HEAT <span className="ga-hide-m">· RUIRU GP</span>
          </span>
          <span className="ga-cookies">
            <span className="ck">🍪</span>
            <button className={`ga-cookie${cookieMode === "all" ? " is-on" : ""}`} onClick={() => choose("all")}>ACCEPT ALL</button>
            <button className={`ga-cookie${cookieMode === "necessary" ? " is-on" : ""}`} onClick={() => choose("necessary")}>NECESSARY</button>
            <button className={`ga-cookie${cookieMode === "denied" ? " is-on" : ""}`} onClick={() => choose("denied")}>DENY</button>
            <button className="ga-cookie" onClick={cyclePaint} title="Switch paint job">PAINT:{paint.toUpperCase()}</button>
            <a className="ga-cookie" href={`mailto:${profile.email}`}>✉ HIRE ME</a>
          </span>
        </div>
        <div className="ga-checker ga-checkline" />
      </div>

      {/* race control */}
      <div className="ga-raceop ga-hud" aria-live="polite">
        <span className="ga-pop" key={preview.id}>
          P{num(preview, active)}: <b>{preview.cta}</b>
        </span>
      </div>

      {/* spiral grid */}
      <div className="ga-scroll" ref={scrollRef}>
        <div className="ga-tall">
          <ul className="ga-list" ref={listRef}>
            {roster.map((p, i) => (
              <li
                key={p.id}
                className={`ga-row ga-enter ${i === active ? "is-active" : ""}`}
                style={{ animationDelay: `${0.25 + i * 0.09}s` }}
              >
                <span
                  className="ga-cell"
                  ref={(el) => {
                    rowsRef.current[i] = el
                  }}
                >
                  <button
                    className="ga-pick"
                    data-year={p.year}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    onClick={() => select(p)}
                  >
                    {i === active && <span className="ga-cursor">▸</span>}
                    {p.lines.join(" ")}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* garage spec card */}
      <aside className="ga-garage ga-hud" aria-live="polite">
        <div className="ga-bay">
          <span>BAY {num(preview, active)}</span>
          <span>{preview.year}</span>
        </div>
        <div
          className="ga-car"
          style={{
            background: `linear-gradient(150deg, hsl(${preview.hue} 70% 34%), hsl(${(preview.hue + 70) % 360} 75% 20%))`,
          }}
        >
          <span className="ga-carnum" key={preview.id}>
            {num(preview, active)}
          </span>
          <span className="ga-sheen" />
        </div>
        <span className="ga-plate">KE · {preview.year} · GMK</span>
        <div className="ga-spec">
          <h3>{preview.lines.join(" ")}</h3>
          <p className="ga-sub">
            {preview.role} · 0-100 {pspec.accel}s · {preview.stack.join(" / ")}
          </p>
          {[
            ["BHP", pspec.bhp, 520],
            ["TOP", pspec.top, 320],
            ["GRIP", pspec.grip, 100],
          ].map(([k, v, max]) => (
            <div className="ga-stat" key={k}>
              <span>{k}</span>
              <span className="ga-bar">
                <i style={{ width: `${Math.min(100, (v / max) * 100).toFixed(1)}%` }} />
              </span>
              <span>{k === "TOP" ? `${v}km/h` : v}</span>
            </div>
          ))}
          <p className="ga-controls">↑↓ TUNE: ENTER TO RACE</p>
        </div>
      </aside>

      {/* first-visit cookie consent */}
      {consent === null && (
        <div className="ga-consent ga-hud" role="dialog" aria-label="Cookie consent">
          <p>🍪 PIT-STOP COOKIES: this site stores your paint job and settings on your device only. No accounts, no tracking.</p>
          <div className="row">
            <button className="ga-cookie" onClick={() => choose("all")}>ACCEPT ALL</button>
            <button className="ga-cookie" onClick={() => choose("necessary")}>NECESSARY</button>
            <button className="ga-cookie" onClick={() => choose("denied")}>DENY</button>
            <button className="ga-cookie policy" onClick={() => setLegal("cookies")}>READ POLICY</button>
          </div>
        </div>
      )}

      {/* bottom bar */}
      <footer className="ga-cmdbar ga-hud">
        <div className="ga-cmdrow">
          <span>
            <button onClick={() => setLegal("cookies")}>📜 LEGAL</button>
            <span className="ga-hide-m"> · {profile.name}</span>
          </span>
          <span className="ga-purse">$ {purse.toLocaleString("en-US")} PURSE</span>
        </div>
      </footer>


      {/* detail = race telemetry */}
      {detail && (
        <div className="ga-sheet">
          <button className="ga-backbtn ga-hud" onClick={() => { if (sfx) sfxBack(); setDetail(null) }}>
            ✕ BACK TO GRID [ESC]
          </button>
          <p className="ga-hud" style={{ marginTop: 24, fontSize: 22, color: "var(--yellow)" }}>
            🏁 CHEQUERED: {item.year} · {item.role} · 0-100 {spec(item).accel}s
          </p>
          <h2
            style={{
              fontSize: "clamp(48px,9vw,150px)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              fontWeight: 900,
              fontStyle: "italic",
              margin: "12px 0",
            }}
          >
            {item.lines.join(" ")}
          </h2>
          <p style={{ maxWidth: 620, marginTop: 8, lineHeight: 1.55 }}>{item.blurb}</p>
          <p className="ga-hud" style={{ fontSize: 20, opacity: 0.75 }}>{item.stack.join(" / ")}</p>
          {item.points && (
            <ul style={{ maxWidth: 640, marginTop: 16, paddingLeft: 20, lineHeight: 1.6 }}>
              {item.points.map((pt) => (
                <li key={pt} style={{ marginBottom: 10 }}>{pt}</li>
              ))}
            </ul>
          )}
          {item.quote && (
            <p style={{ maxWidth: 620, marginTop: 18, paddingLeft: 16, borderLeft: "3px solid var(--yellow)", fontStyle: "italic", lineHeight: 1.55 }}>
              “{item.quote.text}”
              <span className="ga-hud" style={{ display: "block", marginTop: 6, fontStyle: "normal", fontSize: 18, opacity: 0.7 }}>- {item.quote.by}</span>
            </p>
          )}
          {item.links && (
            <p className="ga-hud" style={{ fontSize: 20, marginTop: 14 }}>
              {item.links.map((l, i) => (
                <span key={l.url}>
                  {i > 0 && " · "}
                  <a href={l.url} target="_blank" rel="noreferrer">↗ {l.label}</a>
                </span>
              ))}
            </p>
          )}
        </div>
      )}

      {/* start lights */}
      {lights && (
        <div className="ga-lights ga-hud">
          <div className={`ga-lamps ${lights === "GO" ? "go" : ""}`}>
            {[1, 2, 3].map((l) => (
              <i key={l} className={l <= lit ? "lit" : ""} />
            ))}
          </div>
          <div className="ga-lightstext">{lights === "GO" ? "GO!!" : lightsProj.current?.lines.join(" ")}</div>
        </div>
      )}
    </div>
  )
}
