export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}


export type UserRole = "student" | "mentor";
export type Language = "ar" | "fr" | "tzm";

export interface UserProfile {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  role: UserRole;
  skills: string[];
  location?: string;
  studyLevel?: string;
  bio?: string;
  knowledgePoints: number;
  preferredLanguage: Language;
  credentials?: string;
  createdAt: Date;
  courses?: string[]; 
}

// Virtual Classrooms
export interface Classroom {
  _id: string;
  name: string;
  description: string;
  subject: string;
  teacherId: string;
  students: string[];
  assignments: Assignment[];
  resources: Resource[]; 
  createdAt: Date;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  classroomId: string;
  resourceLinks: string[];
  submissions: Submission[];
}

export interface Submission {
  _id: string;
  studentId: string;
  assignmentId: string;
  content: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
}

export interface StudyGroup {
  _id: string;
  name: string;
  description: string;
  subject: string;
  members: string[];
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  language: Language;
  location?: string;
  meetingLinks?: string[];
  resources: Resource[]; 
}



// Workspace
export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  userId: string;
}

// Expert Access
export interface ExpertSession {
  _id: string;
  expertId: string;
  studentId: string;
  subject: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: "Scheduled" | "Completed" | "Cancelled";
  rating?: number;
  feedback?: string;
}

// Progress Tracking
export interface Assessment {
  _id: string;
  title: string;
  subject: string;
  userId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
}

// Community Hub
export interface ForumThread {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  topic: string;
  upvotes: number;
  downvotes: number;
  replies: ForumReply[];
  createdAt: Date;
}

export interface ForumReply {
  _id: string;
  content: string;
  authorId: string;
  threadId: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

export interface GeneratedExercise {
  _id: string;
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  content: string;
  solution?: string;
  language: Language;
}

export interface VideoSummary {
  _id: string;
  videoUrl: string;
  title: string;
  duration: number; 
  keyPoints: string[];
  timestamps: Record<string, number>; 
  language: Language;
}

export type ResourceType = "pdf" | "image" | "video" | "other";

export interface Resource {
  _id: string;
  title: string;
  description?: string;
  type: ResourceType;
  fileSize?: number;
  extractedText?: string;
  originalFileName?: string;
  uploadedBy: any;
  sharedWith?: string[];
  sharedBy?: string | UserProfile;
  courses: string[];
  downloadable: boolean;
  selected?: boolean;
  tags?: string[];
  createdAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  creator: string; // User ID
  createdAt: Date;
}