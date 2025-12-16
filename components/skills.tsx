"use client"

import { useRef } from "react"
import { Icon } from "@iconify/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Tech stack with Iconify icon names
const techStack = [
  { name: "C", icon: "devicon:c", color: "#A8B9CC" },
  { name: "C++", icon: "devicon:cplusplus", color: "#00599C" },
  { name: "Java", icon: "devicon:java", color: "#ED8B00" },
  { name: "JavaScript", icon: "devicon:javascript", color: "#F7DF1E" },
  { name: "TypeScript", icon: "devicon:typescript", color: "#3178C6" },
  { name: "Dart", icon: "devicon:dart", color: "#0175C2" },
  { name: "PHP", icon: "devicon:php", color: "#777BB4" },
  { name: "Python", icon: "devicon:python", color: "#3776AB" },
  { name: "Flutter", icon: "devicon:flutter", color: "#02569B" },
  { name: "Next.js", icon: "devicon:nextjs", color: "#FFFFFF" },
  { name: "React", icon: "devicon:react", color: "#61DAFB" },
  { name: "Remix", icon: "simple-icons:remix", color: "#FFFFFF" },
  { name: "Express", icon: "simple-icons:express", color: "#FFFFFF" },
  { name: "ROS", icon: "simple-icons:ros", color: "#22314E" },
  { name: "MongoDB", icon: "devicon:mongodb", color: "#47A248" },
  { name: "PostgreSQL", icon: "devicon:postgresql", color: "#4169E1" },
  { name: "MySQL", icon: "devicon:mysql", color: "#4479A1" },
  { name: "Git", icon: "devicon:git", color: "#F05032" },
  { name: "Docker", icon: "devicon:docker", color: "#2496ED" },
  { name: "Linux", icon: "devicon:linux", color: "#FCC624" },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const iconsContainerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!sectionRef.current) return

    // Title animation
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

    // Icons floating animation - star spread effect
    iconRefs.current.forEach((icon, index) => {
      if (!icon) return

      // Initial entrance animation
      gsap.set(icon, {
        opacity: 0,
        scale: 0,
      })

      gsap.to(icon, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: index * 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: iconsContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Normal speed floating animation
      const randomX = () => gsap.utils.random(-15, 15)
      const randomY = () => gsap.utils.random(-10, 10)
      const randomDuration = () => gsap.utils.random(4, 7)
      const randomDelay = () => gsap.utils.random(0, 1)

      // Create infinite floating animation
      const floatAnimation = () => {
        gsap.to(icon, {
          x: randomX(),
          y: randomY(),
          duration: randomDuration(),
          ease: "sine.inOut",
          delay: randomDelay(),
          onComplete: floatAnimation,
        })
      }

      // Start floating after entrance
      gsap.delayedCall(index * 0.05 + 0.6, floatAnimation)
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 bg-black relative overflow-hidden min-h-screen"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bold Header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase"
          >
            Tech Arsenal
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mt-6 font-light tracking-wide">
            tools & technologies I wield
          </p>
        </div>

        {/* Floating Icons Container */}
        <div
          ref={iconsContainerRef}
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
        >
          {/* Icons positioned in a spread pattern */}
          <div className="relative w-full h-full">
            {techStack.map((tech, index) => {
              // Calculate position in a spread pattern
              const row = Math.floor(index / 5)
              const col = index % 5
              const offsetX = (col - 2) * 18
              const offsetY = (row - 2) * 25

              return (
                <div
                  key={tech.name}
                  ref={(el) => { iconRefs.current[index] = el }}
                  className="absolute flex flex-col items-center gap-2 cursor-pointer group"
                  style={{
                    left: `${50 + offsetX}%`,
                    top: `${50 + offsetY}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Icon Container */}
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900/80 border border-zinc-800 
                               flex items-center justify-center backdrop-blur-sm
                               hover:border-white/50 hover:bg-zinc-800/80 transition-all duration-300
                               hover:scale-110"
                  >
                    <Icon
                      icon={tech.icon}
                      className="w-8 h-8 md:w-10 md:h-10"
                    />
                  </div>

                  {/* Tech Name - visible on hover */}
                  <span className="text-xs md:text-sm text-gray-400 font-medium opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Decorative star dots */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"></div>
      </div>
    </section>
  )
}
