// frontend/src/api/api.ts
import { User, CreateUserDto, ApiResponse } from '@/types';

// Base API URL - matches our proxy setup in vite.config.ts
const BASE_URL = '/api/v1';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error: ${response.status}`);
    } catch (err) {
      // If parsing fails, throw generic error with status
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

export const userApi = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    return handleResponse<User[]>(response);
  },

  // Get user by ID
  getUser: async (id: string): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return handleResponse<User>(response);
  },

  // Create new user
  createUser: async (userData: CreateUserDto): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse<User>(response);
  },
};
