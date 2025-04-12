import { useState } from "react";
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
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface CourseItem {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  url: string;
  icon?: string;
  progress?: number;
}

interface DashboardCard {
  title: string;
  value: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
}

export function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const userRole = user?.role || "Student";
  const userStudyLevel = user?.studyLevel || "secondary";

  const allCourses: CourseItem[] = [
    {
      id: "1",
      title: "Algebra Basics",
      subject: "Mathematics",
      level: "university",
      description: "Introduction to algebraic expressions and equations.",
      url: "https://example.com/course/algebra-basics",
      icon: "📐",
      progress: 75,
    },
    {
      id: "2",
      title: "World History",
      subject: "History",
      level: "university",
      description: "Explore key events in global history.",
      url: "https://example.com/course/world-history",
      icon: "🏛️",
      progress: 20,
    },
    {
      id: "3",
      title: "Organic Chemistry",
      subject: "Chemistry",
      level: "university",
      description: "Study the structure and reactions of organic compounds.",
      url: "https://example.com/course/organic-chemistry",
      icon: "🧪",
      progress: 0,
    },
    {
      id: "4",
      title: "Basic Arithmetic",
      subject: "Mathematics",
      level: "university",
      description: "Learn addition, subtraction, and multiplication.",
      url: "https://example.com/course/basic-arithmetic",
      icon: "➕",
      progress: 90,
    },
  ];

  const courses = allCourses.filter(
    (course) => course.level === userStudyLevel
  );

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

  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCourseClick = (course: CourseItem) => {
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

  const handleOpenInNewTab = () => {
    if (selectedCourse) {
      window.open(selectedCourse.url, "_blank", "noopener,noreferrer");
    }
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
        </div>

        <div className="relative">
          <div className="flex space-x-4 pb-4 overflow-x-auto max-w-5xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Button
                  variant="outline"
                  size="sm"
                  key={course.id}
                  className="flex flex-col items-center justify-center.ConcurrentModificationException p-4 rounded-lg min-w-[120px] h-[140px] flex-shrink-0 bg-background text-foreground border-border hover:bg-accent"
                  onClick={() => handleCourseClick(course)}
                >
                  <span className="text-2xl mb-2">{course.icon || "📚"}</span>
                  <span className="font-medium text-center">
                    {course.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.subject}
                  </span>
                  {course.progress !== undefined && (
                    <span className="text-xs text-primary">
                      {course.progress}% Complete
                    </span>
                  )}
                </Button>
              ))
            ) : (
              <p className="text-muted-foreground">
                No courses available for your study level ({userStudyLevel}).
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-background p-4 rounded-md border border-border">
        <div className="w-full flex gap-4">
          <div
            className={`h-[500px] border rounded-md overflow-hidden transition-all duration-300 ease-in-out bg-background border-border ${
              selectedCourse ? (isExpanded ? "hidden w-0" : "w-1/2") : "w-full"
            }`}
          >
            <Tldraw
              persistenceKey={`canvas-${user?._id || "default"}`}
              className={theme === "dark" ? "tldraw-dark" : "tldraw-light"}
            />
          </div>

          {selectedCourse && (
            <div
              className={`h-[500px] border rounded-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out bg-background border-border ${
                isExpanded ? "w-full" : "w-1/2"
              }`}
            >
              <div className="flex justify-between items-center p-2 border-b border-border bg-background">
                <span className="font-medium text-foreground">
                  {selectedCourse.title}
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
                    onClick={handleOpenInNewTab}
                    className="p-1 text-foreground hover:bg-accent"
                  >
                    Open in New Tab
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
              <iframe
                src={selectedCourse.url}
                className="w-full h-full border-none bg-background"
                title={selectedCourse.title}
                allow="fullscreen"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
