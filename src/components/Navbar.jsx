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

const navTarget = (slug) => slug === 'produk' || slug === 'porduk' ? '/produk' : slug === 'tentang-kami' ? '/tentang-kami' : slug === 'artikel' || slug === 'berita' ? '/artikel' : '#beranda'

export default function Navbar({ page, onNavigate, theme, onToggleTheme, navigation, settings, pages = [], cmsLoaded = false }) {
  const [open, setOpen] = useState(false)
  const shellRef = useRef(null)

  const isPageActive = (target) => {
    if (!cmsLoaded) return true
    if (target === '#beranda') return Array.isArray(pages) && pages.some((p) => p?.slug === 'beranda' || p?.slug === 'home')
    if (target === '/produk' || target === '/katalog') return Array.isArray(pages) && pages.some((p) => p?.slug === 'produk' || p?.slug === 'katalog')
    if (target === '/tentang-kami') return Array.isArray(pages) && pages.some((p) => p?.slug === 'tentang-kami' || p?.slug === 'about')
    if (target === '/hubungi-kami') return Array.isArray(pages) && pages.some((p) => p?.slug === 'hubungi-kami' || p?.slug === 'kontak')
    if (target === '/artikel' || target === '/berita') return true
    return true
  }

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const blendTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top -36',
      end: 'bottom bottom',
      onEnter: () => shell.classList.add('is-blended'),
      onLeaveBack: () => shell.classList.remove('is-blended'),
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
        <button className="brand" onClick={() => go(isPageActive('#beranda') ? '#beranda' : '/tentang-kami')} type="button" aria-label="Jago Farm beranda">
          <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {(Array.isArray(navigation?.value) && navigation.value.length ? navigation.value.filter((item) => item.slug !== 'solusi').map((item) => [item.title, navTarget(item.slug)]) : links)
            .filter(([, target]) => isPageActive(target))
            .map(([label, target]) => (
            <button className={(target === '#beranda' && page === 'home') || (page === 'catalog' && (target === '/produk' || target === '/katalog')) || (page === 'about' && target === '/tentang-kami') || ((page === 'articles' || page === 'article') && target === '/artikel') ? 'is-active' : ''} key={label} onClick={() => go(target)} type="button">
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifySelf: 'end' }}>
          <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Ganti tema">
            {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
          </button>
          {isPageActive('/hubungi-kami') && (
            <button className="nav-contact" onClick={() => go('/hubungi-kami')} type="button" aria-label="Hubungi Kami">
              <PhoneCall size={16} weight="bold" />
            </button>
          )}
          <button className="nav-menu" onClick={() => setOpen((value) => !value)} type="button" aria-label="Buka menu">
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>
      {isPageActive('/hubungi-kami') && (
        <button className="nav-floating-phone" onClick={() => go('/hubungi-kami')} type="button" aria-label="Hubungi Jago Farm">
          <PhoneCall size={25} weight="bold" />
        </button>
      )}
    </header>
  )
}
