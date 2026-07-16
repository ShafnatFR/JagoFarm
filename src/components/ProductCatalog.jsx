import { useMemo, useState } from "react";
import { icons } from "../data/content.js";
import { postContent, postImage } from '../lib/cms.js'

export default function ProductCatalog({ posts = [], categories = [] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const { MagnifyingGlass } = icons;

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => String(post?.template_type || '').toLowerCase() === 'produk').map((post) => ({
      id: post.id, name: post.title || 'Produk', category: post.category_name || post.category_slug || 'Lainnya', image: postImage(post), price: postContent(post).base_price,
    })).filter((product) => {
      const matchesFilter = filter === "Semua" || product.category === filter;
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, posts, query]);

  const filters = ["Semua", ...categories.filter((category) => category.slug !== 'artikel').map((category) => category.name)];

  return (
    <main className="catalog page-shell" id="katalog">
      <header className="catalog-hero motion-section">
        <h1 className="motion-item">Produk Jago Farm</h1>
        <p className="motion-item">
          Filter tanaman, hewan, dan perangkat yang lahir dari sistem produksi
          sirkular Jago Farm.
        </p>
      </header>

      <div className="catalog-toolbar motion-section">
        <h2 className="motion-item">Katalog Produk</h2>
        <label className="search-box motion-item">
          <MagnifyingGlass size={18} weight="bold" />
          <input
            aria-label="Cari produk"
            placeholder="Cari produk..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-chips" aria-label="Filter produk">
          {filters.map((item) => (
            <button
              className={filter === item ? "is-active" : ""}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id || product.name}>
            {product.image && <img src={product.image} alt={product.name} referrerPolicy="no-referrer" loading="lazy" />}
            <span className="category-badge">{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.price ? `Rp${Number(product.price).toLocaleString('id-ID')}` : 'Harga belum tersedia'}</p>
            <div>
              <strong>Tersedia</strong>
            </div>
          </article>
        ))}
      </div>
      {products.length === 0 && (
        <p className="empty-state">Produk tidak ditemukan.</p>
      )}
    </main>
  );
}
