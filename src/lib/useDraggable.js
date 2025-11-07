import { useEffect, useRef, useState } from 'react'

let zCounter = 100

export function useDraggable(initial = { x: '10%', y: '10%', w: '70%', h: '60%' }) {
  const [rect, setRect] = useState(() => normalize(initial))
  const [z, setZ] = useState(++zCounter)
  const start = useRef(null)

  function normalize(r) {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      x: toPx(r.x, vw),
      y: toPx(r.y, vh),
      w: toPx(r.w, vw),
      h: toPx(r.h, vh),
    }
  }

  function toPx(value, total) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * total
    }
    return value
  }

  const bringToFront = () => setZ(++zCounter)

  const onDragStart = (e) => {
    bringToFront()
    start.current = { x: e.clientX - rect.x, y: e.clientY - rect.y, mode: 'move' }
    window.addEventListener('pointermove', onDrag)
    window.addEventListener('pointerup', onStop, { once: true })
  }

  const onResizeStart = (e) => {
    bringToFront()
    start.current = { x: e.clientX, y: e.clientY, w: rect.w, h: rect.h, mode: 'resize' }
    window.addEventListener('pointermove', onDrag)
    window.addEventListener('pointerup', onStop, { once: true })
    e.stopPropagation()
  }

  const onDrag = (e) => {
    const s = start.current
    if (!s) return
    if (s.mode === 'move') {
      setRect(r => ({ ...r, x: e.clientX - s.x, y: e.clientY - s.y }))
    } else {
      const dx = e.clientX - s.x, dy = e.clientY - s.y
      setRect(r => ({ ...r, w: Math.max(360, s.w + dx), h: Math.max(220, s.h + dy) }))
    }
  }

  const onStop = () => {
    window.removeEventListener('pointermove', onDrag)
    start.current = null
  }

  useEffect(() => {
    const onResize = () => setRect(r => normalize(r))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { rect, z, onDragStart, onResizeStart, bringToFront, setRect }
}
