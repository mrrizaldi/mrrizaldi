import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { GsapProvider } from "@/components/gsap-provider"
import RippleCursor from "@/components/ripple-cursor"
import { AnimationSettingsProvider } from "@/components/animation-settings-context"
import { AnimationToggle } from "@/components/animation-toggle"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Muhammad Rafi Rizaldi | Software Engineer",
  description:
    "Full-stack developer with 3+ years of experience specializing in web development and mobile applications. Experienced in Next.js, Flutter, React, and TypeScript.",
  keywords: ["Software Engineer", "Full Stack Developer", "Next.js", "Flutter", "React", "TypeScript"],
  authors: [{ name: "Muhammad Rafi Rizaldi" }],
  openGraph: {
    title: "Muhammad Rafi Rizaldi | Software Engineer",
    description: "Full-stack developer with 3+ years of experience specializing in web development and mobile applications.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AnimationSettingsProvider>
          <GsapProvider>
            <RippleCursor />
            {children}
            <Footer />
            <AnimationToggle />
          </GsapProvider>
        </AnimationSettingsProvider>
      </body>
    </html>
  )
}
