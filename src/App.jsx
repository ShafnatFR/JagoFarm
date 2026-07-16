import { Component, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import EcosystemPinnedScroll from './components/EcosystemPinnedScroll.jsx'
import Footer from './components/Footer.jsx'
import GlobalMotion from './components/GlobalMotion.jsx'
import HeroSection from './components/HeroSection.jsx'
import Navbar from './components/Navbar.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import AboutPage from './components/AboutPage.jsx'
import ContactSection from './components/ContactSection.jsx'
import FeaturedProductsSection from './components/FeaturedProductsSection.jsx'
import LatestArticle from './components/LatestArticle.jsx'
import ArticleDetail from './components/ArticleDetail.jsx'
import SolutionsSection from './components/SolutionsSection.jsx'
import { cmsConfigured, getNavigation, getPostCategories, getPosts, getSettings, getPages } from './lib/cms.js'
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
  '/kontak': 'contact',
  '/hubungi-kami': 'contact',
}

const resolveRoute = (path) => path.startsWith('/artikel/') ? 'article' : routes[path] ?? 'home'
const articleSlugFromPath = (path) => path.startsWith('/artikel/') ? decodeURIComponent(path.slice('/artikel/'.length)) : ''

const findPageBySlug = (pages, slug) => Array.isArray(pages) ? pages.find((p) => p?.slug === slug) : null
const findBlocksByType = (page, type) => Array.isArray(page?.content) ? page.content.filter((b) => b?.type === type) : []
const findFirstBlockByType = (page, type) => Array.isArray(page?.content) ? page.content.find((b) => b?.type === type) : null

