import { useState, useEffect } from 'react';
import { Menu, X, Landmark, ArrowRight, Activity, Sun, Moon, Lock } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: (interest?: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenAdmin: () => void;
}

export default function Header({ onOpenConsultation, isDark, toggleTheme, onOpenAdmin }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle subtle header shadow on scroll to feel high-end
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Eksosistem', target: 'circular' },
    { label: 'Produk', target: 'products' },
    { label: 'Solusi IoT', target: 'dashboard-showcase' },
    { label: 'Perjalanan Kami', target: 'social-proof' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-white/95 backdrop-blur-md shadow-md shadow-secondary/20 border-b border-secondary/30 py-3' 
          : 'bg-bg-white py-4 border-b border-secondary/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            id="brand-logo" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent text-bg-white shadow-md shadow-accent/25 overflow-hidden">
              <Activity className="h-5 w-5 animate-pulse text-secondary" />
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-primary leading-none group-hover:text-accent transition-colors">
                JagoFarm
              </span>
              <span className="text-[10px] font-mono tracking-wider text-accent font-semibold uppercase mt-0.5">
                Cerdas & Sirkular
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-menu" className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                id={`nav-item-${item.target}`}
                onClick={() => scrollToSection(item.target)}
                className="text-sm font-medium text-primary/80 hover:text-accent transition-colors duration-200 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Call / Consultation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-secondary hover:bg-secondary text-primary transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
              title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-500 animate-pulse" />
              ) : (
                <Moon className="h-4 w-4 text-accent" />
              )}
            </button>
            
            {/* Added Lock/Admin Icon Access button */}
            <button
              id="admin-panel-toggle"
              onClick={onOpenAdmin}
              className="flex items-center gap-2 rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              title="Akses Portal Admin JagoFarm"
            >
              <Lock className="h-3.5 w-3.5 text-accent" />
              <span>Admin CMS</span>
            </button>

            <button
              id="cta-konsultasi-header"
              onClick={() => onOpenConsultation('Smart Farming IoT')}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg-white hover:bg-accent hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all duration-200"
            >
              <span>Konsultasi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle & Theme Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="theme-toggle-mobile-top"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-secondary text-primary hover:bg-secondary transition-colors flex items-center justify-center cursor-pointer"
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-accent" />
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-1.5 text-primary hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay" 
          className="md:hidden fixed inset-x-0 top-[70px] bg-bg-white border-b border-secondary/30 shadow-xl z-30 overflow-hidden"
        >
          <div className="px-4 pt-3 pb-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                id={`mobile-nav-item-${item.target}`}
                onClick={() => scrollToSection(item.target)}
                className="block w-full text-left rounded-lg px-4 py-2.5 text-base font-semibold text-primary hover:bg-secondary hover:text-accent transition-all"
              >
                {item.label}
              </button>
            ))}
            
            {/* Call to action inside mobile drawer */}
            <div className="pt-4 border-t border-secondary/30 space-y-3">
              {/* Integrated Theme Toggle Row for Drawer */}
              <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 rounded-xl border border-secondary">
                <span className="text-sm font-semibold text-primary">Mode Gelap (High Contrast)</span>
                <button
                  id="theme-toggle-drawer"
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-bg-white border border-secondary text-primary hover:bg-secondary transition-colors flex items-center gap-2"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-bold text-amber-600">Terang</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-accent" />
                      <span className="text-xs font-bold text-accent">Gelap</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Admin panel CMS access */}
              <button
                id="cta-admin-mobile"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-secondary py-3 px-4 text-center text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-secondary transition-colors"
              >
                <Lock className="h-4 w-4 text-accent" />
                <span>Portal Admin & CMS</span>
              </button>

              <button
                id="cta-konsultasi-mobile"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation('Smart Farming IoT');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-center text-sm font-bold text-bg-white hover:bg-accent transition-colors"
              >
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
