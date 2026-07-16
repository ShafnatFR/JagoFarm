import { EnvelopeSimple, MapPin, PhoneCall } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  ['WhatsApp', '+62 852-1537-6975', PhoneCall],
  ['Email', 'jagofarm.corporation@gmail.com', EnvelopeSimple],
  ['Alamat', '2JGM+M3F, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257', MapPin],
]

export default function ContactSection({ onNavigate }) {
  const sectionRef = useRef(null)

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
        <span>Hubungi Kami</span>
        <h2>Mari bertumbuh bersama <strong>JagoFarm.</strong></h2>
        <p>
          Kami terbuka untuk kolaborasi, konsultasi, dan peluang kemitraan
          ekosistem pangan presisi.
        </p>
      </div>

      <div className="contact-grid">
        {contacts.map(([label, value, Icon]) => (
          <a className="contact-card" href={label === 'Email' ? 'mailto:jagofarm.corporation@gmail.com' : label === 'WhatsApp' ? 'https://wa.me/6285215376975' : 'https://maps.google.com/?q=2JGM%2BM3F%2C+Sukapura%2C+Dayeuhkolot%2C+Bandung'} target={label === 'Alamat' ? '_blank' : undefined} rel={label === 'Alamat' ? 'noreferrer' : undefined} key={label}>
            <Icon size={22} weight="duotone" />
            <span>
              <small>{label}</small>
              {value}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
