"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TypingAnimation } from "@/components/typing-animation"

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 matrix-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-matrix-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-matrix-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Main content with image and text */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-matrix-500 to-matrix-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <Image
                  src="/images/profile_picture.jpg"
                  alt="Muhammad Rafi Rizaldi"
                  width={300}
                  height={300}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-2 border-matrix-500 shadow-2xl relative z-10"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-matrix-500/20 blur-xl animate-pulse"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6 flex-1">
              <div className="space-y-4">
                <div className="text-lg md:text-xl text-matrix-400 font-mono">console.log("Hello World!");</div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Hi, I'm{" "}
                  <span className="block text-matrix-500 text-glow">
                    <TypingAnimation text="Muhammad Rafi Rizaldi" speed={120} className="inline-block" />
                  </span>
                </h1>

                <div className="space-y-2">
                  <p className="text-xl md:text-2xl text-matrix-400 font-semibold">
                    Software Engineer
                  </p>
                  <p className="text-lg text-gray-300 max-w-2xl">
                    A second-year student at Politeknik Elektronika Negeri Surabaya, passionate about technology and
                    building impactful software.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 max-w-2xl leading-relaxed">
                  I'm a full-stack developer with hands-on experience in web, mobile, and intelligent systems. A Linux
                  enthusiast at heart, I love exploring different distros and leveraging open-source tools to solve
                  real-world problems.
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    Flutter
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    ROS
                  </span>
                  <span className="px-3 py-1 bg-matrix-900/50 text-matrix-400 text-sm rounded-full border border-matrix-500/30">
                    Linux
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-matrix text-black font-semibold px-8 py-3">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-matrix-500 text-matrix-500 hover:bg-matrix-500 hover:text-black px-8 py-3 transition-all duration-300"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            <Link
              href="https://github.com"
              className="text-gray-400 hover:text-matrix-500 transition-all duration-300 transform hover:scale-110 glow-green"
              title="GitHub"
            >
              <Github className="h-7 w-7" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-gray-400 hover:text-matrix-500 transition-all duration-300 transform hover:scale-110 glow-green"
              title="LinkedIn"
            >
              <Linkedin className="h-7 w-7" />
            </Link>
            <Link
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-matrix-500 transition-all duration-300 transform hover:scale-110 glow-green"
              title="Email"
            >
              <Mail className="h-7 w-7" />
            </Link>
          </div>

          {/* Scroll indicator */}
          {/* <div className="flex flex-col items-center space-y-2">
            <span className="text-matrix-500 text-sm font-mono">scroll down</span>
            <div className="animate-bounce">
              <ArrowDown className="h-6 w-6 text-matrix-500" />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
