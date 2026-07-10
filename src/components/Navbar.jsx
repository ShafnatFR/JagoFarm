import { List, PhoneCall, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/jagofarm-logo.svg'

gsap.registerPlugin(ScrollTrigger)

const links = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '/katalog'],
  ['Tentang Kami', '/tentang-kami'],
]

export default function Navbar({ page, onNavigate }) {
  const [open, setOpen] = useState(false)
  const shellRef = useRef(null)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top -36',
      end: 'bottom bottom',
      onEnter: () => shell.classList.add('is-blended'),
      onLeaveBack: () => shell.classList.remove('is-blended'),
      onUpdate: (self) => {
        shell.classList.toggle('is-blended', self.scroll() > 36)
      },
    })

    return () => trigger.kill()
  }, [])

  const go = (target) => {
    setOpen(false)
    onNavigate(target)
  }

  return (
    <header className="nav-shell" ref={shellRef}>
      <nav className="nav" aria-label="Navigasi utama">
        <button className="brand" onClick={() => go('#beranda')} type="button" aria-label="Jago Farm beranda">
          <img src={logo} alt="" />
          <span>Jago Farm</span>
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, target]) => (
            <button className={(page === 'catalog' && target === '/katalog') || (page === 'about' && target === '/tentang-kami') ? 'is-active' : ''} key={label} onClick={() => go(target)} type="button">
              {label}
            </button>
          ))}
        </div>
        <button className="nav-contact" onClick={() => go('#kontak')} type="button">
          <PhoneCall size={16} weight="bold" />
          Hubungi Kami
        </button>
        <button className="nav-menu" onClick={() => setOpen((value) => !value)} type="button" aria-label="Buka menu">
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>
    </header>
  )
}
