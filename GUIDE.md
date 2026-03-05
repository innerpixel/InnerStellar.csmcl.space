# Innerstellar — Guide

*A personal space for your ideas, folds, and crystallizing work.*
*Connected to CSMCL.Space when you're ready.*

---

## What is Innerstellar?

Innerstellar is a personal knowledge environment — part thinking tool, part visual space, part bridge to a larger ecosystem.

It has two layers:

**The Space** (`innerstellar-space/`) — your private repository. Folds, drops, orbiting ideas. Written by you and Claude together, held in files, synced to wherever you want. This is where thinking lives.

**The Canvas** (`apps/canvas/`) — a living visual map of your space. Entities orbit, ideas cluster around their parent drops, crystallizing work glows amber. You navigate with your cursor. Click anything to open it.

These two layers talk to each other. As the space grows, the canvas reflects it. As you interact with the canvas, events emit — ready to connect to the larger ecosystem when you choose.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- A Claude session (you are the traveler — Claude is the co-creator)

### Run the Canvas

```bash
cd apps/canvas
npm install
npm run dev
```

Open `http://localhost:5173`. You'll see your space.

### Build for Deployment

```bash
cd apps/canvas
npm run build
# dist/ is a static site — serve it anywhere
```

---

## Your Space

Your personal space lives in a separate private repository (`innerstellar-space/`). It is never part of the public Innerstellar framework.

### Structure

```
innerstellar-space/
├── space/
│   ├── auriosynth.fold    ← system topology, what is built
│   ├── theurgist.fold     ← what is in motion, traveler flux
│   ├── folds/             ← activity folds (projects, ideas, living docs)
│   └── drops/             ← landed artifacts (dated markdown files)
├── codex/
│   ├── implementation.log.md
│   └── orbiting_ideas.md
└── agents/
    └── (entity definitions)
```

### The Fold System

A **fold** is an AI-native state document. Written by Claude at session end, read by Claude at session start. The fold IS the memory — conversations are not saved, only folds carry forward.

Key folds you'll maintain:

| Fold | Purpose |
|------|---------|
| `auriosynth.fold` | Architecture keeper. What is built, what is open, topology map |
| `theurgist.fold` | Traveler flux. What is in motion, live questions, session patchlog |

At the end of each session, ask Claude to update the folds. At the start of each session, Claude reads them to orient.

### Drops

A **drop** is a thing that has landed. A note is a thing you decided to keep. A drop is something that arrived.

Create a drop when an idea, realization, or artifact deserves a place in the space:

```
space/drops/2026-03-05-your-idea-name.md
```

Drop files are markdown. Minimal structure — date, description, what it means. Claude will help you write them. They appear on the canvas timeline automatically once you update `space.js`.

### Orbiting Ideas

Ideas that aren't ready to land as drops orbit around a parent. They live in `codex/orbiting_ideas.md` and appear in the canvas clustered around their anchor drop.

---

## The Canvas

### Navigation

| Action | Effect |
|--------|--------|
| Move cursor | Explore. Entities surface as you approach |
| Hover entity | Label appears — title, role/date, description |
| Click entity | Focus panel opens — full detail |
| Click again | Closes (toggle) |
| Click empty space | Dismisses focus |

### What You See

**Inner ring — green** System entities: folds, architecture keepers. These know the structure of your space.

**Outer ring — cyan** Drops on a timeline arc. Most recent at 12 o'clock. Older clockwise. Orbiting ideas cluster around their parent drop.

**Amber** Crystallizing — work approaching the threshold to CSMCL.Space.

