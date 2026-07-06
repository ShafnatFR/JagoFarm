import React, { createContext, useContext, useState, useEffect } from 'react';
import { HarvestProduct, ProductReview, CircularStage } from '../types';

export interface ConsultationLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  status: 'Unread' | 'Followed Up' | 'Closed';
}

export interface FaqItemCMS {
  id: string;
  category: string;
  question: string;
  answer: string;
  iconName: string; // 'sprout' | 'cpu' | 'zap' | 'landmark' | 'help'
}

export interface IoTModuleCMS {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  price?: string;
  isReady?: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'click' | 'lead' | 'sensor' | 'admin' | 'system';
  user?: string;
}

interface JagoFarmContextType {
  // Hero CMS
  heroTitle: string;
  setHeroTitle: (t: string) => void;
  heroSubtitle: string;
  setHeroSubtitle: (s: string) => void;
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  metricUptime: string;
  setMetricUptime: (m: string) => void;
  metricCircular: string;
  setMetricCircular: (m: string) => void;
  metricEfficiency: string;
  setMetricEfficiency: (m: string) => void;

  // Circular Economy CMS
  circularTitle: string;
  setCircularTitle: (t: string) => void;
  circularSubtitle: string;
  setCircularSubtitle: (s: string) => void;
  circularStages: CircularStage[];
  setCircularStages: (stages: CircularStage[]) => void;

  // Products CMS
  freshProducts: HarvestProduct[];
  setFreshProducts: (p: HarvestProduct[]) => void;
  iotModules: IoTModuleCMS[];
  setIotModules: (m: IoTModuleCMS[]) => void;

  // FAQ CMS
  faqs: FaqItemCMS[];
  setFaqs: (f: FaqItemCMS[]) => void;

  // Consultation Leads
  leads: ConsultationLead[];
  addLead: (lead: Omit<ConsultationLead, 'id' | 'date' | 'status'>) => void;
  updateLeadStatus: (id: string, status: 'Unread' | 'Followed Up' | 'Closed') => void;
  deleteLead: (id: string) => void;
  deleteLeadsBulk: (ids: string[]) => void;

  // SEO Settings
  seoMetaTitle: string;
  setSeoMetaTitle: (t: string) => void;
  seoMetaDescription: string;
  setSeoMetaDescription: (d: string) => void;
  seoOgImage: string;
  setSeoOgImage: (url: string) => void;

  // IoT Sensor Simulation controls
  sensorDO: number;
  setSensorDO: (v: number) => void;
  sensorPH: number;
  setSensorPH: (v: number) => void;
  sensorTempWater: number;
  setSensorTempWater: (v: number) => void;
  sensorTempGreenhouse: number;
  setSensorTempGreenhouse: (v: number) => void;
  isFanOn: boolean;
  setIsFanOn: (b: boolean) => void;
  isFeederOn: boolean;
  setIsFeederOn: (b: boolean) => void;
  simulationAlert: string | null;
  setSimulationAlert: (a: string | null) => void;

  // Analytics & Logs
  whatsappClicks: number;
  recordWhatsappClick: () => void;
  totalVisitors: number;
  activityLogs: ActivityLog[];
  addActivityLog: (message: string, type: ActivityLog['type'], user?: string) => void;
  clearActivityLogs: () => void;

