"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const infoCardsRef = useRef<HTMLDivElement>(null)
  const collabCardRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+62 123 456 7890",
      href: "tel:+621234567890",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Surabaya, Indonesia",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
  ]

  useGSAP(() => {
    if (!sectionRef.current) return

    // Title animation
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

    // Form card slide in from left
    if (formCardRef.current) {
      gsap.set(formCardRef.current, { opacity: 0, x: -60 })
      gsap.to(formCardRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Form inputs sequential animation
      const inputs = formCardRef.current.querySelectorAll(".form-input")
      gsap.set(inputs, { opacity: 0, y: 20 })
      gsap.to(inputs, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }

    // Info cards stagger from right
    if (infoCardsRef.current) {
      const cards = infoCardsRef.current.querySelectorAll(".info-card")
      gsap.set(cards, { opacity: 0, x: 60 })
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoCardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Contact info items
      const contactItems = infoCardsRef.current.querySelectorAll(".contact-item")
      gsap.set(contactItems, { opacity: 0, x: 20 })
      gsap.to(contactItems, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoCardsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Social icons bounce in
      const socialIcons = infoCardsRef.current.querySelectorAll(".social-icon")
      gsap.set(socialIcons, { opacity: 0, scale: 0 })
      gsap.to(socialIcons, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: infoCardsRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })
    }

    // Collaboration card with glow border
    if (collabCardRef.current) {
      gsap.set(collabCardRef.current, { opacity: 0, scale: 0.95 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: collabCardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      tl.to(collabCardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      }).to(collabCardRef.current, {
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)",
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Tags animation
      const tags = collabCardRef.current.querySelectorAll(".collab-tag")
      gsap.set(tags, { opacity: 0, y: 15 })
      gsap.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: collabCardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-zinc-950 relative">
      {/* Subtle grid */}
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
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">Get In Touch</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card ref={formCardRef} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-bold text-xl">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-input">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
                    />
                  </div>
                </div>
                <div className="form-input">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white/20"
                  />
                </div>
                <Button type="submit" className="w-full bg-white text-black font-bold hover:bg-gray-200 form-input">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div ref={infoCardsRef} className="space-y-8">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm info-card">
              <CardHeader>
                <CardTitle className="text-white font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3 contact-item">
                    <div className="text-white">{info.icon}</div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.href !== "#" ? (
                        <Link href={info.href} className="text-white hover:text-gray-300 transition-colors">
                          {info.value}
                        </Link>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm info-card">
              <CardHeader>
                <CardTitle className="text-white font-bold">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="flex items-center justify-center w-12 h-12 bg-zinc-800 hover:bg-white text-gray-400 hover:text-black border border-zinc-700 hover:border-white rounded-lg transition-all social-icon"
                      title={social.label}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card ref={collabCardRef} className="bg-zinc-900 border-white/20 backdrop-blur-sm info-card">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-2 text-lg">Let's Collaborate!</h4>
                <p className="text-gray-400 mb-4">
                  I'm currently open to new opportunities in software development, robotics projects, and innovative
                  tech solutions. Whether you're looking for a full-stack developer, robotics engineer, or technical
                  team lead, I'd love to hear from you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-zinc-800 text-white text-sm rounded-full border border-zinc-700 collab-tag">
                    Full-Stack Development
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 text-white text-sm rounded-full border border-zinc-700 collab-tag">
                    Robotics Systems
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 text-white text-sm rounded-full border border-zinc-700 collab-tag">
                    Team Leadership
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
