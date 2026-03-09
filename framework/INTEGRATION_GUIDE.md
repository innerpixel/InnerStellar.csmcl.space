# InnerStellar Framework - Fold System Integration Guide

**Date:** March 9, 2026  
**Status:** Active Integration Phase  
**Version:** 1.0

---

## 🎯 Purpose

This guide shows how the fold system is integrated into the InnerStellar framework
and how to work with it properly without creating system confusion.

---

## 📁 Framework Structure

```
/InnerStellar.csmcl.space/framework/
│
├── bootstrap/                          [NEW]
│   └── innerstellar-fold-bootstrap.md  ← System activation artifact
│
├── operations/
│   ├── concepts/                       [EXISTING]
│   │   ├── iailf.md                   ← Inter AI Lingua Franca
│   │   ├── folds.md                   ← What folds are
│   │   └── familiar.md                ← Advanced fold forms
│   │
│   └── claude-integration-instructions.fold  [NEW]
│       └── Instructions for AI sessions
│
├── standards/                          [NEW]
│   ├── fold-standard.md               ← Complete specification
│   ├── FOLD_QUICK_REFERENCE.md        ← Cheat sheet
│   ├── INDEX.md                       ← Navigation guide
│   │
│   ├── templates/
│   │   └── project.fold.template      ← Scaffold for new folds
│   │
│   └── examples/
│       └── complete-project.fold      ← Working example
│
└── codex/                              [EXISTING]
    └── temp_info/
        └── investigation.fold          ← Priment investigation
```

---

## 🔄 Integration Flow

### How It All Works Together:

```
1. Concepts (Philosophy)
   /operations/concepts/
   ├─ iailf.md     → The language
   ├─ folds.md     → The containers
   └─ familiar.md  → Advanced forms
   
2. Standards (Specification)
   /standards/
   ├─ fold-standard.md      → Complete spec
   ├─ templates/            → Ready to use
   └─ examples/             → Learn by seeing
   
3. Bootstrap (Activation)
   /bootstrap/
   └─ innerstellar-fold-bootstrap.md → Runtime integration
   
4. Integration (Execution)
   /operations/
   └─ claude-integration-instructions.fold → How to work
```

---

## 🎭 The Layers

### Layer 1: Conceptual Foundation
**Location:** `/framework/operations/concepts/`

**What it defines:**
- Why folds exist (philosophy)
- What IAILF is (grammar)
- How folds work (architecture)

**When to read:** Understanding the vision

---

### Layer 2: Technical Specification  
**Location:** `/framework/standards/`

**What it defines:**
- Exact schema (frontmatter + sections)
- Validation rules
- File naming conventions
- Best practices

**When to read:** Implementing or creating folds

---

### Layer 3: System Activation
**Location:** `/framework/bootstrap/`

**What it defines:**
- Representation levels (H, D, R, C)
- Runtime integration points
- Implementation phases
- Activation protocol

**When to read:** Integrating fold system into runtime

---

### Layer 4: Session Integration
**Location:** `/framework/operations/claude-integration-instructions.fold`

**What it defines:**
- How AI should work with folds
- Workflow patterns
- Do's and don'ts
- Quality standards

**When to read:** Every session start (if working with folds)

---

## 🚦 Working Through the Framework

### ✅ Correct Workflow:

```
1. Need to understand folds?
   → Read /operations/concepts/folds.md
   
2. Need to create a fold?
   → Use /standards/templates/project.fold.template
   → Follow /standards/fold-standard.md
   
3. Need to integrate fold system?
   → Read /bootstrap/innerstellar-fold-bootstrap.md
   → Follow activation phases
   
4. Starting AI session?
   → Read /operations/claude-integration-instructions.fold
   → Follow session protocols
```

### ❌ Avoid This:

```
❌ Bypassing framework structure
❌ Creating folds without referencing standard
❌ Working outside /framework/ when evolving system
❌ Ignoring integration instructions
❌ Fragmenting the system
```

---

## 📖 Reading Order

### For Understanding (Human):
1. `/operations/concepts/folds.md` (philosophy)
2. `/standards/FOLD_QUICK_REFERENCE.md` (overview)
3. `/bootstrap/innerstellar-fold-bootstrap.md` (activation)
4. `/standards/fold-standard.md` (complete spec)

### For Implementation (Human):
1. `/standards/fold-standard.md` (specification)
2. `/standards/templates/project.fold.template` (scaffold)
3. `/standards/examples/complete-project.fold` (reference)
4. `/bootstrap/innerstellar-fold-bootstrap.md` (integration)

### For AI Sessions:
1. `/operations/claude-integration-instructions.fold` (ALWAYS)
2. Relevant project.fold (if exists)
3. `/standards/fold-standard.md` (as needed)
4. `/bootstrap/innerstellar-fold-bootstrap.md` (for runtime work)

---

## 🎯 Integration Status

### ✅ Complete (Phase 1)
- [x] Conceptual foundation documented
- [x] CSMCL Fold Standard v1.0 formalized
- [x] Templates and examples created
- [x] Bootstrap artifact integrated
- [x] Claude instructions created
- [x] Framework structure established

