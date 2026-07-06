import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Cpu, 
  ArrowUpRight, 
  Check, 
  HardDrive, 
  Shield, 
  HelpCircle, 
  Thermometer, 
  Database,
  Star,
  MessageSquare,
  Plus,
  X,
  Calendar,
  User
} from 'lucide-react';
import { HarvestProduct, ProductReview } from '../types';

interface ProductsProps {
  onOpenConsultation: (interest?: string) => void;
}

const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-melon-1',
    productId: 'melon',
    author: 'Rudi Hermawan',
    rating: 5,
    comment: 'Melonnya luar biasa manis dan renyah! Wanginya harum khas melon Jepang premium. Anak-anak saya sangat suka.',
    date: '2026-07-04'
  },
  {
    id: 'rev-melon-2',
    productId: 'melon',
    author: 'Siti Rahma',
    rating: 5,
    comment: 'Beli untuk kado rekan kerja, kemasannya rapi sekali dan rasanya super manis (Brix pas). Next pasti order lagi.',
    date: '2026-07-05'
  },
  {
    id: 'rev-melon-3',
    productId: 'melon',
    author: 'Budi Santoso',
    rating: 4,
    comment: 'Kualitas prima, renyah dan manisnya konsisten. Harganya sebanding dengan kualitas green house.',
    date: '2026-07-02'
  },
  {
    id: 'rev-fish-1',
    productId: 'fish',
    author: 'Hendra Wijaya',
    rating: 5,
    comment: 'Sangat bersih, tidak ada bau lumpur sama sekali seperti klaimnya. Dagingnya gurih dan padat. Sangat direkomendasikan!',
    date: '2026-07-05'
  },
  {
    id: 'rev-fish-2',
    productId: 'fish',
    author: 'Dewi Lestari',
    rating: 4,
    comment: 'Nila merah segar, dikemas dengan baik. Enak digoreng garing atau dibakar bersama keluarga.',
    date: '2026-07-03'
  },
  {
    id: 'rev-chicken-1',
    productId: 'chicken',
    author: 'Amalia Putri',
    rating: 5,
    comment: 'Ayamnya gurih alami, dagingnya kesat dan minim lemak jenuh. Cocok banget buat diet sehat keluarga.',
    date: '2026-07-04'
  },
  {
    id: 'rev-chicken-2',
    productId: 'chicken',
    author: 'Yusuf M.',
    rating: 5,
    comment: 'Luar biasa! Tekstur dagingnya kenyal dan padat, beda dengan ayam broiler biasa. Sangat puas dengan konsep pakan maggot organik.',
    date: '2026-07-05'
  },
  {
    id: 'rev-watermelon-1',
    productId: 'watermelon',
    author: 'Slamet Riyadi',
    rating: 5,
    comment: 'Sangat berair, manis segar dan betul-betul bebas biji. Pas banget dikonsumsi siang-siang pas cuaca panas.',
    date: '2026-07-03'
  },
  {
    id: 'rev-watermelon-2',
    productId: 'watermelon',
    author: 'Rina Kartika',
    rating: 4,
    comment: 'Manisnya segar alami, ukurannya pas untuk porsi keluarga. Pengiriman juga sangat cepat dan aman.',
    date: '2026-07-01'
  }
];

