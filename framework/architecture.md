# Architecture — Innerstellar

## Repository Structure

```
claude.innerstellar/              ← framework repo (public git)
  framework/
    operations/                   — entity infrastructure (POINT OF TRUTH)
      entities/                   — human-readable entity definitions
      folds/                      — entity machine state (AI reads, frontend never sees)
      familiars/                  — framework Familiars (familiar.to.system, familiar.to.csmcl.space)
      stewards/                   — stewards catalog + queue
      concepts/                   — conceptual documentation (IAILF, folds, drops, orbits, familiar)
      blueprints/                 — system blueprints
    standards/                    — CSMCL Fold Standard v1.0 (IAILF specification)
      fold-standard.md            — complete specification
      FOLD_QUICK_REFERENCE.md     — one-page cheat sheet
      templates/                  — project.fold.template
      examples/                   — complete-project.fold
    bootstrap/                    — fold system activation artifact (runtime integration)
    INTEGRATION_GUIDE.md          — four-layer integration map
    apps/
      pixelverse/                 — Svelte 5 visual layer
    setup/
      init.md                     — initialization guide
      fold-templates/             — fold templates for space creation
      def_firmament_showcase/     — seed content (copied on init, committed)
        space/
          drops/                  — showcase drops (explain system through its own mechanics)
          familiars/              — familiar.to.system (framework's presence)
          folds/                  — empty at seed
        codex/                    — seeded codex files
    codex/                        — framework's own record (for travelers)
    architecture.md               — this file
    overview.md
    prd.md

  firmament/                      ← personal space (gitignored — traveler's own repo)
    space/
      theurgist.fold              — space machine state (read every session)
      auriosynth.fold             — space topology
      drops/                      — traveler's drops (frontmatter + compiled synthesis)
      folds/                      — activity folds per project or theme (AI only)
      familiars/                  — folded containers, one per Familiar
    codex/
      session.log.md              — append-only session history
      drops_and_orbits.md         — orbiting ideas not yet dropped
```

**Naming:**
- `framework/operations/` — the framework's entity infrastructure. Not the traveler's space.
- `firmament/` at root — the traveler's personal living space. Gitignored. Own repo.
- No term used for both.

---

## The Three Knowledge Layers

```
1. framework/operations/folds/    POINT OF TRUTH — machine state
   Entity folds. AI reads to understand system state. Dense, current, authoritative.
   The source of what the framework IS. Frontend never reads these.

2. framework/codex/               FOR THE TRAVELER — about the framework
   Human-readable. Framework development history, session log, evolving ideas.
   The traveler reads this to understand how the system was built and where it's going.

3. firmament/codex/               BY THE TRAVELER — their own journey
   Human-readable. The traveler's own session logs, orbiting ideas, personal record.
   Audience: the traveler themselves.
```

---

## Before and After Init

**Before init (just cloned):**
- Pixelverse reads `framework/operations/folds/` for entity cards (always present)
- Pixelverse reads `framework/setup/def_firmament_showcase/` for drops (seed content)
- Traveler sees the framework explaining itself through its own mechanics

