import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "../components/Navbar";
import BackgroundShapes from "../components/BackgroundShapes";
import SocialLinks from "../components/SocialLinks";
import ResumeManager from "../components/ResumeManager";

// Portfolio data - In a real app, this would come from your API
const portfolioData = {
  "1": {
    id: "1",
    name: "Meet Kr Bhadra",
    role: "Front-End Developer",
    avatar: "https://i.pravatar.cc/150?img=13",
    about: "Hi, I'm Meet! I specialize in creating beautiful, responsive web interfaces using React, TypeScript, and modern CSS. With 2 years of experience in front-end development, I've worked on projects ranging from small business websites to large-scale enterprise applications.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "UI/UX Design"],
    projects: [
     {
        id: "1",
        title: "ShowcaseHub – Personal Portfolio Website",
        description: "A personal portfolio website built using the MERN stack with integrated email service and SMS gateway.",
        image: "https://placehold.co/600x400/5665E9/FFFFFF/?text=ShowcaseHub",
        tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"]
      },
      {
        id: "2",
        title: "Warehouse Management System",
        description: "An inventory and stock management system with full CRUD operations, developed as part of an academic project.",
        image: "https://placehold.co/600x400/4ECDC4/FFFFFF/?text=Warehouse+System",
        tags: ["MySQL", "PHP", "Bootstrap"]
      },
      {
        id: "3",
        title: "Country Flags API Integration",
        description: "A project integrating an external API to dynamically fetch and display country flags.",
        image: "https://placehold.co/600x400/FFD166/FFFFFF/?text=Country+Flags+API",
        tags: ["JavaScript", "HTML", "REST API"]
      }
    ],
    experience: [
      {
        company: "Freelancing",
        role: "Sales and Business Development Associate",
        period: "March 2025 – Present",
        description: "Conducting market research, cold calling, and lead generation for business development initiatives remotely."
      }
    ],
    education: [
      {
        institution: "Assam downTown University, Guwahati",
        degree: "Bachelor of Computer Applications (BCA)",
        period: "2023 - 2026 (Pursuing)"
      },
      {
        institution: "Digboi College, Digboi",
        degree: "12th (AHSEC)",
        period: "2021 - 2023",
        percentage: "59%"
      },
      {
        institution: "Vivekananda Academy",
        degree: "10th (SEBA)",
        period: "Completed in 2021",
        percentage: "71%"
      }
    ],
    socialLinks: {
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    }
  },  // <-- Properly close user "1" object here
  "2": {  // <-- Start user "2" as a separate top-level entry
    id: "2",
    name: "Sam Rivera",
    role: "UX/UI Designer & Developer",
    avatar: "https://i.pravatar.cc/150?img=33",
    about: "I'm Sam, a UX/UI designer with a strong background in front-end development. I blend creativity with technical skills to create engaging and user-friendly digital experiences. I'm passionate about accessibility and inclusive design.",
    skills: ["UI Design", "UX Research", "Figma", "React", "CSS Animation"],
    projects: [
      // ...projects array...
    ],
    experience: [
      // ...experience array...
    ],
    education: [
      // ...education array...
    ],
    socialLinks: {
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/"
    }
  }
};


const Portfolio = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = portfolioData[userId as keyof typeof portfolioData];
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Portfolio not found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackgroundShapes />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-portfolio-blue to-portfolio-purple mb-4">
              <img
                src={portfolio.avatar}
                alt={portfolio.name}
                className="rounded-full w-32 h-32 object-cover border-4 border-white"
              />
            </div>

            <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{portfolio.role}</p>

            <SocialLinks {...portfolio.socialLinks} />
            <ResumeManager userId={userId || ""} />

            <div className="mt-6">
              <Link to={`/portfolio/${userId === "1" ? "2" : "1"}`}>
                <Button variant="outline">
                  View {userId === "1" ? "Friend's" : "Your"} Portfolio
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                  <p className="text-gray-700 leading-relaxed">{portfolio.about}</p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Education</h3>
                  <div className="space-y-4">
                    {portfolio.education.map((edu: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.projects.map((project: any) => (
                  <Card key={project.id} className="overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
              <div className="space-y-8">
                {portfolio.experience.map((exp: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-gray-600 mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    {portfolio.skills.map((skill: string) => (
                      <div
                        key={skill}
                        className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-medium"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
              <Card>
                <CardContent className="pt-6 space-y-6">
                 <form className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm focus:border-primary focus:ring-primary"
      placeholder="Your name"
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm focus:border-primary focus:ring-primary"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      id="message"
      name="message"
      rows={5}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm focus:border-primary focus:ring-primary"
      placeholder="Write your message..."
    ></textarea>
  </div>

  <div>
    <Button type="submit" className="px-6 py-2.5 text-base">Send Message</Button>
  </div>
</form>

                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
