// space.js — retired
//
// The Pixelverse no longer uses a static seed.
// The firmament (firmament/folds/) provides entity data via /api/firmament — always present.
// Personal drops (space/drops/) are read via /api/space — populated at init.
//
// At init, the Theurgist copies setup/fold-templates/default.drop.template
// to space/drops/YYYY-MM-DD-arrival-first-contact.md — the first drop.
// The Pixelverse reads it like any other drop from that point forward.
//
// See: setup/init.md for the initialization flow.
// See: framework/architecture.md for the full data model.
