'use client'

import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: {
      x: number
      y: number
      r: number
      a: number
      speed: number
      gold: boolean
    }[] = []
    let raf: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = document.body.scrollHeight
    }

    function initStars() {
      stars = []
      const count = Math.floor((canvas!.width * canvas!.height) / 9000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: Math.random() * 1.3 + 0.2,
          a: Math.random(),
          speed: Math.random() * 0.015 + 0.003,
          gold: Math.random() > 0.85,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const s of stars) {
        s.a += s.speed
        const op = ((Math.sin(s.a) + 1) / 2) * 0.8 + 0.15
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = s.gold ? `rgba(212,175,55,${op})` : `rgba(243,238,255,${op})`
        ctx!.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    draw()

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas id="stars" ref={canvasRef} />
}
