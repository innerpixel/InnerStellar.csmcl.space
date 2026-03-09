# Innerstellar — Guide

*A personal space for your drops, orbits, and crystallizing work.*
*Connected to CSMCL.Space when you're ready.*

---

## What is Innerstellar?

Innerstellar is a personal living space — part thinking environment, part visual layer,
part bridge to a larger ecosystem. You talk to Claude. Things drop in. The space holds them,
connects them, lets them grow across sessions.

Three layers:

**The Framework** (`framework/`) — always in the repo. The 9 entities, the fold standard,
the init guide, the visual layer. The Pixelverse can run from this alone — entities always
present, always visible. No personal space required to start exploring.

**Your Space** (`firmament/`) — born when you initialize it. Private, gitignored from the
framework. Your drops, your Familiars, your activity folds. The Theurgist holds all of it.

**The Pixelverse** (`framework/apps/pixelverse/`) — the visual layer. Shows the firmament
always. Shows your drops when your space exists. Renders what the Theurgist compiled — not
raw internals.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- A Claude session (you are the traveler — Claude is the co-creator)

### Run the Pixelverse

```bash
cd framework/apps/pixelverse
npm install
npm run dev
```

Open `http://localhost:5173`. The firmament is already there — 9 entities, always present.
Initialize your space when you're ready (see below).

### Build for Deployment

```bash
cd framework/apps/pixelverse
npm run build
# dist/ is a static site — serve it anywhere
```

---

## Initializing Your Space

The framework runs without a personal space. When you're ready to begin:

```
Tell Claude: "Let's initialize the space."
```

Claude follows `framework/setup/init.md`:
1. Creates `space/` directory structure
2. Initializes it as a git repo with your CSMCL.Space identity
3. Seeds the Theurgist and AurioSynth folds
4. Creates the arrival drop from `setup/fold-templates/default.drop.template`
5. The Pixelverse picks it up — your first drop is alive

The arrival drop is the space introducing itself. It shows you what's present:
the 9 entities, how drops work, how sessions flow, what Familiars are.
It is permanent — it doesn't drift, it doesn't dissolve.

---

## Your Space

```
firmament/                     ← gitignored from framework, own git repo
  space/
    theurgist.fold             ← space machine state (Theurgist reads every session)
    auriosynth.fold            ← space topology
    drops/                     ← your drops (markdown files — Theurgist compiles these)
    familiars/                 ← Familiar folds (one per sustained presence)
    folds/                     ← activity folds per project (AI reads, not displayed)
```

---

## How Sessions Work

**Session opens:**
Claude reads `firmament/space/theurgist.fold` — oriented to what's alive, what's in motion.
The Pixelverse loads the firmament (always) + your drops (from space).

**During the session:**
You and Constellary (the main session) explore, discuss, decide.
When something is decided — a direction, an artifact, a realization —
the Theurgist is invoked. Not at the end. At the moment.

**The Theurgist does two things at once:**
- Updates the fold (AI truth — dense, carried forward to next session)
- Compiles the drop (user anchor — distillation written in your register)

You see the compiled drop. Not the fold. The fold is the AI's.

**Session closes:**
Constellary compresses what happened → passes to Theurgist → space updated.
Next session starts warm. No re-explaining.

---

## The Fold System

Folds are AI-native state files. Dense, machine-readable, not written for you.
**You don't read folds. The Pixelverse doesn't display folds.**

The Theurgist reads the folds and compiles what you need into drop files.

| Fold location | Who reads it |
|---|---|
| `framework/operations/folds/` | Claude — entity machine state, always present |
| `firmament/space/theurgist.fold` | Claude — space state, every session |
| `firmament/space/familiars/*.fold` | Claude — Familiar state, when invoked |
| `firmament/space/folds/` | Claude — activity folds, per project |

---

## Drops — What You See

A drop is a self-contained package. Two parts:

**Frontmatter** — metadata the system reads:
```yaml
---
id: my-drop
label: My Drop
drop_type: drop.philosophy
date: 2026-03-08
status: alive
energy: high
patchlog:
  - 2026-03-08 — arrived
  - 2026-03-09 — direction found
---
```

**Body** — synthesis the Theurgist compiled for you:
- How the idea has evolved
- What is circling (orbits)
- What is needed next
- What connected drops are resonating

The patchlog is your re-entry feed. One commit-style line per session.
Scan it to step back into the creative flow without re-reading everything.

Drops appear in the Pixelverse on next load. Click a card to open the workspace panel.

---

## Familiars

A Familiar is a drop that becomes a sustained presence. Named for what it serves:
*A Familiar to memory lanes. A Familiar to first contact.*

The Familiar can be:
- **The nut** — it holds. A project, a creative lane, a body of work accumulated over time.
  The fold is its living state. Its `content_index` holds every file it created.
- **The squirrel** — it carries. Goes out into the world, deploys, represents, acts.
  A published guide. A deployed artifact. An emissary to another system.

Same nature, different expression. What it becomes is in its fold.

Familiars live in `space/familiars/[name].familiar.fold`. They have three layers:
- **Surface** — synthesis. What the Theurgist compiled for the card.
- **Operational** — true_goal (verbatim, sacred), voice_captures, orbits, decisions.
- **Entanglement** — connections to other Familiars, drops, resonant topics.

