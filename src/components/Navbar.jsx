import { PhoneCall } from '@phosphor-icons/react'
import logo from '../assets/jagofarm-logo.svg'

const links = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '#produk'],
  ['Tentang Kami', '#tentang'],
]

export default function Navbar() {
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Navigasi utama">
        <a className="brand" href="#beranda" aria-label="Jago Farm beranda">
          <img src={logo} alt="" />
          <span>Jago Farm</span>
        </a>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-contact" href="#kontak">
          <PhoneCall size={16} weight="bold" />
          Hubungi Kami
        </a>
      </nav>
    </header>
  )
}
