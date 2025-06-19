import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Smartphone, Database, Cog } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Programming Languages",
      skills: [
        { name: "C", level: "Advanced", description: "Low-level systems programming" },
        { name: "C++", level: "Advanced", description: "Robotics & performance-critical logic" },
        { name: "Java", level: "Intermediate", description: "OOP Desktop applications" },
        { name: "JavaScript/TypeScript", level: "Advanced", description: "Web full-stack development" },
        { name: "Dart", level: "Intermediate", description: "Mobile development with Flutter" },
        { name: "PHP", level: "Intermediate", description: "Legacy web backend systems" },
      ],
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Frameworks & Libraries",
      skills: [
        { name: "Flutter", level: "Advanced", description: "Cross-platform mobile apps" },
        { name: "Next.js", level: "Advanced", description: "Full-stack React framework" },
        { name: "RemixJS", level: "Intermediate", description: "Modern web apps with SSR" },
        { name: "Express.js", level: "Advanced", description: "REST API backend development" },
        { name: "ROS", level: "Advanced", description: "Robot Operating System" },
      ],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Databases",
      skills: [
        { name: "MongoDB", level: "Advanced", description: "NoSQL document database" },
        { name: "PostgreSQL", level: "Intermediate", description: "Advanced relational database" },
        { name: "MySQL", level: "Intermediate", description: "Classic relational database" },
        { name: "Hive", level: "Intermediate", description: "Lightweight local storage" },
      ],
    },
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Other Key Skills",
      skills: [
        { name: "Agile/Scrum", level: "Advanced", description: "Product Owner experience" },
        { name: "Leadership", level: "Advanced", description: "Team collaboration & mentoring" },
        { name: "UI/UX Design", level: "Intermediate", description: "User-centered design principles" },
        { name: "CLI Development", level: "Advanced", description: "Command-line applications" },
      ],
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-matrix-900/50 text-matrix-400 border border-matrix-500/50"
      case "Intermediate":
        return "bg-matrix-950/50 text-matrix-300 border border-matrix-600/30"
      case "Beginner":
        return "bg-gray-800/50 text-gray-400 border border-gray-600/30"
      default:
        return "bg-gray-800/50 text-gray-400 border border-gray-600/30"
    }
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-800 via-black to-gray-800 matrix-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="h-full bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="text-matrix-500">{category.icon}</div>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{skill.name}</span>
                        <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                      </div>
                      <p className="text-sm text-gray-300">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
