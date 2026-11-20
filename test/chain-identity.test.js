const assert = require('node:assert/strict')
const test = require('node:test')

const identity = import('../src/settings/chain-identity.mjs')

test('maps canonical networks to Saf0o chain identity colors', async () => {
  const { getChainColorToken } = await identity

  assert.equal(getChainColorToken(1), '--saf0o-chain-ethereum')
  assert.equal(getChainColorToken(10), '--saf0o-chain-optimism')
  assert.equal(getChainColorToken(100), '--saf0o-chain-gnosis')
  assert.equal(getChainColorToken(137), '--saf0o-chain-polygon')
  assert.equal(getChainColorToken(8453), '--saf0o-chain-base')
  assert.equal(getChainColorToken(42161), '--saf0o-chain-arbitrum')
  assert.equal(getChainColorToken(747474), '--saf0o-chain-katana')
})

test('uses the testnet and custom identity colors without implying status', async () => {
  const { getChainColorToken } = await identity

  assert.equal(getChainColorToken(11155111), '--saf0o-chain-testnet')
  assert.equal(getChainColorToken(84532), '--saf0o-chain-testnet')
  assert.equal(getChainColorToken(1, true), '--saf0o-chain-testnet')
  assert.equal(getChainColorToken(999999), '--saf0o-chain-custom')
  assert.equal(getChainColorToken('invalid'), '--saf0o-chain-custom')
})
