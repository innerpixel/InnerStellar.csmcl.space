<script>
  let { space } = $props()

  // Threshold: private space — ready to spore into the void.
  // Priment's territory. Simple list for now.
  // Future: crystallized projects, letters, memory pods ready to mint.
</script>

<aside class="threshold-panel">

  <div class="threshold-header">
    <span class="threshold-glyph">◇</span>
    <div class="threshold-title-block">
      <div class="threshold-title">threshold</div>
      <div class="threshold-sub">private space</div>
    </div>
  </div>

  <div class="threshold-body">
    <div class="threshold-empty">
      <div class="empty-glyph">◇</div>
      <div class="empty-text">ready to spore into the void</div>
    </div>
  </div>

</aside>

<style>
  .threshold-panel {
    height: 100%;
    background: #0f0e23;
    border-left: 1px solid rgba(200, 190, 255, 0.05);
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: #c8c4e8;
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  .threshold-header {
    display: flex; align-items: center; gap: 0.85rem;
    padding: 1.3rem 1.5rem 1.0rem;
    border-bottom: 1px solid rgba(200, 190, 255, 0.05);
    flex-shrink: 0;
  }

  .threshold-glyph {
    font-size: 1.3rem; line-height: 1; flex-shrink: 0;
    color: rgba(251, 191, 36, 0.30);
    font-family: Georgia, serif;
  }

  .threshold-title {
    font-size: 0.80rem; font-weight: 500; letter-spacing: 0.10em;
    text-transform: lowercase;
    color: rgba(210, 207, 240, 0.48);
  }
  .threshold-sub {
    font-size: 0.62rem; font-weight: 400; letter-spacing: 0.08em;
    color: rgba(148, 145, 180, 0.28);
    margin-top: 0.14rem;
  }

  .threshold-body {
    flex: 1; overflow-y: auto;
    padding: 1.2rem 1.5rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(200, 190, 255, 0.08) transparent;
  }

  .threshold-empty {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 14rem; gap: 0.65rem;
    padding-top: 1.5rem;
  }
  .empty-glyph {
    font-size: 2rem;
    color: rgba(251, 191, 36, 0.07);
    font-family: Georgia, serif;
  }
  .empty-text {
    font-size: 0.68rem; letter-spacing: 0.08em; font-style: italic;
    color: rgba(148, 145, 180, 0.22);
    text-align: center;
  }
</style>
