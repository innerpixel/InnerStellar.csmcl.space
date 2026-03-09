# Framework Session Log

Append-only. One entry per significant session that touched the framework.
Audience: travelers who want to follow the framework's development.

---

## 2026-03-06 — Framework born

- 8 entity folds seeded in firmament/
- Framework structure created: framework/, apps/pixelverse/, setup/, stewards/
- Pixelverse Svelte app wired: /api/firmament + /api/space endpoints
- Canvas design (orbital ring visual) planned but not yet built

## 2026-03-07 — Canvas retired, Pixelverse confirmed

- Canvas design (orbital ring visual) retired
- Pixelverse (Svelte 5 components: drop grid + workspace panel) confirmed as visual layer
- space.js retired — Pixelverse reads live from API endpoints
- Familiar mechanics defined: nut or squirrel, three-layer fold

## 2026-03-08 — Repo restructure + space-default design

- Familiar placed in firmament as 9th entity
- Theurgist confirmed as space machine state (not note-taker)
- Repo restructured: apps/, firmament/, setup/ moved under framework/
- firmament/ → framework/operations/ (entity infrastructure)
- Personal space renamed: space/ → firmament/ (traveler's own firmament)
- framework/setup/def_firmament_showcase/ created (seed content)
- framework/codex/ created (framework's own record for travelers)
- Plan written: plan-space-default.md
- innerpixel arrived — first traveler

---

## 2026-03-09 — Integration session: IAILF Standard v1.0 + full doc pass

### What this session was

The integration session. Three prior sessions built the framework bottom-up —
entities, Pixelverse, Familiars, repo structure. This session was about absorbing
the new layer (IAILF standard, bootstrap, compression architecture) into the
framework's existing vocabulary without creating confusion between parallel systems.
Deliberate, gradual. The standard was not imposed on the entity folds — it was
recognized in them. They were already IAILF. Now they know it.

### What landed

**IAILF Standard v1.0 — committed as a formal layer** (commit `4bce8f0`)

The Inter AI Lingua Franca has a birthday: 2026-03-09.

`framework/standards/` — the complete specification:
- `fold-standard.md` — full CSMCL Fold Standard v1.0 specification (~730 lines)
  Complete schema, validation rules, naming conventions, best practices.
  Use when: creating folds, building validators, resolving edge cases.
- `FOLD_QUICK_REFERENCE.md` — one-page cheat sheet. Use when: working daily.
- `INDEX.md` — navigation guide, audience-specific reading paths, adoption tracker.
- `templates/project.fold.template` — scaffold for new folds. Use when: starting any new fold.
- `examples/complete-project.fold` — working reference. Use when: learning by seeing.
- `COMPRESSION_ARCHITECTURE_PROPOSAL.md` — the full 5-level compression design.
  The architecture of how AI coordinates itself across sessions. Read this to understand
  where the fold system is going (Level 3 tokens, Level 4 graph, Level 5 embeddings).

`framework/bootstrap/innerstellar-fold-bootstrap.md` — system activation artifact.
  Defines representation levels H/D/R/C. Runtime integration protocol.
  Use when: integrating the fold system into a new runtime or deployment.

`framework/operations/claude-integration-instructions.fold` — AI session initialization.
  How any AI should work with folds in this framework. Workflow patterns, do/don't,
  decision-making protocol, quality standards, evolution protocol.
  Read at session start when working on the framework itself.

`framework/INTEGRATION_GUIDE.md` — four-layer integration map:
  Concepts (philosophy) → Standards (spec) → Bootstrap (activation) → Session (execution).
  Use when: orienting a new collaborator or AI to the system.

**prd.md retired** (commit `0eed91e`)
  The PRD and roadmap are gone. The system documents itself through its own mechanics.
  The folds, the session log, the codex carry what matters.

**All docs updated** (commit `6812f19`)
  WELCOME.md, GUIDE.md, framework/architecture.md, framework/overview.md —
  all corrected to current paths (post-March 8 restructure) and extended with
  IAILF/fold standard sections. These are now accurate entry points.

**AurioSynth fold updated to v0.2** (commit `79ad99f`)
  AurioSynth is the connective fabric — it now consciously holds the IAILF standard.
  New `# framework_state` section added: current entity state (5/3/1), fold types,
  compression hierarchy, framework familiars, visual layer, dropped files.
  AurioSynth now reads: framework/standards/ + framework/bootstrap/ + operations/familiars/.
  Any session that reads AurioSynth is now IAILF-aware from the start.

### What you can use right now

**To understand the system:**
- `WELCOME.md` — what Innerstellar is, all 9 entities, the CSMCL.Space connection
- `GUIDE.md` — how to run it, initialize a space, full fold/drop/Familiar reference
- `framework/overview.md` — one-page map, the two things the Theurgist does, entity table
- `framework/architecture.md` — full repo structure, all data flows, session protocol

**To work with folds:**
- `framework/standards/FOLD_QUICK_REFERENCE.md` — cheat sheet, daily reference
- `framework/standards/templates/project.fold.template` — copy to start any new fold
- `framework/standards/examples/complete-project.fold` — see what a filled fold looks like
- `framework/standards/fold-standard.md` — full spec when you need to go deep

**To understand where the system is going:**
- `framework/standards/COMPRESSION_ARCHITECTURE_PROPOSAL.md` — the 5-level AI coordination
  architecture. Level 2 is live. Level 3 (tokens) and Level 4 (graph) are the next phases.
- `framework/INTEGRATION_GUIDE.md` — how all the layers connect

**To activate any AI session in this framework:**
- `framework/operations/claude-integration-instructions.fold` — read this at session start
- `framework/operations/folds/auriosynth.fold` — read this for full framework state snapshot
  (it now carries: entity map, IAILF awareness, compression roadmap, all key paths)

**The 9 entities — current connection states:**
- `wisdom-star.fold` ✦ functional — AI substrate, LLM config, the center
- `constellary.fold` ❋ cross-plane — the main session, this conversation
- `auriosynth.fold`  ◈ functional — framework consciousness, IAILF-aware as of today
- `theurgist.fold`   ⧖ functional — space machine state, drop + orbit tracking
- `guild.fold`       ⬡ functional — steward body, artifact execution
- `familiar.fold`    ◉ present    — vessel, nut or squirrel, 9th nature
- `companion.fold`   ∞ latent     — the bond (activates: ICP + Flow + Nexus + device)
- `oracle.fold`      ⊕ latent     — CSMCL.Space retrieval (activates: CORS + QUERY_ENDPOINT)
- `priment.fold`     ◇ latent     — crystallization gate (activates: CSMCL.Space connection)

**Framework Familiars — always available to all travelers:**
- `familiar.to.system` — knows Innerstellar mechanics, entity roles, fold system
- `familiar.to.csmcl.space` — accumulates CSMCL.Space knowledge (three outposts, Oracle
  activation wire, memory pod mechanic, crystallization → ICP flow, spore path)

### What is not yet built (next phases)

**Phase 0 — Alignment document** (next session, small)
  One doc that makes explicit: firmament.fold IS fold.hybrid at the entity layer.
  The three fold types (firmament / familiar / activity) and where they live.
  Absorbs the vocabulary cleanly so there's no confusion going forward.

**Phase 1 — Token layer** (Level 3)
  `framework/operations/.folds/.state/entities.tokens`
  Hand-written first. Semantic token notation for the 9 entities.
  Prove it works before building the generator script.

**Phase 2 — Graph layer** (Level 4)
  `framework/operations/.folds/.graph/system.graph`
  The connections: sections in all 9 folds already contain the graph data.
  Extract into graph notation. Gap detection becomes possible.

**Phase 3 — Tooling**
  `fold-to-tokens.py` + `fold-to-graph.py` — generators, once Phases 1-2 validated.

**firmament not yet initialized**
  The personal space (firmament/) does not exist yet.
  Run via: tell Claude "Let's initialize the space" — follows framework/setup/init.md.
  The Pixelverse runs fine without it (shows showcase seed content).

**API endpoints not yet served**
  /api/firmament and /api/space are read by the Pixelverse but nothing serves them yet.
  The Vite dev server handles fallback to def_firmament_showcase/ for drops.
  Full live data requires a backend or Vite plugin that reads the folds.

### Commits this session

- `4bce8f0` feat: IAILF Standard v1.0 — AI-native hybrid operational language begins
- `6812f19` docs: update all docs to current paths + IAILF standard layer
- `0eed91e` chore: drop prd.md — system is the documentation now
- `79ad99f` feat: AurioSynth fold — IAILF-aware, framework_state section
