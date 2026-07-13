import { CalendarCheck, EnvelopeSimple, MapPin, PhoneCall, Plant, ShieldCheck } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  ['Telepon / WhatsApp', '+62 812-3456-7890', PhoneCall],
  ['Email', 'info@jagofarm.id', EnvelopeSimple],
  ['Alamat', 'Jl. Hijau No. 88, Sukamaju, Bogor', MapPin],
]

export default function ContactSection({ onNavigate }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.contact-copy > *, .contact-card, .contact-visual', {
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

      gsap.to(root, {
        '--contact-shift': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      })

      gsap.fromTo(
        '.contact-phone-orbit',
        { opacity: 0, y: -140, scale: 0.38 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 62%',
            end: 'top 28%',
            scrub: 0.8,
          },
        },
      )
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
        <div className="contact-actions">
          <a className="button button-primary" href="tel:+6281234567890">
            <PhoneCall size={14} weight="bold" />
            Hubungi Kami
          </a>
          <button className="button button-secondary" onClick={() => onNavigate('/katalog')} type="button">
            <CalendarCheck size={16} weight="bold" />
            Jadwalkan Konsultasi
          </button>
        </div>
        <div className="contact-promises">
          <span><Plant size={18} weight="duotone" /> Respons cepat</span>
          <span><CalendarCheck size={18} weight="duotone" /> Solusi terintegrasi</span>
          <span><ShieldCheck size={18} weight="duotone" /> Aman & terpercaya</span>
        </div>
      </div>

      <div className="contact-card">
        <span>Hubungi kami melalui</span>
        {contacts.map(([label, value, Icon]) => (
          <a href={label === 'Email' ? 'mailto:info@jagofarm.id' : label.startsWith('Telepon') ? 'tel:+6281234567890' : '#hubungi-kami'} key={label}>
            <Icon size={22} weight="duotone" />
            <span>
              <small>{label}</small>
              {value}
            </span>
          </a>
        ))}
      </div>

      <div className="contact-visual" aria-hidden="true">
        <div className="contact-phone-orbit">
          <PhoneCall size={48} weight="bold" />
        </div>
        <div className="contact-seedling">
          <Plant size={54} weight="duotone" />
        </div>
      </div>
    </section>
  )
}
