import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserProfile } from "@/types/app";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (userData: UserProfile, authToken: string) => {
    setUser(userData);
    setToken(authToken);

    // Save to localStorage for persistence
    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Clear from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
