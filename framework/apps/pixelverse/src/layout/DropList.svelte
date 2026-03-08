<script>
  import { uiStore, dropKind } from '../lib/store.svelte.js'

  let { space } = $props()

  const sortedDrops = $derived(
    [...(space.drops ?? [])].sort((a, b) => {
      const da = a.last_touched ?? a.date ?? ''
      const db = b.last_touched ?? b.date ?? ''
      if (db !== da) return db.localeCompare(da)
      return (b.energy ?? 0) - (a.energy ?? 0)
    })
  )
  const familiars = $derived(space.familiars ?? [])
  const entities  = $derived(space.entities ?? [])

  function select(item) {
    uiStore.activeDrop = uiStore.activeDrop?.id === item.id ? null : item
  }
</script>

<div class="drop-list">

  {#if sortedDrops.length}
    <div class="list-section">
      <div class="section-label">
        drops <span class="section-count">{sortedDrops.length}</span>
      </div>
      {#each sortedDrops as drop (drop.id)}
        {@const kind = dropKind(drop)}
        {@const isActive = uiStore.activeDrop?.id === drop.id}
        <button class="list-item {kind}" class:active={isActive} onclick={() => select(drop)}>
          <span class="item-glyph">{drop.glyph ?? '∴'}</span>
          <div class="item-body">
            <div class="item-label">{drop.label}</div>
            {#if drop.description}
              <div class="item-desc">{drop.description}</div>
            {/if}
          </div>
          <span
            class="item-dot"
            class:alive={drop.status === 'alive' || drop.status === 'active'}
            class:crystallizing={drop.crystallizing}
          ></span>
        </button>
      {/each}
    </div>
  {/if}

  {#if familiars.length}
    <div class="list-section">
      <div class="section-label">
        familiars <span class="section-count">{familiars.length}</span>
      </div>
      {#each familiars as fam (fam.id)}
        {@const isActive = uiStore.activeDrop?.id === fam.id}
        <button class="list-item familiar" class:active={isActive} onclick={() => select(fam)}>
          <span class="item-glyph">{fam.glyph ?? '◉'}</span>
          <div class="item-body">
            <div class="item-label">{fam.label}</div>
            {#if fam.description}
              <div class="item-desc">{fam.description}</div>
            {/if}
          </div>
          <span class="item-dot" class:alive={fam.status === 'alive'}></span>
        </button>
      {/each}
    </div>
  {/if}

  {#if entities.length}
    <div class="list-section">
      <div class="section-label">
        firmament <span class="section-count">{entities.length}</span>
      </div>
      {#each entities as entity (entity.id)}
        {@const isActive = uiStore.activeDrop?.id === entity.id}
        <button class="list-item entity" class:active={isActive} onclick={() => select(entity)}>
          <span class="item-glyph">{entity.glyph ?? '✶'}</span>
          <div class="item-body">
            <div class="item-label">{entity.label}</div>
          </div>
          <span
            class="item-dot"
            class:alive={entity.connection_state === 'functional' || entity.connection_state === 'cross-plane'}
          ></span>
        </button>
      {/each}
    </div>
  {/if}

  {#if !sortedDrops.length && !familiars.length && !entities.length}
    <div class="list-empty">
      <span class="empty-glyph">∴</span>
      <span class="empty-text">no drops yet</span>
    </div>
  {/if}

</div>

<style>
  .drop-list {
    height: 100%;
    overflow-y: auto;
    padding: 1.2rem 0 3rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 190, 255, 0.10) transparent;
    background: #0e0d1f;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  }

  .list-section { margin-bottom: 1.6rem; }

  .section-label {
    font-size: 0.62rem; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.28);
    padding: 0 1.2rem 0.5rem;
    display: flex; gap: 0.45rem; align-items: center;
  }
  .section-count {
    font-size: 0.60rem; font-weight: 400;
    color: rgba(148, 145, 180, 0.18);
  }

  .list-item {
    display: flex; align-items: flex-start; gap: 0.60rem;
    width: 100%; text-align: left;
    background: none; border: none;
    border-left: 2px solid transparent;
    padding: 0.50rem 1.0rem 0.50rem 1.1rem;
    cursor: pointer;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: #c8c4e8;
    transition: background 0.12s, border-color 0.12s;
  }
  .list-item:hover  { background: rgba(200, 190, 255, 0.04); }
  .list-item.active { background: rgba(200, 190, 255, 0.07); }

  /* Left-border accents */
  .list-item.cyan.active,   .list-item.cyan:hover   { border-left-color: rgba(56, 189, 248, 0.55); }
  .list-item.violet.active, .list-item.violet:hover { border-left-color: rgba(192, 132, 252, 0.55); }
  .list-item.blue.active,   .list-item.blue:hover   { border-left-color: rgba(129, 140, 248, 0.55); }
  .list-item.teal.active,   .list-item.teal:hover   { border-left-color: rgba(52, 211, 153, 0.55); }
  .list-item.lime.active,   .list-item.lime:hover   { border-left-color: rgba(163, 230, 53, 0.55); }
  .list-item.amber.active,  .list-item.amber:hover  { border-left-color: rgba(251, 191, 36, 0.60); }
  .list-item.green.active,  .list-item.green:hover  { border-left-color: rgba(74, 222, 128, 0.55); }
  .list-item.familiar.active, .list-item.familiar:hover { border-left-color: rgba(200, 190, 255, 0.42); }
  .list-item.entity.active,   .list-item.entity:hover   { border-left-color: rgba(74, 222, 128, 0.38); }

  .item-glyph {
    font-size: 0.95rem; line-height: 1.45; flex-shrink: 0; width: 1.3rem; text-align: center;
    color: rgba(200, 195, 240, 0.35);
    transition: color 0.12s;
  }
  .list-item:hover .item-glyph,
  .list-item.active .item-glyph { color: rgba(220, 215, 255, 0.62); }

  .item-body { flex: 1; min-width: 0; }
  .item-label {
    font-size: 0.82rem; font-weight: 500; letter-spacing: 0.01em;
    color: rgba(210, 207, 240, 0.68);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    line-height: 1.4;
    transition: color 0.12s;
  }
  .list-item:hover .item-label,
  .list-item.active .item-label { color: #e2dff5; }

  .item-desc {
    font-size: 0.70rem; font-weight: 400; line-height: 1.4;
    color: rgba(148, 145, 180, 0.38);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-top: 0.08rem;
  }

  .item-dot {
    display: block; width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
    background: rgba(148, 145, 180, 0.16);
    margin-top: 0.52rem;
  }
  .item-dot.alive {
    background: #4ade80;
    box-shadow: 0 0 5px rgba(74, 222, 128, 0.40);
    animation: dotPulse 3s ease-in-out infinite;
  }
  .item-dot.crystallizing {
    background: #fbbf24;
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.48);
    animation: dotPulse 1.6s ease-in-out infinite;
  }

  .list-empty {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 1rem; gap: 0.5rem;
  }
  .empty-glyph {
    font-size: 2rem; color: rgba(200, 190, 255, 0.08); font-family: Georgia, serif;
  }
  .empty-text {
    font-size: 0.68rem; letter-spacing: 0.10em;
    color: rgba(148, 145, 180, 0.20);
  }

  @keyframes dotPulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.30; }
  }
</style>
