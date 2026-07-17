import { useMemo } from 'react'
import { postImage, selectProductPosts } from '../lib/cms.js'
import Masonry from './Masonry.jsx'
import { productCatalog } from '../data/content.js'

const DEFAULT_DATA = {}

export default function FeaturedProductsSection({ data = DEFAULT_DATA, posts = [] }) {
  const products = useMemo(() => selectProductPosts(posts, { ...data, jumlah_post: Number.MAX_SAFE_INTEGER }).map((post, index) => ({
    name: post?.title || 'Produk',
    image: postImage(post) || productCatalog[index % productCatalog.length]?.image,
    fallback: productCatalog[index % productCatalog.length]?.image,
    height: [900, 520, 760, 620, 840, 500, 720, 580][index % 8],
  })), [data, posts]);
  const masonryItems = useMemo(() => products.map((product) => ({ id: product.name, img: product.image, fallback: product.fallback, height: product.height })), [products])
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
        {products.length ? <Masonry items={masonryItems} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus={false} /> : <p aria-live="polite">Produk sedang disiapkan.</p>}
      </div>
    </section>
  );
}
