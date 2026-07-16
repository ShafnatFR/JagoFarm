import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { ArrowRight, Compass, Sparkle, Wrench, ShieldCheck, ClockClockwise } from '@phosphor-icons/react'

export default function UnderConstructionPage({ page = 'home', onNavigate, pages = [], cmsLoaded = false }) {
  // Helper to resolve dynamic details based on targeted page
  const getPageMeta = (targetPage) => {
    switch (targetPage) {
      case 'home':
        return {
          badge: 'Sistem Beranda Dinonaktifkan Sementara',
          title: 'Beranda Dalam Tahap Konstruksi & Peningkatan',
          subtitle: 'Pembaruan Ekosistem & Visualisasi Utama',
          description: 'Tim teknis kami saat ini sedang melakukan pembaruan menyeluruh langsung pada struktur halaman Beranda JagoFarm. Seluruh siklus circular economy, pemantauan data sensor IoT, dan sajian visualisasi interaktif sedang disempurnakan demi menghadirkan standar masa depan pangan terintegrasi yang lebih canggih.',
          targetName: 'Beranda Utama',
        }
      case 'catalog':
        return {
          badge: 'Katalog Produk Dinonaktifkan Sementara',
          title: 'Etalase Produk Sedang Dalam Kurasi',
          subtitle: 'Penyegaran Inventaris & Hasil Panen Sirkular',
          description: 'Halaman Katalog Produk JagoFarm (mulai dari ayam probiotik super, telur omega presisi, gurame & lele sirkular, hingga pupuk cair organik dan maggot BSF) saat ini sedang diperbarui dengan kurasi dan spesifikasi terbaru langsung dari pusat farm kami.',
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

  // Identify which pages ARE published right now
  const activeLinks = []
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'beranda' || p?.slug === 'home'))) {
    if (page !== 'home') activeLinks.push({ label: 'Beranda Utama', target: '#beranda', desc: 'Kembali ke halaman utama ekosistem JagoFarm' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'produk' || p?.slug === 'katalog'))) {
    if (page !== 'catalog') activeLinks.push({ label: 'Katalog Produk', target: '/produk', desc: 'Jelajahi hasil panen organik & teknologi sirkular' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'tentang-kami' || p?.slug === 'about'))) {
    if (page !== 'about') activeLinks.push({ label: 'Tentang Kami', target: '/tentang-kami', desc: 'Kenali visi, misi, dan jajaran tim pemikir JagoFarm' })
  }
  if (!cmsLoaded || (Array.isArray(pages) && pages.some((p) => p?.slug === 'hubungi-kami' || p?.slug === 'kontak'))) {
    if (page !== 'contact') activeLinks.push({ label: 'Hubungi Kami', target: '/hubungi-kami', desc: 'Konsultasi kolaborasi, kunjungan farm, & layanan cepat' })
  }

  return (
    <main
      className="under-construction-hero motion-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(140px, 14vh, 180px) clamp(24px, 6vw, 96px) clamp(80px, 10vh, 140px)',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient radial lighting */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '600px',
          height: '600px',
          background: 'var(--forest)',
          filter: 'blur(200px)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'var(--leaf)',
          filter: 'blur(220px)',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Full-bleed responsive 2-column layout */}
      <div
        style={{
          width: 'min(100%, 1640px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Full Page Explanations & Active Destinations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--leaf-soft)',
              border: '1px solid var(--forest)',
              padding: '8px 20px',
              borderRadius: '999px',
              width: 'fit-content',
              boxShadow: '0 4px 20px rgba(12, 94, 54, 0.08)'
            }}
          >
            <Sparkle size={18} weight="fill" style={{ color: 'var(--forest)' }} />
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--forest)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              {meta.badge}
            </span>
          </div>

          {/* Huge Hero Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                fontWeight: 800,
                color: 'var(--ink)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {meta.title}
            </h1>
            <div
              style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                fontWeight: 600,
                color: 'var(--forest)',
                lineHeight: 1.4
              }}
            >
              {meta.subtitle}
            </div>
          </div>

          {/* Expansive Description */}
          <p
            style={{
              fontSize: 'clamp(1.08rem, 1.3vw, 1.25rem)',
              lineHeight: 1.8,
              color: 'var(--text)',
              margin: 0,
              maxWidth: '680px',
              opacity: 0.92
            }}
          >
            {meta.description}
          </p>

          {/* Status indicators */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--muted)' }}>
              <ClockClockwise size={20} weight="bold" style={{ color: 'var(--forest)' }} />
              <span>Sistem Pemantauan Berkala</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--muted)' }}>
              <ShieldCheck size={20} weight="bold" style={{ color: 'var(--leaf)' }} />
              <span>Data Aman & Terproteksi 100%</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--line)', margin: '12px 0 4px', maxWidth: '680px' }} />

          {/* Active Destinations Full-width Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={22} weight="bold" style={{ color: 'var(--forest)' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Halaman Pilihan Yang Aktif Saat Ini:
              </span>
            </div>

            {activeLinks.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {activeLinks.map((link) => (
                  <button
                    key={link.target}
                    onClick={() => onNavigate(link.target)}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '20px 24px',
                      borderRadius: '22px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      transition: 'all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                      cursor: 'pointer',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--forest)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 16px 40px rgba(12, 94, 54, 0.12)'
                      e.currentTarget.style.background = 'var(--surface-soft)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)'
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.02)'
                      e.currentTarget.style.background = 'var(--surface)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>{link.label}</span>
                      <span style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.4 }}>{link.desc}</span>
                    </div>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--leaf-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--forest)',
                      flexShrink: 0
                    }}>
                      <ArrowRight size={20} weight="bold" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ padding: '24px', borderRadius: '20px', background: 'var(--surface)', border: '1px dashed var(--line)', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--muted)' }}>Seluruh halaman sedang dalam pemeliharaan sistem JagoFarm.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Expansive, Free-floating Lottie Animation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(380px, 50vw, 640px)'
          }}
        >
          {/* Subtle glowing pedestal underneath animation */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--leaf-soft) 0%, transparent 70%)',
              filter: 'blur(36px)',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '620px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DotLottieReact
              src="https://lottie.host/a7c50805-5120-41fb-af12-c86a7e110c0e/F3gNV6EH4g.json"
              loop
              autoplay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Floating badge below animation */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              marginTop: '-24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              padding: '10px 22px',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--forest)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)'
            }}
          >
            <Wrench size={20} weight="bold" className="motion-spin-slow" />
            <span>Under Construction • JagoFarm Tech Suite</span>
          </div>
        </div>
      </div>
    </main>
  )
}
