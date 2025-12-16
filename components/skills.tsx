"use client"

import { useRef } from "react"
import { Icon } from "@iconify/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import FlowingDots from "./flowing-dots"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Organize tech stack into rows
const rows = [
  // Row 1: Languages
  [
    { name: "JavaScript", icon: "devicon:javascript" },
    { name: "TypeScript", icon: "devicon:typescript" },
    { name: "Python", icon: "devicon:python" },
    { name: "Java", icon: "devicon:java" },
    { name: "C++", icon: "devicon:cplusplus" },
    { name: "C", icon: "devicon:c" },
    { name: "Dart", icon: "devicon:dart" },
    { name: "PHP", icon: "devicon:php" },
  ],
  // Row 2: Frameworks & Libraries
  [
    { name: "Next.js", icon: "devicon:nextjs" },
    { name: "React", icon: "devicon:react" },
    { name: "Flutter", icon: "devicon:flutter" },
    { name: "Express.js", icon: "simple-icons:express" },
    { name: "Remix", icon: "simple-icons:remix" },
    { name: "Tailwind CSS", icon: "devicon:tailwindcss" },
    { name: "Node.js", icon: "devicon:nodejs" },
  ],
  // Row 3: Databases & Cloud
  [
    { name: "MongoDB", icon: "devicon:mongodb" },
    { name: "PostgreSQL", icon: "devicon:postgresql" },
    { name: "MySQL", icon: "devicon:mysql" },
    { name: "Firebase", icon: "devicon:firebase" },
    { name: "Redis", icon: "devicon:redis" },
    { name: "Supabase", icon: "devicon:supabase" },
  ],
  // Row 4: DevOps & Tools
  [
    { name: "Git", icon: "devicon:git" },
    { name: "Docker", icon: "devicon:docker" },
    { name: "Linux", icon: "devicon:linux" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "VS Code", icon: "devicon:vscode" },
    { name: "ROS", icon: "simple-icons:ros" },
    { name: "Figma", icon: "devicon:figma" },
  ],
]

function MarqueeRow({
  items,
  direction = "left",
  speed = 30
}: {
  items: typeof rows[0]
  direction?: "left" | "right"
  speed?: number
}) {
  // Triple items for seamless infinite loop (ensures full coverage)
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-3 group mx-8 md:mx-16">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {duplicatedItems.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 px-5 py-3 rounded-full 
                       bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-sm
                       hover:border-white/30 hover:bg-zinc-800/60 transition-all duration-300
                       cursor-default group/item"
          >
            <Icon
              icon={tech.icon}
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            />
            <span className="text-sm md:text-base text-gray-300 font-medium whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
    </div>
  )
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

    // Content fade in
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0 })
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen py-24 bg-black relative overflow-hidden flex flex-col justify-center"
    >
      {/* Flowing dots background - positioned absolutely to fill entire section */}
      <div className="absolute inset-0">
        <FlowingDots />
      </div>

      <div className="relative z-10">
        {/* Bold Header */}
        <div className="text-center mb-16 px-4">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase"
          >
            Tech Arsenal
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mt-4 font-light tracking-wide">
            tools & technologies I wield
          </p>
        </div>

        {/* Marquee Rows */}
        <div ref={contentRef} className="space-y-2">
          <MarqueeRow items={rows[0]} direction="left" speed={35} />
          <MarqueeRow items={rows[1]} direction="right" speed={40} />
          <MarqueeRow items={rows[2]} direction="left" speed={45} />
          <MarqueeRow items={rows[3]} direction="right" speed={38} />
        </div>
      </div>
    </section>
  )
}
