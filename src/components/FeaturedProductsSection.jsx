import { productCatalog } from "../data/content.js";

export default function FeaturedProductsSection() {
  return (
    <section
      className="featured-products section-shell motion-section"
      id="produk"
    >
      <div className="section-heading featured-heading">
        <h2 className="motion-item">Produk tumbuh dari alur yang sama.</h2>
        <p className="motion-item">
          Setiap produk membawa jejak ekosistem: limbah menjadi pakan, air
          kembali dimanfaatkan, dan data membantu menjaga kualitas.
        </p>
      </div>

      <div
        className="product-gallery motion-item"
        aria-label="Galeri produk unggulan"
      >
        {productCatalog.map((product) => (
          <figure
            className="product-gallery-item"
            key={product.name}
          >
            <img src={product.image} alt={product.name} loading="lazy" />
            <figcaption>{product.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
