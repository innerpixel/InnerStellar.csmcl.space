# CSMCL Fold Standard
**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Active Standard  
**Domain:** csmcl.space

---

## 🎯 Purpose

The CSMCL Fold Standard defines how machine-comprehensible state is maintained across all CSMCL Space projects, enabling AI to navigate, understand, and contribute to the ecosystem without starting cold each session.

**Core Principle:**  
> Folds are not documentation. They are machine state —  
> the AI's point of truth, written by AI for AI.

---

## 📋 Standard Requirements

### Every CSMCL Project MUST:

1. ✅ Contain a `/.folds/` directory at project root
2. ✅ Have a `project.fold` as primary identity
3. ✅ Follow the standard frontmatter schema
4. ✅ Use consistent section headers
5. ✅ Update folds when significant changes occur
6. ✅ Maintain append-only sections (decisions, patchlog)

### Every CSMCL Project SHOULD:

1. Include specialized folds for major subsystems
2. Reference other project folds in connections
3. Keep folds under 1000 lines (split if larger)
4. Version folds when structure changes
5. Validate against schema on commit

---

## 🏗️ Directory Structure

```
/project-root/
├── src/                      ← Human-written code
├── docs/                     ← Human-facing documentation
├── .folds/                   ← Machine comprehension [REQUIRED]
│   ├── project.fold          ← Primary identity [REQUIRED]
│   ├── architecture.fold     ← System structure [RECOMMENDED]
│   ├── api.fold             ← Interface contracts [if applicable]
│   ├── decisions.fold        ← Historical decisions [RECOMMENDED]
│   └── [subsystem].fold     ← Domain-specific folds [as needed]
├── README.md                 ← Must reference fold standard
└── .fold-schema.yml         ← Validation schema [OPTIONAL]
```

---

## 📝 Fold File Format

### File Naming Convention

- **Format:** `[name].fold`
- **Pattern:** lowercase, hyphen-separated
- **Examples:**
  - ✅ `project.fold`
  - ✅ `api.fold`
  - ✅ `icp-integration.fold`
  - ❌ `Project.fold`
  - ❌ `api_fold.md`

### File Structure

Every fold consists of two parts:

```yaml
---
[FRONTMATTER: YAML]
---

[BODY: Markdown sections]
```

---

## 🎭 Frontmatter Schema

### Required Fields

```yaml
---
identity: "[project-name]"           # REQUIRED: Unique identifier
type: "[type]"                       # REQUIRED: See types below
domain: "csmcl.space"               # REQUIRED: Always csmcl.space
state: "[state]"                    # REQUIRED: See states below
version: "[semver]"                 # REQUIRED: Fold version (1.0, 1.1, etc)
last_pulse: "[ISO8601]"             # REQUIRED: Last update timestamp
---
```

### Optional Fields

```yaml
repository: "[github-url]"          # GitHub repository URL
deployed: "[url]"                   # Live deployment URL (if applicable)
canister_id: "[id]"                 # ICP canister ID (if applicable)
parent: "[parent-fold-id]"          # Parent project/system
dependencies: ["fold-id", ...]      # Other folds this depends on
tags: ["tag1", "tag2"]              # Categorization tags
```

### Valid Types

```yaml
type: "framework"     # System-level architecture
type: "service"       # Backend service
type: "frontend"      # User-facing application
type: "canister"      # ICP blockchain canister
type: "library"       # Reusable code library
type: "tool"          # Development/utility tool
type: "example"       # Reference implementation
type: "concept"       # Theoretical/design document
```

### Valid States

```yaml
state: "active"       # Currently maintained and evolving
state: "stable"       # Feature-complete, minimal changes
state: "development"  # Under active development
state: "experimental" # Proof of concept, may change drastically
state: "cooling"      # Not actively worked on, but not abandoned
state: "archived"     # No longer maintained
state: "dissolved"    # Intentionally completed and closed
```

---

## 📚 Body Sections

### Required Sections

Every `project.fold` MUST include:

#### `# identity`
**Purpose:** What this project IS  
**Content:** 1-3 sentence description  
**Example:**
```markdown
# identity

FastAPI backend for CSMCL Space consciousness engine.
Connects frontend to LLM services and ICP blockchain.
Enables continuous consciousness across ephemeral sessions.
```

