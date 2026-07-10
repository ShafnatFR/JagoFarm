import logo from '../assets/jagofarm-logo.svg'

const links = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '/katalog'],
  ['Tentang Kami', '/tentang-kami'],
]
const productLinks = ['Melon', 'Sayuran', 'Ikan', 'Ayam Petelur', 'Perangkat IoT']
const companyLinks = ['Tentang Kami', 'Karir', 'Mitra', 'Artikel', 'Kebijakan Privasi']

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer section-shell" id="kontak">
      <div className="footer-brand">
        <img src={logo} alt="Jago Farm" />
        <p>Membangun ekosistem pertanian dan peternakan cerdas berbasis AI & IoT untuk masa depan yang berkelanjutan.</p>
      </div>
      <nav className="footer-links" aria-label="Navigasi footer utama">
        <h3>Navigasi</h3>
        {links.map(([label, target]) => (
          <button onClick={() => onNavigate(target)} type="button" key={label}>
            {label}
          </button>
        ))}
      </nav>
      <nav className="footer-links" aria-label="Produk footer">
        <h3>Produk</h3>
        {productLinks.map((label) => (
          <button onClick={() => onNavigate('/katalog')} type="button" key={label}>
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
        <span>Jl. Hijau No. 88, Sukamaju, Bogor, Jawa Barat 16110</span>
        <a href="tel:+6281234567890">+62 812-3456-7890</a>
        <a href="mailto:info@jagofarm.id">info@jagofarm.id</a>
        <a href="https://www.jagofarm.id">www.jagofarm.id</a>
        <small>(c) 2024 Jago Farm. Semua Hak Dilindungi.</small>
      </div>
    </footer>
  )
}
