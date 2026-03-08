<script>
  import DropCard from '../components/DropCard.svelte'

  let { space } = $props()

  // Build orbit lookup: dropId → orbit[]
  const orbitMap = $derived(() => {
    const map = {}
    for (const o of (space.orbits ?? [])) {
      if (!map[o.orbit]) map[o.orbit] = []
      map[o.orbit].push(o)
    }
    return map
  })

  // Sort drops: most recently touched first, then by energy desc
  const sortedDrops = $derived(
    [...(space.drops ?? [])].sort((a, b) => {
      const da = a.last_touched ?? a.date ?? ''
      const db = b.last_touched ?? b.date ?? ''
      if (db !== da) return db.localeCompare(da)
      return (b.energy ?? 0) - (a.energy ?? 0)
    })
  )

  const entities = $derived(space.entities ?? [])
</script>

<div class="drop-field">

  <!-- Drops section — Theurgist-compiled, user-facing -->
  {#if sortedDrops.length}
    <div class="field-section">
      <div class="section-header">
        <span class="section-label">drops</span>
        <span class="section-count">{sortedDrops.length}</span>
      </div>
      <div class="drop-grid">
        {#each sortedDrops as drop (drop.id)}
          <DropCard {drop} orbits={orbitMap()[drop.id] ?? []} />
        {/each}
      </div>
    </div>
  {/if}

  <!-- Firmament — the 9 entities, always present -->
  {#if entities.length}
    <div class="field-section firmament-section">
      <div class="section-header">
        <span class="section-label">firmament</span>
        <span class="section-count">{entities.length}</span>
      </div>
      <div class="drop-grid">
        {#each entities as entity (entity.id)}
          <DropCard drop={entity} orbits={[]} />
        {/each}
      </div>
    </div>
  {/if}

  {#if !sortedDrops.length && !entities.length}
    <div class="field-empty">
      <div class="empty-glyph">∴</div>
      <div class="empty-text">no drops yet · firmament loading</div>
    </div>
  {/if}

</div>

<style>
  .drop-field {
    padding: 1.6rem 1.8rem 4rem;
    overflow-y: auto; height: 100%;
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 190, 255, 0.10) transparent;
  }

  .field-section { margin-bottom: 2.2rem; }
  .firmament-section { margin-top: 0.5rem; }

  .section-header {
    display: flex; align-items: center; gap: 0.55rem;
    margin-bottom: 0.9rem;
  }
  .section-label {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.35);
  }
  .section-count {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 0.65rem; font-weight: 400;
    color: rgba(148, 145, 180, 0.25);
  }

  .drop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 0.70rem;
  }

  .field-empty {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 60vh; gap: 0.65rem;
  }
  .empty-glyph {
    font-size: 2.5rem;
    color: rgba(200, 190, 255, 0.08);
    font-family: Georgia, serif;
  }
  .empty-text {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 0.72rem; font-weight: 400; letter-spacing: 0.10em;
    color: rgba(148, 145, 180, 0.25);
  }
</style>
