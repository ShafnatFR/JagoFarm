import { InstagramFeedItem } from '../types';
import { 
  Instagram, MessageCircle, Mail, MapPin, 
  Phone, ArrowUp, Send, Facebook, Youtube, Share2, Heart 
} from 'lucide-react';

interface FooterProps {
  onOpenConsultation: (interest?: string) => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  
  // Real-world representative Instagram feed cards for JagoFarm
  const feedItems: InstagramFeedItem[] = [
    {
      id: 'post-1',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400',
      caption: 'Panen Melon Golden Inthanon perdana di greenhouse pintar Blok C! Kemanisan mencapai 15.8 Brix 🍈✨',
      likes: '1,245',
      comments: '84'
    },
    {
      id: 'post-2',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
      caption: 'Pemasangan Sensor pH & Oksigen Terlarut IoT nirkabel di kolam nila bioflok terintegrasi sirkular 🐟📡',
      likes: '954',
      comments: '42'
    },
    {
      id: 'post-3',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400',
      caption: 'Ayam sehat panen melimpah! Didukung asupan asam amino lalat tentara hitam (BSF) organik JagoFarm 🐔💪',
      likes: '1,108',
      comments: '56'
    },
    {
      id: 'post-4',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
      caption: 'Kunjungan Kelompok Tani Milenial Jawa Barat mempelajari integrasi circular economy agristep kami 🌾🤝',
      likes: '1,890',
      comments: '120'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleWhatsAppDirect = () => {
    const defaultText = "Halo JagoFarm! Saya tertarik untuk tahu lebih banyak tentang produk pangan segar dan instalasi IoT B2B JagoFarm.";
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

  const handleScrollToId = (id: string) => {
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

  return (
    <footer id="social-proof" className="relative flex flex-col w-full text-left">
      
      {/* ================= TOP HALF: LIGHT BLUE (Social Proof / Insta Feed) ================= */}
      <div className="bg-secondary py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 border border-accent/20">
                <Instagram className="h-4 w-4 text-accent" />
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">Aktivitas Harian</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                Ikuti Perjalanan Kami
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                Pantau real-time dokumentasi panen, tips sirkular agritech, dan instalasi lapangan tim engineering JagoFarm melalui jejaring sosial kami.
              </p>
            </div>

            {/* Social handles badges */}
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/jagofarm" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-bg-white px-4 py-2 text-xs font-bold text-primary hover:text-accent border border-slate-200 shadow-xs transition-colors"
              >
                <Instagram className="h-4 w-4 text-accent" />
                <span>@JagoFarm</span>
              </a>
              <button 
                onClick={handleWhatsAppDirect}
                className="flex items-center gap-1.5 rounded-xl bg-bg-white px-4 py-2 text-xs font-bold text-primary hover:text-accent border border-slate-200 shadow-xs transition-colors"
              >
                <Share2 className="h-4 w-4 text-accent" />
                <span>Bagikan Profil</span>
              </button>
            </div>
          </div>

          {/* Social feed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedItems.map((item) => (
              <div 
                key={item.id}
                id={`social-feed-${item.id}`}
                className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={item.thumbnail} 
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover social metric glass overlay */}
                  <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-bg-white font-mono text-xs z-10">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold">
                      <MessageCircle className="h-4 w-4 text-accent" />
                      {item.comments}
                    </span>
                  </div>
                </div>

                {/* Caption / Text Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-semibold pt-3 mt-3 border-t border-slate-100">
                    <span>Instagram Feed</span>
                    <span className="text-accent">Lihat Post</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= BOTTOM HALF: DARK BLUE (Core Footer) ================= */}
      <div className="bg-primary dark:bg-sky-900 text-slate-300 dark:text-sky-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10 dark:border-sky-800/50">
            
            {/* Left Box (Logo & Tagline) (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent dark:bg-sky-400 text-bg-white dark:text-slate-900 shadow-lg shadow-accent/20">
                  <span className="font-display font-extrabold text-lg">JF</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-black tracking-tight text-bg-white dark:text-white leading-none">
                    JagoFarm
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-accent dark:text-sky-300 font-bold uppercase mt-0.5">
                    INTEGRATED AGRITECH
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 dark:text-sky-200/90 leading-relaxed max-w-sm">
                Pelopor digitalisasi agrikultur terintegrasi sirkular di Indonesia. Kami merekayasa ekosistem mandiri nir-limbah yang menguntungkan bumi sekaligus meningkatkan produktivitas komoditas pangan berkualitas tinggi.
              </p>

              {/* Social Icon links */}
              <div className="flex gap-3">
                <a href="#instagram" className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 dark:border-sky-800/50 flex items-center justify-center text-slate-400 dark:text-sky-200 hover:text-accent dark:hover:text-white hover:bg-white/10 transition-colors">
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a href="#facebook" className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 dark:border-sky-800/50 flex items-center justify-center text-slate-400 dark:text-sky-200 hover:text-accent dark:hover:text-white hover:bg-white/10 transition-colors">
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a href="#youtube" className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 dark:border-sky-800/50 flex items-center justify-center text-slate-400 dark:text-sky-200 hover:text-accent dark:hover:text-white hover:bg-white/10 transition-colors">
                  <Youtube className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Middle Box (Quick Links) (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-bg-white dark:text-white border-b border-white/10 dark:border-sky-800/50 pb-2">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button 
                    onClick={() => handleScrollToId('hero')} 
                    className="hover:text-accent dark:hover:text-white transition-colors block text-left"
                  >
                    Home / Atas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToId('circular')} 
                    className="hover:text-accent dark:hover:text-white transition-colors block text-left"
                  >
                    Ekosistem Sirkular
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToId('products')} 
                    className="hover:text-accent dark:hover:text-white transition-colors block text-left"
                  >
                    Produk Hasil Panen
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToId('dashboard-showcase')} 
                    className="hover:text-accent dark:hover:text-white transition-colors block text-left"
                  >
                    Solusi IoT Turnkey
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToId('social-proof')} 
                    className="hover:text-accent dark:hover:text-white transition-colors block text-left"
                  >
                    Tentang Kami & Feed
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Box (Contacts & Direct Whatsapp CTA) (4 cols) */}
            <div className="md:col-span-4 space-y-5">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-bg-white dark:text-white border-b border-white/10 dark:border-sky-800/50 pb-2">
                Kontak & Dukungan B2B
              </h4>
              
              <ul className="space-y-3 text-xs text-slate-400 dark:text-sky-200/90">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent dark:text-sky-300 flex-shrink-0 mt-0.5" />
                  <span>Kawasan Agri-Sains Terpadu JagoFarm, Gedung Inovasi No.12, Bogor, Jawa Barat, Indonesia.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent dark:text-sky-300 flex-shrink-0" />
                  <span>support@jagofarm.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent dark:text-sky-300 flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </li>
              </ul>

              {/* Large CTA WhatsApp Button using Sky Blue */}
              <button
                id="cta-whatsapp-footer"
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-bg-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-900 py-3.5 px-4 text-xs font-extrabold shadow-lg shadow-accent/15 transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>Hubungi via WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Subfooter (Copyright & Scroll top) */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-slate-500 dark:text-sky-300/70 gap-4">
            <p>© 2026 JagoFarm. All Rights Reserved. Pelopor Circular Agritech Indonesia.</p>
            
            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-accent dark:hover:text-white font-semibold transition-colors"
              aria-label="Kembali ke atas"
            >
              <span>Kembali Ke Atas</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
