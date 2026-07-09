import { useMemo, useState } from 'react'
import { productCatalog, icons } from '../data/content.js'

const filters = ['Semua', 'Hewan', 'Tanaman', 'Perangkat']

export default function ProductCatalog() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua')
  const { MagnifyingGlass } = icons

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return productCatalog.filter((product) => {
      const matchesFilter = filter === 'Semua' || product.category === filter
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized) || product.category.toLowerCase().includes(normalized)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <section className="catalog section-shell" id="katalog">
      <div className="catalog-toolbar">
        <h2>Katalog Produk</h2>
        <label className="search-box">
          <MagnifyingGlass size={18} weight="bold" />
          <input aria-label="Cari produk" placeholder="Cari produk..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="filter-chips" aria-label="Filter produk">
          {filters.map((item) => (
            <button className={filter === item ? 'is-active' : ''} key={item} onClick={() => setFilter(item)} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} />
            <span className="category-badge">{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <div>
              <span>★ {product.rating}</span>
              <strong>Tersedia</strong>
            </div>
          </article>
        ))}
      </div>
      {products.length === 0 && <p className="empty-state">Produk tidak ditemukan.</p>}
    </section>
  )
}
