import { services as defaultServices, icons } from "../data/content.js";
import { postImage } from "../lib/cms.js";

export default function SolutionsSection({ data, pageData, posts = [], pageExists = false }) {
  const { ArrowRight } = icons;

  // 1. Detect Heading & Sub-heading dynamically
  const headingBlock = data?.headline
    ? data
    : Array.isArray(pageData?.content)
      ? pageData.content.find((b) => b?.data?.headline?.toLowerCase()?.includes('solusi') || b?.type === 'solutions')?.data || {}
      : {}
  const headline = headingBlock.headline || "Solusi & Layanan Kami"
  const subHeadline = headingBlock.sub_headline || "Teknologi terdepan dan layanan terintegrasi untuk mendukung setiap aspek pertanian dan peternakan modern."

  // 2. Detect service/solution cards dynamically
  let services = defaultServices
  if (Array.isArray(data?.items) && data.items.length > 0) {
    services = data.items.map((item) => ({
      title: item.title || '',
      description: item.description || '',
      image: item.image || '',
      Icon: null,
    }))
  } else if (Array.isArray(pageData?.content)) {
    const headingIndex = pageData.content.findIndex((b) => b?.data?.headline?.toLowerCase()?.includes('solusi') || b?.type === 'solutions')
    const nextBlock = headingIndex >= 0 ? pageData.content[headingIndex + 1] : null
    const selectedIds = nextBlock?.type === 'dynamic-post-feed' && Array.isArray(nextBlock?.data?.selected_post_ids)
      ? nextBlock.data.selected_post_ids
      : null

    if (selectedIds && selectedIds.length > 0 && Array.isArray(posts) && posts.length > 0) {
      const matchedPosts = selectedIds.map((id) => posts.find((p) => p.id === id)).filter(Boolean)
      if (matchedPosts.length > 0) {
        services = matchedPosts.map((p) => ({
          title: p.title || '',
          description: typeof p.excerpt === 'string' && p.excerpt ? p.excerpt : (typeof p.content?.[0]?.data === 'string' ? p.content[0].data : 'Layanan terintegrasi ekosistem presisi.'),
          image: postImage(p) || '',
          Icon: null,
        }))
      }
    }
  }

  if (pageExists && services === defaultServices && (!data || Object.keys(data).length === 0)) {
    return null;
  }

  return (
    <section className="solutions section-shell motion-section" id="solusi">
      <div className="section-heading">
        <h2 className="motion-item">{headline}</h2>
        <p className="motion-item">{subHeadline}</p>
      </div>
      <div className="service-grid">
        {services.map(({ title, description, image, Icon }) => (
          <article className="service-card" key={title}>
            <div className="service-image">
              {image && <img src={image} alt={title} referrerPolicy="no-referrer" />}
              {Icon && <span><Icon size={28} weight="duotone" /></span>}
            </div>
            <h3>{title}</h3>
            <p>{typeof description === 'string' ? description : (description?.text || 'Layanan terintegrasi ekosistem presisi.')}</p>
            <a href="#kontak">
              Pelajari lebih lanjut
              <ArrowRight size={16} weight="bold" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
