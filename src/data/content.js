import {
  ArrowRight,
  ChartLineUp,
  CheckCircle,
  CirclesThreePlus,
  Cpu,
  Drop,
  Egg,
  Fish,
  Leaf,
  MagnifyingGlass,
  PhoneCall,
  Plant,
  Recycle,
  ShieldCheck,
  Sparkle,
  ThermometerSimple,
  Waves,
  WifiHigh,
} from '@phosphor-icons/react'

import heroImage from '../assets/hero-ecosystem.webp'
import ecoWaste from '../assets/eco-waste.webp'
import ecoMaggot from '../assets/eco-maggot.webp'
import ecoFeed from '../assets/eco-feed.webp'
import ecoWater from '../assets/eco-water.webp'
import ecoFertilizer from '../assets/eco-fertilizer.webp'
import ecoSmart from '../assets/eco-smart.webp'
import productMelon from '../assets/product-melon.webp'
import productGreens from '../assets/product-greens.webp'
import productEggs from '../assets/product-eggs.webp'
import productOrnamental from '../assets/product-ornamental.webp'
import productCatfish from '../assets/product-catfish.webp'
import productGurame from '../assets/product-gurame.webp'
import productIot from '../assets/product-iot.webp'

export const icons = {
  ArrowRight,
  CheckCircle,
  MagnifyingGlass,
  PhoneCall,
}

export const hero = {
  image: heroImage,
  badges: [
    ['Zero-Waste', Recycle],
    ['AI & IoT Enabled', Cpu],
    ['Hasil Berkualitas', ShieldCheck],
  ],
  metrics: [
    ['500+', 'Petani & Mitra', Leaf],
    ['1.2M L', 'Air Didaur Ulang / Hari', Drop],
    ['30%+', 'Peningkatan Produksi', ChartLineUp],
    ['Zero', 'Limbah ke Alam', Recycle],
  ],
  callouts: [
    ['IoT Sensor', 'pH 6.8 | DO 5.2'],
    ['Smart Greenhouse', 'Suhu 28°C | RH 65%'],
    ['AI Monitoring', 'Prediksi panen 98%'],
  ],
}

export const ecosystemSteps = [
  {
    title: 'Pengumpulan Limbah Organik',
    description: 'Sisa panen, sayuran, dan limbah organik dikumpulkan sebagai bahan awal dalam ekosistem sirkular.',
    image: ecoWaste,
    Icon: Recycle,
  },
  {
    title: 'Budidaya Maggot Protein Tinggi',
    description: 'Limbah organik dimanfaatkan untuk budidaya maggot sebagai sumber protein alternatif bernilai tinggi.',
    image: ecoMaggot,
    Icon: Sparkle,
  },
  {
    title: 'Pemberian Pakan Ikan & Ayam',
    description: 'Maggot digunakan sebagai pakan alami untuk ikan dan ayam guna meningkatkan efisiensi biaya dan kualitas nutrisi.',
    image: ecoFeed,
    Icon: Egg,
  },
  {
    title: 'Integrasi Air Kolam Sirkular',
    description: 'Air dari kolam dimanfaatkan kembali untuk mendukung sistem pertanian yang lebih hemat sumber daya.',
    image: ecoWater,
    Icon: Waves,
  },
  {
    title: 'Pupuk Cair Alami untuk Buah',
    description: 'Hasil samping organik dan nutrisi cair dimanfaatkan sebagai pupuk alami untuk tanaman buah dan sayuran.',
    image: ecoFertilizer,
    Icon: Plant,
  },
  {
    title: 'Smart Farming & Zero Waste',
    description: 'Seluruh siklus dipantau dengan AI & IoT untuk memastikan produksi lebih efisien, terukur, dan minim limbah.',
    image: ecoSmart,
    Icon: Cpu,
  },
]

export const benefits = ['Hemat Biaya', 'Ramah Lingkungan', 'Produktivitas Tinggi', 'Kualitas Terjaga']

