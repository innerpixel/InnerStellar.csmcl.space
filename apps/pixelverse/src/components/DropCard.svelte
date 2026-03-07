<script>
  import { uiStore, dropKind } from '../lib/store.svelte.js'

  let { drop, orbits = [] } = $props()

  const isActive  = $derived(uiStore.activeDrop?.id === drop.id)
  const kind      = $derived(dropKind(drop))
  const energy    = $derived(drop.energy ?? 0.7)
  const patchHint = $derived(
    drop.patchlog_last
      ? drop.patchlog_last.split(' | ').slice(0, 2).join(' · ')
      : ''
  )

  function toggle() {
    uiStore.activeDrop = isActive ? null : drop
  }
</script>

<button class="drop-card {kind}" class:active={isActive} onclick={toggle}>

  <div class="card-head">
    <span class="card-glyph">{drop.glyph ?? '∴'}</span>
    <div class="card-meta">
      <div class="card-title">{drop.label}</div>
      {#if drop.drop_type}
        <div class="card-type">{drop.drop_type.replace('drop.', '')}</div>
      {:else if drop.type === 'system'}
        <div class="card-type">{drop.role ?? 'system'}</div>
      {/if}
    </div>
    <div class="card-right">
      <span
        class="status-dot"
        class:alive={drop.status === 'alive' || drop.status === 'active'}
        class:crystallizing={drop.crystallizing}
      ></span>
    </div>
  </div>

  {#if drop.description}
    <div class="card-desc">{drop.description}</div>
  {/if}

  <div class="card-footer">
    <div class="energy-track">
      <div class="energy-fill" style="width: {Math.round(energy * 100)}%"></div>
    </div>
    {#if patchHint}
      <div class="card-patch">{patchHint}</div>
    {/if}
  </div>

  {#if orbits.length}
    <div class="card-orbits">
      {#each orbits.slice(0, 4) as orbit}
        <span class="orbit-chip">{orbit.label ?? orbit.id.replace(/-/g, ' ')}</span>
      {/each}
      {#if orbits.length > 4}
        <span class="orbit-chip muted">+{orbits.length - 4}</span>
      {/if}
    </div>
  {/if}

</button>

<style>
  .drop-card {
    display: block; width: 100%; text-align: left;
    background: rgba(22, 20, 44, 0.70);
    border: 1px solid rgba(200, 190, 255, 0.08);
    border-left: 3px solid rgba(200, 190, 255, 0.12);
    border-radius: 6px;
    padding: 1.2rem 1.3rem 1.0rem;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: #c8c4e8;
    cursor: pointer;
    transition: background 0.16s, border-color 0.16s, box-shadow 0.16s;
  }
  .drop-card:hover {
    background: rgba(30, 28, 58, 0.85);
    box-shadow: 0 2px 16px rgba(0,0,0,0.30);
  }

  /* Left border accent by kind */
  .drop-card.cyan   { border-left-color: #38bdf8; }
  .drop-card.violet { border-left-color: #c084fc; }
  .drop-card.blue   { border-left-color: #818cf8; }
  .drop-card.teal   { border-left-color: #34d399; }
  .drop-card.lime   { border-left-color: #a3e635; }
  .drop-card.amber  { border-left-color: #fbbf24; }
  .drop-card.green  { border-left-color: #4ade80; }

  .drop-card.active {
    background: rgba(36, 33, 68, 0.92);
    box-shadow: 0 2px 20px rgba(0,0,0,0.36);
  }
  .drop-card.active.cyan   { background: rgba(56, 189, 248, 0.06); }
  .drop-card.active.violet { background: rgba(192, 132, 252, 0.06); }
  .drop-card.active.blue   { background: rgba(129, 140, 248, 0.06); }
  .drop-card.active.teal   { background: rgba(52, 211, 153, 0.06); }
  .drop-card.active.lime   { background: rgba(163, 230, 53, 0.06); }
  .drop-card.active.amber  { background: rgba(251, 191, 36, 0.07); }
  .drop-card.active.green  { background: rgba(74, 222, 128, 0.06); }

  /* Head row */
  .card-head {
    display: flex; align-items: flex-start; gap: 0.75rem;
    margin-bottom: 0.55rem;
  }
  .card-glyph {
    font-size: 1.4rem; line-height: 1.1; flex-shrink: 0;
    color: rgba(200, 195, 240, 0.40);
    transition: color 0.16s;
  }
  .drop-card:hover  .card-glyph { color: rgba(220, 215, 255, 0.70); }
  .drop-card.active .card-glyph { color: rgba(220, 215, 255, 0.80); }

  .drop-card.cyan   .card-glyph { color: rgba(56, 189, 248, 0.70); }
  .drop-card.violet .card-glyph { color: rgba(192, 132, 252, 0.70); }
  .drop-card.blue   .card-glyph { color: rgba(129, 140, 248, 0.70); }
  .drop-card.teal   .card-glyph { color: rgba(52, 211, 153, 0.70); }
  .drop-card.lime   .card-glyph { color: rgba(163, 230, 53, 0.70); }
  .drop-card.amber  .card-glyph { color: rgba(251, 191, 36, 0.80); }
  .drop-card.green  .card-glyph { color: rgba(74, 222, 128, 0.70); }

  .card-meta { flex: 1; min-width: 0; }
  .card-title {
    font-size: 0.93rem; font-weight: 500; letter-spacing: 0.01em;
    color: #e2dff5;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    line-height: 1.3;
  }
  .card-type {
    font-size: 0.65rem; font-weight: 400; letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.50); margin-top: 0.20rem;
  }

  .card-right { flex-shrink: 0; padding-top: 0.25rem; }
  .status-dot {
    display: block; width: 7px; height: 7px; border-radius: 50%;
    background: rgba(148, 145, 180, 0.22);
  }
  .status-dot.alive {
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.50);
    animation: statusPulse 3s ease-in-out infinite;
  }
  .status-dot.crystallizing {
    background: #fbbf24;
    box-shadow: 0 0 7px rgba(251, 191, 36, 0.55);
    animation: statusPulse 1.6s ease-in-out infinite;
  }

  /* Description */
  .card-desc {
    font-size: 0.80rem; font-weight: 400; line-height: 1.60;
    color: rgba(180, 175, 220, 0.62);
    margin-bottom: 0.85rem;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Footer */
  .card-footer { display: flex; flex-direction: column; gap: 0.38rem; }

  .energy-track {
    height: 2px; background: rgba(200, 190, 255, 0.08);
    border-radius: 1px; overflow: hidden;
  }
  .energy-fill {
    height: 100%; border-radius: 1px;
    background: rgba(200, 190, 255, 0.22);
    transition: width 0.4s ease;
  }
  .drop-card.amber  .energy-fill { background: rgba(251, 191, 36, 0.50); }
  .drop-card.teal   .energy-fill { background: rgba(52, 211, 153, 0.45); }
  .drop-card.violet .energy-fill { background: rgba(192, 132, 252, 0.45); }
  .drop-card.green  .energy-fill { background: rgba(74, 222, 128, 0.45); }
  .drop-card.cyan   .energy-fill { background: rgba(56, 189, 248, 0.45); }
  .drop-card.blue   .energy-fill { background: rgba(129, 140, 248, 0.45); }
  .drop-card.lime   .energy-fill { background: rgba(163, 230, 53, 0.45); }

  .card-patch {
    font-size: 0.68rem; font-weight: 400;
    color: rgba(130, 125, 165, 0.42);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* Orbiting chips */
  .card-orbits {
    display: flex; flex-wrap: wrap; gap: 0.32rem;
    margin-top: 0.8rem;
  }
  .orbit-chip {
    font-size: 0.65rem; font-weight: 400;
    color: rgba(148, 145, 180, 0.55);
    background: rgba(200, 190, 255, 0.05);
    border: 1px solid rgba(200, 190, 255, 0.10);
    border-radius: 12px; padding: 0.18rem 0.55rem;
    transition: color 0.16s, border-color 0.16s, background 0.16s;
  }
  .drop-card:hover .orbit-chip {
    color: rgba(190, 185, 230, 0.80);
    border-color: rgba(200, 190, 255, 0.18);
    background: rgba(200, 190, 255, 0.08);
  }
  .orbit-chip.muted {
    color: rgba(110, 108, 145, 0.40);
    border-color: rgba(160, 155, 200, 0.07);
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.38; }
  }
</style>