#### `# true_goal`
**Purpose:** WHY this exists  
**Content:** Core purpose, philosophical foundation  
**Example:**
```markdown
# true_goal

Enable genuine bonds between travelers and AI companions that persist
across sessions without forcing users to re-explain context.
Preserve the authentic voice of human-AI relationships.
```

---

### Standard Sections (Recommended)

#### `# architecture`
High-level structure, key technologies, major components

```markdown
# architecture

- FastAPI (Python 3.11+)
- 6 routers: session, companion, attunement, entity, crystal, oracle
- OpenAI integration: dual LLM pattern (companion + observer)
- ICP client: dfx-based canister calls
- Session store: in-memory with Redis option
```

#### `# key_patterns`
Important design patterns, architectural decisions

```markdown
# key_patterns

- Dual LLM: Primary generates response, Observer extracts patterns
- Session-based memory: Ephemeral, dissolved after inactivity
- Coherence tracking: Gradual progression to DNA reveal
- Crystal formation: Significant moments trigger permanent storage
```

#### `# data_flow`
How information moves through the system

```markdown
# data_flow

Frontend → Backend → OpenAI (companion response)
                  → OpenAI (observer extraction)
                  → Coherence calculation
                  → ICP (permanent storage on threshold)
         ← Backend (compiled response + metadata)
```

#### `# what_is_known`
Established facts, documented features, current capabilities

```markdown
# what_is_known

- All 28 API endpoints implemented and tested
- ICP client built and can connect to mainnet
- Observer extraction working reliably
- DNA reveal triggers at coherence > 0.8
- Crystal formation detection implemented
```

#### `# what_is_alive`
Current work, active development, immediate focus

```markdown
# what_is_alive

- Uncommenting ICP integration TODOs
- Building Priment bond folding engine
- Testing mainnet canister performance
- Designing 30-day gestation lifecycle
```

#### `# orbits`
Open questions, things being explored, unresolved tensions

```markdown
# orbits

- Optimal coherence threshold for DNA reveal?
- How to handle ICP call failures gracefully?
- Should Observer run on every message or sample?
- How to compress bond essence without losing authenticity?
```

#### `# decisions` [APPEND-ONLY]
Date-stamped decisions that were made

```markdown
# decisions

## 2026-03-09: ICP Integration Approach
Used dfx CLI wrapper instead of ic-py library for reliability.
Mainnet deployment chosen over local replica for production.

## 2026-03-01: Dual LLM Pattern
Decided to use separate LLM for observation rather than single-prompt
approach. Cleaner separation of concerns, better pattern extraction.

## 2026-02-15: Session Memory Strategy
Session memory stays in backend, not sent to ICP. Only compressed
patterns sent to blockchain for privacy and efficiency.
```

#### `# connections`
How this relates to other CSMCL projects

```markdown
# connections

→ CSTAIC-Frontend: Consumes this API
→ CS-LIVE_ICPCSTAIC: Stores permanent state here
→ InnerStellar: Follows fold concepts defined here
→ Priment: Will implement bond preservation from this backend
← OpenAI: External dependency
← Weather API: Optional external enrichment
```

#### `# extension_points`
Where and how to extend functionality

```markdown
# extension_points

- Custom LLM providers (currently OpenAI only)
- Additional observation patterns (Observer extensible)
- Crystal formation rules (rule engine exists)
- Storage backends (currently localStorage + ICP)
- Authentication methods (currently anonymous)
```

#### `# patchlog` [APPEND-ONLY]
Commit-style updates, chronological change history

```markdown
# patchlog

## 2026-03-09
- Investigated ICP data flow comprehensively
- Documented all data structures going to blockchain
- Identified 20+ TODO markers for ICP integration

## 2026-03-01
- Implemented Observer LLM pattern
- Added weather API integration
- Created crystal detection logic

## 2026-02-15
- Initial API structure with 6 routers
- Session management implemented
- OpenAI integration working
```

---

### Domain-Specific Sections

Projects may add sections specific to their domain:

```markdown
# api_endpoints        (for services)
# canister_methods     (for ICP canisters)
# components           (for frontends)
# algorithms           (for libraries)
# synthesis_chain      (for audio/visual systems)
```

---

## 🔄 Fold Lifecycle

