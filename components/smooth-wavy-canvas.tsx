"use client"

import { useEffect, useRef, useCallback } from "react"

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
  lineOpacity = 1.8,  // Much higher visibility
  animationSpeed = 0.003,
}: SmoothWavyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
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

  const handleMouseDown = useCallback(() => {
    mouseRef.current.isDown = true
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    timeRef.current += animationSpeed

    const width = canvas.width / dpr
    const height = canvas.height / dpr

    // Clear with clean background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Primary horizontal flowing lines
    const numPrimaryLines = 25

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

      for (let x = 0; x < width; x += 3) {
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

    // Secondary vertical flowing lines
    const numSecondaryLines = 18

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

      for (let y = 0; y < height; y += 3) {
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

    // Accent diagonal flowing lines
    const numAccentLines = 10

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

      const steps = 80
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
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }

      timeRef.current = 0
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default SmoothWavyCanvas
