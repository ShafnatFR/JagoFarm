import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GlobalMotion({ page }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.motion-section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.motion-item'),
          { autoAlpha: 0, y: 44, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('.service-card, .product-card, .team-slot').forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.58,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [page])

  return null
}