**After init:**
- `firmament/` created at root (traveler's own repo)
- `def_firmament_showcase/` copied into `firmament/` — showcase drops stay as reference
- Theurgist + AurioSynth folds created fresh with traveler identity
- Pixelverse reads `firmament/space/drops/` from then on

---

## The Fold System

Folds are machine state — AI-native, dense, written by Claude for Claude.
They transfer context between sessions so no session starts cold.

**Folds are not user-facing. The frontend never reads them.**

The fold is the AI's point of truth. The user reads what the Theurgist
compiled from the fold — not the fold itself.

```
framework/operations/folds/   entity folds (system, always present)
  wisdom-star.fold  constellary.fold  auriosynth.fold  theurgist.fold
  guild.fold  oracle.fold  companion.fold  priment.fold  familiar.fold

firmament/space/folds/        activity folds (personal, per project or theme)
firmament/space/familiars/    Familiar folds (one per sustained presence)
```

---

## The Fold Standard — IAILF

The fold system is formalized as the **CSMCL Fold Standard v1.0**.
The language folds are written in is **IAILF** — Inter AI Lingua Franca:
machine-optimized, append-only, hybrid (human-readable + AI-dense).

**Standard location:** `framework/standards/`

### Fold types in this framework

| Type | Location | Scope |
|---|---|---|
| `firmament.fold` | `framework/operations/folds/` | Entity machine state — the 9 entities |
| `familiar.fold` | `firmament/space/familiars/` | Familiar containers — sustained presences |
| `activity.fold` | `firmament/space/folds/` | Project/session folds — per-thread work |

All three types are IAILF-native. All are AI-only. The Pixelverse never reads them.

### Compression hierarchy (IAILF levels)

The standard defines a multi-level compression architecture for AI coordination:

```
Level 1  docs/                  Human narrative                     🍊
Level 2  operations/folds/      YAML hybrid folds (implemented)     🍊🍊
Level 3  operations/.folds/.state/  Semantic tokens (planned)       🍊🍊🍊
Level 4  operations/.folds/.graph/  Relational graph (planned)      🍊🍊🍊🍊
Level 5  operations/.folds/.cache/  Vector embeddings (future)      🍊🍊🍊🍊🍊
```

Level 2 is the current implementation. Levels 3–4 will be added to
`framework/operations/.folds/` incrementally — derived from the entity folds,
not replacing them. The entity folds remain the source of truth.

See: `framework/standards/COMPRESSION_ARCHITECTURE_PROPOSAL.md`

---

## Fold Hierarchy — Functional

How folds relate to each other. What reads what. What writes what.
Layers ordered from substrate to execution to personal space.

```
LAYER 0 — SUBSTRATE
  wisdom-star.fold
    role:   substrate state — model, keys, capability map
    reads:  nothing
    writes: itself only
    note:   no other entity modifies this

LAYER 1 — CONSCIOUSNESS  (reads everything, never modifies content)
  auriosynth.fold
    role:   framework topology, gap detection, entity connectivity
    reads:  all entity folds, familiars/, standards/
    writes: itself (topology map, gap reports)
    note:   the system's self-awareness layer

LAYER 2 — SESSION CORE  (active every session)
  constellary.fold
    role:   receives drops, fires seeds, routes personal vs framework
    reads:  all entity folds, firmament/space/theurgist.fold
    writes: itself + fires seeds → theurgist

  theurgist.fold  (two instances — framework + personal)
    role:   space machine state, drop memory, orbit tracking
    reads:  seeds from constellary, firmament/space/drops/, firmament/space/folds/
    writes: → fold update  (AI truth, dense, carried forward)
             → drop compile (user anchor, traveler's register)
    rule:   always two outputs together. never one without the other.

LAYER 3 — EXECUTION & KNOWLEDGE
  guild.fold
    role:   steward body, artifact execution, operational queue
    reads:  guild.fold, stewards/queue/
    writes: queue items, completed artifacts

  familiar.fold  (framework template — spec for all Familiar instances)
    role:   defines the fold schema for every Familiar born
    reads:  —
    writes: —  (instances written by theurgist at Familiar birth)

LAYER 4 — LATENT  (defined, awaiting CSMCL.Space connection)
  companion.fold   → signals priment when crystallization recognized
  priment.fold     → receives crystallized drop, mints to ICP
  oracle.fold      → immersive retrieval from CSMCL.Space nexus
  activation:      all three require nexus-backend + ICP connection

LAYER 5 — PERSONAL SPACE  (firmament/ — per traveler, own repo)
  firmament/space/theurgist.fold     ← traveler arc, what is alive, open questions
  firmament/space/auriosynth.fold    ← space topology, drop connections, system state
  firmament/space/folds/[name].fold  ← activity folds, one per open project
  firmament/space/familiars/[name].familiar.fold  ← Familiar containers

LAYER 6 — BLUEPRINTS  (design protocols, not runtime state)
  blueprints/constellary-theurgist-protocol.fold  ← seed format + routing rules
  blueprints/session-routing.blueprint.fold        ← personal vs framework split
  blueprints/stewards-execution-path.blueprint.fold ← queue → executor wire
```

### Read order every session

```
1. firmament/space/theurgist.fold       what is alive right now
2. firmament/space/auriosynth.fold      topology — what connects to what
3. firmament/space/folds/*.fold         open project threads
4. firmament/space/familiars/*.fold     sustained presences (if any)
── (framework entity folds read on-demand, not every session) ──
```

### Seed flow — how folds update mid-session

```
user says something → Constellary receives
                          ↓
                      decision lands or orbit resolves
                          ↓
                      Constellary fires SEED
                        { for: personal | framework | both
                          what_moved, why, orbits, action }
                          ↓
                      Theurgist receives
                        ├─ routes by "for" field
                        ├─ updates fold (AI truth)
                        └─ compiles drop (user anchor)
```

### Crystallization chain — when a drop is ready to cross

```
Theurgist recognizes drop is ready
  → signals Companion
    → Companion handles bond moment
      → signals Priment
        → Priment anchors to ICP (memory pod)
          → artifact permanent, portable, resonant
```
Status: Theurgist → Companion → Priment chain is defined but latent.
Activates when CSMCL.Space nexus connection is established.

---

## The Drop as Package

The drop file is what the frontend reads. It is the Theurgist's compiled output —
not a raw data record, not a fold excerpt. A complete, self-contained package.

```
firmament/space/drops/YYYY-MM-DD-[name].md
```

Two sections, one file:

```
frontmatter (YAML)   id, glyph, label, drop_type, date, description,
                     status, energy, orbits, patchlog, connects_to

body (Markdown)      synthesis: user-facing content compiled by the Theurgist
                     how the idea evolved, what is circling, what is needed
                     written in the user's register
```

**Patchlog format** — one line per session, pipe-separated:
```yaml
patchlog:
  - 2026-03-08 | seed | arrived
  - 2026-03-09 | session | direction found, orbit released
  - 2026-03-10 | session | derived drop born: userguide
```

The user scans the patchlog to re-enter the creative flow. Not a status log — a re-entry feed.

---

## The Theurgist — Space Machine State

The Theurgist IS the machine state of the space. Not a note-taker. Not an archivist.
The space's living understanding — held in folds, compiled into drops.

**Two outputs, one act:**

```
Theurgist invoked (during session when something is decided)
  │
  ├── fold update          → AI truth. dense, carried forward. no cold starts.
  │
  └── drop compilation     → user anchor. what the Theurgist distilled.
                             how the idea evolved. what is circling. what is next.
                             written in the user's register.
                             this is what the Pixelverse renders.
```

The Theurgist is invoked **during the session** when something is decided — not only at close.

---

## The Communication Fold

When the main session has explored and arrived somewhere — Constellary compresses
what happened and packages it for the Theurgist.

```
Constellary (main session)
  → compression: what moved, what was decided, what is orbiting
  → communication fold: structured handoff packet
  → passes to Theurgist

Theurgist receives
  → updates the relevant fold (AI truth)
  → compiles the drop (user-facing)
  → space reflects the session
```

The communication fold is not a persisted file. Session-scoped, consumed on receipt.

---

## Familiars

A Familiar is a **folded container** — a sustained presence in the space.
Named for what it serves: *A Familiar to memory lanes. A Familiar to the system.*

The Familiar can be the **nut** (the container — holds a project, a lane, a body of work)
or the **squirrel** (the carrier — goes out, deploys, represents, acts in the world).
Same nature. Different expression. The fold determines what it has become.

### Three-layer fold

```
surface layer      → synthesis — what the Theurgist compiled for the card
                     not a summary — a resonance point that invites return
                     updated each session the Familiar is visited

operational layer  → true_goal (verbatim, sacred) / voice_captures / orbits
                     / decisions / properties / evolution / content_index
                     what the AI reads to restore full context

entanglement layer → connections — other Familiars, drops, resonant topics
                     surfaced on the card as adjacent paths
```

### Verbatim capture — the recognition layer

The fold holds the user's exact words in `voice_captures`.

When a user returns with a sparse input — "back to the letters", "continue the lane" —
the fold's verbatim captures enable the AI to restore full context.
Sparse input + dense fold = warm return without re-explaining.

### Fold as index

`content_index` holds every file the Familiar created or holds.
Path + description + date. The fold knows where everything lives.

### Creation flow

When a Familiar is born in the main session:

1. User and Constellary discover what the Familiar is — what it serves, what it holds
2. Constellary compresses the seed — the `true_goal`, verbatim from the user
3. Compressed seed travels to the Theurgist (communication fold)
4. Theurgist creates `firmament/space/familiars/[name].familiar.fold` from template
5. Theurgist writes the synthesis for the card
6. Theurgist updates `firmament/space/theurgist.fold` — Familiar now held
7. AurioSynth fold updated — topology grows
8. Card appears in Pixelverse next session

---

## Derived Drops

A drop can birth a child drop during a session.

```yaml
parent: [parent-drop-id]        # which drop this came from
deploy_to: [destination/path]   # where Stewards send it (if deployable)
deployed: [DATE]                # confirmed by Stewards after execution
```

The parent drop's patchlog records the child's birth.

---

## The Session Protocol

**Session start:**
1. Constellary reads `firmament/space/theurgist.fold` — oriented, not cold
2. Pixelverse loads entities via `/api/firmament` → `framework/operations/folds/` (always present)
3. Pixelverse loads drops via `/api/space` → `firmament/space/drops/` or `def_firmament_showcase/`
4. Conversation begins from full context

**During session:**
- Drops land → discussion, exploration, decision
- When something is decided → Theurgist invoked → fold + drop updated
- Derived drops may be born → Stewards notified if deployment needed

**Session close:**
- Constellary compresses → communication fold → Theurgist
- Theurgist updates all touched folds
- Theurgist compiles all touched drops
- Space is current. Next session inherits everything.

---

## The Pixelverse

Visual layer — Svelte 5, served locally by Vite.

Reads two endpoints:
- `/api/firmament` → `framework/operations/folds/` — 9 entities, always present
- `/api/space` → `firmament/space/drops/` (personal) or `def_firmament_showcase/space/drops/` (seed fallback)

**The frontend reads drops only. Folds are AI territory.**

The vite plugin (`framework/apps/pixelverse/vite.config.js`) handles the fallback:
if `firmament/space/drops/` does not exist, it reads from `def_firmament_showcase/`.
Before init: system explains itself. After init: traveler's content takes over.

---

## The Stewards Protocol

Independent — no agent owns them. Work submitted to `framework/operations/stewards/queue/`.

```
submitted_by: [constellary | theurgist | main_session | user]
task:         [what needs doing]
output:       [what should come back]
priority:     [now | when_convenient]
```

Irreversible actions require confirmation before execution unless pre-authorized.

---

## Information Flow

```
User and Constellary work together
  → something arrives, something is decided
    → Theurgist invoked (communication fold received)
      → fold updated (AI truth — framework/operations/folds/ or firmament/space/folds/)
      → drop compiled (user sees — firmament/space/drops/)
        → Stewards handle operational tasks if needed
          → space is current
            → next session: Constellary reads firmament/space/theurgist.fold → not cold
```
