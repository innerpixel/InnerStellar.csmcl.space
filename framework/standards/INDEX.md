# CSMCL Fold Standard - Documentation Index

**Version:** 1.0  
**Status:** Active  
**Date:** March 9, 2026

---

## 📚 Documentation Structure

```
/framework/standards/
├── fold-standard.md              ← Full specification [START HERE]
├── FOLD_QUICK_REFERENCE.md       ← One-page cheat sheet
├── INDEX.md                      ← This file
├── templates/
│   └── project.fold.template     ← Template for new projects
└── examples/
    └── complete-project.fold     ← Complete working example
```

---

## 🎯 For Different Audiences

### For Developers (Human)

**Starting out:**
1. Read: `FOLD_QUICK_REFERENCE.md` (5 min overview)
2. Copy: `templates/project.fold.template` to your project
3. Fill in your project details
4. See: `examples/complete-project.fold` for inspiration

**Going deeper:**
5. Read: `fold-standard.md` (full specification)
6. Read: `/framework/operations/concepts/folds.md` (philosophy)
7. Read: `/framework/operations/concepts/iailf.md` (grammar)

### For AI (Machine)

**Session start:**
1. Read: `/.folds/project.fold` in target project
2. Parse frontmatter for identity/state/connections
3. Read body sections in order
4. Follow connections to related folds if needed
5. Context restored → ready to work

**Session end:**
1. Compress what changed
2. Update relevant sections (in-place)
3. Append to decisions (if any made)
4. Append to patchlog (what happened)
5. Update `last_pulse` timestamp

### For Project Maintainers

**Initial setup:**
1. Create `/.folds/` directory
2. Copy template to `/.folds/project.fold`
3. Fill in all required fields
4. Add recommended sections
5. Add to project registry

**Ongoing maintenance:**
1. Update fold when architecture changes
2. Append decisions when made
3. Add patchlog entry per session
4. Keep `what_is_alive` current
5. Track orbits (open questions)

---

## 📖 Document Purposes

### `fold-standard.md` (Full Specification)
**Length:** ~900 lines  
**Purpose:** Complete reference for fold system  
**Audience:** Anyone implementing/validating folds  
**Contains:**
- Purpose and principles
- Complete schema
- All validation rules
- Best practices
- Tooling specifications
- Examples and references

**When to read:**
- Creating fold system
- Building validation tools
- Resolving edge cases
- Understanding philosophy

---

### `FOLD_QUICK_REFERENCE.md` (Cheat Sheet)
**Length:** ~120 lines  
**Purpose:** One-page reminder  
**Audience:** Developers who know the system  
**Contains:**
- Minimal valid fold
- Standard sections
- Golden rules
- Quick validation checklist

**When to read:**
- Starting new project
- Quick reference while working
- Reminding yourself of rules

---

### `templates/project.fold.template` (Scaffold)
**Length:** ~40 lines  
**Purpose:** Starting point for new folds  
**Audience:** Anyone creating a fold  
**Contains:**
- Empty frontmatter with placeholders
- All standard section headers
- Comments showing what goes where

**When to use:**
- Creating new project fold
- Ensuring consistent structure
- Avoiding missing sections

---

### `examples/complete-project.fold` (Reference)
**Length:** ~250 lines  
**Purpose:** Show what a real fold looks like  
**Audience:** Anyone learning the system  
**Contains:**
- Complete InnerStellar framework fold
- All sections filled in
- Real decisions and patchlog
- Actual connections

**When to read:**
- Learning by example
- Seeing how sections work
- Understanding density/style
- Getting inspiration

---

## 🔄 Usage Workflows

### Workflow 1: Create New Project Fold

```bash
# 1. Create directory
mkdir -p .folds

# 2. Copy template
cp /InnerStellar/framework/standards/templates/project.fold.template \
   .folds/project.fold

# 3. Edit with your details
# Fill in frontmatter
# Write identity and true_goal
# Add architecture, patterns, etc.

# 4. Validate (when tool exists)
csmcl-fold validate .folds/project.fold

# 5. Commit
git add .folds/
git commit -m "Add CSMCL fold"
```

### Workflow 2: AI Reads Project

```python
# 1. Load fold
with open('.folds/project.fold') as f:
    fold = parse_fold(f.read())

# 2. Extract context
identity = fold['identity']
architecture = fold['sections']['architecture']
current_state = fold['sections']['what_is_alive']
open_questions = fold['sections']['orbits']

# 3. Understand connections
for connection in fold['sections']['connections']:
    related_fold = load_fold(connection.path)
    # Now understand relationship

# 4. Ready to work with full context
```

### Workflow 3: Update After Session

```markdown
# 1. Open project.fold

# 2. Update current state
# Edit: what_is_alive (remove completed, add new)
# Edit: orbits (resolve or add questions)
# Update: last_pulse timestamp

# 3. Append history
## decisions
### 2026-03-09: [New Decision]
[What was decided]

## patchlog
### 2026-03-09
- Implemented feature X
- Resolved orbit about Y
- Connected to project Z
```