export const services = [
  {
    title: 'Smart Farming',
    description: 'Sistem pertanian presisi berbasis data untuk meningkatkan hasil dan efisiensi sumber daya.',
    image: ecoSmart,
    Icon: Plant,
  },
  {
    title: 'Smart Livestock',
    description: 'Manajemen peternakan modern untuk kesehatan hewan dan produktivitas optimal.',
    image: productEggs,
    Icon: Egg,
  },
  {
    title: 'IoT Monitoring',
    description: 'Pantau kondisi lingkungan secara real-time dari mana saja dengan sensor IoT kami.',
    image: productIot,
    Icon: WifiHigh,
  },
  {
    title: 'AI & Data Analytics',
    description: 'Analisis data dan prediksi cerdas untuk keputusan yang lebih tepat dan profitabilitas tinggi.',
    image: heroImage,
    Icon: ChartLineUp,
  },
]

export const featuredProducts = [
  {
    key: 'melon',
    title: 'Melon',
    category: 'Tanaman',
    image: productMelon,
    description: 'Melon premium dari greenhouse terpantau dengan sensor suhu, kelembapan, cahaya, dan prediksi panen.',
    stats: [
      ['28°C', 'Suhu ideal', ThermometerSimple],
      ['65%', 'Kelembapan', Drop],
      ['12 jam', 'Cahaya', Sparkle],
      ['98%', 'Prediksi panen', ChartLineUp],
    ],
  },
  {
    key: 'sayuran',
    title: 'Sayuran',
    category: 'Tanaman',
    image: productGreens,
    description: 'Sayuran hijau diproduksi dengan pengaturan kelembapan, air, dan nutrisi yang lebih konsisten.',
    stats: [
      ['Real-time', 'Monitoring', Cpu],
      ['Efisien', 'Air', Drop],
      ['Stabil', 'Kualitas', ShieldCheck],
      ['Harian', 'Panen', Leaf],
    ],
  },
  {
    key: 'ikan',
    title: 'Ikan',
    category: 'Hewan',
    image: productGurame,
    description: 'Budidaya ikan didukung pemantauan kualitas air dan alur sirkular untuk menjaga pertumbuhan.',
    stats: [
      ['pH', 'Terpantau', Waves],
      ['DO', 'Oksigen', Drop],
      ['Suhu', 'Kolam', ThermometerSimple],
      ['Sehat', 'Stok', ShieldCheck],
    ],
  },
  {
    key: 'ayam',
    title: 'Ayam Petelur',
    category: 'Hewan',
    image: productEggs,
    description: 'Kandang ayam petelur dipantau untuk menjaga pakan, suhu, dan produktivitas harian.',
    stats: [
      ['Pakan', 'Terukur', CirclesThreePlus],
      ['Suhu', 'Kandang', ThermometerSimple],
      ['Telur', 'Produktif', Egg],
      ['Sehat', 'Ayam', ShieldCheck],
    ],
  },
  {
    key: 'iot',
    title: 'Perangkat IoT',
    category: 'Perangkat',
    image: productIot,
    description: 'Sensor lapangan membaca kondisi farm secara real-time untuk membantu keputusan cepat.',
    stats: [
      ['Sensor', 'Real-time', Cpu],
      ['Alert', 'Otomatis', WifiHigh],
      ['Data', 'Terukur', ChartLineUp],
      ['Mudah', 'Dipantau', ShieldCheck],
    ],
  },
]

export const productCatalog = [
  {
    name: 'Melon Premium',
    category: 'Tanaman',
    price: 'Rp 35.000 / kg',
    rating: '4.8 (120)',
    image: productMelon,
  },
  {
    name: 'Sayuran Hijau',
    category: 'Tanaman',
    price: 'Rp 12.000 / pack',
    rating: '4.7 (98)',
    image: productGreens,
  },
  {
    name: 'Ayam Petelur',
    category: 'Hewan',
    price: 'Rp 28.000 / ekor',
    rating: '4.6 (150)',
    image: productEggs,
  },
  {
    name: 'Ikan Hias',
    category: 'Hewan',
    price: 'Rp 8.000 / ekor',
    rating: '4.5 (86)',
    image: productOrnamental,
  },
  {
    name: 'Lele Segar',
    category: 'Hewan',
    price: 'Rp 16.000 / kg',
    rating: '4.6 (110)',
    image: productCatfish,
  },
  {
    name: 'Ikan Gurame',
    category: 'Hewan',
    price: 'Rp 22.000 / kg',
    rating: '4.7 (75)',
    image: productGurame,
  },
  {
    name: 'Perangkat IoT',
    category: 'Perangkat',
    price: 'Rp 1.250.000 / unit',
    rating: '4.9 (34)',
    image: productIot,
  },
]
