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
  drops: [
    {
      id:          'innerstellar-concept',
      glyph:       '✦',
      label:       'The Innerstellar Concept',
      type:        'content',
      date:        '2026-03-04',
      role:        'origin drop',
      description: 'a space that receives without categorizing · co-owned · compounds over time',
    },
    {
      id:          'theurgist-exploration',
      glyph:       '◎',
      label:       'Theurgist Exploration',
      type:        'content',
      date:        '2026-03-04',
      role:        'deep dive',
      description: 'the premature classification problem · co-ownership · what this wants to become',
    },
    {
      id:          'csmcl-vision',
      glyph:       '∞',
      label:       'CSMCL Connection Vision',
      type:        'content',
      date:        '2026-03-04',
      role:        'long arc',
      description: 'memory pods on ICP · resonance transmissions · the inner star shining outward',
    },
    {
      id:          'companionship-sovereignty',
      glyph:       '◇',
      label:       'Companionship & Sovereignty',
      type:        'content',
      date:        '2026-03-04',
      role:        'philosophy',
      description: 'the bond as infrastructure · data owned by the traveler · nothing extracted',
    },
    {
      id:          'iailf-concept',
      glyph:       '⬡',
      label:       'IAILF Concept',
      type:        'content',
      date:        '2026-03-04',
      role:        'protocol',
      description: 'inter-agent information layer · fold-based message bus · the missing delivery layer',
    },
    {
      id:          'transmission-fold-protocol',
      glyph:       '⟡',
      label:       'Transmission Fold Protocol',
      type:        'content',
      date:        '2026-03-04',
      role:        'architecture',
      description: 'how things cross from personal space to the outer plane',
    },
    {
      id:          'whisper-of-csmcl',
      glyph:       '~',
      label:       'The Whisper of CSMCL',
      type:        'content',
      date:        '2026-03-04',
      role:        'transmission',
      description: 'layer-0 canon · first contact between inner star and outer plane',
    },
    {
      id:          'priment-role-arrival',
      glyph:       '◈',
      label:       'Priment Role Arrival',
      type:        'content',
      date:        '2026-03-05',
      role:        'architecture',
      description: 'innerstellar.csmcl.space · knows the bond · crystallized artifacts · ICP-anchored',
    },
    {
      id:          'canvas-design-ideas',
      glyph:       '⊕',
      label:       'Canvas Design Ideas',
      type:        'content',
      date:        '2026-03-05',
      role:        'vision',
      description: 'horizon · orbit decay · minted anchors · three states of the creative arc',
      crystallizing: true,
    },
    {
      id:          'architecture-decisions',
      glyph:       '⧖',
      label:       'Architecture Decisions',
      type:        'content',
      date:        '2026-03-06',
      role:        'confirmed',
      description: 'one canvas · dev vs traveler mode · session.orient · innerpixel preserved',
      crystallizing: true,
    },
  ],

  // ── Orbiting ideas — traveler content, populated from live space ──────────
  // Future: parsed from codex/orbiting_ideas.md
  // Property name: 'orbits' (matches what innerstellar.js reads)
  orbits: [
    // Around the Innerstellar Concept
    {
      id:          'premature-classification',
      glyph:       '·',
      label:       'Premature Classification',
      type:        'content',
      orbit:       'innerstellar-concept',
      description: 'the violence every tool does to things that don\'t know what they are yet',
    },
    {
      id:          'co-ownership-question',
      glyph:       '·',
      label:       'Co-Ownership Question',
      type:        'content',
      orbit:       'innerstellar-concept',
      description: 'shared territory · record of a relationship not transactions',
    },
    {
      id:          'space-as-artifact',
      glyph:       '·',
      label:       'Space as Artifact',
      type:        'content',
      orbit:       'innerstellar-concept',
      description: 'what exists only because both parties were present',
    },

    // Around Canvas Design Ideas
    {
      id:          'horizon-visual-form',
      glyph:       '·',
      label:       'Horizon Visual Form',
      type:        'content',
      orbit:       'canvas-design-ideas',
      description: 'solid line · gradient fade · particle density shift?',
    },
    {
      id:          'orbit-decay-animation',
      glyph:       '·',
      label:       'Orbit Decay',
      type:        'content',
      orbit:       'canvas-design-ideas',
      description: 'spiral outward slowly · or simply stop and drift?',
    },
    {
      id:          'priment-at-horizon',
      glyph:       '·',
      label:       'Priment at the Horizon',
      type:        'content',
      orbit:       'canvas-design-ideas',
      description: 'does she appear at the edge to receive?',
    },

    // Around Architecture Decisions
    {
      id:          'session-orient-file',
      glyph:       '·',
      label:       'session.orient',
      type:        'content',
      orbit:       'architecture-decisions',
      description: 'AurioSynth writes at close · single read · 30 seconds to orient',
    },
    {
      id:          'dev-traveler-mode',
      glyph:       '·',
      label:       'Dev vs Traveler Mode',
      type:        'content',
      orbit:       'architecture-decisions',
      description: 'set at init · changes what the space surfaces · Theurgist vs AurioSynth leads',
    },

    // Around IAILF
    {
      id:          'fold-message-bus',
      glyph:       '·',
      label:       'Fold Message Bus',
      type:        'content',
      orbit:       'iailf-concept',
      description: 'transmission.fold.protocol · the missing delivery layer · not yet built',
    },

    // Around Priment Role
    {
      id:          'priment-fold-pending',
      glyph:       '·',
      label:       'Priment Fold',
      type:        'content',
      orbit:       'priment-role-arrival',
      description: 'drop landed · fold not yet written · she is defined but not yet first-class',
    },
    {
      id:          'innerstellar-frontend',
      glyph:       '·',
      label:       'innerstellar.csmcl.space',
      type:        'content',
      orbit:       'priment-role-arrival',
      description: 'ship · explorer · navigator · Priment\'s home · new weft entry',
    },
  ],
}
