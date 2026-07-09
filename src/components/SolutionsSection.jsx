import { services, icons } from '../data/content.js'

export default function SolutionsSection() {
  const { ArrowRight } = icons

  return (
    <section className="solutions section-shell" id="solusi">
      <div className="section-heading">
        <span className="section-label">Solusi Terintegrasi</span>
        <h2>Solusi & Layanan Kami</h2>
        <p>Teknologi terdepan dan layanan terintegrasi untuk mendukung setiap aspek pertanian dan peternakan modern.</p>
      </div>
      <div className="service-grid">
        {services.map(({ title, description, image, Icon }) => (
          <article className="service-card" key={title}>
            <div className="service-image">
              <img src={image} alt={title} />
              <span>
                <Icon size={28} weight="duotone" />
              </span>
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
  )
}
