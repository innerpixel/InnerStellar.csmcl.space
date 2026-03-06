import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs'
import path from 'path'

// ── Space + Firmament reader plugin ───────────────────────────────────────
// /api/firmament — reads innerstellar/firmament/folds/ (framework, always present)
// /api/space     — reads innerstellar-space/ (personal, traveler content)
// Parses YAML front matter + uses filename and entity field for identity.

function parseYamlFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const result = {}
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) result[key.trim()] = rest.join(':').trim()
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

  // Drops: space/drops/*.md
  const dropsDir = path.join(spaceRoot, 'space', 'drops')
  const drops = []
  if (fs.existsSync(dropsDir)) {
    fs.readdirSync(dropsDir)
      .filter(f => f.endsWith('.md'))
      .forEach(file => {
        const content = fs.readFileSync(path.join(dropsDir, file), 'utf8')
        const meta    = parseYamlFrontMatter(content)
        const name    = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '')
        drops.push({
          id:          meta.id ?? name,
          glyph:       meta.glyph ?? '∴',
          type:        'content',
          label:       meta.label ?? name.replace(/-/g, ' '),
          date:        file.slice(0, 10),
          description: meta.description ?? '',
        })
      })
  }

  return { folds, drops, orbiting: [] }
}

function spaceReaderPlugin() {
  // INNERSTELLAR_SPACE env var overrides — set it to point anywhere.
  // Default: sibling of the repo root (../../../ from apps/canvas/).
  const spaceRoot     = process.env.INNERSTELLAR_SPACE
    ?? path.resolve(__dirname, '../../../innerstellar-space')
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

      server.middlewares.use('/api/space', (req, res) => {
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
