import { CircularStage, HarvestProduct, IoTModuleCMS, ConsultationLead, FaqItemCMS } from '../types';

export const DEFAULT_FAQS: FaqItemCMS[] = [
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

export const DEFAULT_PRODUCTS: HarvestProduct[] = [
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

export const DEFAULT_IOT_MODULES: IoTModuleCMS[] = [
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

export const MOCK_LEADS: ConsultationLead[] = [
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

export const DEFAULT_CIRCULAR_STAGES: CircularStage[] = [
  {
    id: 'maggot',
    name: 'Maggot BSF',
    emoji: '🐛',
    description: 'Lalat Tentara Hitam (Black Soldier Fly) mengurai limbah sisa melon dan sisa ayam.',
    input: 'Limbah Sisa Buah & Lahan',
    output: 'Pakan Tinggi Protein (42%) & Bio-Pupuk',
    efficiency: 'Mengurangi limbah organik hingga 90%',
    details: 'Larva BSF sangat efisien mengurai residu organik dari tanaman melon dan kotoran peternakan. Menghasilkan pakan berkualitas tinggi dengan jejak karbon terendah.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600'
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
