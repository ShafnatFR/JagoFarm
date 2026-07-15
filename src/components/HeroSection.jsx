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

      <section className="latest-article section-shell motion-section" id="artikel">
        <div className="article-container">
          <span className="section-label motion-item">Artikel Terbaru</span>
          <h2 className="motion-item">Kabar terkini dari <strong>JagoFarm</strong></h2>
          <p className="article-subtitle motion-item">
            Temukan insight seputar agritech dan perkembangan terbaru startup kami.
          </p>
          <div className="facebook-embed-card motion-item">
            <iframe
              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02LLx6nmc1pSRzpMmfY5AiLGKMFUgLdmEoD79At19QXNkkq9Ag7TPEbKpBWfL3N76sl%26id%3D61591492453217&show_text=true&width=500"
              style={{ border: "none", overflow: "hidden", width: "100%", height: "500px" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="JagoFarm Facebook Post"
            />
          </div>
        </div>
      </section>
    </>
  );
}
