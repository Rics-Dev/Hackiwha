import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
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
} from "@/components/ui/select"; // Assuming you use shadcn/ui Select
import { Course } from "@/types/types";
import { authApi, courseApi } from "@/api/api";

// Define available icons (emojis for simplicity)
const availableIcons = [
  { value: "📚", label: "Book" },
  { value: "🧪", label: "Science" },
  { value: "✏️", label: "Pencil" },
  { value: "💻", label: "Computer" },
  { value: "🎨", label: "Art" },
  { value: "🎓", label: "Graduation" },
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const fetchedCourses = await courseApi.getMyCourses();
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
        Provide a mix of YouTube videos and relevant articles or learning resources.
        Format the response as a JSON array with objects containing:
        {
          "title": "Title of the resource",
          "url": "URL to the resource",
          "type": "video" or "article" or "course",
          "source": "Source website or platform",
          "thumbnail": "URL to thumbnail image" (only for videos)
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

  const handleCourseClick = (course: Course) => {
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
          ) : courses.length > 0 ? (
            <div className="flex space-x-4 pb-4 overflow-x-auto max-w-5xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {courses.map((course) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={course._id}
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
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <p className="text-red-500 mb-2">{searchError}</p>
                      <Button
                        variant="outline"
                        onClick={() => searchForCourseContent(selectedCourse)}
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Videos Section */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Recommended Videos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults
                          .filter((result) => result.type === "video")
                          .map((video, index) => (
                            <a
                              key={index}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col rounded-lg border border-border overflow-hidden hover:border-primary transition-colors"
                            >
                              <div className="h-32 bg-muted flex items-center justify-center relative">
                                {video.thumbnail ? (
                                  <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center w-full h-full bg-accent/30">
                                    <svg
                                      className="w-12 h-12 text-muted-foreground"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                    </svg>
                                  </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  YouTube
                                </div>
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium line-clamp-2">
                                  {video.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {video.source}
                                </p>
                              </div>
                            </a>
                          ))}
                        {searchResults.filter(
                          (result) => result.type === "video"
                        ).length === 0 && (
                          <p className="text-muted-foreground col-span-2">
                            No video resources found.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Articles and Other Resources Section */}
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
