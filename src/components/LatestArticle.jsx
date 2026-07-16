import { formatCmsDate, selectPosts } from '../lib/cms.js'

export default function LatestArticle({ data = {}, posts = [] }) {
  const items = selectPosts(posts, data)
  return (
    <section className="latest-article section-shell motion-section" id="artikel">
      <div className="article-container">
        <span className="section-label motion-item">{data.title || 'Artikel Terbaru'}</span>
        <h2 className="motion-item">Kabar terkini dari <strong>JagoFarm</strong></h2>
        <p className="article-subtitle motion-item">
          Temukan insight seputar agritech dan perkembangan terbaru startup kami.
        </p>
        <div className="facebook-embed-card motion-item">{items.length ? items.map((post) => <article key={post.id || post.slug}><h3>{post.title || 'Tanpa judul'}</h3><small>{formatCmsDate(post.published_at || post.created_at)}</small><p>{post.excerpt || ''}</p>{post.featured_image && <img src={post.featured_image} alt="" referrerPolicy="no-referrer" loading="lazy" />}</article>) : <p>Belum ada artikel.</p>}</div>
      </div>
    </section>
  )
}
