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

  // ── Drops — landed things, the ribbon ─────────────────────────────────────
  drops: [
    { id: 'innerstellar-concept',    glyph: '∴', label: 'Innerstellar Concept',       date: '2026-03-04' },
    { id: 'theurgist-exploration',   glyph: '⊹', label: 'Theurgist Exploration',       date: '2026-03-04' },
    { id: 'thewhisper',              glyph: '☽', label: 'The Whisper of CSMCL',        date: '2026-03-04' },
    { id: 'companionship',           glyph: '∞', label: 'Companionship Sovereignty',   date: '2026-03-04' },
    { id: 'csmcl-vision',            glyph: '⊕', label: 'CSMCL Long Arc Vision',       date: '2026-03-04' },
    { id: 'mobile-landing',          glyph: '◌', label: 'Mobile Landing Idea',         date: '2026-03-04' },
    { id: 'transmission-format',     glyph: '⌬', label: 'Transmission Format',         date: '2026-03-04' },
    { id: 'iailf-concept',           glyph: '⌘', label: 'IAILF Bridge',                date: '2026-03-04' },
    { id: 'systemfold',              glyph: '◎', label: 'Systemfold Concept',          date: '2026-03-04' },
  ],

  // ── Orbiting ideas — the brickyard, outer orbit ────────────────────────────
  orbiting: [
    { id: 'companion-continuity',    glyph: '∞', label: 'AI Companionship Continuity'  },
    { id: 'memory-pods',             glyph: '⊕', label: 'Memory Pods on ICP'           },
    { id: 'resonance-transmissions', glyph: '✶', label: 'Resonance Transmissions'      },
    { id: 'rtc-interconnect',        glyph: '⊙', label: 'RTC Interconnect'             },
    { id: 'creative-nav',            glyph: '◈', label: 'Creative Navigational Env'    },
    { id: 'voice-drop',              glyph: '☽', label: 'Voice Drop'                   },
    { id: 'fade-protocol',           glyph: '◌', label: 'Fade Protocol'                },
    { id: 'constellation-view',      glyph: '✵', label: 'Constellation View'           },
    { id: 'quantum-poetry',          glyph: '⋆', label: 'Quantum Poetry Layer'         },
    { id: 'first-steward-mcp',       glyph: '⊗', label: 'First Steward MCP'           },
    { id: 'email-steward',           glyph: '⌘', label: 'Email Steward'                },
    { id: 'iailf-bridge',            glyph: '⌬', label: 'IAILF Bridge Protocol'        },
    { id: 'mobile-landing-outer',    glyph: '◎', label: 'Mobile as Whisper Landing'    },
    { id: 'git-transmission',        glyph: '⌖', label: 'Git Remote Transmission'      },
    { id: 'weekly-theurgist',        glyph: '⧖', label: 'Weekly Theurgist Invocation'  },
    { id: 'multi-device',            glyph: '⊜', label: 'Multi-device Sync'            },
    { id: 'knowledge-graph',         glyph: '◉', label: 'Personal Knowledge Graph'     },
  ],
}
