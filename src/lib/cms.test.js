import assert from 'node:assert/strict'
import { formatCmsDate, postImage, selectArticlePosts, selectPosts, selectProductPosts, validImageUrl } from './cms.js'

assert.equal(validImageUrl('https://example.com/image'), 'https://example.com/image')
assert.equal(validImageUrl('null'), '')
assert.equal(validImageUrl(undefined), '')
assert.deepEqual(selectPosts([{ id: 1 }, { id: 2 }], { mode_seleksi: 'Pilih Manual', pilih_post: [2] }), [{ id: 2 }])
assert.deepEqual(selectProductPosts([{ id: 1, template_type: 'Produk' }, { id: 2, template_type: 'Artikel' }]), [{ id: 1, template_type: 'Produk' }])
assert.deepEqual(selectArticlePosts([{ id: 1, template_type: 'Produk' }, { id: 2, category_name: 'Artikel' }]), [{ id: 2, category_name: 'Artikel' }])
assert.equal(postImage({ content: [{ featured_image: 'https://example.com/nested' }] }), 'https://example.com/nested')
assert.equal(formatCmsDate('2026-07-15T08:00:00Z', new Date('2026-07-16T08:00:00Z')), 'Kemarin')
