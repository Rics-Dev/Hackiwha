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
  Book,
  Library,
  BookOpenText,
  FileBadge,
} from "lucide-react";
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


// Define interface for app items
interface AppItem {
  name: string;
  icon: string;
  url: string;
}

export function DashboardPage() {
  const { user } = useAuth();
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

  const handleAddApp = () => {
    console.log("Add new app");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2"
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
          className="h-auto py-4 flex flex-row items-start justify-between gap-2"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Study Time</span>
            <span className="font-bold text-xl">7.5h</span>
            <span className="text-muted-foreground">
              <span className="mr-1 bg-green-100 text-green-800 px-1 py-1 rounded">
                <span>+2.3h</span>
              </span>
              From last week
            </span>
          </div>
          <Clock className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-row items-start justify-between gap-2"
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
          className="h-auto py-4 flex flex-row items-start justify-between gap-2"
        >
          <div className="gap-2 flex flex-col items-start">
            <span className="font-bold">Knowledge Points</span>
            <span className="font-bold text-xl">253</span>
            <span className="text-muted-foreground">You achieved level 3!</span>
          </div>
          <FileBadge className="h-8 w-8" />
        </Button>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-md border-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Apps</h1>
          {/* <Button variant="outline" size="sm" onClick={handleAddApp}>
            Add App
          </Button> */}
        </div>

        <div className="relative">
          <div className="flex space-x-4 pb-4 overflow-x-auto max-w-5xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {apps.map((app) => (
              <Button
                variant="outline"
                size="sm"
                key={app.name}
                className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[120px] h-[120px] flex-shrink-0"
                onClick={() => window.open(app.url, "_blank")}
              >
                <img src={app.icon} alt={app.name} className="w-10 h-10 mb-2" />
                <span className="font-medium">{app.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
