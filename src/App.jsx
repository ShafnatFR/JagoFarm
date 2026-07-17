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
import ArticleCatalog from './components/ArticleCatalog.jsx'
import SolutionsSection from './components/SolutionsSection.jsx'
import UnderConstructionPage from './components/UnderConstructionPage.jsx'
import { cmsConfigured, getNavigation, getPostCategories, getPosts, getSettings, getPages } from './lib/cms.js'
import './styles.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <section className="page-shell section-shell" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center', padding: '40px 20px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--forest)', fontWeight: 700 }}>Mohon Maaf, Terjadi Kendala Render pada Halaman Ini</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '480px' }}>Data dari CMS atau komponen sedang mengalami penyesuaian struktur. Silakan segarkan halaman atau kembali ke Beranda.</p>
          <div style={{ background: 'rgba(255,0,0,0.08)', border: '1px solid #ff4d4f', padding: '12px 16px', borderRadius: '8px', color: '#ff4d4f', fontFamily: 'monospace', fontSize: '0.85rem', maxWidth: '640px', overflowX: 'auto', textAlign: 'left' }}>
            <strong>Error Detail:</strong><br />
            {this.state.error?.message || String(this.state.error)}
          </div>
          <button className="cta-btn-primary" onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/#beranda'; }} style={{ padding: '10px 24px', borderRadius: '99px', border: 'none', background: 'var(--forest)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Kembali ke Beranda</button>
        </section>
      )
    }
    return this.props.children
  }
}

const routes = {
  '/': 'home',
  '/beranda': 'home',
  '/home': 'home',
  '/produk': 'catalog',
  '/katalog': 'catalog',
  '/tentang-kami': 'about',
  '/kontak': 'contact',
  '/hubungi-kami': 'contact',
  '/artikel': 'articles',
  '/berita': 'articles',
}

const resolveRoute = (path) => {
  if (path === '/artikel' || path === '/artikel/' || path === '/berita' || path === '/berita/') return 'articles'
  if (path.startsWith('/artikel/')) {
    const slug = decodeURIComponent(path.slice('/artikel/'.length))
    return slug ? 'article' : 'articles'
  }
  return routes[path] ?? 'home'
}
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

  const isHomeActive = !!(findPageBySlug(cms.pages, 'beranda') || findPageBySlug(cms.pages, 'home'))
  const isCatalogActive = !!(findPageBySlug(cms.pages, 'produk') || findPageBySlug(cms.pages, 'katalog'))
  const isAboutActive = !!(findPageBySlug(cms.pages, 'tentang-kami') || findPageBySlug(cms.pages, 'about'))
  const isContactActive = !!(findPageBySlug(cms.pages, 'hubungi-kami') || findPageBySlug(cms.pages, 'kontak'))

  return (
    <ReactLenis root>
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} navigation={cms.navigation} settings={cms.settings} pages={cms.pages} cmsLoaded={cmsLoaded} />
      <GlobalMotion page={page} />
      <ErrorBoundary key={page}>
        {!cmsLoaded ? (
          <section className="page-shell section-shell" style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div className="motion-spin-slow" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '4px solid var(--leaf-soft)', borderTopColor: 'var(--forest)' }} />
            <span style={{ fontSize: '0.92rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.01em' }}>Sinkronisasi sistem JagoFarm...</span>
          </section>
        ) : (
          <>
            {page === 'home' && (
              !isHomeActive ? (
                <UnderConstructionPage page="home" onNavigate={navigate} pages={cms.pages} cmsLoaded={cmsLoaded} />
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
                <UnderConstructionPage page="catalog" onNavigate={navigate} pages={cms.pages} cmsLoaded={cmsLoaded} />
              ) : (
                <ProductCatalog posts={cms.posts} categories={cms.categories} />
              )
            )}
            {page === 'article' && <ArticleDetail post={cms.posts.find((item) => item?.slug === articleSlug)} onNavigate={navigate} />}
            {page === 'articles' && <ArticleCatalog posts={cms.posts} categories={cms.categories} onNavigate={navigate} />}
            {page === 'about' && (
              !isAboutActive ? (
                <UnderConstructionPage page="about" onNavigate={navigate} pages={cms.pages} cmsLoaded={cmsLoaded} />
              ) : (
                <AboutPage onNavigate={navigate} pageData={findPageBySlug(cms.pages, 'tentang-kami') || findPageBySlug(cms.pages, 'about')} />
              )
            )}
            {page === 'contact' && (
              !isContactActive ? (
                <UnderConstructionPage page="contact" onNavigate={navigate} pages={cms.pages} cmsLoaded={cmsLoaded} />
              ) : (
                <ContactSection onNavigate={navigate} data={cms.settings || {}} pageData={findPageBySlug(cms.pages, 'hubungi-kami')} />
              )
            )}
          </>
        )}
      </ErrorBoundary>
      <Footer onNavigate={navigate} settings={cms.settings} navigation={cms.navigation} />
    </ReactLenis>
  )
}
