import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GlobalMotion({ page }) {
  useEffect(() => {
    let timer
    const ctx = gsap.context(() => {
      timer = window.setTimeout(() => {
        gsap.utils.toArray('.motion-section').forEach((section) => {
          const items = section.querySelectorAll('.motion-item')
          if (!items.length) return

          const rect = section.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.86) {
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: 38, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                stagger: 0.07,
                ease: 'power3.out',
                overwrite: 'auto',
              },
            )
          } else {
            gsap.fromTo(
              items,
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
                  start: 'top 85%',
                  once: true,
                },
              },
            )
          }
        })

        gsap.utils.toArray('.service-card, .product-card, .team-slot').forEach((card) => {
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.88) {
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                ease: 'power3.out',
                overwrite: 'auto',
              },
            )
          } else {
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
                  start: 'top 88%',
                  once: true,
                },
              },
            )
          }
        })

        ScrollTrigger.refresh()
      }, 60)
    })

    return () => {
      window.clearTimeout(timer)
      ctx.revert()
    }
  }, [page])

  return null
}
