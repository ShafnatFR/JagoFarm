import { Suspense, lazy } from "react";
import {
  aboutHeroText,
  aboutStats,
  coreValues,
  galleryItems,
  storyTimeline,
} from "../data/aboutContent.js";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

const Nametag3D = lazy(() => import("./Nametag3D.jsx"));
const TeamLanyards = lazy(() => import("./TeamLanyards.jsx"));

export default function AboutPage({ onNavigate }) {
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
        <Suspense fallback={<div className="nametag-skeleton" aria-hidden="true">
          <div className="nametag-shimmer" />
        </div>}>
          <Nametag3D />
        </Suspense>
      </section>

      {/* 2. Cerita Pendirian & Timeline */}
      <section className="about-story section-shell motion-section">
        <div className="section-heading">
          <h2 className="motion-item">Perjalanan & Cerita Kami</h2>
          <p className="motion-item">
            Dari riset sederhana biokonversi limbah organik hingga menjadi ekosistem terintegrasi dengan ratusan mitra peternak dan petani lokal.
          </p>
        </div>
        <div className="story-timeline">
          {storyTimeline.map(({ year, title, description, badge, Icon }) => (
            <article className="timeline-card motion-item" key={year}>
              <div className="timeline-header">
                <span className="timeline-year">{year}</span>
                <span className="timeline-badge">{badge}</span>
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
          <h2 className="motion-item">Nilai Inti & Pilar Sirkularitas</h2>
          <p className="motion-item">
            Empat prinsip fundamental yang memandu setiap langkah rekayasa teknologi, budidaya pangan, dan kemitraan di Jago Farm.
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
      <Suspense
        fallback={<section className="team-lanyards-container section-shell" aria-hidden="true" />}
      >
        <TeamLanyards />
      </Suspense>

      {/* 5. Galeri Di Balik Layar */}
      <section className="about-gallery section-shell motion-section">
        <div className="section-heading">
          <h2 className="motion-item">Infrastruktur & Di Balik Layar</h2>
          <p className="motion-item">
            Dokumentasi nyata fasilitas smart farming, akuaponik terpadu, dan integrasi sensor IoT di fasilitas Jago Farm.
          </p>
        </div>
        <div className="gallery-bento">
          {galleryItems.map(({ title, category, image, colSpan, rowSpan }, index) => (
            <article
              className="gallery-item motion-item"
              key={index}
              style={{ gridColumn: colSpan, gridRow: rowSpan }}
            >
              <img src={image} alt={title} referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              <div className="gallery-overlay">
                <span className="gallery-category">{category}</span>
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
            <h2>Mari Bangun Masa Depan Pangan Bersama Kami</h2>
            <p>
              Apakah Anda peternak, petani, atau investor yang tertarik merevolusi industri pangan dengan pendekatan sirkular dan teknologi AI/IoT? Jago Farm terbuka untuk kemitraan strategis.
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
