<script>
  import { onMount } from 'svelte'
  import { distributeEvent } from './lib/eventDistributor.js'
  import DropList from './layout/DropList.svelte'
  import WorkspacePanel from './components/WorkspacePanel.svelte'
  import ThresholdPanel from './layout/ThresholdPanel.svelte'

  let space     = $state({ drops: [], orbits: [], entities: [], familiars: [] })
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

    // ── Load personal space (drops + orbits) ────────────────────────────────
    try {
      const res = await fetch('/api/space')
      if (res.ok) {
        const data = await res.json()

        space = {
          drops:     data.drops     ?? [],
          orbits:    data.orbiting  ?? [],
          familiars: data.familiars ?? [],
          entities,
        }
        distributeEvent({ type: 'space.state.updated', payload: space })
      } else {
        space = { ...space, entities }
      }
    } catch (_) {
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

  <!-- Main: three columns -->
  <div class="main-area">

    <!-- Left — drop list -->
    <div class="list-area">
      {#if loading}
        <div class="loading-hint">· orienting</div>
      {:else}
        <DropList {space} />
      {/if}
    </div>

    <!-- Middle — workspace (selected drop) -->
    <div class="workspace-area">
      <WorkspacePanel
        {space}
        {querying}
        {queryResponse}
        onQueryDrop={queryDrop}
      />
    </div>

    <!-- Right — threshold / private space -->
    <div class="threshold-area">
      <ThresholdPanel {space} />
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

  /* ── Main area — three columns ────────────────────────────────────── */
  .main-area {
    display: grid;
    grid-template-columns: 260px 1fr 280px;
    flex: 1; overflow: hidden;
  }

  .list-area      { overflow: hidden; }
  .workspace-area { overflow: hidden; border-left: 1px solid rgba(200, 190, 255, 0.06); }
  .threshold-area { overflow: hidden; }

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
