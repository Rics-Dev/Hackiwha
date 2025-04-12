import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  Briefcase,
  Brain,
  Home,
  Settings,
  LogOut,
  BookOpenText,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import logo from "@/assets/logo.svg"

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const commonSidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
  {
    label: "Workspace",
    href: "/dashboard/workspace",
    icon: <Briefcase size={20} />,
  },
  {
    label: "Resources Library",
    href: "/dashboard/resources",
    icon: <BookOpenText size={20} />,
  },
  {
    label: "Classrooms",
    href: "/dashboard/classrooms",
    icon: <BookOpen size={20} />,
  },
  {
    label: "Study Groups",
    href: "/dashboard/study-groups",
    icon: <Users size={20} />,
  },
  {
    label: "Exercises",
    href: "/dashboard/ai-tools",
    icon: <Brain size={20} />,
  },
];

const mentorSidebarItems: SidebarItem[] = [
  {
    label: "Tutoring Dashboard",
    href: "/dashboard/mentor-dashboard",
    icon: <Home size={20} />,
  },
]



export function DashboardSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userRole = user?.role || "Student";  
   const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const getSidebarItems = () => {
    const items = [...commonSidebarItems];

    if (userRole === "student") {
           return items;
    } else if (userRole === "mentor") {
      items.push(...mentorSidebarItems);
    }

    return items;
  };

  const displayedSidebarItems = getSidebarItems();

  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 overflow-y-auto py-6 px-3 flex flex-col">
      <div className="mb-6 px-3">
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="Aspo Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-4xl">Aspo</span>
        </Link>
      </div>

      <nav className="space-y-1 flex-1">
        {displayedSidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative", 
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:rounded-md after:w-[3px] after:bg-primary after:transition-opacity",
                isActive
                  ? "after:opacity-100"
                  : "after:opacity-0 hover:after:opacity-100"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-1 pt-6 border-t">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings size={20} />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="mt-6 px-3">
        <div className="flex items-center gap-3 rounded-md bg-accent/50 p-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
            {user?.name?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role || "Student"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
