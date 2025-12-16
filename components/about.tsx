"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Icon } from "@iconify/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const socialIconsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textLinesRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  const socialLinks = [
    {
      icon: "mdi:github",
      href: "https://github.com/mrrizaldi",
      label: "GitHub",
    },
    {
      icon: "mdi:linkedin",
      href: "https://linkedin.com/in/mrrizaldi",
      label: "LinkedIn",
    },
    {
      icon: "mdi:email-outline",
      href: "mailto:contact@mrrizaldi.com",
      label: "Email",
    },
    {
      icon: "ri:twitter-x-fill",
      href: "https://twitter.com/mrrizaldi",
      label: "X (Twitter)",
    },
  ]

  useGSAP(() => {
    if (!sectionRef.current || !circleRef.current) return

    // Circle expansion animation - starts from scale 0 at CENTER, spreads outward
    gsap.set(circleRef.current, {
      scale: 0,
      transformOrigin: "center center",
      opacity: 0,
    })

    // ScrollTrigger for circle expansion - scale from center
    gsap.to(circleRef.current, {
      scale: 1,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 10%",
        scrub: 0.8,
      },
    })

    // Photo fade in animation
    if (photoRef.current) {
      gsap.set(photoRef.current, { opacity: 0 })
      gsap.to(photoRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 45%",
          toggleActions: "play none none none",
        },
      })
    }

    // Name typing animation from left
    if (nameRef.current) {
      gsap.set(nameRef.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1
      })
      gsap.to(nameRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 38%",
          toggleActions: "play none none none",
        },
      })
    }

    // Social icons slide up from bottom animation
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll(".social-icon")
      gsap.set(icons, { opacity: 0, y: 50 })
      gsap.to(icons, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 35%",
          toggleActions: "play none none none",
        },
      })
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      })
    }

    if (textLinesRef.current) {
      const lines = textLinesRef.current.querySelectorAll(".text-line")
      gsap.set(lines, { opacity: 0, y: 25 })
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 35%",
          toggleActions: "play none none none",
        },
      })
    }



  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 bg-black overflow-visible"
    >
      {/* Expanding circle background - curved top AND bottom matching reference */}
      <div
        ref={circleRef}
        className="absolute left-1/2 -translate-x-1/2 bg-white"
        style={{
          top: "0",
          width: "150%",
          height: "100%",
          borderRadius: "50% 50% 50% 50% / 8% 8% 8% 8%",
        }}
      />

      {/* Content container */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">

          {/* Left Column - Photo & Social Icons */}
          <div className="flex flex-col items-center">
            {/* Profile Photo - Circular - Bigger */}
            <div ref={photoRef} className="relative mb-6">
              <Image
                src="/images/profile_picture.jpg"
                alt="Muhammad Rafi Rizaldi"
                width={384}
                height={384}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl"
                priority
              />
            </div>

            {/* Full Name - Bigger with typing effect */}
            <h3 ref={nameRef} className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-8 tracking-tight text-center">
              Muhammad Rafi Rizaldi
            </h3>

            {/* Social Icons - Bigger */}
            <div ref={socialIconsRef} className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-icon w-14 h-14 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                >
                  <Icon icon={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:pl-8">
            {/* About Me Title */}
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-10 tracking-tight"
            >
              ABOUT ME
            </h2>

            {/* Narrative Content - Single Compact Paragraph */}
            <div ref={textLinesRef} className="mb-10">
              <p className="text-line text-lg md:text-xl text-gray-700 leading-relaxed">
                A dedicated <span className="font-bold text-black">software engineer</span> from{" "}
                <span className="font-bold text-black">Politeknik Elektronika Negeri Surabaya (PENS)</span> with{" "}
                <span className="font-bold text-black">2+ years of experience</span> specializing in{" "}
                <span className="font-bold text-black">web development</span> and{" "}
                <span className="font-bold text-black">mobile applications</span>. With experience leading development teams as a{" "}
                <span className="font-bold text-black">Product Owner</span>, I bridge the gap between cutting-edge technology and practical real-world solutions using modern frameworks like{" "}
                <span className="font-bold text-black">Next.js</span>, <span className="font-bold text-black">React</span>, and <span className="font-bold text-black">Node.js</span>.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
