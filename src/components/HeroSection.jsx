import { useEffect, useRef } from "react";
import { animate } from "animejs";
import dayHero from '../assets/hero-farm-day.png'
import nightHero from '../assets/hero-farm-night.png'
import { validImageUrl } from '../lib/cms.js'

export default function HeroSection({ theme, onToggleTheme, data = {} }) {
  const heroRef = useRef(null);

  // Normalize CMS data — support both `stats_list` and `stats` arrays
  const statsList = Array.isArray(data.stats_list)
    ? data.stats_list
    : Array.isArray(data.stats)
      ? data.stats.map((s) => (typeof s === 'object' && s !== null ? { value: s.value || '', label: s.label || '' } : { value: '', label: '' }))
      : []

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const intro = animate(root.querySelectorAll(".hero-animate"), {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 760,
      delay: (_, index) => index * 75,
      ease: "out(3)",
    });
    const scene = animate(root.querySelector(".hero-scene"), {
      opacity: [0, 1],
      scale: [0.96, 1],
      rotateY: [-6, 0],
      duration: 1100,
      delay: 180,
      ease: "out(3)",
    });

    return () => {
      intro.cancel();
      scene.cancel();
    };
  }, []);

  return (
    <>
      <main
        className="hero motion-section"
        id="beranda"
        ref={heroRef}
      >
        <div className="hero-scene" aria-hidden="true">
          <img className="hero-photo hero-photo-day" src={validImageUrl(data.background_image) || dayHero} alt="" referrerPolicy="no-referrer" />
          <img className="hero-photo hero-photo-night" src={nightHero} alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <section className="hero-copy" aria-labelledby="hero-title">
          <span className="hero-eyebrow hero-animate">{data.eyebrow || 'Sistem pangan terintegrasi'}</span>
          <h1 className="hero-animate motion-item" id="hero-title">
            {data.headline || 'Satu farm. Banyak siklus. Nol limbah.'}
          </h1>
          <p className="hero-animate motion-item">
            {data.sub_headline || 'Jago Farm menghubungkan budidaya ikan, ayam, tanaman, dan sensor lapangan menjadi sistem pangan yang terukur dari input sampai panen.'}
          </p>
          {statsList.length > 0 && <div className="hero-metrics">{statsList.map((stat, index) => <article key={index}><strong>{stat?.value || ''}</strong><span>{stat?.label || ''}</span></article>)}</div>}
        </section>
        <button
          className="hero-sky-toggle hero-animate"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode malam'}
          title={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode malam'}
        />
      </main>

    </>
  );
}