  // Admin Login State
  isAdminMode: boolean;
  setIsAdminMode: (b: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
}

const JagoFarmContext = createContext<JagoFarmContextType | undefined>(undefined);

const DEFAULT_FAQS: FaqItemCMS[] = [
  {
    id: 'faq-1',
    category: 'Sistem Sirkular',
    question: 'Bagaimana cara kerja integrasi sirkular (Circular Farming) antara perikanan, peternakan, dan perkebunan di JagoFarm?',
    answer: 'Kami menghubungkan tiga sektor dalam siklus sirkular nir-limbah (zero-waste). Kolam Bioflok menghasilkan air kaya nutrisi organik dari metabolisme ikan yang disalurkan sebagai irigasi kaya hara untuk tanaman Golden Melon di Smart Greenhouse. Sisa daun melon dikomposkan, sedangkan peternakan ayam menghasilkan limbah organik yang dikonversi menggunakan pakan maggot Black Soldier Fly (BSF) untuk diolah kembali menjadi pakan nila merah segar tinggi protein.',
    iconName: 'sprout'
  },
  {
    id: 'faq-2',
    category: 'Teknologi IoT',
    question: 'Apa keunggulan teknologi IoT (Internet of Things) yang dipasang di lahan JagoFarm?',
    answer: 'Sistem IoT pintar kami memantau kondisi vital secara real-time 24/7. Di kolam Bioflok, sensor mengukur kadar Oksigen Terlarut (DO), tingkat pH, dan suhu air. Di Smart Greenhouse, sensor mengontrol kelembaban mikro, suhu udara, serta kelembaban tanah untuk mengoptimalkan irigasi tetes otomatis (drip irrigation) yang dipandu algoritma AI presisi.',
    iconName: 'cpu'
  },
  {
    id: 'faq-3',
    category: 'Mitigasi Risiko',
    question: 'Bagaimana sistem IoT membantu mencegah kegagalan panen secara otomatis?',
    answer: 'Sistem kami terhubung dengan Early Warning System (EWS). Jika salah satu parameter kritis (seperti kadar oksigen air di kolam atau suhu ekstrim di dalam greenhouse) melewati batas aman, sistem secara instan mengirim notifikasi darurat ke tim operasional, sekaligus mengaktifkan aktuator fisik cadangan (seperti aerator sekunder atau sistem exhaust mist sprayer) untuk menstabilkan kondisi lingkungan dalam hitungan detik.',
    iconName: 'zap'
  },
  {
    id: 'faq-4',
    category: 'Instalasi & Kustomisasi',
    question: 'Apakah teknologi IoT JagoFarm dapat diintegrasikan pada kolam atau lahan pertanian konvensional milik saya?',
    answer: 'Tentu saja! Solusi IoT JagoFarm dirancang secara modular dan retrofitable. Tim ahli kami dapat melakukan audit kesiapan lahan, merancang tata letak sensor kustom, melakukan kalibrasi instrumen, hingga menghubungkan kolam bioflok atau greenhouse konvensional Anda ke platform monitoring dashboard cerdas kami tanpa harus mengubah total infrastruktur dasar Anda.',
    iconName: 'landmark'
  },
  {
    id: 'faq-5',
    category: 'Pemesanan & Layanan',
    question: 'Bagaimana cara membeli produk hasil panen segar atau menjadwalkan konsultasi pemasangan IoT?',
    answer: 'Anda dapat memesan hasil panen premium kami (seperti Golden Melon, Nila Merah, atau Ayam Organik) secara langsung dengan menekan tombol "Pesan" di bagian produk hasil panen. Untuk konsultasi implementasi teknologi pintar sirkular di lahan Anda, cukup klik tombol "Konsultasi" pada navigasi atas untuk menjadwalkan diskusi mendalam dan survei lahan gratis bersama teknisi ahli kami.',
    iconName: 'help'
  }
];

const DEFAULT_PRODUCTS: HarvestProduct[] = [
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

const DEFAULT_IOT_MODULES: IoTModuleCMS[] = [
  {
    id: 'feeder',
    name: 'Smart Autofeeder (Pemberi Pakan)',
    category: 'Aquaculture IoT',
    description: 'Sistem pelempar pakan modular bertenaga surya. Dosis pakan presisi otomatis berdasarkan usia & berat ikan.',
    features: ['Lontaran pakan hingga 10 meter', 'Sensor loadcell berat akurat', 'Konektivitas Wi-Fi & LoRaWAN'],
    price: 'Rp 4.500.000',
    isReady: true
  },
  {
    id: 'water-sensor',
    name: 'Multi-Sensor Kualitas Air',
    category: 'Aquaculture IoT',
    description: 'Probe terintegrasi untuk membaca suhu air, pH, dan oksigen terlarut (Dissolved Oxygen) secara berkelanjutan.',
    features: ['Kalibrasi otomatis mudah', 'Waterproof IP68 industrial', 'Notifikasi SMS / WhatsApp Instan'],
    price: 'Rp 6.200.000',
    isReady: true
  },
  {
    id: 'dead-fish',
    name: 'AI Camera Dead Fish Detector',
    category: 'Computer Vision',
    description: 'Kamera pintar mendeteksi anomali ikan mati mengambang untuk penanganan cepat mencegah pencemaran air kolam.',
    features: ['Akurasi deteksi hingga 98.7%', 'Lampu LED infra-merah malam hari', 'Integrasi langsung dashboard IoT'],
    price: 'Rp 8.900.000',
    isReady: true
  },
  {
    id: 'greenhouse-controller',
    name: 'Greenhouse Soil & Climate Unit',
    category: 'Horticulture IoT',
    description: 'Pengendali iklim mikro terintegrasi untuk mengatur irigasi tetes, kelembapan tanah, dan kipas angin greenhouse.',
    features: ['Sistem irigasi tetes otomatis', 'Suhu udara & sensor kelembapan', 'Kontrol pompa jarak jauh'],
    price: 'Rp 7.800.000',
    isReady: true
  }
];

const MOCK_LEADS: ConsultationLead[] = [
  {
    id: 'lead-1',
    name: 'Ir. Bambang Triyono',
    email: 'bambang.tri@argogroup.co.id',
    phone: '081234567890',
    interest: 'Smart Farming IoT',
    message: 'Tertarik mengintegrasikan Smart Autofeeder dan sensor air untuk 12 kolam nila kami di Klaten. Tolong kirim penawaran.',
    date: '2026-07-05 14:32',
    status: 'Unread'
  },
  {
    id: 'lead-2',
    name: 'Ibu Widya Astuti',
    email: 'widya.astuti@greenhorti.com',
    phone: '085711223344',
    interest: 'Smart Farming IoT',
    message: 'Saya punya greenhouse melon di Lembang dan ingin memasang Greenhouse Soil & Climate Unit. Apakah bisa kustom jadwal siram?',
    date: '2026-07-05 09:15',
    status: 'Followed Up'
  }
];

const DEFAULT_CIRCULAR_STAGES: CircularStage[] = [
  {
    id: 'maggot',
    name: 'Maggot BSF',
    emoji: '🐛',
    description: 'Lalat Tentara Hitam (Black Soldier Fly) mengurai limbah sisa melon dan sisa ayam.',
    input: 'Limbah Sisa Buah & Lahan',
    output: 'Pakan Tinggi Protein (42%) & Bio-Pupuk',
    efficiency: 'Mengurangi limbah organik hingga 90%',
    details: 'Larva BSF sangat efisien mengurai residu organik dari tanaman melon dan kotoran peternakan. Menghasilkan pakan berkualitas tinggi dengan jejak karbon terendah.',
    imageUrl: 'https://images.unsplash.com/photo-1595273670150-db0a3e37d41a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'poultry',
    name: 'Peternakan Ayam',
    emoji: '🐔',
    description: 'Ayam pedaging berkualitas tinggi dibudidayakan secara sehat tanpa bahan kimia.',
    input: 'Maggot BSF Organik Segar',
    output: 'Daging Ayam Segar & Kotoran Organik',
    efficiency: 'Pemangkasan biaya pakan konvensional 40%',
    details: 'Dengan asupan maggot BSF hidup yang kaya asam amino alami, metabolisme ayam meningkat drastis, menjadikannya ayam organik premium yang sehat dan padat gizi.',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'aquaculture',
    name: 'Budidaya Ikan',
    emoji: '🐟',
    description: 'Ikan air tawar (Nila & Lele) dikembangkan dengan teknologi sirkulasi bioflok.',
    input: 'Pakan Pelet Maggot JagoFarm',
    output: 'Ikan Segar & Air Limbah Kaya Nutrisi',
    efficiency: 'Zero-water waste dengan filtrasi biologis',
    details: 'Air kolam penyaringan kaya akan amonia alami hasil ekskresi ikan yang diproses bakteri pengurai menjadi nitrat organik yang sangat dibutuhkan tanaman.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'horticulture',
    name: 'Melon & Semangka',
    emoji: '🍉',
    description: 'Budidaya melon premium (Inthanon/Kimochi) dan semangka non-biji di dalam greenhouse.',
    input: 'Nutrisi Air Kolam & Pupuk BSF',
    output: 'Buah Premium Segar & Sisa Buah Organik',
    efficiency: 'Hasil panen 2.5x lebih manis & bebas pestisida',
    details: 'Air sirkulasi kaya nitrat dari kolam dialirkan langsung melalui irigasi tetes ke akar tanaman melon. Daun berguguran dan buah non-standar dikembalikan ke fasilitas maggot.',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600'
  }
];

export function JagoFarmProvider({ children }: { children: React.ReactNode }) {
  // Hero CMS States
  const [heroTitle, setHeroTitle] = useState(() => localStorage.getItem('jagofarm_hero_title') || 'Revolusi Agrikultur Cerdas & Sirkular');
  const [heroSubtitle, setHeroSubtitle] = useState(() => localStorage.getItem('jagofarm_hero_subtitle') || 'JagoFarm mengintegrasikan budidaya presisi (ikan, ayam, melon) dengan sistem otomasi IoT modular B2B. Zero waste, produktivitas maksimal, dan ketertelusuran penuh.');
  const [heroImageUrl, setHeroImageUrl] = useState(() => localStorage.getItem('jagofarm_hero_image_url') || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200');
  const [metricUptime, setMetricUptime] = useState(() => localStorage.getItem('jagofarm_metric_uptime') || '99.8%');
  const [metricCircular, setMetricCircular] = useState(() => localStorage.getItem('jagofarm_metric_circular') || 'Zero');
  const [metricEfficiency, setMetricEfficiency] = useState(() => localStorage.getItem('jagofarm_metric_efficiency') || '+150%');

  // Circular Economy CMS States
  const [circularTitle, setCircularTitle] = useState(() => localStorage.getItem('jagofarm_circular_title') || 'Siklus Melingkar (Circular Economy) JagoFarm');
  const [circularSubtitle, setCircularSubtitle] = useState(() => localStorage.getItem('jagofarm_circular_subtitle') || 'Setiap keluaran dari satu elemen adalah masukan berharga bagi elemen lainnya. Kami mengubah limbah menjadi nilai tambah, menciptakan pertanian tanpa sampah.');
  const [circularStages, setCircularStages] = useState<CircularStage[]>(() => {
    const saved = localStorage.getItem('jagofarm_circular_stages');
    return saved ? JSON.parse(saved) : DEFAULT_CIRCULAR_STAGES;
  });

  // Products CMS States
  const [freshProducts, setFreshProducts] = useState<HarvestProduct[]>(() => {
    const saved = localStorage.getItem('jagofarm_fresh_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });
  const [iotModules, setIotModules] = useState<IoTModuleCMS[]>(() => {
    const saved = localStorage.getItem('jagofarm_iot_modules');
    return saved ? JSON.parse(saved) : DEFAULT_IOT_MODULES;
  });

  // FAQs CMS States
  const [faqs, setFaqs] = useState<FaqItemCMS[]>(() => {
    const saved = localStorage.getItem('jagofarm_faqs');
    return saved ? JSON.parse(saved) : DEFAULT_FAQS;
  });

  // Leads state
  const [leads, setLeads] = useState<ConsultationLead[]>(() => {
    const saved = localStorage.getItem('jagofarm_leads');
    return saved ? JSON.parse(saved) : MOCK_LEADS;
  });

  // SEO Settings States
  const [seoMetaTitle, setSeoMetaTitle] = useState(() => localStorage.getItem('jagofarm_seo_meta_title') || 'JagoFarm - Revolusi Agrikultur Cerdas & Sirkular');
  const [seoMetaDescription, setSeoMetaDescription] = useState(() => localStorage.getItem('jagofarm_seo_meta_description') || 'Platform pertanian pintar terintegrasi dengan teknologi sirkular zero-waste dan monitoring IoT 24/7.');
  const [seoOgImage, setSeoOgImage] = useState(() => localStorage.getItem('jagofarm_seo_og_image') || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200');

  // IoT sensor simulations (Live values)
  const [sensorDO, setSensorDO] = useState(6.2); // mg/L
  const [sensorPH, setSensorPH] = useState(7.86);
  const [sensorTempWater, setSensorTempWater] = useState(25.9); // C
  const [sensorTempGreenhouse, setSensorTempGreenhouse] = useState(28.2); // C
  const [isFanOn, setIsFanOn] = useState(true);
  const [isFeederOn, setIsFeederOn] = useState(true);
  const [simulationAlert, setSimulationAlert] = useState<string | null>(null);

  // Analytics states
  const [whatsappClicks, setWhatsappClicks] = useState(() => {
    return Number(localStorage.getItem('jagofarm_wa_clicks') || '84');
  });
  const [totalVisitors, setTotalVisitors] = useState(() => {
    const base = Number(localStorage.getItem('jagofarm_visitors') || '1248');
    return base;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('jagofarm_activity_logs');
    if (saved) return JSON.parse(saved);
    const initialLogs: ActivityLog[] = [
      { id: 'log-1', timestamp: '00:10', message: 'Server JagoFarm IoT Online', type: 'system', user: 'Sistem' },
      { id: 'log-2', timestamp: '00:15', message: 'Sektor Bioflok terhubung ke pusat pemantauan', type: 'sensor', user: 'Sektor Bioflok' },
    ];
    return initialLogs;
  });

  // Admin Access Authentication
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('jagofarm_admin_auth') === 'true';
  });

  // Save changes to localStorage on edit
  useEffect(() => {
    localStorage.setItem('jagofarm_hero_title', heroTitle);
    localStorage.setItem('jagofarm_hero_subtitle', heroSubtitle);
    localStorage.setItem('jagofarm_hero_image_url', heroImageUrl);
    localStorage.setItem('jagofarm_metric_uptime', metricUptime);
    localStorage.setItem('jagofarm_metric_circular', metricCircular);
    localStorage.setItem('jagofarm_metric_efficiency', metricEfficiency);
  }, [heroTitle, heroSubtitle, heroImageUrl, metricUptime, metricCircular, metricEfficiency]);

  useEffect(() => {
    localStorage.setItem('jagofarm_circular_title', circularTitle);
    localStorage.setItem('jagofarm_circular_subtitle', circularSubtitle);
    localStorage.setItem('jagofarm_circular_stages', JSON.stringify(circularStages));
  }, [circularTitle, circularSubtitle, circularStages]);

  useEffect(() => {
    localStorage.setItem('jagofarm_fresh_products', JSON.stringify(freshProducts));
  }, [freshProducts]);

  useEffect(() => {
    localStorage.setItem('jagofarm_iot_modules', JSON.stringify(iotModules));
  }, [iotModules]);

  useEffect(() => {
    localStorage.setItem('jagofarm_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('jagofarm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('jagofarm_wa_clicks', String(whatsappClicks));
  }, [whatsappClicks]);

  useEffect(() => {
    localStorage.setItem('jagofarm_seo_meta_title', seoMetaTitle);
    localStorage.setItem('jagofarm_seo_meta_description', seoMetaDescription);
    localStorage.setItem('jagofarm_seo_og_image', seoOgImage);

    // Apply to DOM title
    document.title = seoMetaTitle;

    // Apply Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoMetaDescription);

    // Apply OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seoMetaTitle);

    // Apply OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', seoMetaDescription);

    // Apply OpenGraph Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', seoOgImage);
  }, [seoMetaTitle, seoMetaDescription, seoOgImage]);

  useEffect(() => {
    // Increment visitor count by 1 on fresh load
    const incremented = totalVisitors + 1;
    setTotalVisitors(incremented);
    localStorage.setItem('jagofarm_visitors', String(incremented));

    addActivityLog('Pengunjung baru memasuki situs JagoFarm', 'click', 'Pengunjung');
  }, []);

  const addActivityLog = (message: string, type: ActivityLog['type'], user: string = 'Pengunjung') => {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: time,
      message,
      type,
      user
    };
    setActivityLogs(prev => {
      const updated = [newLog, ...prev].slice(0, 80);
      localStorage.setItem('jagofarm_activity_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const clearActivityLogs = () => {
    setActivityLogs([]);
    localStorage.removeItem('jagofarm_activity_logs');
  };

  const addLead = (leadData: Omit<ConsultationLead, 'id' | 'date' | 'status'>) => {
    const time = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + 
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newLead: ConsultationLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: time,
      status: 'Unread'
    };
    setLeads(prev => [newLead, ...prev]);
    addActivityLog(`Formulir konsultasi dikirim oleh ${leadData.name} (${leadData.interest})`, 'lead', 'Pengunjung');
  };

  const updateLeadStatus = (id: string, status: 'Unread' | 'Followed Up' | 'Closed') => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
    addActivityLog(`Status lead ID ${id.substring(5, 9)} diubah ke ${status}`, 'admin', 'admin@jagofarm.com');
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    addActivityLog(`Lead ID ${id.substring(5, 9)} dihapus`, 'admin', 'admin@jagofarm.com');
  };

  const deleteLeadsBulk = (ids: string[]) => {
    setLeads(prev => prev.filter(lead => !ids.includes(lead.id)));
    addActivityLog(`${ids.length} Leads berhasil dihapus secara massal`, 'admin', 'admin@jagofarm.com');
  };

  const recordWhatsappClick = () => {
    setWhatsappClicks(prev => prev + 1);
    addActivityLog('Pengunjung mengklik CTA Hubungi WhatsApp', 'click', 'Pengunjung');
  };

  const loginAdmin = (passcode: string): boolean => {
    if (passcode.toLowerCase() === 'admin' || passcode === '1234') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('jagofarm_admin_auth', 'true');
      addActivityLog('Admin berhasil login ke panel CMS', 'admin', 'admin@jagofarm.com');
      return true;
    }
    addActivityLog('Gagal login admin: Sandi salah', 'system', 'Sistem');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('jagofarm_admin_auth');
    addActivityLog('Admin keluar dari panel CMS', 'admin', 'admin@jagofarm.com');
  };

  return (
    <JagoFarmContext.Provider value={{
      heroTitle, setHeroTitle,
      heroSubtitle, setHeroSubtitle,
      heroImageUrl, setHeroImageUrl,
      metricUptime, setMetricUptime,
      metricCircular, setMetricCircular,
      metricEfficiency, setMetricEfficiency,
      circularTitle, setCircularTitle,
      circularSubtitle, setCircularSubtitle,
      circularStages, setCircularStages,
      freshProducts, setFreshProducts,
      iotModules, setIotModules,
      faqs, setFaqs,
      leads, addLead, updateLeadStatus, deleteLead, deleteLeadsBulk,
      seoMetaTitle, setSeoMetaTitle,
      seoMetaDescription, setSeoMetaDescription,
      seoOgImage, setSeoOgImage,
      sensorDO, setSensorDO,
      sensorPH, setSensorPH,
      sensorTempWater, setSensorTempWater,
      sensorTempGreenhouse, setSensorTempGreenhouse,
      isFanOn, setIsFanOn,
      isFeederOn, setIsFeederOn,
      simulationAlert, setSimulationAlert,
      whatsappClicks, recordWhatsappClick,
      totalVisitors,
      activityLogs, addActivityLog, clearActivityLogs,
      isAdminMode, setIsAdminMode,
      isAdminAuthenticated, loginAdmin, logoutAdmin
    }}>
      {children}
    </JagoFarmContext.Provider>
  );
}

export function useJagoFarm() {
  const context = useContext(JagoFarmContext);
  if (context === undefined) {
    throw new Error('useJagoFarm must be used within a JagoFarmProvider');
  }
  return context;
}
