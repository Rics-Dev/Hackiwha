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
//   const { user, logout } = useAuth();
  const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//     navigate("/auth/login");
//   };

  return (
    <header className="h-16 border-b bg-background sticky top-0 z-10 flex justify-end items-center px-6">


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
