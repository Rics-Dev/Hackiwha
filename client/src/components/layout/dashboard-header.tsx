import { Bell, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Language } from "@/types/types";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader() {
  const [language, setLanguage] = useState<Language>("fr");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role;

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
  };

  const handleJoinClassroom = () => {
    toast.info("Join Classroom clicked!");
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="h-16 border-b bg-background sticky top-0 z-10 flex justify-end items-center px-6">
      {/* <div className="hidden md:flex items-center max-w-md w-full relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search resources, classrooms..."
          className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div> */}

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">
                {language.slice(0, 2).toUpperCase()}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
              🇫🇷 Fr {language === "fr" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
              🇩🇿 Ar {language === "ar" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />

        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleJoinClassroom}
        >
          <span className="hidden sm:inline">+ Join Classroom</span>
          <span className="sm:hidden">+</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() || "P"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">
                {user?.name || "Profile"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
