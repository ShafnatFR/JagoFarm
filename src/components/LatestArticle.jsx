export default function LatestArticle() {
  return (
    <section className="latest-article section-shell motion-section" id="artikel">
      <div className="article-container">
        <span className="section-label motion-item">Artikel Terbaru</span>
        <h2 className="motion-item">Kabar terkini dari <strong>JagoFarm</strong></h2>
        <p className="article-subtitle motion-item">
          Temukan insight seputar agritech dan perkembangan terbaru startup kami.
        </p>
        <div className="facebook-embed-card motion-item">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02LLx6nmc1pSRzpMmfY5AiLGKMFUgLdmEoD79At19QXNkkq9Ag7TPEbKpBWfL3N76sl%26id%3D61591492453217&show_text=true&width=500"
            style={{ border: 'none', overflow: 'hidden', width: '100%', height: '500px' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="JagoFarm Facebook Post"
          />
        </div>
      </div>
    </section>
  )
}
