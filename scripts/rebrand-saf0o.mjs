#!/usr/bin/env node
// Rebrand Wren -> saf0o across tracked files: contents (Wren/wren/WREN -> Saf0o/saf0o/SAF0O)
// and paths (git mv). Idempotent. On an upstream rebase: drop the generated commit, rebase,
// then re-run this script instead of merging the rename. Usage: node scripts/rebrand-saf0o.mjs
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const SELF = 'scripts/rebrand-saf0o.mjs'
// History and third-party records keep the upstream name.
const SKIP_FILE = [/^CHANGELOG\.md$/, /^release-notes\//, /^pnpm-lock\.yaml$/, /^PATCHES\.md$/, /^NOTES\.md$/, /^test\/scripts\/rebrand-saf0o\.test\.mjs$/]
// Strings kept verbatim: upstream credit/links, third-party token names, upstream store listings.
const KEEP = [
  'jorphex/wren',
  'Jorphex and Wren contributors',
  'getwren.xyz',
  'Wren Staked',
  'chromewebstore.google.com/detail/wren-companion/',
  'addons.mozilla.org/en-US/firefox/addon/wren-companion/'
]
const MAP = { Wren: 'Saf0o', wren: 'saf0o', WREN: 'SAF0O' }

export const rebrand = (text) => {
  const kept = []
  let out = text
  KEEP.forEach((k, i) => {
    out = out.split(k).join(`\u0000${i}\u0000`)
    kept[i] = k
  })
  out = out.replace(/Wren|wren|WREN/g, (m) => MAP[m])
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => kept[Number(i)])
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' })

if (process.argv[1]?.endsWith('rebrand-saf0o.mjs')) {
  const files = git('ls-files', '-z').split('\0').filter(Boolean)
  let changed = 0
  for (const file of files) {
    if (file === SELF || SKIP_FILE.some((re) => re.test(file))) continue
    const buf = readFileSync(file)
    if (buf.includes(0)) continue // binary
    const text = buf.toString('utf8')
    const next = rebrand(text)
    if (next !== text) {
      writeFileSync(file, next)
      changed++
    }
  }
  let moved = 0
  for (const file of git('ls-files', '-z').split('\0').filter(Boolean)) {
    if (file === SELF || SKIP_FILE.some((re) => re.test(file))) continue
    const target = file.replace(/Wren|wren|WREN/g, (m) => MAP[m])
    if (target === file) continue
    execFileSync('mkdir', ['-p', target.split('/').slice(0, -1).join('/') || '.'])
    git('mv', file, target)
    moved++
  }
  console.log(`rebrand: ${changed} files rewritten, ${moved} paths moved`)
}
