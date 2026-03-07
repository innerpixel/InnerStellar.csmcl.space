import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs'
import path from 'path'

// ── Space + Firmament reader plugin ───────────────────────────────────────
// /api/firmament — reads innerstellar/firmament/folds/ (framework, always present)
// /api/space     — reads innerstellar/space/ (personal, traveler content — gitignored)
// Parses YAML front matter including nested objects and arrays (drop.fold format).

function parseYamlFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const result = {}
  let ctx = null  // current top-level key being accumulated

  match[1].split('\n').forEach(line => {
    if (!line.trim()) return

    const indent = line.search(/\S/)

    if (indent === 0) {
      const colon = line.indexOf(':')
      if (colon === -1) return
      const key = line.slice(0, colon).trim()
      const val = line.slice(colon + 1).trim()
      ctx = key
      if (val === '[]') {
        result[key] = []
        ctx = null           // inline empty array — no nested lines
      } else if (val === '') {
        result[key] = null   // nested lines will fill this
      } else {
        result[key] = val.replace(/^["']|["']$/g, '')
        ctx = null
      }
    } else if (indent >= 2 && ctx !== null) {
      const trimmed = line.trim()
      if (trimmed.startsWith('- ')) {
        // Array item
        if (!Array.isArray(result[ctx])) result[ctx] = []
        result[ctx].push(trimmed.slice(2))
      } else if (indent === 2) {
        // Nested object property (skip deeper nesting — e.g. promotion_rules.crystallize_when)
        const colon = trimmed.indexOf(':')
        if (colon === -1) return
        const key = trimmed.slice(0, colon).trim()
        const val = trimmed.slice(colon + 1).trim()
        if (result[ctx] === null || Array.isArray(result[ctx])) result[ctx] = {}
        result[ctx][key] = val.replace(/^["']|["']$/g, '')
      }
      // indent > 2, not an array item: sub-sub-object — skip (not needed for canvas)
    }
  })

  return result
}

function glyphFor(id) {
  const glyphs = {
    'wisdom-star': '✦', constellary: '❋',
    auriosynth: '◈', theurgist: '⧖',
    guild: '⬡', oracle: '⊕',
    companion: '∞', priment: '◇',
    innerstellar: '✦', 'three-planes': '⊛',
  }
  return glyphs[id] ?? '✶'
}

// ── Firmament reader ───────────────────────────────────────────────────────
// Reads innerstellar/firmament/folds/ — the system's entity definitions.
// These are framework bones: always present, independent of the personal space.

const ENTITY_ORDER = ['wisdom-star', 'constellary', 'auriosynth', 'theurgist', 'guild', 'oracle', 'companion', 'priment']
const CONNECTION_STATE_ENERGY = { functional: 1.0, 'cross-plane': 1.0, latent: 0.5 }

function readFirmamentData(firmamentRoot) {
  const foldsDir = path.join(firmamentRoot, 'folds')
  if (!fs.existsSync(foldsDir)) return []

  const entities = []
  fs.readdirSync(foldsDir)
    .filter(f => f.endsWith('.fold'))
    .forEach(file => {
      const content = fs.readFileSync(path.join(foldsDir, file), 'utf8')
      const meta    = parseYamlFrontMatter(content)
      const id      = meta.entity ?? file.replace('.fold', '')
      const connState = meta.connection_state ?? 'functional'
      entities.push({
        id,
        glyph:            meta.glyph ?? glyphFor(id),
        color:            meta.color ?? '#ffffff',
        label:            id === 'wisdom-star' ? 'Wisdom Star' :
                          id.charAt(0).toUpperCase() + id.slice(1),
        type:             'firmament',
        connection_state: connState,
        energy:           CONNECTION_STATE_ENERGY[connState] ?? 0.7,
        ring:             id === 'wisdom-star' ? 'center' : 'inner',
      })
    })

  // Sort by canonical order; unknown entities go at end
  entities.sort((a, b) => {
    const ai = ENTITY_ORDER.indexOf(a.id)
    const bi = ENTITY_ORDER.indexOf(b.id)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return entities
}

// ── Energy map — drop.fold state.energy → canvas pulse value ──────────────
const ENERGY_MAP = { high: 1.0, medium: 0.7, low: 0.4, dormant: 0.1 }

// ── Extract first paragraph from markdown body ────────────────────────────
// Used as description fallback for drops without frontmatter description field.
function extractBodyDescription(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, '')
  for (const line of body.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#') || t.startsWith('```') || t.startsWith('|') || t.startsWith('-')) continue
    return t.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').slice(0, 140)
  }
  return ''
}

function readSpaceData(spaceRoot) {
  const folds = []

  // Core folds: space/*.fold
  const coreDir = path.join(spaceRoot, 'space')
  if (fs.existsSync(coreDir)) {
    fs.readdirSync(coreDir)
      .filter(f => f.endsWith('.fold'))
      .forEach(file => {
        const content = fs.readFileSync(path.join(coreDir, file), 'utf8')
        const meta    = parseYamlFrontMatter(content)
        const id      = meta.entity ?? file.replace('.fold', '')
        folds.push({
          id,
          glyph:       glyphFor(id),
          label:       id.charAt(0).toUpperCase() + id.slice(1),
          type:        'system',
          role:        meta.status ?? '',
          description: '',
          status:      meta.status ?? 'alive',
          energy:      1.0,
        })
      })
  }

  // Activity folds: space/folds/*.fold
  const foldsDir = path.join(spaceRoot, 'space', 'folds')
  if (fs.existsSync(foldsDir)) {
    fs.readdirSync(foldsDir)
      .filter(f => f.endsWith('.fold'))
      .forEach(file => {
        const content = fs.readFileSync(path.join(foldsDir, file), 'utf8')
        const meta    = parseYamlFrontMatter(content)
        const id      = meta.entity ?? file.replace('.fold', '')
        folds.push({
          id,
          glyph:       glyphFor(id),
          label:       id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          type:        meta.type?.includes('system') ? 'system' : 'content',
          role:        meta.type ?? '',
          description: '',
          status:      meta.status ?? 'seeded',
          energy:      0.7,
        })
      })
  }

  // Drops: space/drops/*.md — parsed as drop.fold packets
  const dropsDir = path.join(spaceRoot, 'space', 'drops')
  const drops    = []
  const orbiting = []

  if (fs.existsSync(dropsDir)) {
    fs.readdirSync(dropsDir)
      .filter(f => f.endsWith('.md'))
      .sort()
      .forEach(file => {
        const content = fs.readFileSync(path.join(dropsDir, file), 'utf8')
        const meta    = parseYamlFrontMatter(content)
        const name    = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '')

        const state  = (meta.state && typeof meta.state === 'object') ? meta.state : {}
        const status = state.status ?? 'alive'
        const energy = ENERGY_MAP[state.energy] ?? 0.7
        const dropId = meta.id ?? name

        const patchlog = Array.isArray(meta.patchlog) ? meta.patchlog : []

        drops.push({
          id:           dropId,
          glyph:        meta.glyph ?? '∴',
          type:         'content',
          drop_type:    meta.drop_type ?? 'drop.content',
          label:        meta.label ?? name.replace(/-/g, ' '),
          date:         meta.date ?? file.slice(0, 10),
          last_touched: state.last_touched || meta.date || file.slice(0, 10),
          description:  meta.description || extractBodyDescription(content),
          patchlog_last: patchlog.length ? patchlog.at(-1) : '',
          patchlog,
          status,
          energy,
          crystallizing: status === 'crystallizing',
          size:          patchlog.length || 1,
          connects_to:   Array.isArray(meta.connects_to) ? meta.connects_to : [],
        })

        // Build orbiting entries from this drop's orbits list
        if (Array.isArray(meta.orbits)) {
          meta.orbits.forEach(orbitId => {
            orbiting.push({ id: orbitId, orbit: dropId, type: 'orbit' })
          })
        }
      })
  }

  return { folds, drops, orbiting }
}

function spaceReaderPlugin() {
  // INNERSTELLAR_SPACE env var overrides — set it to point anywhere.
  // Default: innerstellar/space/ (inside framework folder, gitignored).
  const spaceRoot     = process.env.INNERSTELLAR_SPACE
    ?? path.resolve(__dirname, '../../space')
  // Firmament lives in the framework repo itself — always present.
  const firmamentRoot = path.resolve(__dirname, '../../firmament')

  return {
    name: 'innerstellar-space-reader',
    configureServer(server) {
      server.middlewares.use('/api/firmament', (_req, res) => {
        try {
          const entities = readFirmamentData(firmamentRoot)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ entities }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })

      server.middlewares.use('/api/space', (_req, res) => {
        try {
          const data = readSpaceData(spaceRoot)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [svelte(), spaceReaderPlugin()],
  base: './',
})
