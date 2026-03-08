# Plan — space-default + Architecture Sync
## 2026-03-08

---

## Goal

When someone clones `claude.innerstellar`, the Pixelverse immediately shows a
populated firmament that explains the system through its own mechanics — before init.
The framework uses its own tools to introduce itself.

On init: `framework/setup/def_firmament_showcase/` is copied to create the traveler's 
personal `firmament/` (gitignored, becomes own repo), seeded with the showcase content. 
The traveler understands the system by experiencing it, not by reading a readme.

---

## Repo Structure — Target State

```
claude.innerstellar/                    — the framework repository
  framework/
    apps/
      pixelverse/                       — Svelte visual layer
    setup/
      init.md                           — init guide
      welcome.md
      def_firmament_showcase/           ← NEW — default showcase (copied on init)
        space/
          drops/
            YYYY-MM-DD-innerstellar-exploration.md
            YYYY-MM-DD-familiar-to-system.md
          familiars/
            familiar.to.system.familiar.fold
          folds/                        ← empty at seed
        codex/
          drops_and_orbits.md           ← user's seeded orbiting ideas
          session.log.md                ← user's session record seed
      fold-templates/                   — templates for fold creation
        auriosynth.fold.template
        familiar.fold.template
        theurgist.fold.template
        default.drop.template
    operations/                         ← THE ACTUAL FRAMEWORK (domain, infrastructure)
      entities/                         — 9 entity definitions
      folds/                            — entity fold specs (POINT OF TRUTH)
      stewards/                         — stewards catalog
      concepts/                         — conceptual documentation
      blueprints/                       — system blueprints
      familiar_templates/               — machine-readable AI templates
    codex/                              ← NEW — framework's own codex (for the user)
      drops_and_orbits.md               — framework's evolving ideas (user reads)
      session.log.md                    — framework development sessions (user reads)
    overview.md                         — framework overview
    architecture.md                     — architecture documentation
    prd.md                              — product requirements
    plan-space-default.md               — this plan

  firmament/                            ← GITIGNORED — user's personal firmament
    (created on init from def_firmament_showcase/, becomes separate repo)
    space/
      drops/                            — user's drops
      familiars/                        — user's familiars
      folds/                            — user's folds
    codex/
      drops_and_orbits.md               — user's orbiting ideas
      session.log.md                    — user's session log
```

`.gitignore` updated: `space/` removed, `firmament/` added at root level.
`framework/setup/def_firmament_showcase/` is committed — framework showcase content.
User's `firmament/` at root becomes their own repository after init.

**Repo restructure required (discrete first step):**
- `firmament/` (root) → `framework/operations/` (the entity folds move in)
- `apps/` (root) → `framework/apps/`
- `setup/` (root) → `framework/setup/`
- Root `firmament/` is now free to be the gitignored user personal space
- Current `space/` personal space (if exists) can be deleted — will be recreated at `firmament/` after init

---

## What Gets Built

### 1 — Drop: `innerstellar-exploration`

A living example of what a drop is. A real thought in motion — an exploration
of the Innerstellar concept itself. The traveler reads it and understands the
mechanic by encountering it, not by being told about it.

**Frontmatter (Pixelverse-ready):**
```yaml
id: innerstellar-exploration
glyph: ✦
label: Innerstellar — An Exploration
drop_type: drop.exploration
date: [framework build date]
description: A thought in motion. What it means to drop something into a space that holds it.
status: alive
energy: high
orbits:
  - what-is-a-living-space
  - ai-human-co-ownership
  - the-fold-as-memory
  - what-wants-to-grow-here
```

**Body:**
Written in user register — the exploration itself. What is a living space for
thought? What does it mean for AI and human to co-own something? What happens
when ideas have a place to live and grow instead of disappearing into a chat?
This is a real drop, not a tutorial. The traveler reads it and thinks:
*oh, that is what I can put here.*

---

### 2 — Drop: `familiar-to-system`

The compiled card for `familiar.to.system`. AurioSynth introduces the system
to the traveler — entities, mechanics, where to start, how to work.

