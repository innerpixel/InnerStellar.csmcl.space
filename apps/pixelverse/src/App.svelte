<script>
  import { onMount } from 'svelte'
  import { distributeEvent } from './lib/eventDistributor.js'
  import { space as seedSpace } from './data/space.js'
  import DropField from './layout/DropField.svelte'
  import WorkspacePanel from './components/WorkspacePanel.svelte'

  let space     = $state({ drops: seedSpace.drops, orbits: seedSpace.orbits, folds: seedSpace.folds ?? [], entities: [] })
  let loading   = $state(true)

  // ── Nexus query (wired when CORS is configured) ────────────────────────────
  const QUERY_ENDPOINT = null   // set to '/api/oracle/consult' once CORS is live
  let querying      = $state(false)
  let queryResponse = $state(null)

  async function queryDrop(drop) {
    if (!QUERY_ENDPOINT || !drop) return
    querying = true
    queryResponse = null
    try {
      const res = await fetch(QUERY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traveler_id: 'innerstellar-traveler',
          question: `Tell me about: ${drop.label}`,
          context: [drop.description, drop.role].filter(Boolean).join(' · '),
        }),
      })
      if (res.ok) queryResponse = await res.json()
    } catch (_) {
      queryResponse = null
    }
    querying = false
  }

  onMount(async () => {
    // ── Load firmament entities ──────────────────────────────────────────────
    let entities = []
    try {
      const res = await fetch('/api/firmament')
      if (res.ok) {
        const data = await res.json()
        entities = data.entities ?? []
      }
    } catch (_) { /* firmament not available */ }

    // ── Load personal space (drops, folds, orbits) ──────────────────────────
    try {
      const res = await fetch('/api/space')
      if (res.ok) {
        const data = await res.json()

        // Merge drops: API + seed-only (seed may have drops not yet in files)
        const seedDropMap  = Object.fromEntries(seedSpace.drops.map(d => [d.id, d]))
        const apiDropIds   = new Set((data.drops ?? []).map(d => d.id))
        const mergedDrops  = [
          ...(data.drops ?? []).map(d => {
            const seed = seedDropMap[d.id] ?? {}
            return {
              ...d,
              description: d.description || seed.description || '',
              role:        d.role        || seed.role        || '',
              glyph:       d.glyph !== '∴' ? d.glyph : (seed.glyph ?? d.glyph),
            }
          }),
          // seed-only drops (not yet written as files)
          ...seedSpace.drops.filter(d => !apiDropIds.has(d.id)),
        ]

        // Merge orbits: API entries enriched by seed, plus seed-only
        const apiOrbitIds  = new Set((data.orbiting ?? []).map(o => o.id))
        const seedOrbitMap = Object.fromEntries(seedSpace.orbits.map(o => [o.id, o]))
        const mergedOrbits = [
          ...(data.orbiting ?? []).map(o => ({ ...seedOrbitMap[o.id], ...o })),
          ...seedSpace.orbits.filter(o => !apiOrbitIds.has(o.id)),
        ]

        space = {
          drops:    mergedDrops,
          orbits:   mergedOrbits,
          folds:    data.folds ?? [],
          entities,
        }
        distributeEvent({ type: 'space.state.updated', payload: space })
      } else {
        space = { ...space, entities }
      }
    } catch (_) {
      // no api — use seed data + whatever firmament loaded
      space = { ...space, entities }
    }

    loading = false
  })

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalDrops    = $derived((space.drops ?? []).length)
  const crystallizing = $derived((space.drops ?? []).filter(d => d.crystallizing).length)
  const lastDate      = $derived(
    (space.drops ?? []).map(d => d.last_touched ?? d.date).filter(Boolean).sort().pop() ?? '—'
  )
</script>

<div class="app-shell">

  <!-- Top bar -->
  <header class="top-bar">
    <div class="identity">
      <span class="id-glyph">✦</span>
      <span class="id-name">innerstellar</span>
    </div>
    <div class="top-stats">
      <span class="stat-num">{totalDrops}</span> drops
      {#if crystallizing > 0}
        · <span class="stat-amber">{crystallizing} crystallizing</span>
      {/if}
      · <span class="stat-date">{lastDate}</span>
    </div>
  </header>

  <!-- Main: field + panel -->
  <div class="main-area">
    <div class="field-area">
      {#if loading}
        <div class="loading-hint">· orienting</div>
      {:else}
        <DropField {space} />
      {/if}
    </div>

    <div class="panel-area">
      <WorkspacePanel
        {space}
        {querying}
        {queryResponse}
        onQueryDrop={queryDrop}
      />
    </div>
  </div>

</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0; padding: 0;
  }
  :global(body) {
    background: #0d0c1a;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    min-height: 100vh;
    overflow: hidden;
  }

  .app-shell {
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
    background: #0d0c1a;
  }

  /* ── Top bar ──────────────────────────────────────────────────────── */
  .top-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1.8rem;
    border-bottom: 1px solid rgba(200, 190, 255, 0.07);
    flex-shrink: 0;
  }
  .identity {
    display: flex; align-items: center; gap: 0.6rem;
  }
  .id-glyph {
    font-family: Georgia, serif;
    font-size: 1.1rem;
    color: rgba(251, 191, 36, 0.65);
  }
  .id-name {
    font-size: 0.78rem; font-weight: 500; letter-spacing: 0.18em;
    color: rgba(210, 205, 245, 0.45);
    text-transform: lowercase;
  }
  .top-stats {
    font-size: 0.72rem; font-weight: 400;
    color: rgba(148, 145, 180, 0.45);
  }
  .stat-num   { color: rgba(180, 175, 230, 0.65); font-weight: 500; }
  .stat-amber { color: rgba(251, 191, 36, 0.65); }
  .stat-date  { color: rgba(130, 128, 165, 0.38); }

  /* ── Main area ────────────────────────────────────────────────────── */
  .main-area {
    display: grid;
    grid-template-columns: 1fr 380px;
    flex: 1; overflow: hidden;
  }

  .field-area {
    overflow: hidden;
    border-right: 1px solid rgba(200, 190, 255, 0.06);
  }

  .panel-area { overflow: hidden; }

  /* Loading */
  .loading-hint {
    display: flex; align-items: center; justify-content: center;
    height: 100%;
    font-size: 0.75rem; letter-spacing: 0.14em;
    color: rgba(148, 145, 180, 0.30);
    animation: breathe 1.8s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { opacity: 0.4; } 50% { opacity: 1; }
  }
</style>
