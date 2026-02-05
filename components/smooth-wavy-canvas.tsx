"use client"

import { useEffect, useRef, useCallback } from "react"
import { useAnimationSettings } from "./animation-settings-context"

interface SmoothWavyCanvasProps {
  backgroundColor?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  lineOpacity?: number
  animationSpeed?: number
}

const SmoothWavyCanvas = ({
  backgroundColor = "#000000",
  primaryColor = "255, 255, 255",
  secondaryColor = "200, 200, 200",
  accentColor = "150, 150, 150",
  lineOpacity = 1.8,
  animationSpeed = 0.003,
}: SmoothWavyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Get animation settings - use try/catch for SSR safety
  let animationsEnabled = true
  try {
    const settings = useAnimationSettings()
    animationsEnabled = settings.animationsEnabled
  } catch {
    // Context not available, default to enabled
  }

  const getMouseInfluence = useCallback((x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use lower DPR for better performance (cap at 1.5)
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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    timeRef.current += animationSpeed

    const width = canvas.width / dpr
    const height = canvas.height / dpr

    // Clear with clean background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // OPTIMIZED: Reduced from 25 to 12 primary lines
    const numPrimaryLines = 12

    for (let i = 0; i < numPrimaryLines; i++) {
      const yPos = (i / numPrimaryLines) * height
      const mouseInfl = getMouseInfluence(width / 2, yPos)

      const amplitude = 35 + 20 * Math.sin(timeRef.current * 0.2 + i * 0.12) + mouseInfl * 20
      const frequency = 0.005 + 0.002 * Math.sin(timeRef.current * 0.1 + i * 0.06) + mouseInfl * 0.001
      const speed = timeRef.current * (0.5 + 0.2 * Math.sin(i * 0.1)) + mouseInfl * timeRef.current * 0.2
      const thickness = 0.5 + 0.3 * Math.sin(timeRef.current + i * 0.2) + mouseInfl * 0.5
      const opacity =
        (0.08 + 0.05 * Math.abs(Math.sin(timeRef.current * 0.25 + i * 0.15)) + mouseInfl * 0.1) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`

      // OPTIMIZED: Increased step from 3 to 6
      for (let x = 0; x < width; x += 6) {
        const localMouseInfl = getMouseInfluence(x, yPos)

        const y =
          yPos +
          amplitude * Math.sin(x * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 1.5 + x * 0.006) * 10

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // OPTIMIZED: Reduced from 18 to 8 secondary lines
    const numSecondaryLines = 8

    for (let i = 0; i < numSecondaryLines; i++) {
      const xPos = (i / numSecondaryLines) * width
      const mouseInfl = getMouseInfluence(xPos, height / 2)

      const amplitude = 30 + 15 * Math.sin(timeRef.current * 0.15 + i * 0.1) + mouseInfl * 15
      const frequency = 0.006 + 0.002 * Math.cos(timeRef.current * 0.12 + i * 0.07) + mouseInfl * 0.001
      const speed = timeRef.current * (0.4 + 0.2 * Math.cos(i * 0.12)) + mouseInfl * timeRef.current * 0.2
      const thickness = 0.4 + 0.25 * Math.sin(timeRef.current + i * 0.3) + mouseInfl * 0.5
      const opacity =
        (0.06 + 0.04 * Math.abs(Math.sin(timeRef.current * 0.22 + i * 0.18)) + mouseInfl * 0.08) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`

      // OPTIMIZED: Increased step from 3 to 6
      for (let y = 0; y < height; y += 6) {
        const localMouseInfl = getMouseInfluence(xPos, y)

        const x =
          xPos +
          amplitude * Math.sin(y * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 1.5 + y * 0.006) * 8

        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // OPTIMIZED: Reduced from 10 to 5 accent lines
    const numAccentLines = 5

    for (let i = 0; i < numAccentLines; i++) {
      const offset = (i / numAccentLines) * width * 1.5 - width * 0.25
      const amplitude = 25 + 12 * Math.cos(timeRef.current * 0.18 + i * 0.1)
      const frequency = 0.008 + 0.003 * Math.sin(timeRef.current * 0.14 + i * 0.08)
      const phase = timeRef.current * (0.35 + 0.15 * Math.sin(i * 0.11))
      const thickness = 0.35 + 0.2 * Math.sin(timeRef.current + i * 0.25)
      const opacity = (0.04 + 0.03 * Math.abs(Math.sin(timeRef.current * 0.2 + i * 0.12))) * lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`

      // OPTIMIZED: Reduced from 80 to 40 steps
      const steps = 40
      for (let j = 0; j <= steps; j++) {
        const progress = j / steps
        const baseX = offset + progress * width
        const baseY = progress * height + amplitude * Math.sin(progress * 5 + phase)

        const mouseInfl = getMouseInfluence(baseX, baseY)

        const x = baseX + mouseInfl * Math.sin(timeRef.current * 1.2 + progress * 5) * 6
        const y = baseY + mouseInfl * Math.cos(timeRef.current * 1.2 + progress * 5) * 6

        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed, getMouseInfluence])

  // Static render for when animations are disabled
  const renderStatic = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Draw static wavy lines (fewer and simplified)
    const numLines = 8
    for (let i = 0; i < numLines; i++) {
      const yPos = (i / numLines) * height
      ctx.beginPath()
      ctx.lineWidth = 0.5
      ctx.strokeStyle = `rgba(${primaryColor}, 0.1)`

      for (let x = 0; x < width; x += 10) {
        const y = yPos + 20 * Math.sin(x * 0.01 + i * 0.5)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }, [backgroundColor, primaryColor])

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

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }

      timeRef.current = 0
    }
  }, [animate, renderStatic, resizeCanvas, handleMouseMove, animationsEnabled])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ willChange: animationsEnabled ? 'auto' : 'auto' }}
      />
    </div>
  )
}

export default SmoothWavyCanvas
