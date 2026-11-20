import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import process from 'node:process'
import test from 'node:test'

// The icons must stay the ones generated from the desktop master, and src/icon.png must stay the desktop canonical icon.
test('brand asset verification passes', () => {
  const out = execFileSync(process.execPath, ['scripts/verify-brand-assets.mjs'], {
    encoding: 'utf8'
  })
  assert.match(out, /icon assets verified/)
})
