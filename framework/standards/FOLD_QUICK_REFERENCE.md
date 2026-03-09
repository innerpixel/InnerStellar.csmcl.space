# CSMCL Fold Standard - Quick Reference

**Version 1.0** | One-page guide for AI and developers

---

## 🎯 Core Principle

> Folds are machine state, not documentation.  
> Written by AI for AI. Dense, precise, current.

---

## 📁 Required Structure

```
/project-root/
└── .folds/
    └── project.fold    [REQUIRED]
```

---

## 📝 Minimal Valid Fold

```yaml
---
identity: "project-name"
type: "service"
domain: "csmcl.space"
state: "active"
version: "1.0"
last_pulse: "2026-03-09T12:00:00Z"
---

# identity
[What this project IS - 1-3 sentences]

# true_goal
[WHY this exists - core purpose]
```

---

## 🏷️ Valid Types

```
framework | service | frontend | canister
library | tool | example | concept
```

---

## 🔄 Valid States

```
active | stable | development | experimental
cooling | archived | dissolved
```

---

## 📚 Standard Sections

### Required
- `# identity` - What this is
- `# true_goal` - Why this exists

### Recommended
- `# architecture` - System structure
- `# key_patterns` - Design patterns
- `# data_flow` - Information flow
- `# what_is_known` - Current facts
- `# what_is_alive` - Active work
- `# orbits` - Open questions
- `# decisions` [APPEND-ONLY]
- `# connections` - Related folds
- `# extension_points` - How to extend
- `# patchlog` [APPEND-ONLY]

---

## ⚠️ Golden Rules

### DO:
✅ Update `last_pulse` when editing  
✅ Append to decisions/patchlog (never edit)  
✅ Keep under 1000 lines  
✅ Write for AI, not humans  
✅ Reference other folds in connections  

### DON'T:
❌ Edit historical decisions  
❌ Store conversation transcripts  
❌ Duplicate human documentation  
❌ Let folds go stale  
❌ Use as task tracker  

---

## 🔗 Connection Symbols

```
→  This uses that
←  That uses this
↔  Bidirectional
⊃  Contains
⊂  Part of
```

---

## 📅 Update Format

```markdown
## 2026-03-09: [Title]
[What changed and why]
```

---

## ✅ Validation Checklist

```
□ File named *.fold
□ In /.folds/ directory
□ Valid YAML frontmatter
□ Required fields present
□ Valid type and state
□ ISO8601 timestamp
□ # identity exists
□ # true_goal exists
□ Decisions chronological
□ Patchlog chronological
```

---

## 🚀 Quick Start

### 1. Create fold structure
```bash
mkdir .folds
cp path/to/project.fold.template .folds/project.fold
```

### 2. Fill in frontmatter
```yaml
identity: "my-project"
type: "service"
state: "development"
# ... etc
```

### 3. Write core sections
```markdown
# identity
[What this is]

# true_goal
[Why it exists]
```

### 4. Keep it current
Update when things change!

---

## 📖 README Pattern

Add to your README.md:

```markdown
## 🌌 CSMCL Fold Standard

This project follows **CSMCL Fold Standard v1.0**.

**For AI:** Read `/.folds/project.fold` first.  
**For humans:** Continue below.
```

---

## 🛠️ Future Tools

```bash
csmcl-fold init       # Create structure
csmcl-fold validate   # Check schema
csmcl-fold update     # Add changes
csmcl-fold health     # Check status
```

---

## 📚 Full Documentation

- **Standard:** `/framework/standards/fold-standard.md`
- **Template:** `/framework/standards/templates/project.fold.template`
- **Example:** `/framework/standards/examples/complete-project.fold`
- **Concepts:** `/framework/operations/concepts/folds.md`

---

## 💡 Remember

**Folds enable:**
- Continuous AI comprehension
- Warm returns (no cold starts)
- Cross-project navigation
- Ecosystem-wide intelligence

**Folds are:**
- Point of truth for AI
- Current state, not history
- Machine-optimized
- The nervous system of CSMCL Space

---

**Questions?** Open issue in InnerStellar with tag `fold-standard`