export default function App() {
  const [page, setPage] = useState(() => {
    const path = window.location.hash === '#hubungi-kami' ? '/hubungi-kami' : window.location.pathname
    return resolveRoute(path)
  })
  const [articleSlug, setArticleSlug] = useState(() => articleSlugFromPath(window.location.pathname))
  const [pendingTarget, setPendingTarget] = useState(null)
  const [cms, setCms] = useState({ posts: [], categories: [], settings: null, navigation: null, pages: [] })
  const [cmsLoaded, setCmsLoaded] = useState(false)

  // Global Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (!cmsConfigured) return undefined
    let cancelled = false
    Promise.allSettled([getPosts(), getPostCategories(), getSettings(), getNavigation(), getPages()]).then((results) => {
      if (cancelled) return
      const [postsResult, categoriesResult, settingsResult, navigationResult, pagesResult] = results
      setCms({
        posts: postsResult.status === 'fulfilled' ? postsResult.value?.data || postsResult.value || [] : [],
        categories: categoriesResult.status === 'fulfilled' ? categoriesResult.value?.data || categoriesResult.value || [] : [],
        settings: settingsResult.status === 'fulfilled' ? settingsResult.value?.data || settingsResult.value || null : null,
        navigation: navigationResult.status === 'fulfilled' ? navigationResult.value?.data || navigationResult.value || null : null,
        pages: pagesResult.status === 'fulfilled' ? pagesResult.value?.data || pagesResult.value || [] : [],
      })
      setCmsLoaded(true)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const syncRoute = () => {
      setPage(resolveRoute(window.location.pathname))
      setArticleSlug(articleSlugFromPath(window.location.pathname))
    }
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

    ScrollTrigger.getAll().forEach((t) => t.kill())
    ScrollTrigger.clearScrollMemory()
    window.history.pushState(null, '', target)
    setPage(resolveRoute(target))
    setArticleSlug(articleSlugFromPath(target))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const isHomeActive = !cmsLoaded || !!(findPageBySlug(cms.pages, 'beranda') || findPageBySlug(cms.pages, 'home'))
  const isCatalogActive = !cmsLoaded || !!(findPageBySlug(cms.pages, 'produk') || findPageBySlug(cms.pages, 'katalog'))
  const isAboutActive = !cmsLoaded || !!(findPageBySlug(cms.pages, 'tentang-kami') || findPageBySlug(cms.pages, 'about'))
  const isContactActive = !cmsLoaded || !!(findPageBySlug(cms.pages, 'hubungi-kami') || findPageBySlug(cms.pages, 'kontak'))

  return (
    <ReactLenis root>
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} navigation={cms.navigation} settings={cms.settings} pages={cms.pages} cmsLoaded={cmsLoaded} />
      <GlobalMotion page={page} />
      <ErrorBoundary key={page}>
        {page === 'home' && (
          !isHomeActive ? (
            <section className="page-shell section-shell" style={{ textAlign: 'center', padding: '140px 20px', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span className="section-badge">Halaman Dinonaktifkan</span>
              <h2>Halaman Beranda Sedang Disembunyikan</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '520px' }}>
                Halaman utama (Beranda) saat ini dinonaktifkan dari panel admin CMS. Silakan kunjungi halaman lain yang sedang aktif:
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {isAboutActive && (
                  <button className="button-primary" onClick={() => navigate('/tentang-kami')} type="button">Tentang Kami</button>
                )}
                {isContactActive && (
                  <button className="button-secondary" onClick={() => navigate('/hubungi-kami')} type="button">Hubungi Kami</button>
                )}
              </div>
            </section>
          ) : (
            <>
              <HeroSection theme={theme} onToggleTheme={toggleTheme} data={findFirstBlockByType(findPageBySlug(cms.pages, 'beranda'), 'hero')?.data || cms.settings?.hero} pageExists={isHomeActive && cmsLoaded} />
              <EcosystemPinnedScroll stages={findBlocksByType(findPageBySlug(cms.pages, 'beranda'), 'ecosystem-stage')} pageExists={isHomeActive && cmsLoaded} />
              <SolutionsSection data={findFirstBlockByType(findPageBySlug(cms.pages, 'beranda'), 'solutions')?.data} pageData={findPageBySlug(cms.pages, 'beranda')} posts={cms.posts} pageExists={isHomeActive && cmsLoaded} />
              <ErrorBoundary><FeaturedProductsSection posts={cms.posts} /></ErrorBoundary>
              <LatestArticle posts={cms.posts} onNavigate={navigate} />
            </>
          )
        )}
        {page === 'catalog' && (
          !isCatalogActive ? (
            <section className="page-shell section-shell" style={{ textAlign: 'center', padding: '140px 20px', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span className="section-badge">Halaman Dinonaktifkan</span>
              <h2>Halaman Produk Disembunyikan</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '480px' }}>Halaman Katalog Produk saat ini dinonaktifkan oleh administrator dari panel CMS.</p>
              <button className="button-primary" style={{ marginTop: '8px' }} onClick={() => navigate(isHomeActive ? '#beranda' : '/tentang-kami')} type="button">Kembali ke Halaman Aktif</button>
            </section>
          ) : (
            <ProductCatalog posts={cms.posts} categories={cms.categories} />
          )
        )}
        {page === 'article' && <ArticleDetail post={cms.posts.find((item) => item?.slug === articleSlug)} onNavigate={navigate} />}
        {page === 'about' && (
          !isAboutActive ? (
            <section className="page-shell section-shell" style={{ textAlign: 'center', padding: '140px 20px', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span className="section-badge">Halaman Dinonaktifkan</span>
              <h2>Halaman Tentang Kami Disembunyikan</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '480px' }}>Halaman Tentang Kami saat ini sedang dinonaktifkan dari panel admin CMS.</p>
              <button className="button-primary" style={{ marginTop: '8px' }} onClick={() => navigate(isHomeActive ? '#beranda' : '/hubungi-kami')} type="button">Kembali ke Halaman Aktif</button>
            </section>
          ) : (
            <AboutPage onNavigate={navigate} pageData={findPageBySlug(cms.pages, 'tentang-kami')} />
          )
        )}
        {page === 'contact' && (
          !isContactActive ? (
            <section className="page-shell section-shell" style={{ textAlign: 'center', padding: '140px 20px', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span className="section-badge">Halaman Dinonaktifkan</span>
              <h2>Halaman Hubungi Kami Disembunyikan</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '480px' }}>Halaman Kontak saat ini sedang dinonaktifkan dari panel admin CMS.</p>
              <button className="button-primary" style={{ marginTop: '8px' }} onClick={() => navigate(isHomeActive ? '#beranda' : '/tentang-kami')} type="button">Kembali ke Halaman Aktif</button>
            </section>
          ) : (
            <ContactSection onNavigate={navigate} data={cms.settings || {}} pageData={findPageBySlug(cms.pages, 'hubungi-kami')} />
          )
        )}
      </ErrorBoundary>
      <Footer onNavigate={navigate} settings={cms.settings} navigation={cms.navigation} />
    </ReactLenis>
  )
}
