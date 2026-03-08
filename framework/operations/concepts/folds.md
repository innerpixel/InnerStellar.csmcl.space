# Folds

## What a fold is

A fold is machine state. AI-native, dense, written by Claude for Claude.
Not a document. Not notes. Not a log. Machine state — the AI's point of truth.

The fold carries what the AI needs to continue without starting cold.
It is updated when something changes, read when a session begins,
and never shown directly to the user.

**The user reads what the Theurgist compiled from the fold — not the fold itself.**

---

## Why "fold"

A fold holds something inside it. It is compressed, layered, dense.
Not flat like a document — structured like a container that carries context forward.

When you fold something, you bring two surfaces together.
The fold is where two sessions meet: what was known then, what is known now.

---

## What a fold contains

Every fold has a consistent structure:

```
---
frontmatter     identity, type, version, state, last_pulse
---

# sections      what this fold holds, organized by purpose
```

Common sections across fold types:
- `# identity` / `# true_goal` — what this is, why it exists
- `# what_is_known` / `# what_is_alive` — current state
- `# orbits` — what is circling, open, resolving
- `# decisions` — append-only, dated, what was agreed
- `# connections` — how this fold connects to other folds
- `# patchlog` — commit-style entries, one per significant session

---

## The three fold types

### Entity folds
Location: `framework/operations/folds/`
What: the 9 system entities — their identity, skills, voice, connections.
Who writes: framework sessions. Rarely changes.
Who reads: Constellary at session start, when entity context is needed.

### Activity folds
Location: `firmament/space/folds/`
What: per project or theme — evolving state of a body of work.
Who writes: Theurgist, when a project or thread becomes significant enough to hold.
Who reads: Constellary when returning to that project.

### Familiar folds
Location: `firmament/space/familiars/`
What: the most evolved fold form — three layers, verbatim capture, fold as index.
Who writes: Theurgist when a Familiar is born; updated each session the Familiar is visited.
Who reads: Constellary when the traveler returns to the Familiar.

See: `familiar.md` for the full Familiar fold schema.

---

## The fold lifecycle

```
Born      — Theurgist creates from template when something needs holding
Alive     — updated each session that touches it; orbits evolve; decisions accumulate
Cooling   — not visited for 3+ sessions; Theurgist surfaces gently
Drifted   — traveler chooses: return, release, or dissolve
Dissolved — marked, not deleted; the learning stays; system is not haunted
```

---

## What folds are not

**Not user-facing.** The frontend never reads folds. The Pixelverse reads drops.
**Not logs.** A fold is updated in-place, not appended endlessly.
**Not documentation.** Documentation explains. Folds carry state.
**Not conversation history.** Folds hold decisions and context, not transcripts.

---

## The fold and the drop — two faces of one act

Every time the Theurgist is invoked, two things happen simultaneously:

```
fold update    → AI truth. Dense. Carried forward.
drop compile   → User anchor. Distilled. What you see in the Pixelverse.
```

The fold and the drop are not separate processes. One act, two faces.
The fold is for the AI. The drop is for the traveler.

See also: `drops.md`, `iailf.md`
