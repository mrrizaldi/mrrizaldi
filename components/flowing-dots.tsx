"use client"

import { useEffect, useRef, useCallback } from "react"
import { useAnimationSettings } from "./animation-settings-context"

interface FlowingPatternProps {
  backgroundColor?: string
  particleColor?: string
  animationSpeed?: number
}

const FlowingDots = ({
  backgroundColor = "#000000",
  particleColor = "255, 255, 255",
  animationSpeed = 0.002,
}: FlowingPatternProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameCountRef = useRef(0)
  const flowPointsRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      angle: number
      phase: number
      noiseOffset: number
      originalX: number
      originalY: number
    }>
  >([])

  // Get animation settings - use try/catch for SSR safety
  let animationsEnabled = true
  try {
    const settings = useAnimationSettings()
    animationsEnabled = settings.animationsEnabled
  } catch {
    // Context not available, default to enabled
  }

  const noise = (x: number, y: number, t: number): number => {
    const sin1 = Math.sin(x * 0.01 + t)
    const sin2 = Math.sin(y * 0.01 + t * 0.8)
    const sin3 = Math.sin((x + y) * 0.005 + t * 1.2)
    return (sin1 + sin2 + sin3) / 3
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use lower DPR for better performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const rect = canvas.parentElement?.getBoundingClientRect()
    const displayWidth = rect?.width ?? window.innerWidth
    const displayHeight = rect?.height ?? window.innerHeight

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr

    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    // OPTIMIZED: Increased grid size from 16 to 28 (reduces particles by ~70%)
    const gridSize = 28
    flowPointsRef.current = []

    for (let x = gridSize / 2; x < displayWidth; x += gridSize) {
      for (let y = gridSize / 2; y < displayHeight; y += gridSize) {
        flowPointsRef.current.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          noiseOffset: Math.random() * 1000,
          originalX: x,
          originalY: y,
        })
      }
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // OPTIMIZED: Frame skipping - only update every 2nd frame (30fps instead of 60fps)
    frameCountRef.current++
    if (frameCountRef.current % 2 !== 0) {
      animationFrameId.current = requestAnimationFrame(animate)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const displayWidth = canvas.width / dpr
    const displayHeight = canvas.height / dpr

    timeRef.current += animationSpeed

    // Clear canvas
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // OPTIMIZED: Batch all dots into single path
    ctx.beginPath()

    // Update and draw flow points
    flowPointsRef.current.forEach((point) => {
      const noiseValue = noise(point.x, point.y, timeRef.current)
      const angle = noiseValue * Math.PI * 4

      // Mouse influence - gentler effect
      const dx = mouseRef.current.x - point.x
      const dy = mouseRef.current.y - point.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 120) {
        const pushFactor = (1 - dist / 120) * 0.3
        point.vx += (dx / dist) * pushFactor
        point.vy += (dy / dist) * pushFactor
      }

      // Flow field influence - gentler
      point.vx += Math.cos(angle) * 0.05
      point.vy += Math.sin(angle) * 0.05

      // Stronger damping for smoother movement
      point.vx *= 0.92
      point.vy *= 0.92

      const nextX = point.x + point.vx
      const nextY = point.y + point.vy

      // Draw dot using arc
      ctx.moveTo(point.x + 1.5, point.y)
      ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)

      // Update position
      point.x = nextX
      point.y = nextY

      // Wrap around screen
      if (nextX < 0) point.x = displayWidth
      if (nextX > displayWidth) point.x = 0
      if (nextY < 0) point.y = displayHeight
      if (nextY > displayHeight) point.y = 0

      // Return to original position slowly
      const returnForce = 0.008
      point.vx += (point.originalX - point.x) * returnForce
      point.vy += (point.originalY - point.y) * returnForce
    })

    // Single fill call for all dots
    ctx.fillStyle = `rgba(${particleColor}, 0.25)`
    ctx.fill()

    animationFrameId.current = requestAnimationFrame(animate)
  }, [particleColor, animationSpeed, backgroundColor])

  // Static render for when animations are disabled
  const renderStatic = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const displayWidth = canvas.width / dpr
    const displayHeight = canvas.height / dpr

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // Draw static dots grid
    ctx.beginPath()
    const gridSize = 40
    for (let x = gridSize / 2; x < displayWidth; x += gridSize) {
      for (let y = gridSize / 2; y < displayHeight; y += gridSize) {
        ctx.moveTo(x + 1.5, y)
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      }
    }
    ctx.fillStyle = `rgba(${particleColor}, 0.15)`
    ctx.fill()
  }, [backgroundColor, particleColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    if (animationsEnabled) {
      canvas.addEventListener("mousemove", handleMouseMove)
      animate()
    } else {
      renderStatic()
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }

      timeRef.current = 0
      frameCountRef.current = 0
      flowPointsRef.current = []
    }
  }, [animate, renderStatic, resizeCanvas, handleMouseMove, animationsEnabled])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowingDots
