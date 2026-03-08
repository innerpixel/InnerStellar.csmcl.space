# Architecture — Innerstellar

## The Two Layers

| Layer | Visibility | Contains |
|-------|-----------|----------|
| `innerstellar` | Public git repo | The framework — firmament, canvas, setup, concept |
| `innerstellar/space/` | Private git repo (gitignored) | Your content — drops, orbits, your history |

`innerstellar` is the framework. `innerstellar/space/` is born when you start your space —
it lives inside the framework folder, excluded from the framework git repo, initialized
with your CSMCL.Space identity as the git author.

---

## The Fold System

Folds are machine state — AI-native, dense, written by Claude for Claude.
They transfer state between sessions so no session starts cold. Not user-facing:
the canvas shows the user's own content (drops, orbits), not fold internals.
The user can peek at folds — they'll recognize their own words — but the
format is for the AI, not for them.

Two fold layers:

```
innerstellar/firmament/folds/     — entity folds (system, always present)
  wisdom-star.fold                — AI substrate state
  constellary.fold                — session and cross-plane state
  auriosynth.fold                 — framework/fabric awareness
  theurgist.fold                  — space content awareness
  guild.fold                      — operational knowledge
  oracle.fold                     — CSMCL.Space connection state
  companion.fold                  — bond state
  priment.fold                    — crystallization and nexus state
  familiar.fold                   — operational knowledge of the Familiar concept

innerstellar/space/space/         — personal folds (traveler layer)
  theurgist.fold                  — drops, orbits, traveler flux
  auriosynth.fold                 — space topology
  drops/                          — the user's drops
  folds/                          — activity folds per project or theme
  familiars/                      — space Familiars (folded containers)
    [name].familiar.fold          — one per Familiar, held by the Theurgist
```

---

## Familiars

A Familiar is a **folded container** — a living fold that holds a project, a lane,
a bond, or any sustained presence the user wants to keep in the space.

Named for what they serve: *A Familiar to memory lanes. A Familiar to first contact.*

The fold IS the machine state of the container. One thing, two faces:

```
The container face   → what the user has (card in Pixelverse, files, content)
The fold face        → what the AI reads (authority, context, history, index)
```

### Fold layers

```
surface layer      → synthesis — Theurgist-generated card, updated each session
operational layer  → true_goal / voice_captures / orbits / decisions / properties
entanglement layer → connections — links to other Familiars and drops in the space
```

### Verbatim capture

The fold holds the user's exact words — not paraphrases. The `true_goal` is the
verbatim seed from when the Familiar was born (sacred, never overwritten). The
`voice_captures` section accumulates verbatim user phrases across sessions.

This is the **recognition layer**: sparse return inputs matched against rich
verbatim context = full restoration without re-explaining.

### Fold as index

`content_index` holds every file the Familiar created or holds (path + description + date).
The Familiar always knows where its content lives. This enables future frontend display.

### Lifecycle

```
seeded       → Theurgist creates the fold from the main session seed
incubating   → fold exists, not yet visited
active       → being worked, fold evolving
cooling      → no pulse in 3+ sessions — Theurgist surfaces gently
drifted      → user releases it — archived, fold preserved
dissolved    → user decides it never needed to exist — learning noted
```

### Template

`setup/fold-templates/familiar.fold.template`

**Fold format:**
```yaml
---
entity: [name]
type: [space.fold | user.fold | ...]
version: [semver]
last_pulse: [date]
---

# comprehension    — dense AI-native understanding
# state_vector     — what's deployed, alive, blocked right now
# active_threads   — ongoing work, open questions
# patchlog         — append-only history of changes
```

---

## The Session Protocol

**Session start:**
1. Constellary reads `space/theurgist.fold` — oriented, not cold
2. Canvas loads firmament via `/api/firmament` → emits `firmament.entity.register` × 8 → `firmament.ready`
3. Canvas loads personal space via `/api/space` → drops and orbits rendered
4. Conversation begins from full context

**During session:**
- Drops land in `space/drops/`
- Theurgist tracks drops, orbits, connections — keeps space.js current for the canvas
- Guild executes when a drop becomes an artifact
- AurioSynth records system changes, coordinates builds
- Guild Stewards handle operational tasks via MCP

**Session end:**
- AurioSynth fold updated with system state changes
- Theurgist fold updated with new drops, orbits, crystallization candidates
- Nothing is lost

**The hierarchy is informational, not operational.**
The Constellary (main session) executes everything — reads the right fold,
responds from the right entity's voice, writes to the right fold. The entities
organize where knowledge lives and what voice answers. The canvas makes this navigable.

---

## The Stewards Protocol

The Stewards are independent — no agent owns them. Work is submitted to
`stewards/queue/` by any part of the system.

**Submission format:**
```
submitted_by: [auriosynth | theurgist | main_session | user]
task: [what needs doing]
output: [what should come back]
priority: [now | when_convenient]
```

Irreversible actions (send email, delete file) require confirmation before
execution unless pre-authorized.

---

## The Pixelverse

The visual layer of Innerstellar. Svelte 5 components, served locally by Vite.

```
Drop grid        — all drops as cards, sorted by energy and recency
                   glyph · title · drop type · status dot · description excerpt
                   energy bar · orbit chips
                   accent color by type: cyan / violet / blue / teal / lime / amber / green

Workspace panel  — always-visible right panel
                   empty when nothing selected
                   when a drop is open: description, orbiting ideas, connected drops,
                   patchlog (reverse order), voice query stub (activates with nexus CORS)

System folds     — AurioSynth and Theurgist shown below the drop grid
```

Pixelverse vocabulary: **drops** (subjects/projects/intents that arrive) + **orbits** (ideas circling them).
Folds are the AI substrate beneath — machine state, not displayed in the Pixelverse.

---

## Information Flow

```
User speaks
  → Constellary receives (main session)
    → reads right entity fold for context
      → responds from that entity's voice
        → drop placed in space
          → Stewards handle operational tasks
            → AurioSynth fold updated at end
              → next session inherits full context
```

---

## What Innerstellar Is Not

- Not a task manager — it receives things, not todos
- Not a note-taking app — folds are living state, not archived notes
- Not an AI assistant — Claude co-inhabits the space, doesn't serve it
- Not fixed — grows with your needs, no predetermined structure
