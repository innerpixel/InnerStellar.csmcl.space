// Innerstellar UI store — reactive state shared across components
// Svelte 5 rune-based: import and read/write directly in any component

let _activeDrop = $state(null)

export const uiStore = {
  get activeDrop() { return _activeDrop },
  set activeDrop(v) { _activeDrop = v },
}

// ── Drop kind → accent class ───────────────────────────────────────────────
export function dropKind(drop) {
  if (!drop) return 'cyan'
  if (drop.crystallizing)                     return 'amber'
  if (drop.type === 'firmament') {
    if (drop.connection_state === 'latent')   return 'amber'
    if (drop.connection_state === 'cross-plane') return 'white'
    return 'green'
  }
  if (drop.drop_type === 'drop.arrival')      return 'amber'
  if (drop.drop_type === 'drop.philosophy')   return 'violet'
  if (drop.drop_type === 'drop.idea')         return 'violet'
  if (drop.drop_type === 'drop.vision')       return 'blue'
  if (drop.drop_type === 'drop.architecture') return 'teal'
  if (drop.drop_type === 'drop.decision')     return 'lime'
  if (drop.type === 'system')                 return 'green'
  return 'cyan'
}