export default function Products({ onOpenConsultation }: ProductsProps) {
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c');

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('jagofarm_product_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [selectedProduct, setSelectedProduct] = useState<HarvestProduct | null>(null);
  
  // Review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showFormError, setShowFormError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  const getAverageRating = (productId: string) => {
    const prodReviews = getProductReviews(productId);
    if (prodReviews.length === 0) return 0;
    const sum = prodReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / prodReviews.length;
  };

  const getProductReviewsCount = (productId: string) => {
    return getProductReviews(productId).length;
  };

  const handleOpenReviews = (product: HarvestProduct) => {
    setSelectedProduct(product);
    // Reset form states
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setShowFormError(false);
    setShowSuccessToast(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      setShowFormError(true);
      return;
    }

    if (!selectedProduct) return;

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: selectedProduct.id,
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('jagofarm_product_reviews', JSON.stringify(updated));

    // Reset fields & show success feedback
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setShowFormError(false);
    setShowSuccessToast(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  // Fresh Produce (B2C & Wholesale)
  const freshProducts: HarvestProduct[] = [
    {
      id: 'melon',
      name: 'Melon Golden Inthanon',
      category: 'Hortikultura Premium',
      description: 'Melon hidroklimat Jepang yang manis, renyah, dan dipanen segar langsung dari green house sirkular.',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600',
      tags: ['Brix 14-16', 'Pestisida Alami']
    },
    {
      id: 'fish',
      name: 'Ikan Nila Merah Bioflok',
      category: 'Aquaculture Cerdas',
      description: 'Ikan nila padat nutrisi dari kolam bioflok terkelola IoT, menjamin cita rasa daging gurih tanpa aroma lumpur.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
      tags: ['Tinggi Protein', 'Bebas Logam Berat']
    },
    {
      id: 'chicken',
      name: 'Ayam Sirkular Premium',
      category: 'Peternakan Organik',
      description: 'Ayam sehat hasil pakan maggot segar BSF. Daging padat rendah lemak jenuh dan tinggi asam amino esensial.',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=600',
      tags: ['Non-Antibiotik', 'Pakan Organik']
    },
    {
      id: 'watermelon',
      name: 'Semangka Non-Biji Merah',
      category: 'Hortikultura Premium',
      description: 'Semangka manis segar hasil penyaringan irigasi sirkular kolam nila, kaya serat dan hidrasi optimal.',
      image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=600',
      tags: ['Bebas Biji', 'Irigasi Nutrisi Ikan']
    }
  ];

  // Turnkey IoT Solutions (B2B)
  const iotModules = [
    {
      id: 'feeder',
      name: 'Smart Autofeeder (Pemberi Pakan)',
      category: 'Aquaculture IoT',
      description: 'Sistem pelempar pakan modular bertenaga surya. Dosis pakan presisi otomatis berdasarkan usia & berat ikan.',
      features: ['Lontaran pakan hingga 10 meter', 'Sensor loadcell berat akurat', 'Konektivitas Wi-Fi & LoRaWAN']
    },
    {
      id: 'water-sensor',
      name: 'Multi-Sensor Kualitas Air',
      category: 'Aquaculture IoT',
      description: 'Probe terintegrasi untuk membaca suhu air, pH, dan oksigen terlarut (Dissolved Oxygen) secara berkelanjutan.',
      features: ['Kalibrasi otomatis mudah', 'Waterproof IP68 industrial', 'Notifikasi SMS / WhatsApp Instan']
    },
    {
      id: 'dead-fish',
      name: 'AI Camera Dead Fish Detector',
      category: 'Computer Vision',
      description: 'Kamera pintar mendeteksi anomali ikan mati mengambang untuk penanganan cepat mencegah pencemaran air kolam.',
      features: ['Akurasi deteksi hingga 98.7%', 'Lampu LED infra-merah malam hari', 'Integrasi langsung dashboard IoT']
    },
    {
      id: 'greenhouse-controller',
      name: 'Greenhouse Soil & Climate Unit',
      category: 'Horticulture IoT',
      description: 'Pengendali iklim mikro terintegrasi untuk mengatur irigasi tetes, kelembapan tanah, dan kipas angin greenhouse.',
      features: ['Sistem irigasi tetes otomatis', 'Suhu udara & sensor kelembapan', 'Kontrol pompa jarak jauh']
    }
  ];

  return (
    <section
      id="products"
      className="relative py-24 bg-bg-white text-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 border border-accent/20">
              <ShoppingBag className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">Katalog Unit Usaha</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Produk Segar & Solusi IoT Turnkey
            </h2>
            <p className="text-sm text-slate-600">
              Kami melayani rantai pasokan kuliner segar grosir (B2C / Horeca) sekaligus instalasi infrastruktur digital cerdas pertanian modular (B2B).
            </p>
          </div>

          {/* Division Switcher Button Group */}
          <div className="flex items-center bg-secondary p-1.5 rounded-xl border border-secondary self-start md:self-auto">
            <button
              id="tab-b2c"
              onClick={() => setActiveTab('b2c')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'b2c'
                  ? 'bg-primary text-bg-white shadow-md'
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Hasil Panen Segar (B2C)</span>
            </button>
            <button
              id="tab-b2b"
              onClick={() => setActiveTab('b2b')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'b2b'
                  ? 'bg-primary text-bg-white shadow-md'
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>Turnkey IoT Smart Farm (B2B)</span>
            </button>
          </div>
        </div>

        {/* Catalog Displays */}
        <AnimatePresence mode="wait">
          {activeTab === 'b2c' ? (
            <motion.div
              key="b2c-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {freshProducts.map((p) => (
                <div
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="group flex flex-col rounded-3xl bg-bg-white border border-secondary overflow-hidden shadow-xl shadow-secondary/60 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/35 transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden bg-secondary/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-primary shadow-xs">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <h3 className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors">
                        {p.name}
                      </h3>

                      {/* Interactive Stars and Rating Badge */}
                      <div 
                        onClick={() => handleOpenReviews(p)}
                        className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-100/80 transition-all bg-slate-50 border border-slate-100 rounded-lg py-1 px-2.5 inline-flex"
                        title="Klik untuk melihat ulasan & memberi rating"
                      >
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => {
                            const avg = getAverageRating(p.id);
                            return (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                }`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-xs font-bold text-slate-700 leading-none">
                          {getAverageRating(p.id).toFixed(1)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium leading-none">
                          ({getProductReviewsCount(p.id)})
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                        {p.description}
                      </p>
                    </div>

                    {/* Tags and Action */}
                    <div className="pt-4 border-t border-secondary mt-4 space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-mono font-bold bg-secondary text-accent px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          id={`btn-reviews-product-${p.id}`}
                          onClick={() => handleOpenReviews(p)}
                          className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-secondary hover:bg-slate-200 text-primary py-2 px-2 text-[11px] font-bold transition-all border border-slate-200"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-accent" />
                          <span>Ulasan ({getProductReviewsCount(p.id)})</span>
                        </button>
                        
                        <button
                          id={`btn-order-product-${p.id}`}
                          onClick={() => onOpenConsultation('Hasil Panen Segar')}
                          className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-accent hover:bg-accent-hover text-bg-white py-2 px-2 text-[11px] font-bold transition-all shadow-md shadow-accent/10"
                        >
                          <span>Pesan</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="b2b-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {iotModules.map((m) => (
                <div
                  key={m.id}
                  id={`iot-module-card-${m.id}`}
                  className="group rounded-3xl bg-bg-white border border-secondary p-6 sm:p-8 flex flex-col justify-between text-left shadow-xl shadow-secondary/60 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
                        {m.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-sky-300/80 font-bold">READY TO DEPLOY</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {m.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                      {m.description}
                    </p>

                    {/* Tech Features Bullet points */}
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3">
                      {m.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-1.5 text-[10px] text-slate-600 dark:text-slate-200 bg-secondary/50 dark:bg-sky-950/20 p-2 rounded-lg border border-secondary dark:border-sky-900/30">
                          <Check className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing action info */}
                  <div className="flex items-center justify-between pt-6 border-t border-secondary mt-6 gap-4">
                    <div className="text-left">
                      <p className="text-[10px] font-mono text-slate-400 dark:text-sky-300/70 font-bold uppercase">Suku Cadang & Jasa Pasang</p>
                      <p className="text-sm font-bold text-primary">Termasuk Garansi 1 Tahun</p>
                    </div>

                    <button
                      id={`btn-quote-iot-${m.id}`}
                      onClick={() => onOpenConsultation('Smart Farming IoT')}
                      className="flex items-center gap-1.5 rounded-xl bg-primary dark:bg-accent text-bg-white dark:text-slate-950 hover:bg-accent dark:hover:bg-sky-300 py-2.5 px-4 text-xs font-bold transition-all"
                    >
                      <span>Minta Penawaran</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom banner for smart customizer */}
        <div className="mt-12 rounded-3xl bg-secondary/60 border border-secondary/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <span className="rounded-full bg-accent/20 text-accent font-mono text-[10px] font-bold px-2.5 py-0.5">
              CUSTOM INTEGRASI B2B
            </span>
            <h3 className="font-display text-lg font-bold text-primary">
              Butuh Desain Smart Farm Khusus Lahan Anda?
            </h3>
            <p className="text-xs text-slate-500 max-w-xl">
              Kami merancang instalasi greenhouse melon dan kolam nila terpadu sirkular lengkap dengan pipa irigasi, sensor kualitas air otomatis, dan monitoring real-time berbasis LoRaWAN.
            </p>
          </div>

          <button
            id="btn-custom-consultation-products"
            onClick={() => onOpenConsultation('Smart Farming IoT')}
            className="flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-bg-white py-3 px-6 text-xs font-bold transition-all flex-shrink-0 shadow-lg shadow-accent/25"
          >
            <span>Hubungi Konsultan Teknik</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Reviews and Ratings Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-bg-white rounded-3xl border border-secondary shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-secondary">
                  <div className="text-left">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-primary mt-1">
                      Ulasan & Rating: {selectedProduct.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 rounded-full hover:bg-secondary text-primary/70 hover:text-primary transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content: Two Columns on desktop */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Product Summary & Stats, plus Write Review Form (5 cols) */}
                  <div className="md:col-span-5 space-y-6">
                    {/* Product Preview Miniature */}
                    <div className="flex items-center gap-4 bg-secondary/30 p-3 rounded-2xl border border-secondary">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-16 h-16 object-cover rounded-xl border border-secondary"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold text-primary">{selectedProduct.name}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mt-0.5">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>

                    {/* Average Rating Card */}
                    <div className="bg-secondary/20 p-5 rounded-2xl border border-secondary text-center space-y-4">
                      <div>
                        <p className="text-4xl font-extrabold text-primary font-display">
                          {getAverageRating(selectedProduct.id).toFixed(1)}
                        </p>
                        <div className="flex justify-center text-amber-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.round(getAverageRating(selectedProduct.id))
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 mt-1 uppercase font-bold">
                          Berdasarkan {getProductReviewsCount(selectedProduct.id)} Ulasan
                        </p>
                      </div>

                      {/* Ratings Breakdown Progress Bars */}
                      <div className="space-y-1.5 text-left text-xs">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const prodReviews = getProductReviews(selectedProduct.id);
                          const count = prodReviews.filter(r => r.rating === stars).length;
                          const percent = prodReviews.length > 0 ? (count / prodReviews.length) * 100 : 0;
                          return (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="w-3 text-right font-mono text-slate-500 font-bold">{stars}</span>
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-accent rounded-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className="w-6 text-right font-mono text-slate-500">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Write Review Form */}
                    <form onSubmit={handleSubmitReview} className="bg-bg-white border border-secondary p-5 rounded-2xl space-y-4 text-left">
                      <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-wider border-b border-secondary pb-2 flex items-center gap-1.5">
                        <Plus className="h-3.5 w-3.5 text-accent" />
                        Tulis Ulasan Anda
                      </h4>

                      {showFormError && (
                        <div className="text-[11px] text-rose-500 bg-rose-50 border border-rose-100 p-2 rounded-lg font-bold">
                          Mohon isi Nama dan komentar ulasan Anda!
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-500 uppercase">Nama Lengkap</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Contoh: Budi Susanto"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className="w-full text-xs rounded-xl border border-secondary bg-bg-white py-2 pl-9 pr-3 text-primary placeholder-slate-400 focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono font-bold text-slate-500 uppercase block">Rating Anda</label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="text-amber-400 p-0.5 hover:scale-110 transition-transform focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-slate-600 ml-2 font-mono">
                            {newRating} / 5
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono font-bold text-slate-500 uppercase">Komentar Ulasan</label>
                        <textarea
                          placeholder="Ceritakan pengalaman Anda membeli produk ini..."
                          rows={3}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full text-xs rounded-xl border border-secondary bg-bg-white p-3 text-primary placeholder-slate-400 focus:outline-none focus:border-accent resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-accent hover:bg-accent-hover text-bg-white py-2.5 px-4 text-xs font-bold transition-all shadow-md shadow-accent/15"
                      >
                        <span>Kirim Ulasan</span>
                        <Check className="h-4 w-4" />
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Individual Reviews list (7 cols) */}
                  <div className="md:col-span-7 flex flex-col">
                    <h4 className="text-sm font-bold text-primary font-display text-left mb-4 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <span>Semua Ulasan ({getProductReviewsCount(selectedProduct.id)})</span>
                    </h4>

                    {/* Scrollable list container */}
                    <div className="flex-1 overflow-y-auto space-y-4 max-h-[60vh] pr-2">
                      {getProductReviews(selectedProduct.id).length === 0 ? (
                        <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-secondary border-dashed text-slate-400">
                          <MessageSquare className="h-10 w-10 mx-auto opacity-30 mb-2 text-accent" />
                          <p className="text-xs font-medium">Belum ada ulasan untuk produk ini.</p>
                          <p className="text-[10px] mt-0.5">Jadilah yang pertama menulis ulasan!</p>
                        </div>
                      ) : (
                        getProductReviews(selectedProduct.id).map((r) => {
                          const initials = r.author
                            .split(' ')
                            .map(n => n[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();
                          
                          return (
                            <div
                              key={r.id}
                              className="bg-secondary/10 p-4 rounded-2xl border border-secondary flex items-start gap-3.5 text-left hover:border-accent/15 transition-all duration-200"
                            >
                              {/* Avatar circle */}
                              <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono">
                                {initials || 'U'}
                              </div>

                              {/* Review info */}
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                  <h5 className="text-xs font-bold text-primary">{r.author}</h5>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                                    <Calendar className="h-3 w-3" />
                                    <span>{r.date}</span>
                                  </div>
                                </div>

                                {/* Stars */}
                                <div className="flex items-center text-amber-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                                      }`}
                                    />
                                  ))}
                                </div>

                                {/* Comment text */}
                                <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
                                  {r.comment}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer status / toast notification inside modal */}
                <AnimatePresence>
                  {showSuccessToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 left-4 right-4 bg-green-600 text-bg-white py-3 px-4 rounded-xl shadow-lg flex items-center justify-between z-20 text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 bg-bg-white text-green-600 rounded-full p-0.5" />
                        <span>Terima kasih! Ulasan Anda berhasil dikirim dan ditampilkan.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
