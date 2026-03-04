<script>
  import { onMount, onDestroy } from 'svelte'
  import { initInnerstellar } from './canvas/innerstellar.js'
  import { space } from './data/space.js'

  let canvasEl      = $state(null)
  let hoveredEl     = $state(null)
  let focusedEl     = $state(null)
  let engine

  onMount(() => {
    engine = initInnerstellar(canvasEl, space, {
      onElementHover(el) { hoveredEl = el },
      onElementFocus(el) { focusedEl = el },
    })
  })

  onDestroy(() => engine?.destroy())
</script>

<canvas bind:this={canvasEl} style="display:block;position:fixed;top:0;left:0;cursor:none;"></canvas>

<!-- Space identity — fades after load -->
<div class="identity">
  <span class="id-glyph">✦</span>
  <span class="id-name">innerstellar</span>
</div>

<!-- Focus panel — element detail, appears on click -->
{#if focusedEl}
  <div class="focus-panel" role="dialog" aria-modal="true">
    <div class="fp-header">
      <span class="fp-kind">{focusedEl.kind}</span>
      <button class="fp-close" onclick={() => focusedEl = null} aria-label="close">×</button>
    </div>
    <div class="fp-glyph">{focusedEl.glyph}</div>
    <div class="fp-title">{focusedEl.label}</div>
    {#if focusedEl.role}
      <div class="fp-sub">{focusedEl.role}</div>
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
  </div>
{/if}

<!-- Hint — fades quickly, only if nothing focused -->
{#if !focusedEl}
  <div class="hint">hover to surface · click to open</div>
{/if}

<style>
  /* ── Identity ─────────────────────────────────────────────────────── */
  .identity {
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.9rem;
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    color: rgba(200, 210, 255, 0.14);
    font-size: 0.72rem;
    letter-spacing: 0.24em;
    pointer-events: none;
    animation: idFade 22s ease forwards;
  }
  .id-glyph { color: rgba(255, 220, 100, 0.28); }

  /* ── Focus panel ──────────────────────────────────────────────────── */
  .focus-panel {
    position: fixed;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(4, 3, 22, 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 120, 255, 0.12);
    border-radius: 3px;
    padding: 1.8rem 2.6rem;
    text-align: center;
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    color: rgba(200, 215, 255, 0.80);
    min-width: 220px;
    max-width: 360px;
    animation: panelIn 0.35s ease;
  }

  .fp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
  }
  .fp-kind {
    font-size: 0.58rem;
    letter-spacing: 0.24em;
    color: rgba(130, 150, 200, 0.38);
    text-transform: uppercase;
  }
  .fp-close {
    background: none;
    border: none;
    color: rgba(130, 150, 200, 0.35);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.25s ease;
  }
  .fp-close:hover { color: rgba(200, 215, 255, 0.70); }

  .fp-glyph {
    font-size: 2.4rem;
    margin-bottom: 0.8rem;
    color: rgba(255, 232, 150, 0.82);
    text-shadow: 0 0 35px rgba(255, 200, 60, 0.40);
  }
  .fp-title {
    font-size: 1.0rem;
    letter-spacing: 0.10em;
    margin-bottom: 0.4rem;
  }
  .fp-sub {
    font-size: 0.75rem;
    color: rgba(140, 160, 200, 0.48);
    letter-spacing: 0.08em;
    font-style: italic;
  }
  .fp-meta {
    margin-top: 0.6rem;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    color: rgba(120, 140, 170, 0.35);
  }
  .fp-status {
    margin-top: 0.8rem;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    color: rgba(120, 145, 175, 0.40);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: lowercase;
  }
  .status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(100, 120, 180, 0.32);
    flex-shrink: 0;
  }
  .status-dot.alive {
    background: rgba(80, 200, 150, 0.72);
    box-shadow: 0 0 7px rgba(60, 180, 130, 0.50);
    animation: statusPulse 2.8s ease-in-out infinite;
  }

  /* ── Hint ─────────────────────────────────────────────────────────── */
  .hint {
    position: fixed;
    bottom: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    color: rgba(140, 160, 200, 0.22);
    pointer-events: none;
    animation: hintFade 12s ease forwards;
  }

  /* ── Animations ───────────────────────────────────────────────────── */
  @keyframes idFade {
    0%  { opacity: 1; }
    55% { opacity: 1; }
    100%{ opacity: 0; }
  }
  @keyframes hintFade {
    0%  { opacity: 0; }
    15% { opacity: 1; }
    75% { opacity: 1; }
    100%{ opacity: 0; }
  }
  @keyframes panelIn {
    from { opacity: 0; transform: translateX(-50%) translateY(8px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
  }
  @keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
</style>
