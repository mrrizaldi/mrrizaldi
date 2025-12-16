"use client"

import { useRef } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const currentYear = new Date().getFullYear()

  useGSAP(() => {
    if (!footerRef.current) return

    // Grid columns fade in
    if (gridRef.current) {
      const columns = gridRef.current.querySelectorAll(".footer-column")
      gsap.set(columns, { opacity: 0, y: 30 })

      gsap.to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })

      // Social icons animation
      const socialIcons = gridRef.current.querySelectorAll(".social-icon")
      gsap.set(socialIcons, { opacity: 0, scale: 0 })

      gsap.to(socialIcons, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

    // Bottom copyright fade in
    if (bottomRef.current) {
      gsap.set(bottomRef.current, { opacity: 0, y: 20 })

      gsap.to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      })
    }

  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="bg-black text-white py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4 footer-column">
            <h3 className="text-3xl font-black tracking-tighter">MRR</h3>
            <p className="text-gray-400 max-w-md">
              Software Engineer & Robotics Developer passionate about creating innovative solutions that bridge
              technology and real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 footer-column">
            <h4 className="text-lg font-bold uppercase tracking-wide">Quick Links</h4>
            <div className="space-y-2">
              <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#skills" className="block text-gray-400 hover:text-white transition-colors">
                Tech Arsenal
              </Link>
              <Link href="#projects" className="block text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 footer-column">
            <h4 className="text-lg font-bold uppercase tracking-wide">Connect</h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors social-icon"
                title="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors social-icon"
                title="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-white transition-colors social-icon"
                title="Email"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="border-t border-zinc-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            © {currentYear} Muhammad Rafi Rizaldi. Made with <Heart className="h-4 w-4 text-white" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
