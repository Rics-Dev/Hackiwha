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
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const [language, setLanguage] = useState<Language>("French");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <header className="h-16 border-b bg-background sticky top-0 z-10 flex items-center px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("French")}>
              🇫🇷 French {language === "French" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("Arabic")}>
              🇩🇿 Arabic {language === "Arabic" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("Tamazight")}>
              🇩🇿 Tamazight (Beta) {language === "Tamazight" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

      </div>
    </header>
  );
}
