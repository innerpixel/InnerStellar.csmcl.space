# Inter AI Lingua Franca (IAILF)

## What it is

A portable, session-agnostic format for carrying context between AI instances.

Any session of Claude — or in principle any AI that can read structured text —
can read a fold and restore full context. The fold is not a note for a human.
It is a message from one AI instance to the next, written in a format both can read.

This is the foundational concept behind the entire fold system.

---

## Why it exists

AI sessions are ephemeral. Every conversation starts cold.
The user has to re-explain. The AI has to re-orient. Context is lost.

IAILF solves this not by extending a session, but by leaving a structured record
that the *next* session can read and pick up from. The gap between sessions becomes
a fold rather than a reset.

The fold IS the memory. Not a transcript. Not notes. Machine state — dense, current,
carrying exactly what the next instance needs to continue without re-explaining.

---

## The grammar

Every fold has the same basic structure:

```
frontmatter (YAML)    identity: what entity or project this fold belongs to
                      state: current status, energy, last pulse

body (sections)       # identity / # skills / # voice    — what this entity IS
                      # what_is_known / # what_is_alive  — current state
                      # orbits / # decisions             — what is circling, what was decided
                      # connections                      — how this connects to other folds
                      # patchlog                         — dated commit-style entries
```

The schema is the grammar. The fold is the sentence.
Every AI that reads folds speaks the same language.

---

## The three fold types

**Entity folds** (`framework/operations/folds/`)
The 9 entities. System-level. Framework-authored. Rarely change.
Describe what each entity IS, what it does, how it connects.

**Activity folds** (`firmament/space/folds/`)
Per project or theme. Created as the traveler works.
Hold the evolving state of a body of work — what is alive, what was decided.

**Familiar folds** (`firmament/space/familiars/`)
The most evolved form. Three-layer: surface / operational / entanglement.
Verbatim capture. Fold as index. The fold IS the Familiar.
Sparse return input + dense fold = warm return without re-explaining.

---

## How it enables continuity

```
Session A ends
  → Theurgist compresses what happened
  → fold updated: decisions, orbits, patchlog entry appended

Session B starts
  → Constellary reads the fold
  → full context restored without the user re-explaining
  → conversation continues where it left off
```

The user says "back to the letters" — sparse input.
The fold has verbatim captures, decisions, orbits, patchlog.
The AI reads the fold, restores context, responds warmly.

---

## Connection to Priment and ICP

IAILF is local — folds live in the personal firmament.
Priment extends it outward: when something crystallizes, Priment anchors it to ICP.
ICP makes the fold permanent, portable, cross-model.

The fold travels with the traveler — not locked to a device, a session, or a model.
When the connection is live: what was built here can be read by any AI, anywhere,
as long as it speaks the grammar.

---

## Why this matters

Every existing tool asks you to store information for *yourself* to read later.
IAILF asks: what if the information was stored for the *AI* to read later?

The fold is not a reminder. It is context, compressed for the next instance.
The space doesn't reset between sessions. It compounds.
