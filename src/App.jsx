import { Component, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import EcosystemPinnedScroll from './components/EcosystemPinnedScroll.jsx'
import FeaturedProductsSection from './components/FeaturedProductsSection.jsx'
import Footer from './components/Footer.jsx'
import GlobalMotion from './components/GlobalMotion.jsx'
import HeroSection from './components/HeroSection.jsx'
import LatestArticle from './components/LatestArticle.jsx'
import Navbar from './components/Navbar.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import SolutionsSection from './components/SolutionsSection.jsx'
import AboutPage from './components/AboutPage.jsx'
import ContactSection from './components/ContactSection.jsx'
import SectionRenderer from './components/SectionRenderer.jsx'
import { cmsConfigured, getNavigation, getPage, getPosts, getSettings } from './lib/cms.js'
import './styles.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    return this.state.hasError ? null : this.props.children
  }
}

const routes = {
  '/': 'home',
  '/produk': 'catalog',
  '/katalog': 'catalog',
  '/tentang-kami': 'about',
  '/hubungi-kami': 'contact',
}

export default function App() {
  const [page, setPage] = useState(() => {
    const path = window.location.hash === '#hubungi-kami' ? '/hubungi-kami' : window.location.pathname
    return routes[path] ?? 'home'
  })
  const [pendingTarget, setPendingTarget] = useState(null)
  const [cms, setCms] = useState({ page: null, posts: [], settings: null, navigation: null })

  // Global Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (!cmsConfigured) return undefined
    let cancelled = false
    Promise.allSettled([getPage('home'), getPosts(), getSettings(), getNavigation()]).then((results) => {
      if (cancelled) return
      const [pageResult, postsResult, settingsResult, navigationResult] = results
      setCms({
        page: pageResult.status === 'fulfilled' ? pageResult.value?.data || null : null,
        posts: postsResult.status === 'fulfilled' ? postsResult.value?.data || [] : [],
        settings: settingsResult.status === 'fulfilled' ? settingsResult.value?.data || null : null,
        navigation: navigationResult.status === 'fulfilled' ? navigationResult.value?.data || null : null,
      })
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (window.location.hash === '#hubungi-kami') {
      window.history.replaceState(null, '', '/hubungi-kami')
    }
  }, [])

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])

  const navigate = (target) => {
    if (target === '#hubungi-kami') target = '/hubungi-kami'

    if (target.startsWith('#')) {
      if (page !== 'home') {
        ScrollTrigger.getAll().forEach((t) => t.kill())
        ScrollTrigger.clearScrollMemory()
        window.history.pushState(null, '', `/${target}`)
        setPendingTarget(target)
        setPage('home')
        return
      }
      scrollToTarget(target)
      window.history.replaceState(null, '', `/${target}`)
      return
    }

    // Kill triggers before route reconciliation; pinned DOM must be cleaned first.
    ScrollTrigger.getAll().forEach((t) => t.kill())
    ScrollTrigger.clearScrollMemory()
    window.history.pushState(null, '', target)
    setPage(routes[target] ?? 'home')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <ReactLenis root>
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} navigation={cms.navigation} settings={cms.settings} />
      <GlobalMotion page={page} />
      <ErrorBoundary key={page}>
        {page === 'home' && cmsConfigured ? (
          cms.page ? (
          <SectionRenderer blocks={cms.page.content} posts={cms.posts} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
          ) : <section className="section-shell cms-empty" aria-live="polite">Konten sedang disiapkan.</section>
        ) : page === 'home' && (
          <>
            <HeroSection theme={theme} onToggleTheme={toggleTheme} />
            <EcosystemPinnedScroll />
            <SolutionsSection />
            <FeaturedProductsSection />
            <LatestArticle />
          </>
        )}
        {page === 'catalog' && <ProductCatalog />}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
        {page === 'contact' && <ContactSection onNavigate={navigate} />}
      </ErrorBoundary>
      <Footer onNavigate={navigate} settings={cms.settings} navigation={cms.navigation} />
    </ReactLenis>
  )
}