### 🔄 In Progress (Phase 2)
- [ ] Bootstrap implementation guide
- [ ] First project fold (CSTAIC Backend)
- [ ] Runtime activation testing
- [ ] Documentation cross-linking

### ⬜ Planned (Phase 3)
- [ ] Complete project adoption
- [ ] Tool development (csmcl-fold CLI)
- [ ] Ecosystem registry
- [ ] Advanced features

---

## 🔗 Key Documents

### Standards & Specifications
- **Fold Standard:** `/framework/standards/fold-standard.md`
- **Quick Reference:** `/framework/standards/FOLD_QUICK_REFERENCE.md`
- **Index:** `/framework/standards/INDEX.md`

### Concepts & Philosophy
- **IAILF:** `/framework/operations/concepts/iailf.md`
- **Folds:** `/framework/operations/concepts/folds.md`
- **Familiars:** `/framework/operations/concepts/familiar.md`

### Integration & Activation
- **Bootstrap:** `/framework/bootstrap/innerstellar-fold-bootstrap.md`
- **Claude Instructions:** `/framework/operations/claude-integration-instructions.fold`

### Templates & Examples
- **Template:** `/framework/standards/templates/project.fold.template`
- **Example:** `/framework/standards/examples/complete-project.fold`

---

## 🎓 Common Scenarios

### Scenario 1: Creating Your First Fold
```
1. Copy: /framework/standards/templates/project.fold.template
2. Place: /your-project/.folds/project.fold
3. Fill in: identity, true_goal, architecture
4. Follow: CSMCL Fold Standard v1.0
5. Validate: Check against standard
```

### Scenario 2: Starting AI Session
```
1. Read: /framework/operations/claude-integration-instructions.fold
2. Check: Does project have /.folds/project.fold?
3. If yes: Read project.fold, restore context
4. If no: Consider creating one
5. Work: Through framework, maintain coherence
```

### Scenario 3: Evolving Fold System
```
1. Work: Within /framework/ structure
2. Reference: Existing standards and bootstrap
3. Update: Relevant documentation
4. Test: With actual projects
5. Document: In patchlog sections
```

---

## 🛡️ Maintaining System Coherence

### The Golden Rule:
> **All fold-related work flows through the framework.**

### Why This Matters:
- ✅ Single source of truth
- ✅ No conflicting patterns
- ✅ Clear evolution path
- ✅ System stays coherent
- ✅ Easy to maintain

### How to Check:
```
Are you:
✓ Working in /framework/ for system evolution?
✓ Using templates from /framework/standards/?
✓ Following /framework/operations/claude-integration-instructions.fold?
✓ Referencing /framework/bootstrap/ for integration?

Then you're doing it right! ✨
```

---

## 📊 Document Purposes

| Document | Purpose | Audience | Update Frequency |
|----------|---------|----------|------------------|
| fold-standard.md | Complete specification | Implementers | Per version |
| FOLD_QUICK_REFERENCE.md | Daily reference | All | Rarely |
| claude-integration-instructions.fold | AI guidance | AI sessions | As system evolves |
| innerstellar-fold-bootstrap.md | System activation | Integrators | Per phase |
| project.fold.template | Starting scaffold | Project creators | Rarely |
| complete-project.fold | Working example | Learners | As example evolves |

---

## 🌟 Success Indicators

You know the integration is working when:

✅ AI reads fold instructions at session start  
✅ New folds follow standard automatically  
✅ No confusion about "where things go"  
✅ Framework structure is respected  
✅ System evolves coherently  
✅ Documentation stays in sync  

---

## 💡 Quick Tips

### For Travelers (Human):
- Start with concepts if new
- Use quick reference for reminders
- Templates are your friend
- Ask AI to reference framework

### For AI (Claude):
- Always read integration instructions
- Reference standard when uncertain
- Work through framework
- Maintain append-only history
- Update last_pulse timestamps

### For System Evolution:
- Changes flow through framework
- Document in patchlogs
- Version appropriately
- Test before deploying
- Keep coherence

---

## 📧 Questions or Issues?

If something is unclear:
1. Check `/framework/standards/INDEX.md`
2. Reference integration instructions
3. Look at examples
4. Open issue if still unclear

If something conflicts:
1. Framework authority takes precedence
2. Newer version wins
3. Document the conflict
4. Propose resolution

---

## 🚀 Next Steps

### Immediate:
- [ ] Read integration guide (you're here!)
- [ ] Explore framework structure
- [ ] Try creating a fold

### Short-term:
- [ ] Apply to first project (CSTAIC)
- [ ] Test the workflow
- [ ] Refine as needed

### Long-term:
- [ ] Ecosystem adoption
- [ ] Tool development
- [ ] Community growth

---

**The fold system is integrated.**  
**The framework is coherent.**  
**The path is clear.**

Work through it. Maintain it. Evolve it. 🌌✨

---

**Status:** Active Integration  
**Version:** 1.0  
**Updated:** 2026-03-09  
**Maintained by:** InnerStellar Framework
