import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import EcosystemPinnedScroll from './components/EcosystemPinnedScroll.jsx'
import FeaturedProductsSection from './components/FeaturedProductsSection.jsx'
import Footer from './components/Footer.jsx'
import GlobalMotion from './components/GlobalMotion.jsx'
import HeroSection from './components/HeroSection.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import Navbar from './components/Navbar.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import SolutionsSection from './components/SolutionsSection.jsx'
import AboutPage from './components/AboutPage.jsx'
import ContactSection from './components/ContactSection.jsx'
import './styles.css'

const routes = {
  '/': 'home',
  '/katalog': 'catalog',
  '/tentang-kami': 'about',
  '/kontak': 'contact',
}

export default function App() {
  const [page, setPage] = useState(() => routes[window.location.pathname] ?? 'home')
  const [pendingTarget, setPendingTarget] = useState(null)

  // Global Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const syncRoute = () => setPage(routes[window.location.pathname] ?? 'home')
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  const scrollToTarget = (target) => {
    ScrollTrigger.refresh()
    const element = document.querySelector(target)
    if (!element) return
    const navOffset = 96
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + start - navOffset

    // Since Lenis is handling smooth scrolling globally, we can set the scroll position
    // and let Lenis interpolate it smoothly.
    window.scrollTo({ top: end })
  }

  useEffect(() => {
    if (page !== 'home' || !pendingTarget) return undefined
    const frame = requestAnimationFrame(() => {
      window.setTimeout(() => {
        scrollToTarget(pendingTarget)
        setPendingTarget(null)
      }, 120)
    })
    return () => cancelAnimationFrame(frame)
  }, [page, pendingTarget])

  useEffect(() => {
    if (page !== 'home' || pendingTarget || !window.location.hash) return undefined
    const timer = window.setTimeout(() => scrollToTarget(window.location.hash), 240)
    return () => window.clearTimeout(timer)
  }, [page, pendingTarget])

  const navigate = (target) => {
    if (target.startsWith('#')) {
      if (page !== 'home') {
        window.history.pushState(null, '', `/${target}`)
        setPendingTarget(target)
        setPage('home')
        return
      }
      scrollToTarget(target)
      window.history.replaceState(null, '', `/${target}`)
      return
    }

    window.history.pushState(null, '', target)
    setPage(routes[target] ?? 'home')
    window.scrollTo({ top: 0 })
  }

  return (
    <ReactLenis root>
      <IntroAnimation />
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      <GlobalMotion page={page} />
      {page === 'home' && (
        <>
          <HeroSection theme={theme} onToggleTheme={toggleTheme} />
          <EcosystemPinnedScroll />
          <SolutionsSection />
          <FeaturedProductsSection onNavigate={navigate} />
        </>
      )}
      {page === 'catalog' && <ProductCatalog />}
      {page === 'about' && <AboutPage onNavigate={navigate} />}
      {page === 'contact' && <ContactSection onNavigate={navigate} />}
      <Footer onNavigate={navigate} />
    </ReactLenis>
  )
}
