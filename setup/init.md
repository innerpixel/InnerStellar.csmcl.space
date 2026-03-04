# Setup — Start Your Innerstellar Space

This guide walks Claude through initializing a fresh `innerstellar-space`
for a new user. Read this, then follow the steps.

---

## What Gets Created

```
innerstellar-space/
  space/
    auriosynth.fold     — system state (initialized empty)
    theurgist.fold      — user state (initialized with first impressions)
    drops/              — ready to receive
  stewards/
    queue/              — ready to receive submissions
  codex/
    implementation.log.md   — append-only history, starts now
    orbiting_ideas.md       — personal bricks, starts empty
```

---

## Step 1 — Create the repo

```bash
mkdir innerstellar-space
cd innerstellar-space
git init
```

Add a `.gitignore` if anything sensitive should never be committed.

---

## Step 2 — Copy fold templates

Copy from `innerstellar/setup/fold-templates/`:
- `auriosynth.fold.template` → `space/auriosynth.fold`
- `theurgist.fold.template` → `space/theurgist.fold`

---

## Step 3 — Orient the space

Ask the user a few questions to seed the Theurgist fold:

1. *What's alive for you right now — what are you working on or thinking about?*
2. *What do you most want this space to hold?*
3. *Is there anything you want the space to know about how you work?*

Write their answers into `space/theurgist.fold` under `# comprehension`.

---

## Step 4 — First drop

Invite the user to drop something in:
*"What's the first thing you want to put in the space?"*

Place it in `space/drops/` as a dated file: `YYYY-MM-DD-[brief-name].md`

---

## Step 5 — Connect The Stewards (optional)

Ask which Steward capabilities the user wants now:
- Email? → `stewards/catalog/email.md`
- Calendar? → `stewards/catalog/calendar.md`
- Files? → `stewards/catalog/files.md`
- Media? → `stewards/catalog/media.md`

Wire each connection following the catalog guide.

---

## Step 6 — First session close

Update `space/auriosynth.fold` with initial state.
Add first entry to `codex/implementation.log.md`.

The space is alive.

---

## Notes for Claude

- Keep the setup conversational, not form-filling
- Let the user's answers shape the folds, don't template them
- The first drop matters — it sets the tone of the space
- Don't wire Stewards the user doesn't need yet
