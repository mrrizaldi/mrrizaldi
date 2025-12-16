"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Users, Code } from "lucide-react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoContainerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const focusCardRef = useRef<HTMLDivElement>(null)

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "2+ Years",
      description: "Robotics Development",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "9+ Projects",
      description: "Completed Successfully",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Product Owner & Scrum Master",
    },
  ]

  useGSAP(() => {
    if (!sectionRef.current) return

    // Photo parallax entrance - smooth reveal with scale and rotation
    if (photoRef.current) {
      gsap.set(photoRef.current, {
        y: 150,
        opacity: 0,
        scale: 0.7,
        rotate: -8
      })

      gsap.to(photoRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: photoContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Subtle continuous floating
      gsap.to(photoRef.current, {
        y: -12,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      })
    }

    // Title animation with split effect
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.95 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }

    // Left column content with smooth stagger
    if (leftColumnRef.current) {
      const items = leftColumnRef.current.querySelectorAll(".animate-left")
      gsap.set(items, { opacity: 0, x: -60, rotateY: -10 })
      gsap.to(items, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }

    // Badges with enhanced pop effect
    if (badgesRef.current) {
      const badges = badgesRef.current.querySelectorAll(".badge-item")
      gsap.set(badges, { opacity: 0, scale: 0.6, y: 20 })
      gsap.to(badges, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: badgesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }

    // Button animation
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 30, scale: 0.9 })
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

    // Right column cards
    if (rightColumnRef.current) {
      const cards = rightColumnRef.current.querySelectorAll(".highlight-card")
      gsap.set(cards, { opacity: 0, x: 60, rotateY: 10 })
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }

    // Focus card with glow
    if (focusCardRef.current) {
      gsap.set(focusCardRef.current, { opacity: 0, scale: 0.9, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: focusCardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.to(focusCardRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }).to(focusCardRef.current, {
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)",
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      })
    }

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 bg-zinc-950 relative overflow-hidden"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Profile Photo - Centered at top with enhanced parallax */}
        <div ref={photoContainerRef} className="flex justify-center mb-24">
          <div ref={photoRef} className="relative group">
            {/* Animated glow ring */}
            <div className="absolute -inset-3 bg-gradient-to-r from-white/15 via-white/5 to-white/15 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>

            {/* Photo */}
            <div className="relative">
              <Image
                src="/images/profile_picture.jpg"
                alt="Muhammad Rafi Rizaldi"
                width={280}
                height={280}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-2 border-white/20 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />

              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-white/[0.03] blur-md"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            About Me
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Passionate software engineer with expertise in full-stack development, mobile applications, and robotics systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-8">
            <div className="space-y-5">
              <h3 className="text-3xl md:text-4xl font-bold text-white animate-left">My Journey</h3>
              <p className="text-gray-400 text-lg leading-relaxed animate-left">
                As a dedicated software engineer from Politeknik Elektronika Negeri Surabaya (PENS), I specialize in
                creating innovative solutions across web development, mobile applications, and robotics systems. My
                passion lies in bridging the gap between cutting-edge technology and practical real-world applications.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed animate-left">
                With experience in leading development teams and serving as a Product Owner, I bring both technical
                expertise and leadership skills to every project. I thrive in collaborative environments and enjoy
                mentoring fellow developers while continuously learning new technologies.
              </p>
            </div>

            <div className="space-y-5 animate-left">
              <h4 className="text-xl font-bold text-white">Core Values</h4>
              <div ref={badgesRef} className="flex flex-wrap gap-2.5">
                <Badge className="bg-zinc-800 text-white border border-zinc-700 hover:border-white transition-colors px-4 py-2 badge-item">Innovation</Badge>
                <Badge className="bg-zinc-800 text-white border border-zinc-700 hover:border-white transition-colors px-4 py-2 badge-item">Collaboration</Badge>
                <Badge className="bg-zinc-800 text-white border border-zinc-700 hover:border-white transition-colors px-4 py-2 badge-item">
                  Continuous Learning
                </Badge>
                <Badge className="bg-zinc-800 text-white border border-zinc-700 hover:border-white transition-colors px-4 py-2 badge-item">Quality Code</Badge>
                <Badge className="bg-zinc-800 text-white border border-zinc-700 hover:border-white transition-colors px-4 py-2 badge-item">
                  User-Centric Design
                </Badge>
              </div>
            </div>

            <Button ref={buttonRef} className="bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-6">
            <div className="grid gap-5">
              {highlights.map((highlight, index) => (
                <Card key={index} className="border-l-4 border-l-white bg-zinc-900/50 border-zinc-800 highlight-card hover:bg-zinc-900/70 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-white">{highlight.icon}</div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{highlight.title}</h4>
                        <p className="text-gray-400">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card ref={focusCardRef} className="bg-zinc-900 border-white/20 hover:border-white/30 transition-colors">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-3 text-lg">Current Focus</h4>
                <p className="text-gray-400 leading-relaxed">
                  Exploring advanced AI integration in robotics systems and developing scalable web applications using
                  modern frameworks like Next.js 15 and cutting-edge mobile technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
