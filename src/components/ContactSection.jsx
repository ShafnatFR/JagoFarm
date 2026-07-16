import { EnvelopeSimple, MapPin, PhoneCall } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { submitInquiry } from '../lib/cms.js'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  ['WhatsApp', '+62 852-1537-6975', PhoneCall],
  ['Email', 'jagofarm.corporation@gmail.com', EnvelopeSimple],
  ['Alamat', '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257', MapPin],
]

export default function ContactSection({ onNavigate, data = {} }) {
  const sectionRef = useRef(null)
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

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.contact-copy > *, .contact-card', {
        opacity: 0,
        y: 26,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: root,
          start: 'top 72%',
          once: true,
        },
      })

    }, root)

    return () => ctx.revert()
  }, [])

  return (
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
      </div>
    </section>
  )
}
