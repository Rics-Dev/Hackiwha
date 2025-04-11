// src/api/auth-api.ts
import { ApiResponse, UserProfile } from '@/types/app';

const BASE_URL = '/api/v1';


interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error: ${response.status}`);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(`Error: ${response.status}`);
    }
  }

  const data = await response.json() as ApiResponse<T>;

  if (!data.success || !data.data) {
    throw new Error(data.error?.message || 'Operation failed');
  }

  return data.data;
};


// Token storage
let authToken: string | null = null;

export const authApi = {
  // Set auth token for API calls
  setAuthToken: (token: string) => {
    authToken = token;
  },

  // Get the current auth token
  getAuthToken: () => authToken,

  // Clear the auth token
  clearAuthToken: () => {
    authToken = null;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },

  // Register new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },

  // Logout user (client-side)
  logout: async (): Promise<void> => {
    // If your backend requires a logout endpoint, call it here
    // For now, we'll just handle client-side logout
    authApi.clearAuthToken();
  },

  // Check if user is authenticated with the server
  checkAuth: async (): Promise<UserProfile> => {
    if (!authToken) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return handleResponse<UserProfile>(response);
  },
};