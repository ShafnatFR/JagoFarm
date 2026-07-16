import { List, PhoneCall, X, Sun, Moon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/jagofarm-logo.svg'

gsap.registerPlugin(ScrollTrigger)

const links = [
  ['Beranda', '#beranda'],
  ['Produk', '/produk'],
  ['Tentang Kami', '/tentang-kami'],
]

const navTarget = (slug) => slug === 'produk' || slug === 'porduk' ? '/produk' : slug === 'tentang-kami' ? '/tentang-kami' : '#beranda'

export default function Navbar({ page, onNavigate, theme, onToggleTheme, navigation, settings }) {
  const [open, setOpen] = useState(false)
  const shellRef = useRef(null)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const blendTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top -36',
      end: 'bottom bottom',
      onEnter: () => shell.classList.add('is-blended'),
      onLeaveBack: () => shell.classList.remove('is-blended'),
      onUpdate: (self) => {
        shell.classList.toggle('is-blended', self.scroll() > 36)
      },
    })

    const hero = document.querySelector('#beranda')
    const heroTrigger = hero && ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onToggle: ({ isActive }) => shell.classList.toggle('is-on-hero', isActive),
    })

    shell.classList.remove('is-contact')
    shell.classList.remove('is-contact-merged')

    window.setTimeout(() => ScrollTrigger.refresh(), 120)

    return () => {
      blendTrigger.kill()
      heroTrigger?.kill()
    }
  }, [page])

  const go = (target) => {
    setOpen(false)
    onNavigate(target)
  }

  return (
    <header className={`nav-shell ${page === 'home' ? 'is-over-hero' : ''}`} ref={shellRef}>
      <nav className="nav" aria-label="Navigasi utama">
        <button className="brand" onClick={() => go('#beranda')} type="button" aria-label="Jago Farm beranda">
          <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {(Array.isArray(navigation?.value) && navigation.value.length ? navigation.value.filter((item) => item.slug !== 'solusi').map((item) => [item.title, navTarget(item.slug)]) : links).map(([label, target]) => (
            <button className={(target === '#beranda' && page === 'home') || (page === 'catalog' && (target === '/produk' || target === '/katalog')) || (page === 'about' && target === '/tentang-kami') ? 'is-active' : ''} key={label} onClick={() => go(target)} type="button">
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifySelf: 'end' }}>
          <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Ganti tema">
            {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
          </button>
          <button className="nav-contact" onClick={() => go('/hubungi-kami')} type="button" aria-label="Hubungi Kami">
            <PhoneCall size={16} weight="bold" />
          </button>
          <button className="nav-menu" onClick={() => setOpen((value) => !value)} type="button" aria-label="Buka menu">
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>
      <button className="nav-floating-phone" onClick={() => go('/hubungi-kami')} type="button" aria-label="Hubungi Jago Farm">
        <PhoneCall size={25} weight="bold" />
      </button>
    </header>
  )
}
