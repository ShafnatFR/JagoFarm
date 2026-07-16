import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { ArrowLeft, Compass, Sparkle, Wrench, ShieldCheck, ClockClockwise } from '@phosphor-icons/react'

export default function UnderConstructionPage({ page = 'home', onNavigate, pages = [], cmsLoaded = false }) {
  // Helper to resolve dynamic details based on targeted page
  const getPageMeta = (targetPage) => {
    switch (targetPage) {
      case 'home':
        return {
          badge: 'Sistem Beranda Dinonaktifkan Sementara',
          title: 'Beranda Dalam Tahap Konstruksi & Peningkatan',
          subtitle: 'Pembaruan Ekosistem & Visualisasi Utama',
          description: 'Tim teknis kami saat ini sedang melakukan pembaruan menyeluruh pada struktur halaman Beranda JagoFarm. Seluruh siklus circular economy, pemantauan data sensor IoT, dan sajian visualisasi interaktif sedang disempurnakan demi menghadirkan standar masa depan pangan terintegrasi yang lebih canggih.',
          targetName: 'Beranda Utama',
        }
      case 'catalog':
        return {
          badge: 'Katalog Produk Dinonaktifkan Sementara',
          title: 'Etalase Produk Sedang Dalam Kurasi',
          subtitle: 'Penyegaran Inventaris & Hasil Panen Sirkular',
          description: 'Halaman Katalog Produk JagoFarm (mulai dari ayam probiotik super, telur omega presisi, gurame & lele sirkular, hingga pupuk cair organik dan maggot BSF) saat ini sedang diperbarui dengan spesifikasi terbaru langsung dari pusat farm kami.',
          targetName: 'Katalog Produk',
        }
      case 'about':
        return {
          badge: 'Profil Perusahaan Dinonaktifkan Sementara',
          title: 'Halaman Tentang Kami Sedang Disiapkan',
          subtitle: 'Mencatat Jejak & Visi Masa Depan Pangan',
          description: 'Kisah perjalanan JagoFarm, filosofi nol limbah (Zero Waste), serta pengenalan tim rekayasawan dan praktisi agronomi kami saat ini sedang dalam proses redaksi untuk menyajikan transparansi dan kolaborasi yang lebih mendalam.',
          targetName: 'Tentang Kami',
        }
      case 'contact':
        return {
          badge: 'Saluran Kontak Dinonaktifkan Sementara',
          title: 'Layanan Kontak Sedang Dalam Pembaruan',
          subtitle: 'Optimalisasi Jalur Komunikasi & Integrasi AI',
          description: 'Kami sedang melakukan pemeliharaan pada sistem formulir otomatis dan integrasi komunikasi tim JagoFarm. Sementara penyesuaian dilakukan, Anda tetap dapat terhubung melalui tautan alternatif yang aktif di bawah ini.',
          targetName: 'Hubungi Kami',
        }
      default:
        return {
          badge: 'Halaman Dalam Pemeliharaan',
          title: 'Halaman Sedang Dalam Tahap Konstruksi',
          subtitle: 'Pengembangan Fitur & Optimalisasi Sistem',
          description: 'Halaman yang Anda tuju saat ini dinonaktifkan sementara dari panel administrator CMS untuk proses pembaruan sistem, integrasi API terbaru, dan penyempurnaan antarmuka.',
          targetName: 'Halaman Ini',
        }
    }
  }

  const meta = getPageMeta(page)

  // Identify which pages ARE published right now so user isn't stranded
  const activeLinks = []
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'beranda' || p?.slug === 'home'))) {
    if (page !== 'home') activeLinks.push({ label: 'Beranda', target: '#beranda', desc: 'Kembali ke halaman utama ekosistem' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'produk' || p?.slug === 'katalog'))) {
    if (page !== 'catalog') activeLinks.push({ label: 'Katalog Produk', target: '/produk', desc: 'Jelajahi hasil panen & teknologi sirkular' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'tentang-kami' || p?.slug === 'about'))) {
    if (page !== 'about') activeLinks.push({ label: 'Tentang Kami', target: '/tentang-kami', desc: 'Kenali visi, misi, dan tim pemikir JagoFarm' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'hubungi-kami' || p?.slug === 'kontak'))) {
    if (page !== 'contact') activeLinks.push({ label: 'Hubungi Kami', target: '/hubungi-kami', desc: 'Konsultasi kolaborasi & pertanyaan umum' })
  }

  return (
    <main className="under-construction-shell motion-section" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 80px' }}>
      <div className="section-shell" style={{ maxWidth: '1180px', width: '100%' }}>
        <div className="under-construction-card" style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '32px',
          padding: 'clamp(36px, 6vw, 64px)',
          boxShadow: 'var(--shadow)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Subtle glowing accent background */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'var(--forest)',
            filter: 'blur(160px)',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }} />

          {/* Left Column: Lottie Animation Container */}
          <div className="lottie-showcase" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '1/1',
              borderRadius: '28px',
              background: 'var(--surface-soft)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              position: 'relative',
              boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.03)'
            }}>
              <DotLottieReact
                src="https://lottie.host/a7c50805-5120-41fb-af12-c86a7e110c0e/F3gNV6EH4g.json"
                loop
                autoplay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--forest)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
              }}>
                <Wrench size={16} weight="bold" className="motion-spin-slow" />
                <span>Under Construction</span>
              </div>
            </div>
            
            {/* Quick Status Bar below lottie */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--muted)' }}>
                <ClockClockwise size={16} weight="bold" style={{ color: 'var(--forest)' }} />
                <span>Pembaruan Berkala</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--muted)' }}>
                <ShieldCheck size={16} weight="bold" style={{ color: 'var(--leaf)' }} />
                <span>Data Aman & Tersinkron</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Explanations & Active Destinations */}
          <div className="construction-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--leaf-soft)', border: '1px solid var(--forest)', padding: '6px 16px', borderRadius: '999px', width: 'fit-content' }}>
              <Sparkle size={16} weight="fill" style={{ color: 'var(--forest)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--forest)', letterSpacing: '0.02em' }}>
                {meta.badge}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2, margin: 0 }}>
              {meta.title}
            </h1>

            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--forest)', margin: '-4px 0 0' }}>
              {meta.subtitle}
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text)', margin: 0, opacity: 0.9 }}>
              {meta.description}
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--line)', margin: '8px 0' }} />

            {/* Active Pages Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Compass size={18} weight="bold" style={{ color: 'var(--forest)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Halaman Alternatif Yang Aktif Saat Ini:
                </span>
              </div>

              {activeLinks.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {activeLinks.map((link) => (
                    <button
                      key={link.target}
                      onClick={() => onNavigate(link.target)}
                      type="button"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        padding: '14px 18px',
                        borderRadius: '16px',
                        background: 'var(--surface-soft)',
                        border: '1px solid var(--line)',
                        transition: 'all 260ms ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--forest)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(12, 94, 54, 0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--line)'
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>{link.label}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.4 }}>{link.desc}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--surface-soft)', border: '1px dashed var(--line)', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>Seluruh halaman sedang dalam pemeliharaan sistem.</p>
                </div>
              )}
            </div>

            {/* Back button */}
            <div style={{ marginTop: '6px' }}>
              <button
                onClick={() => {
                  if (activeLinks.length > 0) {
                    onNavigate(activeLinks[0].target)
                  } else {
                    window.location.reload()
                  }
                }}
                className="button-primary"
                type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '999px', fontWeight: 700 }}
              >
                <ArrowLeft size={18} weight="bold" />
                <span>Kembali ke {activeLinks.length > 0 ? activeLinks[0].label : 'Halaman Sebelumnya'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
