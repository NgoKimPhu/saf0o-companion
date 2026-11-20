import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { createFirefoxManifest } from '../scripts/browser-manifests.mjs'

const manifest = JSON.parse(readFileSync(new URL('../src/manifest.json', import.meta.url), 'utf8'))

// The desktop app (main/api/extensionIds.ts) only accepts this id. Changing the key breaks pairing.
test('manifest key yields the Chromium extension id pinned by the desktop app', () => {
  const hex = createHash('sha256').update(Buffer.from(manifest.key, 'base64')).digest('hex').slice(0, 32)
  const id = hex.replace(/[0-9a-f]/g, (c) => String.fromCharCode(97 + parseInt(c, 16)))
  assert.equal(id, 'dkbkgeampccigheoijopoaeneajeenhm')
})

test('Firefox manifest omits the Chromium-only key', () => {
  assert.equal('key' in createFirefoxManifest(manifest), false)
})
