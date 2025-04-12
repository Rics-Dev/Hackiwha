// src/api/auth-api.ts
import { ApiResponse, Language, UserProfile, UserRole } from "@/types/types";

const BASE_URL = "/api";

interface LoginCredentials {
  email: string;
  password: string;
}


interface AuthResponse {
  user: UserProfile;
  token: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Error: ${response.statusText || response.status}`;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.error?.message || errorData.message || errorMessage;
    } catch (parseError) {
      console.warn("Failed to parse error JSON", parseError);
    }
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as ApiResponse<T>;
  if (!data.success) {
    throw new Error(data.error?.message || "Operation failed");
  }

  if (!data.data) {
    throw new Error('Response data is undefined');
  }
  return data.data;
};

let authToken: string | null = null;

export const authApi = {
  setAuthToken: (token: string) => {
    authToken = token;
  },
  getAuthToken: () => authToken,
  clearAuthToken: () => {
    authToken = null;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },
  logout: async (): Promise<void> => {
    authApi.clearAuthToken();
  },
  checkAuth: async (): Promise<UserProfile> => {
    if (!authToken) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleResponse<UserProfile>(response);
  },

  updateProfile: async (profileData: {
    location?: string;
    preferredLanguage?: Language;
    bio?: string;
    skills?: string[];
    studyLevel?: string;
    credentials?: string;
    avatar?: string;
  }): Promise<UserProfile> => {
    if (!authToken) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await handleResponse<{ user: UserProfile }>(response);
    return data.user;
  },
};


