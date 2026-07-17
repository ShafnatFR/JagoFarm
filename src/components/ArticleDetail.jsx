import { useState, useEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ChatCircleDots, PaperPlaneRight, Sparkle, Quotes, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { formatCmsDate, postContent, postImage, selectArticlePosts, getPostComments, submitPostComment } from '../lib/cms.js'

// Komponen rekursif untuk merender pohon diskusi (Komentar -> Balasan -> Subbalasan -> dst)
function CommentItem({ comment, depth = 0, onReply }) {
  const [showReplies, setShowReplies] = useState(true)
  const name = comment.author_name || comment.name || 'Pembaca'
  const date = formatCmsDate(comment.created_at || comment.date || new Date())
  const body = comment.content || comment.body || ''
  const hasChildren = comment.children && comment.children.length > 0

  return (
    <div className={`comment-tree-node depth-${depth}`} style={{ marginTop: depth > 0 ? '14px' : '0' }}>
      <div
        className="comment-card"
        style={
          depth > 0
            ? {
                borderLeft: '3px solid var(--forest)',
                background: 'var(--surface-soft)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
              }
            : {}
        }
      >
        <div className="comment-card-header">
          <div
            className="comment-avatar"
            style={depth > 0 ? { width: '36px', height: '36px', fontSize: '0.82rem' } : {}}
          >
            {name.substring(0, 2).toUpperCase()}
          </div>
          <div className="comment-author-info">
            <div className="comment-author-top">
              <strong>{name}</strong>
              <span className="comment-date">{date}</span>
            </div>
          </div>
        </div>
        <div className="comment-content">
          <p>{body}</p>
        </div>
        <div className="comment-card-footer">
          <button
            type="button"
            className="comment-reply-btn"
            onClick={() => onReply(comment)}
          >
            Balas
          </button>
          {hasChildren && (
            <button
              type="button"
              className="comment-toggle-replies-btn"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? `▲ Sembunyikan balasan (${comment.children.length})`
                : `▼ Lihat balasan (${comment.children.length})`}
            </button>
          )}
        </div>
      </div>

      {hasChildren && (
        <div className={`comment-replies-slide-wrapper ${!showReplies ? 'is-collapsed' : ''}`}>
          <div
            className="comment-tree-children"
            style={{
              marginLeft: depth === 0 ? '24px' : '16px',
              borderLeft: '2px solid var(--line)',
              paddingLeft: depth === 0 ? '20px' : '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginTop: '14px',
            }}
          >
            {comment.children.map((child) => (
              <CommentItem
                key={child.id || Math.random()}
                comment={child}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ArticleDetail({ post, posts = [], onNavigate }) {
  const [rawComments, setRawComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const COMMENTS_PER_PAGE = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [newComment, setNewComment] = useState({ name: '', content: '' })
  const [replyingTo, setReplyingTo] = useState(null)
  const [commentSuccess, setCommentSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const textareaRef = useRef(null)

  // Fetch komentar berdasarkan ID Post
  useEffect(() => {
    if (!post?.id) {
      setRawComments([])
      return undefined
    }

    let cancelled = false
    setLoadingComments(true)
    const localKey = `jagofarm_my_comments_${post.id}`

    getPostComments(post.id)
      .then((res) => {
        if (cancelled) return
        const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : [])
        // Filter memisahkan komentar berdasarkan id post
        const filtered = list.filter((item) => !item.post_id || String(item.post_id) === String(post.id))

        // Gabungkan dengan komentar lokal yang baru dikirim
        try {
          const localSaved = JSON.parse(localStorage.getItem(localKey) || '[]')
          const combined = [...localSaved, ...filtered].filter(
            (c, index, self) =>
              index === self.findIndex((t) => (t.id && c.id && t.id === c.id) || (t.content === c.content && (t.author_name || t.name) === (c.author_name || c.name)))
          )
          setRawComments(combined)
        } catch (e) {
          setRawComments(filtered)
        }
        setLoadingComments(false)
      })
      .catch(() => {
        if (!cancelled) {
          try {
            const localSaved = JSON.parse(localStorage.getItem(localKey) || '[]')
            setRawComments(localSaved)
          } catch (e) {
            setRawComments([])
          }
          setLoadingComments(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [post?.id])

  // Logika membangun pohon komentar bertingkat (tree structure)
  const commentTree = useMemo(() => {
    if (!rawComments || rawComments.length === 0) return []

    let parentMap = {}
    try {
      parentMap = JSON.parse(localStorage.getItem(`jagofarm_parents_${post?.id || 'default'}`) || '{}')
    } catch (e) {}

    const map = {}
    const roots = []

    rawComments.forEach((item) => {
      map[item.id] = { ...item, children: [] }
    })

    rawComments.forEach((item) => {
      const node = map[item.id]
      let parentId = item.parent_id || parentMap[item.id]

      // Jika belum ada parentId eksplisit, cari dari mention @NamaPenulis di awal teks
      if (!parentId && typeof item.content === 'string' && item.content.trim().startsWith('@')) {
        const match = item.content.trim().match(/^@([\w\s.\-]+?)(?:\s+|:|,|$)/)
        if (match && match[1]) {
          const targetName = match[1].trim().toLowerCase()
          const candidate = rawComments.find(
            (x) =>
              String(x.id) !== String(item.id) &&
              String(x.author_name || x.name || '').trim().toLowerCase() === targetName
          )
          if (candidate) {
            parentId = candidate.id
          }
        }
      }

      if (parentId && map[parentId] && String(parentId) !== String(item.id)) {
        map[parentId].children.push(node)
      } else {
        roots.push(node)
      }
    })

    // Root komentar terbaru di atas, sub-balasan diurutkan kronologis (lama -> baru) agar alur obrolan nyambung
    const sortNodes = (nodes, isRoot = true) => {
      if (isRoot) {
        nodes.sort((a, b) => new Date(b.created_at || b.date || 0) - new Date(a.created_at || a.date || 0))
      } else {
        nodes.sort((a, b) => new Date(a.created_at || a.date || 0) - new Date(b.created_at || b.date || 0))
      }
      nodes.forEach((n) => sortNodes(n.children, false))
    }
    sortNodes(roots, true)

    return roots
  }, [rawComments, post?.id])

  const totalPages = Math.ceil(commentTree.length / COMMENTS_PER_PAGE) || 1
  const paginatedRoots = useMemo(() => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE
    return commentTree.slice(start, start + COMMENTS_PER_PAGE)
  }, [commentTree, currentPage])

  const latestArticles = useMemo(() => {
    const all = selectArticlePosts(posts, { urutan_post: 'Terbaru', jumlah_post: 999 })
    const list = (all.length > 0 ? all : posts).filter((item) => item?.slug !== post?.slug)
    return list.slice(0, 3)
  }, [posts, post])

  if (!post) {
    return (
      <main className="article-detail page-shell">
        <h1>Artikel tidak ditemukan.</h1>
        <button type="button" onClick={() => onNavigate('/artikel')}>
          <ArrowLeft size={18} /> Kembali ke daftar artikel
        </button>
      </main>
    )
  }

  const content = postContent(post)

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.name.trim() || !newComment.content.trim() || !post?.id || submitting) return

    setSubmitting(true)
    const localKey = `jagofarm_my_comments_${post.id}`
    const parentsKey = `jagofarm_parents_${post.id}`
    const authorName = newComment.name.trim()
    const commentContent = newComment.content.trim()

    // Fallback email agar valid di backend CMS tanpa perlu pembaca login
    const fallbackEmail = 'tidak.menggunakan.email@jagofarm.com'

    const payload = {
      author_name: authorName,
      author_email: fallbackEmail,
      email: fallbackEmail,
      content: commentContent,
      post_id: post.id,
    }

    try {
      const res = await submitPostComment(post.id, payload)
      const addedId = res?.id || Date.now()
      const added = {
        id: addedId,
        author_name: authorName,
        created_at: new Date().toISOString(),
        content: commentContent,
        post_id: post.id,
        parent_id: replyingTo?.id || null,
      }

      setRawComments((prev) => [added, ...prev])
      setCurrentPage(1)

      try {
        const localSaved = JSON.parse(localStorage.getItem(localKey) || '[]')
        localStorage.setItem(localKey, JSON.stringify([added, ...localSaved]))
        if (replyingTo?.id) {
          const parentMap = JSON.parse(localStorage.getItem(parentsKey) || '{}')
          parentMap[addedId] = replyingTo.id
          localStorage.setItem(parentsKey, JSON.stringify(parentMap))
        }
      } catch (err) {}

      setNewComment({ name: '', content: '' })
      setReplyingTo(null)
      setCommentSuccess(true)
      setTimeout(() => setCommentSuccess(false), 5000)
    } catch (err) {
      const addedId = Date.now()
      const added = {
        id: addedId,
        author_name: authorName,
        created_at: new Date().toISOString(),
        content: commentContent,
        post_id: post.id,
        parent_id: replyingTo?.id || null,
      }
      setRawComments((prev) => [added, ...prev])
      setCurrentPage(1)
      try {
        const localSaved = JSON.parse(localStorage.getItem(localKey) || '[]')
        localStorage.setItem(localKey, JSON.stringify([added, ...localSaved]))
        if (replyingTo?.id) {
          const parentMap = JSON.parse(localStorage.getItem(parentsKey) || '{}')
          parentMap[addedId] = replyingTo.id
          localStorage.setItem(parentsKey, JSON.stringify(parentMap))
        }
      } catch (e) {}

      setNewComment({ name: '', content: '' })
      setReplyingTo(null)
      setCommentSuccess(true)
      setTimeout(() => setCommentSuccess(false), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReplyComment = (targetComment) => {
    if (!targetComment) return
    const targetName = targetComment.author_name || targetComment.name || 'Pembaca'
    setReplyingTo({ id: targetComment.id, name: targetName })
    setNewComment((prev) => ({
      ...prev,
      content: prev.content
        ? prev.content.includes(`@${targetName}`)
          ? prev.content
          : `@${targetName} ${prev.content}`
        : `@${targetName} `,
    }))
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
    const formEl = document.getElementById('form-tulis-komentar')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <main className="article-detail page-shell">
      <button className="article-back" type="button" onClick={() => onNavigate('/artikel')}>
        <ArrowLeft size={18} weight="bold" /> Kembali ke daftar artikel
      </button>

      <article className="article-main-content">
        <div className="article-meta-top">
          <span className="article-date-badge">{formatCmsDate(post.published_at || post.created_at)}</span>
          {post.category_name && <span className="article-cat-badge">{post.category_name}</span>}
        </div>
        <h1 className="article-detail-title">{post.title}</h1>
        {postImage(post) && (
          <div className="article-detail-image-wrapper">
            <img className="article-detail-image" src={postImage(post)} alt={post.title || ''} referrerPolicy="no-referrer" />
          </div>
        )}
        {content.body_content && (
          <div className="article-body" dangerouslySetInnerHTML={{ __html: content.body_content }} />
        )}
      </article>

      {/* Kolom Komentar & Diskusi */}
      <section className="article-comments-section" id="kolom-komentar">
        <header className="article-comments-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div className="article-comments-title">
            <ChatCircleDots size={28} weight="fill" />
            <div>
              <h2>Kolom Komentar & Diskusi</h2>
              <p>Bagikan pendapat, wawasan, atau tanggapan Anda seputar artikel ini ({rawComments.length} komentar)</p>
            </div>
          </div>
          {/* Tombol hijau lihat/sembunyikan komentar telah dihilangkan sesuai permintaan */}
        </header>

        {/* Daftar Komentar di kiri (kolom 1), Form Tulis Komentar di kanan (kolom 2) */}
        <div className="article-comments-grid">
          {/* Daftar Komentar */}
          <div className="comments-list">
            {loadingComments ? (
              <div className="comments-loading">
                <div className="motion-spin-slow" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid var(--leaf-soft)', borderTopColor: 'var(--forest)' }} />
                <span>Memuat diskusi komentar...</span>
              </div>
            ) : commentTree.length === 0 ? (
              <div className="comments-empty">
                <Quotes size={36} weight="duotone" />
                <p>Belum ada komentar pada artikel ini. Jadilah yang pertama memberikan pendapat!</p>
              </div>
            ) : (
              <>
                <div className="comments-slide-inner">
                  {paginatedRoots.map((item) => (
                    <CommentItem
                      key={item.id || Math.random()}
                      comment={item}
                      depth={0}
                      onReply={handleReplyComment}
                    />
                  ))}
                </div>

                {/* Pagination Button 123 dan Panah Kanan Kiri (Maksimal 5 Komentar Induk) */}
                {totalPages > 1 && (
                  <nav className="comments-pagination">
                    <button
                      type="button"
                      className="pagination-arrow-btn"
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                        const section = document.getElementById('kolom-komentar')
                        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      disabled={currentPage === 1}
                      aria-label="Halaman Sebelumnya"
                    >
                      <CaretLeft size={18} weight="bold" />
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentPage(pageNum)
                            const section = document.getElementById('kolom-komentar')
                            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="pagination-arrow-btn"
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        const section = document.getElementById('kolom-komentar')
                        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      disabled={currentPage === totalPages}
                      aria-label="Halaman Berikutnya"
                    >
                      <CaretRight size={18} weight="bold" />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>

          {/* Form Tulis Komentar */}
          <form className="comment-form-card" id="form-tulis-komentar" onSubmit={handleAddComment}>
            <h3>Tulis Komentar Anda</h3>
            {commentSuccess && (
              <div className="comment-success-alert">
                ✨ Terima kasih! Komentar Anda berhasil dikirim dan akan segera ditampilkan pada diskusi.
              </div>
            )}
            {replyingTo && (
              <div
                className="comment-reply-banner"
                style={{
                  background: 'var(--leaf-soft)',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  color: 'var(--forest)',
                  fontWeight: 600,
                }}
              >
                <span>
                  Membalas komentar dari <strong>@{replyingTo.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            <label>
              <span>Nama Lengkap <span className="req">*</span></span>
              <input
                type="text"
                placeholder="Masukkan nama lengkap Anda..."
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
                disabled={submitting}
              />
            </label>
            <label className="comment-form-textarea">
              <span>Isi Komentar <span className="req">*</span></span>
              <textarea
                ref={textareaRef}
                rows={5}
                placeholder="Tuliskan gagasan, pertanyaan, atau tanggapan Anda..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                required
                disabled={submitting}
              />
            </label>
            <button type="submit" className="comment-submit-btn" disabled={submitting}>
              <PaperPlaneRight size={18} weight="fill" />
              <span>{submitting ? 'Mengirim Komentar...' : 'Kirim Komentar'}</span>
            </button>
          </form>
        </div>
      </section>

      {/* List Artikel Terbaru di Bawahnya */}
      {latestArticles && latestArticles.length > 0 && (
        <section className="article-latest-below-section">
          <header className="article-latest-below-header">
            <div className="article-catalog-badge">
              <Sparkle size={18} weight="fill" />
              <span>Bacaan Pilihan</span>
            </div>
            <h2>Artikel Terbaru Lainnya</h2>
            <p>Lanjutkan penjelajahan literasi dan informasi agritech dari JagoFarm.</p>
          </header>

          <div className="article-catalog-grid">
            {latestArticles.map((item) => {
              const img = postImage(item)
              const excerpt = item.excerpt || postContent(item).excerpt || ''
              return (
                <article className="article-card" key={item.id || item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate?.(`/artikel/${encodeURIComponent(item.slug)}`)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <div className="article-card-media">
                      {img && <img src={img} alt={item.title || ''} referrerPolicy="no-referrer" loading="lazy" />}
                    </div>
                    <div className="article-card-copy">
                      <small>{formatCmsDate(item.published_at || item.created_at)}</small>
                      <h3>{item.title || 'Tanpa judul'}</h3>
                      <p>{excerpt}</p>
                      <span>Baca artikel →</span>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
