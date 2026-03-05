import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs'
import path from 'path'

// ── Space reader plugin ────────────────────────────────────────────────────
// Reads fold files from innerstellar-space/ and serves them as /api/space.
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
    auriosynth: '◈', theurgist: '⧖', innerstellar: '✦',
    'three-planes': '⊛', traveler: '◎', priment: '⊗',
  }
  return glyphs[id] ?? '✶'
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
  const spaceRoot = path.resolve(__dirname, '../../innerstellar-space')

  return {
    name: 'innerstellar-space-reader',
    configureServer(server) {
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
