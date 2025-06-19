import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
