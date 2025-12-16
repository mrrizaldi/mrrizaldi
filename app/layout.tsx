import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { GsapProvider } from "@/components/gsap-provider"
import RippleCursor from "@/components/ripple-cursor"
import { VantaBackground } from "@/components/vanta-background"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Muhammad Rafi Rizaldi | Software Engineer & Robotics Developer",
  description:
    "Full-stack developer specializing in web development, mobile apps, and robotics systems. Experienced in Next.js, Flutter, C++, and ROS.",
  keywords: ["Software Engineer", "Full Stack Developer", "Robotics", "Next.js", "Flutter", "React", "TypeScript"],
  authors: [{ name: "Muhammad Rafi Rizaldi" }],
  openGraph: {
    title: "Muhammad Rafi Rizaldi | Software Engineer & Robotics Developer",
    description: "Full-stack developer specializing in web development, mobile apps, and robotics systems.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <GsapProvider>
          <VantaBackground />
          <RippleCursor />
          {children}
          <Footer />
        </GsapProvider>
      </body>
    </html>
  )
}
