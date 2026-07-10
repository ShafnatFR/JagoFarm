import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { hero, icons } from "../data/content.js";
import logo from "../assets/jagofarm-logo.svg";

export default function HeroSection({ onNavigate }) {
  const { ArrowRight } = icons;
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
    <main
      className="hero section-shell motion-section"
      id="beranda"
      ref={heroRef}
    >
      <section className="hero-copy" aria-labelledby="hero-title">
      
        <h1 className="hero-animate motion-item" id="hero-title">
          Satu farm. Banyak siklus. Nol limbah.
        </h1>
        <p className="hero-animate motion-item">
          Jago Farm menghubungkan budidaya ikan, ayam, tanaman, dan sensor
          lapangan menjadi sistem pangan yang terukur dari input sampai panen.
        </p>
        <div
          className="hero-badges hero-animate"
          aria-label="Keunggulan Jago Farm"
        >
          {hero.badges.map(([label, Icon]) => (
            <span key={label}>
              <Icon size={18} weight="duotone" />
              {label}
            </span>
          ))}
        </div>
        <div className="hero-actions hero-animate">
          <button
            className="button button-primary"
            onClick={() => onNavigate("#tentang")}
            type="button"
          >
            Lihat Alur Sirkular
            <ArrowRight size={18} weight="bold" />
          </button>
          <button
            className="button button-secondary"
            onClick={() => onNavigate("/katalog")}
            type="button"
          >
            Buka Katalog
          </button>
        </div>
        <div className="hero-metrics hero-animate">
          {hero.metrics.map(([value, label, Icon]) => (
            <article key={label}>
              <Icon size={22} weight="duotone" />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>
      <section
        className="hero-media hero-scene"
        aria-label="Smart farming Jago Farm"
      >
        <img
          className="hero-photo"
          src={hero.image}
          alt="Ekosistem Jago Farm dengan greenhouse, melon, ayam, ikan, sensor IoT, dan pemantauan AI"
        />
      </section>
    </main>
  );
}
