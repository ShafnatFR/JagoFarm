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

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer section-shell" id="footer">
      <div className="footer-brand">
        <img src={logo} alt="Jago Farm" />
        <p>Ekosistem pertanian dan peternakan cerdas berbasis AI dan IoT.</p>
        <div className="footer-socials" aria-label="Media sosial Jago Farm">
          {socials.map(([label, href, Icon]) => (
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
        {navigation.map(([label, target]) => (
          <button onClick={() => onNavigate(target)} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <nav className="footer-links" aria-label="Produk footer">
        <h3>Produk</h3>
        {productLinks.map((label) => (
          <button onClick={() => onNavigate('/produk')} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <nav className="footer-links" aria-label="Perusahaan footer">
        <h3>Perusahaan</h3>
        {companyLinks.map((label) => (
          <button onClick={() => onNavigate('/tentang-kami')} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <div className="footer-contact">
        <h3>Kontak Kami</h3>
        <a href="https://wa.me/6285215376975" target="_blank" rel="noreferrer">
          <PhoneCall size={18} />
          +62 852-1537-6975
        </a>
        <a href="mailto:jagofarm.corporation@gmail.com">
          <EnvelopeSimple size={18} />
          jagofarm.corporation@gmail.com
        </a>
        <a
          href="https://maps.google.com/?q=2JGM%2BM3F%2C+Sukapura%2C+Dayeuhkolot%2C+Bandung"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={18} />
          2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat
          40257
        </a>
        <small>© 2026 Jago Farm. Semua hak dilindungi.</small>
      </div>
    </footer>
  );
}
