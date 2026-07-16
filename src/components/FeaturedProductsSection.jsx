import { productCatalog } from "../data/content.js";
import { validImageUrl } from '../lib/cms.js'

export default function FeaturedProductsSection({ data = {} }) {
  const products = Array.isArray(data.images) ? data.images.map((item, index) => ({
    name: item?.judul_gambar || item?.caption || `Galeri ${index + 1}`,
    image: validImageUrl(item?.image_url),
  })) : productCatalog;
  return (
    <section
      className="featured-products section-shell motion-section"
      id="produk"
    >
      <div className="section-heading featured-heading">
        <h2 className="motion-item">{data.title || 'Produk tumbuh dari alur yang sama.'}</h2>
        <p className="motion-item">
          {data.subtitle || 'Setiap produk membawa jejak ekosistem: limbah menjadi pakan, air kembali dimanfaatkan, dan data membantu menjaga kualitas.'}
        </p>
      </div>

      <div
        className="product-gallery motion-item"
        aria-label="Galeri produk unggulan"
      >
        {products.map((product) => (
          <figure
            className="product-gallery-item"
            key={product.name}
          >
            {product.image && <img src={product.image} alt={product.name} referrerPolicy="no-referrer" loading="lazy" />}
            <figcaption>{product.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
