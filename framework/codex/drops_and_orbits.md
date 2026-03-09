# Framework Drops and Orbits

The framework's own evolving ideas. What is circling, what wants to land next.
Audience: travelers who want to understand where the framework is going.

## Orbiting

- **Pixelverse — Familiar card rendering** — Familiar drops (`drop_type: drop.familiar`) may want a distinct card style from plain drops. Not blocking. Holds the place.
- **CSMCL.Space connection** — when a traveler connects their account, Oracle, Companion, and Priment activate. The activation flow isn't implemented yet.
- **Stewards queue — execution path** — the queue format is defined but nothing picks work up from it. The missing wire: what does a submitted steward task actually trigger? A parallel agent? A CLI command? An MCP tool? The concept is right (background maintenance while main session flows), the mechanism doesn't exist yet.
- **Maintenance agent pattern** — surfaced 2026-03-09: sessions need a way to detect minor inconsistencies and delegate fixes without interrupting the main flow. "Detect consensus, delegate through proper channels." This is Stewards + a trigger mechanism. Minor fold bugs (like the familiar content_index broken link), stale last_pulse, naming collisions — these could be queued and fixed by a parallel agent while the traveler and Constellary stay in creative flow.
- **Meta vs. personal session distinction** — framework development sessions and personal use sessions currently bleed together. Framework work goes to framework/codex, personal discoveries should land in firmament drops, but mixed sessions (like the integration session) have no clean separation protocol. A Theurgist pattern for explicitly routing: "this goes to the framework" vs. "this goes to your space" would help distillation accuracy.
- **Personal space distillation gap** — rich sessions where framework work dominates leave the personal firmament thin. The traveler's own realizations, project intentions, and perspective shifts don't make it into drops. A session-close protocol that asks "what moved for *you* today" before closing would help.
