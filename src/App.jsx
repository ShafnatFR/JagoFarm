import EcosystemPinnedScroll from './components/EcosystemPinnedScroll.jsx'
import FeaturedProductsSection from './components/FeaturedProductsSection.jsx'
import Footer from './components/Footer.jsx'
import HeroSection from './components/HeroSection.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import Navbar from './components/Navbar.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import SolutionsSection from './components/SolutionsSection.jsx'
import './styles.css'

export default function App() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <HeroSection />
      <EcosystemPinnedScroll />
      <SolutionsSection />
      <FeaturedProductsSection />
      <ProductCatalog />
      <Footer />
    </>
  )
}
