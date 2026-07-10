import { Suspense, lazy } from "react";

const Nametag3D = lazy(() => import("./Nametag3D.jsx"));
const TeamLanyards = lazy(() => import("./TeamLanyards.jsx"));

export default function AboutPage() {
  return (
    <main className="about-page page-shell motion-section">
      <section className="about-hero">
        <div className="about-copy">
          <h1 className="motion-item">
            Tim kecil yang sedang membangun ekosistem pangan sirkular.
          </h1>
          <p className="motion-item">
            Halaman ini disiapkan untuk profil anggota startup, cerita
            pendirian, nilai kerja, dan peran tiap anggota. Konten detail
            sengaja dikosongkan dahulu.
          </p>
        </div>
        <Suspense fallback={<div className="nametag-3d" aria-hidden="true" />}>
          <Nametag3D />
        </Suspense>
      </section>

      <Suspense
        fallback={<section className="team-lanyards" aria-hidden="true" />}
      >
        <TeamLanyards />
      </Suspense>
    </main>
  );
}
