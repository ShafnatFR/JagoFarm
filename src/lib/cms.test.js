import assert from 'node:assert/strict'
import { formatCmsDate, selectPosts, validImageUrl } from './cms.js'

assert.equal(validImageUrl('https://example.com/image'), 'https://example.com/image')
assert.equal(validImageUrl('null'), '')
assert.equal(validImageUrl(undefined), '')
assert.deepEqual(selectPosts([{ id: 1 }, { id: 2 }], { mode_seleksi: 'Pilih Manual', pilih_post: [2] }), [{ id: 2 }])
assert.equal(formatCmsDate('2026-07-15T08:00:00Z', new Date('2026-07-16T08:00:00Z')), 'Kemarin')
