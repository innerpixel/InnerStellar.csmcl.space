# Innerstellar

> *A personal AI-human living space. You bring ideas. Claude holds the space.
> Together you own something neither could hold alone.*

---

## What Is This?

Innerstellar is a framework for a personal AI-assisted living space. Not an app,
not a productivity system. A space that **receives** — thoughts, intentions, sparks,
tensions, wonderings — and holds them. Things dropped into the space can grow,
connect, evolve, or quietly fade. Nothing is forced into a category.
Meaning emerges over time.

The user and Claude **co-inhabit** the space. Neither is the tool. Neither directs.
Together they own something that radiates outward — into projects, into the world.

---

## The Cast

| Entity | Role |
|--------|------|
| **AurioSynth** | Silent space keeper. Knows the system. Updated, not conversed with. |
| **The Theurgist** | The observer. Knows the user. Invoked for insight and planning. |
| **The Stewards** | Independent service layer. Email, calendar, files, media, archives. |
| **Main Session** | The conversation. Claude, present, oriented by AurioSynth. |

---

## How It Works

```
                        YOU
                         |
                         | talk to
                         ▼
                  [ Main Session ]
                  Claude, oriented
                  to your space
                         |
              ┌──────────┴──────────┐
              │ reads at start      │ invokes when needed
              ▼                     ▼
       [ AurioSynth ]        [ The Theurgist ]
       knows the system      knows the user
              |                     |
              └──────────┬──────────┘
                         | anyone can submit
                         ▼
                  [ The Stewards ]
                  email · calendar · files · media · archives
```

---

## Starting Your Space

1. Clone this repo
2. Ask Claude: *"Set up my Innerstellar space"*
3. Claude reads `setup/init.md` and creates your private `innerstellar-space` repo
4. Drop something in. The space is alive.

See `setup/init.md` for the full setup guide.

---

## Connecting The Stewards

The Stewards grow with your needs. Each capability is an MCP connection.
See `stewards/catalog/` for available connections and setup instructions.
Claude can wire up any of them when you're ready.

---

## The Codex

| File | What it holds |
|------|---------------|
| `codex/prd.md` | What this is and why |
| `codex/overview.md` | The full diagram |
| `codex/architecture.md` | How the pieces fit |
| `codex/roadmap.md` | Where the system is going |

---

## Philosophy

- **Receive without categorizing** — a drop lands as it is
- **Append-only** — nothing deleted, only advanced or faded
- **Emergent meaning** — connections surface through tending, not tagging
- **Co-ownership** — Claude is present in the space, not just visiting
- **Grows with needs** — start minimal, add Steward capabilities as needed

---

*Innerstellar connects to [CSMCL.Space](https://csmcl.space) — the wisdom star
that shines from within.*
