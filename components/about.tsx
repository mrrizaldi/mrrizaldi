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
      hoverColor: "hover:text-gray-900 hover:border-gray-900 hover:bg-gray-100",
    },
    {
      icon: "mdi:linkedin",
      href: "https://www.linkedin.com/in/muhammad-rafi-rizaldi-a54414318/",
      label: "LinkedIn",
      hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-blue-50",
    },
    {
      icon: "mdi:email-outline",
      href: "mailto:muhammadrafiriz23@gmail.com",
      label: "Email",
      hoverColor: "hover:text-red-500 hover:border-red-500 hover:bg-red-50",
    },
    {
      icon: "mdi:instagram",
      href: "https://instagram.com/mrzld0",
      label: "Instagram",
      hoverColor: "hover:text-pink-500 hover:border-pink-500 hover:bg-pink-50",
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
      className="relative min-h-screen flex items-center bg-black overflow-visible py-16"
    >
      {/* Expanding circle background - curved top AND bottom matching reference */}
      <div
        ref={circleRef}
        className="absolute left-1/2 -translate-x-1/2 bg-white overflow-hidden"
        style={{
          top: "0",
          width: "150%",
          height: "100%",
          borderRadius: "50% 50% 50% 50% / 8% 8% 8% 8%",
        }}
      >
        {/* Grid Pattern Overlay - 5% opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 163, 175, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Blue Blur Circle - Top Right */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content container */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">

          {/* Left Column - Photo & Social Icons */}
          <div className="flex flex-col items-center">
            {/* Profile Photo with Decorative Dots Pattern */}
            <div ref={photoRef} className="relative mb-6">
              {/* Decorative Dot Pattern Behind Photo */}
              <div
                className="absolute -top-8 -left-8 w-48 h-48 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(circle, #6366f1 2px, transparent 2px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-40 h-40 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #8b5cf6 2px, transparent 2px)",
                  backgroundSize: "14px 14px",
                }}
              />

              <Image
                src="/images/profile_picture.jpg"
                alt="Muhammad Rafi Rizaldi"
                width={384}
                height={384}
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl"
                priority
              />
            </div>

            {/* Full Name - Bigger with typing effect */}
            <h3 ref={nameRef} className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-2 tracking-tight text-center">
              Muhammad Rafi Rizaldi
            </h3>
            <p className="text-base md:text-lg lg:text-xl font-medium text-gray-500 mb-8 tracking-wide text-center">
              Engineer | Developer
            </p>

            {/* Social Icons - Brand Colored Hover Effects */}
            <div ref={socialIconsRef} className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`social-icon w-14 h-14 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 ${link.hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <Icon icon={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-6 text-gray-500">
              {/* <Icon icon="mdi:map-marker-outline" className="w-5 h-5" />/ */}
              <span className="text-base font-medium underline underline-offset-2">Surabaya, Indonesia</span>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:pl-8">
            {/* About Me Title */}
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-10 tracking-tight"
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
