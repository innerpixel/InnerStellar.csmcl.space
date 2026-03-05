<script>
  import { onMount, onDestroy } from 'svelte'
  import { initInnerstellar } from './canvas/innerstellar.js'
  import { subscribe, distributeEvent } from './lib/eventDistributor.js'
  import { space as seedSpace } from './data/space.js'

  let canvasEl  = $state(null)
  let hoveredEl = $state(null)
  let focusedEl = $state(null)
  let engine
  let space     = $state(seedSpace)

  // ── Query state ───────────────────────────────────────────────────────────
  // Wire QUERY_ENDPOINT to nexus-backend when CORS is set up:
  //   e.g. 'https://nexus.csmcl.space/api/oracle/consult'
  //   or use a Vite proxy: '/api/oracle/consult'
  const QUERY_ENDPOINT = null   // null = disabled (events still fire)
  let querying      = $state(false)
  let queryResponse = $state(null)

  async function queryEntity(entity) {
    if (!QUERY_ENDPOINT || !entity) return
    querying = true
    queryResponse = null
    try {
      const res = await fetch(QUERY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traveler_id: 'innerstellar-traveler',
          question: `Tell me about: ${entity.label}`,
          context: [entity.description, entity.role, entity.pointer]
            .filter(Boolean).join(' · '),
        }),
      })
      if (res.ok) queryResponse = await res.json()
    } catch (_) {
      queryResponse = null
    }
    querying = false
  }

  // ── Event subscriptions ───────────────────────────────────────────────────
  let unsubs = []

  onMount(async () => {
    try {
      const res  = await fetch('/api/space')
      if (res.ok) space = await res.json()
    } catch (_) {
      // no api — use seed
    }

    engine = initInnerstellar(canvasEl, space, {
      onElementHover(el) { hoveredEl = el },
      onElementFocus(el) { focusedEl = el === focusedEl ? null : el },
    })

    // Canvas focus → query
    unsubs.push(subscribe(['canvas.element.focused'], e => {
      queryEntity(e.payload)
    }))

    // Canvas dismissed → clear query
    unsubs.push(subscribe(['canvas.element.dismissed'], () => {
      queryResponse = null
    }))
  })

  onDestroy(() => {
    engine?.destroy()
    unsubs.forEach(fn => fn())
  })

  // ── State strip stats ─────────────────────────────────────────────────────
  const totalDrops    = $derived(space.drops.length)
  const totalFolds    = $derived(space.folds.length)
  const crystallizing = $derived([...space.drops, ...space.orbiting].filter(e => e.crystallizing).length)
  const lastDate      = $derived(space.drops.map(d => d.date).filter(Boolean).sort().pop() ?? '—')

  // ── Panel color class by type ─────────────────────────────────────────────
  function panelKind(el) {
    if (!el) return ''
    if (el.crystallizing) return 'amber'
    if (el.type === 'system') return 'green'
    return 'cyan'
  }
</script>

<canvas bind:this={canvasEl} style="display:block;position:fixed;top:0;left:0;cursor:none;"></canvas>

<!-- Space identity — fades after load -->
<div class="identity">
  <span class="id-glyph">✦</span>
  <span class="id-name">innerstellar</span>
</div>