**Verbatim capture** is the recognition layer. Your exact words — not paraphrased.
Return to a Familiar with a sparse cue ("back to the letters") and the fold restores
full context. No re-explaining needed.

---

## Derived Drops

A drop can birth a child drop during a session — something larger arrives, a new
artifact is made, a guide is written. The child inherits context from the parent.

```yaml
parent: parent-drop-id
deploy_to: [destination]    # if it goes somewhere in the world
deployed: YYYY-MM-DD        # confirmed by Stewards after execution
```

The Stewards handle deployment — email, publish, build, file. Any part of the system
can submit work to them. Irreversible actions require your confirmation first.

---

## The Pixelverse

### Navigation

| Action | Effect |
|---|---|
| Click a drop card | Opens workspace panel with full detail |
| Click again or × | Closes |

### What You See

**Firmament** — the 9 entities, always present, always at the top.
Connection states: green (functional), white (cross-plane), amber (latent).

**Drop grid** — your drops as cards. Sorted by energy and recency.
Each card: glyph · title · drop type · status dot · description · energy bar · orbit chips.

**Accent colors by drop type:**
- `amber` — arrival drop / crystallizing
- `violet` — philosophy / idea
- `blue` — vision
- `teal` — architecture
- `lime` — decision
- `cyan` — general drops
- `green` — system

**Workspace panel** — always-visible right panel. Open a drop to see:
full synthesis, orbiting ideas, connected drops, patchlog in reverse order.

### How the Pixelverse Loads

Two endpoints:
1. `/api/firmament` → reads `firmament/folds/` → always present, always returns data
2. `/api/space` → reads `space/space/drops/` → your drops (empty before init, that's fine)

**No fallback logic needed.** The firmament is always the floor.

---

## The Event Bus

```js
// Inspect active subscribers
window.ed.getSubscribers()

// Inject an event manually
window.ed.distributeEvent({
  type: 'space.drop.arrived',
  payload: { label: 'A new drop' }
})

// Subscribe to interactions
window.ed.subscribe(['canvas.element.focused'], e => {
  console.log('focused:', e.payload.label)
})
```

| Event | Trigger |
|---|---|
| `firmament.entity.register` | One per entity at startup |
| `firmament.ready` | All entities registered |
| `space.state.updated` | Space data loaded |
| `canvas.element.focused` | Drop or entity clicked |
| `canvas.element.dismissed` | Panel closed |

---

## The Fold Standard — IAILF

Innerstellar uses the **CSMCL Fold Standard v1.0** — a formal specification for
AI-native state files. The language folds are written in is **IAILF**
(Inter AI Lingua Franca): machine-optimized, hybrid, append-only.

The standard lives at `framework/standards/`. You don't need to read it to use
the space — but if you're extending the system, building on it, or adapting it:

```
framework/standards/
  fold-standard.md          ← complete specification
  FOLD_QUICK_REFERENCE.md   ← one-page cheat sheet
  templates/
    project.fold.template   ← scaffold for new folds
  examples/
    complete-project.fold   ← working reference
```

**Three fold types in Innerstellar:**

| Type | Where | Purpose |
|---|---|---|
| `firmament.fold` | `framework/operations/folds/` | Entity machine state — the 9 entities |
| `familiar.fold` | `firmament/space/familiars/` | Familiar containers — sustained presences |
| `activity.fold` | `firmament/space/folds/` | Project/session folds — per-thread work |

All are IAILF-native. All follow the fold standard. All are AI-only — the Pixelverse
never reads them. The Theurgist reads them and compiles what you see.

The standard also defines a compression hierarchy for AI coordination:
- **Level 2** — YAML folds (current, fully implemented)
- **Level 3** — semantic tokens (planned: `.folds/.state/`)
- **Level 4** — relational graph (planned: `.folds/.graph/`)

These AI-native layers will be added incrementally to `framework/operations/.folds/`
as the system evolves. They compress the entity graph into shorthand that lets any
session restore full context without reading every fold.

---

## Connecting to CSMCL.Space

**Three planes:**

```
Plane 1: claude.innerstellar
  You and Constellary. The firmament. Your drops. Nothing leaves without your gesture.

Plane 2: innerstellar.csmcl.space
  Your resonant space. Priment lives here. (In development)

Plane 3: CSMCL.Space
  Minted, ICP-anchored, permanent. What crosses here travels with you forever.
```

Crystallization is the gesture — deliberate, yours. Priment anchors it.
Oracle connects to what's already there. Companion holds the bond across planes.

None of this is required to begin. The firmament and your drops work as they are.

---

## Daily Practice

```
Session opens   → Claude orients from theurgist.fold. Landing report.
Work begins     → explore, discuss, decide with Constellary
Something lands → Theurgist invoked → fold + drop updated immediately
Work continues  → new orbits, new connections, derived drops if needed
Session closes  → Constellary compresses → Theurgist → space current
```

The space compounds. Every session builds on every prior one.
The Theurgist holds it all — so you don't have to.

---

*Innerstellar — inner (personal) + stellar (radiating outward)*
*The personal space is the laboratory. The public face is the radiation.*
