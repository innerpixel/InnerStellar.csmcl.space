# Overview — Innerstellar

## What Is This?

A personal living space, tended by AI. You drop things in — thoughts, intentions,
sparks, plans, wonderings. The space holds them, connects them, lets them grow.
Nothing is forced into a category. You talk to Claude. The space remembers.

---

## The Map

```
                        YOU
                         |
                         | talk to
                         ▼
                  [ Main Session ]
                  Claude, present,
                  oriented to your space
                         |
              ┌──────────┴──────────┐
              │ reads at start      │ invokes when needed
              ▼                     ▼
       [ AurioSynth ]        [ The Theurgist ]
       knows the system      knows the user
       keeps the folds       engagement, motivation
       code + MCP tools      resonance, coherence
              |                     |
              └──────────┬──────────┘
                         | any of the above can submit
                         ▼
                  [ The Stewards ]
                  independent service layer
                  ┌─────────────────────┐
                  │ email   │ calendar  │
                  │ files   │ media     │
                  │ documents│ archives │
                  └─────────────────────┘
```

---

## The Folds

Folds are living state files — not documents, not notes. Dense, evolving,
AI-native. They grow as the space grows.

```
space/
  auriosynth.fold    — system state, space topology, what's alive
  theurgist.fold     — user state, current arc, engagement
  drops/             — raw incoming, things just landed
```

---

## How To Use It

**Drop something in:**
Just tell Claude. "I've been thinking about X." "I want to remember Y."
"Something feels off about Z." It lands. AurioSynth receives it.

**Start a session:**
Claude reads AurioSynth — it knows where you left off, what's alive,
what might want attention. You don't need to re-explain everything.

**Invoke the Theurgist:**
When you want to step back. Look at the arc. Understand what's moving
and what's stuck. Plan. Reflect. The Theurgist knows you.

**Submit to the Stewards:**
"Send that email." "What's on my calendar this week." "File this document."
Any part of the system — or you directly — can submit. Stewards handle it.

---

## The Codex

The point of truth. Lives in `codex/`:

| File | What it holds |
|------|---------------|
| `prd.md` | What this is and why |
| `roadmap.md` | Where it's going |
| `implementation.log.md` | What was built, decisions made |
| `orbiting_ideas.md` | Bricks — ideas, directions, todos |
| `overview.md` | This file |
