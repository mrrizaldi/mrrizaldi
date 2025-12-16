"use client"

import { useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

// Register GSAP plugins globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface GsapProviderProps {
  children: ReactNode
}

export function GsapProvider({ children }: GsapProviderProps) {
  useEffect(() => {
    // Configure GSAP defaults for smooth animations
    gsap.config({
      force3D: true,
    })

    // Set default ease for all animations
    gsap.defaults({
      ease: "power3.out",
      duration: 0.8,
    })

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
