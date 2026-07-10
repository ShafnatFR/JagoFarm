import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
import './styles.css'

const routes = {
  '/': 'home',
  '/katalog': 'catalog',
  '/tentang-kami': 'about',
}

export default function App() {
  const [page, setPage] = useState(() => routes[window.location.pathname] ?? 'home')
  const [pendingTarget, setPendingTarget] = useState(null)

  useEffect(() => {
    const syncRoute = () => setPage(routes[window.location.pathname] ?? 'home')
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  const scrollToTarget = (target) => {
    ScrollTrigger.refresh()
    const element = document.querySelector(target)
    if (!element) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const navOffset = 96
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + start - navOffset

    if (reduce) {
      window.scrollTo(0, end)
      return
    }

    const duration = 980
    const started = performance.now()
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2)

    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration)
      window.scrollTo(0, start + (end - start) * ease(progress))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <IntroAnimation />
      <Navbar page={page} onNavigate={navigate} />
      <GlobalMotion page={page} />
      {page === 'home' && (
        <>
          <HeroSection onNavigate={navigate} />
          <EcosystemPinnedScroll />
          <SolutionsSection />
          <FeaturedProductsSection onNavigate={navigate} />
        </>
      )}
      {page === 'catalog' && <ProductCatalog />}
      {page === 'about' && <AboutPage />}
      <Footer onNavigate={navigate} />
    </>
  )
}
