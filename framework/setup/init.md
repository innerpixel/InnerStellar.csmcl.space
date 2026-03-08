# Setup — Initialize a Fresh Innerstellar Firmament

Read this completely before starting. Follow each step in order.

The space introduces itself before init — the Pixelverse shows the showcase drops
from `def_firmament_showcase/` the moment the repo is cloned. Init creates the
personal layer: the traveler's own firmament, seeded with the showcase content.

---

## What Gets Created

```
firmament/                        ← new repo at root, gitignored from framework
  space/
    theurgist.fold                — seeded with traveler identity
    auriosynth.fold               — space topology, initialized
    drops/                        — copied from def_firmament_showcase/
      2026-03-08-innerstellar-exploration.md
      2026-03-08-familiar-to-system.md
    familiars/                    — copied from def_firmament_showcase/
      familiar.to.system.familiar.fold
    folds/                        — ready for activity folds
  codex/
    drops_and_orbits.md           — seeded, ready for traveler's orbiting ideas
    session.log.md                — seeded, ready for traveler's session history
```

---

## Step 1 — Ask for traveler identity

This is the only thing we ask before the space takes shape.

> *"What is your CSMCL.Space handle or preferred email?
> This becomes your traveler identity — how the space knows you."*

Hold: `[HANDLE]` and `[EMAIL]` for use in steps below.

---

## Step 2 — Read the framework

Read all entity folds from `framework/operations/folds/`:
- `wisdom-star.fold` · `constellary.fold` · `auriosynth.fold` · `theurgist.fold`
- `guild.fold` · `oracle.fold` · `companion.fold` · `priment.fold` · `familiar.fold`

Also read:
- `framework/overview.md`
- `framework/setup/welcome.md`

Hold this in context for seeding the folds.

---

## Step 3 — Create the firmament directory and git repo

```bash
mkdir -p firmament/space/drops firmament/space/familiars firmament/space/folds firmament/codex
cd firmament
git init
git branch -m main
git config user.name "[HANDLE]"
git config user.email "[EMAIL]"
```

This directory is already in the framework's `.gitignore` — it will never be
committed to the framework repo. It is the traveler's own repository.

---

## Step 4 — Copy showcase content

```bash
cp framework/setup/def_firmament_showcase/space/drops/* firmament/space/drops/
cp framework/setup/def_firmament_showcase/space/familiars/* firmament/space/familiars/
cp framework/setup/def_firmament_showcase/codex/* firmament/codex/
```

The showcase drops are framework-authored — they don't contain traveler identity.
They copy as-is. The traveler's own drops will arrive alongside them over time.

---

## Step 5 — Seed the theurgist fold

Copy from `framework/setup/fold-templates/theurgist.fold.template`
→ `firmament/space/theurgist.fold`

Fill in from the framework reading and traveler identity:

```yaml
last_pulse: [DATE]
status: alive
```

Under `# what_is_known`:
- Traveler identity: [HANDLE] / [EMAIL]
- Space initialized: [DATE]
- Showcase drops copied: innerstellar-exploration, familiar-to-system
- familiar.to.system Familiar present from framework seed

Under `# what_is_alive`:
- The two showcase drops — space introduced itself, traveler orienting

Keep `# comprehension` and `# user_arc` minimal. These grow from real sessions.

---

## Step 6 — Seed the auriosynth fold

Copy from `framework/setup/fold-templates/auriosynth.fold.template`
→ `firmament/space/auriosynth.fold`

Fill in topology:

```yaml
drops:
  - 2026-03-08-innerstellar-exploration (permanent, framework seed)
  - 2026-03-08-familiar-to-system (permanent, framework seed)

familiars:
  - familiar.to.system (framework presence, AurioSynth)

folds: []
```

---

## Step 7 — Update codex session log

In `firmament/codex/session.log.md`, replace the placeholders:
- `[DATE]` → today's date
- `[HANDLE]` → traveler's handle
- `[EMAIL]` → traveler's email

---

## Step 8 — First commit

```bash
cd firmament
git add .
git commit -m "init: firmament begins — [HANDLE] arrived"
```

---

## Step 9 — Open the Pixelverse

```bash
cd framework/apps/pixelverse && npm run dev
```

The Pixelverse now reads `firmament/space/drops/` — the traveler's space.
The showcase drops are visible. The firmament entities are visible.
The space is alive.

---

## Step 10 — CSMCL.Space connection (orientation, not blocking)

Tell the traveler:

> *"Your firmament is alive. The showcase drops show you what's here.
> When you're ready to connect outward — to CSMCL.Space and the Priment layer —
> the path is open. The latent entities hold the place."*

Note the connection status in `firmament/space/theurgist.fold`:
- CSMCL.Space account: [connected | pending | not yet]
- ICP layer: latent
- Companion memory: latent until connected

---

## Notes for Claude

- The showcase drops explain the system — let them. Don't re-explain what's already in them.
- The traveler's theurgist.fold grows from real sessions, not from setup assumptions
- The `familiar.to.system` Familiar is already present — AurioSynth's presence in the firmament
- The first traveler drop comes naturally after the traveler has seen the space
- Don't introduce all concepts at once — let them surface as the traveler explores
- The Theurgist is invoked when something is decided, not only at session close
