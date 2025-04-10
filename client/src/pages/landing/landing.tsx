import { Button } from "@/components/ui/button";
import dashboard from "../../assets/dashboard.png";
import {
  Users,
  Video,
  FileText,
  Brain,
  Award,
  BarChart,
  Download,
  ChevronRight,
  Sparkles,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#1E3A8A]">Aspo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-[#1E3A8A] transition-colors"
            >
              Login
            </Link>
            <Link to="/auth/register">
              <Button className="bg-[#1E3A8A] hover:bg-[#152a66] transition-colors shadow-md">
                Sign Up
              </Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                    Elevate Your Education with Aspo
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                    The complete learning platform designed for Algerian
                    students. Connect, collaborate, and excel in your studies.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link to="/auth/register">
                    <Button className="bg-[#1E3A8A] hover:bg-[#152a66] transition-all transform hover:scale-105 shadow-lg text-base py-6 px-8">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/#features">
                    <Button
                      variant="outline"
                      className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 py-6 px-8 text-base"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <img
                  src={dashboard}
                  alt="Aspo Dashboard Preview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#10B981]" />
                    <span className="text-sm font-medium">
                      Earn Knowledge Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#60A5FA] text-white mb-2">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
                Aspo combines powerful learning tools with a supportive
                community to help you excel in your studies.
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-6 lg:grid-cols-3">
              {[
                {
                  icon: <Video className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "Virtual Classrooms",
                  description:
                    "Join live classes, participate in quizzes, and access assignments all in one place.",
                },
                {
                  icon: <Users className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "Study Groups",
                  description:
                    "Connect with peers, collaborate on projects, and learn together through video conferencing.",
                },
                {
                  icon: <FileText className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "Resource Library",
                  description:
                    "Access Algerian textbooks, past exams, and curated educational content.",
                },
                {
                  icon: <Brain className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "AI-Powered Tools",
                  description:
                    "Generate practice questions and get smart summaries of educational videos.",
                },
                {
                  icon: <BarChart className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "Progress Tracking",
                  description:
                    "Monitor your learning journey with visual analytics and achievement certificates.",
                },
                {
                  icon: <Download className="h-8 w-8 text-[#1E3A8A]" />,
                  title: "Offline Mode",
                  description:
                    "Download resources for studying without an internet connection.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="grid gap-4 text-center bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A8A]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tools Highlight - Redesigned without the image */}
        <section className="py-24 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
              <div className="flex flex-col justify-center space-y-6 text-center mb-8">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors border-transparent bg-[#60A5FA] text-white mx-auto">
                  AI-Powered
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                  Smart Learning Tools
                </h2>
                <p className="text-gray-600 md:text-xl">
                  Our AI tools are designed to enhance your learning experience
                  and help you prepare for exams.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Exercise Generator",
                    description:
                      "Create curriculum-aligned practice questions that mimic Algerian exams.",
                  },
                  {
                    title: "Video Summaries",
                    description:
                      "Convert lengthy educational videos into concise key points with timestamps.",
                  },
                  {
                    title: "Multilingual Support",
                    description:
                      "Get content in French, Arabic, and Tamazight to suit your preferences.",
                  },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Sparkles className="h-5 w-5 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                      <h3 className="font-bold text-[#1E3A8A]">{tool.title}</h3>
                    </div>
                    <p className="text-gray-600 pl-8">{tool.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link to="/auth/register">
                  <Button className="bg-[#1E3A8A] hover:bg-[#152a66] transition-all transform hover:scale-105 shadow-lg text-base py-6 px-8">
                    Try AI Tools
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors border-transparent bg-[#60A5FA] text-white">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                Your Path to Academic Success
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
                Getting started with Aspo is easy. Follow these simple steps to
                begin your learning journey.
              </p>
            </div>
            <div className="mx-auto max-w-5xl py-8">
              <div className="relative">
                {/* Connection line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2 hidden md:block"></div>

                {/* Steps */}
                {[
                  {
                    number: 1,
                    title: "Create Your Profile",
                    description:
                      "Sign up and create your personalized profile with your skills, location, and study level.",
                  },
                  {
                    number: 2,
                    title: "Join Classes & Groups",
                    description:
                      "Connect with teachers and peers in virtual classrooms and collaborative study groups.",
                  },
                  {
                    number: 3,
                    title: "Learn & Earn",
                    description:
                      "Access resources, complete assignments, and earn Knowledge Points to unlock rewards.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center mb-12 md:mb-16 relative"
                  >
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                      {index % 2 === 0 ? (
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A]">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      ) : (
                        <div className="md:hidden space-y-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A]">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A8A] text-white text-xl font-bold shadow-lg relative">
                      {step.number}
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left">
                      {index % 2 === 1 ? (
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A]">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      ) : (
                        <div className="md:hidden space-y-2">
                          <h3 className="text-2xl font-bold text-[#1E3A8A]">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1E3A8A] text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-blue-100">
              Join thousands of Algerian students who are already using Aspo to
              achieve academic excellence.
            </p>
            <Link to="/auth/register">
              <Button className="bg-white text-[#1E3A8A] hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg text-base py-6 px-8 font-semibold">
                Get Started Today
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#1E3A8A]">Aspo</span>
              </div>
              <p className="text-sm text-gray-500">
                Empowering Algerian students with innovative learning tools and
                a supportive community.
              </p>
              <div className="flex gap-4 mt-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    ),
                  },
                  {
                    name: "Twitter",
                    icon: (
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    ),
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <>
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </>
                    ),
                  },
                ].map((social, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="text-gray-500 hover:text-[#1E3A8A] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      {social.icon}
                    </svg>
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Features",
                links: [
                  "Virtual Classrooms",
                  "Study Groups",
                  "Resource Library",
                  "AI Tools",
                ],
              },
              {
                title: "Resources",
                links: ["Help Center", "Blog", "Tutorials", "Contact Us"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
              },
            ].map((column, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to="#"
                        className="hover:text-[#1E3A8A] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Aspo. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2 md:mt-0">
              Made with ❤️ in Algeria
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
