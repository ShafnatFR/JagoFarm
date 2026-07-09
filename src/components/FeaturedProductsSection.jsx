import { useState } from 'react'
import { featuredProducts, icons } from '../data/content.js'

export default function FeaturedProductsSection() {
  const [active, setActive] = useState(0)
  const product = featuredProducts[active]
  const { CheckCircle } = icons

  return (
    <section className="featured-products section-shell" id="produk">
      <div className="featured-card">
        <div className="product-tabs" aria-label="Kategori produk unggulan">
          {featuredProducts.map((item, index) => (
            <button className={active === index ? 'is-active' : ''} key={item.key} onClick={() => setActive(index)} type="button">
              <img src={item.image} alt="" />
              {item.title}
            </button>
          ))}
        </div>
        <div className="featured-image">
          <img src={product.image} alt={product.title} />
          <div className="stat-stack">
            {product.stats.map(([value, label, Icon]) => (
              <span key={label}>
                <Icon size={18} weight="duotone" />
                <strong>{value}</strong>
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="featured-copy">
          <span className="section-label">Produk Berkualitas</span>
          <h2>Produk Berkualitas dari Ekosistem Sirkular</h2>
          <p>{product.description}</p>
          <ul>
            {[
              'Dibudidayakan dengan teknologi presisi',
              'Ramah lingkungan & tanpa limbah',
              'Didukung data real-time & AI',
              'Kualitas terjaga dari hulu ke hilir',
            ].map((item) => (
              <li key={item}>
                <CheckCircle size={19} weight="fill" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
