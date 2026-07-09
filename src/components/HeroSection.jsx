import { hero, icons } from '../data/content.js'
import logo from '../assets/jagofarm-logo.svg'

export default function HeroSection() {
  const { ArrowRight } = icons

  return (
    <main className="hero section-shell" id="beranda">
      <section className="hero-copy" aria-labelledby="hero-title">
        <img className="hero-logo" src={logo} alt="Jago Farm" />
        <span className="section-label">Ekosistem Pertanian Cerdas Berkelanjutan</span>
        <h1 id="hero-title">Pertanian Cerdas, Sirkular Tanpa Batas</h1>
        <p>
          Jago Farm membangun ekosistem pertanian dan peternakan terpadu berbasis AI & IoT untuk hasil berkualitas, efisiensi tinggi, dan lingkungan berkelanjutan.
        </p>
        <div className="hero-badges" aria-label="Keunggulan Jago Farm">
          {hero.badges.map(([label, Icon]) => (
            <span key={label}>
              <Icon size={18} weight="duotone" />
              {label}
            </span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#produk">
            Jelajahi Ekosistem Kami
            <ArrowRight size={18} weight="bold" />
          </a>
          <a className="button button-secondary" href="#katalog">
            Lihat Produk
          </a>
        </div>
        <div className="hero-metrics">
          {hero.metrics.map(([value, label, Icon]) => (
            <article key={label}>
              <Icon size={22} weight="duotone" />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="hero-media" aria-label="Smart farming Jago Farm">
        <img src={hero.image} alt="Ekosistem Jago Farm dengan greenhouse, melon, ayam, ikan, sensor IoT, dan pemantauan AI" />
        {hero.callouts.map(([title, text], index) => (
          <article className={`hero-callout callout-${index + 1}`} key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>
    </main>
  )
}