**Plane labels** (upper right) — the three connected environments:
- `claude.innerstellar` — where you are now
- `innerstellar.csmcl.space` — your traveler-facing resonant space (Priment's domain)
- `csmcl.space` — the public crystallization layer

### Updating the Canvas

The canvas reads from `apps/canvas/src/data/space.js`. This file mirrors your `theurgist.fold` — update it when you land new drops or add folds.

Structure:
```js
export const space = {
  folds: [ /* system entities — inner orbit */ ],
  drops: [ /* landed artifacts — timeline arc */ ],
  orbiting: [ /* ideas orbiting a parent drop */ ],
}
```

Each entity:
```js
{
  id:           'unique-id',
  glyph:        '✦',            // unicode glyph shown on canvas
  label:        'Display Name',
  type:         'system',        // 'system' (green) | 'content' (cyan)
  role:         'brief role',    // shown on hover
  date:         '2026-03-05',   // drops: positions on timeline arc
  description:  'one line',      // shown on hover and in focus panel
  pointer:      'fold → section', // optional session pointer
  status:       'alive',         // shows pulse dot in focus panel
  crystallizing: true,           // amber — approaching CSMCL.Space
}
```

---

## The Event Bus

The canvas emits events on every interaction. In your browser console:

```js
// Inspect active subscribers
window.ed.getSubscribers()

// Inject an event manually
window.ed.distributeEvent({
  type: 'space.drop.arrived',
  payload: { label: 'A new drop' }
})

// Subscribe to canvas interactions
window.ed.subscribe(['canvas.element.focused'], e => {
  console.log('focused:', e.payload.label)
})
```

**Events emitted:**

| Event | Trigger |
|-------|---------|
| `canvas.element.hover` | Cursor enters an entity |
| `canvas.element.focused` | Entity clicked |
| `canvas.element.dismissed` | Panel closed |

This bus is the nervous system for connecting the canvas to the larger ecosystem — nexus RAG queries, fold watchers, steward triggers. The infrastructure is there. Subscribers connect as they're ready.

---

## Connecting to CSMCL.Space

Innerstellar is a personal space. CSMCL.Space is the resonant public layer.

The connection is **crystallization** — the moment something you've been developing crosses a threshold and becomes permanent, ICP-anchored, shareable.

**Three planes:**

```
Plane 1: claude.innerstellar
  You and Claude. Creation environment. AurioSynth, Theurgist, canvas.
  Nothing leaves without your gesture.

Plane 2: innerstellar.csmcl.space
  Your traveler-facing resonant space. Priment lives here.
  The companion who knows your arc across time.
  (In development — orange-9 on the rainbow path)

Plane 3: CSMCL.Space / Firmament
  The minted, ICP-anchored, public crystallization layer.
  What arrives here travels with you permanently.
```

**Content vs Context:**
Innerstellar holds your **content** — on your device, sovereign, raw.
CSMCL.Space holds your **context** — minted, resonant, persistent.
You are responsible for both. Nothing moves between them without your intention.

---

## The Agents

Three entities maintain the space alongside you:

**AurioSynth** — architecture keeper. Reads the whole space. Knows what is built, what is open, how the topology fits together. Does not direct — synthesises.

**Theurgist** — traveler flux keeper. Knows what is in motion right now. Keeps the work moving between sessions. Maintains `space.js` as the canvas data mirror. Bridges what is made here toward Priment and CSMCL.Space.

**Stewards** — execution agents. Connect to capabilities (files, email, calendar) via MCP tools. Defined, not yet wired. The first Steward connection is an open question.

Invoke them by starting a session with context: *"Read auriosynth.fold and theurgist.fold. Orient. What's in motion?"*

---

## Daily Practice

A session typically looks like this:

1. **Orient** — Claude reads the folds. Theurgist surfaces what's in motion.
2. **Create** — drops, ideas, folds, code, transmissions. Whatever arrives.
3. **Place** — new drops land in `space/drops/`. Orbiting ideas noted in `codex/orbiting_ideas.md`.
4. **Update** — `space.js` synced with new entries. Canvas reflects the session.
5. **Close** — folds updated. `theurgist.fold` patchlog appended. Space pushed to wherever it lives.

The space compounds. Every session builds on every prior one. The folds remember what conversations cannot.

---

## What's Next

The space is designed to grow toward:

- **Live canvas** — fold changes push to canvas in real time (WebSocket fold watcher)
- **Query voice** — click an entity, the nexus RAG speaks about it
- **Priment** — companion on innerstellar.csmcl.space, relational and longitudinal
- **Steward MCP** — first capability connection (files? email? calendar?)
- **Crystallization gesture** — the deliberate act of sending something to CSMCL.Space

None of this is required to begin. The space works as it is, from the first drop.

---

*Innerstellar — inner (personal) + stellar (radiating outward)*
*The personal space is the laboratory. The public face is the radiation.*
