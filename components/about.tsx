import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Users, Code } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "2+ Years",
      description: "Robotics Development",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "9+ Projects",
      description: "Completed Successfully",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Product Owner & Scrum Master",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 matrix-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate software engineer with expertise in full-stack development, mobile applications, and robotics
            systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-matrix-500 text-glow">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                As a dedicated software engineer from Politeknik Elektronika Negeri Surabaya (PENS), I specialize in
                creating innovative solutions across web development, mobile applications, and robotics systems. My
                passion lies in bridging the gap between cutting-edge technology and practical real-world applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With experience in leading development teams and serving as a Product Owner, I bring both technical
                expertise and leadership skills to every project. I thrive in collaborative environments and enjoy
                mentoring fellow developers while continuously learning new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-matrix-500">Core Values</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">Innovation</Badge>
                <Badge className="bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">Collaboration</Badge>
                <Badge className="bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">
                  Continuous Learning
                </Badge>
                <Badge className="bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">Quality Code</Badge>
                <Badge className="bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">
                  User-Centric Design
                </Badge>
              </div>
            </div>

            <Button className="btn-matrix text-black font-semibold">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              {highlights.map((highlight, index) => (
                <Card key={index} className="border-l-4 border-l-matrix-500 bg-gray-900/50 border-gray-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-matrix-500">{highlight.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">{highlight.title}</h4>
                        <p className="text-gray-300">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-matrix-950/80 to-gray-900/80 border-matrix-500/30">
              <CardContent className="p-6">
                <h4 className="font-semibold text-matrix-500 mb-2">Current Focus</h4>
                <p className="text-gray-300">
                  Exploring advanced AI integration in robotics systems and developing scalable web applications using
                  modern frameworks like Next.js 15 and cutting-edge mobile technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
