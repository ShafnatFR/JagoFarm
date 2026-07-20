import { useMemo, useState } from "react";
import { MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  formatCmsDate,
  postContent,
  postImage,
  selectArticlePosts,
} from "../lib/cms.js";

export default function ArticleCatalog({
  posts = [],
  categories = [],
  onNavigate,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");

  const allArticles = useMemo(() => {
    return selectArticlePosts(posts, { jumlah_post: 99999 });
  }, [posts]);

  const articleCategories = useMemo(() => {
    const cats = new Set(["Semua"]);
    allArticles.forEach((post) => {
      if (
        post.category_name &&
        post.category_name !== "Artikel" &&
        post.category_name !== "Produk"
      ) {
        cats.add(post.category_name);
      } else if (
        post.category_slug &&
        post.category_slug !== "artikel" &&
        post.category_slug !== "produk"
      ) {
        cats.add(post.category_slug);
      }
    });
    return Array.from(cats);
  }, [allArticles]);

  const filteredArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allArticles.filter((post) => {
      const categoryMatch =
        filter === "Semua" ||
        String(
          post?.category_name || post?.category_slug || "",
        ).toLowerCase() === filter.toLowerCase();
      const title = String(post?.title || "").toLowerCase();
      const excerpt = String(
        post?.excerpt || postContent(post).excerpt || "",
      ).toLowerCase();
      const queryMatch =
        !normalized ||
        title.includes(normalized) ||
        excerpt.includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [allArticles, filter, query]);

  return (
    <main className="catalog article-catalog page-shell" id="katalog-artikel">
      <header className="catalog-hero motion-section">
        <div>
          <div className="article-catalog-badge motion-item">
            <Sparkle size={18} weight="fill" />
            <span>Wawasan & Literasi Agritech</span>
          </div>
          <h1 className="motion-item">
            Kabar & Artikel <strong>JagoFarm</strong>
          </h1>
          <p className="motion-item">
            Kumpulan seluruh artikel, cerita perjalanan inovasi agritech, serta
            wawasan mendalam seputar ekosistem pangan sirkular dari tim
            JagoFarm.
          </p>
        </div>
        <div
          className="article-catalog-hero-icon motion-item"
          aria-hidden="true"
        >
          <div className="catalog-splash-outer" />
          <div className="catalog-splash-inner" />
          <div className="catalog-splash-ring" />
          <div className="catalog-splash-shadow" />
          <div className="catalog-lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/e244af69-27a2-429b-b143-63617e0adf01/qBouQo2veE.json"
              style={{ width: "100%", height: "100%" }}
              renderConfig={{ devicePixelRatio: 1.25 }}
              autoplay
              loop
            />
          </div>
        </div>
      </header>

      <div className="catalog-toolbar motion-section">
        <h2 className="motion-item">
          Daftar Artikel ({filteredArticles.length})
        </h2>
        <label className="search-box motion-item">
          <MagnifyingGlass size={18} weight="bold" />
          <input
            aria-label="Cari artikel"
            placeholder="Cari judul atau topik artikel..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {articleCategories.length > 1 && (
          <div className="filter-chips" aria-label="Filter artikel">
            {articleCategories.map((item) => (
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
        )}
      </div>

      <div className="article-catalog-grid">
        {filteredArticles.map((post) => {
          const img = postImage(post);
          const excerpt = post.excerpt || postContent(post).excerpt || "";
          return (
            <article className="article-card" key={post.id || post.slug}>
              <button
                type="button"
                onClick={() =>
                  onNavigate?.(`/artikel/${encodeURIComponent(post.slug)}`)
                }
              >
                <div className="article-card-media">
                  {img && (
                    <img
                      src={img}
                      alt={post.title || ""}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="article-card-copy">
                  <small>
                    {formatCmsDate(post.published_at || post.created_at)}
                  </small>
                  <h3>{post.title || "Tanpa judul"}</h3>
                  <p>{excerpt}</p>
                  <span>Baca artikel →</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="empty-state motion-item">
          <p>Artikel tidak ditemukan.</p>
        </div>
      )}
    </main>
  );
}
