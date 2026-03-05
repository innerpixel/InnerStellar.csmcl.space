// Innerstellar canvas — space data
//
// Framework entities are defined here (always present).
// Traveler content (drops, orbiting ideas, activity folds) will be
// read dynamically from the live space files — not hardcoded here.
//
// type: 'system'  → green  (folds, architecture, keepers)
// type: 'content' → cyan   (drops, orbiting ideas, user artifacts)
// crystallizing: true → amber (approaching the threshold)

export const space = {

  // ── Framework folds — always present, hold the space itself ───────────────
  folds: [
    {
      id:          'auriosynth',
      glyph:       '◈',
      label:       'AurioSynth',
      type:        'system',
      role:        'architecture keeper',
      description: 'reads the full space · synthesizes state · detects gaps',
      status:      'alive',
      energy:      1.0,
    },
    {
      id:          'theurgist',
      glyph:       '⧖',
      label:       'Theurgist',
      type:        'system',
      role:        'traveler arc',
      description: 'coordination · orientation · continuation between sessions',
      status:      'alive',
      energy:      1.0,
    },
  ],

  // ── Drops — traveler content, populated from live space ───────────────────
  // Future: parsed from space/drops/*.md
  drops: [],

  // ── Orbiting ideas — traveler content, populated from live space ──────────
  // Future: parsed from codex/orbiting_ideas.md
  orbiting: [],
}
