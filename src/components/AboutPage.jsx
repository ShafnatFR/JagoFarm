import { Suspense, lazy, useMemo } from "react";
import {
  aboutHeroText as defaultHero,
  aboutStats as defaultStats,
  coreValues as defaultValues,
  galleryItems as defaultGallery,
  storyTimeline as defaultTimeline,
} from "../data/aboutContent.js";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { ErrorBoundary3D } from "./Nametag2D.jsx";
const TeamLanyards = lazy(() => import("./TeamLanyards.jsx"));

export default function AboutPage({ onNavigate, pageData = null }) {
  // Extract CMS blocks
  const heroBlock = useMemo(() => Array.isArray(pageData?.content) ? pageData.content.find((b) => b?.type === 'hero') : null, [pageData]);
  const featuresBlocks = useMemo(() => Array.isArray(pageData?.content) ? pageData.content.filter((b) => b?.type === 'features') : [], [pageData]);
  const galleryBlock = useMemo(() => Array.isArray(pageData?.content) ? pageData.content.find((b) => b?.type === 'gallery') : null, [pageData]);
  const teamBlock = useMemo(() => Array.isArray(pageData?.content) ? pageData.content.find((b) => b?.type === 'team') : null, [pageData]);
  const ctaBlock = useMemo(() => Array.isArray(pageData?.content) ? pageData.content.slice().reverse().find((b) => b?.type === 'hero' && b?.data?.cta_buttons?.length) : null, [pageData]);

  // Hero section data
  const aboutHeroText = heroBlock?.data ? {
    title: heroBlock.data.headline || defaultHero.title,
    description: heroBlock.data.sub_headline || defaultHero.description,
  } : defaultHero;

  const aboutStats = heroBlock?.data && Array.isArray(heroBlock.data.stats)
    ? heroBlock.data.stats.map((s) => ({ value: s.value, label: s.label }))
    : defaultStats;

  // Timeline from first features block
  const storyTimeline = featuresBlocks[0]?.data && Array.isArray(featuresBlocks[0].data.items)
    ? featuresBlocks[0].data.items.map((item) => ({
        year: Array.isArray(item.labels) && item.labels.length > 1 ? item.labels[1] : '',
        title: item.title || '',
        description: item.description || '',
        badge: Array.isArray(item.labels) ? item.labels[0] : '',
        Icon: Sparkle,
      }))
    : defaultTimeline;

  // Core values from second features block
  const coreValues = featuresBlocks[1]?.data && Array.isArray(featuresBlocks[1].data.items)
    ? featuresBlocks[1].data.items.map((item) => ({
        title: item.title || '',
        description: item.description || '',
        Icon: Sparkle,
        color: '#0c6b3b',
      }))
    : defaultValues;

  // Gallery
  const galleryItems = galleryBlock?.data && Array.isArray(galleryBlock.data.images)
    ? galleryBlock.data.images.map((img) => ({
        title: img.image_title || img.caption || img.alt_text || '',
        category: img.category || '',
        image: img.url || '',
        colSpan: 'span 1',
        rowSpan: 'span 1',
      }))
    : defaultGallery;

  // CTA block
  const ctaData = ctaBlock?.data || {};

  return (
    <main className="about-page page-shell">
      {/* 1. Hero Section */}
      <section className="about-hero motion-section">
        <div className="about-copy">
          <span className="section-badge motion-item">
            <Sparkle size={18} weight="fill" />
            Tentang Jago Farm
          </span>
          <h1 className="motion-item">{aboutHeroText.title}</h1>
          <p className="motion-item">{aboutHeroText.description}</p>
          <div className="about-stats motion-item">
            {aboutStats.map(({ value, label }) => (
              <div className="stat-item" key={label}>
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero-lottie motion-item" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <dotlottie-wc
            src="https://lottie.host/326750a1-bdd7-4851-af58-f920b386d4eb/jRd76tjbwp.json"
            style={{ width: "300px", height: "300px" }}
            background="transparent"
            autoplay
            loop
          ></dotlottie-wc>
        </div>
      </section>

      {/* 2. Cerita Pendirian & Timeline */}
      <section className="about-story section-shell motion-section">
        <div className="section-heading">
          <h2 className="motion-item">{featuresBlocks[0]?.data?.title || 'Perjalanan & Cerita Kami'}</h2>
          <p className="motion-item">
            {featuresBlocks[0]?.data?.subtitle || 'Dari riset sederhana biokonversi limbah organik hingga menjadi ekosistem terintegrasi dengan ratusan mitra peternak dan petani lokal.'}
          </p>
        </div>
        <div className="story-timeline">
          {storyTimeline.map(({ year, title, description, badge, Icon }) => (
            <article className="timeline-card motion-item" key={year || title}>
              <div className="timeline-header">
                <span className="timeline-year">{year}</span>
                {badge && <span className="timeline-badge">{badge}</span>}
              </div>
              <div className="timeline-icon">
                <Icon size={32} weight="duotone" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Visi, Misi & Nilai Inti */}
      <section className="about-values section-shell motion-section">
        <div className="section-heading">
          <h2 className="motion-item">{featuresBlocks[1]?.data?.title || 'Nilai Inti & Pilar Sirkularitas'}</h2>
          <p className="motion-item">
            {featuresBlocks[1]?.data?.subtitle || 'Empat prinsip fundamental yang memandu setiap langkah rekayasa teknologi, budidaya pangan, dan kemitraan di Jago Farm.'}
          </p>
        </div>
        <div className="values-grid">
          {coreValues.map(({ title, description, Icon, color }) => (
            <article className="value-card motion-item" key={title}>
              <div className="value-icon-wrapper" style={{ background: `${color}1a`, color }}>
                <Icon size={36} weight="duotone" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Kepemimpinan & Tim Inti (TeamLanyards) */}
      <ErrorBoundary3D fallback={<section className="team-lanyards-container section-shell" aria-hidden="true" />}>
        <Suspense
          fallback={<section className="team-lanyards-container section-shell" aria-hidden="true" />}
        >
          <TeamLanyards data={teamBlock?.data} />
        </Suspense>
      </ErrorBoundary3D>

      {/* 5. Galeri Di Balik Layar */}
      <section className="about-gallery section-shell motion-section">
        <div className="section-heading">
          <h2 className="motion-item">{galleryBlock?.data?.title || 'Infrastruktur & Di Balik Layar'}</h2>
          <p className="motion-item">
            {galleryBlock?.data?.subtitle || 'Dokumentasi nyata fasilitas smart farming, akuaponik terpadu, dan integrasi sensor IoT di fasilitas Jago Farm.'}
          </p>
        </div>
        <div className="gallery-bento">
          {galleryItems.map(({ title, category, image }, index) => (
            <article
              className="gallery-item motion-item"
              key={index}
            >
              {image && <img src={image} alt={title} referrerPolicy="no-referrer" loading="lazy" decoding="async" />}
              <div className="gallery-overlay">
                {category && <span className="gallery-category">{category}</span>}
                <h3>{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CTA Penutup */}
      <section className="about-cta section-shell motion-section">
        <div className="cta-box motion-item">
          <div className="cta-content">
            <span className="section-badge">Kolaborasi & Kemitraan</span>
            <h2>{ctaData.headline || 'Mari Bangun Masa Depan Pangan Bersama Kami'}</h2>
            <p>
              {ctaData.sub_headline || 'Apakah Anda peternak, petani, atau investor yang tertarik merevolusi industri pangan dengan pendekatan sirkular dan teknologi AI/IoT? Jago Farm terbuka untuk kemitraan strategis.'}
            </p>
          </div>
          <div className="cta-actions">
            <button className="cta-btn-primary" onClick={() => onNavigate('/hubungi-kami')} type="button">
              Hubungi Tim Kami
              <ArrowRight size={20} weight="bold" />
            </button>
            <button className="cta-btn-secondary" onClick={() => onNavigate('#solusi')} type="button">
              Lihat Solusi IoT
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