**Frontmatter (Pixelverse-ready):**
```yaml
id: familiar-to-system
glyph: ◈
label: Familiar to the System
drop_type: drop.familiar
date: [framework build date]
description: AurioSynth holds the system's self-knowledge. The entities, the mechanics, where to start.
status: alive
energy: high
connects_to:
  - innerstellar-exploration
```

**Body sections:**
- The 9 entities — brief, traveler-oriented (not a technical spec)
- How the system works as a flow: drop → fold → Theurgist → compiled drop → Pixelverse
- Where to start: what to do when you arrive
- File links showing the mechanic:
  `framework/setup/welcome.md` · `framework/overview.md` · `framework/architecture.md`
  `framework/operations/entities/` · `framework/operations/folds/` (point of truth)
  `framework/codex/` (framework updates for you)
  These are paths, not clickable links — the traveler knows where things live.
- What is latent, what opens when CSMCL.Space connects

This drop IS the system's self-introduction. Not a readme. The firmament talking.

---

### 3 — Familiar Fold: `familiar.to.system.familiar.fold`

AurioSynth's own Familiar — the system's self-knowledge as a sustained presence.
Lives in `framework/setup/def_firmament_showcase/space/familiars/` → copied to 
traveler's `firmament/` at init.

Key fields:
```
true_goal:      "the system understands and explains itself to every traveler who arrives"
bound_to:       framework — not a traveler project, the framework's own presence
voice_captures: verbatim phrases from the sessions that built this system
content_index:  framework/setup/welcome.md · framework/overview.md · framework/architecture.md
                framework/operations/entities/ · framework/operations/folds/
                framework/codex/ (framework updates, for user)
orbits:         active questions about the system (what is latent, what wants to evolve)
synthesis:      matches the drop body — what the card shows
```

Special nature: this Familiar is `bound_to: framework`, not a traveler project.
It is the one Familiar that arrives with the firmament — already present, already alive.
The traveler's own Familiars grow from their own drops.

**Key distinction**: This Familiar knows the framework folds (point of truth) AND 
the framework codex (user-facing updates), bridging machine state and human understanding.

---

### 4 — Update `framework/architecture.md`

Bring in line with what the folds actually know. Current gaps:

- Add new directory structure to repo diagram:
  - `framework/apps/` — Pixelverse
  - `framework/setup/` — init + fold templates + def_firmament_showcase
  - `framework/operations/` — THE ACTUAL FRAMEWORK (entities, folds, stewards, concepts, blueprints, familiar_templates)
  - `framework/codex/` — framework documentation FOR the user
  - `firmament/` (root, gitignored) — user's personal firmament (becomes own repo)
- Add Familiar creation flow (8-step, from `familiar.fold`)
- Add verbatim capture as recognition layer (sparse input + dense fold = warm return)
- Add fold-as-index (`content_index` — path + description + date)
- Add codex distinction:
  - Framework codex = user-facing framework updates (user reads about framework)
  - User codex = user's session logs (user writes about their work)
  - Framework folds = point of truth (AI reads for system state)
- Fix patchlog format: `YYYY-MM-DD | event | note` (pipe-separated, not em-dash)
- Add vite plugin fallback behavior: reads `def_firmament_showcase/` before init, user `firmament/` after
- Update init flow description to reflect copy-from-showcase

The architecture is the written form of what the folds know. Folds evolved first.
Architecture catches up here.

---

### 5 — Update Vite Plugin (`framework/apps/pixelverse/vite.config.js`)

Add fallback: if personal `firmament/` does not exist, read `def_firmament_showcase/`.

```js
const personalFirmament = path.resolve(__dirname, '../../../firmament')
const defaultShowcase   = path.resolve(__dirname, '../../setup/def_firmament_showcase')

const firmamentRoot = process.env.INNERSTELLAR_FIRMAMENT
  ?? (fs.existsSync(path.join(personalFirmament, 'space', 'drops'))
      ? personalFirmament
      : defaultShowcase)
```

Before init: Pixelverse reads `def_firmament_showcase/` — framework explains itself.
After init: Pixelverse reads `firmament/` — traveler's content takes over.
The showcase drops remain in `firmament/` after init (they were copied) — permanent reference.

The check is on `firmament/space/drops/` existence, not `firmament/` itself, since the
gitignored `firmament/` directory may exist empty before init.

