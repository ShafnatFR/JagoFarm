const env = import.meta.env || {}
const baseUrl = (env.VITE_CMS_BASE_URL || '').replace(/\/$/, '')
const apiKey = env.VITE_CMS_API_KEY || ''

export const cmsConfigured = Boolean(baseUrl && apiKey)

export async function fetchFromCMS(endpoint, options = {}) {
  if (!cmsConfigured) throw new Error('CMS is not configured')
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      ...(options.headers || {}),
    },
  })
  if (!response.ok) {
    const error = new Error(`CMS request failed: ${response.status}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

export const getPage = (slug) => fetchFromCMS(`/api/v1/public/pages/${encodeURIComponent(slug)}`)
export const getSettings = () => fetchFromCMS('/api/v1/public/settings')
export const getNavigation = () => fetchFromCMS('/api/v1/public/navigation')
export const getPosts = () => fetchFromCMS('/api/v1/public/posts')
export const getPostCategories = () => fetchFromCMS('/api/v1/public/post-categories')

export async function submitInquiry(payload) {
  return fetchFromCMS('/api/v1/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const validImageUrl = (value) => typeof value === 'string' && value.trim() && value !== 'null' && value !== 'undefined' ? value : ''
export const postContent = (post) => Array.isArray(post?.content) ? post.content[0] || {} : {}
export const postImage = (post) => validImageUrl(post?.featured_image || post?.image_url || postContent(post).featured_image)

export function selectPosts(posts, config = {}) {
  let selected = Array.isArray(posts) ? posts : []
  const category = config.filter_kategori
  if (category && !/^semua/i.test(category)) {
    const wanted = String(category).toLowerCase()
    selected = selected.filter((post) => [post?.category_slug, post?.category, post?.category_name].some((value) => String(value || '').toLowerCase() === wanted))
  }
  if (config.mode_seleksi === 'Pilih Manual' && Array.isArray(config.pilih_post)) selected = selected.filter((post) => config.pilih_post.includes(post?.id) || config.pilih_post.includes(post?.slug))
  if (config.urutan_post === 'Terbaru') selected = selected.toSorted((a, b) => new Date(b?.published_at || b?.created_at || 0) - new Date(a?.published_at || a?.created_at || 0))
  return selected.slice(0, Number(config.jumlah_post) || 3)
}

export function selectProductPosts(posts, config = {}) {
  const limit = Number(config.jumlah_post) || 3
  return selectPosts(posts, { ...config, jumlah_post: Number.MAX_SAFE_INTEGER }).filter((post) => String(post?.template_type || '').toLowerCase() === 'produk').slice(0, limit)
}

export function selectArticlePosts(posts, config = {}) {
  const limit = Number(config.jumlah_post) || 3
  return selectPosts(posts, { ...config, jumlah_post: Number.MAX_SAFE_INTEGER }).filter((post) => String(post?.category_slug || post?.category_name || '').toLowerCase() === 'artikel' || String(post?.template_type || '').toLowerCase() === 'artikel').slice(0, limit)
}

export function formatCmsDate(value, now = new Date()) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const days = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - new Date(date.getFullYear(), date.getMonth(), date.getDate())) / 86400000)
  if (days === 1) return 'Kemarin'
  if (days <= 0) {
    const minutes = Math.max(0, Math.floor((now - date) / 60000))
    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes} menit yang lalu`
    return `${Math.floor(minutes / 60)} jam yang lalu`
  }
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(date).replace(' pukul ', ', ')
}
