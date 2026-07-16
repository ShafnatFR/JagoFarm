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
  ["Solusi", "#solusi"],
  ["Produk", "/katalog"],
  ["Tentang Kami", "/tentang-kami"],
  ["Hubungi Kami", "/hubungi-kami"],
];

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
  const footerNavigation = Array.isArray(cmsNavigation) && cmsNavigation.length ? cmsNavigation.map((item) => [item.title, item.slug === 'home' || item.slug === 'beranda' ? '#beranda' : `/${item.slug}`]) : navigation
  const socialIcons = { Facebook: FacebookLogo, Instagram: InstagramLogo, YouTube: YoutubeLogo, LinkedIn: LinkedinLogo }
  const footerSocials = Array.isArray(settings?.social_links) ? settings.social_links.map((item) => [item.platform, item.url, socialIcons[item.platform] || LinkedinLogo]) : socials
  return (
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
        {products.map((label) => (
          <button onClick={() => onNavigate('/produk')} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <div className="footer-contact">
        <h3>Kontak Kami</h3>
        <a href={settings?.phone ? `tel:${settings.phone}` : 'https://wa.me/6285215376975'} target="_blank" rel="noreferrer">
          <PhoneCall size={18} />
          {settings?.phone || '+62 852-1537-6975'}
        </a>
        <a href={`mailto:${settings?.email || 'jagofarm.corporation@gmail.com'}`}>
          <EnvelopeSimple size={18} />
          {settings?.email || 'jagofarm.corporation@gmail.com'}
        </a>
        <a
          href={settings?.map_location_url || 'https://maps.google.com/?q=2JGM%2BM3F%2C+Sukapura%2C+Dayeuhkolot%2C+Bandung'}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={18} />
          {settings?.address || '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257'}
        </a>
        <small>{settings?.copyright_text || '© 2026 Jago Farm. Semua hak dilindungi.'}</small>
      </div>
    </footer>
  );
}
