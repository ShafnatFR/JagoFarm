import { services as defaultServices, icons } from "../data/content.js";

export default function SolutionsSection({ data }) {
  const { ArrowRight } = icons;

  // Support CMS data override: data.items array or fallback to static
  const services = Array.isArray(data?.items) && data.items.length > 0
    ? data.items.map((item) => ({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        Icon: null, // CMS items won't have Phosphor icons — use a placeholder or image
      }))
    : defaultServices

  return (
    <section className="solutions section-shell motion-section" id="solusi">
      <div className="section-heading">
        <h2 className="motion-item">Solusi & Layanan Kami</h2>
        <p className="motion-item">
          Teknologi terdepan dan layanan terintegrasi untuk mendukung setiap aspek pertanian dan peternakan modern.
        </p>
      </div>
      <div className="service-grid">
        {services.map(({ title, description, image, Icon }) => (
          <article className="service-card" key={title}>
            <div className="service-image">
              {image && <img src={image} alt={title} referrerPolicy="no-referrer" />}
              {Icon && <span><Icon size={28} weight="duotone" /></span>}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
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
