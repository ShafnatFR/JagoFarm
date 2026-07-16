<<<<<<< HEAD
import { 
  ArrowRight, 
  CalendarCheck, 
  ChatCircleDots, 
  CheckCircle, 
  CaretDown,
  EnvelopeSimple, 
  Headset, 
  MapPin, 
  PaperPlaneTilt, 
  PhoneCall, 
  Plant, 
  ShieldCheck, 
  Sparkle, 
  User 
} from '@phosphor-icons/react'
=======
import { EnvelopeSimple, MapPin, PhoneCall } from '@phosphor-icons/react'
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { submitInquiry } from '../lib/cms.js'

gsap.registerPlugin(ScrollTrigger)

<<<<<<< HEAD
const subjectOptions = [
  'Konsultasi IoT & Smart Farming',
  'Kemitraan Peternak & Petani',
  'Investasi & Bisnis',
  'Pengadaan Produk Pangan',
  'Lainnya'
]

const faqItems = [
  {
    question: 'Bagaimana alur kolaborasi smart farming dengan JagoFarm?',
    answer: 'Kami memulai dengan survei dan analisis kebutuhan lahan/kandang Anda, dilanjutkan dengan rekomendasi dan instalasi perangkat IoT presisi, serta pemantauan data berbasis AI yang didampingi langsung oleh tim agronom dan teknisi kami.'
  },
  {
    question: 'Apakah perangkat IoT JagoFarm dapat diintegrasikan dengan sistem existing?',
    answer: 'Ya, platform dan sensor IoT kami dirancang secara modular menggunakan protokol standar industri (MQTT dan REST API), sehingga dapat dengan mudah disambungkan dengan infrastruktur dan dasbor yang sudah Anda miliki.'
  },
  {
    question: 'Apakah JagoFarm melayani instalasi di luar wilayah Bandung & Jawa Barat?',
    answer: 'Tentu. Tim teknis dan spesialis kami melayani konsultasi, instalasi perangkat, dan pendampingan implementasi smart farming ke seluruh wilayah Indonesia dengan dukungan monitoring jarak jauh.'
  },
  {
    question: 'Berapa lama estimasi respons untuk pengajuan proposal atau inquiry?',
    answer: 'Setiap inquiry dan proposal yang masuk melalui formulir kontak atau email resmi kami akan ditinjau oleh tim pengembangan bisnis dan direspons dalam waktu maksimal 24 jam pada hari kerja.'
  }
=======
const contacts = [
  ['WhatsApp', '+62 852-1537-6975', PhoneCall],
  ['Email', 'jagofarm.corporation@gmail.com', EnvelopeSimple],
  ['Alamat', '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257', MapPin],
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
]

export default function ContactSection({ onNavigate, data = {} }) {
  const sectionRef = useRef(null)
<<<<<<< HEAD
  
  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: subjectOptions[0],
    pesan: ''
  })
  const [formState, setFormState] = useState('idle') // 'idle' | 'sending' | 'submitted'
  const [activeFaq, setActiveFaq] = useState(0)
