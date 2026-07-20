import { List, X, Sun, Moon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/jagofarm-logo.svg'

gsap.registerPlugin(ScrollTrigger)

const links = [
  ['Beranda', '#beranda'],
  ['Produk', '/produk'],
  ['Tentang Kami', '/tentang-kami'],
  ['Hubungi Kami', '/hubungi-kami'],
  ['Artikel', '/artikel'],
]

const navTarget = (slug) => slug === 'produk' || slug === 'porduk' ? '/produk' : slug === 'tentang-kami' ? '/tentang-kami' : slug === 'hubungi-kami' || slug === 'kontak' ? '/hubungi-kami' : slug === 'artikel' || slug === 'berita' ? '/artikel' : '#beranda'

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (target) => {
    setOpen(false)
    onNavigate(target)
  }

  const cmsLinks = Array.isArray(navigation) ? navigation : navigation?.value
  const navItems = (Array.isArray(cmsLinks) && cmsLinks.length ? cmsLinks.filter((item) => item.slug !== 'solusi').map((item) => [item.title, navTarget(item.slug)]) : links)
    .filter(([, target]) => isPageActive(target))

  const navButtons = navItems.map(([label, target]) => (
    <button className={(target === '#beranda' && page === 'home') || (page === 'catalog' && (target === '/produk' || target === '/katalog')) || (page === 'about' && target === '/tentang-kami') || (page === 'contact' && target === '/hubungi-kami') || ((page === 'articles' || page === 'article') && target === '/artikel') ? 'is-active' : ''} key={label} onClick={() => go(target)} type="button">
      {label}
    </button>
  ))

  return (
    <>
      <header className={`nav-shell ${page === 'home' ? 'is-over-hero' : ''}`} ref={shellRef}>
        <nav className="nav" aria-label="Navigasi utama">
          <button className="brand" onClick={() => go(isPageActive('#beranda') ? '#beranda' : '/tentang-kami')} type="button" aria-label="Jago Farm beranda">
            <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} referrerPolicy="no-referrer" />
          </button>
          <div className="nav-links">{navButtons}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifySelf: 'end' }}>
            <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Ganti tema">
              {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
            </button>
            <button className="nav-menu" onClick={() => setOpen(true)} type="button" aria-label="Buka menu" aria-expanded={open}>
              <List size={22} weight="bold" />
            </button>
          </div>
        </nav>
      </header>
      {open && createPortal(<>
        <button className="nav-backdrop" type="button" aria-label="Tutup menu" onClick={() => setOpen(false)} />
        <aside className="nav-sidebar" aria-label="Navigasi mobile">
          <div className="nav-sidebar-head">
            <img src={settings?.site_logo || logo} alt={settings?.site_name || 'Jago Farm'} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup menu"><X size={22} weight="bold" /></button>
          </div>
          <div className="nav-sidebar-links">{navButtons}</div>
        </aside>
      </>, document.body)}
    </>
  )
}
