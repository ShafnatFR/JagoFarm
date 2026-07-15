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
import floatingFeed from '../assets/floating-feed.png'
import floatingIot from '../assets/floating-iot.png'
import floatingLeaves from '../assets/floating-leaves.png'
import floatingMaggot from '../assets/floating-maggot.png'
import floatingMelon from '../assets/floating-melon.png'
import floatingWaterSensor from '../assets/floating-water-sensor.png'

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
}

export const ecosystemSteps = [
  {
    title: 'Panen',
    eyebrow: '01 / 06',
    headline: 'Panen yang baik, memulai siklus yang lebih bijak.',
    description: 'Hasil kebun dipanen pada waktunya. Sisa organik yang masih bernilai tidak berhenti sebagai limbah, tetapi menjadi awal bagi putaran berikutnya.',
    image: heroImage,
    Icon: Plant,
    nodePosition: { x: '26%', y: '25%' },
  },
  {
    title: 'Maggot',
    eyebrow: '02 / 06',
    headline: 'Dari sisa panen, lahir energi baru.',
    description: 'Maggot mengubah limbah organik menjadi sumber protein bernilai. Proses kecil ini menekan sisa, sekaligus menyiapkan pakan alami untuk peternakan.',
    image: ecoMaggot,
    Icon: Sparkle,
    nodePosition: { x: '58%', y: '56%' },
  },
  {
    title: 'Ikan',
    eyebrow: '03 / 06',
    headline: 'Nutrisi alami mengalir ke setiap kolam.',
    description: 'Protein dari maggot menjadi pakan yang lebih efisien untuk ikan. Kolam yang terjaga membentuk satu simpul penting dalam ekosistem JagoFarm.',
    image: ecoFeed,
    Icon: Fish,
    nodePosition: { x: '29%', y: '77%' },
  },
  {
    title: 'Ayam',
    eyebrow: '04 / 06',
    headline: 'Pakan bersih, ternak tumbuh lebih baik.',
    description: 'Ayam mendapat asupan alami dari siklus yang sama. Hasilnya adalah peternakan yang lebih efisien, sehat, dan dekat dengan sumber dayanya.',
    image: ecoWater,
    Icon: Egg,
    nodePosition: { x: '72%', y: '65%' },
  },
  {
    title: 'Kompos',
    eyebrow: '05 / 06',
    headline: 'Yang tersisa kembali memberi kehidupan.',
    description: 'Sisa dari kebun dan peternakan diolah menjadi kompos. Nutrisi dikembalikan ke tanah, bukan dibuang keluar dari sistem.',
    image: ecoWaste,
    Icon: Recycle,
    nodePosition: { x: '67%', y: '82%' },
  },
  {
    title: 'Tanaman',
    eyebrow: '06 / 06',
    headline: 'Tanah subur, panen berikutnya dimulai.',
    description: 'Kompos menyuburkan tanaman baru. Dengan pemantauan yang tepat, siklus terus berjalan—lebih produktif dan hampir tanpa limbah.',
    image: ecoFertilizer,
    Icon: Leaf,
    nodePosition: { x: '78%', y: '31%' },
  },
]

export const benefits = ['Hemat Biaya', 'Ramah Lingkungan', 'Produktivitas Tinggi', 'Kualitas Terjaga']

export const ecosystemFloaters = [
  { image: floatingMelon, label: 'Melon', className: 'is-melon' },
  { image: floatingLeaves, label: 'Daun hijau', className: 'is-leaves' },
  { image: floatingWaterSensor, label: 'Sensor air', className: 'is-water' },
  { image: floatingMaggot, label: 'Maggot', className: 'is-maggot' },
  { image: floatingFeed, label: 'Pakan', className: 'is-feed' },
  { image: floatingIot, label: 'Sensor IoT', className: 'is-iot' },
]

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
