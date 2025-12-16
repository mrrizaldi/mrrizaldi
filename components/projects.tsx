"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "Intelligent Humanoid Robot EROS",
      duration: "2 Years",
      organization: "Politeknik Elektronika Negeri Surabaya (PENS)",
      tech: ["C++", "ROS", "Computer Vision", "AI"],
      situation:
        "As part of PENS' official humanoid robot team (EROS), we competed in national and international RoboCup events.",
      task: "I was responsible for developing the 'brain' and communication systems in the robot — enabling it to perceive the environment and make autonomous decisions in soccer matches.",
      action:
        "Collaborated with teammates to implement advanced logic using ROS. Built robust inter-robot communication protocols for strategy synchronization, and worked extensively on perception modules and behavior trees.",
      result:
        "Our team achieved consistent placements in national competitions, significantly improved the robot's autonomous decision-making, and created reusable modular logic for future development.",
      category: "Robotics",
      featured: true,
    },
    {
      title: "Outfit Matching App",
      duration: "Ongoing",
      organization: "Course Project under Software Engineering Lecturer",
      tech: ["Flutter", "Hive", "Firebase", "Agile/Scrum"],
      situation:
        "Assigned by a Software Engineering lecturer to lead a student team to build a real-world application using Agile Scrum methodology.",
      task: "As Product Owner and Project Lead, I defined the product vision, broke down user stories, prioritized backlogs, and managed the development lifecycle.",
      action:
        "Facilitated sprint planning and daily stand-ups. Designed the core features: digital wardrobe, mix-and-match interface, and outfit recommendations. Ensured cross-team alignment and task delivery.",
      result:
        "Successfully deployed multiple sprints with functioning MVP including wardrobe storage and outfit preview. The project demonstrates strong leadership, planning, and technical coordination.",
      category: "Mobile Development",
      featured: true,
    },
    {
      title: "International Lab Internship — RAG System",
      duration: "2 Months",
      organization: "Kanagawa Institute of Technology, Japan",
      tech: ["Python", "LangChain", "Vector DB", "LLMs"],
      situation:
        "Selected as a research intern under a student exchange program to Japan. Worked directly under a professor in an AI research laboratory.",
      task:
        "Contributed to the design and prototyping of a Retrieval-Augmented Generation (RAG) system tailored for an academic customer service chatbot.",
      action:
        "Integrated document embeddings into a vector database. Fine-tuned question-answer retrieval using LangChain. Evaluated response relevance using benchmark metrics.",
      result:
        "Built a working prototype that could answer student questions about course registration and academic policies, demonstrating scalable application of generative AI in a real-world academic setting.",
      category: "AI Research",
      featured: true,
    },
    {
      title: "Agriculture Management Web App",
      duration: "1 Week (Hackathon)",
      organization: "Web Development Competition",
      tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
      situation:
        "Participated in a team-based web development competition where the challenge was to build a system for local agricultural management.",
      task: "My role was frontend and logic implementation for farmer dashboards and land management features.",
      action:
        "Used Next.js for dynamic routing, server-side rendering, and PostgreSQL for relational data management. Integrated a crop calendar and monitoring dashboard.",
      result:
        "Delivered a fully functional prototype within the given timeframe and received positive feedback on the UI/UX and feature completeness.",
      category: "Web Development",
      featured: true,
    },
    {
      title: "Javanese Horoscope App (Primbon)",
      duration: "2 Weeks",
      organization: "Personal Project",
      tech: ["Flutter", "Dart", "Local Storage"],
      situation:
        "A personal project aimed at digitizing traditional Javanese cultural beliefs, especially related to matchmaking and weton calculations.",
      task: "Design and develop a mobile app to calculate compatibility and character traits based on the Javanese calendar.",
      action:
        "Implemented custom calendar logic in Flutter, built UI for input and result display, and integrated local data for neptu and weton values.",
      result:
        "Successfully deployed the app as a cultural tech demo, helping users explore their traditional compatibility using modern tools.",
      category: "Mobile Development",
    },
    {
      title: "Hospital Dashboard CRUD App",
      duration: "1 Month",
      organization: "Learning Project",
      tech: ["RemixJS", "MongoDB", "React"],
      situation: "A learning project to understand full-stack development using the Remix framework.",
      task: "Create a CRUD dashboard system for hospital data (patients, appointments, records).",
      action:
        "Built the UI using Remix's file-based routing, implemented server actions, and connected MongoDB for storing patient information.",
      result:
        "Gained experience in building modern full-stack applications, especially around forms, nested routes, and API data handling.",
      category: "Web Development",
    },
    {
      title: "Pokemon Card Deck Builder",
      duration: "1.5 Months",
      organization: "Final Semester Project",
      tech: ["Java", "JavaFX", "JSON"],
      situation:
        "A final semester project to demonstrate understanding of object-oriented programming and GUI development.",
      task: "Build a desktop application that allows users to collect and manage a deck of Pokémon trading cards.",
      action:
        "Used JavaFX for UI, implemented drag-and-drop, collection filtering, and card details via JSON data. Built the deck management logic following OOP principles.",
      result:
        "Delivered a complete interactive desktop app that met academic requirements, showing strong integration between design and code logic.",
      category: "Desktop Development",
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

    // Project cards stagger animation
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card")

      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 60, scale: 0.98 })

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        // Tech badges stagger
        const techBadges = card.querySelectorAll(".tech-badge")
        gsap.set(techBadges, { opacity: 0, scale: 0.8 })
        gsap.to(techBadges, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        // STAR sections sequential reveal
        const starSections = card.querySelectorAll(".star-section")
        gsap.set(starSections, { opacity: 0, x: -20 })
        gsap.to(starSections, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })

        // Action buttons
        const buttons = card.querySelectorAll(".action-btn")
        gsap.set(buttons, { opacity: 0, y: 15 })
        gsap.to(buttons, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
      })
    }

    // CTA button animation
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 30 })
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    }

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-black relative">
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
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">Projects</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            A showcase of my technical projects using the STAR method (Situation, Task, Action, Result)
          </p>
        </div>

        <div ref={gridRef} className="grid gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`bg-zinc-900/50 border-zinc-800 backdrop-blur-sm project-card ${project.featured ? "border-2 border-white/30" : ""}`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl md:text-2xl text-white mb-2 font-bold">
                      {project.title}
                      {project.featured && <Badge className="ml-2 bg-white text-black font-bold">Featured</Badge>}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.organization}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit bg-zinc-800 text-white border-zinc-700"
                  >
                    {project.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-zinc-800 text-gray-300 border border-zinc-700 tech-badge"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="star-section">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                          SITUATION
                        </span>
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.situation}</p>
                    </div>
                    <div className="star-section">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                          TASK
                        </span>
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.task}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="star-section">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                          ACTION
                        </span>
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.action}</p>
                    </div>
                    <div className="star-section">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                          RESULT
                        </span>
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.result}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-zinc-800">
                  <Button variant="outline" size="sm" className="action-btn border-white text-white hover:bg-white hover:text-black">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="action-btn border-white text-white hover:bg-white hover:text-black">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
            <Link href="https://github.com">
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
