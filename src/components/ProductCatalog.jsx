import { useMemo, useState } from "react";
import { productCatalog, icons } from "../data/content.js";

const filters = ["Semua", "Hewan", "Tanaman", "Perangkat"];

export default function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const { MagnifyingGlass } = icons;

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return productCatalog.filter((product) => {
      const matchesFilter = filter === "Semua" || product.category === filter;
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main className="catalog page-shell motion-section" id="katalog">
      <header className="catalog-hero">
        <h1 className="motion-item">Produk Jago Farm</h1>
        <p className="motion-item">
          Filter tanaman, hewan, dan perangkat yang lahir dari sistem produksi
          sirkular Jago Farm.
        </p>
      </header>

      <div className="catalog-toolbar motion-item">
        <h2>Katalog Produk</h2>
        <label className="search-box">
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
          <article className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} />
            <span className="category-badge">{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <div>
              <span>Rating {product.rating}</span>
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
