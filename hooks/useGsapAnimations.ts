"use client"

import { useRef, useEffect, RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/**
 * Fade in and slide up animation triggered on scroll
 */
export function useFadeInUp<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    y?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 0.8, y = 50, start = "top 85%" } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, { opacity: 0, y })

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Stagger children elements animation
 */
export function useStaggerChildren<T extends HTMLElement>(
  childSelector: string,
  options: {
    stagger?: number
    duration?: number
    y?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { stagger = 0.1, duration = 0.6, y = 30, start = "top 85%" } = options

  useGSAP(() => {
    if (!ref.current) return

    const children = ref.current.querySelectorAll(childSelector)
    if (children.length === 0) return

    gsap.set(children, { opacity: 0, y })

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Scale in animation with optional bounce
 */
export function useScaleIn<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    scale?: number
    start?: string
    ease?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 0.8, scale = 0.8, start = "top 85%", ease = "back.out(1.7)" } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, { opacity: 0, scale })

    gsap.to(ref.current, {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Slide in from a direction
 */
export function useSlideIn<T extends HTMLElement>(
  direction: "left" | "right" | "up" | "down" = "left",
  options: {
    delay?: number
    duration?: number
    distance?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 0.8, distance = 100, start = "top 85%" } = options

  useGSAP(() => {
    if (!ref.current) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (direction === "left") fromVars.x = -distance
    if (direction === "right") fromVars.x = distance
    if (direction === "up") fromVars.y = -distance
    if (direction === "down") fromVars.y = distance

    gsap.set(ref.current, fromVars)

    gsap.to(ref.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Parallax effect on scroll
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5,
  options: {
    start?: string
    end?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { start = "top bottom", end = "bottom top" } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: true,
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Text reveal animation with split effect
 */
export function useTextReveal<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 0.8, start = "top 85%" } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, {
      opacity: 0,
      y: 30,
      clipPath: "inset(0 0 100% 0)"
    })

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Glow pulse animation
 */
export function useGlowPulse<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 1.5, start = "top 85%" } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, { opacity: 0, scale: 0.95 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
    })

    tl.to(ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay,
      ease: "power2.out",
    }).to(ref.current, {
      boxShadow: "0 0 30px rgba(0, 255, 65, 0.6)",
      duration: duration / 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
    })
  }, { scope: ref })

  return ref
}

/**
 * Counter animation for numbers
 */
export function useCountUp(
  endValue: number,
  options: {
    duration?: number
    start?: string
    suffix?: string
  } = {}
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null)
  const { duration = 2, start = "top 85%", suffix = "" } = options

  useGSAP(() => {
    if (!ref.current) return

    const obj = { value: 0 }

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value) + suffix
        }
      },
    })
  }, { scope: ref })

  return ref
}

/**
 * Hero-specific entrance animation (plays immediately, not scroll-triggered)
 */
export function useHeroEntrance<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    y?: number
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 1, y = 40 } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, { opacity: 0, y })

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    })
  }, { scope: ref })

  return ref
}

/**
 * Stagger children entrance animation (plays immediately, not scroll-triggered)
 */
export function useHeroStagger<T extends HTMLElement>(
  childSelector: string,
  options: {
    delay?: number
    stagger?: number
    duration?: number
    y?: number
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, stagger = 0.1, duration = 0.6, y = 20 } = options

  useGSAP(() => {
    if (!ref.current) return

    const children = ref.current.querySelectorAll(childSelector)
    if (children.length === 0) return

    gsap.set(children, { opacity: 0, y })

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
    })
  }, { scope: ref })

  return ref
}

/**
 * Image reveal with scale animation (plays immediately)
 */
export function useImageReveal<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { delay = 0, duration = 1.2 } = options

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    })

    gsap.to(ref.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration,
      delay,
      ease: "elastic.out(1, 0.5)",
    })
  }, { scope: ref })

  return ref
}