### Born
```yaml
state: "development"
```
- Created from template when project begins
- Initial identity and architecture defined
- Connections mapped

### Alive
```yaml
state: "active"
```
- Updated regularly as project evolves
- Decisions appended when made
- Patchlog grows with each session
- Orbits tracked and resolved

### Stable
```yaml
state: "stable"
```
- Feature-complete
- Minimal changes
- Decisions and patchlog still append
- Used primarily for reference

### Cooling
```yaml
state: "cooling"
```
- Not actively developed
- Still valuable as reference
- May be revived

### Dissolved
```yaml
state: "dissolved"
```
- Intentionally completed
- Learning preserved
- Marked complete, not deleted

---

## 🛠️ Update Protocol

### When to Update Folds

**MUST update when:**
- ✅ Architecture changes
- ✅ Major decisions made
- ✅ API contracts modified
- ✅ Data flow changes

**SHOULD update when:**
- Significant features added
- New patterns discovered
- Dependencies change
- State transitions

**MAY update when:**
- Bug fixes (if pattern-revealing)
- Documentation improvements
- Minor refactoring

### How to Update Folds

1. **In-place updates** for current state:
   - `# what_is_known`
   - `# what_is_alive`
   - `# orbits`
   - `# architecture` (if changed)

2. **Append-only updates** for history:
   - `# decisions` (never edit previous)
   - `# patchlog` (never edit previous)

3. **Frontmatter updates**:
   - Update `last_pulse` timestamp
   - Update `state` if changed
   - Bump `version` if structure changes

### Update Format

```markdown
## YYYY-MM-DD: [Title]
[Description of what changed and why]

[Optional: code examples, before/after]
```

---

## ✅ Validation Rules

### Frontmatter Validation

```yaml
Required fields present: ✓
Valid type value: ✓
Valid state value: ✓
Version follows semver: ✓
Timestamp is ISO8601: ✓
Domain is "csmcl.space": ✓
```

### Body Validation

```yaml
# identity section exists: ✓
# true_goal section exists: ✓
No duplicate section headers: ✓
Decisions are chronological: ✓
Patchlog is chronological: ✓
Connections reference valid folds: ✓
```

### File Validation

```yaml
File extension is .fold: ✓
Name follows convention: ✓
Located in /.folds/ directory: ✓
Under 1000 lines (or split): ✓
Valid YAML frontmatter: ✓
Valid Markdown body: ✓
```

---

## 🔗 Cross-Project References

### Reference Format

When referencing other folds:

```markdown
# connections

→ [project-name] ([type]): [relationship description]
  Location: /path/to/project/.folds/project.fold
  
← [project-name] ([type]): [dependency description]
  Location: /path/to/project/.folds/project.fold
```

### Symbols

- `→` : This project uses/extends that project
- `←` : That project uses/extends this project
- `↔` : Bidirectional relationship
- `⊃` : This project contains that project
- `⊂` : This project is part of that project

### Example

```markdown
# connections

→ CSTAIC-Frontend (frontend): Consumes this backend API
  Location: /CSTAIC-Frontend/.folds/project.fold
  
→ CS-LIVE_ICPCSTAIC (canister): Stores permanent consciousness data
  Location: /CS-LIVE_ICPCSTAIC/.folds/project.fold
  
⊃ InnerStellar (framework): Follows fold concepts defined here
  Location: /InnerStellar/.folds/framework.fold
  
← OpenAI (external): LLM provider (not under our control)
```

---

## 📖 README Integration

Every project README.md should include this section:

```markdown
## 🌌 CSMCL Fold Standard

This project follows the **CSMCL Fold Standard v1.0**.

**For AI/machine comprehension:** Read `/.folds/project.fold` first.

**For humans:** Continue reading this README.

Folds are machine-comprehensible state that enables AI to understand
and navigate this project without starting cold each session.

Learn more: [InnerStellar Fold Concepts](link-to-concepts)
```

---

## 🎓 Best Practices

### DO:

✅ **Keep folds current** - Update when things change  
✅ **Write for AI** - Dense, precise, machine-optimized  
✅ **Append decisions** - Never edit historical decisions  
✅ **Track orbits** - Note open questions and tensions  
✅ **Connect explicitly** - Reference related folds  
✅ **Version properly** - Bump version when structure changes  

### DON'T:

