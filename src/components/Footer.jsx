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
  ['Facebook', 'https://www.facebook.com/profile.php?id=61591492453217', FacebookLogo],
  ['Instagram', 'https://www.instagram.com/jagofarm.corporation/', InstagramLogo],
  ['YouTube', 'https://www.youtube.com/@JagoFarm-g6p', YoutubeLogo],
  ['LinkedIn', 'https://www.linkedin.com/company/jagofarm/posts/?feedView=all', LinkedinLogo],
]

export default function Footer({ onNavigate, settings, navigation: cmsNavigation }) {
  const footerItems = Array.isArray(cmsNavigation?.value) ? cmsNavigation.value : cmsNavigation
  const footerNavigation = Array.isArray(footerItems) && footerItems.length
    ? footerItems.filter((item) => item.slug !== 'solusi').map((item) => [
        item.title,
        item.slug === 'home' || item.slug === 'beranda'
          ? '#beranda'
          : item.slug === 'produk' || item.slug === 'katalog' || item.slug === 'porduk'
          ? '/produk'
          : item.slug === 'tentang-kami'
          ? '/tentang-kami'
          : item.slug === 'kontak' || item.slug === 'hubungi-kami'
          ? '/kontak'
          : '#beranda',
      ])
    : defaultLinks

  const socialIcons = { Facebook: FacebookLogo, Instagram: InstagramLogo, YouTube: YoutubeLogo, LinkedIn: LinkedinLogo }
  const footerSocials = Array.isArray(settings?.social_links)
    ? settings.social_links.map((item) => [item.platform, item.url, socialIcons[item.platform] || LinkedinLogo])
    : socials

  const footerProducts = Array.isArray(settings?.footer_products || settings?.products)
    ? settings.footer_products || settings.products
    : defaultProductLinks

  const phone = settings?.phone || settings?.phone_numbers?.[0] || '+62 852-1537-6975'
  const email = settings?.email || settings?.emails?.[0] || 'jagofarm.corporation@gmail.com'
  const address = settings?.address || settings?.addresses?.[0] || '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257'

  return (
    <footer className="footer-shell section-shell" id="kontak">
      {/* Main Footer Grid */}
      <div className="footer-main-grid">
        <div className="footer-brand-col">
          <button className="footer-brand-logo" onClick={() => onNavigate('#beranda')} type="button">
            <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
          </button>
          <p>
            {settings?.site_tagline || 'Membangun ekosistem pertanian dan peternakan cerdas berbasis AI & IoT untuk ketahanan pangan masa depan yang berkelanjutan dan sirkular.'}
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
              src="https://maps.google.com/maps?ll=-6.975416,107.633194&z=16&output=embed"
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
          {defaultCompanyLinks.map((label) => (
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
