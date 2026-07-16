<<<<<<< HEAD
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
=======
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PhoneCall,
  YoutubeLogo,
} from "@phosphor-icons/react";
import logo from "../assets/jagofarm-logo.svg";

const navigation = [
  ["Beranda", "#beranda"],
  ["Produk", "/katalog"],
  ["Tentang Kami", "/tentang-kami"],
  ["Hubungi Kami", "/hubungi-kami"],
];
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a

const products = ["Melon", "Sayuran", "Ikan", "Ayam Petelur", "Perangkat IoT"];

const socials = [
  [
    "Facebook",
    "https://www.facebook.com/profile.php?id=61591492453217",
    FacebookLogo,
  ],
  [
    "Instagram",
    "https://www.instagram.com/jagofarm.corporation/",
    InstagramLogo,
  ],
  ["YouTube", "https://www.youtube.com/@JagoFarm-g6p", YoutubeLogo],
  [
    "LinkedIn",
    "https://www.linkedin.com/company/jagofarm/posts/?feedView=all",
    LinkedinLogo,
  ],
];

export default function Footer({ onNavigate, settings, navigation: cmsNavigation }) {
  const footerItems = Array.isArray(cmsNavigation?.value) ? cmsNavigation.value : cmsNavigation
  const footerNavigation = Array.isArray(footerItems) && footerItems.length ? footerItems.filter((item) => item.slug !== 'solusi').map((item) => [item.title, item.slug === 'home' || item.slug === 'beranda' ? '#beranda' : item.slug === 'produk' || item.slug === 'porduk' ? '/produk' : item.slug === 'tentang-kami' ? '/tentang-kami' : '#beranda']) : navigation
  const socialIcons = { Facebook: FacebookLogo, Instagram: InstagramLogo, YouTube: YoutubeLogo, LinkedIn: LinkedinLogo }
  const footerSocials = Array.isArray(settings?.social_links) ? settings.social_links.map((item) => [item.platform, item.url, socialIcons[item.platform] || LinkedinLogo]) : socials
  const footerProducts = Array.isArray(settings?.footer_products || settings?.products) ? settings.footer_products || settings.products : products
  const phone = settings?.phone || settings?.phone_numbers?.[0] || '+62 852-1537-6975'
  const email = settings?.email || settings?.emails?.[0] || 'jagofarm.corporation@gmail.com'
  const address = settings?.address || settings?.addresses?.[0] || '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257'
  return (
<<<<<<< HEAD
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
=======
    <footer className="footer section-shell" id="footer">
      <div className="footer-brand">
        <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
        <p>{settings?.site_tagline || 'Ekosistem pertanian dan peternakan cerdas berbasis AI dan IoT.'}</p>
        <div className="footer-socials" aria-label="Media sosial Jago Farm">
          {footerSocials.map(([label, href, Icon]) => (
            <a
              href={href}
              key={label}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon size={20} weight="bold" />
            </a>
          ))}
        </div>
      </div>
      <nav className="footer-links" aria-label="Navigasi footer">
        <h3>Navigasi</h3>
        {footerNavigation.map(([label, target]) => (
          <button onClick={() => onNavigate(target)} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <nav className="footer-links" aria-label="Produk footer">
        <h3>Produk</h3>
        {footerProducts.map((item) => {
          const label = typeof item === 'string' ? item : item?.title || item?.name || 'Produk'
          return (
          <button onClick={() => onNavigate('/produk')} type="button" key={label}>
            {label}
          </button>
          )
        })}
      </nav>
      <div className="footer-contact">
        <h3>Kontak Kami</h3>
        <a href={settings?.phone || settings?.phone_numbers?.length ? `tel:${phone}` : 'https://wa.me/6285215376975'} target="_blank" rel="noreferrer">
          <PhoneCall size={18} />
          {phone}
        </a>
        <a href={`mailto:${email}`}>
          <EnvelopeSimple size={18} />
          {email}
        </a>
        <a
          href={settings?.map_location_url || 'https://maps.google.com/?q=2JGM%2BM3F%2C+Sukapura%2C+Dayeuhkolot%2C+Bandung'}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={18} />
          {address}
        </a>
        <small>{settings?.copyright_text || '© 2026 Jago Farm. Semua hak dilindungi.'}</small>
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
      </div>
    </footer>
  );
}
