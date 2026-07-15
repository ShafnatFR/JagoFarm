import { useEffect, useRef } from "react";
import { animate } from "animejs";
import dayHero from '../assets/hero-farm-day.png'
import nightHero from '../assets/hero-farm-night.png'

export default function HeroSection({ theme, onToggleTheme }) {
  const heroRef = useRef(null);

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
          <img className="hero-photo hero-photo-day" src={dayHero} alt="" />
          <img className="hero-photo hero-photo-night" src={nightHero} alt="" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <section className="hero-copy" aria-labelledby="hero-title">
          <span className="hero-eyebrow hero-animate">Sistem pangan terintegrasi</span>
          <h1 className="hero-animate motion-item" id="hero-title">
            Satu farm. Banyak siklus. Nol limbah.
          </h1>
          <p className="hero-animate motion-item">
            Jago Farm menghubungkan budidaya ikan, ayam, tanaman, dan sensor
            lapangan menjadi sistem pangan yang terukur dari input sampai panen.
          </p>
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
