import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserProfile } from "@/types/types";
import { authApi } from "@/api/api";

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
    const loadAuthData = async () => {
      try {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);

          // Validate token with server
          try {
            const validatedUser = await authApi.checkAuth();
            setUser(validatedUser); // Update user with fresh data
            localStorage.setItem("auth_user", JSON.stringify(validatedUser)); // Sync localStorage
          } catch (error) {
            console.error("Token validation failed:", error);
            authApi.clearAuthToken();
            localStorage.removeItem("auth_user");
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
        authApi.clearAuthToken();
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
    authApi.setAuthToken(authToken);

    // Save to localStorage for persistence
    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authApi.clearAuthToken();
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
