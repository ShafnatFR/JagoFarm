import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Masonry.css'

const MEDIA_QUERIES = ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)']
const MEDIA_COLUMNS = [5, 4, 3, 2]

const useMedia = (queries, values, fallback) => {
  const get = () => values[queries.findIndex((query) => matchMedia(query).matches)] ?? fallback
  const [value, setValue] = useState(get)
  useEffect(() => { const update = () => setValue(get()); queries.forEach((query) => matchMedia(query).addEventListener('change', update)); return () => queries.forEach((query) => matchMedia(query).removeEventListener('change', update)) }, [queries])
  return value
}

const preloadImages = (urls) => Promise.all(urls.map((src) => new Promise((resolve) => { const image = new Image(); image.src = src; image.onload = image.onerror = resolve })))

export default function Masonry({ items, ease = 'power3.out', duration = 0.6, stagger = 0.05, animateFrom = 'bottom', scaleOnHover = true, hoverScale = 0.95, blurToFocus = true }) {
  const columns = useMedia(MEDIA_QUERIES, MEDIA_COLUMNS, 1)
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [imagesReady, setImagesReady] = useState(false)
  const mounted = useRef(false)
  useLayoutEffect(() => { if (!containerRef.current) return; const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width)); observer.observe(containerRef.current); return () => observer.disconnect() }, [])
  useEffect(() => { setImagesReady(false); preloadImages(items.map((item) => item.img)).then(() => setImagesReady(true)) }, [items])
  const grid = useMemo(() => { if (!width) return []; const heights = new Array(columns).fill(0); const columnWidth = width / columns; return items.map((item) => { const column = heights.indexOf(Math.min(...heights)); const height = item.height / 2; const result = { ...item, x: columnWidth * column, y: heights[column], w: columnWidth, h: height }; heights[column] += height; return result }) }, [columns, items, width])
  const containerHeight = grid.length ? Math.max(...grid.map((item) => item.y + item.h)) : 0
  useLayoutEffect(() => { if (!imagesReady) return; grid.forEach((item, index) => { const selector = `[data-key="${item.id}"]`; const props = { x: item.x, y: item.y, width: item.w, height: item.h }; if (!mounted.current) gsap.fromTo(selector, { ...props, y: animateFrom === 'top' ? -200 : window.innerHeight + 200, opacity: 0, ...(blurToFocus ? { filter: 'blur(10px)' } : {}) }, { ...props, opacity: 1, ...(blurToFocus ? { filter: 'blur(0px)' } : {}), duration: 0.8, delay: index * stagger, ease: 'power3.out' }); else gsap.to(selector, { ...props, duration, ease, overwrite: 'auto' }) }); mounted.current = true }, [animateFrom, blurToFocus, duration, ease, grid, imagesReady, stagger])
  return <div ref={containerRef} className="masonry-list" style={{ height: containerHeight }}>{grid.map((item) => <div className="masonry-item" data-key={item.id} key={item.id} onMouseEnter={(event) => scaleOnHover && gsap.to(event.currentTarget, { scale: hoverScale, duration: 0.3 })} onMouseLeave={(event) => scaleOnHover && gsap.to(event.currentTarget, { scale: 1, duration: 0.3 })}><img src={item.img} alt="" onError={(event) => { if (item.fallback && event.currentTarget.src !== item.fallback) event.currentTarget.src = item.fallback }} /></div>)}</div>
}
