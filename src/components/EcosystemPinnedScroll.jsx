import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { benefits, ecosystemSteps, icons } from '../data/content.js'
import logo from '../assets/jagofarm-logo.svg'

gsap.registerPlugin(ScrollTrigger)

export default function EcosystemPinnedScroll() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const [active, setActive] = useState(0)
  const step = ecosystemSteps[active]
  const ActiveIcon = step.Icon
  const { CheckCircle } = icons
  const progress = useMemo(() => ((active + 1) / ecosystemSteps.length) * 100, [active])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 900px)').matches
    if (reduce || !desktop || !sectionRef.current) return undefined

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${(ecosystemSteps.length - 1) * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(ecosystemSteps.length - 1, Math.round(self.progress * (ecosystemSteps.length - 1)))
          setActive((current) => (current === next ? current : next))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !visualRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, y: 22, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
      )
    }, visualRef)

    return () => ctx.revert()
  }, [active])

  return (
    <section className="ecosystem section-shell" id="tentang" ref={sectionRef}>
      <div className="ecosystem-copy">
        <span className="section-label">Ekosistem Sirkular Jago Farm</span>
        <h2>Lebih Dari Sekadar Peternakan</h2>
        <p>
          Kami menerapkan ekonomi sirkular dengan teknologi AI & IoT untuk menciptakan sistem pertanian dan peternakan yang efisien, produktif, dan tanpa limbah.
        </p>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <span key={benefit}>
              <CheckCircle size={18} weight="fill" />
              {benefit}
            </span>
          ))}
        </div>
        <div className="step-nav" aria-label="Tahapan ekosistem">
          {ecosystemSteps.map((item, index) => (
            <button className={active === index ? 'is-active' : ''} key={item.title} onClick={() => setActive(index)} type="button">
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="ecosystem-stage">
        <div className="cycle-ring" aria-hidden="true">
          <img src={logo} alt="" />
          <span style={{ '--progress': `${progress}%` }} />
        </div>
        <article className="active-step" ref={visualRef}>
          <div className="active-step-image">
            <img src={step.image} alt={step.title} />
          </div>
          <div>
            <span>{String(active + 1).padStart(2, '0')} / {String(ecosystemSteps.length).padStart(2, '0')}</span>
            <h3>
              <ActiveIcon size={32} weight="duotone" />
              {step.title}
            </h3>
            <p>{step.description}</p>
          </div>
        </article>
      </div>

      <div className="mobile-steps">
        {ecosystemSteps.map((item, index) => (
          <article key={item.title}>
            <img src={item.image} alt={item.title} />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