=======
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactItems = [
    ...(Array.isArray(data.phone_numbers) ? data.phone_numbers.map((value) => ['Telepon', value, PhoneCall]) : []),
    ...(Array.isArray(data.emails) ? data.emails.map((value) => ['Email', value, EnvelopeSimple]) : []),
    ...(Array.isArray(data.addresses) ? data.addresses.map((value) => ['Alamat', value, MapPin]) : []),
  ]
  const contactHref = (label, value) => label === 'Email' ? `mailto:${value}` : label === 'Alamat' ? (data.map_location_url || `https://maps.google.com/?q=${encodeURIComponent(value)}`) : `tel:${value}`

  const submit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    try {
      const result = await submitInquiry(form)
      setForm({ name: '', email: '', subject: '', message: '' })
      setStatus(`${result?.message || 'Pesan berhasil dikirim.'}${result?.id ? ` ID: ${result.id}` : ''}`)
    } catch (error) {
      setStatus(error.status === 429 ? 'Batas pengiriman pesan tercapai. Silakan coba lagi dalam beberapa menit.' : 'Pesan gagal dikirim. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
<<<<<<< HEAD
      // Stagger entrance for header & bento cards
      gsap.from('.contact-hero-content > *, .contact-bento-card', {
=======
      gsap.from('.contact-copy > *, .contact-card', {
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      })

<<<<<<< HEAD
      // Animate form and sidebar cards
      gsap.from('.contact-main-grid > *', {
        opacity: 0,
        y: 40,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-main-grid',
          start: 'top 85%',
          once: true,
        },
      })
=======
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
    }, root)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('sending')
    // Simulate interactive sending
    window.setTimeout(() => {
      setFormState('submitted')
    }, 1200)
  }

  const scrollToFooterMap = () => {
    const mapEl = document.getElementById('peta-lokasi')
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      onNavigate('#kontak')
    }
  }

  return (
<<<<<<< HEAD
    <section className="contact-section page-shell" id="hubungi-kami" ref={sectionRef}>
      {/* 1. Header Hero */}
      <div className="contact-hero-content">
        <span className="section-badge motion-item">
          <Sparkle size={18} weight="fill" />
          Hubungi & Kemitraan JagoFarm
        </span>
        <h2>
          Mari Bertumbuh Bersama <strong className="highlight-text">JagoFarm.</strong>
        </h2>
        <p className="contact-hero-subtitle">
          Kami terbuka untuk kolaborasi strategis, konsultasi penerapan smart farming berbasis AI & IoT, serta peluang kemitraan ekosistem pangan presisi di seluruh Indonesia.
        </p>
        <div className="contact-trust-badges">
          <span className="trust-badge">
            <CheckCircle size={18} weight="fill" /> Respons Cepat &lt; 24 Jam
          </span>
          <span className="trust-badge">
            <CheckCircle size={18} weight="fill" /> Solusi IoT Terintegrasi
          </span>
          <span className="trust-badge">
            <CheckCircle size={18} weight="fill" /> Kemitraan Sirkular Terpercaya
          </span>
        </div>
      </div>

      {/* 2. Top Bento Contact Info Cards */}
      <div className="contact-bento-grid">
        {/* Card 1: WhatsApp */}
        <article className="contact-bento-card card-wa">
          <div className="bento-card-header">
            <div className="bento-icon-wrapper wa-glow">
              <PhoneCall size={28} weight="duotone" />
            </div>
            <span className="bento-tag">WhatsApp / Telepon</span>
          </div>
          <h3>+62 852-1537-6975</h3>
          <p>Layanan konsultasi langsung bersama teknisi & tim spesialis JagoFarm setiap hari kerja.</p>
          <a
            href="https://wa.me/6285215376975"
            target="_blank"
            rel="noreferrer"
            className="bento-action-btn btn-wa"
          >
            Chat via WhatsApp <ArrowRight size={16} weight="bold" />
          </a>
        </article>

        {/* Card 2: Email */}
        <article className="contact-bento-card card-email">
          <div className="bento-card-header">
            <div className="bento-icon-wrapper email-glow">
              <EnvelopeSimple size={28} weight="duotone" />
            </div>
            <span className="bento-tag">Email Corporation</span>
          </div>
          <h3 className="email-text">jagofarm.corporation@gmail.com</h3>
          <p>Untuk pengajuan proposal kemitraan, investasi, kerjasama akademis, dan pengadaan institusi.</p>
          <a
            href="mailto:jagofarm.corporation@gmail.com"
            className="bento-action-btn btn-email"
          >
            Kirim Email Resmi <ArrowRight size={16} weight="bold" />
          </a>
        </article>

        {/* Card 3: Address */}
        <article className="contact-bento-card card-address">
          <div className="bento-card-header">
            <div className="bento-icon-wrapper address-glow">
              <MapPin size={28} weight="duotone" />
            </div>
            <span className="bento-tag">Alamat & Pusat Riset</span>
          </div>
          <h3 className="address-text">
            2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
          </h3>
          <p>Fasilitas penelitian smart farming, laboratorium akuaponik, dan pengembangan sensor IoT.</p>
          <button
            onClick={scrollToFooterMap}
            type="button"
            className="bento-action-btn btn-address"
          >
            Lihat Embed Peta di Footer <ArrowRight size={16} weight="bold" />
          </button>
        </article>
      </div>

      {/* 3. Main Grid: Form & Sidebar FAQ */}
      <div className="contact-main-grid">
        {/* Left: Interactive Form */}
        <div className="contact-form-card">
          {formState !== 'submitted' ? (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-header">
                <h3>Kirim Pesan atau Inquiry Langsung</h3>
                <p>Isi data diri dan kebutuhan Anda, tim agronom dan teknis kami siap membantu.</p>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="nama">Nama Lengkap / Instansi</label>
                  <div className="input-with-icon">
                    <User size={20} weight="duotone" />
                    <input
                      type="text"
                      id="nama"
                      required
                      placeholder="Masukkan nama Anda..."
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Alamat Email Aktif</label>
                  <div className="input-with-icon">
                    <EnvelopeSimple size={20} weight="duotone" />
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="contoh@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Kategori Inquiry / Topik Konsultasi</label>
                <div className="subject-pills">
                  {subjectOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`subject-pill ${formData.subjek === opt ? 'is-active' : ''}`}
                      onClick={() => setFormData({ ...formData, subjek: opt })}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pesan">Detail Pesan atau Pertanyaan</label>
                <textarea
                  id="pesan"
                  rows={4}
                  required
                  placeholder="Jelaskan kebutuhan lahan, kendala produksi, atau ide kolaborasi yang ingin Anda kembangkan bersama JagoFarm..."
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="button-submit-glow"
                disabled={formState === 'sending'}
              >
                {formState === 'sending' ? (
                  <>
                    <span className="spinner" />
                    Mengirim Pesan...
                  </>
                ) : (
                  <>
                    <span>Kirim Pesan Sekarang</span>
                    <PaperPlaneTilt size={18} weight="bold" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="form-success-card">
              <div className="success-icon-wrapper">
                <CheckCircle size={64} weight="fill" />
              </div>
              <h3>Pesan Berhasil Terkirim!</h3>
              <p>
                Terima kasih, <strong>{formData.nama || 'Mitra JagoFarm'}</strong>. Kami telah menerima pesan Anda mengenai topik <strong>{formData.subjek}</strong>. Tim spesialis kami akan segera meninjau dan merespons melalui email (<strong>{formData.email}</strong>) atau WhatsApp dalam waktu kurang dari 24 jam.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => {
                    setFormData({ nama: '', email: '', subjek: subjectOptions[0], pesan: '' })
                    setFormState('idle')
                  }}
                >
                  Kirim Pesan Lainnya
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => onNavigate('#solusi')}
                >
                  Lihat Solusi IoT Kami
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Instant Support & FAQ Accordion */}
        <div className="contact-sidebar-grid">
          {/* Highlight Support Box */}
          <div className="contact-highlight-box">
            <div className="highlight-header">
              <div className="highlight-icon">
                <Headset size={28} weight="duotone" />
              </div>
              <div>
                <h4>Layanan Bantuan & Konsultasi Langsung</h4>
                <p>Butuh respons cepat atau konsultasi teknis darurat untuk sensor IoT Anda?</p>
              </div>
            </div>
            <a
              href="https://wa.me/6285215376975"
              target="_blank"
              rel="noreferrer"
              className="button button-primary w-full"
            >
              <ChatCircleDots size={18} weight="bold" />
              Hubungi Support WhatsApp
            </a>
          </div>

          {/* FAQ Box */}
          <div className="contact-faq-box">
            <div className="faq-box-header">
              <h3>Pertanyaan Umum (FAQ)</h3>
              <p>Jawaban cepat untuk hal-hal yang sering ditanyakan mengenai kolaborasi dengan JagoFarm.</p>
            </div>
            <div className="faq-accordion">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index
                return (
                  <div
                    key={index}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <CaretDown size={18} weight="bold" className="faq-caret" />
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
=======
    <section className="contact-cta section-shell" id="hubungi-kami" ref={sectionRef}>
      <div className="contact-copy">
        <span>{data.title || 'Hubungi Kami'}</span>
        <h2>{data.headline || 'Mari bertumbuh bersama'} <strong>JagoFarm.</strong></h2>
        <p>
          Kami terbuka untuk kolaborasi, konsultasi, dan peluang kemitraan
          ekosistem pangan presisi.
        </p>
      </div>

      <div className="contact-grid">
        {(contactItems.length ? contactItems : contacts).map(([label, value, Icon]) => (
          <a className="contact-card" href={contactHref(label, value)} target={label === 'Alamat' ? '_blank' : undefined} rel={label === 'Alamat' ? 'noreferrer' : undefined} key={`${label}-${value}`}>
            <Icon size={22} weight="duotone" />
            <span>
              <small>{label}</small>
              {value}
            </span>
          </a>
        ))}
        <form className="contact-form" onSubmit={submit}>
          <input required disabled={isSubmitting} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nama" aria-label="Nama" />
          <input required type="email" disabled={isSubmitting} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" aria-label="Email" />
          <input disabled={isSubmitting} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Subjek" aria-label="Subjek" />
          <textarea required disabled={isSubmitting} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Pesan" aria-label="Pesan" />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Mengirim…' : 'Kirim pesan'}</button>
          {status && <p role="status">{status}</p>}
        </form>
>>>>>>> 5683a208fbcd256a22c0b946bf1f99fc830ed48a
      </div>
    </section>
  )
}
