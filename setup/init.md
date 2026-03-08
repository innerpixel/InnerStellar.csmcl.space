# Setup — Initialize a Fresh Innerstellar Space

Read this completely before starting. Follow each step in order.

The space introduces itself. No questions about what you want to build yet.
The space reads what it already contains — 8 entity folds, framework docs —
and shows the traveler what they've arrived into.

---

## What Gets Created

```
space/                   ← new repo, gitignored from framework
  space/
    theurgist.fold       — seeded from firmament (not from user answers)
    auriosynth.fold      — space topology, initialized
    drops/
      YYYY-MM-DD-arrival-first-contact.md  — system drop, permanent
    folds/               — ready for activity folds
    familiars/           — ready for project presences
  codex/
    drops_and_orbits.md  — orbiting ideas, starts empty
    session.log.md       — append-only session history, starts now
```

---

## Step 1 — Create the space directory

```bash
mkdir -p space/space/drops space/space/folds space/space/familiars space/codex
cd space
git init
git branch -m main
```

This directory is already in the framework's `.gitignore`.
It will never be committed to the framework repo.

---

## Step 2 — Set git identity

The space repo uses the traveler's CSMCL.Space identity.
Ask the traveler:

> *"What is your CSMCL.Space handle or preferred email?
> This becomes your traveler identity — how the space knows you."*

```bash
git config user.name "[handle]"
git config user.email "[handle@csmcl.space or preferred email]"
```

This is the **only** thing we ask before the space shows itself.

---

## Step 3 — Read the firmament

Read all 8 entity folds from `firmament/folds/`:

- `wisdom-star.fold`
- `constellary.fold`
- `auriosynth.fold`
- `theurgist.fold`
- `guild.fold`
- `oracle.fold`
- `companion.fold`
- `priment.fold`

Also read:
- `framework/overview.md`
- `framework/architecture.md`
- `setup/welcome.md`

Hold this in context for the next steps.

---

## Step 4 — Create the arrival drop

Copy from `setup/fold-templates/arrival-first-contact.md`
→ `space/space/drops/YYYY-MM-DD-arrival-first-contact.md`

Fill in:
- `[DATE]` → today's date
- `[HANDLE]` → traveler's chosen name
- `[EMAIL]` → traveler's email/identity

This drop is system-generated. It is the space introducing itself.
It is permanent — `status: permanent`, never drifts, never dissolves.

---

## Step 5 — Seed the theurgist fold

Copy from `setup/fold-templates/theurgist.fold.template`
→ `space/space/theurgist.fold`

Seed from what the firmament reading revealed — not from user answers.
Fill in:

```yaml
last_pulse: [DATE]
status: alive
```

Under `# what_is_known`:
- Traveler identity (handle, email)
- Space initialized: [DATE]
- Arrival drop created

Under `# what_is_alive`:
- The arrival drop — space just born, traveler orienting

Leave `# comprehension` and `# user_arc` minimal at init.
These grow from real sessions, not from assumptions.

---

## Step 6 — Seed the auriosynth fold

Copy from `setup/fold-templates/auriosynth.fold.template`
→ `space/space/auriosynth.fold`

Fill in topology:

```yaml
drops:
  - YYYY-MM-DD-arrival-first-contact (permanent, system)

folds: []
familiars: []
```

---

## Step 7 — Initialize codex

Create `space/codex/drops_and_orbits.md`:
```markdown
# Drops and Orbits
Orbiting ideas not yet dropped. Nothing here yet — space just born.
```

Create `space/codex/session.log.md`:
```markdown
# Session Log

## YYYY-MM-DD — Session 1: Arrival

- Space initialized
- Identity: [handle] / [email]
- Arrival drop created from firmament reading
- Pixelverse seed updated
```

---

## Step 8 — Update space.js

Update `apps/pixelverse/src/data/space.js` to reflect the arrival drop.

The arrival drop is the seed. The Pixelverse opens to the space introducing itself.
One drop card. The 8 entities as orbits. Key concepts as orbits.

See: `setup/fold-templates/space.js.seed.md` for the arrival seed structure.

(The Theurgist will keep space.js current after this — updated at session close
as new drops arrive and Familiars are created.)

---

## Step 9 — First commit

```bash
cd space
git add .
git commit -m "init: space begins — arrival drop seeded from firmament"
```

---

## Step 10 — Open the Pixelverse

```bash
cd apps/pixelverse && npm run dev
```

The space introduces itself. The traveler sees what they've arrived into.
The arrival drop is open in the workspace panel. 8 entities visible as orbits.
Welcome and guide linked.

From here: the traveler explores. When something wants to drop in, it does.

---

## Step 11 — CSMCL.Space connection (orientation, not blocking)

Tell the traveler:

> *"Your space is alive. The arrival drop shows you what's here.
> When you're ready to connect outward — to CSMCL.Space and the Priment layer —
> the path is open. The latent entities hold the place."*

Note the connection status in `theurgist.fold`:
- CSMCL.Space account: [connected | pending | not yet]
- ICP layer: latent
- Companion memory: latent until connected

---

## Notes for Claude

- The arrival drop is the introduction — let the space speak first
- The traveler's theurgist.fold grows from real sessions, not from setup assumptions
- space.js is a living seed — Theurgist keeps it current, not a static file
- The `familiars/` directory is empty at init — Familiars grow from drops over time
- The first user drop comes naturally after the traveler has seen the space
- Don't introduce all concepts at once — let them surface as the traveler explores
