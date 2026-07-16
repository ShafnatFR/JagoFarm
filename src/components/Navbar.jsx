import { List, PhoneCall, X, Sun, Moon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/jagofarm-logo.svg'

gsap.registerPlugin(ScrollTrigger)

const links = [
  ['Beranda', '#beranda'],
  ['Solusi', '#solusi'],
  ['Produk', '/produk'],
  ['Tentang Kami', '/tentang-kami'],
]

export default function Navbar({ page, onNavigate, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
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

    const sectionObserver = page === 'home' && new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.some((entry) => entry.target.id === 'solusi')) setActiveSection('solutions')
        else if (visible.length) setActiveSection('home')
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
    )
    if (sectionObserver) {
      ['#beranda', '#tentang', '#solusi'].forEach((selector) => {
        const section = document.querySelector(selector)
        if (section) sectionObserver.observe(section)
      })
    } else {
      setActiveSection('home')
    }

    let observer = null
    if (page === 'home') {
      const contact = document.querySelector('#hubungi-kami')
      if (contact) {
        observer = new IntersectionObserver(
          ([entry]) => {
            shell.classList.toggle('is-contact', entry.isIntersecting)
            shell.classList.toggle('is-contact-merged', entry.intersectionRatio > 0.38)
          },
          { rootMargin: '-18% 0px -36% 0px', threshold: [0, 0.38] },
        )
        observer.observe(contact)
      }
    } else {
      shell.classList.remove('is-contact')
      shell.classList.remove('is-contact-merged')
    }

    window.setTimeout(() => ScrollTrigger.refresh(), 120)

    return () => {
      blendTrigger.kill()
      heroTrigger?.kill()
      if (sectionObserver && typeof sectionObserver.disconnect === 'function') sectionObserver.disconnect()
      observer?.disconnect()
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
          <img src={logo} alt="" />
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, target]) => (
            <button className={(target === '#beranda' && page === 'home' && activeSection === 'home') || (target === '#solusi' && page === 'home' && activeSection === 'solutions') || (page === 'catalog' && (target === '/produk' || target === '/katalog')) || (page === 'about' && target === '/tentang-kami') ? 'is-active' : ''} key={label} onClick={() => go(target)} type="button">
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifySelf: 'end' }}>
          <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Ganti tema">
            {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
          </button>
          <button className="nav-contact" onClick={() => go('#hubungi-kami')} type="button" aria-label="Hubungi Kami">
            <PhoneCall size={16} weight="bold" />
          </button>
          <button className="nav-menu" onClick={() => setOpen((value) => !value)} type="button" aria-label="Buka menu">
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>
      <button className="nav-floating-phone" onClick={() => go('#hubungi-kami')} type="button" aria-label="Hubungi Jago Farm">
        <PhoneCall size={25} weight="bold" />
      </button>
    </header>
  )
}