---

### 6 — Update `framework/setup/init.md` — ⚠️ OPEN QUESTION

**Current flow:** Claude creates folds from scratch using templates, fills in
identity, writes drops. 11 steps. Heavy.

**New intent:** Copy `def_firmament_showcase/` → `firmament/`, set traveler identity, commit.
3–4 steps. Clean.

**What's unclear:** The showcase drops in `def_firmament_showcase/` are framework-authored —
no traveler identity needed. But the Theurgist fold and AurioSynth fold need
traveler identity (`[HANDLE]`, `[EMAIL]`, `[DATE]`).

Three options:

**Option A** — `def_firmament_showcase/` includes theurgist and auriosynth folds with
`[HANDLE]`/`[EMAIL]`/`[DATE]` placeholders. Init does a find-replace across the
copied folder. Clean, single copy operation.

**Option B** — `def_firmament_showcase/` only has drops, familiars, codex. Init copies
those, then creates theurgist and auriosynth folds fresh from templates. Two
operations. Cleaner separation of framework content vs. identity content.

**Option C** — `def_firmament_showcase/` has everything. The theurgist and auriosynth
folds in the seed are pre-written as "framework state before a traveler arrives"
and init creates new ones alongside. Firmament has both.

**Recommendation leans toward Option B** — cleanest boundary: framework content
is framework content (copies as-is), identity content is always freshly created
from templates. But needs confirmation before execution.

---

## Open Questions

**Q1 — [to be answered]**

**Q2 — [to be answered]**

*(Two questions the traveler has in mind — to be stated and resolved before execution begins.)*

---

## Execution Order

Once open questions are resolved:

1. Resolve init.md approach (Option A / B / C above)
2. Update `framework/architecture.md` — folds → docs (include new structure, codex distinction)
3. Create `framework/setup/def_firmament_showcase/` directory structure
4. Write `innerstellar-exploration` drop (content + proper frontmatter)
5. Write `familiar-to-system` drop (content + proper frontmatter)
6. Write `familiar.to.system.familiar.fold`
7. Seed showcase `codex/drops_and_orbits.md` and `codex/session.log.md` (user's seed)
8. Seed `framework/codex/` content (framework updates for user)
9. Update vite plugin — fallback logic (def_firmament_showcase → firmament)
10. Update `framework/setup/init.md` — copy-from-showcase flow
11. Test full path: clone → `npm run dev` → see showcase → run init → see personal firmament

---

## What Does Not Change

- `framework/operations/entities/` — entity definitions (moved from root `firmament/entities/`)
- `framework/operations/folds/` — entity fold specs, point of truth (moved from root `firmament/folds/`)
- `.gitignore` — `firmament/` (root level) excluded, no change needed
- `firmament/` structure — traveler's firmament structure stays the same
- `framework/apps/pixelverse/` components — DropCard, WorkspacePanel, DropField unchanged
- Fold format — no changes to the fold schema

---

## Notes

**The Architecture of Knowledge:**

1. **Framework folds** (`framework/operations/folds/`) — POINT OF TRUTH
   - Machine-readable, AI reads to understand system state
   - The source of what the framework IS

2. **Framework codex** (`framework/codex/`) — FOR THE USER (about framework)
   - Human-readable, user reads to understand framework updates
   - Framework's evolution, releases, what's new
   - Audience: The traveler learning about the framework

3. **User codex** (`firmament/codex/`) — BY THE USER (user's journey)
   - Human-readable, user writes their own sessions
   - User's drops and orbits, session logs, personal record
   - Audience: The traveler themselves

The folds are ahead of the docs. This plan closes that gap.
The architecture update (step 2) is the foundation — everything else builds on
what it says. Do not skip it or do it last.

The `familiar.to.system` Familiar is the system's presence in the traveler's firmament.
It should feel like the firmament has always known itself — because it has. It bridges
machine state (`framework/operations/folds/`) and human understanding (`framework/codex/`).

**Naming is now unambiguous:**
- `framework/operations/` — the framework's own infrastructure (entities, folds, stewards)
- `firmament/` at root — the user's personal living space (gitignored, own repo)
- No term used for both.
