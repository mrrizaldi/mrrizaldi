import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Portfolio</h3>
            <p className="text-gray-400 max-w-md">
              Software Engineer & Robotics Developer passionate about creating innovative solutions that bridge
              technology and real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#skills" className="block text-gray-400 hover:text-white transition-colors">
                Skills
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
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Me</h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © {currentYear} Portfolio. Made with <Heart className="h-4 w-4 text-red-500" /> using Next.js 15
          </p>
        </div>
      </div>
    </footer>
  )
}
