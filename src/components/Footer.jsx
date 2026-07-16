import {
  EnvelopeSimple,
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PhoneCall,
  WhatsappLogo,
  YoutubeLogo,
} from '@phosphor-icons/react'
import logo from '../assets/jagofarm-logo.svg'

const defaultLinks = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '/produk'],
  ['Tentang Kami', '/tentang-kami'],
  ['Hubungi Kami', '/kontak'],
]
const defaultProductLinks = ['Melon Presisi', 'Sayuran Organik', 'Ikan Air Tawar', 'Ayam Petelur', 'Perangkat Sensor IoT']
const defaultCompanyLinks = ['Tentang Kami', 'Karir & Magang', 'Mitra Peternak', 'Artikel & Jurnal', 'Kebijakan Privasi']

const socials = [
  ['TikTok', 'https://www.tiktok.com/@jagofarmcorporati', TikTokIcon],
  ['Instagram', 'https://www.instagram.com/jagofarm.corporation', InstagramLogo],
  ['LinkedIn', 'https://www.linkedin.com/company/133385899', LinkedinLogo],
  ['YouTube', 'https://www.youtube.com/@JagoFarm-g6p', YoutubeLogo],
]

function TikTokIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  )
}

function extractMapSrc(input) {
  if (!input || typeof input !== 'string') return null
  const trimmed = input.trim()
  const match = trimmed.match(/src=["']([^"']+)["']/i)
  if (match && match[1]) {
    return match[1]
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return null
}

function getDynamicSocials(settings) {
  const socialIconsMap = {
    tiktok: TikTokIcon,
    instagram: InstagramLogo,
    linkedin: LinkedinLogo,
    facebook: FacebookLogo,
    youtube: YoutubeLogo,
    whatsapp: WhatsappLogo,
    twitter: Globe,
    x: Globe,
  }

  // Check if CMS provided an array in social_links, socials, or ikon_media_sosial
  const rawArray = settings?.social_links || settings?.socials || settings?.ikon_media_sosial
  if (Array.isArray(rawArray) && rawArray.length > 0) {
    return rawArray.map((item) => {
      const label = String(item?.platform || item?.name || item?.label || 'Social')
      const key = label.toLowerCase()
      let Icon = LinkedinLogo
      Object.keys(socialIconsMap).forEach((k) => {
        if (key.includes(k)) Icon = socialIconsMap[k]
      })
      return [label, item.url || item.link || '#', Icon]
    })
  }

  // Check if direct URLs are returned by CMS settings
  const directSocials = []
  if (settings?.tiktok_url || settings?.tiktok) directSocials.push(['TikTok', settings.tiktok_url || settings.tiktok, TikTokIcon])
  if (settings?.instagram_url || settings?.instagram) directSocials.push(['Instagram', settings.instagram_url || settings.instagram, InstagramLogo])
  if (settings?.linkedin_url || settings?.linkedin) directSocials.push(['LinkedIn', settings.linkedin_url || settings.linkedin, LinkedinLogo])
  if (settings?.facebook_url || settings?.facebook) directSocials.push(['Facebook', settings.facebook_url || settings.facebook, FacebookLogo])
  if (settings?.youtube_url || settings?.youtube) directSocials.push(['YouTube', settings.youtube_url || settings.youtube, YoutubeLogo])
  if (directSocials.length > 0) return directSocials

  return socials
}

export default function Footer({ onNavigate, settings, navigation: cmsNavigation }) {
  // 1. NAVIGASI (KOLOM 1)
  const rawColumn1 = settings?.navigasi_kolom_1 || settings?.navigation_column_1 || settings?.navigasi || cmsNavigation
  const footerItems = Array.isArray(rawColumn1?.value) ? rawColumn1.value : rawColumn1
  const footerNavigation = Array.isArray(footerItems) && footerItems.length
    ? footerItems.filter((item) => item.slug !== 'solusi').map((item) => [
        item.title || item.label || item.name,
        item.url || (
          item.slug === 'home' || item.slug === 'beranda' ? '#beranda'
          : item.slug === 'produk' || item.slug === 'katalog' || item.slug === 'porduk' ? '/produk'
          : item.slug === 'tentang-kami' ? '/tentang-kami'
          : item.slug === 'kontak' || item.slug === 'hubungi-kami' ? '/kontak'
          : '#beranda'
        ),
      ])
    : defaultLinks

  // 2. IKON MEDIA SOSIAL
  const footerSocials = getDynamicSocials(settings)

  // 3. PRODUK & SOLUSI
  const footerProducts = Array.isArray(settings?.footer_products || settings?.products)
    ? settings.footer_products || settings.products
    : defaultProductLinks

  // 4. LEGAL / PERUSAHAAN (KOLOM 2)
  const rawColumn2 = settings?.navigasi_kolom_2 || settings?.navigasi_legal || settings?.legal_links || settings?.legal
  const column2Items = Array.isArray(rawColumn2?.value) ? rawColumn2.value : rawColumn2
  const footerCompanyLinks = Array.isArray(column2Items) && column2Items.length > 0
    ? column2Items.map((item) => typeof item === 'string' ? item : item?.title || item?.label || 'Link')
    : defaultCompanyLinks

  // 5. TEKS FOOTER & KONTAK LENGKAP
  const footerText = settings?.teks_footer || settings?.deskripsi_singkat || settings?.footer_text || settings?.footer_description || settings?.site_tagline || 'Membangun ekosistem pertanian dan peternakan cerdas berbasis AI & IoT untuk ketahanan pangan masa depan yang berkelanjutan dan sirkular.'
  const phone = settings?.phone || settings?.phone_numbers?.[0] || '+62 852-1537-6975'
  const email = settings?.email || settings?.emails?.[0] || 'jagofarm.corporation@gmail.com'
  const address = settings?.alamat_lengkap || settings?.alamat || settings?.full_address || settings?.address || (Array.isArray(settings?.addresses) ? settings.addresses[0] : null) || '2JGM+Q4 Sukapura, Kabupaten Bandung, Jawa Barat, Indonesia'
  const mapEmbedSrc = extractMapSrc(settings?.lokasi_google_maps || settings?.google_maps_location || settings?.google_maps || settings?.embed_peta || settings?.maps_embed) || "https://maps.google.com/maps?ll=-6.975416,107.633194&z=16&output=embed"

  return (
    <footer className="footer-shell section-shell" id="kontak">
      {/* Main Footer Grid */}
      <div className="footer-main-grid">
        <div className="footer-brand-col">
          <button className="footer-brand-logo" onClick={() => onNavigate('#beranda')} type="button">
            <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
          </button>
          <p>
            {footerText}
          </p>
          <div className="footer-socials" aria-label="Media sosial Jago Farm">
            {footerSocials.map(([label, href, Icon]) => (
              <a href={href} key={label} aria-label={label} target="_blank" rel="noreferrer">
                <Icon size={20} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-nav-col" aria-label="Navigasi footer utama">
          <h3>Navigasi</h3>
          {footerNavigation.map(([label, target]) => (
            <button onClick={() => onNavigate(target)} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        {/* Lokasi Embed dipindahkan tepat di bawah Brand Tagline & tabel Navigasi */}
        <div className="footer-mini-map-card footer-map-span" id="peta-lokasi">
          <div className="mini-map-badge-header">
            <div className="mini-map-point-info">
              <div className="mini-map-pin-circle">
                <span className="green-pulse-dot"></span>
                <MapPin size={16} weight="fill" />
              </div>
              <span className="mini-map-title">Sukapura, Dayeuhkolot — Pusat Operasional JagoFarm</span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sukapura+Dayeuhkolot+Bandung+40257"
              target="_blank"
              rel="noreferrer"
              className="mini-map-external-link"
              title="Buka Peta di Google Maps"
            >
              <Globe size={16} weight="bold" />
            </a>
          </div>
          <div className="mini-map-iframe-wrapper">
            <iframe
              title="Peta Lokasi JagoFarm - Sukapura Dayeuhkolot Bandung"
              src={mapEmbedSrc}
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Titik Point Hijau di Tengah Embed Peta */}
            <div className="custom-center-pin-overlay" aria-hidden="true">
              <div className="green-center-marker">
                <div className="green-marker-pulse-ring ring-1"></div>
                <div className="green-marker-pulse-ring ring-2"></div>
                <div className="green-pin-bubble">
                  <MapPin size={22} weight="fill" className="pin-green-icon" />
                </div>
                <div className="green-pin-pointer"></div>
                <div className="green-center-dot-core" title="Titik Lokasi JagoFarm"></div>
              </div>
            </div>
          </div>
        </div>

        <nav className="footer-nav-col footer-col-span-row" aria-label="Produk footer">
          <h3>Produk & Solusi</h3>
          {footerProducts.map((item) => {
            const label = typeof item === 'string' ? item : item?.title || item?.name || 'Produk'
            return (
              <button onClick={() => onNavigate('/produk')} type="button" key={label}>
                {label}
              </button>
            )
          })}
        </nav>

        <nav className="footer-nav-col footer-col-span-row" aria-label="Perusahaan footer">
          <h3>Perusahaan</h3>
          {footerCompanyLinks.map((label) => (
            <button onClick={() => onNavigate('/tentang-kami')} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        <div className="footer-contact-col footer-col-span-row">
          <h3>Kontak Resmi</h3>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sukapura+Dayeuhkolot+Bandung+40257"
            target="_blank"
            rel="noreferrer"
            className="footer-contact-item"
          >
            <MapPin size={18} weight="duotone" className="contact-icon" />
            <span>{address}</span>
          </a>
          <a href={`tel:${phone}`} className="footer-contact-item">
            <PhoneCall size={18} weight="duotone" className="contact-icon" />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="footer-contact-item">
            <EnvelopeSimple size={18} weight="duotone" className="contact-icon" />
            <span>{email}</span>
          </a>
          <a href={settings?.site_url || 'https://www.jagofarm.id'} className="footer-contact-item" target="_blank" rel="noreferrer">
            <Globe size={18} weight="duotone" className="contact-icon" />
            <span>www.jagofarm.id</span>
          </a>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="footer-bottom-bar">
        <p>{settings?.copyright_text || '© 2026 Jago Farm. Semua Hak Dilindungi.'}</p>
        <div className="footer-legal-links">
          <span>Kebijakan Privasi</span>
          <span>•</span>
          <span>Syarat & Ketentuan</span>
          <span>•</span>
          <span>Sirkularitas Pangan</span>
        </div>
      </div>
    </footer>
  )
}