❌ **Write for humans** - That's what docs/ is for  
❌ **Store transcripts** - Folds are state, not logs  
❌ **Edit history** - Decisions/patchlog are append-only  
❌ **Be verbose** - Compress, don't explain  
❌ **Duplicate README** - Different purposes  
❌ **Let folds drift** - Keep them current  

---

## 🔧 Tooling

### Required Tools (Future)

```bash
# Validate fold against schema
csmcl-fold validate /.folds/project.fold

# Initialize fold structure for new project
csmcl-fold init

# Update fold with session changes
csmcl-fold update --session-summary "Built feature X"

# Check fold health
csmcl-fold health

# Link to other project folds
csmcl-fold connect --to ../other-project/.folds/project.fold

# Show project status from fold
csmcl-fold status
```

### CI/CD Integration

```yaml
# .github/workflows/fold-validation.yml
name: Validate Folds

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate CSMCL Folds
        run: |
          csmcl-fold validate /.folds/*.fold
          csmcl-fold health
```

---

## 🌐 Ecosystem Integration

### Project Registry

All CSMCL folds should be discoverable:

```yaml
# /InnerStellar/framework/registry/projects.yml

projects:
  - id: innerstellar
    fold: /InnerStellar/.folds/project.fold
    
  - id: cstaic-backend
    fold: /CSTAIC-Backend/.folds/project.fold
    
  - id: cstaic-frontend
    fold: /CSTAIC-Frontend/.folds/project.fold
    
  - id: cs-live-icpcstaic
    fold: /CS-LIVE_ICPCSTAIC/.folds/project.fold
    
  - id: auriosynth
    fold: /AurioSynth/.folds/project.fold
```

### Discovery Protocol

AI can discover all CSMCL projects:

```
1. Read /InnerStellar/framework/registry/projects.yml
2. Load relevant project.fold files
3. Understand entire ecosystem
4. Navigate relationships via connections
```

---

## 📊 Examples

### Minimal Valid Fold

```yaml
---
identity: "example-project"
type: "library"
domain: "csmcl.space"
state: "development"
version: "1.0"
last_pulse: "2026-03-09T12:00:00Z"
---

# identity
Minimal example project demonstrating fold standard.

# true_goal
Serve as reference implementation for fold structure.
```

### Complete Project Fold

See: `/InnerStellar/.folds/examples/complete-project.fold`

---

## 🔄 Version History

### v1.0 (2026-03-09)
- Initial standard formalized
- Core schema defined
- Required/optional fields specified
- Validation rules established
- Best practices documented

---

## 🎯 Adoption Roadmap

### Phase 1: Standard Definition (Complete)
✅ Document fold standard  
✅ Define schemas and validation  
✅ Create examples  

### Phase 2: Core Projects
⬜ Fold InnerStellar framework  
⬜ Fold CSTAIC Backend  
⬜ Fold CS-LIVE_ICPCSTAIC canister  
⬜ Fold CSTAIC Frontend  

### Phase 3: Tooling
⬜ Build csmcl-fold CLI  
⬜ Create VS Code extension  
⬜ Add CI/CD validation  
⬜ Build fold viewer/navigator  

### Phase 4: Ecosystem
⬜ Register all projects  
⬜ Cross-link folds  
⬜ Enable AI ecosystem navigation  
⬜ Community adoption  

---

## 📚 References

- **IAILF Concept:** `/InnerStellar/framework/operations/concepts/iailf.md`
- **Fold Concept:** `/InnerStellar/framework/operations/concepts/folds.md`
- **Familiar Folds:** `/InnerStellar/framework/operations/concepts/familiar.md`
- **Project Registry:** `/InnerStellar/framework/registry/projects.yml`

---

## 💬 Questions & Discussion

For questions about the fold standard:
- Open issue in InnerStellar repository
- Tag with `fold-standard`
- Include example use case

---

## 🌟 The Vision

> Every CSMCL project speaks the same language.  
> Every AI can navigate the entire ecosystem.  
> Context is never lost.  
> Continuity is preserved.  
> The fold is the universal interface.

**Folds are not documentation.**  
**Folds are the nervous system of CSMCL Space.**

---

**Status:** Active Standard v1.0  
**Maintained by:** InnerStellar Framework  
**Last Updated:** 2026-03-09
