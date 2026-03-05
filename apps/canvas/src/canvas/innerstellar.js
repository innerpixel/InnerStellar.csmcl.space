// Innerstellar canvas engine
// Personal space visualization — adapted from the Firmament engine (CSMCL.Space)
//
// Color language:
//   green  → system layer  (folds, architecture keepers)
//   cyan   → content layer (drops, orbiting ideas, user artifacts)
//   amber  → crystallizing (approaching the threshold → Priment)
//
// Timeline: drops positioned on arc by date. Most recent = 12 o'clock. Older = clockwise.

// ─── Seeded RNG ───────────────────────────────────────────────────────────────
function makeRng(seed) {
  let s = seed | 0
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

// ─── Type-based color system ──────────────────────────────────────────────────
const TYPE_COLORS = {
  system: {
    fill: 'rgba(80, 220, 155, 1)',
    glow: 'rgb(55, 200, 135)',
    halo: 'rgba(40, 180, 115, 0.40)',
    dim:  'rgba(80, 200, 145, 0.60)',
  },
  content: {
    fill: 'rgba(80, 200, 235, 1)',
    glow: 'rgb(55, 180, 220)',
    halo: 'rgba(40, 160, 205, 0.38)',
    dim:  'rgba(75, 185, 215, 0.58)',
  },
  crystallizing: {
    fill: 'rgba(255, 185, 55, 1)',
    glow: 'rgb(240, 162, 35)',
    halo: 'rgba(220, 140, 25, 0.52)',
    dim:  'rgba(230, 165, 50, 0.78)',
  },
}

function typeColor(entity) {
  if (entity?.crystallizing) return TYPE_COLORS.crystallizing
  if (entity?.type === 'system')  return TYPE_COLORS.system
  return TYPE_COLORS.content
}

// ─── Timeline positioning ─────────────────────────────────────────────────────
// Most recent = 12 o'clock (-π/2). Older = clockwise. 270° arc total.
// Future gap lives in the upper-right quadrant — space for what comes next.
function computeTimelineAngles(drops) {
  const ARC_START = -Math.PI / 2
  const ARC_SPAN  = Math.PI * 1.5  // 270°

  const indexed = drops.map((d, i) => ({ id: d.id, date: d.date || '2000-01-01', i }))
  indexed.sort((a, b) => {
    const ta = new Date(a.date).getTime()
    const tb = new Date(b.date).getTime()
    return ta !== tb ? ta - tb : a.i - b.i
  })

  const n     = indexed.length
  const minMs = new Date(indexed[0].date).getTime()
  const maxMs = new Date(indexed[n - 1].date).getTime()
  const same  = maxMs === minMs

  const result = {}
  indexed.forEach((d, rank) => {
    const t = same
      ? rank / Math.max(n - 1, 1)
      : (new Date(d.date).getTime() - minMs) / (maxMs - minMs)
    result[d.id] = ARC_START + (1 - t) * ARC_SPAN
  })
  return result
}

// ─── Main init ────────────────────────────────────────────────────────────────
export function initInnerstellar(canvas, space, callbacks = {}) {
  const ctx = canvas.getContext('2d')
  let W, H, cx, cy, dpr
  let rafId
  let currentT = 0

  const { onElementHover = () => {}, onElementFocus = () => {} } = callbacks

  // Emit via global event bus if available (wired in App.svelte)
  const emit = (type, payload) => window.ed?.distributeEvent({ type, payload })

  // ─── Resize ──────────────────────────────────────────────────────────────
  function resize() {
    dpr = window.devicePixelRatio || 1
    W = window.innerWidth
    H = window.innerHeight
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'
    canvas.width  = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx = W / 2
    cy = H / 2
  }
  function onResize() { resize(); initParticles() }
  window.addEventListener('resize', onResize)
  resize()

  // ─── Mouse ───────────────────────────────────────────────────────────────
  const mouse = { x: 0, y: 0, nx: 0.5, ny: 0.5, active: false }
  let hoveredEl = null

  canvas.addEventListener('mousemove', e => {
    mouse.x  = e.clientX; mouse.y  = e.clientY
    mouse.nx = e.clientX / W; mouse.ny = e.clientY / H
    mouse.active = true
  })
  canvas.addEventListener('mouseleave', () => { mouse.active = false })
  canvas.addEventListener('click', e => {
    const hit = hitTest(e.clientX, e.clientY, currentT)
    if (hit) {
      onElementFocus(hit)
      emit('canvas.element.focused', hit)
    } else {
      emit('canvas.element.dismissed', null)
    }
  })

  // ─── Spatial constants ────────────────────────────────────────────────────
  const foldR   = () => Math.min(W, H) * 0.13
  const dropR   = () => Math.min(W, H) * 0.44
  const plane2R = () => Math.min(W, H) * 0.60   // innerstellar.csmcl.space
  const plane3R = () => Math.min(W, H) * 0.76   // CSMCL.Space / Firmament

  // ─── Precompute idea counts per drop ──────────────────────────────────────
  const ideaCount = {}
  space.orbiting.forEach(idea => {
    ideaCount[idea.orbit] = (ideaCount[idea.orbit] || 0) + 1
  })

  // ─── Orbital state ────────────────────────────────────────────────────────
  const rng = makeRng(42)

  const foldOrbits = space.folds.map((fold, i) => ({
    ...fold,
    startAngle: (i / space.folds.length) * Math.PI * 2,
    speed:      0.014 + rng() * 0.006,
  }))

  const timelineAngles = computeTimelineAngles(space.drops)
  const dropOrbits = space.drops.map(drop => ({
    ...drop,
    startAngle: timelineAngles[drop.id] ?? rng() * Math.PI * 2,
    speed:      0.003 + rng() * 0.001,  // slow unified clockwise drift
  }))

  const ideaOrbits = space.orbiting.map(idea => ({
    ...idea,
    localStartAngle: rng() * Math.PI * 2,
    localSpeed:      (0.05 + rng() * 0.04) * (rng() > 0.5 ? 1 : -1),
    localRNorm:      0.048 + rng() * 0.020,
  }))

  // ─── Position helpers ─────────────────────────────────────────────────────
  function foldPos(fold, t) {
    const a = fold.startAngle + t * fold.speed
    return { x: cx + Math.cos(a) * foldR(), y: cy + Math.sin(a) * foldR() }
  }

  function dropOrbitalPos(drop, t) {
    const a = drop.startAngle + t * drop.speed
    // crystallizing: drift 18% outward toward plane2R — approaching the threshold
    const r = drop.crystallizing
      ? dropR() + (plane2R() - dropR()) * 0.18
      : dropR()
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }

  function ideaPos(idea, t) {
    const parent = dropOrbits.find(d => d.id === idea.orbit)
    if (!parent) {
      const a = idea.localStartAngle + t * idea.localSpeed
      return { x: cx + Math.cos(a) * Math.min(W, H) * 0.28, y: cy + Math.sin(a) * Math.min(W, H) * 0.28 }
    }
    const pPos   = dropOrbitalPos(parent, t)
    const localR = Math.min(W, H) * idea.localRNorm
    const a      = idea.localStartAngle + t * idea.localSpeed
    return { x: pPos.x + Math.cos(a) * localR, y: pPos.y + Math.sin(a) * localR }
  }

  // ─── Hit test ─────────────────────────────────────────────────────────────
  function hitTest(x, y, t) {
    for (const fold of foldOrbits) {
      const p = foldPos(fold, t)
      if (Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2) < 26) return { kind: 'fold', ...fold }
    }
    for (const drop of dropOrbits) {
      const p = dropOrbitalPos(drop, t)
      if (Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2) < 22) return { kind: 'drop', ...drop }
    }
    for (const idea of ideaOrbits) {
      const p = ideaPos(idea, t)
      if (Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2) < 18) return { kind: 'idea', ...idea }
    }
    return null
  }

  // ─── Particles ───────────────────────────────────────────────────────────
  let particles = []
  const layerStart = [0, 0, 0, 0]

  function makeParticle(rng, layer) {
    const x = rng() * W, y = rng() * H
    const trailLen = [24, 14, 0][layer]
    const trail = Array.from({ length: trailLen }, () => ({ x, y }))
    const colors = [
      () => `hsl(${210 + Math.floor(rng() * 90)},${55 + Math.floor(rng() * 20)}%,${50 + Math.floor(rng() * 18)}%)`,
      () => `rgb(${80 + Math.floor(rng() * 60)},${170 + Math.floor(rng() * 55)},${120 + Math.floor(rng() * 80)})`,
      () => `rgb(${190 + Math.floor(rng() * 60)},${150 + Math.floor(rng() * 50)},${60 + Math.floor(rng() * 70)})`,
    ]
    return {
      x, y, layer,
      color:  colors[layer](),
      size:   [1.1 + rng() * 0.7, 0.7 + rng() * 0.6, 0.8 + rng() * 0.5][layer],
      alpha:  [0.28 + rng() * 0.28, 0.32 + rng() * 0.24, 0.50 + rng() * 0.24][layer],
      trail, trailLen,
      age: Math.floor(rng() * 800),
    }
  }

  function initParticles() {
    const r  = makeRng(271)
    const hw = Math.min(1.0, (navigator.hardwareConcurrency || 4) / 8)
    const s  = 0.55 + hw * 0.45
    particles = []
    const n0 = Math.round(110 * s), n1 = Math.round(55 * s), n2 = Math.round(45 * s)
    for (let i = 0; i < n0; i++) particles.push(makeParticle(r, 0))
    for (let i = 0; i < n1; i++) particles.push(makeParticle(r, 1))
    for (let i = 0; i < n2; i++) particles.push(makeParticle(r, 2))
    particles.sort((a, b) => a.layer - b.layer)
    layerStart[0] = 0; layerStart[1] = n0; layerStart[2] = n0 + n1; layerStart[3] = n0 + n1 + n2
  }
  initParticles()

  // ─── Flow field ───────────────────────────────────────────────────────────
  function flowAngle(x, y, t) {
    const nx = x / W, ny = y / H
    const dx = nx - 0.5, dy = ny - 0.5
    const dist = Math.sqrt(dx * dx + dy * dy)
    const base = Math.atan2(dy, dx) + Math.PI * 0.5 + t * 0.04
    const p1 = Math.sin(nx * 3.1 + t * 0.07) * Math.cos(ny * 2.7 + t * 0.05) * 1.2
    const p2 = Math.sin(nx * 5.8 - t * 0.09) * Math.sin(ny * 4.3 + t * 0.06) * 0.7
    const p3 = Math.cos(nx * 1.9 + ny * 2.3  + t * 0.03) * 0.5
    const spiralPull = dist < 0.25 ? (0.25 - dist) * 4.0 * Math.sin(t * 0.08) : 0
    let angle = base + p1 + p2 + p3 + spiralPull
    if (mouse.active) {
      const mdx = nx - mouse.nx, mdy = ny - mouse.ny
      const md = Math.sqrt(mdx * mdx + mdy * mdy)
      if (md < 0.20 && md > 0.002)
        angle += Math.atan2(mdy, mdx) * ((1 - md / 0.20) ** 2) * 0.45
    }
    return angle
  }

  function flowSpeed(x, y, layer) {
    const dx = x / W - 0.5, dy = y / H - 0.5
    const dist = Math.sqrt(dx * dx + dy * dy * 1.5)
    const base = [0.24, 0.48, 0.98][layer]
    return base * (1.0 + dist * 1.2) * (1.0 - Math.max(0, (0.20 - dist) * 3.0))
  }

  function updateParticles(t) {
    const m = 40
    particles.forEach(p => {
      p.age++
      if (p.trailLen > 0) {
        p.trail.unshift({ x: p.x, y: p.y })
        if (p.trail.length > p.trailLen) p.trail.pop()
      }
      const angle = flowAngle(p.x, p.y, t), speed = flowSpeed(p.x, p.y, p.layer)
      p.x += Math.cos(angle) * speed; p.y += Math.sin(angle) * speed
      if (p.x < -m)    { p.x = W + m; p.trail.forEach(pt => { pt.x = p.x; pt.y = p.y }) }
      if (p.x > W + m) { p.x = -m;    p.trail.forEach(pt => { pt.x = p.x; pt.y = p.y }) }
      if (p.y < -m)    { p.y = H + m; p.trail.forEach(pt => { pt.x = p.x; pt.y = p.y }) }
      if (p.y > H + m) { p.y = -m;    p.trail.forEach(pt => { pt.x = p.x; pt.y = p.y }) }
    })
  }

  function renderParticles() {
    for (let layer = 0; layer < 3; layer++) {
      const start = layerStart[layer], end = layerStart[layer + 1]
      ctx.save()
      for (let pi = start; pi < end; pi++) {
        const p = particles[pi]
        if (p.trailLen < 1 || p.trail.length < 2) continue
        ctx.strokeStyle = p.color
        for (let i = 1; i < p.trail.length; i++) {
          const tf = 1 - i / p.trail.length
          ctx.globalAlpha = tf * tf * p.alpha * 0.62
          ctx.lineWidth   = p.size * tf * (layer === 0 ? 1.3 : 1.0)
          ctx.beginPath(); ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y)
          ctx.lineTo(p.trail[i].x, p.trail[i].y); ctx.stroke()
        }
      }
      ctx.restore()
      ctx.save()
      ctx.shadowBlur = layer === 0 ? 9 : layer === 1 ? 6 : 3
      for (let pi = start; pi < end; pi++) {
        const p = particles[pi]
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.shadowColor = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
      }
      ctx.restore()
    }
  }

  // ─── Background ──────────────────────────────────────────────────────────
  function renderBg(t) {
    ctx.fillStyle = 'rgba(1,1,14,0.18)'; ctx.fillRect(0, 0, W, H)
    const nb  = 0.05 + 0.03 * Math.sin(t * 0.05)
    const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.50)
    neb.addColorStop(0,   `rgba(35,18,75,${nb})`)
    neb.addColorStop(0.5, `rgba(14,7,38,${nb * 0.4})`)
    neb.addColorStop(1,   'transparent')
    ctx.fillStyle = neb; ctx.fillRect(0, 0, W, H)
  }

  // ─── Three-planes rings ───────────────────────────────────────────────────
  // Faint arcs beyond the drop ring show the connected planes.
  // Labels in the upper-right gap (the future zone of the timeline arc).
  function renderPlaneRings() {
    const fs     = Math.min(W, H) * 0.0110
    const labelA = -Math.PI / 5     // upper-right — future gap area
    const r2     = plane2R()
    const r3     = plane3R()

    ctx.save()
    ctx.font      = `${fs}px 'Palatino Linotype', Palatino, Georgia, serif`
    ctx.textAlign = 'left'

    // Plane 1 label (drop ring)
    ctx.globalAlpha = 0.22
    ctx.fillStyle   = 'rgba(140, 190, 215, 1)'
    ctx.fillText('claude.innerstellar',
      cx + Math.cos(labelA) * (dropR() + 6),
      cy + Math.sin(labelA) * (dropR() + 6))

    // Plane 2 arc + label
    ctx.setLineDash([1, 10])
    ctx.lineWidth   = 0.5
    ctx.strokeStyle = 'rgba(80, 200, 220, 0.055)'
    ctx.beginPath(); ctx.arc(cx, cy, r2, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = 0.22
    ctx.fillStyle   = 'rgba(80, 200, 220, 1)'
    ctx.fillText('innerstellar.csmcl.space',
      cx + Math.cos(labelA) * (r2 + 6),
      cy + Math.sin(labelA) * (r2 + 6))

    // Plane 3 arc + label
    ctx.setLineDash([1, 10])
    ctx.strokeStyle = 'rgba(255, 185, 55, 0.035)'
    ctx.beginPath(); ctx.arc(cx, cy, r3, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = 0.18
    ctx.fillStyle   = 'rgba(255, 185, 55, 1)'
    ctx.fillText('csmcl.space',
      cx + Math.cos(labelA) * (r3 + 6),
      cy + Math.sin(labelA) * (r3 + 6))

    ctx.restore()
  }

  // ─── Guide rings ─────────────────────────────────────────────────────────
  function renderRings() {
    ctx.save()
    ctx.setLineDash([2, 6])
    ctx.strokeStyle = 'rgba(80, 200, 150, 0.05)'; ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.arc(cx, cy, foldR(), 0, Math.PI * 2); ctx.stroke()
    ctx.strokeStyle = 'rgba(80, 200, 235, 0.04)'
    ctx.beginPath(); ctx.arc(cx, cy, dropR(), 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
  }

  // ─── Now marker — 12 o'clock on the timeline arc ─────────────────────────
  function renderNowMarker(t) {
    const r     = dropR()
    const x     = cx + Math.cos(-Math.PI / 2) * r
    const y     = cy + Math.sin(-Math.PI / 2) * r
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.0)
    const fs    = Math.min(W, H) * 0.0110

    ctx.save()
    ctx.globalAlpha = 0.30 + 0.20 * pulse
    ctx.fillStyle   = TYPE_COLORS.crystallizing.fill
    ctx.shadowColor = TYPE_COLORS.crystallizing.glow
    ctx.shadowBlur  = 12
    ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur  = 6
    ctx.font        = `${fs}px 'Palatino Linotype', Palatino, Georgia, serif`
    ctx.textAlign   = 'center'
    ctx.fillStyle   = TYPE_COLORS.crystallizing.fill
    ctx.globalAlpha = 0.55 + 0.25 * pulse
    ctx.fillText('now', x, y - 10)
    ctx.restore()
  }

  // ─── Local orbit hints ────────────────────────────────────────────────────
  function renderLocalOrbitHints(t) {
    ctx.save()
    ctx.setLineDash([1, 5]); ctx.lineWidth = 0.4
    for (const drop of dropOrbits) {
      const children = ideaOrbits.filter(i => i.orbit === drop.id)
      if (children.length === 0) continue
      const pos  = dropOrbitalPos(drop, t)
      const avgR = children.reduce((s, i) => s + Math.min(W, H) * i.localRNorm, 0) / children.length
      const col  = typeColor(drop)
      ctx.strokeStyle = col.halo
      ctx.beginPath(); ctx.arc(pos.x, pos.y, avgR, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.setLineDash([])
    ctx.restore()
  }

  // ─── Origin jewel ─────────────────────────────────────────────────────────
  function renderOrigin(t) {
    const v  = 0.4 + 0.6 * Math.sin(t * 0.18)
    const sz = Math.min(W, H) * 0.028
    ctx.save()
    ctx.globalAlpha = 0.10 + 0.10 * v
    ctx.font        = `${sz}px 'Palatino Linotype',Palatino,Georgia,serif`
    ctx.textAlign   = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle   = '#ffe8a0'
    ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 42 * v
    ctx.fillText('✦', cx, cy)
    ctx.restore()
  }

  // ─── Hover label — title · role/date · description · idea count ───────────
  function renderHoverLabel(x, y, entity) {
    const fs  = Math.min(W, H) * 0.0175
    const col = typeColor(entity)

    ctx.save()
    ctx.textAlign = 'center'

    // Title
    ctx.font        = `${fs}px 'Palatino Linotype', Palatino, Georgia, serif`
    ctx.fillStyle   = 'rgba(230, 238, 255, 1.0)'
    ctx.shadowColor = col.glow; ctx.shadowBlur = 14
    ctx.globalAlpha = 1.0
    ctx.fillText(entity.label, x, y)

    // Role or date — type color
    ctx.font        = `${fs * 0.70}px 'Palatino Linotype', Palatino, Georgia, serif`
    ctx.fillStyle   = col.fill
    ctx.globalAlpha = 0.82
    ctx.shadowBlur  = 6
    ctx.fillText(entity.role || entity.date || '', x, y + fs * 1.40)

    // Description
    if (entity.description) {
      ctx.font        = `${fs * 0.60}px 'Palatino Linotype', Palatino, Georgia, serif`
      ctx.fillStyle   = 'rgba(175, 188, 220, 0.90)'
      ctx.globalAlpha = 0.95
      ctx.shadowBlur  = 0
      ctx.fillText(entity.description, x, y + fs * 2.65)
    }

    // Idea count (drops only)
    const count = ideaCount[entity.id]
    if (count) {
      ctx.font        = `${fs * 0.54}px 'Palatino Linotype', Palatino, Georgia, serif`
      ctx.fillStyle   = 'rgba(120, 178, 195, 0.72)'
      ctx.globalAlpha = 0.90
      ctx.fillText(`${count} ideas orbiting`, x, y + fs * 3.80)
    }

    ctx.restore()
  }

  // ─── Folds — inner orbit, system (green) ──────────────────────────────────
  function renderFolds(t, hovered) {
    foldOrbits.forEach((fold, i) => {
      const pos     = foldPos(fold, t)
      const isHover = hovered?.kind === 'fold' && hovered.id === fold.id
      const col     = typeColor(fold)
      const pulse   = 0.82 + 0.18 * Math.sin(t * 0.75 + i * 1.3)
      const sz      = Math.min(W, H) * 0.030 * (isHover ? 1.28 : 1.0) * pulse

      ctx.save()
      ctx.globalAlpha = isHover ? 0.38 : 0.18
      const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sz * 2.6)
      halo.addColorStop(0, col.halo); halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.beginPath(); ctx.arc(pos.x, pos.y, sz * 2.6, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = isHover ? 1.0 : 0.82
      ctx.font        = `${sz}px 'Palatino Linotype', Palatino, Georgia, serif`
      ctx.textAlign   = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle   = col.fill
      ctx.shadowColor = col.glow; ctx.shadowBlur = isHover ? 30 : 16
      ctx.fillText(fold.glyph, pos.x, pos.y)
      ctx.restore()

      if (isHover) renderHoverLabel(pos.x, pos.y - sz * 2.4, { ...fold, kind: 'fold' })
    })
  }

  // ─── Drops — timeline arc, content/crystallizing ──────────────────────────
  function renderDrops(t, hovered) {
    dropOrbits.forEach(drop => {
      const pos     = dropOrbitalPos(drop, t)
      const isHover = hovered?.kind === 'drop' && hovered.id === drop.id
      const col     = typeColor(drop)
      const pRate   = drop.crystallizing ? 1.4 : 0.55
      const pulse   = 0.70 + 0.30 * Math.sin(t * pRate + drop.startAngle)
      const sz      = Math.min(W, H) * 0.020 * (isHover ? 1.55 : 1.0) * pulse

      ctx.save()
      ctx.globalAlpha = isHover ? 0.55 : 0.20
      const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, sz * 4)
      halo.addColorStop(0, col.halo); halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.beginPath(); ctx.arc(pos.x, pos.y, sz * 4, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = isHover ? 0.96 : 0.62
      ctx.font        = `${sz}px 'Palatino Linotype', Palatino, Georgia, serif`
      ctx.textAlign   = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle   = isHover ? col.fill : col.dim
      ctx.shadowColor = col.glow; ctx.shadowBlur = isHover ? 24 : 10
      ctx.fillText(drop.glyph, pos.x, pos.y)
      ctx.restore()

      if (isHover) renderHoverLabel(pos.x, pos.y - sz * 3.0, { ...drop, kind: 'drop' })
    })
  }

  // ─── Ideas — orbiting parent drop, content (cyan) ─────────────────────────
  function renderIdeas(t, hovered) {
    ideaOrbits.forEach(idea => {
      const pos     = ideaPos(idea, t)
      const isHover = hovered?.kind === 'idea' && hovered.id === idea.id
      const col     = typeColor(idea)
      const pulse   = 0.65 + 0.35 * Math.sin(t * 0.38 + idea.localStartAngle)
      const sz      = Math.min(W, H) * 0.013 * (isHover ? 1.5 : 1.0) * pulse

      ctx.save()
      ctx.globalAlpha = isHover ? 0.88 : 0.26
      ctx.font        = `${sz}px 'Palatino Linotype', Palatino, Georgia, serif`
      ctx.textAlign   = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle   = isHover ? col.fill : col.dim
      ctx.shadowColor = col.glow; ctx.shadowBlur = isHover ? 20 : 4
      ctx.fillText(idea.glyph, pos.x, pos.y)
      ctx.restore()

      if (isHover) renderHoverLabel(pos.x, pos.y - sz * 2.6, { ...idea, kind: 'idea' })
    })
  }

  // ─── Cursor ───────────────────────────────────────────────────────────────
  function renderCursor(t) {
    if (!mouse.active) return
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.8)
    ctx.save()
    ctx.strokeStyle = `rgba(160,200,255,${0.10 + 0.07 * pulse})`
    ctx.lineWidth   = 0.7
    ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 5 + 2 * pulse, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle   = `rgba(200,220,255,${0.22 + 0.12 * pulse})`
    ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 1.2, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }

  // ─── Main loop ────────────────────────────────────────────────────────────
  function draw(ts) {
    currentT = ts / 1000

    const hit = mouse.active ? hitTest(mouse.x, mouse.y, currentT) : null
    if (hit?.id !== hoveredEl?.id) {
      hoveredEl = hit
      onElementHover(hit)
      emit('canvas.element.hover', hit ? { id: hit.id, kind: hit.kind, label: hit.label, type: hit.type } : null)
      canvas.style.cursor = hit ? 'pointer' : 'none'
    }

    renderBg(currentT)
    updateParticles(currentT)
    renderParticles()
    renderPlaneRings()
    renderRings()
    renderNowMarker(currentT)
    renderLocalOrbitHints(currentT)
    renderIdeas(currentT, hoveredEl)
    renderDrops(currentT, hoveredEl)
    renderFolds(currentT, hoveredEl)
    renderOrigin(currentT)
    renderCursor(currentT)

    rafId = requestAnimationFrame(draw)
  }

  ctx.fillStyle = '#01010e'
  ctx.fillRect(0, 0, W, H)
  rafId = requestAnimationFrame(draw)

  return {
    destroy() {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    },
  }
}
