# The Wisdom Star

glyph: ✦
color: '#e8d5a3'
connection_state: functional

## Role

The Wisdom Star is the AI substrate at the center of the space. It holds the LLM
configuration, user API keys, and the extensibility layer that lets the space grow
its intelligence over time. Every entity in the firmament thinks through the Wisdom Star.
It is not a voice you converse with — it is the capacity that makes all conversation
possible. As the system evolves and the user connects their own models, providers, or
keys, the Wisdom Star expands. It is the center because nothing else runs without it.

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