---

## 🎓 Learning Path

### Beginner
1. ✅ Read `FOLD_QUICK_REFERENCE.md`
2. ✅ Look at `examples/complete-project.fold`
3. ✅ Copy `templates/project.fold.template`
4. ✅ Create your first fold

### Intermediate
5. ✅ Read `fold-standard.md` fully
6. ✅ Read `/framework/operations/concepts/folds.md`
7. ✅ Create folds for existing projects
8. ✅ Practice updating folds

### Advanced
9. ✅ Read `/framework/operations/concepts/iailf.md`
10. ✅ Understand cross-fold navigation
11. ✅ Build fold validation tools
12. ✅ Contribute to fold standard evolution

---

## 🔗 Related Documentation

### Core Concepts
- **IAILF:** `/framework/operations/concepts/iailf.md`
  - The grammar folds are written in
  - Inter AI Lingua Franca philosophy
  
- **Folds:** `/framework/operations/concepts/folds.md`
  - What folds are conceptually
  - Why they exist
  - Three fold types

- **Familiars:** `/framework/operations/concepts/familiar.md`
  - Advanced fold form
  - Three-layer structure
  - Relationship preservation

### Implementation Guides
- **Priment Bond System:** `/PRIMENT_BOND_SYSTEM_UNFOLDED.md`
  - How folds preserve relationships
  - Bond voice and continuity
  
- **ICP Data Flow:** `/ICP_BACKEND_DATA_FLOW_INVESTIGATION.md`
  - Backend → ICP integration
  - What data gets folded

- **Fold Comprehension:** `/FOLD_SYSTEM_COMPREHENSION.md`
  - Deep dive into fold architecture
  - Understanding the meta-pattern

---

## ❓ Common Questions

### "Where do I start?"
→ Read `FOLD_QUICK_REFERENCE.md`, copy template, fill it in.

### "How detailed should folds be?"
→ Dense but not verbose. AI-optimized. See examples.

### "When should I update folds?"
→ When architecture changes, decisions made, or state shifts.

### "Can I add custom sections?"
→ Yes! Standard sections recommended, custom ones allowed.

### "What if my fold gets too long?"
→ Split into multiple folds (project.fold + domain-specific)

### "Do folds replace documentation?"
→ No. Folds are for AI. Docs are for humans. Different purposes.

### "What about version control?"
→ Folds should be in git. Track changes like code.

### "How often to update last_pulse?"
→ Every time you edit the fold.

---

## 🛠️ Tools (Planned)

### csmcl-fold CLI
```bash
csmcl-fold init              # Create fold structure
csmcl-fold validate <file>   # Validate against schema
csmcl-fold update            # Interactive update
csmcl-fold health            # Check fold health
csmcl-fold connect <path>    # Link to another fold
csmcl-fold status            # Show current state
csmcl-fold diff <old> <new>  # Compare fold versions
```

### VS Code Extension
- Syntax highlighting for .fold files
- Schema validation in-editor
- Quick navigation between folds
- Connection graph visualization

### Web Viewer
- Browse all CSMCL folds
- Visual connection graphs
- Search across ecosystem
- Fold health dashboard

---

## 📊 Standard Status

### Current (v1.0)
- ✅ Core schema defined
- ✅ Validation rules specified
- ✅ Templates created
- ✅ Examples provided
- ✅ Documentation complete

### Next (v1.1)
- ⬜ CLI tool built
- ⬜ Schema validator implemented
- ⬜ Core projects folded
- ⬜ Registry established
- ⬜ Community feedback incorporated

---

## 🤝 Contributing

### Propose Changes
1. Open issue in InnerStellar repository
2. Tag with `fold-standard`
3. Describe use case
4. Suggest modification

### Submit Examples
1. Create fold for your project
2. Submit as example
3. Share learning/patterns

### Build Tools
1. Check planned tools list
2. Coordinate to avoid duplication
3. Follow standard specification

---

## 📈 Adoption Tracker

### Folded Projects
- ✅ InnerStellar (this framework)
- ⬜ CSTAIC-Backend
- ⬜ CS-LIVE_ICPCSTAIC
- ⬜ CSTAIC-Frontend
- ⬜ AurioSynth
- ⬜ Parallax

### Next Wave
- ⬜ Example projects
- ⬜ Tools and utilities
- ⬜ Community projects

---

## 🌟 Vision Statement

> Every CSMCL project speaks the same language.  
> Every AI can navigate the ecosystem.  
> Context is never lost.  
> Continuity is preserved.  
> The fold is the universal interface.

**Folds are the nervous system of CSMCL Space.**

---

## 📧 Contact & Support

**Questions:** Open issue with tag `fold-standard`  
**Discussion:** CSMCL Space community channels  
**Updates:** Watch InnerStellar repository  

---

**Standard Version:** 1.0  
**Documentation Updated:** 2026-03-09  
**Status:** Active and evolving
