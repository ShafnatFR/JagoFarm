import {
  ArrowRight,
  ChartLineUp,
  Cpu,
  Drop,
  GithubLogo,
  Handshake,
  Heart,
  InstagramLogo,
  Leaf,
  Lightbulb,
  LinkedinLogo,
  PhoneCall,
  Recycle,
  ShieldCheck,
  Sparkle,
  TreeStructure,
} from '@phosphor-icons/react'

import ecoSmart from '../assets/eco-smart.webp'
import ecoFeed from '../assets/eco-feed.webp'
import ecoWater from '../assets/eco-water.webp'
import ecoMaggot from '../assets/eco-maggot.webp'
import ecoWaste from '../assets/eco-waste.webp'
import heroDay from '../assets/hero-farm-day.png'
import andiCard from '../assets/new-id-card-kolab.png'
import shafnatCard from '../assets/new-id-card-kolab-shafnat.png'

export const aboutHeroText = {
  title: 'Tim kecil yang sedang membangun ekosistem pangan sirkular.',
  description:
    'Kami memadukan budidaya peternakan, perikanan, pertanian, dan pengolahan limbah organik dalam satu rantai ekosistem tertutup berbasis AI dan IoT. Kami percaya bahwa ketahanan pangan masa depan lahir dari kolaborasi teknologi dan sirkularitas alam.',
}

export const storyTimeline = [
  {
    year: '2023',
    title: 'Awal Mula & Riset Sirkularitas',
    description:
      'Berawal dari kepedulian terhadap tingginya limbah organik dan biaya pakan konvensional, tim kecil Jago Farm mulai merancang konsep pertanian terintegrasi (Integrated Farming) yang mengolah limbah dapur menjadi pakan berprotein tinggi lewat lalat Black Soldier Fly (BSF).',
    badge: 'Riset & Konsep',
    Icon: Lightbulb,
  },
  {
    year: '2024',
    title: 'Implementasi IoT & Akuaponik Cerdas',
    description:
      'Kami mengembangkan sistem pemantauan kualitas air otomatis pada kolam ikan (Lele & Gurame) yang dihubungkan langsung dengan irigasi kebun melon dan sayuran organik. Nutrisi air kolam dimanfaatkan penuh sebagai pupuk alami yang kaya nitrogen.',
    badge: 'Inovasi Teknologi',
    Icon: Cpu,
  },
  {
    year: '2025 - Sekarang',
    title: 'Ekspansi Mitra & Ko-Lab Ecosystem',
    description:
      'Jago Farm tumbuh menjadi ekosistem yang menggandeng ratusan peternak dan petani lokal. Melalui platform pemantauan digital dan sistem daur ulang terpadu, kami menargetkan Zero-Waste Production di seluruh fasad produksi pangan.',
    badge: 'Skala & Dampak',
    Icon: TreeStructure,
  },
]

export const coreValues = [
  {
    title: 'Sirkularitas Total (Zero-Waste)',
    description:
      'Setiap limbah dari satu proses adalah nutrisi bagi proses berikutnya. Dari sisa sayuran, maggot, pakan ikan, air kolam, hingga tanaman buah.',
    Icon: Recycle,
    color: '#0c6b3b',
  },
  {
    title: 'Inovasi Berbasis AI & IoT',
    description:
      'Kami tidak sekadar bertani tradisional. Sensor air presisi, pemantauan suhu real-time, dan otomasi irigasi memastikan produktivitas maksimal dan terukur.',
    Icon: Cpu,
    color: '#06552e',
  },
  {
    title: 'Kesejahteraan Petani Lokal',
    description:
      'Kolaborasi adalah kunci utama. Kami memberdayakan peternak dan mitra lokal dengan kepastian pasokan pakan murah berkualitas dan bimbingan teknologi modern.',
    Icon: Handshake,
    color: '#6aa84f',
  },
  {
    title: 'Kualitas & Keamanan Pangan',
    description:
      'Tanpa bahan kimia berbahaya. Pangan yang dihasilkan—baik daging ikan, telur, maupun buah melon premium—terjamin sehat, organik, dan ramah lingkungan.',
    Icon: ShieldCheck,
    color: '#183728',
  },
]

export const teamMembersDetailed = [
  {
    id: 'andi-1',
    name: 'Andi Rayu H.',
    role: 'Founder & CEO',
    bio: 'Penggerak utama visi sirkularitas Jago Farm. Berpengalaman dalam manajemen ekosistem pertanian terpadu dan kemitraan strategis.',
    image: andiCard,
    originX: -0.9,
    socials: {
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    id: 'shafnat-1',
    name: 'Shafnat Fuaini R.',
    role: 'Co-Founder & Lead Engineer',
    bio: 'Arsitek di balik sistem IoT cerdas, sensor kualitas air otomatis, dan otomasi pakan Jago Farm. Fokus pada rekayasa perangkat lunak dan data presisi.',
    image: shafnatCard,
    originX: -0.3,
    socials: {
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    id: 'andi-2',
    name: 'Andi Rayu H.',
    role: 'Agronomy Lead',
    bio: 'Memastikan siklus biokonversi limbah organik oleh maggot BSF berjalan dengan efisiensi konversi optimal untuk pasokan protein ternak dan tanaman.',
    image: andiCard,
    originX: 0.3,
    socials: {
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  },
  {
    id: 'shafnat-2',
    name: 'Shafnat Fuaini R.',
    role: 'Smart Hardware Lead',
    bio: 'Mengembangkan kontroler mikrokontroler tahan cuaca dan algoritma pemantauan PH/DO kolam untuk meminimalisir angka mortalitas ikan secara proaktif.',
    image: shafnatCard,
    originX: 0.9,
    socials: {
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  },
]

export const galleryItems = [
  {
    title: 'Fasilitas Smart Farming & Akuaponik',
    category: 'Infrastruktur Cerdas',
    image: heroDay,
    colSpan: 'span 2',
    rowSpan: 'span 2',
  },
  {
    title: 'Pemantauan Sensor Kualitas Air IoT',
    category: 'Teknologi Presisi',
    image: ecoSmart,
    colSpan: 'span 1',
    rowSpan: 'span 1',
  },
  {
    title: 'Siklus Pakan Organik Berprotein',
    category: 'Bio-Waste BSF',
    image: ecoFeed,
    colSpan: 'span 1',
    rowSpan: 'span 1',
  },
  {
    title: 'Filtrasi Air Alami & Nutrisi Tanaman',
    category: 'Sirkularitas Air',
    image: ecoWater,
    colSpan: 'span 1',
    rowSpan: 'span 1',
  },
  {
    title: 'Biokonversi Limbah Dapur & Maggot',
    category: 'Zero-Waste Cycle',
    image: ecoMaggot,
    colSpan: 'span 2',
    rowSpan: 'span 1',
  },
]
