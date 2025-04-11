import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import drive from "@/assets/google_drive.svg";
import chatgpt from "@/assets/chatgpt-6.svg";
import calendar from "@/assets/g-calendar.svg";
import gmail from "@/assets/gmail.svg";
import google from "@/assets/google.svg";
import youtube from "@/assets/youtube.svg";
import docs from "@/assets/docs.svg";
import sheet from "@/assets/sheets.svg";
import forms from "@/assets/forms.svg";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import {
  Briefcase,
  CalendarClock,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Users,
  MessageSquare,
  GraduationCap,
  Calendar,
  Clock,
  BookOpenText,
  FileBadge,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider"; // Import useTheme

interface AppItem {
  name: string;
  icon: string;
  url: string;
}

export function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme(); // Access the current theme
  const userRole = user?.role || "Student";

  const apps: AppItem[] = [
    { name: "Drive", icon: drive, url: "https://drive.google.com" },
    { name: "ChatGPT", icon: chatgpt, url: "https://chat.openai.com" },
    { name: "Calendar", icon: calendar, url: "https://calendar.google.com" },
    { name: "Gmail", icon: gmail, url: "https://mail.google.com" },
    { name: "Google", icon: google, url: "https://www.google.com" },
    { name: "Youtube", icon: youtube, url: "https://www.youtube.com" },
    { name: "Docs", icon: docs, url: "https://docs.google.com" },
    { name: "Sheet", icon: sheet, url: "https://sheets.google.com" },
    { name: "Forms", icon: forms, url: "https://forms.google.com" },
  ];

  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAppClick = (app: AppItem) => {
    setSelectedApp(app);
    setIsExpanded(false);
  };

  const handleCloseApp = () => {
    setSelectedApp(null);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenInNewTab = () => {
    if (selectedApp) {
      window.open(selectedApp.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2 bg-background text-foreground border-border"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Upcoming Deadlines</span>
            <span className="font-bold text-xl">3</span>
            <span className="text-muted-foreground">
              Next: Math Exam (2 days)
            </span>
          </div>
          <Calendar className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2 bg-background text-foreground border-border"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Study Time</span>
            <span className="font-bold text-xl">7.5h</span>
            <span className="text-muted-foreground">
              <span className="mr-1 bg-green-100 text-green-800 px-1 py-1 rounded dark:bg-green-900 dark:text-green-200">
                <span>+2.3h</span>
              </span>
              From last week
            </span>
          </div>
          <Clock className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2 bg-background text-foreground border-border"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Resources</span>
            <span className="font-bold text-xl">28</span>
            <span className="text-muted-foreground">+5 new this week</span>
          </div>
          <BookOpenText className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2 bg-background text-foreground border-border"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Knowledge Points</span>
            <span className="font-bold text-xl">253</span>
            <span className="text-muted-foreground">You achieved level 3!</span>
          </div>
          <FileBadge className="h-8 w-8" />
        </Button>
      </div>

      {/* Apps Section */}
      <div className="space-y-4 bg-background p-6 rounded-md border border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Apps</h1>
        </div>

        <div className="relative">
          <div className="flex space-x-4 pb-4 overflow-x-auto max-w-5xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {apps.map((app) => (
              <Button
                variant="outline"
                size="sm"
                key={app.name}
                className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[120px] h-[120px] flex-shrink-0 bg-background text-foreground border-border hover:bg-accent"
                onClick={() => handleAppClick(app)}
              >
                <img src={app.icon} alt={app.name} className="w-10 h-10 mb-2" />
                <span className="font-medium">{app.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-background p-4 rounded-md border border-border">
        <div className="w-full flex gap-4">
          <div
            className={`h-[500px] border rounded-md overflow-hidden transition-all duration-300 ease-in-out bg-background border-border ${
              selectedApp ? (isExpanded ? "hidden w-0" : "w-1/2") : "w-full"
            }`}
          >
            <Tldraw
              persistenceKey={`canvas-${user?.id || "default"}`}
              className={theme === "dark" ? "tldraw-dark" : "tldraw-light"}
            />
          </div>

          {selectedApp && (
            <div
              className={`h-[500px] border rounded-md overflow-hidden flex flex-col transition-all duration-300 ease-in-out bg-background border-border ${
                isExpanded ? "w-full" : "w-1/2"
              }`}
            >
              <div className="flex justify-between items-center p-2 border-b border-border bg-background">
                <span className="font-medium text-foreground">
                  {selectedApp.name}
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
                    onClick={handleCloseApp}
                    className="p-1 text-foreground hover:bg-accent"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <iframe
                src={selectedApp.url}
                className="w-full h-full border-none bg-background"
                title={selectedApp.name}
                allow="fullscreen"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
