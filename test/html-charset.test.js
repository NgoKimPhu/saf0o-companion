const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const srcDir = path.join(__dirname, '..', 'src')

// Extension pages have no HTTP charset header. Without <meta charset> Firefox
// decodes the page and its scripts as windows-1252, so UI text such as
// "tab’s" and "Switching…" renders as mojibake.
test('every extension HTML page declares utf-8 first in <head>', () => {
  const pages = fs.readdirSync(srcDir).filter((f) => f.endsWith('.html'))
  assert.ok(pages.length > 0)
  for (const page of pages) {
    const html = fs.readFileSync(path.join(srcDir, page), 'utf8')
    assert.match(html, /<head>\s*<meta charset="utf-8"\s*\/?>/i, page)
  }
})
