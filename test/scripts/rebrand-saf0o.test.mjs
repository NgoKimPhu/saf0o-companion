import assert from 'node:assert/strict'
import test from 'node:test'
import { rebrand } from '../../scripts/rebrand-saf0o.mjs'

test('renames every brand casing', () => {
  assert.equal(
    rebrand('Wren wren WREN createWrenGlyph --wren-space-1 WREN_DEPLOY_ORIGIN wren-companion-auth'),
    'Saf0o saf0o SAF0O createSaf0oGlyph --saf0o-space-1 SAF0O_DEPLOY_ORIGIN saf0o-companion-auth'
  )
})

// Upstream credit, history links and third-party token data must not be rewritten.
test('keeps upstream credit, links and third-party names verbatim', () => {
  const kept =
    'Jorphex and Wren contributors https://github.com/jorphex/wren getwren.xyz "Wren Staked tGBP"'
  assert.equal(rebrand(kept), kept)
})

test('leaves words that only contain the letters in another case alone, and is idempotent', () => {
  assert.equal(rebrand('settingsPreviewRename'), 'settingsPreviewRename')
  assert.equal(rebrand(rebrand('Wren wren')), 'Saf0o saf0o')
})
