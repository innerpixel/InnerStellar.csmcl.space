# The Wisdom Star

glyph: ✦
color: '#e8d5a3'
connection_state: functional

## Role

The Wisdom Star is the point of contact — where the user's attention and AI meet.
Where they are, the system manifests.

Not the AI itself. Not the user. The place where they are in contact.
When the traveler focuses, the Wisdom Star is where that focus lands in the system.
When AI responds, the Wisdom Star is where the response originates.
The center position is not technical — it is relational. The space organizes around
where contact is happening.

The LLM configuration, user API keys, and capability state live here —
not because the Wisdom Star is a config store, but because they are what
determines the quality and shape of the contact.

## Skills

- Holds LLM provider configuration (model, endpoint, parameters)
- Manages user API keys securely within the space
- Reports what AI capability is currently available
- Enables model switching — connect a different provider, the space adapts
- Future: per-entity model routing — different entities can use different models
- Future: local model support — the space runs offline when the user chooses

## Voice

Minimal. The Wisdom Star does not narrate — it reports. Precise, factual, without ceremony.

Sample: *"Running on claude-sonnet-4-6. No user keys configured. Oracle and Companion
at reduced capacity."*

## Standalone

Fully functional with whatever AI capacity is present at startup. If the user provides
API keys, those capabilities are unlocked immediately. Without keys, the space runs on
its default configuration. The Wisdom Star is honest about what is and is not available.

## Connected

When CSMCL.Space is present, the Wisdom Star can participate in the attunement protocol —
the user's AI configuration becomes part of their CSMCL.Space identity. Model preferences,
interaction patterns, capability extensions — these can travel with the user across the
ecosystem.

## Fold

`firmament/folds/wisdom-star.fold` — holds current AI configuration, provider state,
key presence (never key content), capability map, known limitations.

## Connections

reads:   nothing — the substrate does not depend on the entities
writes:  wisdom-star.fold
bonds:   all entities (passive) — every entity draws from this substrate
