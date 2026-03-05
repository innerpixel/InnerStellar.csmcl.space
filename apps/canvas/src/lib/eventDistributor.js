/**
 * Innerstellar Event Distribution System
 *
 * Adapted from CSMCL-SPACE-ECOSYSTEM-MVP eventDistributor.
 * Central hub for routing canvas ↔ space events.
 *
 * Inward  (space → canvas):  fold updates, new drops, state changes
 * Outward (canvas → space):  hover, focus, selection, crystallization signals
 *
 * Event namespaces:
 *   canvas.element.hover     — cursor entered an entity
 *   canvas.element.focused   — entity clicked / opened
 *   canvas.element.dismissed — focus panel closed
 *   space.drop.arrived       — new drop in data (future: live fold reader)
 *   space.state.updated      — any space topology change
 */

// ─── Subscriber registry ──────────────────────────────────────────────────
const subscribers = []

/**
 * Subscribe to events matching patterns.
 * @param {string|string[]} patterns — e.g. ['canvas.*', 'space.drop.arrived']
 * @param {Function} handler
 * @returns {Function} unsubscribe
 */
export function subscribe(patterns, handler) {
  const sub = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    patterns: Array.isArray(patterns) ? patterns : [patterns],
    handler,
  }
  subscribers.push(sub)
  return () => {
    const i = subscribers.indexOf(sub)
    if (i > -1) subscribers.splice(i, 1)
  }
}

/**
 * Distribute an event to all matching subscribers.
 * @param {Object} event — must have `type` string
 * @returns {Object} the enriched event
 */
export function distributeEvent(event) {
  const full = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    category: event.type?.split('.')[0],
    priority: 'notify',
    ...event,
  }

  subscribers.forEach(sub => {
    if (matchesAnyPattern(full.type, sub.patterns)) {
      try { sub.handler(full) } catch (e) { console.error('[eventDistributor]', sub.id, e) }
    }
  })

  return full
}

export function getSubscribers() {
  return subscribers.map(({ id, patterns }) => ({ id, patterns }))
}

// ─── Pattern matching ─────────────────────────────────────────────────────
function matchesAnyPattern(type, patterns) {
  return patterns.some(p => {
    if (p === '*') return true
    if (p === type) return true
    if (p.endsWith('.*')) return type.startsWith(p.slice(0, -2) + '.')
    return false
  })
}

// ─── Global registration (console debug: window.ed.distributeEvent(...)) ──
if (typeof window !== 'undefined') {
  window.ed = { subscribe, distributeEvent, getSubscribers }
}
