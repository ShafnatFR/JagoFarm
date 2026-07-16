import { EnvelopeSimple, Globe, InstagramLogo, LinkedinLogo, MapPin, PhoneCall, WhatsappLogo } from '@phosphor-icons/react'
import logo from '../assets/jagofarm-logo.svg'

const links = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '/produk'],
  ['Tentang Kami', '/tentang-kami'],
  ['Hubungi Kami', '/kontak'],
]
const productLinks = ['Melon Presisi', 'Sayuran Organik', 'Ikan Air Tawar', 'Ayam Petelur', 'Perangkat Sensor IoT']
const companyLinks = ['Tentang Kami', 'Karir & Magang', 'Mitra Peternak', 'Artikel & Jurnal', 'Kebijakan Privasi']

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer-shell section-shell" id="kontak">
      {/* 1. Embed Lokasi (Requested Location Map Embed in Footer) */}
      <div className="footer-map-section" id="peta-lokasi">
        <div className="map-header-banner">
          <div className="map-header-left">
            <div className="map-pin-icon">
              <MapPin size={24} weight="fill" />
            </div>
            <div>
              <h4>Lokasi Kantor Pusat & Fasilitas Riset JagoFarm</h4>
              <span>2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257</span>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sukapura+Dayeuhkolot+Bandung+40257"
            target="_blank"
            rel="noreferrer"
            className="button button-secondary map-link-btn"
          >
            <Globe size={18} weight="bold" />
            Buka di Google Maps ↗
          </a>
        </div>
        <div className="map-embed-wrapper">
          <iframe
            title="Peta Lokasi JagoFarm - Sukapura Dayeuhkolot Bandung"
            src="https://maps.google.com/maps?q=Sukapura,+Dayeuhkolot,+Bandung+Regency,+West+Java+40257&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="footer-main-grid">
        <div className="footer-brand-col">
          <button className="footer-brand-logo" onClick={() => onNavigate('#beranda')} type="button">
            <img src={logo} alt="Jago Farm" />
          </button>
          <p>
            Membangun ekosistem pertanian dan peternakan cerdas berbasis AI & IoT untuk ketahanan pangan masa depan yang berkelanjutan dan sirkular.
          </p>
          <div className="footer-socials">
            <a href="https://wa.me/6285215376975" target="_blank" rel="noreferrer" aria-label="WhatsApp JagoFarm">
              <WhatsappLogo size={20} weight="fill" />
            </a>
            <a href="mailto:jagofarm.corporation@gmail.com" aria-label="Email JagoFarm">
              <EnvelopeSimple size={20} weight="fill" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram JagoFarm">
              <InstagramLogo size={20} weight="fill" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn JagoFarm">
              <LinkedinLogo size={20} weight="fill" />
            </a>
          </div>
        </div>

        <nav className="footer-nav-col" aria-label="Navigasi footer utama">
          <h3>Navigasi</h3>
          {links.map(([label, target]) => (
            <button onClick={() => onNavigate(target)} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        <nav className="footer-nav-col" aria-label="Produk footer">
          <h3>Produk & Solusi</h3>
          {productLinks.map((label) => (
            <button onClick={() => onNavigate('/produk')} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        <nav className="footer-nav-col" aria-label="Perusahaan footer">
          <h3>Perusahaan</h3>
          {companyLinks.map((label) => (
            <button onClick={() => onNavigate('/tentang-kami')} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        <div className="footer-contact-col">
          <h3>Kontak Resmi</h3>
          <a href="#peta-lokasi" className="footer-contact-item">
            <MapPin size={18} weight="duotone" className="contact-icon" />
            <span>2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257</span>
          </a>
          <a href="tel:+6285215376975" className="footer-contact-item">
            <PhoneCall size={18} weight="duotone" className="contact-icon" />
            <span>+62 852-1537-6975</span>
          </a>
          <a href="mailto:jagofarm.corporation@gmail.com" className="footer-contact-item">
            <EnvelopeSimple size={18} weight="duotone" className="contact-icon" />
            <span>jagofarm.corporation@gmail.com</span>
          </a>
          <a href="https://www.jagofarm.id" className="footer-contact-item">
            <Globe size={18} weight="duotone" className="contact-icon" />
            <span>www.jagofarm.id</span>
          </a>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="footer-bottom-bar">
        <p>&copy; 2026 Jago Farm. Semua Hak Dilindungi.</p>
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
