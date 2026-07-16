import { formatCmsDate, postContent, postImage, selectArticlePosts } from '../lib/cms.js'

export default function LatestArticle({ data = {}, posts = [], onNavigate }) {
  const items = selectArticlePosts(posts, data)
  return (
    <section className="latest-article section-shell motion-section" id="artikel">
      <div className="article-container">
        <span className="section-label motion-item">{data.title || 'Artikel Terbaru'}</span>
        <h2 className="motion-item">Kabar terkini dari <strong>JagoFarm</strong></h2>
        <p className="article-subtitle motion-item">
          Temukan insight seputar agritech dan perkembangan terbaru startup kami.
        </p>
        <div className="article-scroller motion-item">{items.length ? items.map((post) => <article className="article-card" key={post.id || post.slug}><button type="button" onClick={() => onNavigate?.(`/artikel/${encodeURIComponent(post.slug)}`)}><div className="article-card-media">{postImage(post) && <img src={postImage(post)} alt="" referrerPolicy="no-referrer" loading="lazy" />}</div><div className="article-card-copy"><small>{formatCmsDate(post.published_at || post.created_at)}</small><h3>{post.title || 'Tanpa judul'}</h3><p>{post.excerpt || postContent(post).excerpt || ''}</p><span>Baca artikel →</span></div></button></article>) : <p>Belum ada artikel.</p>}</div>
      </div>
    </section>
  )
}
