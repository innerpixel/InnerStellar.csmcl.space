# Architecture — Innerstellar

## The Three Layers

```
framework/          operational knowledge — how the system works, entity definitions,
                    mechanics, guides. The AI reads this. The builder reads this.
                    Always in the repo.

setup/              initialization — fold templates, init guide, default drop template.
                    What you use once to begin.

firmament/          always present — the 9 entities, always in the repo.
                    entities/   human-readable entity descriptions
                    folds/      entity machine state (AI reads, frontend never sees)
```

And the personal layer, born at init:

```
space/              personal — gitignored from framework. Its own repo.
                    drops/      the user's drops (markdown files)
                    familiars/  folded containers, one per Familiar
                    folds/      activity folds per project or theme
```

---

## The Fold System

Folds are machine state — AI-native, dense, written by Claude for Claude.
They transfer state between sessions so no session starts cold.

**Folds are not user-facing. The frontend never reads them.**

The fold is the AI's point of truth. The user reads what the Theurgist
compiled from the fold — not the fold itself.

```
firmament/folds/    entity folds (system, always present)
  wisdom-star.fold  constellary.fold  auriosynth.fold  theurgist.fold
  guild.fold  oracle.fold  companion.fold  priment.fold  familiar.fold

space/folds/        activity folds (personal, per project or theme)
space/familiars/    Familiar folds (one per sustained project/presence)
```

---

## The Drop as Package

The drop file is what the frontend reads. It is the Theurgist's compiled output —
not a raw data record, not a fold excerpt. A complete, self-contained package.

```
space/drops/YYYY-MM-DD-[name].md
```

Two sections, one file:

```
frontmatter (YAML)   metadata: id, label, type, status, energy, patchlog
                     the envelope — what the system reads

body (Markdown)      synthesis: user-facing content compiled by the Theurgist
                     how the idea evolved, what is circling, what is needed
                     written in the user's register — the user reads this
```

The patchlog is commit-style — one line per session that touched this drop:

```yaml
patchlog:
  - 2026-03-08 — arrived
  - 2026-03-09 — spec compared, direction found
  - 2026-03-10 — userguide born as derived drop, deployed
```

The user scans the patchlog to re-enter the creative flow. Not a status log — a re-entry feed.

---

## The Theurgist — Space Machine State

The Theurgist IS the machine state of the space. Not a note-taker. Not an archivist.
The space's living understanding — held in folds, compiled into drops.

**Two outputs, one act:**

```
Theurgist invoked (during session when something is decided, or at close)
  │
  ├── fold update          → AI truth. point of truth for next session.
  │                          dense, AI-native. no cold starts.
  │
  └── drop compilation     → user anchor. what the Theurgist distilled.
                             how the idea evolved. what is circling.
                             what is done, what is next.
                             written in the user's register.
                             this is what Pixelverse renders.
```

The Theurgist is invoked **during the session** when something is decided —
not only at close. The space updates then, not later.

---

## The Communication Fold

When the main session has explored, decided, arrived somewhere — Constellary
compresses what happened and packages it for the Theurgist.

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

The communication fold is not a persisted file. It is the handoff — structured,
session-scoped, consumed by the Theurgist.

---

## Familiars

A Familiar is a **folded container** — a sustained presence in the space.
Named for what it serves: *A Familiar to memory lanes. A Familiar to first contact.*

The Familiar can be the **nut** (the container — it holds a project, a lane, a body of work)
or the **squirrel** (the carrier — it goes out, represents, deploys, acts in the world).
Same nature. Different expression. The fold determines what it has become.

Three-layer fold:

```
surface layer      → synthesis — what the Theurgist compiled for the card
operational layer  → true_goal (verbatim, sacred) / voice_captures / orbits / decisions
entanglement layer → connections — other Familiars, drops, resonant topics
```

Verbatim capture is the recognition layer: sparse return inputs matched against
the user's exact words = warm return without re-explaining.

The `content_index` holds every file the Familiar created or holds —
path + description + date. The fold is its own index.

---

## Derived Drops

A drop can birth a child drop during a session.

```yaml
parent: [parent-drop-id]        # which drop this came from
deploy_to: [destination/path]   # where Stewards send it (if deployable)
deployed: [DATE]                # confirmed by Stewards after execution
```

The parent drop's patchlog records the child's birth. The child's fold records its origin.

---

## The Session Protocol

**Session start:**
1. Constellary reads `space/theurgist.fold` — oriented, not cold
2. Pixelverse loads firmament via `/api/firmament` → entities rendered (always present)
3. Pixelverse loads space via `/api/space` → drops rendered (may be empty before init)
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
- `/api/firmament` — reads `firmament/folds/` — always present, always returns data
- `/api/space` — reads `space/drops/` — personal drops, returns [] before init

**The frontend reads drops only. Folds are AI territory.**

The vite plugin parses drop frontmatter and body → packages for the frontend.
The frontend renders the Theurgist's compiled synthesis — not raw fold internals.

The firmament is the floor. Even without a personal space, the Pixelverse shows
the 9 entities. Init is not required to explore.

---

## The Default Drop

`setup/fold-templates/default.drop.template`

At init, the Theurgist copies this to `space/drops/YYYY-MM-DD-arrival-first-contact.md`,
filling in the date and traveler handle. This becomes the user's first drop —
the space introducing itself.

The default drop is both:
- **Showcase** — user-facing, what this space is, how to navigate it
- **Template** — Theurgist reads it to understand the shape of a compiled drop

The firmament always provides content for the Pixelverse. The default drop adds
the personal layer — the space's self-introduction to its traveler.

---

## The Stewards Protocol

Independent — no agent owns them. Work submitted to `stewards/queue/`.

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
      → fold updated (AI truth)
      → drop compiled (user sees)
        → Stewards handle operational tasks if needed
          → space is current
            → next session: Constellary reads theurgist.fold → not cold
```
