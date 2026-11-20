const chainFamilies = Object.freeze({
  1: 'ethereum',
  10: 'optimism',
  100: 'gnosis',
  137: 'polygon',
  8453: 'base',
  42161: 'arbitrum',
  84532: 'base',
  747474: 'katana',
  11155111: 'ethereum',
  11155420: 'optimism'
})

const testnetChainIds = new Set([84532, 11155111, 11155420])

const colorTokens = Object.freeze({
  ethereum: '--saf0o-chain-ethereum',
  optimism: '--saf0o-chain-optimism',
  gnosis: '--saf0o-chain-gnosis',
  polygon: '--saf0o-chain-polygon',
  base: '--saf0o-chain-base',
  arbitrum: '--saf0o-chain-arbitrum',
  katana: '--saf0o-chain-katana',
  testnet: '--saf0o-chain-testnet',
  custom: '--saf0o-chain-custom'
})

export function getChainColorToken(chainId, isTestnet = false) {
  const numericChainId = Number(chainId)

  if (isTestnet || testnetChainIds.has(numericChainId)) return colorTokens.testnet

  return colorTokens[chainFamilies[numericChainId] || 'custom']
}
