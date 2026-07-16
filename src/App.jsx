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
    setPage(resolveRoute(target))
    setArticleSlug(articleSlugFromPath(target))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <ReactLenis root>
      <Navbar page={page} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} navigation={cms.navigation} settings={cms.settings} />
      <GlobalMotion page={page} />
      <ErrorBoundary key={page}>
        {page === 'home' && (
          <>
            <HeroSection theme={theme} onToggleTheme={toggleTheme} data={findFirstBlockByType(findPageBySlug(cms.pages, 'beranda'), 'hero')?.data || cms.settings?.hero} />
            <EcosystemPinnedScroll stages={findBlocksByType(findPageBySlug(cms.pages, 'beranda'), 'ecosystem-stage')} />
            <SolutionsSection data={findFirstBlockByType(findPageBySlug(cms.pages, 'beranda'), 'solutions')?.data} pageData={findPageBySlug(cms.pages, 'beranda')} posts={cms.posts} />
            <ErrorBoundary><FeaturedProductsSection posts={cms.posts} /></ErrorBoundary>
            <LatestArticle posts={cms.posts} onNavigate={navigate} />
          </>
        )}
        {page === 'catalog' && <ProductCatalog posts={cms.posts} categories={cms.categories} />}
        {page === 'article' && <ArticleDetail post={cms.posts.find((item) => item?.slug === articleSlug)} onNavigate={navigate} />}
        {page === 'about' && <AboutPage onNavigate={navigate} pageData={findPageBySlug(cms.pages, 'tentang-kami')} />}
        {page === 'contact' && <ContactSection onNavigate={navigate} data={cms.settings || {}} pageData={findPageBySlug(cms.pages, 'hubungi-kami')} />}
      </ErrorBoundary>
      <Footer onNavigate={navigate} settings={cms.settings} navigation={cms.navigation} />
    </ReactLenis>
  )
}