<!-- Focus panel — element detail, appears on click -->
{#if focusedEl}
  <div class="focus-panel {panelKind(focusedEl)}" role="dialog" aria-modal="true">
    <div class="fp-header">
      <span class="fp-kind">{focusedEl.crystallizing ? 'crystallizing' : focusedEl.type ?? focusedEl.kind}</span>
      <button class="fp-close" onclick={() => { focusedEl = null; queryResponse = null; distributeEvent({ type: 'canvas.element.dismissed' }) }} aria-label="close">×</button>
    </div>
    <div class="fp-glyph">{focusedEl.glyph}</div>
    <div class="fp-title">{focusedEl.label}</div>

    {#if focusedEl.role}
      <div class="fp-role">{focusedEl.role}</div>
    {/if}

    {#if focusedEl.description}
      <div class="fp-description">{focusedEl.description}</div>
    {/if}

    {#if focusedEl.pointer}
      <div class="fp-pointer">
        <span class="pointer-label">session →</span>
        {focusedEl.pointer}
      </div>
    {/if}

    {#if focusedEl.date}
      <div class="fp-meta">{focusedEl.date}</div>
    {/if}

    {#if focusedEl.status}
      <div class="fp-status">
        <span class="status-dot" class:alive={focusedEl.status === 'alive' || focusedEl.status === 'active'}></span>
        {focusedEl.status}
      </div>
    {/if}

    <!-- Query response — live voice from nexus when QUERY_ENDPOINT is set -->
    {#if querying}
      <div class="fp-query-loading">
        <span class="query-pulse">·</span> listening to the space
      </div>
    {/if}

    {#if queryResponse?.guidance}
      <div class="fp-query-response">
        <div class="qr-divider"></div>
        <div class="qr-voice">{queryResponse.guidance}</div>
      </div>
    {/if}
  </div>
{/if}

<!-- State strip — where you are in your space -->
<div class="state-strip">
  <span class="ss-num">{totalDrops}</span> drops
  · <span class="ss-num">{totalFolds}</span> folds
  {#if crystallizing > 0}
    · <span class="ss-amber">{crystallizing} crystallizing</span>
  {/if}
  · <span class="ss-date">{lastDate}</span>
</div>

<!-- Hint — fades quickly -->
{#if !focusedEl}
  <div class="hint">hover to surface · click to open</div>
{/if}

<style>
  /* ── Identity ─────────────────────────────────────────────────────── */
  .identity {
    position: fixed; top: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; align-items: center; gap: 0.9rem;
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    color: rgba(200, 210, 255, 0.14); font-size: 0.72rem; letter-spacing: 0.24em;
    pointer-events: none; animation: idFade 22s ease forwards;
  }
  .id-glyph { color: rgba(255, 220, 100, 0.28); }

  /* ── Focus panel ──────────────────────────────────────────────────── */
  .focus-panel {
    position: fixed; bottom: 4.5rem; left: 50%; transform: translateX(-50%);
    background: rgba(4, 3, 22, 0.90);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(100, 120, 255, 0.10);
    border-radius: 3px; padding: 1.6rem 2.4rem;
    text-align: center;
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    color: rgba(200, 215, 255, 0.80);
    min-width: 240px; max-width: 420px;
    animation: panelIn 0.35s ease;
  }
  /* Type-colored left border */
  .focus-panel.green  { border-left: 2px solid rgba(80, 220, 155, 0.35); }
  .focus-panel.cyan   { border-left: 2px solid rgba(80, 200, 235, 0.28); }
  .focus-panel.amber  { border-left: 2px solid rgba(255, 185, 55, 0.45); }

  .fp-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.0rem;
  }
  .fp-kind {
    font-size: 0.55rem; letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(130, 150, 200, 0.38);
  }
  .focus-panel.green  .fp-kind { color: rgba(80, 200, 145, 0.55); }
  .focus-panel.cyan   .fp-kind { color: rgba(75, 185, 215, 0.50); }
  .focus-panel.amber  .fp-kind { color: rgba(230, 165, 50, 0.65); }

  .fp-close {
    background: none; border: none; color: rgba(130, 150, 200, 0.35);
    font-size: 1.2rem; cursor: pointer; padding: 0; line-height: 1;
    transition: color 0.25s ease;
  }
  .fp-close:hover { color: rgba(200, 215, 255, 0.70); }

  .fp-glyph {
    font-size: 2.2rem; margin-bottom: 0.6rem;
    color: rgba(220, 230, 255, 0.75);
    text-shadow: 0 0 28px rgba(100, 120, 255, 0.25);
  }
  .focus-panel.green .fp-glyph  { color: rgba(80, 220, 155, 0.85);  text-shadow: 0 0 28px rgba(55, 200, 135, 0.30); }
  .focus-panel.cyan  .fp-glyph  { color: rgba(80, 200, 235, 0.80);  text-shadow: 0 0 28px rgba(55, 180, 220, 0.25); }
  .focus-panel.amber .fp-glyph  { color: rgba(255, 185, 55, 0.90);  text-shadow: 0 0 28px rgba(240, 162, 35, 0.40); }

  .fp-title { font-size: 0.95rem; letter-spacing: 0.10em; margin-bottom: 0.3rem; }

  .fp-role {
    font-size: 0.68rem; letter-spacing: 0.10em; font-style: italic;
    color: rgba(140, 160, 200, 0.45); margin-bottom: 0.7rem;
  }
  .focus-panel.green .fp-role { color: rgba(80, 200, 145, 0.50); }
  .focus-panel.cyan  .fp-role { color: rgba(75, 185, 215, 0.45); }
  .focus-panel.amber .fp-role { color: rgba(230, 165, 50, 0.55); }

  .fp-description {
    font-size: 0.72rem; line-height: 1.55;
    color: rgba(160, 175, 210, 0.55);
    margin-bottom: 0.8rem; letter-spacing: 0.04em;
  }

  .fp-pointer {
    font-size: 0.60rem; letter-spacing: 0.12em;
    color: rgba(120, 140, 170, 0.42); margin-bottom: 0.5rem;
    font-style: italic;
  }
  .pointer-label {
    color: rgba(80, 200, 145, 0.45); margin-right: 0.3rem;
    font-style: normal; letter-spacing: 0.08em;
  }

  .fp-meta {
    font-size: 0.58rem; letter-spacing: 0.18em;
    color: rgba(110, 130, 160, 0.32); margin-top: 0.4rem;
  }
  .fp-status {
    margin-top: 0.7rem; font-size: 0.58rem; letter-spacing: 0.18em;
    color: rgba(110, 135, 165, 0.38);
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    text-transform: lowercase;
  }
  .status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(100, 120, 180, 0.32); flex-shrink: 0;
  }
  .status-dot.alive {
    background: rgba(80, 200, 150, 0.72);
    box-shadow: 0 0 7px rgba(60, 180, 130, 0.50);
    animation: statusPulse 2.8s ease-in-out infinite;
  }

  /* ── Query response ────────────────────────────────────────────────── */
  .fp-query-loading {
    margin-top: 1.0rem; font-size: 0.58rem; letter-spacing: 0.18em;
    color: rgba(120, 160, 200, 0.40); font-style: italic;
    animation: breathe 1.8s ease-in-out infinite;
  }
  .fp-query-response { margin-top: 1.0rem; }
  .qr-divider {
    width: 40px; height: 1px; margin: 0 auto 0.8rem;
    background: rgba(100, 120, 200, 0.15);
  }
  .qr-voice {
    font-size: 0.70rem; line-height: 1.65; letter-spacing: 0.04em;
    color: rgba(180, 195, 230, 0.72); font-style: italic;
    text-align: left;
  }

  /* ── State strip ──────────────────────────────────────────────────── */
  .state-strip {
    position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 0.58rem; letter-spacing: 0.18em;
    color: rgba(120, 140, 175, 0.28);
    pointer-events: none; white-space: nowrap;
  }
  .ss-num  { color: rgba(150, 170, 210, 0.42); }
  .ss-amber { color: rgba(230, 165, 50, 0.52); }
  .ss-date  { color: rgba(110, 130, 160, 0.28); }

  /* ── Hint ─────────────────────────────────────────────────────────── */
  .hint {
    position: fixed; bottom: 3.2rem; left: 50%; transform: translateX(-50%);
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 0.60rem; letter-spacing: 0.16em;
    color: rgba(140, 160, 200, 0.20);
    pointer-events: none; animation: hintFade 12s ease forwards;
  }

  /* ── Animations ───────────────────────────────────────────────────── */
  @keyframes idFade {
    0%  { opacity: 1; } 55% { opacity: 1; } 100% { opacity: 0; }
  }
  @keyframes hintFade {
    0%  { opacity: 0; } 15% { opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; }
  }
  @keyframes panelIn {
    from { opacity: 0; transform: translateX(-50%) translateY(8px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
  }
  @keyframes statusPulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.45; }
  }
  @keyframes breathe {
    0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; }
  }
</style>
