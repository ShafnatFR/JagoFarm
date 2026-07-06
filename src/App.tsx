import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CircularEconomy from './components/CircularEconomy';
import Products from './components/Products';
import DashboardShowcase from './components/DashboardShowcase';
import Faq from './components/Faq';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [initialInterest, setInitialInterest] = useState('Smart Farming IoT');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jagofarm_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jagofarm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jagofarm_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleOpenConsultation = (interest?: string) => {
    if (interest) {
      setInitialInterest(interest);
    }
    setIsConsultationOpen(true);
  };

  const handleScrollToProducts = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      const headerOffset = 80;
      const elementPosition = productSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-bg-white flex flex-col antialiased">
      {/* Section 1: Navigation Bar */}
      <Header 
        onOpenConsultation={handleOpenConsultation} 
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Section 2: Hero Section */}
      <Hero 
        onOpenConsultation={handleOpenConsultation} 
        onScrollToProducts={handleScrollToProducts} 
      />

      {/* Section 3: Ekosistem Sirkular (Circular Economy) */}
      <CircularEconomy />

      {/* Section 4: Produk & Solusi (B2B & B2C Division) */}
      <Products onOpenConsultation={handleOpenConsultation} />

      {/* Section 5: IoT Dashboard Showcase */}
      <DashboardShowcase />

      {/* Section 6: FAQ (Pertanyaan Umum) */}
      <Faq />

      {/* Section 7: Social Proof & Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Centralized Interactive Consultation Popup */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
        initialInterest={initialInterest}
      />
    </div>
  );
}
