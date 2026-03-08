# Drops

## What a drop is

Something that arrived. Not something you decided to keep — something that landed.

A thought mid-conversation. A direction that felt worth holding. A realization.
A question without an answer yet. An intent that isn't a task yet.

You tell Claude. It lands. The Theurgist holds it. The Pixelverse shows it.
You come back when you're ready — or you don't. Either is fine.

---

## Why "drop"

Drops fall. They arrive without being asked.
They don't need to know what they are before they land.

This is the opposite of every existing tool that asks you to classify before you store.
A drop resists premature categorization. It lands as what it is.
The space holds it without demanding it become something else.

---

## The drop as package

A drop file has two parts, one file:

```
frontmatter (YAML)    metadata — id, glyph, label, drop_type, date
                      description, status, energy
                      orbits (list of circling ideas)
                      patchlog (re-entry feed)
                      connects_to (other drops)

body (Markdown)       synthesis — what the Theurgist compiled
                      how the idea arrived, what is circling, what is needed
                      written in the traveler's register
                      this is what you actually read
```

The frontmatter is the envelope — what the system reads.
The body is the letter — what the traveler reads.

---

## Drop vs fold

The drop is the user-facing surface. The fold is the AI's held state.

```
fold     → AI truth. Dense. Not for the traveler to read.
drop     → Compiled distillation. For the traveler. Rendered in the Pixelverse.
```

Every drop has a corresponding fold (or lives within one).
The Theurgist reads the fold and writes the drop. One act, two faces.

The traveler never reads the fold directly. They read what the Theurgist made from it.

---

## The patchlog — re-entry feed

At the bottom of every drop body, the patchlog:

```yaml
patchlog:
  - 2026-03-08 | seed | arrived — a question about what a living space could be
  - 2026-03-09 | session | direction found, the fold concept clarified
  - 2026-03-10 | session | derived drop born: the familiar concept
```

Not a status log. A re-entry feed.
The traveler scans it and steps back into the flow — no re-explaining needed.
One line per session. Commit-style. Dated.

---

## Drop types

```
drop.exploration    — a thought in motion, a question being held
drop.familiar       — compiled card for a Familiar
drop.arrival        — system drop, permanent, space introducing itself
drop.content        — general content drop (default)
drop.derived        — born from another drop during a session
```

The `drop_type` field tells the Pixelverse how to render the card.
It tells the Theurgist what kind of holding this needs.

---

## The drop lifecycle

```
Arrives    — something lands, Theurgist creates the drop file
Alive      — visited, orbits evolving, patchlog growing
Orbiting   — not the center of attention but still circling
Drifting   — cooling, less energy, not visited
Dissolved  — traveler releases it; fold marked, learning noted
```

Drops don't expire automatically. They cool. They drift. They wait.
The traveler decides when something is done.

---

## Derived drops

A drop can give birth to another drop during a session.

```yaml
parent: [parent-drop-id]
deploy_to: [path]      # if a Steward should take it somewhere
deployed: [DATE]       # confirmed after execution
```

The parent's patchlog records the child's birth.
The child's fold records its origin.
The space knows the lineage.

---

## The showcase drops

`framework/setup/def_firmament_showcase/space/drops/` contains two permanent drops
that arrive with every initialized firmament:

- `innerstellar-exploration` — what a drop is, experienced as a drop
- `familiar-to-system` — AurioSynth's self-introduction

These are framework-authored. They don't drift. They are the floor.

See also: `folds.md`, `familiar.md`
