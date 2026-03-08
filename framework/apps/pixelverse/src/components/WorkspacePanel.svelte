<script>
  import { uiStore, dropKind } from '../lib/store.svelte.js'
  import { distributeEvent } from '../lib/eventDistributor.js'

  // space data passed in from App (needed for connected drops + orbits)
  let { space, querying = false, queryResponse = null, onQueryDrop } = $props()

  const drop = $derived(uiStore.activeDrop)
  const kind = $derived(dropKind(drop))

  const orbits = $derived(
    drop ? (space.orbits ?? []).filter(o => o.orbit === drop.id) : []
  )
  const connected = $derived(
    drop?.connects_to?.length
      ? (space.drops ?? []).filter(d => drop.connects_to.includes(d.id))
      : []
  )

  function close() {
    uiStore.activeDrop = null
    distributeEvent({ type: 'canvas.element.dismissed' })
  }

  function navigateTo(target) {
    uiStore.activeDrop = { kind: 'drop', ...target }
    onQueryDrop?.(uiStore.activeDrop)
  }
</script>

<aside class="panel {kind}" class:open={!!drop}>

  {#if drop}
    <!-- Header -->
    <div class="panel-header">
      <div class="panel-identity">
        <span class="panel-glyph">{drop.glyph ?? '∴'}</span>
        <div class="panel-title-block">
          <div class="panel-title">{drop.label}</div>
          {#if drop.drop_type}
            <div class="panel-kind">{drop.drop_type.replace('drop.', '')}</div>
          {:else if drop.type === 'firmament'}
            <div class="panel-kind">{drop.connection_state ?? 'firmament'}</div>
          {:else if drop.type === 'system'}
            <div class="panel-kind">{drop.role ?? 'system'}</div>
          {/if}
        </div>
      </div>
      <button class="panel-close" onclick={close} aria-label="close">×</button>
    </div>

    <!-- Body -->
    <div class="panel-body">

      <!-- Status + date -->
      {#if drop.status}
        <div class="panel-status">
          <span
            class="status-dot"
            class:alive={drop.status === 'alive' || drop.status === 'active'}
            class:crystallizing={drop.crystallizing}
          ></span>
          {drop.status}{drop.last_touched ? ' · ' + drop.last_touched : ''}
        </div>
      {/if}

      <!-- Description -->
      {#if drop.description}
        <div class="panel-description">{drop.description}</div>
      {/if}

      {#if drop.role}
        <div class="panel-role">{drop.role}</div>
      {/if}

      <!-- Orbiting ideas -->
      {#if orbits.length}
        <div class="panel-section">
          <div class="section-label">orbiting ideas</div>
          {#each orbits as orbit}
            <div class="orbit-item">
              <span class="orbit-bullet">·</span>
              <div>
                <div class="orbit-name">{orbit.label ?? orbit.id.replace(/-/g, ' ')}</div>
                {#if orbit.description}
                  <div class="orbit-desc">{orbit.description}</div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Connected drops -->
      {#if connected.length}
        <div class="panel-section">
          <div class="section-label">connects to</div>
          {#each connected as target}
            <button class="conn-button" onclick={() => navigateTo(target)}>
              <span class="conn-glyph">{target.glyph}</span>
              {target.label}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Patchlog -->
      {#if drop.patchlog?.length}
        <div class="panel-section">
          <div class="section-label">patchlog</div>
          {#each drop.patchlog.slice().reverse() as entry}
            {@const parts = entry.split(' | ')}
            <div class="log-entry">
              <span class="log-date">{parts[0] ?? ''}</span>
              {#if parts[1]}<span class="log-event">{parts[1]}</span>{/if}
              {#if parts[2]}<div class="log-note">{parts.slice(2).join(' | ')}</div>{/if}
            </div>
          {/each}
        </div>
      {/if}

      <!-- Voice / nexus response -->
      {#if querying}
        <div class="panel-querying">· listening to the space</div>
      {/if}
      {#if queryResponse?.guidance}
        <div class="panel-section">
          <div class="section-label">voice</div>
          <div class="panel-voice">{queryResponse.guidance}</div>
        </div>
      {/if}

    </div>

  {:else}
    <!-- Empty state — space overview -->
    <div class="panel-empty">
      <div class="empty-glyph">✦</div>
      <div class="empty-label">select a drop</div>
      <div class="empty-hint">click any card to explore its content, connections, and history</div>
    </div>
  {/if}

</aside>

<style>
  .panel {
    position: relative;
    height: 100%;
    background: #100f22;
    border-left: 1px solid rgba(200, 190, 255, 0.07);
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: #c8c4e8;
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  /* Accent borders */
  .panel.cyan   { border-left-color: rgba(56, 189, 248, 0.25); }
  .panel.violet { border-left-color: rgba(192, 132, 252, 0.25); }
  .panel.blue   { border-left-color: rgba(129, 140, 248, 0.25); }
  .panel.teal   { border-left-color: rgba(52, 211, 153, 0.25); }
  .panel.lime   { border-left-color: rgba(163, 230, 53, 0.25); }
  .panel.amber  { border-left-color: rgba(251, 191, 36, 0.30); }
  .panel.green  { border-left-color: rgba(74, 222, 128, 0.25); }

  /* Header */
  .panel-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.3rem 1.5rem 1.0rem;
    border-bottom: 1px solid rgba(200, 190, 255, 0.07);
    flex-shrink: 0;
  }
  .panel-identity { display: flex; align-items: center; gap: 0.9rem; min-width: 0; }

  .panel-glyph {
    font-size: 1.8rem; flex-shrink: 0; line-height: 1;
    color: rgba(200, 195, 240, 0.40);
  }
  .panel.cyan   .panel-glyph { color: #38bdf8; }
  .panel.violet .panel-glyph { color: #c084fc; }
  .panel.blue   .panel-glyph { color: #818cf8; }
  .panel.teal   .panel-glyph { color: #34d399; }
  .panel.lime   .panel-glyph { color: #a3e635; }
  .panel.amber  .panel-glyph { color: #fbbf24; }
  .panel.green  .panel-glyph { color: #4ade80; }

  .panel-title-block { min-width: 0; }
  .panel-title {
    font-size: 1.0rem; font-weight: 600; letter-spacing: 0.01em;
    color: #e2dff5;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .panel-kind {
    font-size: 0.65rem; font-weight: 400; letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.48); margin-top: 0.20rem;
  }
  .panel.amber  .panel-kind { color: rgba(251, 191, 36, 0.60); }
  .panel.violet .panel-kind { color: rgba(192, 132, 252, 0.55); }

  .panel-close {
    background: none; border: none;
    color: rgba(148, 145, 180, 0.35);
    font-size: 1.5rem; line-height: 1;
    cursor: pointer; padding: 0.2rem;
    transition: color 0.16s; flex-shrink: 0;
  }
  .panel-close:hover { color: #e2dff5; }

  /* Body */
  .panel-body {
    padding: 1.2rem 1.5rem;
    overflow-y: auto; flex: 1;
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 190, 255, 0.10) transparent;
  }

  .panel-status {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; font-weight: 400;
    color: rgba(148, 145, 180, 0.50); margin-bottom: 1rem;
  }
  .status-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
    background: rgba(148, 145, 180, 0.22);
  }
  .status-dot.alive {
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.50);
    animation: statusPulse 2.8s ease-in-out infinite;
  }
  .status-dot.crystallizing {
    background: #fbbf24;
    box-shadow: 0 0 7px rgba(251, 191, 36, 0.55);
    animation: statusPulse 1.6s ease-in-out infinite;
  }

  .panel-description {
    font-size: 0.84rem; font-weight: 400; line-height: 1.70;
    color: rgba(200, 196, 238, 0.72); margin-bottom: 1.1rem;
  }
  .panel-role {
    font-size: 0.72rem; font-weight: 400; font-style: italic;
    color: rgba(148, 145, 180, 0.45); margin-bottom: 0.9rem;
  }

  .panel-section {
    margin-top: 1.3rem;
    border-top: 1px solid rgba(200, 190, 255, 0.06);
    padding-top: 0.9rem;
  }
  .section-label {
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.38); margin-bottom: 0.75rem;
  }

  /* Orbit items */
  .orbit-item {
    display: flex; gap: 0.6rem; margin-bottom: 0.65rem;
  }
  .orbit-bullet { color: rgba(148, 145, 180, 0.35); flex-shrink: 0; font-size: 1rem; }
  .orbit-name {
    font-size: 0.80rem; font-weight: 500;
    color: rgba(200, 196, 238, 0.75);
  }
  .orbit-desc {
    font-size: 0.72rem; font-weight: 400; line-height: 1.55;
    color: rgba(148, 145, 180, 0.50); margin-top: 0.14rem;
  }

  /* Connected drops */
  .conn-button {
    display: flex; align-items: center; gap: 0.65rem;
    width: 100%; text-align: left;
    background: rgba(200, 190, 255, 0.04);
    border: 1px solid rgba(200, 190, 255, 0.09);
    border-radius: 6px;
    padding: 0.6rem 0.85rem; margin-bottom: 0.45rem;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 0.80rem; font-weight: 400;
    color: rgba(200, 196, 238, 0.68);
    cursor: pointer; transition: all 0.16s;
  }
  .conn-button:hover {
    background: rgba(200, 190, 255, 0.09);
    border-color: rgba(200, 190, 255, 0.16);
    color: #e2dff5;
  }
  .conn-glyph { opacity: 0.65; }

  /* Patchlog */
  .log-entry { margin-bottom: 0.90rem; }
  .log-date {
    font-size: 0.68rem; font-weight: 400;
    color: rgba(130, 128, 165, 0.45);
  }
  .log-event {
    font-size: 0.70rem; font-weight: 400; font-style: italic;
    color: rgba(148, 145, 180, 0.52); margin-left: 0.5rem;
  }
  .log-note {
    font-size: 0.76rem; font-weight: 400;
    color: rgba(190, 186, 230, 0.68); line-height: 1.55;
    margin-top: 0.14rem;
  }

  /* Voice */
  .panel-querying {
    font-size: 0.72rem;
    color: rgba(148, 145, 180, 0.42); font-style: italic;
    margin-top: 1.1rem;
    animation: breathe 1.8s ease-in-out infinite;
  }
  .panel-voice {
    font-size: 0.82rem; font-weight: 400; line-height: 1.72;
    color: rgba(200, 196, 238, 0.70); font-style: italic;
  }

  /* Empty state */
  .panel-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 2rem; gap: 0.8rem;
  }
  .empty-glyph {
    font-size: 2.2rem;
    color: rgba(200, 190, 255, 0.10);
    font-family: Georgia, serif;
  }
  .empty-label {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(148, 145, 180, 0.28);
  }
  .empty-hint {
    font-size: 0.76rem; font-weight: 400; line-height: 1.65; text-align: center;
    color: rgba(130, 128, 165, 0.28);
    max-width: 18rem;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.38; }
  }
  @keyframes breathe {
    0%, 100% { opacity: 0.4; } 50% { opacity: 0.9; }
  }
</style>
