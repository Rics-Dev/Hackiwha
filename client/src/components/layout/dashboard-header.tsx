// src/components/layout/dashboard-header.tsx
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
import { Language } from "@/types/app";

export function DashboardHeader() {
  const [language, setLanguage] = useState<Language>("French");
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role; 

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage}`);
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

      <div className="flex items-center gap-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange("French")}>
              🇫🇷 French {language === "French" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("Arabic")}>
              🇩🇿 Arabic {language === "Arabic" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
