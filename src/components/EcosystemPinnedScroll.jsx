import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ecosystemSteps } from '../data/content.js'

gsap.registerPlugin(ScrollTrigger)

export default function EcosystemPinnedScroll() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)').matches
    if (!desktop || !sectionRef.current || !pinRef.current) return undefined

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.ecosystem-story-scene')
      const panels = gsap.utils.toArray('.story-panel-copy')
      const clamp = gsap.utils.clamp(0, 1)
      const smooth = gsap.parseEase('power2.inOut')

      const renderProgress = (progressValue) => {
        const exact = progressValue * (ecosystemSteps.length - 1)
        const next = Math.min(ecosystemSteps.length - 1, Math.round(exact))
        setActive((current) => (current === next ? current : next))

        scenes.forEach((scene, index) => {
          const distance = index - exact
          const abs = Math.abs(distance)
          const visible = smooth(clamp(1 - abs))
          gsap.set(scene, {
            autoAlpha: visible,
            xPercent: distance * 9,
            scale: 1.13 - visible * 0.13,
            zIndex: 20 - Math.round(abs * 5),
          })
          gsap.set(panels[index], {
            autoAlpha: visible,
            y: distance * 34,
            x: distance * 18,
            pointerEvents: abs < 0.45 ? 'auto' : 'none',
          })
        })
      }

      renderProgress(0)

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () =>
          `+=${window.innerHeight * (ecosystemSteps.length - 1) * 1.15}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => renderProgress(self.progress),
        onRefresh: (self) => renderProgress(self.progress),
      })

      scrollTriggerRef.current = trigger
      window.setTimeout(() => ScrollTrigger.refresh(), 180)
    }, sectionRef)

    return () => {
      scrollTriggerRef.current = null
      ctx.revert()
    }
  }, [])

  const goToStep = (index) => {
    setActive(index)
    const trigger = scrollTriggerRef.current
    if (!trigger) return
    const target =
      trigger.start +
      (trigger.end - trigger.start) * (index / (ecosystemSteps.length - 1))
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <section className="ecosystem-story-pin" id="tentang" ref={sectionRef}>
      <div className="ecosystem-story section-shell" ref={pinRef}>
        <aside className="ecosystem-rail">
          <p>Cerita Ekosistem</p>
          <div className="ecosystem-rail-line" aria-hidden="true" />
          <div className="ecosystem-step-nav" aria-label="Tahapan ekosistem">
            {ecosystemSteps.map((item, index) => (
              <button
                className={active === index ? 'is-active' : ''}
                key={item.title}
                onClick={() => goToStep(index)}
                type="button"
              >
                <span className="ecosystem-step-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="ecosystem-step-label">{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="ecosystem-visual" aria-live="polite">
          <div className="ecosystem-story-scenes">
            {ecosystemSteps.map((item, index) => (
              <article
                key={item.title}
                className={`ecosystem-story-scene ${active === index ? 'is-active' : ''}`}
                aria-hidden={active !== index}
              >
                <img src={item.image} alt={item.title} />
              </article>
            ))}
          </div>
          <div className="ecosystem-arc" aria-hidden="true" />
          <div className="ecosystem-nodes" aria-hidden="true">
            {ecosystemSteps.map((item, index) => {
              const Icon = item.Icon
              return (
                <div
                  className={`ecosystem-node ${active === index ? 'is-active' : ''}`}
                  key={item.title}
                  style={{ '--node-x': item.nodePosition.x, '--node-y': item.nodePosition.y }}
                >
                  <Icon size={22} weight="regular" />
                  <span>{String(index + 1).padStart(2, '0')}<b>{item.title}</b></span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="ecosystem-story-panel">
          <div className="ecosystem-story-panel-stack">
            {ecosystemSteps.map((item, index) => {
              return (
                <div
                  className="story-panel-copy"
                  key={item.title}
                  aria-hidden={active !== index}
                >
                  <span>{item.eyebrow}</span>
                  <div className="story-panel-rule" />
                  <h2>{item.headline}</h2>
                  <p>{item.description}</p>
                  <small>Scroll untuk mengikuti siklus <i>↓</i></small>
                </div>
              )
            })}
          </div>
        </div>

        <div className="ecosystem-mobile-steps">
          <p className="ecosystem-mobile-title">Cerita Ekosistem</p>
          {ecosystemSteps.map((item, index) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.eyebrow}</span>
                <h3>{item.headline}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
