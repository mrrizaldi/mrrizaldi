"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
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

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-700 via-gray-900 to-black matrix-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
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
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-matrix-500 focus:ring-matrix-500/20"
                    />
                  </div>
                  <div>
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
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-matrix-500 focus:ring-matrix-500/20"
                    />
                  </div>
                </div>
                <div>
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
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-matrix-500 focus:ring-matrix-500/20"
                  />
                </div>
                <div>
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
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-matrix-500 focus:ring-matrix-500/20"
                  />
                </div>
                <Button type="submit" className="w-full btn-matrix text-black font-semibold">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-blue-600">{info.icon}</div>
                    <div>
                      <p className="text-sm text-gray-300">{info.label}</p>
                      {info.href !== "#" ? (
                        <Link href={info.href} className="text-white hover:text-blue-600 transition-colors">
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

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="flex items-center justify-center w-12 h-12 bg-gray-800/50 hover:bg-matrix-900/50 text-gray-400 hover:text-matrix-500 border border-gray-700/50 hover:border-matrix-500/30 rounded-lg transition-colors"
                      title={social.label}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-matrix-950/50 to-gray-900/50 border border-matrix-500/20 bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-2">Let's Collaborate!</h4>
                <p className="text-gray-300 mb-4">
                  I'm currently open to new opportunities in software development, robotics projects, and innovative
                  tech solutions. Whether you're looking for a full-stack developer, robotics engineer, or technical
                  team lead, I'd love to hear from you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    Full-Stack Development
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    Robotics Systems
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
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
