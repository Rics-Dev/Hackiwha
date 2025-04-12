import {
  ApiResponse,
  Course,
  Language,
  Resource,
  UserProfile,
  UserRole,
} from "@/types/types";

const BASE_URL = "/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Error: ${response.statusText || response.status} (${
      response.url
    })`;
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
    throw new Error("Response data is undefined");
  }
  return data.data;
};

export const authApi = {
  setAuthToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },
  getAuthToken: () => {
    return localStorage.getItem("auth_token");
  },
  clearAuthToken: () => {
    localStorage.removeItem("auth_token");
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const authResponse = await handleResponse<AuthResponse>(response);
    authApi.setAuthToken(authResponse.token);
    return authResponse;
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
    const authResponse = await handleResponse<AuthResponse>(response);
    authApi.setAuthToken(authResponse.token);
    return authResponse;
  },

  logout: async (): Promise<void> => {
    authApi.clearAuthToken();
  },

  checkAuth: async (): Promise<UserProfile> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ user: UserProfile }>(response);
    return data.user; // Extract the user object from the response
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
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await handleResponse<{ user: UserProfile }>(response);
    return data.user;
  },
};

export const courseApi = {
  createCourse: async (courseData: {
    title: string;
    description?: string;
  }): Promise<Course> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    const data = await handleResponse<{ course: Course }>(response);
    return data.course;
  },

  getMyCourses: async (): Promise<Course[]> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/courses/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ courses: Course[] }>(response);
    return data.courses;
  },
};


export const resourceApi = {
  uploadResource: async (formData: FormData): Promise<Resource> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await handleResponse<{ resource: Resource }>(response);
    return data.resource;
  },

  getResources: async (): Promise<Resource[]> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ resources: Resource[] }>(response);
    return data.resources;
  },

  downloadResource: async (resourceId: string): Promise<void> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(
      `${BASE_URL}/resources/${resourceId}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to download resource");
    }
    const blob = await response.blob();
    const contentDisposition = response.headers.get("Content-Disposition");
    const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : "downloaded_file";
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  shareResource: async (
    resourceId: string,
    email: string
  ): Promise<Resource> => {
    const token = authApi.getAuthToken();
    if (!token) {
      throw new Error("No authentication token");
    }
    const response = await fetch(`${BASE_URL}/resources/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resourceId, email }),
    });
    const data = await handleResponse<{ resource: Resource }>(response);
    return data.resource;
  },
};