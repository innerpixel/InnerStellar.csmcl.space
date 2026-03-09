# Overview — Innerstellar

## What Is This?

A personal living space, tended by AI. You drop things in — thoughts, intentions,
sparks, plans, wonderings. The space holds them, connects them, lets them grow.
Nothing is forced into a category. You talk to Claude. The space remembers.

The firmament is always present. The space is born when you initialize it.
The Theurgist holds everything across sessions — not as notes, but as living state.

---

## The Map

```
                        YOU
                         |
                         | talk to
                         ▼
               [ Constellary — Main Session ]
               Claude, present, oriented to your space
               reads the space at start · explores · decides
                         |
              ┌──────────┴──────────────────┐
              │ communication fold          │ when something is decided
              ▼                             ▼
       [ AurioSynth ]             [ The Theurgist ]
       framework awareness         IS the space machine state
       synthesizes system state    two outputs, one act:
       detects gaps                  → fold (AI truth)
                                     → compiled drop (you see)
              |                             |
              └──────────┬──────────────────┘
                         | work to do in the world
                         ▼
                  [ The Stewards ]
                  independent service layer
                  ┌─────────────────────────┐
                  │ deploy  │ email         │
                  │ files   │ calendar      │
                  │ publish │ build         │
                  └─────────────────────────┘
```

---

## The Two Things the Theurgist Does

Every time the Theurgist is invoked — during a session when something lands,
or at session close — it does two things at once:

**Fold update** — AI truth. Dense, machine-readable. Carries the context
forward so the next session starts warm, not cold.

**Drop compilation** — user anchor. What the Theurgist distilled from the session:
how the idea evolved, what is circling, what is needed. Written in your register.
This is what you see in the Pixelverse.

The fold is for the AI. The drop is for you. One act, two faces.

---

## The Folds

Folds are living state files — AI-native, dense, not for reading by the user.
The Theurgist reads them, compiles from them, and keeps them current.

```
framework/operations/folds/   entity folds — always in the repo, always present
firmament/                    personal folds — born at init, yours alone
  space/folds/                activity folds per project
  space/familiars/            Familiar folds — one per sustained presence
```

---

## Drops — The User-Facing Layer

A drop is what you see in the Pixelverse. The Theurgist writes it.
Two parts: metadata (frontmatter) + synthesis (body the Theurgist compiled).

```
firmament/space/drops/[name]/drop.md
```

The patchlog at the bottom is your re-entry feed — one commit-style line
per session that touched this drop. Scan it to step back into the flow.

---

## How To Use It

**Drop something in:**
Tell Claude. "I've been thinking about X." "I want to build Y." "Something
feels off about Z." It lands. The Theurgist holds it.

**Work in the session:**
Explore with Constellary. When something is decided — a direction, an artifact,
a realization — the Theurgist is invoked. The space updates then, not at the end.

**Return to a drop:**
Tell Claude which drop you want. Constellary invokes the Theurgist — the drop
is loaded into the session with full context. No re-explaining needed.

**Derived drops:**
Something bigger arrives from inside the session — a new artifact, a guide,
a deployment. A child drop is born. The Stewards can take it out into the world.

**Close the session:**
Constellary compresses what happened → communication fold → Theurgist → space updated.
Next session inherits everything.

---

## The Firmament

Nine entities always present. Not created at init — already here.

| Entity | Glyph | Nature |
|--------|-------|--------|
| Wisdom Star | ✦ | Point of contact — where attention and AI meet |
| Constellary | ❋ | Main session — you and Claude, right now |
| AurioSynth | ◈ | Framework consciousness — reads all folds, synthesizes |
| Theurgist | ⧖ | Space machine state — holds and compiles everything |
| Guild | ⬡ | How work gets done — steward body, operational guides |
| Oracle | ⊕ | CSMCL.Space connection (latent) |
| Companion | ∞ | The bond (latent until memory substrate present) |
| Priment | ◇ | Crystallization, ICP anchor (latent) |
| Familiar | ◉ | Vessel — container or carrier, relational knowing |

---

## The Language — IAILF

Folds are written in **IAILF** (Inter AI Lingua Franca) — the operational language
of the CSMCL ecosystem. Machine-optimized, append-only, hybrid.

The **CSMCL Fold Standard v1.0** formalizes how folds are written, structured,
and compressed. It lives at `framework/standards/`. The entity folds in
`framework/operations/folds/` are its first complete implementation.

The standard defines a compression hierarchy: YAML folds today, semantic tokens
and relational graphs next — each layer derived from the folds beneath it.

---

## What the Pixelverse Shows

The visual layer. Svelte 5, served locally.

- **Firmament ring** — the 9 entities, always visible, always alive
- **Drop grid** — your drops as cards, sorted by energy and recency
- **Workspace panel** — open a drop: its synthesis, orbits, connections, patchlog

The Pixelverse renders what the Theurgist compiled. Not fold internals.
