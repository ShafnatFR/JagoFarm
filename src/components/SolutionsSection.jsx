import { services as staticServices, icons } from "../data/content.js";

export default function SolutionsSection({ data = {} }) {
  const { ArrowRight } = icons;
  const services = Array.isArray(data.feature_items) ? data.feature_items.map((item) => ({
    title: item?.feature_title || 'Solusi', description: item?.description || '', image: item?.icon_image || '', Icon: null, link: item?.link_url,
  })) : staticServices;
  const items = services;

  return (
    <section className="solutions section-shell motion-section" id="solusi">
      <div className="section-heading">
        <h2 className="motion-item">{data.title || 'Solusi & Layanan Kami'}</h2>
        <p className="motion-item">
          {data.subtitle || 'Teknologi terdepan dan layanan terintegrasi untuk mendukung setiap aspek pertanian dan peternakan modern.'}
        </p>
      </div>
      <div className="service-grid">
        {items.map(({ title, description, image, Icon, link }) => (
          <article className="service-card" key={title}>
            <div className="service-image">
              {image && <img src={image} alt={title} referrerPolicy="no-referrer" />}
              {Icon && <span><Icon size={28} weight="duotone" /></span>}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={link || '#kontak'}>
              Pelajari lebih lanjut
              <ArrowRight size={16} weight="bold" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
