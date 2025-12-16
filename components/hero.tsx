"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const greetingRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

    // Set initial states
    gsap.set(greetingRef.current, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(roleRef.current, { opacity: 0, y: 60, scale: 0.9 })
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 30 })

    // Entrance sequence
    tl.to(greetingRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
    })

    // Typing animation for the name - split into characters
    if (nameRef.current) {
      const text = nameRef.current.textContent || "";
      nameRef.current.innerHTML = "";

      // Split text into individual characters and wrap in spans, preserving spaces
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(-50px)";
        span.style.whiteSpace = "pre"; // Preserve spaces
        return span;
      });

      chars.forEach((span) => nameRef.current?.appendChild(span));

      // Animate each character appearing from top with typing effect
      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1, // Typing speed - slower for better visibility
        ease: "power2.out",
      }, "-=0.4");
    }

    tl.to(roleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.5")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
    >
      {/* Lightweight CSS background effects */}
      <div className="absolute inset-0">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-white/[0.01] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '8s' }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative z-10 text-center px-4">
        {/* Small greeting with letter spacing */}
        <div ref={greetingRef} className="mb-8">
          <span className="text-gray-500 text-base md:text-lg font-light tracking-[0.4em] uppercase">
            Hello, World
          </span>
        </div>

        {/* Main name heading with typing animation */}
        <h1 ref={nameRef} className="mb-10 text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.9]">
          Hi, I'm Rafi
        </h1>

        {/* Role/subtitle */}
        <p
          ref={roleRef}
          className="text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light tracking-[0.15em] uppercase"
        >
          Software Engineer
        </p>
      </div>

      {/* Enhanced scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-gray-600 text-xs tracking-[0.3em] uppercase font-light">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-600 via-gray-700 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
