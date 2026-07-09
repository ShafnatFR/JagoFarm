import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import logo from '../assets/jagofarm-logo.svg'

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(false)
      return undefined
    }

    const mark = ref.current.querySelector('.intro-mark')
    const line = ref.current.querySelectorAll('.intro-line')
    const markAnimation = animate(mark, {
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.94, 1],
      duration: 800,
      ease: 'out(3)',
    })
    const lineAnimation = animate(line, {
      scaleX: [0, 1],
      duration: 860,
      delay: 180,
      ease: 'inOut(3)',
    })
    const timer = window.setTimeout(() => {
      animate(ref.current, {
        opacity: [1, 0],
        duration: 420,
        ease: 'out(2)',
        onComplete: () => setVisible(false),
      })
    }, 1300)

    return () => {
      window.clearTimeout(timer)
      markAnimation.cancel()
      lineAnimation.cancel()
    }
  }, [])

  if (!visible) return null

  return (
    <div className="intro" ref={ref} aria-label="Jago Farm loading">
      <span className="intro-line" />
      <img className="intro-mark" src={logo} alt="Jago Farm" />
      <span className="intro-line" />
    </div>
  )
}
