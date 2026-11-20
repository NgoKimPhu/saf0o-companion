export function createFirefoxManifest(manifest) {
  const serviceWorker = manifest.background?.service_worker
  if (typeof serviceWorker !== 'string' || manifest.background?.scripts) {
    throw new Error('Chrome manifest has an incompatible background declaration')
  }

  // `key` pins the Chromium extension id; Firefox does not support it.
  const { key: _key, ...rest } = manifest
  return {
    ...rest,
    background: { scripts: [serviceWorker] }
  }
}
