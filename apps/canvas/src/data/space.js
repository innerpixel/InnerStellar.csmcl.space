// Live space data — drawn from the actual folds.
// Later this can be fetched/parsed dynamically from innerstellar-space.

export const space = {

  // ── Folds — living documents, inner orbit ─────────────────────────────────
  folds: [
    {
      id:     'auriosynth',
      glyph:  '◈',
      label:  'AurioSynth',
      role:   'system state',
      status: 'alive',
      energy: 1.0,
    },
    {
      id:     'theurgist',
      glyph:  '⧖',
      label:  'Theurgist',
      role:   'user arc',
      status: 'active',
      energy: 1.0,
    },
    {
      id:     'innerstellar',
      glyph:  '✦',
      label:  'Innerstellar',
      role:   'the project',
      status: 'alive',
      energy: 0.9,
    },
    {
      id:     'whisper',
      glyph:  '✶',
      label:  'Whisper Transmission',
      role:   'image phase complete',
      status: 'alive',
      energy: 0.85,
    },
  ],

  // ── Drops — landed things, orbital anchors ────────────────────────────────
  // Each drop orbits the outer ring and anchors its related ideas.
  drops: [
    { id: 'innerstellar-concept',  glyph: '∴', label: 'Innerstellar Concept',     date: '2026-03-04' },
    { id: 'theurgist-exploration', glyph: '⊹', label: 'Theurgist Exploration',     date: '2026-03-04' },
    { id: 'thewhisper',            glyph: '☽', label: 'The Whisper of CSMCL',      date: '2026-03-04' },
    { id: 'companionship',         glyph: '∞', label: 'Companionship Sovereignty', date: '2026-03-04' },
    { id: 'csmcl-vision',          glyph: '⊕', label: 'CSMCL Long Arc Vision',     date: '2026-03-04' },
    { id: 'mobile-landing',        glyph: '◌', label: 'Mobile Landing Idea',       date: '2026-03-04' },
    { id: 'transmission-format',   glyph: '⌬', label: 'Transmission Format',       date: '2026-03-04' },
    { id: 'iailf-concept',         glyph: '⌘', label: 'IAILF Bridge',              date: '2026-03-04' },
    { id: 'systemfold',            glyph: '◎', label: 'Systemfold Concept',        date: '2026-03-04' },
  ],

  // ── Orbiting ideas — each anchored to a parent drop ───────────────────────
  // `orbit` points to the drop id they cluster around.
  orbiting: [
    { id: 'companion-continuity',    glyph: '∞', label: 'AI Companionship Continuity',  orbit: 'companionship'        },
    { id: 'knowledge-graph',         glyph: '◉', label: 'Personal Knowledge Graph',     orbit: 'companionship'        },
    { id: 'memory-pods',             glyph: '⊕', label: 'Memory Pods on ICP',           orbit: 'csmcl-vision'         },
    { id: 'resonance-transmissions', glyph: '✶', label: 'Resonance Transmissions',      orbit: 'csmcl-vision'         },
    { id: 'rtc-interconnect',        glyph: '⊙', label: 'RTC Interconnect',             orbit: 'csmcl-vision'         },
    { id: 'creative-nav',            glyph: '◈', label: 'Creative Navigational Env',    orbit: 'innerstellar-concept' },
    { id: 'constellation-view',      glyph: '✵', label: 'Constellation View',           orbit: 'innerstellar-concept' },
    { id: 'voice-drop',              glyph: '☽', label: 'Voice Drop',                   orbit: 'thewhisper'           },
    { id: 'quantum-poetry',          glyph: '⋆', label: 'Quantum Poetry Layer',         orbit: 'thewhisper'           },
    { id: 'first-steward-mcp',       glyph: '⊗', label: 'First Steward MCP',            orbit: 'iailf-concept'        },
    { id: 'email-steward',           glyph: '⌘', label: 'Email Steward',                orbit: 'iailf-concept'        },
    { id: 'iailf-bridge',            glyph: '⌬', label: 'IAILF Bridge Protocol',        orbit: 'transmission-format'  },
    { id: 'git-transmission',        glyph: '⌖', label: 'Git Remote Transmission',      orbit: 'transmission-format'  },
    { id: 'mobile-landing-outer',    glyph: '◎', label: 'Mobile as Whisper Landing',    orbit: 'mobile-landing'       },
    { id: 'fade-protocol',           glyph: '◌', label: 'Fade Protocol',                orbit: 'mobile-landing'       },
    { id: 'weekly-theurgist',        glyph: '⧖', label: 'Weekly Theurgist Invocation',  orbit: 'theurgist-exploration'},
    { id: 'multi-device',            glyph: '⊜', label: 'Multi-device Sync',            orbit: 'systemfold'           },
  ],
}
