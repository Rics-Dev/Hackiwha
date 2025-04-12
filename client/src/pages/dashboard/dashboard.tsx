import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import stars from "@/assets/stars.svg";
import {
  CalendarClock,
  Users,
  MessageSquare,
  GraduationCap,
  Calendar,
  Clock,
  BookOpenText,
  FileBadge,
  Loader2,
  File,
  Plus,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { Course } from "@/types/types";
import {  courseApi } from "@/api/api";
import { jsPDF } from "jspdf";

const availableIcons = [
  { value: "📚", label: "Book" },
  { value: "🧪", label: "Science" },
  { value: "✏️", label: "Pencil" },
  { value: "💻", label: "Computer" },
  { value: "🎨", label: "Art" },
  { value: "🎓", label: "Graduation" },
];

const predefinedCourses = [
  {
    title: "Analyse Mathématique",
    description: "Étude des fonctions, des suites, des limites et des dérivées.",
    icon: "📐",
    url1: "https://www.youtube.com/watch?v=agI-SDrMxkc",
    url2: "https://www.youtube.com/watch?v=OYuZoX35_sw",
    url3: "https://www.youtube.com/watch?v=ctW9QTPBtq8",
    url4: "https://www.youtube.com/watch?v=0rKomLMvH8w",
  },
  {
    title: "Probabilités et Statistiques",
    description: "Introduction aux concepts de probabilité, de variables aléatoires et d'analyse statistique.",
    icon: "📊",
    url1: "https://www.youtube.com/watch?v=UkCQqsIMZPo",
    url2: "https://www.youtube.com/watch?v=SqC4Fra91ww",
    url3: "https://www.youtube.com/watch?v=4-KQN655XkY",
    url4: "https://www.youtube.com/watch?v=Ilx-kK5FEDQ",
  },
  {
    title: "Réseaux 1",
    description: "Introduction aux réseaux informatiques, protocoles de communication et topologies.",
    icon: "🌐",
    url1: "https://www.youtube.com/watch?v=3QhU9jd03a0",
    url2: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    url3: "https://www.youtube.com/watch?v=VwN91x5i25g",
    url4: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
  },
  {
    title: "Algorithmique 1",
    description: "Apprentissage des bases de la programmation et des structures algorithmiques.",
    icon: "💻",
    url1: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    url2: "https://www.youtube.com/watch?v=OSbUA5Q9Cec",
    url3: "https://www.youtube.com/watch?v=wUSDVGivd-8",
    url4: "https://www.youtube.com/watch?v=dAkZTYgPBsw",
  },
  {
    title: "Électricité",
    description: "Étude des circuits électriques, lois fondamentales et applications pratiques.",
    icon: "⚡",
    url1: "https://www.youtube.com/watch?v=3QhU9jd03a0",
    url2: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    url3: "https://www.youtube.com/watch?v=VwN91x5i25g",
    url4: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
  },
  {
    title: "Systèmes d'Exploitation",
    description: "Fonctionnement des systèmes d'exploitation, gestion des processus et mémoire.",
    icon: "🖥️",
    url1: "https://www.youtube.com/watch?v=26QPDBe-NB8",
    url2: "https://www.youtube.com/watch?v=5XgBd6rjuDQ",
    url3: "https://www.youtube.com/watch?v=GxT1kU3Yq2A",
    url4: "https://www.youtube.com/watch?v=0nQe6y3n2t8",
  },
  {
    title: "Bases de Données",
    description: "Concepts fondamentaux des bases de données relationnelles et langage SQL.",
    icon: "🗄️",
    url1: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    url2: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
    url3: "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
    url4: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
  },
];



type SearchResult = {
  title: string;
  url: string;
  type: "video" | "article" | "course";
  source: string;
  thumbnail?: string;
};

interface DashboardCard {
  title: string;
  value: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
}

export function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();
  const userRole = user?.role || "student";
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    icon?: string;
  }>({ title: "", description: "", icon: "📚" }); // Default icon
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [videoSummary, setVideoSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const generateVideoSummary = async (videoUrl: string) => {
    setIsSummarizing(true);
    setVideoSummary(null);

    try {
      const videoId = getYouTubeVideoId(videoUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      const prompt = `
      Summarize this YouTube video with ID ${videoId} about ${
        selectedCourse?.title || "this topic"
      }.
      Provide a concise summary that captures the key points and main concepts.
      Format the summary in bullet points for key concepts, don't mention the video ID.
    `;

      const result = await model.generateContent(prompt);
      const summaryText = result.response.text();
      setVideoSummary(summaryText);
    } catch (error) {
      console.error("Error generating video summary:", error);
      setVideoSummary("Failed to generate summary. Please try again.");
    } finally {
      setIsSummarizing(false);
    }
  };
  

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     setIsLoading(true);
  //     try {
  //       const fetchedCourses = await courseApi.getMyCourses();
  //       setCourses(fetchedCourses);
  //     } catch (err) {
  //       setError("Failed to fetch courses");
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  const getYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddCourse = async () => {
    if (!newCourse.title) {
      alert("Title is required");
      return;
    }
    setIsLoading(true);
    try {
      const createdCourse = await courseApi.createCourse(newCourse);
      setCourses((prev) => [...prev, createdCourse]);
      setNewCourse({ title: "", description: "", icon: "📚" });
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to create course");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchForCourseContent = async (course: Course) => {
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const prompt = `
        Find educational resources for a course on "${
          course.title
        }" (description: ${course.description || "N/A"}).
        Provide some relevant articles or learning resources.
        Format the response as a JSON array with objects containing:
        {
          "title": "Title of the resource",
          "url": "URL to the resource",
          "type": "video" or "article" or "course",
          "source": "Source website or platform",
        }
        Limit to 6 high-quality results total.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);

      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0]);
        setSearchResults(jsonData);
      } else {
        setSearchError("Failed to parse search results");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching Gemini search results:", error);
      setSearchError("Failed to fetch search results. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const studentCards: DashboardCard[] = [
    {
      title: "Upcoming Deadlines",
      value: "3",
      description: "Next: Math Exam (2 days)",
      icon: <Calendar className="h-8 w-8" />,
    },
    {
      title: "Study Time",
      value: "7.5h",
      description: (
        <>
          <span className="mr-1 bg-green-100 text-green-800 px-1 py-1 rounded dark:bg-green-900 dark:text-green-200">
            +2.3h
          </span>
          From last week
        </>
      ),
      icon: <Clock className="h-8 w-8" />,
    },
    {
      title: "Resources",
      value: "28",
      description: "+5 new this week",
      icon: <BookOpenText className="h-8 w-8" />,
    },
    {
      title: "Knowledge Points",
      value: "253",
      description: "You achieved level 3!",
      icon: <FileBadge className="h-8 w-8" />,
    },
  ];

  const mentorCards: DashboardCard[] = [
    {
      title: "Active Mentees",
      value: "12",
      description: "2 new this month",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Scheduled Sessions",
      value: "5",
      description: "Next: Physics Review (Tomorrow)",
      icon: <CalendarClock className="h-8 w-8" />,
    },
    {
      title: "Feedback Received",
      value: "8",
      description: "+3 this week",
      icon: <MessageSquare className="h-8 w-8" />,
    },
    {
      title: "Mentor Level",
      value: "Gold",
      description: "Earned for 50+ sessions",
      icon: <GraduationCap className="h-8 w-8" />,
    },
  ];

  const dashboardCards = userRole === "mentor" ? mentorCards : studentCards;

  useEffect(() => {
    if (selectedCourse) {
      searchForCourseContent(selectedCourse);
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [selectedCourse]);

  const handleCourseClick = (course: any) => {
    setSelectedVideoUrl(null);
    setSelectedCourse(course);
    setIsExpanded(false);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const exportToPdf = () => {
    if (!videoSummary) return;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(`Summary: ${selectedCourse?.title || "Video Summary"}`, 10, 15);

    // Add video URL if available
    if (selectedVideoUrl) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Source: ${selectedVideoUrl}`, 10, 25);
    }

    // Add summary content
    doc.setFontSize(12);
    doc.setTextColor(0);
    const splitText = doc.splitTextToSize(videoSummary, 180);
    doc.text(splitText, 10, 35);

    // Save the PDF
    doc.save(`${selectedCourse?.title || "video"}-summary.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dashboardCards.map((card, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-4 flex flex-row items-start justify-between gap-2 bg-background text-foreground border-border"
          >
            <div className="gap-2 flex flex-col items-start">
              <span className="font-bold">{card.title}</span>
              <span className="font-bold text-xl">{card.value}</span>
              <span className="text-muted-foreground">{card.description}</span>
            </div>
            {card.icon}
          </Button>
        ))}
      </div>

      <div className="space-y-4 bg-background p-6 rounded-md border border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Icon
                  </Label>
                  <Select
                    value={newCourse.icon}
                    onValueChange={(value) =>
                      setNewCourse({ ...newCourse, icon: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.value} {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  onClick={handleAddCourse}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Add Course"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : predefinedCourses.length > 0 ? (
            <div className="flex space-x-4 pb-4 overflow-x-auto max-w-5xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {predefinedCourses.map((course) => (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[120px] h-[140px] flex-shrink-0 bg-background text-foreground border-border hover:bg-accent"
                  onClick={() => handleCourseClick(course)}
                >
                  <span className="text-2xl mb-2">{course.icon || "📚"}</span>
                  <span className="font-medium text-center">
                    {course.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.description?.substring(0, 20) || "No description"}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No courses created yet.</p>
          )}
        </div>
      </div>

      <div className="space-y-4 bg-background p-4 rounded-md border border-border">
        <div className="w-full flex gap-4">
          {!isDialogOpen && (
            <div
              className={`h-[500px] border rounded-md overflow-hidden transition-all duration-300 ease-in-out bg-background border-border ${
                selectedCourse
                  ? isExpanded
                    ? "hidden w-0"
                    : "w-1/2"
                  : "w-full"
              }`}
            >
              <Tldraw
                persistenceKey={`canvas-${user?._id || "default"}`}
                className={theme === "dark" ? "tldraw-dark" : "tldraw-light"}
              />
            </div>
          )}

          {selectedCourse && (
            <div
              className={`h-[500px] border rounded-md overflow-auto flex flex-col transition-all duration-300 ease-in-out bg-background border-border ${
                isExpanded ? "w-full" : "w-1/2"
              }`}
            >
              <div className="flex justify-between items-center p-2 border-b border-border bg-background sticky top-0 z-10">
                <span className="font-medium text-foreground">
                  {selectedCourse.title} - Learning Resources
                </span>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleExpand}
                    className="p-1 text-foreground hover:bg-accent"
                  >
                    {isExpanded ? "Shrink" : "Expand"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseCourse}
                    className="p-1 text-foreground hover:bg-accent"
                  >
                    Close
                  </Button>
                </div>
              </div>

              <div className="p-4 flex-1 overflow-auto">
                {isSearching ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-muted-foreground">
                        Searching for resources on {selectedCourse.title}...
                      </p>
                    </div>
                  </div>
                ) : searchError ? (
                  // <div className="h-full flex items-center justify-center">
                  //   <div className="text-center max-w-md">
                  //     <p className="text-red-500 mb-2">{searchError}</p>
                  //     <Button
                  //       variant="outline"
                  //       onClick={() => searchForCourseContent(selectedCourse)}
                  //     >
                  //       Try Again
                  //     </Button>
                  //   </div>
                  // </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      selectedCourse.url1,
                      selectedCourse.url2,
                      selectedCourse.url3,
                      selectedCourse.url4,
                    ]
                      .filter((url): url is string => !!url)
                      .map((url, index) => {
                        const videoId = getYouTubeVideoId(url);
                        return (
                          videoId && (
                            <button
                              key={index}
                              onClick={() => setSelectedVideoUrl(url)}
                              className="flex flex-col rounded-lg border border-border overflow-hidden hover:border-primary transition-colors text-left"
                            >
                              <div className="h-32 bg-muted flex items-center justify-center relative">
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                  alt={`Video ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  YouTube
                                </div>
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium line-clamp-2">
                                  {selectedCourse.title} - Video {index + 1}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  YouTube
                                </p>
                              </div>
                            </button>
                          )
                        );
                      })}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedVideoUrl && (
                      <div className="mb-6">
                        {videoSummary && (
                          <div className="mt-6 mb-6 p-6 rounded-xl border border-border bg-background/80 shadow-sm">
                            <div className="flex justify-between">
                              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                                <svg
                                  className="w-5 h-5 mr-2 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                  ></path>
                                </svg>
                                Video Summary
                              </h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={exportToPdf}
                                disabled={isSummarizing}
                                className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                              >
                                <File />
                                Export to PDF
                              </Button>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
                              {videoSummary}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium mb-3">
                            Now Playing
                          </h3>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              generateVideoSummary(selectedVideoUrl)
                            }
                            disabled={isSummarizing}
                            className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                          >
                            {isSummarizing ? (
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                            ) : (
                              <img
                                src={stars}
                                alt="summarize"
                                className="h-4 w-4 text-white"
                              />
                            )}
                            <span className="font-medium">
                              {isSummarizing
                                ? "Summarizing..."
                                : "AI Summarize"}
                            </span>
                          </Button>
                        </div>
                        <div
                          className="relative w-full"
                          style={{
                            paddingBottom: "56.25%" /* 16:9 aspect ratio */,
                          }}
                        >
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                              selectedVideoUrl
                            )}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Recommended Videos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          selectedCourse.url1,
                          selectedCourse.url2,
                          selectedCourse.url3,
                          selectedCourse.url4,
                        ]
                          .filter((url): url is string => !!url)
                          .map((url, index) => {
                            const videoId = getYouTubeVideoId(url);
                            return (
                              videoId && (
                                <button
                                  key={index}
                                  onClick={() => setSelectedVideoUrl(url)}
                                  className="flex flex-col rounded-lg border border-border overflow-hidden hover:border-primary transition-colors text-left"
                                >
                                  <div className="h-32 bg-muted flex items-center justify-center relative">
                                    <img
                                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                      alt={`Video ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                      YouTube
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <h4 className="font-medium line-clamp-2">
                                      {selectedCourse.title} - Video {index + 1}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      YouTube
                                    </p>
                                  </div>
                                </button>
                              )
                            );
                          })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Learning Resources
                      </h3>
                      <div className="space-y-3">
                        {searchResults
                          .filter((result) => result.type !== "video")
                          .map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start p-3 rounded-lg border border-border hover:border-primary transition-colors"
                            >
                              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                                {resource.type === "article" ? (
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1v5h5v10H6V4h7z" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {resource.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {resource.source} •{" "}
                                  {resource.type === "article"
                                    ? "Article"
                                    : "Course"}
                                </p>
                              </div>
                            </a>
                          ))}
                        {searchResults.filter(
                          (result) => result.type !== "video"
                        ).length === 0 && (
                          <p className="text-muted-foreground">
                            No additional resources found.
                          </p>
                        )}
                      </div>
                    </div>

                    {searchResults.length === 0 && !searchError && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No resources found for this course.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => searchForCourseContent(selectedCourse)}
                        >
                          Refresh Results
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
